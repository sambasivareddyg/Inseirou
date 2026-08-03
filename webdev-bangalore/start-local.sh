#!/usr/bin/env bash
# =============================================================
#  PixelCraft Studio - Local Dev Launcher (Git Bash on Windows)
#
#  Usage:
#    bash start-local.sh
#
#  CONFIGURE the section below before first run.
#
#  Prerequisites (install once):
#    Java 17+   https://adoptium.net
#    Maven 3.9+ https://maven.apache.org/download.cgi
#    Node 20+   https://nodejs.org
#    MySQL 8    https://dev.mysql.com/downloads/mysql/
#    Redis      https://github.com/microsoftarchive/redis/releases
#               (extract, add folder to PATH)
#    Kafka 3.x  https://kafka.apache.org/downloads
#               (Scala 2.13 binary, extract anywhere)
# =============================================================

# ============================================================
#  USER CONFIG - edit these before running
# ============================================================
KAFKA_HOME="C:/kafka"            # e.g. C:/kafka_2.13-3.6.1  (use forward slashes)
MYSQL_ROOT_PASS="root"           # your MySQL root password
MYSQL_APP_USER="webdev"
MYSQL_APP_PASS="webdev123"
# ============================================================

MYSQL_PORT=3306
REDIS_PORT=6379
ZK_PORT=2181
KAFKA_PORT=9092
EUREKA_PORT=8761
GW_PORT=8080
USER_PORT=8081
CONTACT_PORT=8082
PROJECT_PORT=8083
AUDIT_PORT=8084
FRONTEND_PORT=3000

# Colours
R='\033[0;31m'; G='\033[0;32m'; Y='\033[1;33m'; C='\033[0;36m'; B='\033[1m'; N='\033[0m'

ok()   { echo -e "  ${G}[OK]${N}      $*"; }
err()  { echo -e "  ${R}[ERROR]${N}   $*"; }
warn() { echo -e "  ${Y}[WARN]${N}    $*"; }
info() { echo -e "  ${C}[INFO]${N}    $*"; }
step() { echo -e "\n${B}$*${N}"; }

# Resolve project root (folder containing this script)
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="$ROOT/logs"
LOCAL_DIR="$ROOT/.local"

clear
echo ""
echo "  ============================================================"
echo "   PixelCraft Studio  -  Local Dev (Git Bash, No Docker)"
echo "  ============================================================"
echo ""

# -- sanity check ----------------------------------------------
if [ ! -f "$ROOT/docker-compose.yml" ]; then
  err "Run this script from the project root:"
  echo "       cd /c/Projects/webdev-bangalore"
  echo "       bash start-local.sh"
  exit 1
fi

mkdir -p "$LOG_DIR" "$LOCAL_DIR/zk-data" "$LOCAL_DIR/kf-logs"
info "Root : $ROOT"
info "Logs : $LOG_DIR"

# ============================================================
#  STEP 1  PREREQUISITES
# ============================================================
step "[1/8] Checking prerequisites..."
FAIL=0

check() {
  local label=$1; shift
  if "$@" &>/dev/null; then
    ok "$label found: $("$@" 2>&1 | head -1)"
  else
    err "$label NOT FOUND"
    FAIL=1
  fi
}

# Java
if java -version &>/dev/null; then
  ok "Java: $(java -version 2>&1 | head -1)"
else
  err "Java 17+ not found  ->  https://adoptium.net"
  FAIL=1
fi

# Maven
if mvn --version &>/dev/null; then
  ok "Maven: $(mvn --version 2>&1 | head -1)"
else
  err "Maven not found  ->  https://maven.apache.org/download.cgi"
  FAIL=1
fi

# Node
if node --version &>/dev/null; then
  ok "Node.js: $(node --version)"
else
  err "Node.js 20+ not found  ->  https://nodejs.org"
  FAIL=1
fi

