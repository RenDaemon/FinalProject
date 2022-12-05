import { defineStore } from "pinia";
//import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


// isikan firebaseConfig disini
const firebaseConfig = {
  apiKey: "AIzaSyBTZNbW78xgww0A0-RPS-7Wpd6SBHC0Qww",
  authDomain: "final-project-65432.firebaseapp.com",
  projectId: "final-project-65432",
  storageBucket: "final-project-65432.appspot.com",
  messagingSenderId: "211141832641",
  appId: "1:211141832641:web:2fcc6ecdc57db4f590c940"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const auth = getAuth(app);

export const useApp = defineStore({
    id: "App",
    data() {
      return {
        email: "",
        password: "",
      };
    },
actions:{
  async login(submEvent) {

    
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then(() => {
        this.$router.push("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // let alert_1 = document.querySelector("#alert_1");
        // alert_1.classList.remove("d-none");
        // alert_1.innerHTML = errorMessage;
        // console.log(alert_1);
      });
  },
  async moveToRegister() {
    this.$router.push("/Register");
  },
  async register() {
    // data update
    // firebase registration
    
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        console.log("Registration completed");
        this.$router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // let alert_2 = document.querySelector("#alert_2");
        // alert_2.classList.remove("d-none");
        // alert_2.innerHTML = errorMessage;
        // console.log(alert_2);
      });
  },
  async moveToLogin() {
    this.$router.push("/");
  },
  async signOut() {
    auth
      .signOut()
      .then(() => {
        console.log("Sign Out completed");
        this.$router.push("/");
      })
      .catch((error) => console.log(error));
  },
}
});