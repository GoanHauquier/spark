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
        <div v-if="user.audio">
            <mini-audio        
                :html5="true"
                :src="user.audio"
            >
            </mini-audio >
        </div>
        <div v-else>Upload an mp3</div>
        <div class="socials">
            <h2>Socials</h2>
            <div v-show="links.soundcloud.link != ''" :class="links.soundcloud.class">Soundcloud</div>
            <div v-show="links.spotify.link != ''" :class="links.spotify.class">Spotify</div>
            <div v-show="links.facebook.link != ''" :class="links.facebook.class">Facebook</div>
            <div v-show="links.instagram.link != ''" :class="links.instagram.class">Instagram</div>
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
                userVerified: false,
                links: {
                    soundcloud: '',
                    spotify: '',
                    facebook: '',
                    instagram: ''
                }
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

            db.collection('users')
            .doc(id)
            .get()
            .then(snapshot => {
                const document = snapshot.data();
                
                this.links.soundcloud = document.links.soundcloud;
                this.links.spotify = document.links.spotify;
                this.links.facebook = document.links.facebook;
                this.links.instagram = document.links.instagram;
            })
            
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
                    error;
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
