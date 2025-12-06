// App State Management
const appState = {
    currentUser: null,
    waterIntake: 0,
    foodLog: [],
    mealPlan: {},
    notifications: []
};

// Food Database
const foodDatabase = [
    { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fats: 0.3 },
    { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fats: 0.4 },
    { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fats: 3.6 },
    { name: 'Brown Rice (1 cup)', calories: 216, protein: 5, carbs: 45, fats: 1.8 },
    { name: 'Avocado (medium)', calories: 240, protein: 3, carbs: 12, fats: 22 },
    { name: 'Greek Yogurt (170g)', calories: 100, protein: 17, carbs: 6, fats: 0.7 },
    { name: 'Almonds (28g)', calories: 164, protein: 6, carbs: 6, fats: 14 },
    { name: 'Salmon (100g)', calories: 208, protein: 22, carbs: 0, fats: 13 },
    { name: 'Broccoli (1 cup)', calories: 55, protein: 3.7, carbs: 11, fats: 0.6 },
    { name: 'Eggs (2 large)', calories: 140, protein: 12, carbs: 1, fats: 10 },
    { name: 'Spinach (1 cup)', calories: 7, protein: 0.9, carbs: 1, fats: 0.1 },
    { name: 'Sweet Potato (medium)', calories: 112, protein: 2, carbs: 26, fats: 0.1 },
    { name: 'Oatmeal (1 cup)', calories: 166, protein: 6, carbs: 28, fats: 4 }
];

// Meal Database
const mealDatabase = {
    breakfast: [
        {
            name: 'Greek Yogurt Protein Bowl',
            calories: 320,
            protein: 28,
            carbs: 24,
            fats: 12,
            prepTime: '5 min',
            image: 'https://i.ibb.co/jkxHnZSW/download-10.jpg',
            description: 'High-protein breakfast with berries and nuts'
        },
        {
            name: 'Avocado Toast with Eggs',
            calories: 380,
            protein: 18,
            carbs: 32,
            fats: 22,
            prepTime: '10 min',
            image: 'https://i.ibb.co/C3htKr0p/download-11.jpg',
            description: 'Whole grain toast with smashed avocado and poached eggs'
        },
        {
            name: 'Protein Smoothie',
            calories: 280,
            protein: 25,
            carbs: 30,
            fats: 8,
            prepTime: '5 min',
            image: 'https://i.ibb.co/NdHrcbPc/download-12.jpg',
            description: 'Banana, spinach, protein powder, and almond milk'
        }
    ],
    lunch: [
        {
            name: 'Grilled Chicken Salad',
            calories: 420,
            protein: 35,
            carbs: 18,
            fats: 24,
            prepTime: '15 min',
            image: 'https://i.ibb.co/fzNJNMLP/download-9.jpg',
            description: 'Mixed greens with grilled chicken and olive oil dressing'
        },
        {
            name: 'Quinoa Buddha Bowl',
            calories: 380,
            protein: 22,
            carbs: 45,
            fats: 15,
            prepTime: '20 min',
            image: 'https://i.ibb.co/dw4brctz/download-13.jpg',
            description: 'Quinoa with roasted vegetables and tahini sauce'
        },
        {
            name: 'Turkey Wrap',
            calories: 350,
            protein: 25,
            carbs: 30,
            fats: 14,
            prepTime: '10 min',
            image: 'https://i.ibb.co/C3htKr0p/download-11.jpg',
            description: 'Whole wheat wrap with turkey, avocado, and veggies'
        }
    ],
    dinner: [
        {
            name: 'Salmon with Roasted Veggies',
            calories: 450,
            protein: 38,
            carbs: 25,
            fats: 22,
            prepTime: '25 min',
            image: 'https://i.ibb.co/C3htKr0p/download-11.jpg',
            description: 'Baked salmon with asparagus and sweet potatoes'
        },
        {
            name: 'Turkey Meatballs with Zoodles',
            calories: 380,
            protein: 32,
            carbs: 18,
            fats: 20,
            prepTime: '20 min',
            image: 'https://i.ibb.co/NdHrcbPc/download-12.jpg',
            description: 'Lean turkey meatballs with zucchini noodles'
        },
        {
            name: 'Vegetable Stir Fry with Tofu',
            calories: 320,
            protein: 22,
            carbs: 30,
            fats: 15,
            prepTime: '20 min',
            image: 'https://i.ibb.co/dw4brctz/download-13.jpg',
            description: 'Mixed vegetables and tofu in ginger sauce'
        }
    ],
    snacks: [
        {
            name: 'Apple with Almond Butter',
            calories: 200,
            protein: 6,
            carbs: 24,
            fats: 10,
            prepTime: '2 min',
            image: 'https://i.ibb.co/fzNJNMLP/download-9.jpg',
            description: 'Perfect balanced snack'
        },
        {
            name: 'Protein Bar',
            calories: 220,
            protein: 20,
            carbs: 22,
            fats: 8,
            prepTime: '0 min',
            image: 'https://i.ibb.co/jkxHnZSW/download-10.jpg',
            description: 'Convenient protein source'
        },
        {
            name: 'Carrot Sticks with Hummus',
            calories: 150,
            protein: 5,
            carbs: 18,
            fats: 7,
            prepTime: '5 min',
            image: 'https://i.ibb.co/dw4brctz/download-13.jpg',
            description: 'Crunchy snack with protein'
        }
    ]
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);
    
    // Check if user profile exists
    const userProfile = getUserProfile();
    if (userProfile) {
        appState.currentUser = userProfile;
        updateWelcomeMessage(userProfile.name);
        updateNutritionTargets(userProfile);
        showSection('dashboard');
        initializeWaterTracker();
        loadTodayMeals();
        initializeProgressChart();
        generateMealPlan();
        loadFoodLog();
        generateInsights();
    } else {
        showSection('home');
    }
    
    // Setup modal close on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    });
});

