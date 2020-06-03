<template>
    <div>
        <div>
            <img :src="user.picture"><br>
            {{ user.username }} <br>
            {{ user.bio }} <br>
            <div v-if="user.isAdmin == false">You're not an admin</div>
            <div v-else>Welcome admin</div>
            <button><router-link to='/edit'>Edit profile</router-link></button>
        </div>
    </div>
</template>

<script>
    export default {
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
