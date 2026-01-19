# Quick GitHub Repository Creation - Manual Method

Since your GitHub is now working, here's the quickest way:

## Method 1: Create via GitHub Web (Easiest - 2 minutes)

### Step 1: Create Repository on GitHub
1. Click the "New" button (green button in the top left on your GitHub dashboard)
   OR go to: https://github.com/new

2. Fill in:
   - Repository name: **meal-plan**
   - Description: Weekly meal plan website with notifications
   - ✅ Public (must be public for free GitHub Pages)
   - ❌ Do NOT initialize with README
   - Click "Create repository"

### Step 2: Push Your Code
After creating the repository, GitHub will show you commands. 
Instead, just run these commands in PowerShell:

```powershell
cd S:\Python\Projects\food_schedule

# Add the remote (replace kavish140 if different username)
git remote add origin https://github.com/kavish140/meal-plan.git

# Push your code
git branch -M main
git push -u origin main
```

When prompted for username/password:
- Username: kavish140
- Password: Use your GitHub Personal Access Token (or your regular password if it works)

### Step 3: Enable GitHub Pages
1. Go to: https://github.com/kavish140/meal-plan/settings/pages
2. Under "Source", select: **main** branch
3. Click "Save"
4. Wait 1-2 minutes

Your site will be live at: **https://kavish140.github.io/meal-plan/**

---

## Method 2: Create with Personal Access Token (Automated)

If you want to use the automated script:

1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select "repo" scope
4. Copy the token
5. Run: `.\create_github_repo.ps1`
6. Enter your token when prompted

---

## Commands Ready to Copy-Paste:

```powershell
cd S:\Python\Projects\food_schedule
git remote add origin https://github.com/kavish140/meal-plan.git
git branch -M main
git push -u origin main
```

After this succeeds, go to:
https://github.com/kavish140/meal-plan/settings/pages

And enable GitHub Pages with branch: main

---

**Recommended: Use Method 1** (create on GitHub web, then push)
It's faster since your GitHub is working now!

