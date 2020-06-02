<template>
    <div>
        <div class="text-left">
            SPARK
        </div>
        <div class="text-right">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <span v-if="!user">
                <router-link to="/login">Login</router-link> |
                <router-link to="/register">Register</router-link> |
            </span>
            <span v-else>
                <button @click="dropdown()" class="dropbtn">{{ cUserData.cUsername }}</button>
                <div id="myDropdown" class="dropdown-content">
                    <router-link to="/test">Profile</router-link>
                </div>
            </span>
        </div>
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
        methods: {
            dropdown() {
                console.log('pressed');
            }
        },
    }
</script>