# MySQL client
if mysql --version &>/dev/null; then
  ok "MySQL client: $(mysql --version)"
else
  err "mysql client not found  ->  https://dev.mysql.com/downloads/mysql/"
  FAIL=1
fi

# Redis
if redis-server --version &>/dev/null; then
  ok "Redis: $(redis-server --version)"
else
  err "redis-server not found  ->  https://github.com/microsoftarchive/redis/releases"
  err "        Extract the zip and add the folder to your PATH"
  FAIL=1
fi

# Kafka
if [ -f "$KAFKA_HOME/bin/windows/kafka-server-start.bat" ]; then
  ok "Kafka found at $KAFKA_HOME"
else
  err "Kafka not found at KAFKA_HOME=$KAFKA_HOME"
  err "  1. Download https://kafka.apache.org/downloads  (Scala 2.13 binary)"
  err "  2. Extract to C:/kafka"
  err "  3. Set KAFKA_HOME=C:/kafka at top of this script"
  FAIL=1
fi

if [ "$FAIL" = "1" ]; then
  echo ""
  err "Fix missing prerequisites then re-run."
  exit 1
fi
ok "All prerequisites OK."

# ============================================================
#  STEP 2  MYSQL
# ============================================================
step "[2/8] Setting up MySQL..."

# Try to ping; if it fails, attempt to start the Windows service
if ! mysqladmin -uroot -p"$MYSQL_ROOT_PASS" -P$MYSQL_PORT ping &>/dev/null; then
  info "MySQL not responding - trying to start service..."
  # Git Bash can call Windows net.exe
  net start MySQL80 &>/dev/null || net start MySQL &>/dev/null || true
  sleep 5
  if ! mysqladmin -uroot -p"$MYSQL_ROOT_PASS" -P$MYSQL_PORT ping &>/dev/null; then
    warn "MySQL still not responding."
    warn "  - Check MYSQL_ROOT_PASS at top of this script"
    warn "  - Or open CMD as Administrator and run:  net start MySQL80"
    read -rp "  Press ENTER to continue anyway, or Ctrl+C to abort..."
  fi
fi

# Write SQL to file and pipe it in - avoids all quoting issues
cat > "$LOCAL_DIR/init.sql" << SQL
CREATE DATABASE IF NOT EXISTS webdev_users     CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS webdev_contacts  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS webdev_projects  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS webdev_audit     CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${MYSQL_APP_USER}'@'localhost' IDENTIFIED BY '${MYSQL_APP_PASS}';
GRANT ALL PRIVILEGES ON webdev_users.*    TO '${MYSQL_APP_USER}'@'localhost';
GRANT ALL PRIVILEGES ON webdev_contacts.* TO '${MYSQL_APP_USER}'@'localhost';
GRANT ALL PRIVILEGES ON webdev_projects.* TO '${MYSQL_APP_USER}'@'localhost';
GRANT ALL PRIVILEGES ON webdev_audit.*    TO '${MYSQL_APP_USER}'@'localhost';
FLUSH PRIVILEGES;
SQL

if mysql -uroot -p"$MYSQL_ROOT_PASS" -P$MYSQL_PORT < "$LOCAL_DIR/init.sql" > "$LOG_DIR/mysql-init.log" 2>&1; then
  ok "Databases and app user ready."
else
  warn "MySQL init had issues - see $LOG_DIR/mysql-init.log"
fi

# ============================================================
#  STEP 3  REDIS
# ============================================================
step "[3/8] Starting Redis..."

if redis-cli -p $REDIS_PORT ping &>/dev/null; then
  ok "Redis already running on port $REDIS_PORT."
