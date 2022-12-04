<template>
    <div class="container">
        <form @submit.prevent="register">
            <h2>Register</h2>
            <div class="input">
                <label for="email">Email</label>
                <input 
                class="form-control"
                type="text"
                name="email"
                placeholder="email@adress.com"
                />
            </div>
            <label for="password">Password</label>
            <div class="input">
                <input 
                class="form-control"
                type="text"
                name="password"
                placeholder="******"
                />
            </div>

            <div>
                Already Have Account? <RouterLink to="/">Login</RouterLink>
            </div>
    <button type="submit" id="register_button" >
        Register
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
        this.App.register();
    },
  }
</script>
