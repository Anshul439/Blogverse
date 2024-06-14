// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-7928e.firebaseapp.com",
  projectId: "blog-app-7928e",
  storageBucket: "blog-app-7928e.appspot.com",
  messagingSenderId: "984420985721",
  appId: "1:984420985721:web:55ab60c3569c363c2fdda8",
  measurementId: "G-KDVQGST1ML",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
