import { useMutation } from "@apollo/client";
import {
  EDIT_AUTHOR_MUTATION,
  useAllAuthorsQuery,
} from "../services/library";
import { useState } from "react";

const Authors = (props) => {
  const [authorName, setAuthorName] = useState("");
  const [authorBirthday, setAuthorBirthday] = useState("");
  const authorsQuery = useAllAuthorsQuery();
  const [editAuthorMutation] = useMutation(EDIT_AUTHOR_MUTATION);

  const handleEditAuthor = (e) => {
    e.preventDefault();
    editAuthorMutation({
      variables: { setBornTo: Number(authorBirthday), name: authorName },
    });
  };

  if (!props.show) {
    return null;
  }

  if (authorsQuery.loading) {
    return <div>Loading...</div>;
  }

  const authors = authorsQuery.data ? authorsQuery.data.allAuthors : [];

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birthday</h2>
      <form onSubmit={handleEditAuthor}>
        <div>
          <label htmlFor="author">author</label>
          <select
            id="author"
            required
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          >
            <option value="" selected hidden disabled>Select an author</option>
            {authors.map((a) => (
              <option key={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="birthday">birthday</label>
          <input
            id="birthday"
            type="number"
            step={1}
            required
            placeholder="birthday"
            value={authorBirthday}
            onChange={(e) => setAuthorBirthday(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Authors;
