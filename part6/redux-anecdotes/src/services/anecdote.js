import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdote'

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

const getAll = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

const create = async (content) => {
  const result = await axios.post(baseUrl, asObject(content))
  return result.data
}

const vote = async (anecdote) => {
  const result = await axios.put(
    `${baseUrl}/${anecdote.id}`, 
    { ...anecdote, votes: anecdote.votes + 1 }
  )
  return result.data
}

export default { getAll, create, vote }