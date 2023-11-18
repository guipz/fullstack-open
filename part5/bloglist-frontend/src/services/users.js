import axios from 'axios'
import axiosHelper from '../utils/axios_helper'
const baseUrl = 'api/users'
const userStorageKey = 'loggedUser'

const login = async (username, password) => {
  const response = await axiosHelper.errorWrapper(() => axios.post(`${baseUrl}/login`, { username, password }))
  window.localStorage.setItem(userStorageKey, JSON.stringify(response))
  return response
}

const logout = () => {
  window.localStorage.removeItem(userStorageKey)
}

const getUser = () => {
  return JSON.parse(window.localStorage.getItem(userStorageKey))
}

export default {
  login,
  logout,
  getUser
}