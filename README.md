# Weekly Meal Plan Website

A password-protected website that displays your weekly meal plan and sends daily notifications at 10 PM about the next day's meals.

## Features

- 🔒 **Password Protection**: Secure access with password "K1681"
- 📅 **Daily Meal Schedule**: View today's meals and the entire week's schedule
- 🔔 **Daily Notifications**: Get browser notifications at 10 PM about tomorrow's meals
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations

## Files Included

- `index.html` - Main website HTML file
- `app.js` - JavaScript for functionality and notifications
- `convert_excel_to_json.py` - Python script to convert Excel to JSON
- `mealplan.json` - Generated JSON file with meal data
- `Weekly_Meal_Plan.xlsx` - Your original meal plan Excel file

## Setup Instructions

### 1. Update Meal Plan Data

If you modify the Excel file (`Weekly_Meal_Plan.xlsx`), you need to update the website:

```bash
# Install required Python packages (first time only)
pip install pandas openpyxl

# Run the conversion script
python convert_excel_to_json.py

# Copy the generated mealPlan object and paste it into app.js
```

### 2. Deploy to GitHub Pages

#### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `meal-plan` or use your domain name
3. Make it public (required for GitHub Pages)

#### Step 2: Push Your Code

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add index.html app.js README.md

# Commit
git commit -m "Initial commit - Weekly Meal Plan website"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **main** branch
5. Click **Save**
6. Your site will be published at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

#### Step 4: Configure Custom Domain (Optional)

If you have a custom domain and DNS already setup:

1. In GitHub repository settings under **Pages**
2. Enter your custom domain in the **Custom domain** field
3. Click **Save**
4. GitHub will verify your DNS configuration
5. Enable **Enforce HTTPS** (recommended)

Make sure your DNS has a CNAME record pointing to `YOUR_USERNAME.github.io`

### 3. Using the Website

1. **Login**: Enter password `K1681` to access the meal plan
2. **View Meals**: See today's meals and the full week schedule
3. **Enable Notifications**: Click the "Enable Notifications" button to receive daily reminders
4. **Daily Notifications**: You'll automatically receive a notification at 10 PM about tomorrow's meals

## Browser Notification Requirements

For notifications to work:
- Browser must support notifications (Chrome, Firefox, Edge, Safari)
- User must grant notification permission when prompted
- Website must be kept open in a browser tab (can be in background)
- For persistent notifications, consider keeping the tab pinned

## Updating the Meal Plan

Whenever you update your Excel file:

1. Run the conversion script: `python convert_excel_to_json.py`
2. Copy the generated mealPlan object
3. Replace the mealPlan object in `app.js`
4. Commit and push changes to GitHub:
   ```bash
   git add app.js
   git commit -m "Updated meal plan"
   git push
   ```

## Security Note

The password is stored in the JavaScript file for simplicity. For better security in a production environment, consider using proper backend authentication. For personal use with a simple password, this client-side approach is acceptable.

## Customization

### Change Password

Edit `app.js` and modify this line:
```javascript
const CORRECT_PASSWORD = "K1681";
```

### Change Notification Time

Edit `app.js` and modify the time check in the `checkAndSendNotification` function:
```javascript
// Change 22 to your desired hour (24-hour format)
if (hours === 22 && minutes === 0) {
```

### Modify Styling

Edit the `<style>` section in `index.html` to customize colors, fonts, and layout.

## Troubleshooting

**Notifications not working?**
- Check if browser notifications are allowed in browser settings
- Keep the website tab open (can be in background)
- Check if notification permission was granted when prompted

**Can't see updated meals?**
- Clear browser cache (Ctrl+Shift+Delete)
- Make sure you updated app.js with the new meal data
- Check if changes were pushed to GitHub

**Custom domain not working?**
- Verify DNS CNAME record is correctly configured
- Wait for DNS propagation (can take up to 24-48 hours)
- Check GitHub Pages settings shows the domain as verified

## Technical Details

- **Frontend**: Pure HTML, CSS, and JavaScript (no frameworks required)
- **Hosting**: GitHub Pages (free static hosting)
- **Notifications**: Browser Notification API
- **Storage**: LocalStorage for user preferences and SessionStorage for authentication
- **Data Format**: JSON object for meal plan data

## License

This is a personal project. Feel free to modify and use as needed.

## Support

For issues or questions about the code, check:
- Browser console for JavaScript errors (F12)
- GitHub Pages deployment status in repository settings
- DNS configuration if using custom domain

