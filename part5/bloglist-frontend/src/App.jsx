import { useState, useEffect, useRef } from 'react'
import './index.css'
import Blog from './components/Blog'
import userService from './services/users'
import blogService from './services/blogs'
import timerHelper from './utils//timer_helper'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const newBlogFormRef = useRef()

  const setBlogsSorted = (blogs) => {
    setBlogs(blogs.sort((a, b) => b.likes - a.likes ))
  }

  const showSuccessNotification = async (msg) => {
    setSuccessMsg(msg)
    await timerHelper.delay(5000)
    setSuccessMsg(null)
  }

  const showErrorNotification = async (msg) => {
    setErrorMsg(msg)
    await timerHelper.delay(5000)
    setErrorMsg(null)
  }

  const getAllBlogs = async () => await notificationResultWrapper(async () => setBlogsSorted(await blogService.getAll()))

  const handleLikeBlog = async (blog) => {
    await notificationResultWrapper(
      async () => {
        const response = await blogService.likeBlog(blog)
        setBlogsSorted(blogs.map((b) => b.id === response.id ? response : b ))
      }
    )
  }

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove blog '${blog.title}'`)) {
      await notificationResultWrapper(
        async () => {
          await blogService.deleteBlog(blog, token)
          setBlogsSorted(blogs.filter((b) => b.id !== blog.id))
        }
      )
    }
  }

  const handleCreateBlog = async (newBlog) => {
    await notificationResultWrapper(
      async () => {
        newBlogFormRef.current.toggleVisibility()
        const response = await blogService.createBlog(newBlog, token)
        setBlogsSorted(blogs.concat(response))
      }, 'blog created successfully'
    )
  }

  const handleLogout = () =>  {
    setUser(null)
    userService.logout()
  }

  const handleLogin = async (username, password) => {
    await notificationResultWrapper(
      async () => {
        const user = await userService.login(username, password)
        setUser(user)
        setToken(user.token)
        getAllBlogs()
      },`logged successfully as ${username}`
    )
  }

  const notificationResultWrapper = async (call, successMessage) => {
    try {
      await call()
      if (successMessage) {
        showSuccessNotification(successMessage)
      }
    } catch (err) {
      showErrorNotification(err.message)
    }
  }

  useEffect(() => {
    const user = userService.getUser()
    if (user) {
      setUser(user)
      setToken(user.token)
      getAllBlogs()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      { errorMsg && <Notification text={errorMsg} type={'error'}/> }
      { successMsg && <Notification text={successMsg} type={'success'}/> }
      { !user && <LoginForm onLogin={handleLogin}/> }
      { user && <UserInfo user={user} onLogout={handleLogout}/> }
      { user && <Togglable buttonLabel={'create blog'} ref={newBlogFormRef}><NewBlogForm onCreateBlog={handleCreateBlog}/></Togglable> }
      { user && blogs.map(blog => <Blog key={blog.id} blog={blog} onLikeBlog={handleLikeBlog} canDeleteBlog={blog.user.id === user.id}  onDeleteBlog={handleDeleteBlog} />) }
    </div>
  )
}

export default App