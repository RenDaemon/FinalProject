<template>
    <div class="container">
        <form @submit.prevent="login">
            <h2>Login</h2>
            <div class="input">
                <label for="email">Email Adress</label>
                <input
                class="form-control" 
                type="text" 
                name="email" 
                placeholder="email@adress.com"
                />
            </div>
            <div class="input">
                <label for="password">Password</label>
                <input
                class="form-control" 
                type="text" 
                name="password" 
                placeholder="******"
                />
            </div>
        <div >
            Don't Have an Account? <RouterLink to="/Register">Register</RouterLink> 
        </div>
        <button type="submit" id="login_button">
            Login
        </button>
        </form>
    </div>
</template>

<script>
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
  }
</script>
