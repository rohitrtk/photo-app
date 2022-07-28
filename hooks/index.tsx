import { useState, useEffect } from "react";
import { collection, doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, fs } from "../lib/firebase";

export const useUserData = () => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const userCollectionRef = collection(fs, "users");
      const userRef = doc(userCollectionRef, user.uid);

      unsubscribe = onSnapshot(userRef, doc => setUsername(doc.data()?.username));
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}
