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
  query,
  where,
  doc
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
      url: window.location.href,
    submit: {
      user: {},
      rlinks:{},
      slink:{},
      Updatenewrlinks:'',
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
        const userId = response.data.uid
        const userEmail = response.data.email
        if(response.data.code == "auth/wrong-password")
        {
           router.push("/")
            document.getElementById('validation').innerHTML = "Wrong password"
            // if(response = "auth/user not found") {
            //   Swal.fire({
            //     title: 'Success!',
            //     text: `auth/user not found ${email}`,
            //     icon: 'success',
            //     timer: 1500,
            //     showConfirmButton: false,
            //   });
            // }
        }
        else if (response.data.code == "auth/user-not-found")
        {
           router.push("/")
            document.getElementById('validation').innerHTML = "No registered email found"
        }
        else if (response.data.code == "auth/network-request-failed")
        {
           router.push("/")
            document.getElementById('validation').innerHTML = "No internet connection"
        }
        else if (response.data.code == "auth/invalid-email")
        {
           router.push("/")
            document.getElementById('validation').innerHTML = "Invalid email"
        }
        else
        {
            localStorage.setItem('userToken', userId)
            localStorage.setItem('userEmail', userEmail)
           router.push("/dashboard")
        }
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
  async logout() {
    const res = await axios
      .post("http://localhost:3000/api/logout")
      .then(
        (response) => {
          console.log(response);
          localStorage.removeItem("userToken");
          if (response.status) {
            Swal.fire({
              title: "Success!",
              text: `Succesesfully Log out`,
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
            text: `Seems like there is an error while Log out`,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      );
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
        if(response.data.code == "auth/email-already-in-use")
        {
            this.$router.push("/register")
            document.getElementById('validation').innerHTML = "Email is not available"
        }
        else if (response.data.code == "auth/invalid-email")
        {
            this.$router.push("/register")
            document.getElementById('validation').innerHTML = "Invalid email format"
        }
        else
        {
            console.log(response)
            alert("User successfully registered")
            this.$router.push('/login')
        } 
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
  // async signOut() {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       console.log("Sign Out completed");
  //       this.$router.push("/");
  //     })
  //     .catch((error) => console.log(error));
  // },
  async Shorten(rlinks) {
    console.log("masuk shorten")
    if (!rlinks.oldrlinks && !rlinks.newrlinks) {
      console.log("masuk shorten tapi gagal")
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
        this.rlinks = []
        this.rlinks.push(...response.data)
        console.log(this.rlinks)
        console.log("berhasil ges")
    })
    .catch((err) => {
        console.log("error ngepush link ke array")
        console.log(err)
    })
},
async direct() {
  console.log("tes")
  const redLink = await axios.get("http://localhost:3000/api/redirectLink", {
      params: { url: this.url }
  })
  .then((response)=>{
      window.location.replace(response.data)
      console.log(response)
  })
},
async edit(id, newrlinks) {
  console.log(id,  newrlinks)
  if (this.Updatenewrlinks == '') {
      this.Updatenewrlinks = newrlinks.replace("xcn.site:5173/")
  }
  const res = await axios.post("http://localhost:3000/api/update", {
      newrlinks: newrlinks,
      id: id
  })
  this.rlinks = [];
  this.renderLink()
  this.Updatenewrlinks = ''
},
// async edit(rlinks) {
//   console.log(rlinks)
//   // if(this.Updatenewrlinks == ''){
//   //   this.newrlinks = this.Updatenewrlinks
//   // }
//   await axios.patch("http://127.0.0.1:3000/api/links/" + rlinks.id, rlinks)
//   .then(
//     (response) => {
//       if (response.status) {
//         Swal.fire({
//           title: "Success!",
//           text: `Succesesfully update user ${rlinks.nama}`,
//           icon: "success",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//       }
//     },
//     (error) => {
//       Swal.fire({
//         title: "Error!",
//         text: `Seems like there is an error while updating user ${links.nama}<br>${error}`,
//         icon: "error",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     }
//   );
// },
async linkdelete(linksid) {
  await axios.delete("http://127.0.0.1:3000/api/links/" + linksid).then(
    (response) => {
      this.submit.rlinks = {};
      if (response.status) {
        Swal.fire({
          title: "Success!",
          text: `Succesesfully delete user `,
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
        text: `Seems like there is an error while deleting user <br>${error}`,
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
     }
    );
  },
  checkUid() {
    if (localStorage.getItem('userToken') == null || localStorage.getItem('userToken') == '')
    {
        this.$router.push("/")
    }
    else
    {
        return;
    }
},
},
});





