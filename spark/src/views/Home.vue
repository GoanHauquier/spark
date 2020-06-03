<template>
  <div class="home">
    <h1>Welcome {{ user.username }}</h1>
    {{ user.username }}
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return {
      cUser: []
    }
  },
  props: [
    'cUserData'
  ],
  created () {
    this.$store.dispatch('fetchUserData');
  },
  computed: {
    user () {
        return this.$store.getters.user;
      }
  },
}
</script>
