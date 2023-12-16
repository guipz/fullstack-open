"use strict";
const calculateBmi = (heightInMeters, weightInKilos) => {
    const bmi = weightInKilos / heightInMeters ** 2;
    if (bmi < 18.5) {
        return "Underweight";
    }
    else if (bmi < 25) {
        return "Normal";
    }
    else if (bmi < 30) {
        return "Overweight";
    }
    else {
        return "Obese";
    }
};
console.log(calculateBmi(1.7, 65));
//# sourceMappingURL=bmiCalculator.js.map