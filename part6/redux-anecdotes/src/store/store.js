import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from '../reducers/anecdoteReducer'
import anecdoteFilterReducer from '../reducers/anecdoteFilterReducer'
import notificationReducer from '../reducers/notificationReducer'

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    anecdoteFilter: anecdoteFilterReducer,
    notification: notificationReducer
  }
})

export default store