import data from "../data/diagnoses";
import Diagnosis from "../types/diagnosis";

export const getAll = (): Diagnosis[] => {
  return data;
};
