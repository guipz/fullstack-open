import {
  notifyError,
  notifySuccess,
  useNotificationDispatch,
} from "../context/notificationContext";
import { useNavigate, useParams } from "react-router-dom";
import { useUserValue } from "../context/userContext";
import blogService from "../services/blogs";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

const Blog = () => {
  const params = useParams();
  const likeBlogMutation = blogService.useLikeBlogMutation();
  const deleteBlogMutation = blogService.useDeleteBlogMutation();
  const commentBlogMutation = blogService.useBlogCommentMutation();
  const dispatchNotification = useNotificationDispatch();
  const userState = useUserValue();
  const navigate = useNavigate();

  const blogQuery = blogService.useGetBlogByIdQuery(params.id);
  const blog = blogQuery.data;

  const handleLikeBlog = async () => {
    try {
      const result = await likeBlogMutation.mutateAsync(blog);
      dispatchNotification(
        notifySuccess(`You liked blog '${result.title}'`),
        5000,
      );
    } catch (err) {
      if (err.code === "NetworkError") {
        dispatchNotification(notifyError(err.message), 5000);
      } else {
        dispatchNotification(notifyError("An Unknown Error Occurred."), 5000);
      }
    }
  };

  const handleDeleteBlog = async () => {
    if (window.confirm(`Remove blog '${blog.title}'`)) {
      try {
        await deleteBlogMutation.mutateAsync(blog);
        dispatchNotification(
          notifySuccess(`You deleted blog '${blog.title}'`),
          5000,
        );
        navigate("..");
      } catch (err) {
        if (err.code === "NetworkError") {
          dispatchNotification(notifyError(err.message), 5000);
        } else {
          dispatchNotification(notifyError("An Unknown Error Occurred."), 5000);
        }
      }
    }
  };

  const handleBlogComment = async (e) => {
    e.preventDefault();
    const newComment = { content: e.target.content.value };
    try {
      await commentBlogMutation.mutateAsync({ blog, newComment });
      dispatchNotification(
        notifySuccess(`You commented '${newComment.content}'`),
        5000,
      );
    } catch (err) {
      if (err.code === "NetworkError") {
        dispatchNotification(notifyError(err.message), 5000);
      } else {
        dispatchNotification(notifyError("An Unknown Error Occurred."), 5000);
      }
    }
  };

  switch (blogQuery.status) {
    case "loading":
      return <Loading />;
    case "error":
      return <Error />;
  }

  return (
    <article>
      <section className="mb-2">
        <Card>
          <Card.Body>
            <header>
              <h4>{blog.title}</h4>
            </header>
            <a href={blog.url}>{blog.url}</a>
            <p className="text-muted m-0">{blog.author}</p>
            <div className="mt-3">
              <Button className="me-1" onClick={handleLikeBlog}>
                Likes {blog.likes}
              </Button>
              {userState && userState.id === blog.user.id && (
                <Button variant="secondary" onClick={handleDeleteBlog}>
                  Delete
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      </section>
      <section>
        <Card>
          <Card.Body>
            <Form onSubmit={handleBlogComment}>
              <Row className="align-items-center my-2">
                <Col md="5">
                  <Form.Control
                    name="content"
                    required
                    placeholder="Comment here"
                    minLength={3}
                  />
                </Col>
                <Col md="3">
                  <Button
                    size="sm"
                    type="submit"
                    className="my-2"
                    variant="secondary"
                  >
                    Comment
                  </Button>
                </Col>
              </Row>
            </Form>
            <header>
              <h5>Comments</h5>
            </header>
            <ul>
              {blog.comments.map((c) => (
                <li key={c.id}>{c.content}</li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      </section>
    </article>
  );
};

export default Blog;
