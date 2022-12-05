<template>
  <div>
    <h1 class="flex justify-center text-3xl font-bold my-24 mt-5">XcN.Site</h1>
    <div>
       <h1 class="flex justify-center text-2xl font-semibold mb-5">Hello</h1> 
    </div>
    <div id="username_display" class="display-6">{{ this.email }}</div>
    <div id="id_display" class="display-6">{{ this.uid }}</div>
    <button id="sign_out" class="mt-4 btn btn-danger" @click="signOut">
      Logout
    </button>
  </div>
  <div>
    <input type="text" v-model="oldLink" placeholder="example.com">
    <input type="text" v-model="newLink" placeholder="http://127.0.0.1:5174/p/yourcustom">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3  " @click="shortenLink(oldLink, newLink)"> Shorten </button>
  </div>
</template>

<script>
  import {useApp} from '../stores/index';
  import { getAuth } from "firebase/auth";
  import { getFirestore, collection, updateDoc, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore"
  

  const auth = getAuth();
  
  export default {
    data() {
        return {
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            Links: []
        }
    },
    setup() {
      const App = useApp();
      return {
        App,
      }
    },
    created() {
    },
    methods:{
    async signOut() {
    auth
      .signOut()
      .then(() => {
        console.log("Sign Out completed");
        this.$router.push("/");
      })
      .catch((error) => console.log(error));
  },
  async shortenLink(oldLink, newLink) {
      try {
        const docRef = await addDoc(collection(db, "Links"),{
          id: "",
          task: this.task,
          category: this.$refs.category.value,
          clear: false
        })
        const docUp = doc(db, "Links", docRef.id)
        await updateDoc(docUp, {id: docRef.id})
        console.log("Berhasil menambahkan ", docRef.id)
        this.load()
      }
      catch(e) {
        console.log("Gagal menambahkan ", e)
      }
    },
  // {
  //        try {
  //       const docRef = await addDoc(collection(db, "Links"),{
  //         oldLink: oldLink,
  //         newLink: newLink,
  //         count: 0,
  //       })
  //   }
  //       catch(e) {
  //       console.log("Gagal menambahkan ", e)
  //     }
  // }
  }
}
</script>