// User Profile Functions
function saveUserProfile(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseInt(document.getElementById('height').value);
    const activity = document.getElementById('activity').value;
    const goal = document.getElementById('goal').value;
    
    // Get dietary restrictions
    const restrictionCheckboxes = document.querySelectorAll('input[name="restrictions"]:checked');
    const restrictions = Array.from(restrictionCheckboxes).map(cb => cb.value);
    
    const allergies = document.getElementById('allergies').value;
    
    // Calculate daily calories (simplified Mifflin-St Jeor)
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Activity multipliers
    const activityMultipliers = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725
    };
    
    let dailyCalories = Math.round(bmr * activityMultipliers[activity]);
    
    // Adjust for goal
    if (goal === 'weight-loss') {
        dailyCalories = Math.round(dailyCalories * 0.85);
    } else if (goal === 'muscle-gain') {
        dailyCalories = Math.round(dailyCalories * 1.15);
    }
    
    // Calculate macros
    let proteinRatio, carbRatio, fatRatio;
    
    if (goal === 'weight-loss') {
        proteinRatio = 0.35;
        carbRatio = 0.40;
        fatRatio = 0.25;
    } else if (goal === 'muscle-gain') {
        proteinRatio = 0.30;
        carbRatio = 0.45;
        fatRatio = 0.25;
    } else {
        proteinRatio = 0.25;
        carbRatio = 0.50;
        fatRatio = 0.25;
    }
    
    // Create user profile
    const userProfile = {
        name,
        age,
        gender,
        weight,
        height,
        activity,
        goal,
        restrictions,
        allergies,
        dailyCalories,
        proteinGrams: Math.round((dailyCalories * proteinRatio) / 4),
        carbGrams: Math.round((dailyCalories * carbRatio) / 4),
        fatGrams: Math.round((dailyCalories * fatRatio) / 9),
        createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('nutriai_user', JSON.stringify(userProfile));
    
    // Update app state
    appState.currentUser = userProfile;
    
    // Update UI
    updateWelcomeMessage(name);
    updateNutritionTargets(userProfile);
    
    // Close modal and show dashboard
    closeModal();
    showSection('dashboard');
    
    // Initialize dashboard components
    initializeWaterTracker();
    loadTodayMeals();
    initializeProgressChart();
    generateMealPlan();
    generateInsights();
    
    // Show success message
    showNotification('Profile created successfully! Your AI nutrition plan is ready.', 'success');
}

