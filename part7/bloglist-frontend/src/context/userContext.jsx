import { createContext, useContext, useEffect, useReducer } from "react";

const userStorageKey = "loggedUser";
const initialState = null;

const getUserInStorage = () =>
  JSON.parse(window.localStorage.getItem(userStorageKey));
const removeUserInStorage = () =>
  window.localStorage.removeItem(userStorageKey);
const setUserInStorage = (user) =>
  window.localStorage.setItem(userStorageKey, JSON.stringify(user));

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      setUserInStorage(action.payload.user);
      return action.payload.user;
    }
    case "LOGOUT": {
      removeUserInStorage();
      return initialState;
    }
  }
};

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userState, dispatchUser] = useReducer(reducer, initialState);

  useEffect(() => {
    const user = getUserInStorage();
    if (user) {
      dispatchUser(login(user));
    }
  }, [])

  return (
    <UserContext.Provider value={[userState, dispatchUser]}>
      {children}
    </UserContext.Provider>
  );
};

export const login = (user) => {
  return {
    type: "LOGIN",
    payload: {
      user,
    },
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};


export const useUserValue = () => {
  const [userState] = useContext(UserContext);
  return userState;
};

export const useUserDispatch = () => {
  const [_, dispatchUser] = useContext(UserContext);
  return dispatchUser;
};

export const hasUserLoggedInStorage = () => Boolean(getUserInStorage())

export default UserContext;
