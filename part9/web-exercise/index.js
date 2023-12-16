"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exercise_calculator_1 = require("../health/src/exercise-calculator");
const PORT = 3001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/exercise", (req, res) => {
    const daily_exercises = req.body.daily_exercises;
    const target = Number(req.body.target);
    if (isNaN(target) ||
        !Array.isArray(daily_exercises) ||
        daily_exercises.find(n => typeof n !== "number")) {
        return res.status(400).json({ error: "malformatted parameters" });
    }
    return res.json((0, exercise_calculator_1.calculateExercises)({
        targetDailyAverage: target,
        days: daily_exercises
    }));
});
app.listen(PORT, () => console.log(`Server started in port ${PORT}`));