function getUserProfile() {
    const profile = localStorage.getItem('nutriai_user');
    return profile ? JSON.parse(profile) : null;
}

function updateWelcomeMessage(name) {
    document.getElementById('welcome-text').textContent = `Welcome back, ${name}!`;
}

function updateNutritionTargets(profile) {
    document.getElementById('calories-target').textContent = profile.dailyCalories.toLocaleString();
    document.getElementById('protein-target').textContent = `${profile.proteinGrams}g`;
    document.getElementById('carbs-target').textContent = `${profile.carbGrams}g`;
    document.getElementById('fats-target').textContent = `${profile.fatGrams}g`;
}

// Section Navigation
function showSection(sectionId) {
    // Hide all sections
    document.getElementById('home').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('meal-planner').style.display = 'none';
    document.getElementById('food-logger').style.display = 'none';
    document.getElementById('insights').style.display = 'none';
    
    // Show selected section
    document.getElementById(sectionId).style.display = 'block';
    
    // Update active nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.fontWeight = 'normal';
        link.style.color = '';
    });
    
    // Highlight current section in nav
    const activeLink = document.querySelector(`.nav-links a[onclick*="${sectionId}"]`);
    if (activeLink) {
        activeLink.style.fontWeight = '600';
        activeLink.style.color = 'var(--primary)';
    }
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Water Tracker
function initializeWaterTracker() {
    const waterGoal = 2.5; // liters
    const cupsContainer = document.getElementById('water-cups-container');
    const cupsNeeded = Math.ceil(waterGoal / 0.25); // 250ml per cup
    
    cupsContainer.innerHTML = '';
    
    for (let i = 0; i < cupsNeeded; i++) {
        const cup = document.createElement('div');
        cup.className = 'water-cup';
        cup.id = `water-cup-${i}`;
        cup.onclick = () => toggleWaterCup(i);
        cupsContainer.appendChild(cup);
    }
    
    // Load saved water intake
    const savedWater = localStorage.getItem('nutriai_water');
    if (savedWater) {
        appState.waterIntake = parseInt(savedWater);
        updateWaterCups();
    }
    
    // Update water goal display
    const currentLiters = (appState.waterIntake * 0.25).toFixed(1);
    document.getElementById('water-goal').innerHTML = `2.5L <span style="color: var(--primary); font-weight: 600;">(${currentLiters}L)</span>`;
}

function logWater() {
    if (appState.waterIntake < 10) { // 10 cups = 2.5L
        appState.waterIntake++;
        localStorage.setItem('nutriai_water', appState.waterIntake);
        updateWaterCups();
        
        // Update water goal display
        const currentLiters = (appState.waterIntake * 0.25).toFixed(1);
        document.getElementById('water-goal').innerHTML = `2.5L <span style="color: var(--primary); font-weight: 600;">(${currentLiters}L)</span>`;
        
        showNotification('250ml water logged!', 'success');
    } else {
        showNotification('You\'ve reached your water goal for today!', 'info');
    }
}

function toggleWaterCup(index) {
    if (index === appState.waterIntake - 1 || index === appState.waterIntake) {
        appState.waterIntake = index + 1;
        localStorage.setItem('nutriai_water', appState.waterIntake);
        updateWaterCups();
        
        const currentLiters = (appState.waterIntake * 0.25).toFixed(1);
        document.getElementById('water-goal').innerHTML = `2.5L <span style="color: var(--primary); font-weight: 600;">(${currentLiters}L)</span>`;
    }
}

function updateWaterCups() {
    for (let i = 0; i < 10; i++) {
        const cup = document.getElementById(`water-cup-${i}`);
        if (cup) {
            if (i < appState.waterIntake) {
                cup.classList.add('filled');
            } else {
                cup.classList.remove('filled');
            }
        }
    }
}

