<template>
<div>
    <div class="header-wrapper container-fluid">

        <div class="row">
                <div class="text-left header col-6 left text">
                    <router-link to="/">
                        <!-- <h3 class="home-title">SPARK</h3> -->
                        <Spark class="svg text" />
                    </router-link>
                </div>
                <div class="text-left header col-3 left logo">
                    <router-link to="/">
                        <!-- <h3 class="home-title">SPARK</h3> -->
                        <Logo class="svg logo" />
                    </router-link>
                </div>

                <div class="text-right desktop-nav col-6 header right">
                    <span v-if="loggedIn">
                        <router-link v-show="user.audio" to="/spark" class="start registration nav">QUEUE</router-link>
                        <router-link to="/about" class="about nav">ABOUT</router-link>
                        <router-link to="/profile" v-bind:class="[{ 'hasNotifications': isActive} , 'registration', 'usericon', 'nav' ]"><User /></router-link>
                        <a @click="signOut()" class="signout nav">SIGN OUT</a>
                    </span>
                    <span v-else>
                        <router-link to="/about" class="about nav">About</router-link>
                        <router-link to="/login" class="registration nav">Login</router-link>
                        <router-link to="/register" class="registration nav">Register</router-link> 
                    </span>
                </div>
        </div>    
    </div>
</div>
    
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import'firebase/database';

import Spark from '../assets/SVG/logo/spark-text.svg';
import Logo from '../assets/SVG/logo/logo.svg';
import User from '../assets/SVG/user.svg';


    export default {
        components: {
            Spark,
            Logo,
            User,
        },
        data() {
            return {
                loggedIn: false,
                activeClass: 'hasNotifications',
                isActive: false,
                id: '',
                size: {
                    width: 48,
                    height: 48
                },
                burgerActive: false
            }
        },
        created () {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.loggedIn = true;
                    this.$store.dispatch('fetchUserData');
                    this.id = firebase.auth().currentUser.uid;

                    firebase.database().ref('status/' + this.id).on('value', snapshot => {
                        if (snapshot.val() != null) {
                            if (snapshot.val().hasNotification) {
                                this.isActive = true;
                            }
                            else {
                                this.isActive = false;
                            }
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

<style lang="scss">
.text {
    transition: 0.2s ease;

    &:hover {
        stroke-dasharray: 50;
        animation: dash 4s infinite;
        transform: scale(1.02);
    }

}
@keyframes dash {
    to {
        stroke-dashoffset: 100;
    }
}

.logo {
    &:hover {
        animation: logo 0.2s ease-out;
    }
}
@keyframes logo {
    60% {
        transform: translateX(3px) translateY(-3px);
    }
    100% {
        transform: translateX(0) translateY(0);
    }
}
</style>