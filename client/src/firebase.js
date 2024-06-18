// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-816aa.firebaseapp.com",
  projectId: "blog-app-816aa",
  storageBucket: "blog-app-816aa.appspot.com",
  messagingSenderId: "802958726619",
  appId: "1:802958726619:web:35c4c571c265698ebac3fe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);