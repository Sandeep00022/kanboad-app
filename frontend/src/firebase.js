// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "kanbanapp-e56e6.firebaseapp.com",
  projectId: "kanbanapp-e56e6",
  storageBucket: "kanbanapp-e56e6.appspot.com",
  messagingSenderId: "379463697464",
  appId: "1:379463697464:web:a658e9cd6a8cbcee15d2cd",
  measurementId: "G-KEQ099ZBNL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
