import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { notify } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdote, anecdoteFilter }) => {
    return anecdoteFilter.length === 0 ? anecdote : anecdote.filter((a) => a.content.includes(anecdoteFilter))
  })
  
  const dispatch = useDispatch()
  const voteAnecdote = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(notify(`You voted in anecdote '${anecdote.content}'`, 5000))
  }

  return (
    <>
      {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList