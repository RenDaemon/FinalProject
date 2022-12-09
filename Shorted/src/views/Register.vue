<template>
    <h1 class="flex justify-center text-3xl font-bold my-24 mt-5">XcN.Site</h1>
    <div class="flex justify-center">
        <form class="bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="register">
            <h2 class="flex justify-center text text-2xl font-semibold">Register</h2>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email" >Email</label>
                <input 
                class="form-control"
                type="text"
                name="email"
                placeholder="email@adress.com"
                v-model="App.email"
                />
            </div>
            <label class="block text-gray-700 text-sm font-bold mb-2"  for="password">Password</label>
            <div class="input">
                <input 
                class="form-control"
                type="password" 
                name="password"
                placeholder="******"
                v-model="App.password"
                />
            </div>
            <div>
                Already Have Account? <RouterLink class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" to="/">Login</RouterLink>
            </div>
    <button @click="App.register(App.email,App.password)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " type="submit" id="register_button" >
        Register
    </button>
        </form>
    </div>
</template>

<script>
  import {useApp} from '../stores/index';
  export default { 
    setup() {
      const App = useApp();
      return {
        App,
      }
    },
    created() {
    },
  }
</script>
