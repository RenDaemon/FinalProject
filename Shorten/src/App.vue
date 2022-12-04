<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Login from './views/Login.vue'

</script>

<template>
  <header>

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Login</RouterLink>
        <RouterLink to="/Dashboard">Dashboard</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

