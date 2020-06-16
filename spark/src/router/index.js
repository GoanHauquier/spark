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
import Error404 from '../views/Error404.vue'
import Privacy from '../views/Privacy.vue'

import Burger from '../components/Burger.vue'

import * as firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home - Spark',
      metaTags: [
        {
          name: 'Home',
          content: "Spark's homepage"
        },
        {
          property: 'og:description',
          content: "Spark's homepage"
        }
      ]
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'About - Spark',
      metaTags: [
        {
          name: 'About',
          content: "Spark's about page"
        },
        {
          property: 'og:description',
          content: "Spark's about page"
        }
      ]
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login - Spark',
      metaTags: [
        {
          name: 'Login',
          content: "Login to Spark"
        },
        {
          property: 'og:description',
          content: "Login to Spark"
        }
      ]
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register - Spark',
      metaTags: [
        {
          name: 'Register',
          content: "Register to Spark"
        },
        {
          property: 'og:description',
          content: "Register to Spark"
        }
      ]
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    // routeguard data
    meta: {
      title: 'Profile - Spark',
      metaTags: [
        {
          Authenticated: true
        },
        {
          name: 'Profile',
          content: "Your Sparkprofile"
        },
        {
          property: 'og:description',
          content: "Your Sparkprofile"
        }
      ]
    }
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit,
    // routeguard data
    meta: {
      title: 'Edit - Spark',
      metaTags: [
        {
          Authenticated: true
        },
        {
          name: 'Edit',
          content: "Edit your profile"
        },
        {
          property: 'og:description',
          content: "Edit your profile"
        }
      ]
    }
  },
  {
    path: '/test',
    name: 'Authtest',
    component: Authtest,
    // routeguard data
    meta: {
      title: 'Edit - Spark',
      metaTags: [
        {
          Authenticated: true
        },
        {
          name: 'Edit',
          content: "Edit your profile"
        },
        {
          property: 'og:description',
          content: "Edit your profile"
        }
      ]
    }
  },
  {
    path: '/test',
    name: 'Matching',
    component: Matching,
    // routeguard data
    meta: {
      title: 'Edit - Spark',
      metaTags: [
        {
          Authenticated: true
        },
        {
          name: 'Edit',
          content: "Edit your profile"
        },
        {
          property: 'og:description',
          content: "Edit your profile"
        }
      ]
    }
  },
  {
    path: '/spark',
    name: 'Testing',
    component: Testing,
    // routeguard data
    meta: {
      title: 'Spark',
      metaTags: [
        {
          Authenticated: true
        },
        {
          name: 'Spark',
          content: "Find you Sparks"
        },
        {
          property: 'og:description',
          content: "Find you Sparks"
        }
      ]
    }
  },
  {
    path: '/profile/:id',
    name: 'Friend',
    component: Friendpage,
    // routeguard data
    meta: {
      title: "A Sparkling profile",
      metaTags: [
        {
          Authenticated: true
        },
        {
          name: "A Spark's profile",
          content: "Check your Spark's profile"
        },
        {
          property: 'og:description',
          content: "Check your Spark's profile"
        }
      ]
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    // routeguard data
    meta: {
      title: "Admin",
      metaTags: [
        {
          Authenticated: true
        },
        {
          name: "Admin",
          content: "Check your Spark's profile"
        },
        {
          property: 'og:description',
          content: "Admin"
        }
      ]
    }
  },
  {
    path: '/resetpassword',
    name: 'Reset',
    component: ForgotPassword,
    meta: {
      title: 'Reset',
      metaTags: [
        {
          name: 'Reset',
          content: "Reset your password"
        },
        {
          property: 'og:description',
          content: "Reset your password"
        }
      ]
    }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Burger,
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy,
    meta: {
      title: 'Privacy',
      metaTags: [
        {
          name: 'Privacy',
          content: "Cookie policy"
        },
        {
          property: 'og:description',
          content: "Cookie policy"
        }
      ]
    }
  },
  {
    path: '*',
    name: '404',
    component: Error404,
    meta: {
      title: '404',
      metaTags: [
        {
          name: '404',
          content: "This page was not found"
        },
        {
          property: 'og:description',
          content: "This page was not found"
        }
      ]
    }
  },
  
];


const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: function (to) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  },
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
