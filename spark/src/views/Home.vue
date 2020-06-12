<template>
  <div class="home">    
      <section>
        <div class="container">
          <div v-show="currentUser && !user.audio"><p>Remember to upload an audiofile</p></div>

          <div v-if="!currentUser" class="content row">

            <div class="col-12 home-text">
              <h1>SPARK</h1>
              <vue-typed-js :strings="['CONNECTS^2000', 'INSPIRES^2000']" :loop="true" :showCursor="true" :typeSpeed="50">
                <h1><span class="typing"></span></h1>
              </vue-typed-js>
            </div>
            <router-link to='/register' class="cta">GET STARTED</router-link>

          </div>

          <div v-else class="content row">

            <div class="col-12 home-text">
              <h1>WELCOME  {{user.username}}</h1>
            </div>
            <router-link to='/spark' class="cta">START</router-link>

          </div>
        </div>
      </section>
      <!-- <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,128L48,122.7C96,117,192,107,288,117.3C384,128,480,160,576,176C672,192,768,192,864,176C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg> -->
      <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,128L48,122.7C96,117,192,107,288,117.3C384,128,480,160,576,176C672,192,768,192,864,176C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
      <div class="row">
        <!-- <kinesis-container easing="cubic-bezier(0.9, 1, 0.9, 1)">

          <div class="illustration col-12">

            <kinesis-element :strength="12" :maxX='-40'>
              <img src="../assets/images/spark2.png" alt="" class="spark2">
            </kinesis-element>

            <kinesis-element :strength="4" :maxX='-20'>
              <img src="../assets/images/spark1.png" alt="" class="spark1">
            </kinesis-element>

          </div>

        </kinesis-container> -->

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

<style lang="scss">


</style>
