import { initializeApp, getApps, getApp, cert, App, ServiceAccount } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { getAuth, Auth } from "firebase-admin/auth";

require("dotenv").config();

const serviceAccount: ServiceAccount = {
  projectId: process.env.ADMIN_PROJECT_ID,
  clientEmail: process.env.ADMIN_CLIENT_EMAIL,
  privateKey: process.env.ADMIN_PRIVATE_KEY
}

const initializeFirebaseApp = (): App => {
  return initializeApp({
    credential: cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET
  }, "Admin");
}

const app = !getApps().length ? initializeFirebaseApp() : getApp("Admin");

export const bucket = getStorage(app).bucket();
export const auth: Auth = getAuth(app);
