import { useUserValue } from "../context/userContext";
import { useMutation } from "react-query";
import blogService from "../services/blogs";
import {
  notifyError,
  notifySuccess,
  useNotificationDispatch,
} from "../context/notificationContext";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const NewBlogForm = () => {
  const navigate = useNavigate();
  const userState = useUserValue();
  const dispatchNotification = useNotificationDispatch();

  const createBlogMutation = useMutation({
    mutationFn: (newBlog) => blogService.createBlog(newBlog, userState.token),
    onSuccess: (b) => {
      dispatchNotification(
        notifySuccess(`You created blog '${b.title}'`),
        5000,
      );
      navigate("/");
    },
    onError: (e) => {
      if (e.code === "NetworkError") {
        dispatchNotification(notifyError(e.message), 5000);
      } else {
        dispatchNotification(notifyError("An Unknown Error Occurred."), 5000);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createBlogMutation.mutate({
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="titleNewBlogForm">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          required
          name="title"
          placeholder="Enter title"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="authorNewBlogForm">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          required
          name="author"
          placeholder="Enter Author"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="urlNewBlogForm">
        <Form.Label>Url</Form.Label>
        <Form.Control type="url" required name="url" placeholder="Enter Url" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default NewBlogForm;
