// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzb4EKiLGsY0Xm435f30U77d4tyDMLI2Q",
  authDomain: "eblog-2024.firebaseapp.com",
  databaseURL: "https://eblog-2024-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "eblog-2024",
  storageBucket: "eblog-2024.appspot.com",
  messagingSenderId: "505307476037",
  appId: "1:505307476037:web:b01a3ef3c045d0c395732c",
  measurementId: "G-41HSSBPVS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
