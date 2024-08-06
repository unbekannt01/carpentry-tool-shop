import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDXmIV-O--aiIYsBm3wwsHRMXBmp0QS_rI",
  authDomain: "carpentry-tool-shop.firebaseapp.com",
  projectId: "carpentry-tool-shop",
  storageBucket: "carpentry-tool-shop.appspot.com",
  messagingSenderId: "551611627195",
  appId: "1:551611627195:web:26c9af2d0cf1677f66db9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)
export default app