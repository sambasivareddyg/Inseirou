@echo off
setlocal enabledelayedexpansion
title PixelCraft Studio - Local Dev (No Docker)

:: ============================================================
::  PixelCraft Studio - Local Dev Launcher (No Docker)
::
::  CONFIGURE THESE if your tools are not on PATH:
::    KAFKA_HOME      = folder where you extracted Kafka
::                      e.g. C:\kafka_2.13-3.6.1
::    MYSQL_ROOT_PASS = your MySQL root password
::
::  HOW TO RUN:
::    1. Open CMD as Administrator (needed for net start MySQL80)
::    2. cd path\to\webdev-bangalore
::    3. start-local.bat
::
::  PREREQUISITES (install once):
::    Java 17+    https://adoptium.net
::    Maven 3.9+  https://maven.apache.org/download.cgi
::    Node 20+    https://nodejs.org
::    MySQL 8     https://dev.mysql.com/downloads/mysql/
::    Redis       https://github.com/microsoftarchive/redis/releases
::                  (extract, add folder to PATH)
::    Kafka 3.x   https://kafka.apache.org/downloads
::                  (Scala 2.13 binary, extract, set KAFKA_HOME below)
:: ============================================================

:: ========== EDIT THESE TWO LINES ==========
set KAFKA_HOME=C:\kafka
set MYSQL_ROOT_PASS=root
:: ==========================================

set MYSQL_APP_USER=webdev
set MYSQL_APP_PASS=webdev123
set MYSQL_PORT=3306
set REDIS_PORT=6379
set ZK_PORT=2181
set KAFKA_PORT=9092
set EUREKA_PORT=8761
set GW_PORT=8080
set USER_PORT=8081
set CONTACT_PORT=8082
set PROJECT_PORT=8083
set AUDIT_PORT=8084
set FRONTEND_PORT=3000

set ROOT=%~dp0
if "%ROOT:~-1%"=="\" set ROOT=%ROOT:~0,-1%
set LOG_DIR=%ROOT%\logs
set LOCAL_DIR=%ROOT%\.local

cls
echo.
echo  ============================================================
echo   PixelCraft Studio  -  Local Dev (No Docker)
echo  ============================================================
echo.

:: -- Root check -----------------------------------------------
if not exist "%ROOT%\docker-compose.yml" (
    echo [ERROR] Run this script from the project root folder.
    echo         Example:
    echo           cd C:\Projects\webdev-bangalore
    echo           start-local.bat
    echo.
    pause
    exit /b 1
)

:: -- Create working folders -----------------------------------
if not exist "%LOG_DIR%"            mkdir "%LOG_DIR%"
if not exist "%LOCAL_DIR%"          mkdir "%LOCAL_DIR%"
if not exist "%LOCAL_DIR%\zk-data"  mkdir "%LOCAL_DIR%\zk-data"
if not exist "%LOCAL_DIR%\kf-logs"  mkdir "%LOCAL_DIR%\kf-logs"

echo   Logs  : %LOG_DIR%
echo   Temp  : %LOCAL_DIR%
echo.

:: ================================================================
::  STEP 1  PREREQUISITES
:: ================================================================
echo [1/8] Checking prerequisites...
echo.
set BAD=0

:: Java
java -version >nul 2>&1
if errorlevel 1 (
    echo   [MISSING] Java 17+   https://adoptium.net
    set BAD=1
) else (
    for /f "tokens=3" %%V in ('java -version 2^>^&1 ^| findstr /i "version"') do (
        echo   [OK] Java %%V & goto :java_ok
    )
    :java_ok
)

:: Maven
mvn --version >nul 2>&1
if errorlevel 1 (
    echo   [MISSING] Maven 3.9+  https://maven.apache.org/download.cgi
    set BAD=1
) else (
    for /f "tokens=3" %%V in ('mvn --version 2^>^&1 ^| findstr /i "Apache Maven"') do (
        echo   [OK] Maven %%V & goto :mvn_ok
    )
    :mvn_ok
)

:: Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo   [MISSING] Node.js 20+  https://nodejs.org
    set BAD=1
) else (
    for /f %%V in ('node --version') do echo   [OK] Node.js %%V
)

