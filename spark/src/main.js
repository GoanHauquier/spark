import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import firebase from 'firebase/app'
import { firestorePlugin } from 'vuefire'
import { BootstrapVue } from 'bootstrap-vue'
import './assets/scss/application.scss'
import VueAudio from 'vue-audio-better'
import VueNotification from '@mathieustan/vue-notification'
import SvgTransition from 'vue-svg-transition'
import VueKinesis from 'vue-kinesis'
import VueTypedJs from 'vue-typed-js'
import VueAnimate from 'vue-animate-scroll'
import VTooltip from 'v-tooltip'
 
// firebase credentials
import config from './config'

Vue.use(VTooltip)
Vue.use(VueAnimate)
Vue.use(VueTypedJs)
Vue.use(VueKinesis)
Vue.use(SvgTransition)
Vue.use(VueNotification, {
  theme: {
    // darken colors are used for background on icon
    colors: {
      success: '#88ebc4',
      darkenSuccess: '#2d8e36',
      info: '#eb889c',
      darkenInfo: '#535f7b',
      warning: '#d26350',
      darkenWarning: '#f69a07',
      error: '#ff4577',
      darkenError: '#ff245f',
      offline: '#ff4577',
      darkenOffline: '#ff245f',
    },
    boxShadow: '0',
  },
})
Vue.use(VueAudio)
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
  user;
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
