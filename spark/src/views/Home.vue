<template>
  <div class="home">
      <div v-show="currentUser && !user.audio"><p>Remember to upload an audiofile</p></div>
      <div class="row">
        <kinesis-container easing="cubic-bezier(0.9, 1, 0.9, 1)">

          <div class="illustration col-12">

            <kinesis-element :strength="12" :maxX='-40'>
              <img src="../assets/images/spark2.png" alt="" class="spark2">
            </kinesis-element>

            <kinesis-element :strength="4" :maxX='-20'>
              <img src="../assets/images/spark1.png" alt="" class="spark1">
            </kinesis-element>

          </div>

        </kinesis-container>
        <div class="content col-11 text-right">
          <h1>SPARK</h1>
          <h3>Let's light a fire</h3>
          <router-link to='/register'>Get Started</router-link>
        </div>
      </div>
  </div>
</template>

<script>
import * as firebase from 'firebase/app';

export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return {
      currentUser: false,
    }
  },
  props: [
    'cUserData'
  ],
  created () {
    const active = firebase.auth().currentUser;
    if (active) {
      this.currentUser = true;
      this.$store.dispatch('fetchUserData');
    }
  },
  computed: {
    user () {
      return this.$store.getters.user;
    }
  },
}
</script>
