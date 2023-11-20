import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const createAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.content.value
    dispatch(create(content))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='content' /></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm