import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyD5T85LblUC68jGG_tKT0oOlL0koXp8uYE",
  authDomain: "wisdombank-daeb9.firebaseapp.com",
  projectId: "wisdombank-daeb9",
  storageBucket: "wisdombank-daeb9.appspot.com",
  messagingSenderId: "372930322310",
  appId: "1:372930322310:web:78fba9e5659585d79a1607"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);