
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtz3-0rA0I3MzcTkk462AHwJ6sr-HOeR4",
  authDomain: "appagenda-aa16e.firebaseapp.com",
  projectId: "appagenda-aa16e",
  storageBucket: "appagenda-aa16e.firebasestorage.app",
  messagingSenderId: "941843322277",
  appId: "1:941843322277:web:feecf7bbcad197c3f1c44c",
  measurementId: "G-JLY1WZJG3W"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}