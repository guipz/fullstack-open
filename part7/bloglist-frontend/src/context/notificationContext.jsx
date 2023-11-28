import { createContext, useContext, useReducer } from "react";
import timer_helper from "../utils/timer_helper";

const intialState = { message: "", notificationType: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "NOTIFY":
      return action.payload;
    case "CLEAN":
      return intialState;
  }
  return state;
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notificationState, dispatchNotification] = useReducer(
    reducer,
    intialState,
  );

  const dispatchNotificationWithTimeout = async (action, expireIn) => {
    dispatchNotification(action);
    if (action.type === "NOTIFY" && expireIn) {
      await timer_helper.delay(expireIn);
      dispatchNotification(clean());
    }
  };

  return (
    <NotificationContext.Provider
      value={[notificationState, dispatchNotificationWithTimeout]}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const clean = () => {
  return {
    type: "CLEAN",
  };
};

const notify = (message, notificationType) => {
  return {
    type: "NOTIFY",
    payload: {
      message,
      notificationType,
    },
  };
};

export const notifyError = (message) => {
  return notify(message, "error");
};

export const notifySuccess = (message) => {
  return notify(message, "success");
};

export const useNotificationState = () => {
  const [notificationState, _] = useContext(NotificationContext);
  return notificationState;
};

export const useNotificationDispatch = () => {
  const [_, dispatchNotification] = useContext(NotificationContext);
  return dispatchNotification;
};

export default NotificationContext;
