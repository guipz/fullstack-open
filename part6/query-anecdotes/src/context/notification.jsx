import { useContext } from "react";
import { createContext } from "react";
import { useReducer } from "react";

const reducer = (state, { type, payload }) => {
  if (type === 'NOTIFY') {
    return payload
  }
  return state
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [msg, msgDispatch] = useReducer(reducer, null)

  return (
    <NotificationContext.Provider value={[msg, msgDispatch]}>
      { props.children }
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const msgAndDispatch = useContext(NotificationContext)
  return msgAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const msgAndDispatch = useContext(NotificationContext)
  return msgAndDispatch[1]
}

export const notify = (msg) => {
  return {
    type: 'NOTIFY',
    payload: msg
  }
}

export default NotificationContext  