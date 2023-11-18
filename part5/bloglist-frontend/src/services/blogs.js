import axios from 'axios'
import axiosHelper from '../utils/axios_helper'
const baseUrl = '/api/blogs'

const getBearerHeader = (token) => {
  return { 'Authorization': `Bearer ${token}` }
}

const getAll = async () => {
  const request = await axiosHelper.errorWrapper(() => axios.get(baseUrl))
  return request
}

const createBlog = async (newBlog, token) => {
  const request = await axiosHelper.errorWrapper(() =>
    axios.post(baseUrl, newBlog, { headers: getBearerHeader(token) })
  )
  return request
}

const deleteBlog = async (blog, token) => {
  const request = await axiosHelper.errorWrapper(() =>
    axios.delete(`${baseUrl}/${blog.id}`, { headers: getBearerHeader(token) })
  )
  return request
}

const likeBlog = async (blog) => {
  const request = await axiosHelper.errorWrapper(() =>
    axios.put(`${baseUrl}/${blog.id}`, { ...blog, likes: blog.likes + 1 })
  )
  return request
}

export default {
  getAll,
  createBlog,
  likeBlog,
  deleteBlog
}