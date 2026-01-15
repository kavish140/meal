import pandas as pd
import json
import os
from datetime import datetime

# Read the Excel file
excel_file = 'Weekly_Meal_Plan.xlsx'

try:
    # Read the Excel file
    df = pd.read_excel(excel_file)

    # Display the structure of the Excel file
    print("Excel file columns:", df.columns.tolist())
    print("\nFirst few rows:")
    print(df.head())

    # The Excel has days as columns (Monday through Sunday)
    # and rows for different meal times and weeks

    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    # Create a structure that combines all meals for each day
    meal_plan = {}

    for day in days:
        if day in df.columns:
            meals_for_day = []
            for index, row in df.iterrows():
                meal_time = str(row.iloc[0]) if pd.notna(row.iloc[0]) else ""
                week = str(row.iloc[1]) if pd.notna(row.iloc[1]) else ""
                meal_item = str(row[day]) if pd.notna(row[day]) else ""

                if meal_item and meal_item != 'nan':
                    if meal_time and meal_time != 'nan':
                        meals_for_day.append(f"{meal_time}: {meal_item}")
                    else:
                        meals_for_day.append(meal_item)

            # Join all meals for the day
            if meals_for_day:
                meal_plan[day] = " | ".join(meals_for_day)

    # If no meals found with the complex structure, try simpler approach
    if not meal_plan or all(not v for v in meal_plan.values()):
        print("\nTrying simplified extraction...")
        for day in days:
            if day in df.columns:
                # Get all non-null values for this day
                day_values = df[day].dropna().tolist()
                if day_values:
                    # Use the first value or combine them
                    meal_plan[day] = str(day_values[0])

    # Save as JSON
    with open('mealplan.json', 'w', encoding='utf-8') as f:
        json.dump(meal_plan, f, indent=2, ensure_ascii=False)

    print("\n✅ Successfully converted Excel to JSON!")
    print("\nMeal Plan:")
    print(json.dumps(meal_plan, indent=2, ensure_ascii=False))

    # Generate JavaScript code to update app.js
    print("\n" + "="*50)
    print("Copy this to update the mealPlan object in app.js:")
    print("="*50)
    print("const mealPlan = " + json.dumps(meal_plan, indent=4, ensure_ascii=False) + ";")

except FileNotFoundError:
    print(f"❌ Error: Could not find {excel_file}")
    print("Please make sure the file exists in the current directory.")
except Exception as e:
    print(f"❌ Error: {str(e)}")
    import traceback
    traceback.print_exc()
    print("\nPlease check your Excel file structure.")