:: MySQL client
mysql --version >nul 2>&1
if errorlevel 1 (
    echo   [MISSING] MySQL 8  https://dev.mysql.com/downloads/mysql/
    set BAD=1
) else (
    echo   [OK] MySQL client found
)

:: Redis
redis-server --version >nul 2>&1
if errorlevel 1 (
    echo   [MISSING] redis-server not found on PATH
    echo             Download: https://github.com/microsoftarchive/redis/releases
    echo             Extract the zip and add the folder to your system PATH
    set BAD=1
) else (
    echo   [OK] Redis found
)

:: Kafka
if not exist "%KAFKA_HOME%\bin\windows\kafka-server-start.bat" (
    echo   [MISSING] Kafka not found at KAFKA_HOME=%KAFKA_HOME%
    echo             1. Download https://kafka.apache.org/downloads
    echo                Choose: Binary, Scala 2.13
    echo             2. Extract e.g. to C:\kafka
    echo             3. Set KAFKA_HOME=C:\kafka at top of this script
    set BAD=1
) else (
    echo   [OK] Kafka found at %KAFKA_HOME%
)

echo.
if "%BAD%"=="1" (
    echo  One or more prerequisites are MISSING.
    echo  Install them then re-run this script.
    echo.
    pause
    exit /b 1
)
echo  [OK] All prerequisites satisfied.
echo.

:: ================================================================
::  STEP 2  MYSQL
:: ================================================================
echo [2/8] Setting up MySQL...

mysqladmin -uroot -p%MYSQL_ROOT_PASS% -P%MYSQL_PORT% ping >nul 2>&1
if errorlevel 1 (
    echo  MySQL not responding - trying to start Windows service...
    net start MySQL80 >nul 2>&1
    if errorlevel 1 net start MySQL >nul 2>&1
    timeout /t 6 /nobreak >nul
    mysqladmin -uroot -p%MYSQL_ROOT_PASS% -P%MYSQL_PORT% ping >nul 2>&1
    if errorlevel 1 (
        echo  [WARN] MySQL still not responding.
        echo         - Check MYSQL_ROOT_PASS at top of this script
        echo         - Or start MySQL manually: net start MySQL80
        echo  Press any key to continue anyway...
        pause >nul
    )
)

:: Write SQL to file - avoids all CMD quoting problems
set SQLF=%LOCAL_DIR%\init.sql
(
    echo CREATE DATABASE IF NOT EXISTS webdev_users     CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    echo CREATE DATABASE IF NOT EXISTS webdev_contacts  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    echo CREATE DATABASE IF NOT EXISTS webdev_projects  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    echo CREATE DATABASE IF NOT EXISTS webdev_audit     CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    echo CREATE USER IF NOT EXISTS '%MYSQL_APP_USER%'@'localhost' IDENTIFIED BY '%MYSQL_APP_PASS%';
    echo GRANT ALL PRIVILEGES ON webdev_users.*    TO '%MYSQL_APP_USER%'@'localhost';
    echo GRANT ALL PRIVILEGES ON webdev_contacts.* TO '%MYSQL_APP_USER%'@'localhost';
    echo GRANT ALL PRIVILEGES ON webdev_projects.* TO '%MYSQL_APP_USER%'@'localhost';
    echo GRANT ALL PRIVILEGES ON webdev_audit.*    TO '%MYSQL_APP_USER%'@'localhost';
    echo FLUSH PRIVILEGES;
) > "%SQLF%"

mysql -uroot -p%MYSQL_ROOT_PASS% -P%MYSQL_PORT% < "%SQLF%" > "%LOG_DIR%\mysql-init.log" 2>&1
if errorlevel 1 (
    echo  [WARN] MySQL init had issues - see %LOG_DIR%\mysql-init.log
) else (
    echo  [OK] Databases and app user ready.
)
echo.

:: ================================================================
::  STEP 3  REDIS
:: ================================================================
echo [3/8] Starting Redis...

redis-cli -p %REDIS_PORT% ping >nul 2>&1
if not errorlevel 1 (
    echo  [OK] Redis already running on port %REDIS_PORT%.
) else (
    start "Redis :%REDIS_PORT%" /min cmd /c "redis-server --port %REDIS_PORT% --loglevel notice"
    timeout /t 4 /nobreak >nul
    redis-cli -p %REDIS_PORT% ping >nul 2>&1
    if errorlevel 1 (
        echo  [WARN] Redis may not have started. Check the Redis window in the taskbar.
    ) else (
        echo  [OK] Redis started on port %REDIS_PORT%.
    )
)
echo.

