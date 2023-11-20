import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const anecdoteFilterSlice = createSlice({
  name: 'anecdoteFilter',
  initialState,
  reducers: {
    change: (state, { payload }) => {
      return payload
    }
  }
})

export const { change } = anecdoteFilterSlice.actions
export default anecdoteFilterSlice.reducer