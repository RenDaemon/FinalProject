<template>
        <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-">
    <div class="w-full max-w-md space-y-8">
      <div>
        <img class="mx-auto h-30 w-auto" src="../assets/XcN_RAVEN-removebg-preview.png" alt="Your Company" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-white">Register</h2>
        <p class="mt-2 text-center text-sm text-zinc-300">
          Already have an account?
          {{ ' ' }}
          <RouterLink href="#" class="font-medium text-zinc-200 hover:text-sky-300" to="/">Login</RouterLink>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="register" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" v-model="App.email" required="" class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" v-model="App.password" required="" class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
          </div>
        </div>

        
        <div>
          <button @click="App.register(App.email,App.password)" class="group relative flex w-full justify-center rounded-md border border-transparent bg-sky-500 py-2 px-4 text-sm font-medium text-white hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 drop-shadow-lg">
            Register
        </button>
        </div>
      </form>
    </div>
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