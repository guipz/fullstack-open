import { Link, useParams } from "react-router-dom";
import userServive from "../services/users";
import Loading from "../components/Loading";
import Error from "../components/Error";

const User = () => {
  const params = useParams();
  const user = userServive.useGetUserByIdQuery(params.id);

  switch (user.status) {
    case "loading":
      return <Loading />;
    case "error":
      return <Error />;
  }

  return (
    <article>
      <header>
        <h4>{user.data.username}</h4>
      </header>
      <ul>
        {user.data.blogs.map((b) => (
          <li key={b.id}><Link to={`/blogs/${b.id}`}>{b.title}</Link></li>
        ))}
      </ul>
    </article>
  );
};
export default User;
