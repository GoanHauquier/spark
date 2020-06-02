<template>
    <div>
        <span v-if="loggedIn">Logged in </span>
        <span v-else>Logged out</span>
        <button @click='signOut'>Sign out</button>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// import {db} from '../../main';

    export default {
        data() {
            return {
                loggedIn: false,
            }
        },
        methods: {
            async signOut() {
                try {
                    const data = await firebase.auth().signOut();
                    console.log('signed out', data);
                    this.$router.replace({name: 'Login'});
                }
                catch(err) {
                    console.log(err);
                }
            },
        },  
        created () {
            // check if user is logged in
            firebase.auth().onAuthStateChanged(user=> {
                if (user) {
                    this.loggedIn = true;
                }
                else {
                    this.loggedIn = false;
                }
            });
        },
    }
</script>
