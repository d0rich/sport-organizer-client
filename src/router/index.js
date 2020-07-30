import Vue from 'vue'
import VueRouter from 'vue-router'
import Profile from '../views/Profile.vue'
import Register from '../views/account/Register.vue'
import Login from '../views/account/Login.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/profile/:login',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/account/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/account/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router