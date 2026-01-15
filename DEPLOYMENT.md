# Quick Deployment Guide

## Step 1: Initialize Git Repository

```powershell
cd S:\Python\Projects\food_schedule
git init
git add index.html app.js README.md .gitignore
git commit -m "Initial commit: Weekly Meal Plan website"
```

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `meal-plan` (or your choice)
3. Make it **Public** (required for free GitHub Pages)
4. Do NOT initialize with README (we already have one)
5. Click "Create repository"

## Step 3: Push to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/meal-plan.git
git branch -M main
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in left sidebar
4. Under **Source**, select branch: **main**
5. Click **Save**
6. Wait 1-2 minutes
7. Your site will be live at: `https://YOUR_USERNAME.github.io/meal-plan/`

## Step 5: Configure Custom Domain (If you have one)

In GitHub Settings > Pages:
1. Enter your custom domain (e.g., `meals.yourdomain.com`)
2. Click **Save**
3. Enable **Enforce HTTPS**

Make sure your DNS has:
- Type: CNAME
- Name: meals (or @ for root domain)
- Value: YOUR_USERNAME.github.io

## Step 6: Test Your Website

1. Visit your GitHub Pages URL
2. Enter password: `K1681`
3. Click "Enable Notifications" to test
4. Verify today's meals are displayed correctly

## Updating the Website

When you update the Excel file:

```powershell
# Convert Excel to JSON
python convert_excel_to_json.py

# Update app.js with the new mealPlan object (copy from script output)

# Commit and push
git add app.js
git commit -m "Updated meal plan"
git push
```

Changes will be live on GitHub Pages within 1-2 minutes.

## Troubleshooting

**Site not loading?**
- Make sure repository is public
- Check Settings > Pages shows "Your site is live at..."
- Wait a few minutes after first deployment

**Password not working?**
- Password is case-sensitive: `K1681`
- Try clearing browser cache (Ctrl+Shift+Delete)

**Notifications not working?**
- Click "Enable Notifications" button
- Allow notifications when browser prompts
- Keep tab open (can be minimized/background)

**Changes not showing?**
- Clear browser cache
- Do a hard refresh (Ctrl+F5)
- Check if git push was successful

## Need Help?

Check the full README.md for detailed instructions and troubleshooting.

