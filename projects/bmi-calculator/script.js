let currentUnit = 'metric';

function switchUnit(unit) {
    currentUnit = unit;
    
    // Update button states
    document.getElementById('metricBtn').classList.toggle('active', unit === 'metric');
    document.getElementById('imperialBtn').classList.toggle('active', unit === 'imperial');
    
    // Update units display and placeholders
    if (unit === 'metric') {
        document.getElementById('heightUnit').textContent = 'cm';
        document.getElementById('weightUnit').textContent = 'kg';
        document.getElementById('height').placeholder = '170';
        document.getElementById('weight').placeholder = '70';
    } else {
        document. getElementById('heightUnit').textContent = 'in';
        document.getElementById('weightUnit').textContent = 'lbs';
        document.getElementById('height').placeholder = '67';
        document.getElementById('weight').placeholder = '154';
    }
    
    // Clear inputs
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';
    
    // Hide result if shown
    document.getElementById('resultSection').style.display = 'none';
}

function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    
    // Validation
    if (! height || !weight || height <= 0 || weight <= 0) {
        alert('Please enter valid height and weight values');
        return;
    }
    
    let bmi;
    
    if (currentUnit === 'metric') {
        // BMI = weight (kg) / (height (m))^2
        const heightInMeters = height / 100;
        bmi = weight / (heightInMeters * heightInMeters);
    } else {
        // BMI = (weight (lbs) / (height (in))^2) * 703
        bmi = (weight / (height * height)) * 703;
    }
    
    // Round to 1 decimal place
    bmi = Math.round(bmi * 10) / 10;
    
    // Display result
    displayResult(bmi);
}

function displayResult(bmi) {
    const resultSection = document.getElementById('resultSection');
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const bmiMessage = document.getElementById('bmiMessage');
    const scaleIndicator = document.getElementById('scaleIndicator');
    
    // Determine category
    let category, message, indicatorPosition;
    
    if (bmi < 18.5) {
        category = 'Underweight';
        message = 'You are underweight.  Consider consulting a healthcare provider.';
        resultSection.className = 'result-section underweight';
        indicatorPosition = (bmi / 18.5) * 25; // 0-25% of scale
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal';
        message = 'Your BMI is in the healthy range. Keep it up!';
        resultSection. className = 'result-section normal';
        indicatorPosition = 25 + ((bmi - 18.5) / (25 - 18.5)) * 25; // 25-50% of scale
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        message = 'You are overweight. Consider a balanced diet and exercise.';
        resultSection.className = 'result-section overweight';
        indicatorPosition = 50 + ((bmi - 25) / (30 - 25)) * 25; // 50-75% of scale
    } else {
        category = 'Obese';
        message = 'You are obese. Please consult a healthcare provider. ';
        resultSection.className = 'result-section obese';
        indicatorPosition = 75 + Math.min(((bmi - 30) / 10) * 25, 25); // 75-100% of scale
    }
    
    // Update display
    bmiValue.textContent = bmi;
    bmiCategory.textContent = category;
    bmiMessage.textContent = message;
    scaleIndicator.style.left = indicatorPosition + '%';
    
    // Show result section
    resultSection.style.display = 'block';
    
    // Smooth scroll to result
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Allow Enter key to calculate
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateBMI();
            }
        });
    });
});
