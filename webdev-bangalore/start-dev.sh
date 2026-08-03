#!/usr/bin/env bash
# ============================================================
#  PixelCraft Studio — Local Development Startup
#  Run this with Git Bash or WSL on Windows:
#    bash start-dev.sh
#  Or on Mac/Linux:
#    chmod +x start-dev.sh && ./start-dev.sh
# ============================================================

set -e

# ── Colors ───────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
RESET='\033[0m'

# ── Banner ────────────────────────────────────────────────────
clear
echo -e "${CYAN}${BOLD}"
echo "  ██████╗ ██╗██╗  ██╗███████╗██╗      ██████╗██████╗  █████╗ ███████╗████████╗"
echo "  ██╔══██╗██║╚██╗██╔╝██╔════╝██║     ██╔════╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝"
echo "  ██████╔╝██║ ╚███╔╝ █████╗  ██║     ██║     ██████╔╝███████║█████╗     ██║   "
echo "  ██╔═══╝ ██║ ██╔██╗ ██╔══╝  ██║     ██║     ██╔══██╗██╔══██║██╔══╝     ██║   "
echo "  ██║     ██║██╔╝ ██╗███████╗███████╗╚██████╗██║  ██║██║  ██║██║        ██║   "
echo "  ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝        ╚═╝   "
echo -e "${RESET}"
echo -e "  ${BOLD}Studio  :${RESET}  PixelCraft Studio, Bangalore"
echo -e "  ${BOLD}Mode    :${RESET}  Local Development"
echo -e "  ${BOLD}Date    :${RESET}  $(date)"
echo "  ============================================================"
echo ""

# ── Helper functions ──────────────────────────────────────────
ok()   { echo -e "  ${GREEN}[OK]${RESET}    $1"; }
info() { echo -e "  ${CYAN}[INFO]${RESET}  $1"; }
warn() { echo -e "  ${YELLOW}[WARN]${RESET}  $1"; }
fail() { echo -e "  ${RED}[ERROR]${RESET} $1"; }

# ── Step 1: Check Docker ──────────────────────────────────────
echo -e "${BOLD}[1/5] Checking Docker Desktop...${RESET}"
if ! docker info > /dev/null 2>&1; then
    fail "Docker Desktop is not running!"
    echo ""
    echo "  Please start Docker Desktop first."
    echo "  Download: https://www.docker.com/products/docker-desktop"
    echo ""
    exit 1
fi
ok "Docker Desktop is running."

# ── Step 2: Check Docker Compose ─────────────────────────────
echo -e "${BOLD}[2/5] Checking Docker Compose...${RESET}"
if ! docker compose version > /dev/null 2>&1; then
    fail "Docker Compose not found. Update Docker Desktop."
    exit 1
fi
COMPOSE_VER=$(docker compose version --short 2>/dev/null || echo "unknown")
ok "Docker Compose v${COMPOSE_VER} found."

# ── Step 3: Check project files ───────────────────────────────
echo -e "${BOLD}[3/5] Checking project files...${RESET}"
if [ ! -f "docker-compose.yml" ]; then
    fail "docker-compose.yml not found!"
    echo ""
    echo "  Run this script from the project root:"
    echo "    cd path/to/webdev-bangalore"
    echo "    bash start-dev.sh"
    echo ""
    exit 1
fi
ok "Project files found."
info "Services: frontend, api-gateway, eureka-server, user-service,"
info "          contact-service, project-service, audit-service,"
info "          mysql, redis-cluster (6 nodes), kafka (3 brokers), zookeeper"

# ── Step 4: Clean up old containers ──────────────────────────
echo ""
echo -e "${BOLD}[4/5] Stopping any existing containers...${RESET}"
docker compose down --remove-orphans 2>/dev/null && ok "Old containers removed." || warn "Nothing to remove."

# ── Step 5: Build and start ───────────────────────────────────
echo ""
echo -e "${BOLD}[5/5] Building and starting all services...${RESET}"
echo ""
echo -e "  ${YELLOW}First run takes 5–15 min (downloading images & building Java services).${RESET}"
echo -e "  ${YELLOW}Subsequent starts are much faster.${RESET}"
echo ""

if ! docker compose up --build -d; then
    fail "docker compose up failed. See logs:"
    echo "    docker compose logs"
    exit 1
fi

# ── Wait for core services ────────────────────────────────────
echo ""
echo -e "${BOLD}Waiting for services to initialise...${RESET}"
echo "  MySQL + Kafka + Redis need ~60s, Spring Boot services need ~90s."
echo ""

SERVICES=("mysql" "eureka-server" "api-gateway" "frontend")
MAX_WAIT=120
POLL=5

