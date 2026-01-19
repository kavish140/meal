// Password constant
const CORRECT_PASSWORD = "K1681";

// Global meal plan data (will be loaded from JSON)
let mealPlan = {};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                login();
            }
        });
    }
}

// Login function
function login() {
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    if (passwordInput.value === CORRECT_PASSWORD) {
        // Store authentication in localStorage (persists until sign out)
        localStorage.setItem('authenticated', 'true');

        // Hide login and show dashboard
        document.getElementById('loginWrapper').style.display = 'none';
        document.getElementById('dashboardWrapper').classList.add('active');
        document.body.classList.add('dashboard-active');

        // Load meal data from JSON
        loadMealDataFromJSON();

        // Set current date
        updateCurrentDate();

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
    localStorage.removeItem('authenticated');
    document.getElementById('loginWrapper').style.display = 'flex';
    document.getElementById('dashboardWrapper').classList.remove('active');
    document.body.classList.remove('dashboard-active');
    document.getElementById('password').value = '';
    document.getElementById('errorMessage').classList.remove('show');
}

// Check if user is already authenticated
function checkAuth() {
    if (localStorage.getItem('authenticated') === 'true') {
        document.getElementById('loginWrapper').style.display = 'none';
        document.getElementById('dashboardWrapper').classList.add('active');
        document.body.classList.add('dashboard-active');
        loadMealDataFromJSON();
        updateCurrentDate();
        checkNotificationStatus();
        setupNotificationScheduler();
    }
}

// Load meal data from JSON file
async function loadMealDataFromJSON() {
    try {
        const response = await fetch('mealplan.json');
        if (!response.ok) {
            throw new Error('Failed to load meal plan');
        }
        mealPlan = await response.json();
        console.log('Meal plan loaded:', mealPlan);
        
        // Load all the data
        loadTodayMeals();
        loadWeekSchedule();
        loadWeekList();
        updateMealCount();
        
    } catch (error) {
        console.error('Error loading meal plan:', error);
        // Fallback to empty data
        mealPlan = {};
        alert('Could not load meal plan. Please make sure mealplan.json exists.');
    }
}

// Refresh meal data (reload from JSON)
function refreshMealData() {
    const btn = event.target;
    btn.textContent = '⏳ Loading...';
    btn.disabled = true;
    
    loadMealDataFromJSON().then(() => {
        btn.textContent = '✅ Updated!';
        setTimeout(() => {
            btn.textContent = '🔄 Refresh';
            btn.disabled = false;
        }, 2000);
    });
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

// Update current date display
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const today = new Date();
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
}

// Load today's meals
function loadTodayMeals() {
    const currentDay = getCurrentDay();
    const todayMeal = mealPlan[currentDay] || "No meal planned";

    // Update day name in all places
    const dayElements = ['todayDay', 'todayDay2'];
    dayElements.forEach(id => {
        const elem = document.getElementById(id);
        if (elem) elem.textContent = currentDay;
    });

    // Load meals in overview section
    const todayMealsDiv = document.getElementById('todayMeals');
    if (todayMealsDiv) {
        todayMealsDiv.innerHTML = '';
        if (todayMeal && todayMeal !== "No meal planned") {
            const mealTimes = todayMeal.split('|').map(m => m.trim());
            mealTimes.forEach(mealTime => {
                const mealInfo = document.createElement('div');
                mealInfo.className = 'meal-info';

                if (mealTime.includes(':')) {
                    const parts = mealTime.split(':');
                    const time = parts[0].trim();
                    const meal = parts.slice(1).join(':').trim();
                    mealInfo.innerHTML = `<strong>${time}</strong><span>${meal}</span>`;
                } else {
                    mealInfo.innerHTML = `<span>${mealTime}</span>`;
                }

                todayMealsDiv.appendChild(mealInfo);
            });
        } else {
            todayMealsDiv.innerHTML = '<div class="meal-info"><span>No meal planned</span></div>';
        }
    }

    // Load detailed meals in today section
    const todayMealsDetailed = document.getElementById('todayMealsDetailed');
    if (todayMealsDetailed) {
        todayMealsDetailed.innerHTML = todayMealsDiv ? todayMealsDiv.innerHTML : '';
    }
}

// Update meal count
function updateMealCount() {
    const currentDay = getCurrentDay();
    const todayMeal = mealPlan[currentDay] || "";
    const mealCount = todayMeal ? todayMeal.split('|').length : 0;
    
    const countElement = document.getElementById('mealCount');
    if (countElement) {
        countElement.textContent = mealCount;
    }
}

// Load week list for overview
function loadWeekList() {
    const currentDay = getCurrentDay();
    const weekListDiv = document.getElementById('weekList');
    if (!weekListDiv) return;

    weekListDiv.innerHTML = '';
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    days.forEach(day => {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        if (day === currentDay) {
            dayCard.classList.add('active');
        }

        const meal = mealPlan[day] || "No meal planned";
        const mealTimes = meal.split('|').map(m => m.trim());
        const mealCount = mealTimes.length;

        dayCard.innerHTML = `
            <div class="day-name">${day === currentDay ? '⭐ ' : ''}${day}</div>
            <div class="meal-count">${mealCount} meal${mealCount !== 1 ? 's' : ''} planned</div>
        `;

        dayCard.onclick = () => {
            showSection('week');
        };

        weekListDiv.appendChild(dayCard);
    });
}

// Load entire week schedule
function loadWeekSchedule() {
    const currentDay = getCurrentDay();
    const weekScheduleDiv = document.getElementById('weekSchedule');
    if (!weekScheduleDiv) return;

    weekScheduleDiv.innerHTML = '';
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    days.forEach(day => {
        const daySection = document.createElement('div');
        daySection.className = 'card';
        daySection.style.marginBottom = '20px';

        const meal = mealPlan[day] || "No meal planned";
        const mealTimes = meal.split('|').map(m => m.trim());

        let mealsHTML = '';
        mealTimes.forEach(mealTime => {
            if (mealTime.includes(':')) {
                const parts = mealTime.split(':');
                const time = parts[0].trim();
                const mealItems = parts.slice(1).join(':').trim();
                mealsHTML += `<div class="meal-info"><strong>${time}</strong><span>${mealItems}</span></div>`;
            } else {
                mealsHTML += `<div class="meal-info"><span>${mealTime}</span></div>`;
            }
        });

        daySection.innerHTML = `
            <div class="card-header">
                <h3>${day === currentDay ? '⭐ ' : ''}${day}</h3>
                <span class="icon">🍽️</span>
            </div>
            ${mealsHTML}
        `;

        weekScheduleDiv.appendChild(daySection);
    });
}

// Search meals
function searchMeals() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (!searchTerm) {
        // If search is empty, just reload normal view
        loadWeekSchedule();
        return;
    }

    const weekScheduleDiv = document.getElementById('weekSchedule');
    if (!weekScheduleDiv) return;

    weekScheduleDiv.innerHTML = '';
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let foundAny = false;

    days.forEach(day => {
        const meal = mealPlan[day] || "";
        if (meal.toLowerCase().includes(searchTerm)) {
            foundAny = true;
            const daySection = document.createElement('div');
            daySection.className = 'card';
            daySection.style.marginBottom = '20px';

            const mealTimes = meal.split('|').map(m => m.trim());
            let mealsHTML = '';
            
            mealTimes.forEach(mealTime => {
                if (mealTime.toLowerCase().includes(searchTerm)) {
                    if (mealTime.includes(':')) {
                        const parts = mealTime.split(':');
                        const time = parts[0].trim();
                        const mealItems = parts.slice(1).join(':').trim();
                        mealsHTML += `<div class="meal-info"><strong>${time}</strong><span>${mealItems}</span></div>`;
                    } else {
                        mealsHTML += `<div class="meal-info"><span>${mealTime}</span></div>`;
                    }
                }
            });

            if (mealsHTML) {
                daySection.innerHTML = `
                    <div class="card-header">
                        <h3>${day}</h3>
                        <span class="icon">🍽️</span>
                    </div>
                    ${mealsHTML}
                `;
                weekScheduleDiv.appendChild(daySection);
            }
        }
    });

    if (!foundAny) {
        weekScheduleDiv.innerHTML = '<div class="empty-state"><div class="icon">🔍</div><p>No meals found matching your search</p></div>';
    }

    // Make sure week section is visible
    showSection('week');
}

