import { useState } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  blog: PropTypes.object.isRequired,
  onLikeBlog: PropTypes.func.isRequired,
  canDeleteBlog: PropTypes.bool.isRequired,
  onDeleteBlog: PropTypes.func.isRequired
}

const Blog = ({ blog, onLikeBlog, canDeleteBlog, onDeleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  Blog.propTypes = propTypes

  return (
    <div className='blog-item'>
      <p>{blog.title}<button onClick={() => setShowDetails(!showDetails)}>View</button></p>
      { showDetails &&
        <>
          <p>{blog.url}</p>
          <p>Likes {blog.likes}<button onClick={() => onLikeBlog(blog)}>Like</button></p>
          <p>{blog.user.username}</p>
          { canDeleteBlog && <button onClick={() => onDeleteBlog(blog)}>Delete</button>}
        </>
      }
    </div>
  )
}

export default Blog