import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types/diary";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAll = async (): Promise<DiaryEntry[]> => {
  const res = await axios.get<DiaryEntry[]>(baseUrl);
  return res.data;
};

export const create = async (newEntry: NewDiaryEntry): Promise<DiaryEntry> => {
  const res = await axios.post<DiaryEntry>(baseUrl, newEntry);
  return res.data;
};
