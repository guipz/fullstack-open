import { useEffect } from "react";
import { BOOK_ADDED_SUBSCRIPTION, useAllBooksQuery } from "../services/library";

const Recommend = ({ show, favorite }) => {
  const { subscribeToMore, ...result }  = useAllBooksQuery(favorite);

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

  const books = result.data ? result.data.allBooks : [];

  return (
    <div>
      <h2>Recommendations</h2>
      {favorite && <p>books in your favorite genre {favorite}</p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
