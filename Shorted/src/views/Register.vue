<template>
    <h1 class="flex justify-center text-3xl font-bold my-24 mt-5">XcN.Site</h1>
    <div class="flex justify-center">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="register">
            <h2 class="flex justify-center text text-2xl font-semibold">Register</h2>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email" >Email</label>
                <input 
                class="form-control"
                type="text"
                name="email"
                placeholder="email@adress.com"
                v-model="email"
                />
            </div>
            <label class="block text-gray-700 text-sm font-bold mb-2"  for="password">Password</label>
            <div class="input">
                <input 
                class="form-control"
                type="text" 
                name="password"
                placeholder="******"
                v-model="password"
                />
            </div>
            <div>
                Already Have Account? <RouterLink class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" to="/">Login</RouterLink>
            </div>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " type="submit" id="register_button" @click="register">
        Register
    </button>
        </form>
    </div>
</template>

<script>
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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
    methods:
    {
        async register() {
            // data update
            // firebase registration
            const auth = getAuth();
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
    }
  }
</script>
