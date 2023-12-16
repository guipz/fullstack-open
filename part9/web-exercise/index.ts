import express from "express";
import { calculateExercises, CalculateExercisesResult, CalculateExercisesValues } from "../health/src/exercise-calculator";

const PORT = 3001;
const app = express();

app.use(express.json());

app.post("/exercise", (req, res) => {
  const daily_exercises: number[] = req.body.daily_exercises;
  const target: number = Number(req.body.target);
  if (
    isNaN(target) ||
    !Array.isArray(daily_exercises) ||
    daily_exercises.find(n => typeof n !== "number")
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  return res.json(calculateExercises({
    targetDailyAverage: target,
    days: daily_exercises
  }));
});

app.listen(PORT, () => console.log(`Server started in port ${PORT}`));
