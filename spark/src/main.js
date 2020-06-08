import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import firebase from 'firebase/app'
import { firestorePlugin } from 'vuefire'
import { BootstrapVue } from 'bootstrap-vue'
import './assets/scss/application.scss';

import config from './config'

Vue.use(firestorePlugin)
Vue.use(BootstrapVue)

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseURL,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
  measurementId: config.firebase.measurementId
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export const db = firebase
  .firestore()
// firebase.analytics();

let app;

// check if user is logged in before app is built
// to prevent weird route behaviour
firebase.auth().onAuthStateChanged(user=> {
  console.log(user);
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
