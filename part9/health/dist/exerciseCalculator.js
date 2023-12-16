"use strict";
const getRating = (days) => {
    const rating = 3 - (days.filter(d => d === 0).length / days.length) * 3;
    let ratingDescription;
    if (rating <= 1.5) {
        ratingDescription = "You're taking way too much rest days.";
    }
    else if (rating <= 2.0) {
        ratingDescription = "You should take rest days a litte less.";
    }
    else {
        ratingDescription = "You're doing great, keep it up!";
    }
    return {
        rating,
        ratingDescription,
    };
};
const calculateExercises = (days, targetDailyAverage) => {
    const calculatedDailyAverage = days.reduce((sum, a) => sum + a) / days.length;
    return Object.assign({ numberOfDays: days.length, numberOfTrainingDays: days.filter(d => d !== 0).length, targetDailyAverage: targetDailyAverage, calculatedDailyAverage: calculatedDailyAverage, reachedGoal: calculatedDailyAverage >= targetDailyAverage }, getRating(days));
};
console.log(process.argv);
//# sourceMappingURL=exerciseCalculator.js.map