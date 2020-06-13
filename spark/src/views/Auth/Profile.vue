<template>
    <div class="profile container-fluid border">

        <div class="container profilepanel">
            <div v-if="!userVerified" class="col-12 unverified border">
                <h2>Verification email sent</h2><br>
                <p>We sent you an email to confirm your email</p>
                <p>Please confirm your email to continue</p>
                <br>
                <br>
                <a class="button" @click="sendVerificationEmail()">Send new email</a><br><br><br>
                <router-link to="/">Back</router-link>
            </div>
            
            <div v-else class="profilecontent container border">
                <div class="row title">
                    <div class="text-left col-6">
                        <h3>Profile</h3>
                    </div>
                    <div class="text-right editbutton col-6">
                        <a><router-link to='/edit'><Settings class="edit" /></router-link></a>
                    </div>
                </div>

                <div class="col-sm-12 text-center border">
                    <img :src="user.picture" class="avatar"><br>
                </div> 

                <div class="container-fluid border">
                    <div class="row">
                        <div class="col-md-6 profileleft">
                            <div class="bio col-sm-12 border text-left">
                                <h2>{{ user.username }}</h2>
                                <p>{{ user.bio }}</p>
                            </div>   
                        </div>

                        <Friends class="col-md-6 border friendwidget" />

                        <div v-if="user.audio" class="col-md-12 text-left border audio">
                            <h3>Your audio</h3>
                            <div class="player" >
                                <mini-audio       
                                    :html5="true"
                                    :src="user.audio"
                                    :width="300">    
                                </mini-audio >
                            </div>
                        </div>
                        <div v-else class="col-md-12 text-left">

                            <router-link to="/edit">
                                <h3 class="uploadaudio">
                                    Upload an mp3 file
                                </h3>
                            </router-link>

                    </div>
                        <div class="socials col-md-12 text-center row border">
                            
                            <a :href="links.soundcloud.link" target="_blank" v-show="links.soundcloud.link != ''">
                                <div :class="links.soundcloud.class"><img src="../../assets/images/socials/soundcloud.png" alt="soundcloud logo"></div>
                            </a>
                            <a :href="links.spotify.link" target="_blank" v-show="links.spotify.link != ''">
                                <div :class="links.spotify.class"><img src="../../assets/images/socials/spotify.png" alt="spotify logo"></div>
                            </a>
                            <a :href="links.instagram.link" target="_blank" v-show="links.instagram.link != ''">
                                <div :class="links.instagram.class"><img src="../../assets/images/socials/instagram.png" alt="instagram logo"></div>
                            </a>
                            <a :href="links.facebook.link" target="_blank" v-show="links.facebook.link != ''">
                                <div :class="links.facebook.class"><img src="../../assets/images/socials/facebook.png" alt="facebook logo"></div>
                            </a>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import'firebase/database';
import 'firebase/firestore';
import {db} from '../../main';

import Friends from '../../components/Friends';

import Settings from '../../assets/SVG/settings.svg';

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
            Friends,
            Settings,
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
