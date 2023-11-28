import axios from "axios";
import axiosHelper from "../utils/axios_helper";
import { useQuery } from "react-query";
const baseUrl = "/api/users";

const login = async (username, password) => {
  const response = await axiosHelper.errorWrapper(() =>
    axios.post(`${baseUrl}/login`, { username, password }),
  );
  return response;
};

const getAll = async () => {
  const response = await axiosHelper.errorWrapper(() => axios.get(baseUrl));
  return response;
};

const getById = async (id) => {
  const response = await axiosHelper.errorWrapper(() =>
    axios.get(`${baseUrl}/${id}`),
  );
  return response;
};

const useGetAllUsersQuery = () => {
  const usersQuery = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAll,
  });
  return usersQuery;
};

const useGetUserByIdQuery = (id) => {
  const userQuery = useQuery({
    queryKey: ["userById"],
    queryFn: () => getById(id),
  });
  return userQuery;
};

export default {
  login,
  getAll,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
};
