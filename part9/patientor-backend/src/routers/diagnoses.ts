import express from "express";
import { getAll } from "../services/diagnoses";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.json(getAll());
});

export default router;
