import { useState } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  onCreateBlog: PropTypes.func.isRequired
}

const NewBlogForm = ({ onCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  NewBlogForm.propTypes = propTypes

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreateBlog({ title, author, url })
  }
  return (
    <>
      <h2>New Blog</h2>
      <form onSubmit={handleSubmit}>
        <p>Title<input id='newblog-title' required placeholder='Write title here' onChange={(e) => setTitle(e.target.value)} /></p>
        <p>Author<input id='newblog-author' required placeholder='Write author here' onChange={(e) => setAuthor(e.target.value)} /></p>
        <p>Url<input id='newblog-url' required placeholder='Write url here' onChange={(e) => setUrl(e.target.value)} /></p>
        <button id='newblog-button'>Create</button>
      </form>
    </>
  )
}

export default NewBlogForm
