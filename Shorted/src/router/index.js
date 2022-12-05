import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from'../views/Register.vue'
import Reset from'../views/Reset.vue'
import Forget from'../views/Forget.vue'
import Dashboard from'../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    // {
    //   path: '/Reset',
    //   name: 'Reset',
    //   component: Reset
    // },
    // {
    //   path: '/Forget',
    //   name: 'Forget',
    //   component: Forget
    // },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
  ]
})

export default router
