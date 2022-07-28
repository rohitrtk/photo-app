import { createContext } from "react";

export interface IUserContext {
  username: string | null;
  user: {
    username: string,
    photoURL: string
  } | null
}

export const UserContext = createContext<IUserContext>({
  username: null,
  user: null
});