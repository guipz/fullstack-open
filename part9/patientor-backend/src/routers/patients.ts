import express from "express";
import {
  addEntry,
  addNew,
  getAllWithoutSensitiveData,
  getById,
} from "../services/patients";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.json(getAllWithoutSensitiveData());
});

router.get("/:id", (req, res) => {
  const patient = getById(req.params.id);
  if (patient) {
    return res.json(patient);
  }
  return res.status(404).send("Patient not found");
});

router.post("/:id/entries", (req, res) => {
  try {
    const entry = addEntry(req.params.id, req.body);
    return res.json(entry);
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(400)
        .send(`Something went wrong: Error ${error.message}`);
    }
    throw error;
  }
});

router.post("/", (req, res) => {
  try {
    const patient = addNew(req.body);
    return res.json(patient);
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(400)
        .send(`Something went wrong: Error ${error.message}`);
    }
    throw error;
  }
});

export default router;
