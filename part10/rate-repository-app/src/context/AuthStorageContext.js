import { createContext, useContext } from "react";

const AuthStorageContext = createContext();

export const useAuthStorage = () => {
  return useContext(AuthStorageContext)
}

export default AuthStorageContext;
