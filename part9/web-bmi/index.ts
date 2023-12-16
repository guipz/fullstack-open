import express from "express";
import { calculateBmi } from "../health/src/bmi-calculator";

const PORT = 3001;
const app = express();

app.use(express.json());

app.get("/bmi", (req, res) => {
  const weight: number = Number(req.query.weight);
  const height: number = Number(req.query.height);
  if (isNaN(weight) || isNaN(height)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  return res.json({
    weight,
    height,
    bmi: calculateBmi({ weightInKilos: weight, heightInMeters: height }),
  });
});

app.listen(PORT, () => console.log(`Server started in port ${PORT}`));
