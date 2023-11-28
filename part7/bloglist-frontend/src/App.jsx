import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from "./pages/Root";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import NewBlog from "./pages/NewBlog";
import Users from "./pages/Users";
import User from "./pages/User";
import Blog from "./pages/Blog";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" index={true} element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs/new" element={<NewBlog />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
