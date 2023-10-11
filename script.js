// Define the food objects
let appetizer = { protein: 0, carbohydrates: 0, fat: 0, calories: 0 };
let entree = { protein: 0, carbohydrates: 0, fat: 0, calories: 0 };
let dessert = { protein: 0, carbohydrates: 0, fat: 0, calories: 0 };

// Function to calculate calories
function calculateCalories(food) {
    return (food.fat * 9) + (food.carbohydrates * 4) + (food.protein * 4);
}

// Function to update food display
function updateFoodDisplay(food, sectionId) {
    const section = document.getElementById(sectionId);
    section.querySelector(`#${sectionId}-protein`).textContent = food.protein;
    section.querySelector(`#${sectionId}-carbs`).textContent = food.carbohydrates;
    section.querySelector(`#${sectionId}-fat`).textContent = food.fat;
    section.querySelector(`#${sectionId}-calories`).textContent = calculateCalories(food);
}

// Function to update total calories
function updateTotalCalories() {
    const totalCalories = calculateCalories(appetizer) + calculateCalories(entree) + calculateCalories(dessert);
    document.getElementById("total-meal-calories").textContent = totalCalories;
}

// Initialize event listeners for all buttons
function initializeButtons() {
    function initializeFoodButton(sectionId, food, nutrient) {
        const plusButton = document.getElementById(`${sectionId}-${nutrient}-plus`);
        const minusButton = document.getElementById(`${sectionId}-${nutrient}-minus`);
        plusButton.addEventListener("click", () => {
            food[nutrient] += 1;
            updateFoodDisplay(food, sectionId);
            updateTotalCalories();
        });
        minusButton.addEventListener("click", () => {
            if (food[nutrient] > 0) {
                food[nutrient] -= 1;
                updateFoodDisplay(food, sectionId);
                updateTotalCalories();
            }
        });
    }

    // Initialize buttons for each food section and nutrient
    initializeFoodButton("appetizer", appetizer, "protein");
    initializeFoodButton("appetizer", appetizer, "carbs");
    initializeFoodButton("appetizer", appetizer, "fat");

    initializeFoodButton("entree", entree, "protein");
    initializeFoodButton("entree", entree, "carbs");
    initializeFoodButton("entree", entree, "fat");

    initializeFoodButton("dessert", dessert, "protein");
    initializeFoodButton("dessert", dessert, "carbs");
    initializeFoodButton("dessert", dessert, "fat");

    // Reset buttons
    function initializeResetButton(sectionId, food) {
        const resetButton = document.getElementById(`reset-${sectionId}`);
        resetButton.addEventListener("click", () => {
            food.protein = 0;
            food.carbohydrates = 0;
            food.fat = 0;
            updateFoodDisplay(food, sectionId);
            updateTotalCalories();
        });
    }

    // Initialize reset buttons for each food section
    initializeResetButton("appetizer", appetizer);
    initializeResetButton("entree", entree);
    initializeResetButton("dessert", dessert);

    // Reset Meal button
    const resetMealButton = document.getElementById("reset-meal");
    resetMealButton.addEventListener("click", () => {
        appetizer = { protein: 0, carbohydrates: 0, fat: 0 };
        entree = { protein: 0, carbohydrates: 0, fat: 0 };
        dessert = { protein: 0, carbohydrates: 0, fat: 0 };
        updateFoodDisplay(appetizer, "appetizer-section");
        updateFoodDisplay(entree, "entree-section");
        updateFoodDisplay(dessert, "dessert-section");
        updateTotalCalories();
    });

    // Plus and Minus 5 buttons
    function initializePlusMinus5Buttons(nutrient) {
        const plus5Button = document.getElementById(`plus-5`);
        const minus5Button = document.getElementById(`minus-5`);
        plus5Button.addEventListener("click", () => {
            appetizer[nutrient] += 5;
            entree[nutrient] += 5;
            dessert[nutrient] += 5;
            updateFoodDisplay(appetizer, "appetizer-section");
            updateFoodDisplay(entree, "entree-section");
            updateFoodDisplay(dessert, "dessert-section");
            updateTotalCalories();
        });
        minus5Button.addEventListener("click", () => {
            if (appetizer[nutrient] >= 5) {
                appetizer[nutrient] -= 5;
                entree[nutrient] -= 5;
                dessert[nutrient] -= 5;
                updateFoodDisplay(appetizer, "appetizer-section");
                updateFoodDisplay(entree, "entree-section");
                updateFoodDisplay(dessert, "dessert-section");
                updateTotalCalories();
            }
        });
    }

    // Initialize plus and minus 5 buttons for each nutrient
    initializePlusMinus5Buttons("protein");
    initializePlusMinus5Buttons("carbs");
    initializePlusMinus5Buttons("fat");
}

// Call the function to initialize buttons
initializeButtons();
