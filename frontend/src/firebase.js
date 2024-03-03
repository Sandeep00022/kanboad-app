// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "kanban-project-6c073.firebaseapp.com",
  projectId: "kanban-project-6c073",
  storageBucket: "kanban-project-6c073.appspot.com",
  messagingSenderId: "920344154320",
  appId: "1:920344154320:web:3c66f832a5de7506d68ed5",
  measurementId: "G-S69VYPM7LZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