:: ================================================================
::  STEP 4  ZOOKEEPER
:: ================================================================
echo [4/8] Starting Zookeeper...

:: Convert backslashes to forward slashes for Java properties
set ZK_DATA=%LOCAL_DIR%\zk-data
set ZK_DATA_FWD=%ZK_DATA:\=/%

set ZKPROPS=%LOCAL_DIR%\zookeeper.properties
(
    echo dataDir=%ZK_DATA_FWD%
    echo clientPort=%ZK_PORT%
    echo maxClientCnxns=0
    echo admin.enableServer=false
) > "%ZKPROPS%"

start "Zookeeper :%ZK_PORT%" /min cmd /c ""%KAFKA_HOME%\bin\windows\zookeeper-server-start.bat" "%ZKPROPS%""
echo  Waiting 12s for Zookeeper to start...
timeout /t 12 /nobreak >nul
echo  [OK] Zookeeper started on port %ZK_PORT%.
echo.

:: ================================================================
::  STEP 5  KAFKA
:: ================================================================
echo [5/8] Starting Kafka...

set KF_LOGS=%LOCAL_DIR%\kf-logs
set KF_LOGS_FWD=%KF_LOGS:\=/%

set KFPROPS=%LOCAL_DIR%\kafka.properties
(
    echo broker.id=0
    echo listeners=PLAINTEXT://localhost:%KAFKA_PORT%
    echo advertised.listeners=PLAINTEXT://localhost:%KAFKA_PORT%
    echo log.dirs=%KF_LOGS_FWD%
    echo num.partitions=3
    echo default.replication.factor=1
    echo offsets.topic.replication.factor=1
    echo transaction.state.log.replication.factor=1
    echo transaction.state.log.min.isr=1
    echo log.retention.hours=168
    echo zookeeper.connect=localhost:%ZK_PORT%
    echo auto.create.topics.enable=true
    echo delete.topic.enable=true
) > "%KFPROPS%"

start "Kafka :%KAFKA_PORT%" /min cmd /c ""%KAFKA_HOME%\bin\windows\kafka-server-start.bat" "%KFPROPS%""
echo  Waiting 15s for Kafka to start...
timeout /t 15 /nobreak >nul
echo  [OK] Kafka started on port %KAFKA_PORT%.

echo  Creating Kafka topics...
"%KAFKA_HOME%\bin\windows\kafka-topics.bat" --create --bootstrap-server localhost:%KAFKA_PORT% --topic audit-log             --partitions 3 --replication-factor 1 --if-not-exists >nul 2>&1
"%KAFKA_HOME%\bin\windows\kafka-topics.bat" --create --bootstrap-server localhost:%KAFKA_PORT% --topic contact-notifications --partitions 3 --replication-factor 1 --if-not-exists >nul 2>&1
"%KAFKA_HOME%\bin\windows\kafka-topics.bat" --create --bootstrap-server localhost:%KAFKA_PORT% --topic user-events           --partitions 3 --replication-factor 1 --if-not-exists >nul 2>&1
"%KAFKA_HOME%\bin\windows\kafka-topics.bat" --create --bootstrap-server localhost:%KAFKA_PORT% --topic project-events        --partitions 3 --replication-factor 1 --if-not-exists >nul 2>&1
echo  [OK] Kafka topics ready.
echo.

:: ================================================================
::  STEP 6  BUILD BACKEND SERVICES
:: ================================================================
echo [6/8] Building Spring Boot services with Maven...
echo  First run downloads ~200MB of dependencies - please be patient.
echo.

for %%S in (eureka-server api-gateway user-service contact-service project-service audit-service) do (
    echo  Building %%S...
    cd /d "%ROOT%\backend\%%S"
    call mvn clean package -DskipTests -q > "%LOG_DIR%\build-%%S.log" 2>&1
    if errorlevel 1 (
        echo  [ERROR] Build failed for %%S
        echo          See: %LOG_DIR%\build-%%S.log
        cd /d "%ROOT%"
        pause
        exit /b 1
    )
    echo  [OK]  %%S
    cd /d "%ROOT%"
)
echo.
echo  [OK] All services built.
echo.