// Meal Planning
function generateMealPlan() {
    const userProfile = getUserProfile();
    if (!userProfile) {
        showNotification('Please create a profile first', 'error');
        return;
    }
    
    const container = document.getElementById('meal-plan-container');
    container.innerHTML = '';
    
    const mealTimes = ['breakfast', 'lunch', 'dinner', 'snacks'];
    
    mealTimes.forEach(mealTime => {
        const mealTimeSection = document.createElement('div');
        mealTimeSection.className = 'meal-time-section';
        
        const header = document.createElement('div');
        header.className = 'meal-time-header';
        header.innerHTML = `
            <h3>${mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}</h3>
            <span>2-3 options available</span>
        `;
        
        const mealsContainer = document.createElement('div');
        mealsContainer.className = 'meals-container';
        
        // Get meals for this meal time
        const meals = mealDatabase[mealTime];
        const numberOfMeals = Math.min(meals.length, 3);
        
        for (let i = 0; i < numberOfMeals; i++) {
            const meal = meals[i];
            const mealCard = document.createElement('div');
            mealCard.className = 'meal-card';
            mealCard.innerHTML = `
                <div class="meal-image" style="background-image: url('${meal.image}')"></div>
                <div class="meal-content">
                    <h4 class="meal-title">${meal.name}</h4>
                    <p style="color: var(--gray); font-size: 14px; margin-bottom: 15px;">${meal.description}</p>
                    <div class="meal-macros">
                        <div class="macro-item">
                            <div class="macro-value">${meal.calories}</div>
                            <div class="macro-label">Calories</div>
                        </div>
                        <div class="macro-item">
                            <div class="macro-value">${meal.protein}g</div>
                            <div class="macro-label">Protein</div>
                        </div>
                        <div class="macro-item">
                            <div class="macro-value">${meal.carbs}g</div>
                            <div class="macro-label">Carbs</div>
                        </div>
                        <div class="macro-item">
                            <div class="macro-value">${meal.fats}g</div>
                            <div class="macro-label">Fats</div>
                        </div>
                    </div>
                    <div class="meal-actions">
                        <button class="btn btn-primary btn-small" onclick="selectMeal('${mealTime}', ${i})">Select</button>
                        <button class="btn btn-outline btn-small" onclick="swapMeal('${mealTime}', ${i})">Swap</button>
                    </div>
                </div>
            `;
            mealsContainer.appendChild(mealCard);
        }
        
        mealTimeSection.appendChild(header);
        mealTimeSection.appendChild(mealsContainer);
        container.appendChild(mealTimeSection);
    });
    
    // Save to app state
    appState.mealPlan = mealDatabase;
    
    showNotification('New meal plan generated!', 'success');
}

function selectMeal(mealTime, index) {
    const meal = mealDatabase[mealTime][index];
    showNotification(`Added ${meal.name} to your day`, 'success');
}

function swapMeal(mealTime, currentIndex) {
    const meals = mealDatabase[mealTime];
    const newIndex = (currentIndex + 1) % meals.length;
    const newMeal = meals[newIndex];
    showNotification(`Swapped to ${newMeal.name}`, 'info');
}

function loadTodayMeals() {
    const container = document.getElementById('todays-meals');
    const meals = [
        { name: 'Protein Smoothie', time: '8:00 AM', calories: 280 },
        { name: 'Grilled Chicken Salad', time: '1:00 PM', calories: 420 },
        { name: 'Salmon & Veggies', time: '7:00 PM', calories: 450 }
    ];
    
    container.innerHTML = '';
    
    meals.forEach(meal => {
        const mealElement = document.createElement('div');
        mealElement.style.padding = '15px';
        mealElement.style.borderBottom = '1px solid #eee';
        mealElement.style.display = 'flex';
        mealElement.style.justifyContent = 'space-between';
        mealElement.style.alignItems = 'center';
        
        mealElement.innerHTML = `
            <div>
                <div style="font-weight: 600; color: var(--dark);">${meal.name}</div>
                <div style="font-size: 14px; color: var(--gray);">${meal.time}</div>
            </div>
            <div style="font-weight: 700; color: var(--primary);">${meal.calories} cal</div>
        `;
        
        container.appendChild(mealElement);
    });
}

