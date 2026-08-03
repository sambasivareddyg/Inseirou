@echo off
setlocal enabledelayedexpansion
title PixelCraft Studio - Stop Local Services

echo.
echo  ============================================================
echo   PixelCraft Studio  ^|  Stopping Local Services
echo  ============================================================
echo.

:: Kill Java processes (Spring Boot services)
echo  Stopping Spring Boot services (Java)...
for %%P in (8761 8080 8081 8082 8083 8084) do (
    for /f "tokens=5" %%I in ('netstat -aon 2^>nul ^| findstr ":%%P " ^| findstr "LISTENING"') do (
        echo   Killing PID %%I on port %%P
        taskkill /PID %%I /F >nul 2>&1
    )
)
echo  [OK] Spring Boot services stopped.

:: Kill Node/Vite (frontend)
echo  Stopping Frontend (Node/Vite)...
for /f "tokens=5" %%I in ('netstat -aon 2^>nul ^| findstr ":3000 " ^| findstr "LISTENING"') do (
    echo   Killing PID %%I on port 3000
    taskkill /PID %%I /F >nul 2>&1
)
echo  [OK] Frontend stopped.

:: Kill Redis
echo  Stopping Redis...
taskkill /IM redis-server.exe /F >nul 2>&1
for /f "tokens=5" %%I in ('netstat -aon 2^>nul ^| findstr ":6379 " ^| findstr "LISTENING"') do (
    taskkill /PID %%I /F >nul 2>&1
)
echo  [OK] Redis stopped.

:: Kill Kafka and Zookeeper
echo  Stopping Kafka and Zookeeper...
taskkill /IM kafka.Kafka /F >nul 2>&1
for /f "tokens=5" %%I in ('netstat -aon 2^>nul ^| findstr ":9092 " ^| findstr "LISTENING"') do (
    taskkill /PID %%I /F >nul 2>&1
)
for /f "tokens=5" %%I in ('netstat -aon 2^>nul ^| findstr ":2181 " ^| findstr "LISTENING"') do (
    taskkill /PID %%I /F >nul 2>&1
)
echo  [OK] Kafka and Zookeeper stopped.

:: Optional: clean Kafka/ZK data
echo.
set /p CLEAN="Clean local Kafka/Zookeeper data folders? (.local\) (y/N): "
if /i "!CLEAN!"=="y" (
    if exist "%~dp0.local" (
        rd /s /q "%~dp0.local"
        echo  [OK] Local data cleaned.
    )
)

echo.
echo  All services stopped.
echo  Run start-local.bat to start again.
echo.
pause
endlocal
