// Meal plan data from Weekly_Meal_Plan.xlsx
// This is automatically generated from your Excel file
const mealPlan = {
    "Monday": "Morning: Thepla / Sheera | Afternoon: Bhindi / Fansi | Evening: Fruits | Night: Dal Rice / Thepla",
    "Tuesday": "Morning: Corn / Thepla | Afternoon: Paneer Palak / Paneer Red Gravy | Evening: Bhel / Popcorn (Salted) | Night: Dosa / Kali Khichdi",
    "Wednesday": "Morning: Dosa / Paratha / Bonda | Afternoon: Pav Bhaji (without Pav) / Cauliflower | Evening: Fruits | Night: Fried Rice / Rotla",
    "Thursday": "Morning: Breadless Sandwich / Bonda | Afternoon: Miscellaneous | Evening: Snacks | Night: Dal Rice / Kali Khichdi",
    "Friday": "Morning: Chana / Millet Dosa / Green Dosa | Afternoon: Gawar / Methi Mutter Malai | Evening: Fruits | Night: Chaat / Dal Rice",
    "Saturday": "Morning: Poha / Thepla | Afternoon: Chole Paratha / Matki | Evening: Bhel | Night: Dosa / Uttapa / Quesadilla",
    "Sunday": "Morning: Dosa / Uttapa / Quesadilla | Afternoon: Dal Dhokli | Evening: Fruits | Night: Dal Rice / Kali Khichdi"
};

// Password constant
const CORRECT_PASSWORD = "K1681";

// Toggle meal card expansion
function toggleMealCard(card) {
    card.classList.toggle('expanded');
}

// Toggle day item expansion
function toggleDayItem(item) {
    item.classList.toggle('expanded');
}

// Login function
function login() {
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    if (passwordInput.value === CORRECT_PASSWORD) {
        // Store authentication in session
        sessionStorage.setItem('authenticated', 'true');

        // Hide login form and show dashboard
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('dashboard').classList.add('active');

        // Load meal data
        loadMealData();

        // Check notification status
        checkNotificationStatus();

        // Setup notification scheduler
        setupNotificationScheduler();
    } else {
        errorMessage.classList.add('show');
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// Logout function
function logout() {
    sessionStorage.removeItem('authenticated');
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('dashboard').classList.remove('active');
    document.getElementById('password').value = '';
    document.getElementById('errorMessage').classList.remove('show');
}

// Check if user is already authenticated
function checkAuth() {
    if (sessionStorage.getItem('authenticated') === 'true') {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('dashboard').classList.add('active');
        loadMealData();
        checkNotificationStatus();
        setupNotificationScheduler();
    }
}

// Get current day name
function getCurrentDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    return days[today.getDay()];
}

// Get tomorrow's day name
function getTomorrowDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return days[tomorrow.getDay()];
}

// Load meal data for today
function loadMealData() {
    const currentDay = getCurrentDay();
    const todayMeal = mealPlan[currentDay] || "No meal planned";

    document.getElementById('todayDay').textContent = currentDay;

    // Parse and display meals by time
    const todayMealsDiv = document.getElementById('todayMeals');
    todayMealsDiv.innerHTML = '';

    if (todayMeal && todayMeal !== "No meal planned") {
        // Split by | to get different meal times
        const mealTimes = todayMeal.split('|').map(m => m.trim());

        mealTimes.forEach(mealTime => {
            const mealInfo = document.createElement('div');
            mealInfo.className = 'meal-info';

            // Check if it has a time prefix (e.g., "Morning:", "Afternoon:")
            if (mealTime.includes(':')) {
                const parts = mealTime.split(':');
                const time = parts[0].trim();
                const meal = parts.slice(1).join(':').trim();
                mealInfo.innerHTML = `<strong>${time}:</strong><span>${meal}</span>`;
            } else {
                mealInfo.innerHTML = `<span>${mealTime}</span>`;
            }

            todayMealsDiv.appendChild(mealInfo);
        });
    } else {
        todayMealsDiv.innerHTML = '<div class="meal-info"><span>No meal planned</span></div>';
    }

    // Load week schedule
    loadWeekSchedule();
}

