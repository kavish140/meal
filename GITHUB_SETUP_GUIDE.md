# Creating GitHub Repository via Terminal

Since GitHub web interface is having issues, here's how to create the repository via terminal/scripts.

## 📋 Prerequisites

You'll need a GitHub Personal Access Token (PAT). Here's how to get one:

1. Go to: https://github.com/settings/tokens
2. Click "**Generate new token (classic)**"
3. Give it a name: "Meal Plan Website"
4. Select scope: ✅ **repo** (Full control of private repositories)
5. Click "**Generate token**"
6. **COPY THE TOKEN** - You won't see it again!

## 🚀 Method 1: Use PowerShell Script (Recommended)

I've created a PowerShell script that will:
- Create the GitHub repository
- Configure git remote
- Push your code
- Give you the next steps

### Run the script:

```powershell
cd S:\Python\Projects\food_schedule
.\create_github_repo.ps1
```

The script will ask for:
- Your GitHub username
- Your Personal Access Token (PAT)
- Repository name (press Enter for "meal-plan")

## 🚀 Method 2: Use Batch Script

Alternatively, use the simpler batch file:

```cmd
cd S:\Python\Projects\food_schedule
create_github_repo.bat
```

## 🚀 Method 3: Manual Commands (If scripts don't work)

If both scripts fail, you can use these manual commands:

### Step 1: Create repository via PowerShell API call

```powershell
cd S:\Python\Projects\food_schedule

# Set your credentials
$username = "YOUR_GITHUB_USERNAME"
$token = "YOUR_PERSONAL_ACCESS_TOKEN"
$repoName = "meal-plan"

# Create repository
$headers = @{
    "Authorization" = "token $token"
    "Accept" = "application/vnd.github.v3+json"
}

$body = @{
    "name" = $repoName
    "description" = "Weekly meal plan website with notifications"
    "private" = $false
    "auto_init" = $false
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body -ContentType "application/json"

Write-Host "Repository created: $($response.html_url)"
```

### Step 2: Configure git and push

```powershell
# Set up remote (replace USERNAME and TOKEN)
git remote add origin https://USERNAME:TOKEN@github.com/USERNAME/meal-plan.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🚀 Method 4: Using curl (If you have it)

```bash
# Replace YOUR_USERNAME and YOUR_TOKEN
curl -X POST -H "Authorization: token YOUR_TOKEN" \
     -H "Accept: application/vnd.github.v3+json" \
     https://api.github.com/user/repos \
     -d '{"name":"meal-plan","description":"Weekly meal plan website","private":false}'

# Then configure git
git remote add origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/meal-plan.git
git branch -M main
git push -u origin main
```

## ✅ After Repository is Created

Once the repository is created and code is pushed:

### Enable GitHub Pages:

1. Go to: `https://github.com/YOUR_USERNAME/meal-plan/settings/pages`
2. Under "**Source**", select branch: **main**
3. Click "**Save**"
4. Wait 1-2 minutes

Your site will be live at: `https://YOUR_USERNAME.github.io/meal-plan/`

### Add Custom Domain (Optional):

1. In GitHub Pages settings, enter your custom domain
2. Click "**Save**"
3. Enable "**Enforce HTTPS**"
4. Make sure your DNS has CNAME record pointing to: `YOUR_USERNAME.github.io`

## 🆘 Troubleshooting

### Error: "Bad credentials"
- Check your Personal Access Token is correct
- Make sure the token has "repo" scope
- Token should not have expired

### Error: "Repository already exists"
- Choose a different repository name
- Or delete the existing repository first

### Error: "Could not resolve host"
- Check your internet connection
- Try again in a few minutes

### PowerShell Execution Policy Error
If you get "cannot be loaded because running scripts is disabled", run:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

## 📝 Security Note

**After pushing, update your git remote to remove the token from URL:**

```powershell
# Remove remote with token in URL
git remote remove origin

# Add remote without token
git remote add origin https://github.com/YOUR_USERNAME/meal-plan.git

# For future pushes, git will ask for credentials
# Or use SSH keys (more secure)
```

## 🔐 Better: Use SSH Keys (Optional)

For more secure authentication:

1. Generate SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
2. Add to GitHub: https://github.com/settings/keys
3. Use SSH remote: `git remote set-url origin git@github.com:USERNAME/meal-plan.git`

---

## 🎯 Quick Start (TL;DR)

**Easiest method:**

1. Get PAT from: https://github.com/settings/tokens (select "repo" scope)
2. Run: `.\create_github_repo.ps1`
3. Enter username, token, and repository name
4. Done! Go to Settings > Pages to enable

---

## Need Help?

If all methods fail, you can:
1. Try creating the repository from a different browser
2. Use GitHub mobile app to create repository
3. Ask someone else with GitHub access to create it for you
4. Wait for GitHub web interface to work again

Once repository exists on GitHub, you can always push with:
```powershell
git remote add origin https://github.com/USERNAME/REPONAME.git
git push -u origin main
```

