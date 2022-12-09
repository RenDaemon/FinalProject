import { defineStore } from "pinia";
import axios from "axios";
import { initializeApp } from "firebase/app";
import Swal from 'sweetalert2';
import router from '/src/router';
import 'firebase/compat/firestore';
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
    state: ()=>  ({
      email: '',
      password:'',
     
    submit: {
      user: {},
      rlinks:{},
      slink:{},
    },
    rlinks: []

  }),
actions:{
  async login(email, password) { 
    const res = await axios.post("http://localhost:3000/api/login", {
        email: email,
        password: password
    })
    .then((response)=>{
        console.log(response)
        const accountId = response.data
        localStorage.setItem('userToken', accountId)
      
        if(response.status) {
          Swal.fire({
            title: 'Success!',
            text: `Succesesfully logged in ${email}`,
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
          router.push('/Dashboard')
        }
      }, (error) => {
        Swal.fire({
          title: 'Error!',
          text: `Seems like there is an error while adding user ${email}<br>${error}`,
          icon: 'error',
          timer: 1500,
          showConfirmButton: false,
        });  
    })
    },
  async moveToRegister() {
    this.$router.push("/Register");
  },
  async register(email, password) {
    const res = await axios.post("http://localhost:3000/api/register", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.status) {
          Swal.fire({
            title: "Success!",
            text: `Succesesfully added user ${email}`,
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          router.push("/");
        }
      },
      (error) => {
        Swal.fire({
          title: "Error!",
          text: `Seems like there is an error while adding ${email} ${error}`,
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    );
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
  async Shorten(rlinks) {
    if (!rlinks.oldrlinks && !rlinks.newrlinks) {
      return;
    }
    await axios
      .post("http://127.0.0.1:3000/api/rlinks", {
        oldrlinks: rlinks.oldrlinks,
        newrlinks: rlinks.newrlinks,
        uid: localStorage.getItem('userToken')
      })
      .then(
        (response) => {
          if (response.status) {
            Swal.fire({
              title: "Success!",
              text: `Succesesfully added link ${rlinks.rlinks}`,
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            this.renderLink();
          }
        },
        (error) => {
          Swal.fire({
            title: "Error!",
            text: `Seems like there is an error while adding links ${links.rawlinks} ${error}`,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      );
    this.submit.rlinks.oldrlinks = "";
    this.submit.rlinks.newrlinks = "";
  },
  async renderLink() {
    const res = await axios.get("http://localhost:3000/api/links", {
        params: { uid: localStorage.getItem('userToken')}
    })
    .then((response)=>{
        console.log(response)
        const links = response.data
        this.links = []
        this.links.push(...response.data)
        console.log(this.links)
        console.log("berhasil ges")
    })
    .catch((err) => {
        console.log("error ngepush link ke array")
        console.log(err)
    })
},
}
});