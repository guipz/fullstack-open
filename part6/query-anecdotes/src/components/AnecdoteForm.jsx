import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../services/anecdote'
import { useNotificationDispatch, notify } from '../context/notification'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const createAnecdote = useMutation({
    mutationFn: anecdoteService.create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['allAnecdotes'])
      queryClient.setQueryData(['allAnecdotes'], anecdotes.concat(newAnecdote)) 
      notificationDispatch(notify(`You created anecdote '${newAnecdote.content}'`))
      setTimeout(() => notificationDispatch(notify(null)), 5000)
    },
    onError: (error) => {
      notificationDispatch(notify(error.response.data.error))
      setTimeout(() => notificationDispatch(notify(null)), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdote.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
