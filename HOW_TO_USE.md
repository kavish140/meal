# 🍽️ Smart Meal Planner - User Guide

## ✨ NEW FEATURES

Your meal planner has been completely redesigned with amazing new features!

### 🎨 **Modern Responsive Design**
- **Full-screen layout** that adapts to any device
- **Sidebar navigation** for easy access to all features
- **Mobile-friendly** - works perfectly on phones and tablets
- **Beautiful animations** and smooth transitions

### 📱 **New Sections**

1. **📊 Overview Dashboard**
   - Today's meals at a glance
   - Quick statistics
   - Week preview

2. **📅 Today's Meals**
   - Detailed view of all meals for today
   - Time-based meal organization

3. **🗓️ Week Schedule**
   - Complete week view
   - Expandable meal details for each day

4. **🛒 Shopping List**
   - Auto-generate shopping list from weekly meals
   - Check off items as you shop
   - Organized by ingredients

5. **⭐ Favorites**
   - Save your favorite meals
   - Quick access to frequently eaten items

6. **📜 History**
   - Track your meal history
   - See what you've eaten before

7. **🔔 Notifications**
   - Daily reminders at 10 PM
   - Get notified about tomorrow's meals

### 🔍 **Search Feature**
- Search across all meals in your plan
- Instantly find specific dishes
- Filter by ingredients or meal names

### 📥 **Export Data**
- Download your meal plan as JSON
- Backup your data anytime

### 🔄 **Auto-Refresh**
- Reload meal data with one click
- Always see the latest updates

---

## 🚀 HOW TO UPDATE YOUR MEAL PLAN

The website now **automatically loads from your Excel file**! Here's how:

### **Method 1: Double-Click Update (EASIEST)** ⭐

1. Edit `Weekly_Meal_Plan.xlsx` with your new meals
2. Save the Excel file
3. **Double-click** `auto_update.bat` (or `auto_update.ps1` for PowerShell)
4. Wait for the script to finish
5. Your website will be updated in 1-2 minutes!

### **Method 2: Manual Update**

```powershell
# 1. Activate virtual environment
.\.venv\Scripts\Activate.ps1

# 2. Convert Excel to JSON
python convert_excel_to_json.py

# 3. Commit and push changes
git add mealplan.json
git commit -m "Updated meal plan"
git push
```

### **Method 3: Use the Python Script**

```powershell
python auto_update.py
```

---

## 🔐 **Password Persistence**

✅ **Your password is now remembered!**
- Log in once and stay logged in
- Password persists even after closing the browser
- Only need to logout manually when you want to sign out

---

## 📱 **Mobile Usage**

On mobile devices:
- Tap the **☰ menu button** (bottom right) to open the sidebar
- Swipe through different sections
- All features work perfectly on touch devices

---

## 🎯 **How Each Feature Works**

### **Shopping List**
1. Go to Shopping List section
2. Click "Generate from Week Plan"
3. All ingredients are automatically extracted
4. Check off items as you buy them

### **Search**
1. Use the search bar at the top
2. Type any meal name or ingredient
3. Results appear instantly
4. Automatically switches to week view with filtered results

### **Notifications**
1. Go to Notifications section
2. Click "Enable Notifications"
3. Allow browser notifications
4. Get reminded at 10 PM daily

### **Export**
1. Click "📥 Export" button
2. Your meal plan downloads as JSON
3. Use it for backup or sharing

---

## 🎨 **Customization**

### Change Password
Edit `app.js` line 2:
```javascript
const CORRECT_PASSWORD = "YOUR_NEW_PASSWORD";
```

### Change Colors
Edit the CSS variables in `index.html`:
```css
:root {
    --primary-color: #667eea;  /* Change these colors */
    --secondary-color: #764ba2;
    --success-color: #28a745;
    --warning-color: #ffc107;
}
```

### Change Notification Time
Edit `app.js` around line 470:
```javascript
if (hours === 22 && minutes === 0) {  // 22 = 10 PM
```

---

## 📊 **File Structure**

```
meal_schedule/
├── index.html              # Main website (responsive design)
├── app.js                  # All functionality (loads from JSON)
├── mealplan.json           # Your meal data (auto-generated)
├── Weekly_Meal_Plan.xlsx   # Your Excel file (edit this)
├── auto_update.py          # Python update script
├── auto_update.bat         # Windows batch script
├── auto_update.ps1         # PowerShell script
└── README.md              # This file
```

---

## 🔥 **Quick Tips**

1. **Edit Excel → Double-click auto_update.bat → Done!**
2. The website automatically loads from `mealplan.json`
3. Search works across all meals instantly
4. Shopping list extracts all unique ingredients
5. Mobile menu appears automatically on small screens
6. All data is stored in your browser (localStorage)

---

## ❓ **Troubleshooting**

### Website doesn't update?
- Make sure you ran the auto-update script
- Wait 1-2 minutes for GitHub Pages to refresh
- Clear your browser cache (Ctrl+F5)

### Can't see new meals?
- Click the "🔄 Refresh" button
- Check that `mealplan.json` was updated

### Notifications not working?
- Make sure you clicked "Allow" for notifications
- Check browser notification settings
- Notifications only work on HTTPS sites

### Mobile menu not showing?
- The mobile menu only appears on screens smaller than 768px
- Look for the ☰ button in the bottom right corner

---

## 🌐 **Your Website URL**

Visit your meal planner at:
```
https://[your-username].github.io/[repository-name]/
```

---

## 📝 **Changelog**

### Version 2.0 (Latest)
- ✅ Complete responsive redesign
- ✅ Sidebar navigation
- ✅ Search functionality
- ✅ Shopping list generator
- ✅ Favorites and history sections
- ✅ Auto-load from JSON
- ✅ Mobile-optimized
- ✅ One-click update scripts
- ✅ Password persistence
- ✅ Export feature
- ✅ Modern UI with animations

---

## 💡 **Need Help?**

1. Check this README
2. Look at the console (F12 in browser)
3. Make sure all files are present
4. Verify `mealplan.json` has your data

---

**Enjoy your smart meal planner! 🎉**
