@echo off
REM Quick Update Script for Meal Plan Website
echo ========================================
echo Weekly Meal Plan - Update Script
echo ========================================
echo.

REM Activate virtual environment if it exists
if exist .venv\Scripts\activate.bat (
    call .venv\Scripts\activate.bat
)

REM Convert Excel to JSON
echo Step 1: Converting Excel to JSON...
python convert_excel_to_json.py

echo.
echo ========================================
echo IMPORTANT:
echo Copy the mealPlan object from above
echo and paste it into app.js
echo ========================================
echo.

pause

REM After user updates app.js, commit and push
echo.
echo Step 2: Ready to commit and push?
echo Press any key to continue or Ctrl+C to cancel...
pause

git add app.js
git commit -m "Updated meal plan - %date%"

echo.
echo Step 3: Pushing to GitHub...
git push

echo.
echo ========================================
echo Done! Your website will update in 1-2 minutes.
echo ========================================
pause

