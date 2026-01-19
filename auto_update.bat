@echo off
REM Auto-Update Script for Meal Plan Website (Windows Batch File)
REM Double-click this file after editing your Excel file

echo ============================================================
echo         MEAL PLAN AUTO-UPDATE SCRIPT
echo ============================================================
echo.

REM Activate virtual environment
echo Activating Python environment...
call .venv\Scripts\activate.bat

REM Run the update script
echo.
echo Running update script...
python auto_update.py

REM Deactivate virtual environment
call .venv\Scripts\deactivate.bat

echo.
echo ============================================================
echo Press any key to close this window...
pause >nul
