import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import firebase from 'firebase/app'

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfH_x4DL7ipsEZ0s1qIeJ1aI7df_5ZHvE",
  authDomain: "spark-a6f3f.firebaseapp.com",
  databaseURL: "https://spark-a6f3f.firebaseio.com",
  projectId: "spark-a6f3f",
  storageBucket: "spark-a6f3f.appspot.com",
  messagingSenderId: "123726967246",
  appId: "1:123726967246:web:aa634ede9a1e98651c7b9f",
  measurementId: "G-BC683SF45H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
