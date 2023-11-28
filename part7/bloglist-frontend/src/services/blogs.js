import axios from "axios";
import axiosHelper from "../utils/axios_helper";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUserValue } from "../context/userContext";
const baseUrl = "/api/blogs";

const getBearerHeader = (token) => {
  return { Authorization: `Bearer ${token}` };
};

const getAll = async () => {
  const request = await axiosHelper.errorWrapper(() => axios.get(baseUrl));
  return request;
};

const createBlog = async (newBlog, token) => {
  const request = await axiosHelper.errorWrapper(() =>
    axios.post(baseUrl, newBlog, { headers: getBearerHeader(token) }),
  );
  return request;
};

const commentBlog = async (blog, newComment, token) => {
  const request = await axiosHelper.errorWrapper(() =>
    axios.post(`${baseUrl}/${blog.id}/comment`, newComment, {
      headers: getBearerHeader(token),
    }),
  );
  return request;
};

const getById = async (id) => {
  const request = await axiosHelper.errorWrapper(() =>
    axios.get(`${baseUrl}/${id}`),
  );
  return request;
};

const deleteBlog = async (blog, token) => {
  const request = await axiosHelper.errorWrapper(() =>
    axios.delete(`${baseUrl}/${blog.id}`, { headers: getBearerHeader(token) }),
  );
  return request;
};

const likeBlog = async (blog) => {
  const request = await axiosHelper.errorWrapper(() =>
    axios.put(`${baseUrl}/${blog.id}`, { ...blog, likes: blog.likes + 1 }),
  );
  return request;
};

const useGetBlogByIdQuery = (id) => {
  const blogQuery = useQuery({
    queryKey: ["blogById", id],
    queryFn: () => getById(id),
  });
  return blogQuery;
};

const useLikeBlogMutation = () => {
  const queryClient = useQueryClient();
  const likeBlogMutation = useMutation({
    mutationFn: likeBlog,
    onSuccess: (b) => {
      queryClient.invalidateQueries(["blogById", b.id]);
    },
  });
  return likeBlogMutation;
};

const useDeleteBlogMutation = () => {
  const userState = useUserValue();
  const deleteBlogMutation = useMutation({
    mutationFn: (blog) => deleteBlog(blog, userState.token),
  });
  return deleteBlogMutation;
};

const useBlogCommentMutation = () => {
  const queryClient = useQueryClient();
  const userState = useUserValue();
  const blogCommmentMutation = useMutation({
    mutationFn: ({ blog, newComment }) => commentBlog(blog, newComment, userState.token),
    onSuccess: (_, { blog }) => {
      queryClient.invalidateQueries(["blogById", blog.id]);
    },
  });
  return blogCommmentMutation;
};

export default {
  getAll,
  createBlog,
  likeBlog,
  deleteBlog,
  useDeleteBlogMutation,
  useLikeBlogMutation,
  useGetBlogByIdQuery,
  useBlogCommentMutation,
};
