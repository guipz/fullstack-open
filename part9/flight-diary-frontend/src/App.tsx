import { useEffect, useState } from "react";
import "./App.css";
import { create, getAll } from "./services/diary";
import { DiaryEntry, NewDiaryEntry } from "./types/diary";
import { AxiosError } from "axios";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const res = async () => setDiaryEntries(await getAll());
    res();
  }, []);

  const handleSubmit = async (newEntry: NewDiaryEntry) => {
    try {
      const res = await create(newEntry);
      setDiaryEntries(diaryEntries.concat(res));
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data ?? "Unknown Error");
      } else {
        throw error;
      }
    }
  };

  return (
    <>
      <h2>Add new entry</h2>
      <NewDiaryEntryForm onSubmit={{ submit: handleSubmit }} />
      <h2>Diary Entries</h2>
      {diaryEntries.map((entry) => (
        <DiaryEntryItem key={entry.id} entry={entry} />
      ))}
    </>
  );
}

const DiaryEntryItem = ({ entry }: { entry: DiaryEntry }) => {
  return (
    <>
      <h4>{entry.date}</h4>
      <p>visibility: {entry.visibility}</p>
      <p>weather: {entry.weather}</p>
    </>
  );
};

interface NewDiaryEntryFormSubmit {
  submit(newEntry: NewDiaryEntry): void;
}

const useField = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return { formProps: { value, onChange }, clean: () => setValue("") };
};

const NewDiaryEntryForm = ({
  onSubmit,
}: {
  onSubmit: NewDiaryEntryFormSubmit;
}) => {
  const dateField = useField("");
  const visibilityField = useField("");
  const weatherField = useField("");
  const commentField = useField("");
  const visibilityValues = ["great", "good", "ok", "poor"];
  const weatherValues = ["sunny", "rainy", "cloud", "stormy", "windy"];

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit.submit({
      date: dateField.formProps.value,
      visibility: visibilityField.formProps.value,
      weather: weatherField.formProps.value,
      comment: commentField.formProps.value ?? null,
    });
    dateField.clean();
    commentField.clean();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Date</h4>
      <input
        {...dateField.formProps}
        placeholder="date"
        type="date"
        required
        name="date"
      />
      <br />
      <h4>Visiblity</h4>
      {visibilityValues.map((v) => (
        <label key={v} htmlFor={v}>{v}
          <input
            {...visibilityField.formProps}
            value={v}
            id={v}
            required
            type="radio"
            name="visibility"
          />
        </label>
      ))}
      <h4>Weather</h4>
      {weatherValues.map((v) => (
        <label key={v} htmlFor={v}>{v}
          <input
            {...weatherField.formProps}
            value={v}
            id={v}
            required
            type="radio"
            name="weather"
          />
        </label>
      ))}
      <h4>Comment</h4>
      <input {...commentField.formProps} placeholder="comment" name="comment" />
      <br />
      <button type="submit">Create</button>
    </form>
  );
};    

export default App;