:: ================================================================
::  STEP 7  START SPRING BOOT SERVICES
:: ================================================================
echo [7/8] Starting Spring Boot microservices...
echo.

:: ---- Eureka Server (no DB needed) ----
call :launch "Eureka Server" eureka-server %EUREKA_PORT% ""
echo  Waiting 20s for Eureka to be ready before starting other services...
timeout /t 20 /nobreak >nul

:: ---- API Gateway (no DB needed) ----
call :launch "API Gateway" api-gateway %GW_PORT% ""

:: ---- Business services (all need MySQL) ----
call :launch "User Service"    user-service    %USER_PORT%    webdev_users
call :launch "Contact Service" contact-service %CONTACT_PORT% webdev_contacts
call :launch "Project Service" project-service %PROJECT_PORT% webdev_projects
call :launch "Audit Service"   audit-service   %AUDIT_PORT%   webdev_audit

echo.
echo  [OK] All backend services launched.
echo.

:: ================================================================
::  STEP 8  REACT FRONTEND
:: ================================================================
echo [8/8] Starting React frontend (Vite)...

cd /d "%ROOT%\frontend"

:: Write vite.config.local.js - proxy /api to the gateway
(
    echo import { defineConfig } from 'vite'
    echo import react from '@vitejs/plugin-react'
    echo.
    echo export default defineConfig({
    echo   plugins: [react()],
    echo   server: {
    echo     port: %FRONTEND_PORT%,
    echo     proxy: {
    echo       '/api': {
    echo         target: 'http://localhost:%GW_PORT%',
    echo         changeOrigin: true,
    echo         rewrite: (path) =^> path.replace(/^\/api/, '')
    echo       }
    echo     }
    echo   }
    echo })
) > vite.config.local.js

echo  Installing npm packages...
call npm install > "%LOG_DIR%\npm-install.log" 2>&1
if errorlevel 1 (
    echo  [ERROR] npm install failed. See %LOG_DIR%\npm-install.log
    cd /d "%ROOT%"
    pause
    exit /b 1
)

start "Frontend :3000" cmd /k "npm run dev -- --config vite.config.local.js"
cd /d "%ROOT%"
echo  [OK] Frontend starting at http://localhost:%FRONTEND_PORT%
echo.

:: ================================================================
::  HEALTH CHECK  - poll until Eureka responds (max 2 min)
:: ================================================================
echo  Waiting for services to come up...
echo.
set /a W=0

:POLL
timeout /t 5 /nobreak >nul
set /a W+=5

curl -s -f "http://localhost:%EUREKA_PORT%/actuator/health" >nul 2>&1
if not errorlevel 1 goto :HEALTH_DONE

if %W% lss 120 (
    echo   %W%s - Eureka not ready yet...
    goto :POLL
)
echo  [TIMEOUT] Eureka took longer than 120s. Check its window for errors.

:HEALTH_DONE
echo.
curl -s -f "http://localhost:%EUREKA_PORT%/actuator/health" >nul 2>&1
if not errorlevel 1 echo  [UP] Eureka Server    http://localhost:%EUREKA_PORT%

curl -s -f "http://localhost:%GW_PORT%/actuator/health" >nul 2>&1
if not errorlevel 1 echo  [UP] API Gateway      http://localhost:%GW_PORT%

curl -s -f "http://localhost:%USER_PORT%/actuator/health" >nul 2>&1
if not errorlevel 1 echo  [UP] User Service     http://localhost:%USER_PORT%

curl -s -f "http://localhost:%CONTACT_PORT%/actuator/health" >nul 2>&1
if not errorlevel 1 echo  [UP] Contact Service  http://localhost:%CONTACT_PORT%

curl -s -f "http://localhost:%PROJECT_PORT%/actuator/health" >nul 2>&1
if not errorlevel 1 echo  [UP] Project Service  http://localhost:%PROJECT_PORT%

curl -s -f "http://localhost:%AUDIT_PORT%/actuator/health" >nul 2>&1
if not errorlevel 1 echo  [UP] Audit Service    http://localhost:%AUDIT_PORT%

