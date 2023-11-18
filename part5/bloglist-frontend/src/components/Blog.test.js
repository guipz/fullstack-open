import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('when there is a Blog component', () => {
  let user = null
  let container = null
  let blog = null
  let canDeleteBlog = null
  let onDeleteBlogMock = null
  let onLikeBlogMock = null

  beforeEach(() => {
    blog = {
      url: 'https://www.example.com',
      title: 'Python Tutorial',
      author: 'John',
      likes: 10,
      user: {
        username: 'Bob'
      }
    }
    user = userEvent.setup()
    canDeleteBlog = false
    onDeleteBlogMock = jest.fn()
    onLikeBlogMock = jest.fn()
    container = render(
      <Blog
        blog={blog}
        canDeleteBlog={canDeleteBlog}
        onDeleteBlog={onDeleteBlogMock}
        onLikeBlog={onLikeBlogMock}
      />
    )
  })

  test('just the blog title and author is initially visible', () => {
    const username = screen.queryByText(blog.user.username)
    const author = screen.queryByText(blog.author)
    const title = screen.queryByText(blog.title)
    const url = screen.queryByText(blog.url)
    const likes = screen.queryByText(blog.likes)

    expect(username).toBeNull()
    expect(url).toBeNull()
    expect(likes).toBeNull()

    expect(author).toBeDefined()
    expect(title).toBeDefined()
  })

  test('the url, username and likes is visible after clicking view button', async () => {
    const button = screen.getByText('View')
    await user.click(button)

    const username = screen.queryByText(blog.user.username)
    const url = screen.queryByText(blog.url)
    const likes = screen.queryByText(blog.likes)

    expect(username).toBeDefined()
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('the like handler is called after clicking the like button', async () => {
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(onLikeBlogMock.mock.calls).toHaveLength(2)
  })
})