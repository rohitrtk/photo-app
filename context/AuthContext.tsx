import React, { ReactNode, createContext, useState, useContext, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";

interface AuthContextProps {
  children: ReactNode;
}

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: AuthContextProps) => {

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (email: string, displayName: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: displayName
      });
    }
  }

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {
        loading ? null : children
      }
    </AuthContext.Provider>
  );
}