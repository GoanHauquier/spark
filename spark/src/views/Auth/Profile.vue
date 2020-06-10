<template>
    <div>
        <div v-if="!userVerified">
            Verification email sent
            <br>
            <button @click="sendVerificationEmail()">Send another email</button>
        </div>
        <div v-else>
            <img :src="user.picture"><br>
            {{ user.username }} <br>
            {{ user.bio }} <br>
            <div v-if="user.isAdmin == false">You're not an admin</div>
            <div v-else>Welcome admin</div>
            <button><router-link to='/edit'>Edit profile</router-link></button>
        </div>
        <Friends />
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import'firebase/database';
import 'firebase/firestore';
import {db} from '../../main';

import Friends from '../../components/Friends';

    export default {
        data() {
            return {
                myMatches: [],
                userVerified: false
            }
        },
        components: {
            Friends
        },
        created () {
            const user = firebase.auth().currentUser;
            this.userVerified = user.emailVerified;

            this.$store.dispatch('fetchUserData');

            const id = firebase.auth().currentUser.uid;
            const matches = [];

            db.collection('matches')
            .doc(id)
            .collection('myMatches')
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    if (doc.data().match != undefined) {
                        matches.push(doc.data())
                    }
                });
            })
            this.myMatches = matches;
        },
        methods: {
            sendVerificationEmail() {
                const user = firebase.auth().currentUser;
                user.sendEmailVerification().then(function() {
                    console.log('email sent');                    
                }).catch(error => {
                    console.log(error);
                });
            },
        },
        computed: {
            user () {
                return this.$store.getters.user;
            }
        },
    }
</script>
