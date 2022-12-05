import { initializeApp } from 'firebase/app';
import { 
    GoogleAuthProvider,
    getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyC1me_323UQXsNAG0b5w2_CgE67RAE6Ges",
    authDomain: "friend-finder-2f5ea.firebaseapp.com",
    projectId: "friend-finder-2f5ea",
    storageBucket: "friend-finder-2f5ea.appspot.com",
    messagingSenderId: "600782118856",
    appId: "1:600782118856:web:abec822d5c9f2dcbacaafd",
    measurementId: "G-GKZ6W97NZ1"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  const db = getFirestore(app)

  const googleProvider = new GoogleAuthProvider();

  // sign up with email, password, username
  // sign in with google account
  // password reset email


  export {
    auth,
    googleProvider,
    db
  }