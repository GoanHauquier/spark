<template>
    <div class="row header">
        <div class="text-left col-6">
            <router-link to="/">
                <h3 class="home-title">SPARK</h3>
            </router-link>
        </div>
        <div class="text-right col-6 desktop-nav">
            
            <span v-if="loggedIn">
                <router-link v-show="user.audio" to="/spark" class="start registration">START</router-link>
                <router-link to="/about" class="other">ABOUT</router-link>
                <router-link to="/profile" v-bind:class="[{ 'hasNotifications': isActive} , 'registration' ]">{{ user.username }}</router-link>
                <a @click="signOut()" class="signout">SIGN OUT</a>
            </span>
            <span v-else>
                <router-link to="/about" class="about">About</router-link>
                <router-link to="/login" class="registration">Login</router-link>
                <router-link to="/register" class="registration">Register</router-link> 
            </span>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import'firebase/database';

    export default {
        data() {
            return {
                loggedIn: false,
                activeClass: 'hasNotifications',
                isActive: false,
                id: '',
            }
        },
        created () {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.loggedIn = true;
                    this.$store.dispatch('fetchUserData');
                    this.id = firebase.auth().currentUser.uid;

                    firebase.database().ref('status/' + this.id).on('value', snapshot => {
                        if (snapshot.val().hasNotification) {
                            this.isActive = true;
                        }
                        else {
                            this.isActive = false;
                        }
                    });
                }
                else {
                    this.loggedIn = false;
                }
            });
        },
        methods: {
            // removeNotifications() {
            //     console.log('remove');
            //     firebase.database()
            //     .ref('status/' + this.id)
            //     .update({
            //         hasNotification: false
            //     });
            //     this.isActive = false;
            // }
            async signOut() {
                try {
                    const data = await firebase.auth().signOut();
                    console.log('signed out', data);
                    // reset the vuex state
                    this.$store.dispatch('resetCurrentState');
                    this.$router.replace({name: 'Login'});
                }
                catch(err) {
                    console.log(err);
                }
            },
        },
        computed: {
            user () {
                return this.$store.getters.user;
            }
        },
    }
</script>