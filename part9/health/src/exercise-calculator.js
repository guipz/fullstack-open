"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateExercises = void 0;
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
const calculateExercises = ({ days, targetDailyAverage, }) => {
    const calculatedDailyAverage = days.reduce((sum, a) => sum + a) / days.length;
    return Object.assign({ numberOfDays: days.length, numberOfTrainingDays: days.filter(d => d !== 0).length, targetDailyAverage: targetDailyAverage, calculatedDailyAverage: calculatedDailyAverage, reachedGoal: calculatedDailyAverage >= targetDailyAverage }, getRating(days));
};
exports.calculateExercises = calculateExercises;
const parseArgumentsExercise = (args) => {
    if (args.length < 4)
        throw new Error("Not enough arguments");
    if (args.length > 4)
        throw new Error("Too many arguments");
    if (args.slice(2).find(a => isNaN(Number(a)))) {
        throw new Error("Provided values were not numbers!");
    }
    return {
        days: args.slice(2, args.length - 1).map(n => Number(n)),
        targetDailyAverage: Number(args[args.length - 1]),
    };
};
if (process.argv[1].includes("exercise-calculator")) {
    try {
        const args = parseArgumentsExercise(process.argv);
        console.log(`These are your results:`);
        console.log((0, exports.calculateExercises)(args));
    }
    catch (error) {
        let errorMessage = "Something bad happened.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        console.log(errorMessage);
    }
}
