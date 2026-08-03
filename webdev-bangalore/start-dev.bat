@echo off
setlocal enabledelayedexpansion

:: ============================================================
::  PixelCraft Studio — Local Development Startup
::  Works on Windows (CMD / PowerShell / Git Bash)
::  Requirements: Docker Desktop must be running
:: ============================================================

title PixelCraft Studio - Dev Environment

echo.
echo  ██████╗ ██╗██╗  ██╗███████╗██╗      ██████╗██████╗  █████╗ ███████╗████████╗
echo  ██╔══██╗██║╚██╗██╔╝██╔════╝██║     ██╔════╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝
echo  ██████╔╝██║ ╚███╔╝ █████╗  ██║     ██║     ██████╔╝███████║█████╗     ██║
echo  ██╔═══╝ ██║ ██╔██╗ ██╔══╝  ██║     ██║     ██╔══██╗██╔══██║██╔══╝     ██║
echo  ██║     ██║██╔╝ ██╗███████╗███████╗╚██████╗██║  ██║██║  ██║██║        ██║
echo  ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝        ╚═╝
echo.
echo  Studio  :  PixelCraft Studio, Bangalore
echo  Mode    :  Local Development
echo  Date    :  %DATE% %TIME%
echo  ============================================================
echo.

:: ── Step 1: Check Docker ──────────────────────────────────────
echo [1/5] Checking Docker Desktop...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Docker Desktop is not running!
    echo  Please start Docker Desktop and try again.
    echo  Download: https://www.docker.com/products/docker-desktop
    echo.
    pause
    exit /b 1
)
echo  [OK] Docker Desktop is running.

:: ── Step 2: Check Docker Compose ─────────────────────────────
echo [2/5] Checking Docker Compose...
docker compose version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Docker Compose not found.
    echo  Please update Docker Desktop to a recent version.
    echo.
    pause
    exit /b 1
)
echo  [OK] Docker Compose is available.

:: ── Step 3: Check docker-compose.yml exists ──────────────────
echo [3/5] Checking project files...
if not exist "docker-compose.yml" (
    echo.
    echo  [ERROR] docker-compose.yml not found!
    echo  Please run this script from the project root folder:
    echo    cd path\to\webdev-bangalore
    echo    start-dev.bat
    echo.
    pause
    exit /b 1
)
echo  [OK] Project files found.

:: ── Step 4: Stop any existing containers ─────────────────────
echo [4/5] Stopping any existing containers...
docker compose down --remove-orphans >nul 2>&1
echo  [OK] Cleaned up old containers.

:: ── Step 5: Pull base images and build ───────────────────────
echo [5/5] Building and starting all services...
echo.
echo  This will take 5-15 minutes on first run (downloading images ^& building).
echo  Subsequent starts will be much faster.
echo.

docker compose up --build -d

if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Failed to start services. Check the logs:
    echo    docker compose logs
    echo.
    pause
    exit /b 1
)

:: ── Wait for services to be healthy ──────────────────────────
echo.
echo  Waiting for services to become healthy...
echo  (MySQL, Redis, Kafka and Spring Boot services need ~60-90 seconds)
echo.

set /a wait=0
:WAIT_LOOP
if !wait! geq 90 goto DONE_WAITING
timeout /t 5 /nobreak >nul
set /a wait+=5
set /a pct=wait*100/90
if !pct! gtr 100 set pct=99
echo   Waiting... !wait!s / 90s  [!pct!%%]
goto WAIT_LOOP

:DONE_WAITING

:: ── Show running containers ───────────────────────────────────
echo.
echo  ============================================================
echo   SERVICES STATUS
echo  ============================================================
docker compose ps
echo.

:: ── Print access URLs ─────────────────────────────────────────
echo  ============================================================
echo   ACCESS URLs  (open in your browser)
echo  ============================================================
echo.
echo   Frontend (React)       :  http://localhost:3000
echo   API Gateway            :  http://localhost:8080
echo   Eureka Dashboard       :  http://localhost:8761
echo   Kafka UI               :  http://localhost:8090
echo   ─────────────────────────────────────────────────────
echo   User Service           :  http://localhost:8081/users
echo   Contact Service        :  http://localhost:8082/contact
echo   Project Service        :  http://localhost:8083/projects
echo   Audit Service          :  http://localhost:8084/actuator/health
echo   ─────────────────────────────────────────────────────
echo   MySQL (via any client) :  localhost:3306  user=webdev  pass=webdev123
echo   Redis Node 1           :  localhost:6379
echo.

:: ── Quick API test ────────────────────────────────────────────
echo  ============================================================
echo   QUICK TEST COMMANDS  (run in a new terminal)
echo  ============================================================
echo.
echo   # Get all projects
echo   curl http://localhost:8080/api/projects
echo.
echo   # Submit contact form
echo   curl -X POST http://localhost:8080/api/contact ^
echo     -H "Content-Type: application/json" ^
echo     -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"message\":\"Hello!\"}"
echo.
echo   # View logs for a service
echo   docker compose logs -f user-service
echo   docker compose logs -f audit-service
echo.
echo   # Stop everything
echo   docker compose down
echo.
echo  ============================================================
echo   Dev environment is UP!  Happy coding from Bangalore!
echo  ============================================================
echo.

:: ── Open browser ─────────────────────────────────────────────
set /p OPEN_BROWSER="Open http://localhost:3000 in browser? (Y/n): "
if /i "!OPEN_BROWSER!" neq "n" (
    start http://localhost:3000
    start http://localhost:8761
    start http://localhost:8090
)

echo.
echo  Tip: Run  docker compose logs -f  to tail all service logs.
echo  Press any key to exit this window (services will keep running).
echo.
pause >nul
endlocal
