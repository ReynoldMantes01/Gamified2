import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBKrZLW2HLEdlJez2pqb6_DFhK_Cpwuwzs",
  authDomain: "gamified-bbf08.firebaseapp.com",
  databaseURL: "https://gamified-bbf08-default-rtdb.firebaseio.com",
  projectId: "gamified-bbf08",
  storageBucket: "gamified-bbf08.firebasestorage.app",
  messagingSenderId: "779702715439",
  appId: "1:779702715439:web:5292a9036047815fe632da",
  measurementId: "G-PYNNKYCNGZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);

export default app;
