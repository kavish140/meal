#!/usr/bin/env python3
"""
Auto-Update Script for Meal Plan Website
This script:
1. Converts Excel to JSON
2. Commits changes to git
3. Pushes to GitHub (which automatically updates the website)
"""

import pandas as pd
import json
import subprocess
import os
from datetime import datetime

def convert_excel_to_json():
    """Convert Excel file to JSON format"""
    excel_file = 'Weekly_Meal_Plan.xlsx'
    
    try:
        print("📖 Reading Excel file...")
        df = pd.read_excel(excel_file)
        
        days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        meal_plan = {}
        
        for day in days:
            if day in df.columns:
                meals_for_day = []
                for index, row in df.iterrows():
                    meal_time = str(row.iloc[0]) if pd.notna(row.iloc[0]) else ""
                    meal_item = str(row[day]) if pd.notna(row[day]) else ""
                    
                    if meal_item and meal_item != 'nan':
                        if meal_time and meal_time != 'nan':
                            meals_for_day.append(f"{meal_time}: {meal_item}")
                        else:
                            meals_for_day.append(meal_item)
                
                if meals_for_day:
                    meal_plan[day] = " | ".join(meals_for_day)
        
        # Save as JSON
        with open('mealplan.json', 'w', encoding='utf-8') as f:
            json.dump(meal_plan, f, indent=2, ensure_ascii=False)
        
        print("✅ Successfully converted Excel to JSON!")
        return True
        
    except FileNotFoundError:
        print(f"❌ Error: Could not find {excel_file}")
        return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def git_commit_and_push():
    """Commit changes and push to GitHub"""
    try:
        print("\n📦 Adding changes to git...")
        subprocess.run(['git', 'add', 'mealplan.json'], check=True)
        
        print("💾 Committing changes...")
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        commit_message = f"Auto-update: Meal plan updated on {timestamp}"
        subprocess.run(['git', 'commit', '-m', commit_message], check=True)
        
        print("🚀 Pushing to GitHub...")
        subprocess.run(['git', 'push'], check=True)
        
        print("\n✅ SUCCESS! Your website has been updated!")
        print("🌐 Changes will be live at your GitHub Pages URL in 1-2 minutes")
        return True
        
    except subprocess.CalledProcessError as e:
        if "nothing to commit" in str(e):
            print("\nℹ️  No changes detected in the meal plan")
        else:
            print(f"\n❌ Git error: {str(e)}")
        return False
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        return False

def main():
    """Main function"""
    print("=" * 60)
    print("🍽️  MEAL PLAN AUTO-UPDATE SCRIPT")
    print("=" * 60)
    
    # Step 1: Convert Excel to JSON
    if not convert_excel_to_json():
        return
    
    # Step 2: Commit and push to GitHub
    git_commit_and_push()
    
    print("\n" + "=" * 60)
    print("✨ Update process complete!")
    print("=" * 60)

if __name__ == "__main__":
    main()
