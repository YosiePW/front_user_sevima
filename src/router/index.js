import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Navbar from '../views/layouts/Navbar.vue'
import Footer from '../views/layouts/Footer.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import DataCovid from '../views/DataCovid.vue'
import DataRS from '../views/DataRS.vue'
import GetVaksin from '../views/GetVaksin.vue'
import Vaksin from '../views/Vaksin.vue'


Vue.use(VueRouter)


const routes = [
  {
    path: '/register',
    name: 'register',
    components: {default: Register},
  },
  {
    path: '/login',
    name: 'login',
    components: {default: Login},
  },
  {
    path: '/',
    name: 'home',
    components: {default: Home, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/datacovid',
    name: 'datacovid',
    components: {default: DataCovid, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/datars',
    name: 'datars',
    components: {default: DataRS, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/get',
    name: 'get',
    components: {default: GetVaksin, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/vaksin',
    name: 'vaksin',
    components: {default: Vaksin, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