else
  # Open a new mintty/bash window for Redis (Git Bash on Windows)
  start "Redis" //min bash -c "redis-server --port $REDIS_PORT --loglevel notice" &
  sleep 3
  if redis-cli -p $REDIS_PORT ping &>/dev/null; then
    ok "Redis started on port $REDIS_PORT."
  else
    # Try launching via cmd.exe which is more reliable for background Windows processes
    cmd.exe //c "start \"Redis\" /min redis-server --port $REDIS_PORT" &
    sleep 3
    if redis-cli -p $REDIS_PORT ping &>/dev/null; then
      ok "Redis started."
    else
      warn "Redis may not have started. Try starting redis-server.exe manually."
    fi
  fi
fi

# ============================================================
#  STEP 4  ZOOKEEPER
# ============================================================
step "[4/8] Starting Zookeeper..."

# Write zookeeper.properties with forward slashes (required by Java)
ZK_DATA_PATH=$(echo "$LOCAL_DIR/zk-data" | sed 's|/c/|C:/|')
cat > "$LOCAL_DIR/zookeeper.properties" << ZKEOF
dataDir=$ZK_DATA_PATH
clientPort=$ZK_PORT
maxClientCnxns=0
admin.enableServer=false
ZKEOF

ZK_BAT=$(echo "$KAFKA_HOME/bin/windows/zookeeper-server-start.bat" | sed 's|/c/|C:/|')
ZK_PROPS=$(echo "$LOCAL_DIR/zookeeper.properties" | sed 's|/c/|C:/|')

cmd.exe //c "start \"Zookeeper\" /min \"$ZK_BAT\" \"$ZK_PROPS\""
info "Waiting 12s for Zookeeper..."
sleep 12
ok "Zookeeper started on port $ZK_PORT."

# ============================================================
#  STEP 5  KAFKA
# ============================================================
step "[5/8] Starting Kafka..."

KF_LOGS_PATH=$(echo "$LOCAL_DIR/kf-logs" | sed 's|/c/|C:/|')
cat > "$LOCAL_DIR/kafka.properties" << KFEOF
broker.id=0
listeners=PLAINTEXT://localhost:$KAFKA_PORT
advertised.listeners=PLAINTEXT://localhost:$KAFKA_PORT
log.dirs=$KF_LOGS_PATH
num.partitions=3
default.replication.factor=1
offsets.topic.replication.factor=1
transaction.state.log.replication.factor=1
transaction.state.log.min.isr=1
log.retention.hours=168
zookeeper.connect=localhost:$ZK_PORT
auto.create.topics.enable=true
delete.topic.enable=true
KFEOF

KF_BAT=$(echo "$KAFKA_HOME/bin/windows/kafka-server-start.bat"  | sed 's|/c/|C:/|')
KF_PROPS=$(echo "$LOCAL_DIR/kafka.properties" | sed 's|/c/|C:/|')
KF_TOPICS=$(echo "$KAFKA_HOME/bin/windows/kafka-topics.bat" | sed 's|/c/|C:/|')

cmd.exe //c "start \"Kafka\" /min \"$KF_BAT\" \"$KF_PROPS\""
info "Waiting 15s for Kafka..."
sleep 15
ok "Kafka started on port $KAFKA_PORT."

info "Creating Kafka topics..."
for topic in audit-log contact-notifications user-events project-events; do
  cmd.exe //c "\"$KF_TOPICS\" --create --bootstrap-server localhost:$KAFKA_PORT --topic $topic --partitions 3 --replication-factor 1 --if-not-exists" &>/dev/null && \
    info "  topic: $topic" || true
done
ok "Kafka topics ready."

# ============================================================
#  STEP 6  BUILD BACKEND SERVICES
# ============================================================
step "[6/8] Building Spring Boot services with Maven..."
echo "  First run downloads ~200MB of dependencies - please be patient."
echo ""

SERVICES=(eureka-server api-gateway user-service contact-service project-service audit-service)

for svc in "${SERVICES[@]}"; do
  echo -n "  Building $svc ... "
  if mvn clean package -DskipTests -q \
       -f "$ROOT/backend/$svc/pom.xml" \
       > "$LOG_DIR/build-$svc.log" 2>&1; then
    echo -e "${G}OK${N}"
  else
    echo -e "${R}FAILED${N}"
    err "See $LOG_DIR/build-$svc.log"
    exit 1
  fi
