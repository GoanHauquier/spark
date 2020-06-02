<template>
    <div>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <span v-if="!user">
            <router-link to="/login">Login</router-link> |
            <router-link to="/register">Register</router-link> |
        </span>
        <span v-else>
            <router-link to="/test">{{ cUserData.cUsername }}</router-link>
        </span>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

    export default {
        props: [
            'cUserData'
        ],
        data() {
            return {
                user: false
            }
        },
        created () {
            const user = firebase.auth().currentUser;
            if (user) {
                this.user = true;
            }
            else {
                this.user = false;
            }
        },
    }
</script>