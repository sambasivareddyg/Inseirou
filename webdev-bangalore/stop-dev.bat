@echo off
:: ============================================================
::  PixelCraft Studio — Stop Dev Environment
:: ============================================================
title PixelCraft Studio - Stopping

echo.
echo  Stopping PixelCraft Studio dev environment...
echo.

set /p WIPE="Wipe all data volumes too? This deletes MySQL/Redis/Kafka data (y/N): "
if /i "%WIPE%"=="y" (
    docker compose down -v --remove-orphans
    echo  [OK] All containers AND volumes removed.
) else (
    docker compose down --remove-orphans
    echo  [OK] All containers stopped. Data volumes preserved.
)

echo.
echo  Done! Run start-dev.bat to start again.
echo.
pause
