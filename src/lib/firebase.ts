import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYQsKf4EEEACHAZmBfOqjYfwhBKYaHE_0",
  authDomain: "cem-site-sda2.firebaseapp.com",
  projectId: "cem-site-sda2",
  storageBucket: "cem-site-sda2.firebasestorage.app",
  messagingSenderId: "919366559284",
  appId: "1:919366559284:web:e9a06e37f81ba3bf760c61"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
