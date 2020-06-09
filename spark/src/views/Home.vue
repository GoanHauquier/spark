<template>
  <div class="home">
    <h1 v-if="currentUser">Welcome {{ user.username }}</h1>
    <h1 v-else>Welcome to Spark</h1>
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
