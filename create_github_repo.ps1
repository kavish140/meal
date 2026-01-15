# GitHub Repository Creation Script
# This script creates a GitHub repository and pushes your code

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Repository Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get GitHub credentials
Write-Host "Step 1: GitHub Authentication" -ForegroundColor Yellow
Write-Host "You'll need a GitHub Personal Access Token (PAT)" -ForegroundColor White
Write-Host "If you don't have one, create it at: https://github.com/settings/tokens" -ForegroundColor White
Write-Host "Required permissions: repo (full control)" -ForegroundColor White
Write-Host ""

$username = Read-Host "Enter your GitHub username"
$token = Read-Host "Enter your GitHub Personal Access Token (PAT)" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
$plainToken = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

Write-Host ""
Write-Host "Step 2: Repository Details" -ForegroundColor Yellow
$repoName = Read-Host "Enter repository name (default: meal-plan)"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "meal-plan"
}

$description = "Weekly meal plan website with password protection and daily notifications"

Write-Host ""
Write-Host "Creating repository: $repoName" -ForegroundColor Green

# Create repository using GitHub API
$headers = @{
    "Authorization" = "token $plainToken"
    "Accept" = "application/vnd.github.v3+json"
}

$body = @{
    "name" = $repoName
    "description" = $description
    "private" = $false
    "auto_init" = $false
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body -ContentType "application/json"

    Write-Host ""
    Write-Host "✅ Repository created successfully!" -ForegroundColor Green
    Write-Host "Repository URL: $($response.html_url)" -ForegroundColor Cyan
    Write-Host ""

    # Set up git remote
    Write-Host "Step 3: Configuring Git Remote" -ForegroundColor Yellow

    $remoteUrl = "https://${username}:${plainToken}@github.com/${username}/${repoName}.git"

    # Check if remote already exists
    $existingRemote = git remote get-url origin 2>$null
    if ($existingRemote) {
        Write-Host "Removing existing remote..." -ForegroundColor Yellow
        git remote remove origin
    }

    git remote add origin $remoteUrl
    Write-Host "✅ Remote configured" -ForegroundColor Green

    # Push to GitHub
    Write-Host ""
    Write-Host "Step 4: Pushing Code to GitHub" -ForegroundColor Yellow
    git branch -M main
    git push -u origin main

    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "✅ SUCCESS! Repository is live!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Repository URL: $($response.html_url)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Go to: $($response.html_url)/settings/pages" -ForegroundColor White
    Write-Host "2. Under 'Source', select branch: main" -ForegroundColor White
    Write-Host "3. Click 'Save'" -ForegroundColor White
    Write-Host "4. Your site will be live at: https://${username}.github.io/${repoName}/" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To add custom domain:" -ForegroundColor Yellow
    Write-Host "5. In Pages settings, enter your custom domain" -ForegroundColor White
    Write-Host "6. Make sure DNS CNAME points to: ${username}.github.io" -ForegroundColor White
    Write-Host ""

} catch {
    Write-Host ""
    Write-Host "❌ Error creating repository" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "1. Invalid token - Make sure your PAT has 'repo' permissions" -ForegroundColor White
    Write-Host "2. Repository already exists - Choose a different name" -ForegroundColor White
    Write-Host "3. Username incorrect - Double-check your GitHub username" -ForegroundColor White
    Write-Host ""
    Write-Host "Alternative: Create manually at https://github.com/new" -ForegroundColor Yellow
    Write-Host "Then run: git remote add origin https://github.com/$username/$repoName.git" -ForegroundColor White
    Write-Host "         git branch -M main" -ForegroundColor White
    Write-Host "         git push -u origin main" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

