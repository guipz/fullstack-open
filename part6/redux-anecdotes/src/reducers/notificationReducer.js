import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlicer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    set: (state, { payload }) => {
      return payload
    },
  }
})

const { set } = notificationSlicer.actions

export const notify = (msg, seconds) => {
  return async (dispatch) => {
    dispatch(set(msg))
    setTimeout(() => dispatch(set(null)), seconds)
  }
}

export default notificationSlicer.reducer