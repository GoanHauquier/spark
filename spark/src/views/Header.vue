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
                <div id="myDropdown" class="dropdown-content">
                    <router-link to="/profile">{{ user.username }}</router-link><br>
                    <router-link v-show="user.audio" to="/spark">Spark Queue</router-link>
                    <Authlog />
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import'firebase/database';

import Authlog from '../components/Testwidgets/Authlog';

    export default {
        components: {
            Authlog,
        },
        data() {
            return {
                loggedIn: false,
            }
        },
        created () {
            // const id = firebase.auth().currentUser.uid;
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.loggedIn = true;
                    this.$store.dispatch('fetchUserData');
                }
                else {
                    this.loggedIn = false;
                }
            });
            // new match = set notification to true in realtime database
            // firebase.database().ref('status/' + id).on('value', snapshot => {
            //     if (!snapshot.val().notification) {
            //         this.profileButton = 'Profile';
            //     }
            //     else {
            //         this.profileButton = 'Profile*';
            //     }
            // });
        },
        computed: {
            user () {
                return this.$store.getters.user;
            }
        },
        methods: {
            dropdown() {
                console.log('pressed');
            },
        },
    }
</script>