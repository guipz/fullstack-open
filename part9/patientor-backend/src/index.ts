import express from "express";
import cors from "cors";
import diagnosesRouter from "./routers/diagnoses";
import patientsRouter from "./routers/patients";
const app = express();

const PORT = 3001;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
