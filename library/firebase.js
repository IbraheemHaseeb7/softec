// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnI4mqt2Tek-3m8X930m1Z1_LC7WLx1dQ",
  authDomain: "softec-bb7d0.firebaseapp.com",
  projectId: "softec-bb7d0",
  storageBucket: "softec-bb7d0.appspot.com",
  messagingSenderId: "295978974795",
  appId: "1:295978974795:web:19e8cc1ba61e14acb657ce",
  measurementId: "G-VHMGFM0VRK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore();