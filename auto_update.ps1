# Auto-Update Script for Meal Plan Website (PowerShell)
# Run this after editing your Excel file

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "         MEAL PLAN AUTO-UPDATE SCRIPT" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Activate virtual environment
Write-Host "Activating Python environment..." -ForegroundColor Yellow
& .\.venv\Scripts\Activate.ps1

# Run the update script
Write-Host ""
Write-Host "Running update script..." -ForegroundColor Yellow
python auto_update.py

# Check if successful
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "SUCCESS! Your website will be updated in 1-2 minutes" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Red
    Write-Host "There was an error. Please check the output above." -ForegroundColor Red
    Write-Host "============================================================" -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to close..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
