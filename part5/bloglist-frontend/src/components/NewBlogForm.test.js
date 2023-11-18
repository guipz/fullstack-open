import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'


describe('when there is a NewBlogForm component', () => {
  let onCreateBlogMock = null
  let user = userEvent.setup()

  beforeEach(() => {
    onCreateBlogMock = jest.fn()
    render(
      <NewBlogForm onCreateBlog={onCreateBlogMock}/>
    )
  })

  test('creation handler is called after submitting', async () => {
    const formData = {
      title: 'Java is cool',
      author: 'Martin',
      url: 'https://example.com'
    }

    const titleInput = screen.getByPlaceholderText('Write title here')
    const authorInput = screen.getByPlaceholderText('Write author here')
    const urlInput = screen.getByPlaceholderText('Write url here')
    const createButton = screen.getByText('Create')

    await user.type(titleInput, formData.title)
    await user.type(authorInput, formData.author)
    await user.type(urlInput, formData.url)

    await user.click(createButton)

    const blogParam = onCreateBlogMock.mock.calls[0][0]
    expect(blogParam).toEqual(formData)

  })

})