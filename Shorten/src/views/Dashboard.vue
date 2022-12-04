<template>
  <div>
    <div >Hello</div>
    <div id="username_display" class="display-6">{{ this.email }}</div>
    <button id="sign_out" class="mt-4 btn btn-danger" @click="signOut">
      Logout
    </button>
  </div>
</template>

<script>
  import {useApp} from '../stores/index';
  export default {
    data() {
        return {
            email: auth.currentUser.email,
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