done
ok "All services built."

# ============================================================
#  STEP 7  START SPRING BOOT SERVICES
# ============================================================
step "[7/8] Starting Spring Boot microservices..."

# Find the executable JAR for a service (skips sources/javadoc jars)
find_jar() {
  local svc=$1
  find "$ROOT/backend/$svc/target" -maxdepth 1 -name "*.jar" \
    ! -name "*sources*" ! -name "*javadoc*" ! -name "*original*" \
    2>/dev/null | head -1
}

# Common JVM flags for every service
BASE_PROPS=(
  "-Dspring.profiles.active=local"
  "-Dspring.data.redis.mode=standalone"
  "-Dspring.data.redis.host=localhost"
  "-Dspring.data.redis.port=$REDIS_PORT"
  "-Dspring.kafka.bootstrap-servers=localhost:$KAFKA_PORT"
  "-Deureka.client.service-url.defaultZone=http://localhost:$EUREKA_PORT/eureka/"
  "-Deureka.instance.hostname=localhost"
  "-Deureka.instance.prefer-ip-address=true"
)

# launch_svc <window-title> <service-folder> <port> [db-name]
launch_svc() {
  local title=$1
  local svc=$2
  local port=$3
  local db=$4

  local jar
  jar=$(find_jar "$svc")
  if [ -z "$jar" ]; then
    err "JAR not found for $svc - check build log"
    return 1
  fi

  # Convert Git Bash path to Windows path for java
  local jar_win
  jar_win=$(cygpath -w "$jar" 2>/dev/null || echo "$jar" | sed 's|/c/|C:\\|;s|/|\\|g')

  local props=("${BASE_PROPS[@]}" "-Dserver.port=$port")

  if [ -n "$db" ]; then
    local jdbc_url="jdbc:mysql://localhost:${MYSQL_PORT}/${db}?useSSL=false&allowPublicKeyRetrieval=true&createDatabaseIfNotExist=true"
    props+=(
      "-Dspring.jpa.hibernate.ddl-auto=update"
      "-Dspring.datasource.url=${jdbc_url}"
      "-Dspring.datasource.username=${MYSQL_APP_USER}"
      "-Dspring.datasource.password=${MYSQL_APP_PASS}"
    )
  fi

  # Build the full java command as a single string
  local java_cmd="java"
  for p in "${props[@]}"; do
    java_cmd+=" $p"
  done
  java_cmd+=" -jar \"$jar_win\""

  echo -n "  Starting $title on port $port ... "
  cmd.exe //c "start \"$title :$port\" cmd /k \"$java_cmd\""
  sleep 2
  echo -e "${G}window opened${N}"
}

# Start Eureka first and wait for it
launch_svc "Eureka Server"   eureka-server   $EUREKA_PORT ""
info "Waiting 20s for Eureka to be ready..."
sleep 20

# API Gateway
launch_svc "API Gateway"     api-gateway     $GW_PORT      ""

# Business services
launch_svc "User Service"    user-service    $USER_PORT    webdev_users
launch_svc "Contact Service" contact-service $CONTACT_PORT webdev_contacts
launch_svc "Project Service" project-service $PROJECT_PORT webdev_projects
launch_svc "Audit Service"   audit-service   $AUDIT_PORT   webdev_audit

ok "All backend service windows launched."

# ============================================================
#  STEP 8  REACT FRONTEND
# ============================================================
step "[8/8] Starting React frontend (Vite)..."

cd "$ROOT/frontend"

