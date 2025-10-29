// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6wQOtOBEIoxY8GOk8IV-IkRQvZ19B_qE",
  authDomain: "bazar-e2a26.firebaseapp.com",
  projectId: "bazar-e2a26",
  storageBucket: "bazar-e2a26.firebasestorage.app",
  messagingSenderId: "476163075227",
  appId: "1:476163075227:web:44bfe4fc67c9fb27866a3e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)