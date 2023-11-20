import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdote'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createInState: (state, { payload }) => {
      state.push(payload)
    },
    voteInState: (state, { payload }) => {
      state.find((a) => a.id === payload.id).votes = payload.votes
    },
    setAllInState: (state, { payload }) => {
      return payload
    }
  }
})

const { createInState, setAllInState, voteInState } = anecdoteSlice.actions

export const vote = (anecdote) => {
  return async (dispatch) => {
    const result = await anecdoteService.vote(anecdote)
    dispatch(voteInState(result))
  }
}

export const create = (content) => {
  return async (dispatch) => {
    const result = await anecdoteService.create(content)
    dispatch(createInState(result))
  }
}

export const initialize = () => {
  return async (dispatch) => {
    const result = await anecdoteService.getAll()
    dispatch(setAllInState(result))
  }
}

export default anecdoteSlice.reducer