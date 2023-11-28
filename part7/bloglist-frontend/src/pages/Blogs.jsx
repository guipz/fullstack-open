import { useQuery } from "react-query";
import blogService from "../services/blogs";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { Link } from "react-router-dom";

const Blogs = () => {
  const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes);
  };

  const blogsQuery = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => await blogService.getAll(),
  });

  const blogs = blogsQuery.data ? sortBlogs(blogsQuery.data) : [];

  switch (blogsQuery.status) {
    case "loading":
      return <Loading />;
    case "error":
      return <Error />;
  }

  return (
    <article>
      <header>
        <h4>Blogs</h4>
      </header>
      <ul>
        {blogs.map((b) => (
          <li key={b.id}><Link to={`/blogs/${b.id}`}>{b.title}</Link></li>
        ))}
      </ul>
    </article>
  );
};

export default Blogs;
