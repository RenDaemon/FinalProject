<template>
    <h1 class="flex justify-center text-3xl font-bold my-24 mt-5">XcN.Site</h1>
    <div class="flex justify-center ">
        <form class="bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="login">
            <h2 class="flex justify-center text text-2xl font-semibold">Login</h2>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email Adress</label>
                <input
                class="form-control" 
                type="text" 
                name="email" 
                placeholder="email@adress.com"
                v-model="email"
                />
            </div>
            <div class="input">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                <input
                class="form-control" 
                type="text" 
                name="password" 
                placeholder="******"
                v-model="password"
                />
            </div>
        <div >
            Don't Have an Account? <RouterLink class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" to="/Register">Register</RouterLink> 
        </div>
        <button type="submit" id="login_button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
            Login
        </button>
        </form>
    </div>
</template>

<script>
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import {useApp} from '../stores/index';
  export default {
    data() {
        return {
            email: "",
            password: "",
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
    methods: {
    async login() {
        
    const auth = getAuth();
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
    }
    
  }
</script>