// Show section (navigation)
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionName) {
            link.classList.add('active');
        }
    });

    // Close mobile sidebar if open
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.remove('mobile-open');
    }
}

// Toggle mobile sidebar
function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('mobile-open');
    }
}

// Generate shopping list
function generateShoppingList() {
    const shoppingListDiv = document.getElementById('shoppingList');
    if (!shoppingListDiv) return;

    // Extract all ingredients from the week
    const ingredients = new Set();
    
    Object.values(mealPlan).forEach(dayMeals => {
        const meals = dayMeals.split('|').map(m => m.trim());
        meals.forEach(meal => {
            // Extract food items (after colon)
            if (meal.includes(':')) {
                const items = meal.split(':')[1].split('/');
                items.forEach(item => {
                    const cleaned = item.trim();
                    if (cleaned) ingredients.add(cleaned);
                });
            }
        });
    });

    if (ingredients.size === 0) {
        shoppingListDiv.innerHTML = '<div class="empty-state"><div class="icon">🛒</div><p>No ingredients found</p></div>';
        return;
    }

    let html = '<div style="padding: 20px 0;">';
    Array.from(ingredients).sort().forEach(ingredient => {
        html += `
            <div class="shopping-item">
                <input type="checkbox" id="item-${ingredient.replace(/\s+/g, '-')}" 
                       onchange="toggleShoppingItem(this)">
                <label for="item-${ingredient.replace(/\s+/g, '-')}">${ingredient}</label>
            </div>
        `;
    });
    html += '</div>';

    shoppingListDiv.innerHTML = html;
}

