import React, { ReactNode, createContext } from "react";
import { User } from "firebase/auth";

import { useUserData } from "../hooks";

export interface IUserContext {
  username: string | null;
  user: User | null | undefined;
}

export const UserContext = createContext<IUserContext>({
  username: null,
  user: null
});


interface IUserContextComponent {
  children: ReactNode;
}

const UserContextProvider = ({ children }: IUserContextComponent) => {

  const { user, username } = useUserData();

  return (
    <UserContext.Provider value={{ user, username }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;