for svc in "${SERVICES[@]}"; do
    elapsed=0
    printf "  Waiting for %-20s " "$svc..."
    while true; do
        status=$(docker compose ps --format json "$svc" 2>/dev/null | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('Health','') or d.get('State',''))" 2>/dev/null || echo "")
        if [[ "$status" == "healthy" || "$status" == "running" ]]; then
            echo -e "${GREEN}ready${RESET} (${elapsed}s)"
            break
        fi
        if [ $elapsed -ge $MAX_WAIT ]; then
            echo -e "${YELLOW}timeout — may still be starting${RESET}"
            break
        fi
        sleep $POLL
        elapsed=$((elapsed + POLL))
        printf "."
    done
done

# ── Status table ──────────────────────────────────────────────
echo ""
echo -e "${BOLD}  ============================================================${RESET}"
echo -e "${BOLD}   CONTAINER STATUS${RESET}"
echo -e "${BOLD}  ============================================================${RESET}"
docker compose ps
echo ""

# ── Access URLs ───────────────────────────────────────────────
echo -e "${BOLD}  ============================================================${RESET}"
echo -e "${BOLD}   ACCESS URLs${RESET}"
echo -e "${BOLD}  ============================================================${RESET}"
echo ""
echo -e "  ${CYAN}${BOLD}Frontend  (React App)${RESET}    →  http://localhost:3000"
echo -e "  ${CYAN}${BOLD}API Gateway${RESET}              →  http://localhost:8080"
echo -e "  ${CYAN}${BOLD}Eureka Dashboard${RESET}         →  http://localhost:8761"
echo -e "  ${CYAN}${BOLD}Kafka UI${RESET}                 →  http://localhost:8090"
echo ""
echo -e "  ${BOLD}Microservice endpoints:${RESET}"
echo "    User Service     →  http://localhost:8081/users"
echo "    Contact Service  →  http://localhost:8082/contact"
echo "    Project Service  →  http://localhost:8083/projects"
echo "    Audit Service    →  http://localhost:8084/actuator/health"
echo ""
echo -e "  ${BOLD}Database (connect with any MySQL client):${RESET}"
echo "    Host: localhost | Port: 3306 | User: webdev | Pass: webdev123"
echo "    Databases: webdev_users, webdev_contacts, webdev_projects, webdev_audit"
echo ""

# ── Quick test commands ───────────────────────────────────────
echo -e "${BOLD}  ============================================================${RESET}"
echo -e "${BOLD}   QUICK TEST COMMANDS${RESET}"
echo -e "${BOLD}  ============================================================${RESET}"
echo ""
echo "  # Get all projects"
echo "  curl http://localhost:8080/api/projects"
echo ""
echo "  # Submit a contact form"
cat << 'CURL'
  curl -X POST http://localhost:8080/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Ravi Kumar","email":"ravi@test.com","message":"Hello!"}'
CURL
echo ""
echo "  # Tail logs for all services"
echo "  docker compose logs -f"
echo ""
echo "  # Tail a specific service"
echo "  docker compose logs -f audit-service"
echo ""
echo "  # Stop everything"
echo "  docker compose down"
echo ""
echo "  # Stop and wipe all data volumes"
echo "  docker compose down -v"
echo ""

# ── Open browser (if possible) ────────────────────────────────
echo -e "${BOLD}  ============================================================${RESET}"
echo ""

# Detect OS and open browser
if command -v powershell.exe &> /dev/null; then
    # Running under Git Bash / WSL on Windows
    read -rp "  Open browser tabs? (Y/n): " OPEN
    if [[ "${OPEN,,}" != "n" ]]; then
        powershell.exe -Command "Start-Process 'http://localhost:3000'"   2>/dev/null &
        powershell.exe -Command "Start-Process 'http://localhost:8761'"   2>/dev/null &
        powershell.exe -Command "Start-Process 'http://localhost:8090'"   2>/dev/null &
        ok "Browser tabs opened."
    fi
elif command -v xdg-open &> /dev/null; then
    read -rp "  Open browser tabs? (Y/n): " OPEN
    if [[ "${OPEN,,}" != "n" ]]; then
        xdg-open "http://localhost:3000" 2>/dev/null &
        ok "Browser opened."
    fi
elif command -v open &> /dev/null; then
    read -rp "  Open browser tabs? (Y/n): " OPEN
    if [[ "${OPEN,,}" != "n" ]]; then
        open "http://localhost:3000" 2>/dev/null &
        ok "Browser opened."
    fi
fi

echo ""
echo -e "  ${GREEN}${BOLD}Dev environment is UP! Happy coding from Bangalore! 🚀${RESET}"
echo ""
