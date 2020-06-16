<template>
    <div class="profile container-fluid border">

        <div class="container profilepanel">
            
            <div class="profilecontent container border">
                <div class="row title">
                    <div class="text-left col-12">
                        <h2>{{ userData.username }}'s profile</h2>
                    </div>
                </div>

                <div class="col-sm-12 text-center border">
                    <img :src="userData.picture" class="avatar"><br>
                </div> 

                <div class="container-fluid border">
                    <div class="row">
                        <div class="col-md-6 profileleft">
                            <div class="bio col-sm-12 border text-left">
                                <h2>{{ userData.username }}</h2>
                                <p>{{ userData.bio }}</p>
                            </div>   
                        </div>

                        <div v-if="userData.audio" class="col-md-12 text-left border audio">
                            <h3>Your audio</h3>
                            <div class="player" >
                                <mini-audio       
                                    :html5="true"
                                    :src="userData.audio"
                                    :width="300">    
                                </mini-audio >
                            </div>
                        </div>
                        <h3 class="connect">Connect with {{ userData.username }}</h3>
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
import {db} from '../../main';
import 'firebase/firestore';

    export default {
        data() {
            return {
                id: this.$route.params.id,
                userData: {
                    bio: '',
                    username: '',
                    picture: '',
                    audio: '',
                },
                links: {
                        soundcloud: '',
                        spotify: '',
                        facebook: '',
                        instagram: ''
                }
            }
        },
        created () {
            // fill array with id's of users you've already met from firestore
            db.collection('users')
            .doc(this.id)
            .get()
            .then( snap => {
                const doc = snap.data();
                this.userData.username = doc.username;
                this.userData.bio = doc.bio;
                this.userData.picture = doc.picture;
                this.userData.audio = doc.audio;

                this.links.soundcloud = doc.links.soundcloud;
                this.links.spotify = doc.links.spotify;
                this.links.facebook = doc.links.facebook;
                this.links.instagram = doc.links.instagram;
            })
        },
    }
</script> 