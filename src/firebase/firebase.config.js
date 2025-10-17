import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUnrKuBWQSCsCVnjgcNkeYOGefOTmuiA4",
  authDomain: "e-shopping-4d52b.firebaseapp.com",
  projectId: "e-shopping-4d52b",
  storageBucket: "e-shopping-4d52b.appspot.com",
  messagingSenderId: "572142310752",
  appId: "1:572142310752:web:00f467e4f255f4607d7a05",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
