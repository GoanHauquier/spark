<template>
    <div class="profile">
        <div v-if="!userVerified">
            Verification email sent
            <br>
            <button @click="sendVerificationEmail()">Send another email</button>
        </div>
        
        <div v-else class="profilecontent">
            <div class="text-right">
                <a><router-link to='/edit'>Edit profile</router-link></a>
            </div>
            <div class="row">
                <div class="col-md-4 col-sm-12">
                    <h1>{{ user.username }}</h1><br>
                    <p>{{ user.bio }}</p> <br>
                </div>

                <div class="col-md-4 col-sm-12">
                    <div class="col-6">
                        <img :src="user.picture"><br>
                    </div>
                    
                    <div v-if="user.audio" class="col-6 text-center">
                        <mini-audio        
                            :html5="true"
                            :src="user.audio">
                        </mini-audio >
                    </div>
                    <div v-else>Upload an mp3</div>

                </div>
                <div class="col-md-4 col-sm-12">
                    <Friends />
                </div>
            </div>
        </div>
        <div class="socials col-12 text-center row">
            <a :href="links.soundcloud.link" target="_blank" v-show="links.soundcloud.link != ''">
                <div :class="links.soundcloud.class">Soundcloud</div>
            </a>
            <a :href="links.spotify.link" target="_blank" v-show="links.spotify.link != ''">
                <div :class="links.spotify.class">Spotify</div>
            </a>
            <a :href="links.instagram.link" target="_blank" v-show="links.instagram.link != ''">
                <div :class="links.instagram.class">Instagram</div>
            </a>
            <a :href="links.facebook.link" target="_blank" v-show="links.facebook.link != ''">
                <div :class="links.facebook.class">Facebook</div>
            </a>
        </div>
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
