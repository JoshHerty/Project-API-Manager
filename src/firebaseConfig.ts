import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebaseKey from "./firebaseConfigInfo";

const firebaseConfig = firebaseKey;

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
