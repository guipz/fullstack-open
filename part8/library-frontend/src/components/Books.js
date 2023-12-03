import { useEffect, useState } from "react";
import { BOOK_ADDED_SUBSCRIPTION, useAllBooksQuery } from "../services/library";

const Books = ({ show, setFavorite }) => {
  const { subscribeToMore, ...result } = useAllBooksQuery();
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    subscribeToMore({
      document: BOOK_ADDED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newBook = subscriptionData.data.bookAdded;
        return Object.assign({}, prev, {
          allBooks: [newBook, ...prev.allBooks],
        });
      },
    });
  }, []);

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const handleSetFilter = (e) => {
    setFavorite(e);
    setFilter(e);
  };

  const filterBooks = (books) => {
    if (filter) {
      return books.filter((b) => b.genres.includes(filter));
    }
    return books;
  };

  const books = result.data ? result.data.allBooks : [];
  const genres = [...new Set(books.flatMap((b) => b.genres)).keys()];

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks(books).map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button onClick={() => handleSetFilter(g)} key={g}>
          {g}
        </button>
      ))}
      <button onClick={() => handleSetFilter(null)}>all genres</button>
    </div>
  );
};

export default Books;
