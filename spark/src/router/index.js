import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import Authtest from '../views/Auth/Authtest.vue'
import Friendpage from '../views/Auth/Friendpage.vue'
import Profile from '../views/Auth/Profile.vue'
import ForgotPassword from '../views/Auth/ForgotPassword.vue'
import Edit from '../views/Auth/Edit.vue'
import Matching from '../views/matching/Matching.vue'
import Testing from '../views/matching/Testing.vue'
import Admin from '../views/admin/Admin.vue'
import * as firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    // routeguard data
    meta: { Authenticated: true }
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit,
    // routeguard data
    meta: { Authenticated: true }
  },
  {
    path: '/test',
    name: 'Authtest',
    component: Authtest,
    // routeguard data
    meta: { Authenticated: true }
  },
  {
    path: '/test',
    name: 'Matching',
    component: Matching,
    // routeguard data
    meta: { Authenticated: true }
  },
  {
    path: '/spark',
    name: 'Testing',
    component: Testing,
    // routeguard data
    meta: { Authenticated: true }
  },
  {
    path: '/profile/:id',
    name: 'Friend',
    component: Friendpage,
    // routeguard data
    meta: { Authenticated: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    // routeguard data
    meta: { Authenticated: true }
  },
  {
    path: '/resetpassword',
    name: 'Reset',
    component: ForgotPassword,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// routeguard
// if user exists the "Authenticated" object is set to true
router.beforeEach((to, from, next)=> {
  const Authenticated = to.matched.some(record => record.meta.Authenticated);
  const isAuthenticated = firebase.auth().currentUser;
  if(Authenticated && !isAuthenticated) {
    next('/login');
  }
  else {
    next();
  }
})

export default router
