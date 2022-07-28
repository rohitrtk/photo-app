import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  collection,
  query,
  where,
  limit,
  getDocs,
  DocumentData
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const storage = getStorage(app);
export const fs = getFirestore(app);

export const getUserWithUsername = async (username: string) => {
  const usersRef = collection(fs, "users");
  const q = query(usersRef, where("username", "==", username), limit(1));

  try {
    return (await getDocs(q)).docs[0];
  } catch (e) {
    console.error(e);
    return null;
  }
}

export const docToJSON = (doc: DocumentData) => {
  const data = doc.data();

  return {
    ...data,
    id: doc.id,
    timestamp: data.timestamp.toMillis()
  }
}