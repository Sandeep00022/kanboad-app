// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "kanban-app-fe8f1.firebaseapp.com",
  projectId: "kanban-app-fe8f1",
  storageBucket: "kanban-app-fe8f1.appspot.com",
  messagingSenderId: "499260516676",
  appId: "1:499260516676:web:4fb72347f5ad9699e14f11",
  measurementId: "G-H8TQEF0MYS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