// Toggle shopping item checked state
function toggleShoppingItem(checkbox) {
    const item = checkbox.closest('.shopping-item');
    if (checkbox.checked) {
        item.classList.add('checked');
    } else {
        item.classList.remove('checked');
    }
}

// Export data
function exportData() {
    const dataStr = JSON.stringify(mealPlan, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `meal-plan-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Notification functions
function enableNotifications() {
    if (!("Notification" in window)) {
        alert("This browser does not support notifications");
        return;
    }

    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            localStorage.setItem('notificationsEnabled', 'true');
            updateNotificationStatus();
            showNotification("Notifications Enabled!", "You'll receive daily meal reminders at 10 PM");
            setupNotificationScheduler();
        } else {
            document.getElementById('notificationStatus').textContent =
                "⚠️ Notifications permission denied. Please enable them in your browser settings.";
        }
    }).catch(error => {
        console.error("Error requesting notification permission:", error);
    });
}

function checkNotificationStatus() {
    updateNotificationStatus();
}

function updateNotificationStatus() {
    const statusDiv = document.getElementById('notificationStatus');
    if (!statusDiv) return;

    if (localStorage.getItem('notificationsEnabled') === 'true' && Notification.permission === "granted") {
        statusDiv.innerHTML = "✅ Notifications are enabled! You'll be notified at 10 PM daily.";
    } else if (Notification.permission === "denied") {
        statusDiv.innerHTML = "⚠️ Notifications are blocked. Please enable them in browser settings.";
    } else {
        statusDiv.innerHTML = "ℹ️ Click the button above to enable notifications.";
    }
}

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

function setupNotificationScheduler() {
    checkAndSendNotification();
    setInterval(checkAndSendNotification, 60000); // Check every minute
}

function checkAndSendNotification() {
    if (localStorage.getItem('notificationsEnabled') !== 'true') {
        return;
    }

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (hours === 22 && minutes === 0) {
        const lastNotificationDate = localStorage.getItem('lastNotificationDate');
        const todayDate = now.toDateString();

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