curl -s -f "http://localhost:%FRONTEND_PORT%" >nul 2>&1
if not errorlevel 1 echo  [UP] Frontend         http://localhost:%FRONTEND_PORT%

:: ================================================================
::  SUMMARY
:: ================================================================
echo.
echo  ============================================================
echo   ALL SERVICES STARTED - PixelCraft Studio
echo  ============================================================
echo.
echo   Frontend      http://localhost:%FRONTEND_PORT%
echo   API Gateway   http://localhost:%GW_PORT%
echo   Eureka UI     http://localhost:%EUREKA_PORT%
echo.
echo   User Svc      http://localhost:%USER_PORT%/users
echo   Contact Svc   http://localhost:%CONTACT_PORT%/contact
echo   Project Svc   http://localhost:%PROJECT_PORT%/projects
echo   Audit Svc     http://localhost:%AUDIT_PORT%/actuator/health
echo.
echo   MySQL         localhost:%MYSQL_PORT%   user=%MYSQL_APP_USER%  pass=%MYSQL_APP_PASS%
echo   Redis         localhost:%REDIS_PORT%
echo   Kafka         localhost:%KAFKA_PORT%
echo   Zookeeper     localhost:%ZK_PORT%
echo.
echo   Logs          %LOG_DIR%\
echo   To stop       run stop-local.bat
echo  ============================================================
echo.

set /p OB=Open browser now? (Y/n): 
if /i not "%OB%"=="n" (
    start http://localhost:%FRONTEND_PORT%
    start http://localhost:%EUREKA_PORT%
)

echo.
echo  All windows are in the taskbar.
echo  Press any key to close this launcher. Services keep running.
echo.
pause >nul
endlocal
goto :eof

:: ================================================================
::  SUBROUTINE  :launch  "Title"  folder  port  dbname
::  dbname is empty string "" for eureka and api-gateway
:: ================================================================
:launch
set L_TITLE=%~1
set L_DIR=%~2
set L_PORT=%~3
set L_DB=%~4

:: Find the runnable JAR (skip sources/javadoc/original jars)
set L_JAR=
for /f "delims=" %%J in ('dir /b /s "%ROOT%\backend\%L_DIR%\target\*.jar" 2^>nul') do (
    echo "%%J" | findstr /i "sources javadoc original" >nul 2>&1
    if errorlevel 1 (
        set L_JAR=%%J
        goto :jar_found_%L_DIR%
    )
)
:jar_found_%L_DIR%

if "%L_JAR%"=="" (
    echo  [ERROR] JAR not found for %L_DIR% - check build log.
    goto :eof
)

:: Build the java command
set JCMD=java
set JCMD=%JCMD% -Dspring.profiles.active=local
set JCMD=%JCMD% -Dserver.port=%L_PORT%
set JCMD=%JCMD% -Dspring.data.redis.mode=standalone
set JCMD=%JCMD% -Dspring.data.redis.host=localhost
set JCMD=%JCMD% -Dspring.data.redis.port=%REDIS_PORT%
set JCMD=%JCMD% -Dspring.kafka.bootstrap-servers=localhost:%KAFKA_PORT%
set JCMD=%JCMD% -Deureka.client.service-url.defaultZone=http://localhost:%EUREKA_PORT%/eureka/
set JCMD=%JCMD% -Deureka.instance.hostname=localhost
set JCMD=%JCMD% -Deureka.instance.prefer-ip-address=true

if not "%L_DB%"=="" (
    set JCMD=%JCMD% -Dspring.jpa.hibernate.ddl-auto=update
    set JCMD=%JCMD% "-Dspring.datasource.url=jdbc:mysql://localhost:%MYSQL_PORT%/%L_DB%?useSSL=false&allowPublicKeyRetrieval=true&createDatabaseIfNotExist=true"
    set JCMD=%JCMD% -Dspring.datasource.username=%MYSQL_APP_USER%
    set JCMD=%JCMD% -Dspring.datasource.password=%MYSQL_APP_PASS%
)

set JCMD=%JCMD% -jar "%L_JAR%"

echo  Starting %L_TITLE% on port %L_PORT%...
start "%L_TITLE% :%L_PORT%" cmd /k "%JCMD%"
timeout /t 2 /nobreak >nul
echo  [OK] %L_TITLE% window opened.
goto :eof
