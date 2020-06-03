<template>
    <div class="row">
        <div class="text-left col-6">
            <router-link to="/">
                <h3 class="home-title">SPARK</h3>
            </router-link>
        </div>
        <div class="text-right col-6">
            <router-link to="/about">About</router-link> |
            <span v-if="!loggedIn">
                <router-link to="/login">Login</router-link> |
                <router-link to="/register">Register</router-link> |
            </span>
            <span v-else>
                <button @click="dropdown()" class="dropbtn">{{ user.username }}</button>
                <div id="myDropdown" class="dropdown-content">
                    <router-link to="/profile">Profile</router-link>
                    <Authlog />
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

import Authlog from '../components/Testwidgets/Authlog';

    export default {
        components: {
            Authlog,
        },
        data() {
            return {
                loggedIn: false
            }
        },
        created () {
            firebase.auth().onAuthStateChanged(user=> {
                if (user) {
                    this.loggedIn = true;
                }
                else {
                    this.loggedIn = false;
                }
            });
            this.$store.dispatch('fetchUserData');
        },
        computed: {
            user () {
                return this.$store.getters.user;
            }
        },
        methods: {
            dropdown() {
                console.log('pressed');
            }
        },
    }
</script>