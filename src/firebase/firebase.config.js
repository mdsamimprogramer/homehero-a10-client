// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHzBdRh1ONe2TwXvee4mKWHYraOH390tQ",
  authDomain: "smart-deals-a84c8.firebaseapp.com",
  projectId: "smart-deals-a84c8",
  storageBucket: "smart-deals-a84c8.firebasestorage.app",
  messagingSenderId: "1045995820563",
  appId: "1:1045995820563:web:3fef62b56255d51a0491e6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
