import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from'../views/Register.vue'
import Redirect from'../views/Redirect.vue'
import Forget from'../views/Forget.vue'
import Dashboard from'../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import ("../views/Login.vue"),
    },
    {
      path: '/Register',
      name: 'Register',
      component: () => import ("../views/Register.vue")
    },
    {
      path: '/:Redirect',
      name: 'Redirect',
      component: () => import ("../views/Redirect.vue")
    },
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
