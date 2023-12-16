export interface NewDiaryEntry {
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export interface DiaryEntry extends NewDiaryEntry {
  id: number;
}
