@echo off
REM Simple GitHub Repository Setup Script
echo ========================================
echo GitHub Repository Setup
echo ========================================
echo.

echo IMPORTANT: You need a GitHub Personal Access Token (PAT)
echo.
echo If you don't have one:
echo 1. Go to: https://github.com/settings/tokens
echo 2. Click "Generate new token (classic)"
echo 3. Select scope: "repo" (full control)
echo 4. Generate and copy the token
echo.
echo ========================================
echo.

set /p USERNAME="Enter your GitHub username: "
set /p TOKEN="Enter your GitHub Personal Access Token: "
set /p REPONAME="Enter repository name (default: meal-plan): "

if "%REPONAME%"=="" set REPONAME=meal-plan

echo.
echo Creating repository via GitHub API...
echo.

REM Create repository using curl (PowerShell method)
powershell -Command "$headers = @{'Authorization'='token %TOKEN%'; 'Accept'='application/vnd.github.v3+json'}; $body = @{'name'='%REPONAME%'; 'description'='Weekly meal plan website'; 'private'=$false; 'auto_init'=$false} | ConvertTo-Json; try { $response = Invoke-RestMethod -Uri 'https://api.github.com/user/repos' -Method Post -Headers $headers -Body $body -ContentType 'application/json'; Write-Host 'Repository created successfully!' -ForegroundColor Green; Write-Host 'URL: ' $response.html_url -ForegroundColor Cyan } catch { Write-Host 'Error: ' $_.Exception.Message -ForegroundColor Red; exit 1 }"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ========================================
    echo ERROR: Could not create repository
    echo ========================================
    echo.
    echo Please create the repository manually:
    echo 1. Go to: https://github.com/new
    echo 2. Name: %REPONAME%
    echo 3. Make it Public
    echo 4. Don't initialize with README
    echo 5. Click "Create repository"
    echo.
    echo Then run these commands:
    echo git remote add origin https://github.com/%USERNAME%/%REPONAME%.git
    echo git branch -M main
    echo git push -u origin main
    echo.
    pause
    exit /b 1
)

echo.
echo Setting up git remote...
git remote remove origin 2>nul
git remote add origin https://%USERNAME%:%TOKEN%@github.com/%USERNAME%/%REPONAME%.git

echo Pushing to GitHub...
git branch -M main
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! Repository is live!
    echo ========================================
    echo.
    echo Repository: https://github.com/%USERNAME%/%REPONAME%
    echo.
    echo NEXT STEPS:
    echo 1. Go to: https://github.com/%USERNAME%/%REPONAME%/settings/pages
    echo 2. Source: Select "main" branch
    echo 3. Click "Save"
    echo 4. Your site will be live at: https://%USERNAME%.github.io/%REPONAME%/
    echo.
    echo To add custom domain:
    echo 5. In Pages settings, enter your domain
    echo 6. DNS CNAME: %USERNAME%.github.io
    echo.
) else (
    echo.
    echo ERROR: Could not push to GitHub
    echo Please check your credentials and try again
    echo.
)

pause

