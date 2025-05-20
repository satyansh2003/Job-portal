
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCDtRmbxWfOO3UWAVyLqgh1PgrG-pC01w4",
  authDomain: "jobportal-43b4b.firebaseapp.com",
  projectId: "jobportal-43b4b",
  storageBucket: "jobportal-43b4b.firebasestorage.app",
  messagingSenderId: "97525208537",
  appId: "1:97525208537:web:3bd230598cf26dddabb5c8"
};

export const firebase_app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth();