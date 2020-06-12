<template>
    <div class="edit">
        <h1>Settings</h1>
        <div class="text-right">
            <a><router-link to='/profile'>Back</router-link></a>
        </div>
        <div>
            Username: 
            <input type="text" :value="cUserData.cUsername" maxlength="20" ref="usernameInput"><br>
            Bio: 
            <input type="text" :value="cUserData.cBio" ref="bioInput">
            <br>
            
            <input type="text" :value="cUserData.cLinks.soundcloud" placeholder="Soundcloud" ref="soundcloudInput">
            <input type="text" :value="cUserData.cLinks.spotify" placeholder="Spotify" ref="spotifyInput">
            <input type="text" :value="cUserData.cLinks.facebook" placeholder="Facebook" ref="facebookInput">
            <input type="text" :value="cUserData.cLinks.instagram" placeholder="Instagram" ref="instagramInput">
            <br>
            <button @click="editProfile()"><a href="/edit">Save info</a></button>
            <img :src="cUserData.cPicture" ref="myImg"><br>
            profile picture
            <input type="file" @change="getFile()" ref="myFile">
            <!-- <button v-show="hasFile" @click="editPicture()">Save img</button> -->
            <br>
            audio (max 1mb)
            <input type="file" @change="getAudio()" ref="myAudio">
            <!-- <button v-show="hasAudio" @click="editAudio()">Save audio</button> -->
            
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {db} from '../../main';

    export default {
        data() {
            return {
                id: '',
                // create userdata object
                cUserData: {
                    cUsername: '',
                    cBio: '',
                    cPicture: '',
                    cIsAdmin: null,
                    cLinks: {
                        soundcloud: '',
                        spotify: '',
                        facebook: '',
                        instagram: ''
                    },
                },
                file: {},
                hasFile: false,
                audio: {},
                hasAudio: false,
                user: {},
            }
        },
        created () {
            // fetch user data
            this.user = firebase.auth().currentUser;
            this.id = this.user.uid;
            this.id = this.id.toString();

            // fetch user data from firestore
            db.collection('users')
            .doc(this.id)
            .get()
            .then(snapshot => {
                const document = snapshot.data();
                // set the userdata object to the current firestore data
                this.cUserData.cUsername = document.username;
                this.cUserData.cBio = document.bio;
                this.cUserData.cIsAdmin = document.isAdmin;
                this.cUserData.cPicture = document.picture;

                if (document.links !== undefined) {
                    this.cUserData.cLinks.soundcloud = document.links.soundcloud.link;
                    this.cUserData.cLinks.spotify = document.links.spotify.link;
                    this.cUserData.cLinks.facebook = document.links.facebook.link;
                    this.cUserData.cLinks.instagram = document.links.instagram.link;
                }
            })
        },
        methods: {
            getFile() {
                // get the uploaded file
                this.file = this.$refs.myFile.files[0];
                this.hasFile = true;

                this.editPicture();
            },
            getAudio() {
                // get the uploaded file
                this.audio = this.$refs.myAudio.files[0];
                this.hasAudio = true;

                this.editAudio();
            },
            editPicture() {
                const user = this.user;

                // make new storage record uniquely for the user and add the uploaded file
                const storageRef = firebase.storage().ref('users/' + this.user.uid + '/profile' + Date.now().toString() + '.jpg');

                if (this.file && this.file.size < 1024 * 1024) {
                    // create new path in storage
                    storageRef.put(this.file).then(e => {
                        e;
                        const id = user.uid;
                        console.log('Uploaded!');
                        storageRef.getDownloadURL().then(imgUrl => {
                            console.log(imgUrl);
                            // set firestore data equal to new data
                            db.collection("users").doc(id).update({
                                picture: imgUrl,
                            }); 
                            this.fileUploaded();
                        })
                    }).catch(err => {
                        err;
                        this.imageError()
                    });
                    this.hasFile = false;
                }
                else {
                    this.fileError();
                }
            },
            editAudio() {
                const user = this.user;

                // make new storage record uniquely for the user and add the uploaded file
                const storageRef = firebase.storage().ref('audio/' + this.user.uid + '/audio.mp3');
                console.log(storageRef);

                if (this.audio && this.audio.size < 1024 * 1024) {
                    // create new path in storage
                    storageRef.put(this.audio).then(e => {
                        const id = user.uid;
                        e;
                        console.log('Uploaded!');
                        storageRef.getDownloadURL().then(audioURL => {
                            console.log(audioURL);
                            // set firestore data equal to new data
                            db.collection("users").doc(id).update({
                                audio: audioURL,
                            }); 
                            this.fileUploaded();
                        })
                    }).catch(err => {
                        err;
                        this.audioError()
                    });
                    this.hasAudio = false;
                }
                else {
                    this.fileError();
                }
            },
            addLinks()  {
                // set variable equal to user input
                const newSoundcloud = this.$refs.soundcloudInput.value;
                const newSpotify = this.$refs.spotifyInput.value;
                const newFacebook = this.$refs.facebookInput.value;
                const newInstagram = this.$refs.instagramInput.value;

                db.collection("users")
                .doc(this.user.uid)
                .update({
                    links: {
                        soundcloud: {
                            link: newSoundcloud,
                            class: 'soundcloud'
                        },
                        spotify: {
                            link: newSpotify,
                            class: 'spotify'
                        },
                        facebook: {
                            link: newFacebook,
                            class: 'facebook'
                        },
                        instagram: {
                            link: newInstagram,
                            class: 'instagram'
                        },
                    }
                })
            },
            editProfile() {

                // set variable equal to user input
                const newBio = this.$refs.bioInput.value;
                const newUsername = this.$refs.usernameInput.value;
                
                // if new input exists when submitted
                if (newBio || newUsername) {
                        // set firestore data equal to new data
                        db.collection("users").doc(this.id).update({
                            bio: newBio,
                            username: newUsername,
                        }
                    );
                    this.$refs.bioInput.value = newBio;
                    this.$refs.usernameInput.value = newUsername;
                    this.addLinks();
                }
                else {
                    alert('error');
                }
                
            },
            fileError () {
                this.$notify({
                    message: 'File exceeds the 1MB limit!',
                    top: true,
                    right: true,
                    type: 'warning',
                    theme: {
                        colors: {
                            warning: '#f8a623',
                        },
                    },
                });
            },
            imageError () {
                this.$notify({
                    message: 'File is not an image!',
                    top: true,
                    right: true,
                    type: 'warning',
                    theme: {
                        colors: {
                            warning: '#f8a623',
                        },
                    },
                });
            },
            audioError () {
                this.$notify({
                    message: 'File is not an mp3!',
                    top: true,
                    right: true,
                    type: 'warning',
                    theme: {
                        colors: {
                            warning: '#f8a623',
                        },
                    },
                });
            },
            fileUploaded() {
                this.$notify({
                    message: 'File uploaded!',
                    top: true,
                    right: true,
                    type: 'succes',
                    theme: {
                        colors: {
                            succes: '#fofofo',
                        },
                    },
                });
            }
        },
        
    }
</script>