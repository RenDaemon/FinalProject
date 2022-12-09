import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBTZNbW78xgww0A0-RPS-7Wpd6SBHC0Qww",
    authDomain: "final-project-65432.firebaseapp.com",
    projectId: "final-project-65432",
    storageBucket: "final-project-65432.appspot.com",
    messagingSenderId: "211141832641",
    appId: "1:211141832641:web:2fcc6ecdc57db4f590c940"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export const auth = getAuth(firebaseApp);

export const db = firebaseApp.firestore();