// Load entire week schedule
function loadWeekSchedule() {
    const currentDay = getCurrentDay();
    const weekScheduleDiv = document.getElementById('weekSchedule');
    weekScheduleDiv.innerHTML = '';

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    days.forEach(day => {
        const dayItem = document.createElement('div');
        dayItem.className = 'day-item';
        if (day === currentDay) {
            dayItem.classList.add('today');
        }

        const meal = mealPlan[day] || "No meal planned";

        // Parse meals for summary
        const mealTimes = meal.split('|').map(m => m.trim());
        const summary = mealTimes.length > 1 ? `${mealTimes.length} meals planned` : 'View details';

        // Create expandable structure
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-item-header';
        dayHeader.onclick = function() { toggleDayItem(dayItem); };

        const dayTitle = document.createElement('strong');
        if (day === currentDay) {
            dayTitle.innerHTML = `🌟 ${day} <span class="badge">Today</span>`;
        } else {
            dayTitle.textContent = day;
        }

        const expandIcon = document.createElement('span');
        expandIcon.className = 'expand-icon';
        expandIcon.textContent = '▼';

        dayHeader.appendChild(dayTitle);
        dayHeader.appendChild(expandIcon);

        const daySummary = document.createElement('div');
        daySummary.className = 'day-item-summary';
        daySummary.textContent = summary;

        const dayDetails = document.createElement('div');
        dayDetails.className = 'day-details';

        // Parse and display detailed meals
        mealTimes.forEach(mealTime => {
            const mealDiv = document.createElement('div');
            mealDiv.className = 'meal-info';

            if (mealTime.includes(':')) {
                const parts = mealTime.split(':');
                const time = parts[0].trim();
                const mealItems = parts.slice(1).join(':').trim();
                mealDiv.innerHTML = `<strong>${time}</strong><span>${mealItems}</span>`;
            } else {
                mealDiv.innerHTML = `<span>${mealTime}</span>`;
            }

            dayDetails.appendChild(mealDiv);
        });

        dayItem.appendChild(dayHeader);
        dayItem.appendChild(daySummary);
        dayItem.appendChild(dayDetails);

        weekScheduleDiv.appendChild(dayItem);
    });
}

// Enable notifications
async function enableNotifications() {
    if (!("Notification" in window)) {
        alert("This browser does not support notifications");
        return;
    }

    try {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            localStorage.setItem('notificationsEnabled', 'true');
            updateNotificationStatus();

            // Show a test notification
            showNotification("Notifications Enabled!", "You'll receive daily meal reminders at 10 PM");

            // Setup the notification scheduler
            setupNotificationScheduler();
        } else {
            document.getElementById('notificationStatus').textContent =
                "⚠️ Notifications permission denied. Please enable them in your browser settings.";
        }
    } catch (error) {
        console.error("Error requesting notification permission:", error);
    }
}

// Check notification status
function checkNotificationStatus() {
    updateNotificationStatus();
}

// Update notification status display
function updateNotificationStatus() {
    const statusDiv = document.getElementById('notificationStatus');

    if (localStorage.getItem('notificationsEnabled') === 'true' && Notification.permission === "granted") {
        statusDiv.innerHTML = "✅ Notifications are enabled! You'll be notified at 10 PM daily.";
    } else if (Notification.permission === "denied") {
        statusDiv.innerHTML = "⚠️ Notifications are blocked. Please enable them in browser settings.";
    } else {
        statusDiv.innerHTML = "ℹ️ Click the button above to enable notifications.";
    }
}

// Show notification
function showNotification(title, body) {
    if (Notification.permission === "granted") {
        const notification = new Notification(title, {
            body: body,
            icon: "🍽️",
            badge: "🍽️",
            tag: "meal-reminder",
            requireInteraction: false
        });

        notification.onclick = function() {
            window.focus();
            this.close();
        };
    }
}

// Setup notification scheduler
function setupNotificationScheduler() {
    // Check if notifications should be sent
    checkAndSendNotification();

    // Check every minute if it's time to send notification
    setInterval(checkAndSendNotification, 60000); // Check every minute
}

// Check if it's time to send notification and send it
function checkAndSendNotification() {
    if (localStorage.getItem('notificationsEnabled') !== 'true') {
        return;
    }

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Check if it's 10 PM (22:00)
    if (hours === 22 && minutes === 0) {
        const lastNotificationDate = localStorage.getItem('lastNotificationDate');
        const todayDate = now.toDateString();

        // Only send once per day
        if (lastNotificationDate !== todayDate) {
            const tomorrowDay = getTomorrowDay();
            const tomorrowMeal = mealPlan[tomorrowDay] || "No meal planned";

            showNotification(
                `Tomorrow's Meal: ${tomorrowDay}`,
                `📅 ${tomorrowMeal}`
            );

            localStorage.setItem('lastNotificationDate', todayDate);
        }
    }
}

// Allow Enter key to submit login
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');

    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                login();
            }
        });
    }

    // Check if user is already authenticated
    checkAuth();
});