// Food Logger
function searchFood() {
    const searchTerm = document.getElementById('food-search').value.toLowerCase();
    const resultsContainer = document.getElementById('food-results');
    
    if (searchTerm.length < 2) {
        resultsContainer.style.display = 'none';
        return;
    }
    
    const filteredFoods = foodDatabase.filter(food => 
        food.name.toLowerCase().includes(searchTerm)
    );
    
    if (filteredFoods.length === 0) {
        resultsContainer.innerHTML = '<div class="food-item">No foods found</div>';
        resultsContainer.style.display = 'block';
        return;
    }
    
    resultsContainer.innerHTML = '';
    
    filteredFoods.forEach(food => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';
        foodItem.innerHTML = `
            <div>
                <div style="font-weight: 600;">${food.name}</div>
                <div style="font-size: 14px; color: var(--gray);">
                    ${food.calories} cal • P:${food.protein}g • C:${food.carbs}g • F:${food.fats}g
                </div>
            </div>
            <button class="btn btn-primary btn-small" onclick="addFoodToLog('${food.name}')">Add</button>
        `;
        resultsContainer.appendChild(foodItem);
    });
    
    resultsContainer.style.display = 'block';
}

function addFoodToLog(foodName) {
    const food = foodDatabase.find(f => f.name === foodName);
    if (!food) return;
    
    const symptom = document.getElementById('symptom-select').value;
    const symptomText = document.getElementById('symptom-select').options[document.getElementById('symptom-select').selectedIndex].text;
    
    const foodEntry = {
        id: Date.now(),
        name: food.name,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fats: food.fats,
        symptom: symptom,
        symptomText: symptom || 'No symptom recorded',
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    // Add to app state
    appState.foodLog.push(foodEntry);
    
    // Save to localStorage
    saveFoodLog();
    
    // Update UI
    addFoodLogEntry(foodEntry);
    
    // Clear search
    document.getElementById('food-search').value = '';
    document.getElementById('food-results').style.display = 'none';
    document.getElementById('symptom-select').value = '';
    
    showNotification(`${food.name} added to your log`, 'success');
}

function logFood() {
    const searchTerm = document.getElementById('food-search').value;
    if (!searchTerm) {
        showNotification('Please search for a food first', 'error');
        return;
    }
    
    // Find exact match or use first result
    let food = foodDatabase.find(f => f.name.toLowerCase() === searchTerm.toLowerCase());
    if (!food) {
        food = foodDatabase.find(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    if (food) {
        addFoodToLog(food.name);
    } else {
        showNotification('Food not found in database. Please select from suggestions.', 'error');
    }
}

function addFoodLogEntry(entry) {
    const container = document.getElementById('food-log-container');
    
    const entryElement = document.createElement('div');
    entryElement.className = 'food-item';
    entryElement.id = `food-entry-${entry.id}`;
    entryElement.innerHTML = `
        <div style="flex: 1;">
            <div style="font-weight: 600;">${entry.name}</div>
            <div style="font-size: 14px; color: var(--gray);">
                ${entry.calories} cal • ${entry.timestamp} • Feeling: ${entry.symptomText}
            </div>
        </div>
        <div style="text-align: right; margin-right: 15px;">
            <div style="font-weight: 700; color: var(--primary);">${entry.calories}</div>
            <div style="font-size: 12px; color: var(--gray);">calories</div>
        </div>
        <button class="btn btn-outline btn-small" onclick="removeFoodLogEntry(${entry.id})">Remove</button>
    `;
    
    container.insertBefore(entryElement, container.firstChild);
}

function removeFoodLogEntry(id) {
    // Remove from app state
    appState.foodLog = appState.foodLog.filter(entry => entry.id !== id);
    
    // Save to localStorage
    saveFoodLog();
    
    // Remove from UI
    const element = document.getElementById(`food-entry-${id}`);
    if (element) {
        element.remove();
    }
    
    showNotification('Food entry removed', 'info');
}

function saveFoodLog() {
    localStorage.setItem('nutriai_food_log', JSON.stringify(appState.foodLog));
}

function loadFoodLog() {
    const savedLog = localStorage.getItem('nutriai_food_log');
    if (savedLog) {
        appState.foodLog = JSON.parse(savedLog);
        
        const container = document.getElementById('food-log-container');
        container.innerHTML = '';
        
        // Show most recent entries first
        appState.foodLog.slice().reverse().forEach(entry => {
            addFoodLogEntry(entry);
        });
    }
}

// Progress Chart
function initializeProgressChart() {
    const ctx = document.getElementById('progress-chart').getContext('2d');
    
    // Generate mock weekly data
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const calorieData = days.map(() => Math.floor(Math.random() * 500) + 1700);
    const proteinData = days.map(() => Math.floor(Math.random() * 40) + 120);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [
                {
                    label: 'Calories',
                    data: calorieData,
                    borderColor: '#2A9D8F',
                    backgroundColor: 'rgba(42, 157, 143, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Protein (g)',
                    data: proteinData,
                    borderColor: '#E76F51',
                    backgroundColor: 'rgba(231, 111, 81, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// AI Insights
function generateInsights() {
    const container = document.getElementById('insights-container');
    if (!container) return;
    
    const insights = [
        {
            icon: 'dna',
            title: 'Genetic Insights',
            text: 'Based on simulated genetic profile: You may have reduced lactose tolerance. Consider dairy alternatives if experiencing discomfort.',
            priority: 'low'
        },
        {
            icon: 'heartbeat',
            title: 'Biomarker Trends',
            text: 'Your blood glucose is most stable when you eat protein-rich breakfasts within 1 hour of waking.',
            priority: 'medium'
        },
        {
            icon: 'utensils',
            title: 'Food Response Pattern',
            text: 'You report 30% more energy on days when you eat leafy greens at lunch. Try incorporating spinach or kale daily.',
            priority: 'high'
        },
        {
            icon: 'vitamins',
            title: 'Nutrient Recommendations',
            text: 'Based on your diet log, you may benefit from increasing Vitamin D intake. Consider adding fatty fish or supplements.',
            priority: 'medium'
        }
    ];
    
    container.innerHTML = '';
    
    insights.forEach(insight => {
        const insightCard = document.createElement('div');
        insightCard.className = 'insight-card';
        insightCard.innerHTML = `
            <div class="insight-icon">
                <i class="fas fa-${insight.icon}"></i>
            </div>
            <h3 class="insight-title">${insight.title}</h3>
            <p class="insight-text">${insight.text}</p>
            <div class="insight-action">
                <button class="btn btn-outline">Learn More</button>
            </div>
        `;
        container.appendChild(insightCard);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Barcode Scanner Simulation
function simulateBarcodeScan() {
    const barcodeFoods = [
        { name: 'Clif Bar', calories: 250, protein: 9, carbs: 45, fats: 5 },
        { name: 'Chobani Yogurt', calories: 140, protein: 12, carbs: 16, fats: 3.5 },
        { name: 'Kind Bar', calories: 200, protein: 6, carbs: 22, fats: 12 },
        { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fats: 0.4 }
    ];
    
    const randomFood = barcodeFoods[Math.floor(Math.random() * barcodeFoods.length)];
    
    document.getElementById('food-search').value = randomFood.name;
    searchFood();
    
    showNotification(`Scanned: ${randomFood.name}`, 'info');
}

// Export Data
function exportData() {
    const userProfile = getUserProfile();
    const foodLog = appState.foodLog;
    const waterIntake = appState.waterIntake;
    
    const data = {
        profile: userProfile,
        foodLog: foodLog,
        waterIntake: waterIntake,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `nutriai-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification('Data exported successfully!', 'success');
}