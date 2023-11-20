import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from './services/anecdote'
import { useNotificationDispatch, notify } from './context/notification'

const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  
  const voteAnecdote = useMutation({
    mutationFn: anecdoteService.vote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['allAnecdotes'])
      queryClient.setQueryData(
        ['allAnecdotes'],
        anecdotes.map((a) => a.id === updatedAnecdote.id ? updatedAnecdote : a )
      )
      notificationDispatch(notify(`You voted in anecdote '${updatedAnecdote.content}'`))
      setTimeout(() => notificationDispatch(notify(null)), 5000)
    },
    onError: (error) => { 
      notificationDispatch(notify(error.message))
      setTimeout(() => notificationDispatch(notify(null)), 5000)
    }
  })

  const handleVote = (anecdote) => {
    voteAnecdote.mutate(anecdote)
  }

  const anecdotesQuery = useQuery({
    queryKey: ['allAnecdotes'],
    queryFn: async () => await anecdoteService.getAll(),
    retry: false
  })

  if (anecdotesQuery.isLoading) {
    return <div>Loading data...</div>
  }

  if (anecdotesQuery.isError) {
    return <div>An Error occurred while retrieving anecdotes: { anecdotesQuery.error.message }</div>
  }

  const anecdotes = anecdotesQuery.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