# Write a local vite config that proxies /api to the gateway
cat > vite.config.local.js << 'VITE'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: FRONTEND_PORT_PLACEHOLDER,
    proxy: {
      '/api': {
        target: 'http://localhost:GW_PORT_PLACEHOLDER',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
VITE

# Replace placeholders with actual port values
sed -i "s/FRONTEND_PORT_PLACEHOLDER/$FRONTEND_PORT/" vite.config.local.js
sed -i "s/GW_PORT_PLACEHOLDER/$GW_PORT/"             vite.config.local.js

info "Running npm install..."
npm install > "$LOG_DIR/npm-install.log" 2>&1 || {
  err "npm install failed - see $LOG_DIR/npm-install.log"
  exit 1
}

cmd.exe //c "start \"Frontend :$FRONTEND_PORT\" cmd /k \"npm run dev -- --config vite.config.local.js\""
cd "$ROOT"
ok "Frontend starting at http://localhost:$FRONTEND_PORT"

# ============================================================
#  HEALTH CHECK  poll up to 120s
# ============================================================
step "Waiting for services to be ready..."
echo ""

W=0
until curl -sf "http://localhost:$EUREKA_PORT/actuator/health" &>/dev/null; do
  sleep 5
  W=$((W+5))
  echo "  ${W}s - waiting for Eureka..."
  if [ $W -ge 120 ]; then
    warn "Eureka did not respond in 120s - check its CMD window for errors."
    break
  fi
done

echo ""
for svc_info in \
  "Eureka Server|$EUREKA_PORT|/actuator/health" \
  "API Gateway|$GW_PORT|/actuator/health" \
  "User Service|$USER_PORT|/actuator/health" \
  "Contact Service|$CONTACT_PORT|/actuator/health" \
  "Project Service|$PROJECT_PORT|/actuator/health" \
  "Audit Service|$AUDIT_PORT|/actuator/health" \
  "Frontend|$FRONTEND_PORT|/"; do
  IFS='|' read -r name port path <<< "$svc_info"
  if curl -sf "http://localhost:${port}${path}" &>/dev/null; then
    ok "$name  ->  http://localhost:$port"
  else
    warn "$name  ->  http://localhost:$port  (not yet ready)"
  fi
done

# ============================================================
#  SUMMARY
# ============================================================
echo ""
echo "  ============================================================"
echo "   ALL SERVICES STARTED - PixelCraft Studio"
echo "  ============================================================"
echo ""
echo "   Frontend      http://localhost:$FRONTEND_PORT"
echo "   API Gateway   http://localhost:$GW_PORT"
echo "   Eureka UI     http://localhost:$EUREKA_PORT"
echo ""
echo "   User Svc      http://localhost:$USER_PORT/users"
echo "   Contact Svc   http://localhost:$CONTACT_PORT/contact"
echo "   Project Svc   http://localhost:$PROJECT_PORT/projects"
echo "   Audit Svc     http://localhost:$AUDIT_PORT/actuator/health"
echo ""
echo "   MySQL         localhost:$MYSQL_PORT   user=$MYSQL_APP_USER  pass=$MYSQL_APP_PASS"
echo "   Redis         localhost:$REDIS_PORT"
echo "   Kafka         localhost:$KAFKA_PORT"
echo "   Zookeeper     localhost:$ZK_PORT"
echo ""
echo "   Logs          $LOG_DIR"
echo "  ============================================================"
echo ""

read -rp "  Open browser tabs? (Y/n): " OB
if [[ "${OB,,}" != "n" ]]; then
  powershell.exe -Command "Start-Process 'http://localhost:$FRONTEND_PORT'" &>/dev/null || \
    cmd.exe //c "start http://localhost:$FRONTEND_PORT" &>/dev/null || true
  powershell.exe -Command "Start-Process 'http://localhost:$EUREKA_PORT'"  &>/dev/null || \
    cmd.exe //c "start http://localhost:$EUREKA_PORT"  &>/dev/null || true
fi

echo ""
echo "  All service windows are open in the taskbar."
echo "  This terminal can be closed - services keep running."
echo "  To stop everything, close each CMD window or run stop-local.bat"
echo ""
