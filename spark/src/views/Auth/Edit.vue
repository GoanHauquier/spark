<template>
    <div class="form-wrapper container-fluid">
        <div class="edit form container profile">
            <div class="row">
                <div class="text-left col-6">
                    <h3>Edit profile</h3>
                </div>
                <div class="text-right col-6">
                    <a><router-link to='/profile'><Back class="back" /></router-link></a>
                </div>
            </div>

            <img class="picture" :src="cUserData.cPicture" ref="myImg">

            <div class="row edittop">
                <div class="col-sm-6">
                    <p class="text-left" style="font-weight:bold;">Picture (1MB Max)</p>

                    <div class="file-upload">
                        <label for="avatar" class="file-upload__label">Upload new picture</label>
                        <input id="avatar" class="file-upload__input" @change="getFile()" type="file" ref="myFile" name="file-upload">
                    </div>
                    <div class="progressbar">
                        <div class="status" ref="uploadbarimage"></div>
                    </div>                    
                </div>

                <div class="col-sm-6">
                    <p class="text-left" style="font-weight:bold;">Audio (1MB Max)</p>
                    <div class="file-upload">
                        <label for="upload" class="file-upload__label">Upload audiofile</label>
                        <input id="upload" class="file-upload__input" @change="getAudio()" type="file" ref="myAudio" name="file-upload">
                    </div>
                    <div class="progressbar">
                        <div class="status" ref="uploadbaraudio"></div>
                    </div>

                </div>

            </div>

            <hr>
            
            <div class="row editbottom">
                <div class="col-sm-6">
                    <p class="text-left" style="font-weight:bold;">Username</p>
                    <input type="text" :value="cUserData.cUsername" maxlength="20" class="inputfield inputedit" ref="usernameInput">

                    <p class="text-left" style="font-weight:bold;">Bio</p>
                    <textarea :value="cUserData.cBio" ref="bioInput" maxlength="255" placeholder="My bio"></textarea>
                </div>
                
                <div class="col-sm-6">
                    <p class="text-left" style="font-weight:bold;">Socials</p>
                    <input type="text" :value="cUserData.cLinks.soundcloud" placeholder="Soundcloud" ref="soundcloudInput" class="inputfield inputedit">
                    <input type="text" :value="cUserData.cLinks.spotify" placeholder="Spotify" ref="spotifyInput" class="inputfield inputedit">
                    <input type="text" :value="cUserData.cLinks.facebook" placeholder="Facebook" ref="facebookInput" class="inputfield inputedit">
                    <input type="text" :value="cUserData.cLinks.instagram" placeholder="Instagram" ref="instagramInput" class="inputfield inputedit">
                    <br>
                    <div class="text-right">
                        <a><input class="formbutton formbuttonsmall" type="submit" value="Save" @click="editProfile()"></a>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {db} from '../../main';

import Back from '../../assets/SVG/exit.svg';

    export default {
        components: {
            Back,
        },
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
                cUser: {},
                progressUpload: 0,
                uploadTask: '',
                uploading: false
            }
        },
        created () {
            // fetch user data
            this.cUser = firebase.auth().currentUser;
            this.id = this.cUser.uid;
            this.id = this.id.toString();

            this.$store.dispatch('fetchUserData');

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
        watch: {
            uploadTask: function() {
                this.uploadTask.on('state_changed', sp => {
                    this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100);
                    console.log(this.progressUpload);
                })
                
            }
        },
        methods: {
            uploadImage() {
                const elem = this.$refs.uploadbarimage;
                let width = this.progressUpload;  
                
                const id = setInterval(frame, 10);
                function frame() {
                    if (width >= 100) {
                        clearInterval(id);
                        elem.style.width = 0;
                    } else {
                        width++; 
                        elem.style.width = width + '%'; 
                    }
                }
            },
            uploadAudio() {
                const elem = this.$refs.uploadbaraudio;
                let width = this.progressUpload;  
                
                const id = setInterval(frame, 10);
                function frame() {
                    if (width >= 100) {
                        clearInterval(id);
                        elem.style.width = 0;
                    } else {
                        width++; 
                        elem.style.width = width + '%'; 
                    }
                }
            },
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
                const user = this.cUser;
                this.uploadImage();

                // make new storage record uniquely for the user and add the uploaded file
                const storageRef = firebase.storage().ref('users/' + this.cUser.uid + '/profile' + Date.now().toString() + '.jpg');

                if (this.file && this.file.size < 1024 * 1024) {

                    this.uploadTask = storageRef.put(this.file);
                    // create new path in storage
                    this.uploadTask.then(e => {
                        e;
                        const id = user.uid;
                        console.log('Uploaded!');
                        storageRef.getDownloadURL().then(imgUrl => {
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
                const user = this.cUser;
                this.uploadAudio();

                // make new storage record uniquely for the user and add the uploaded file
                const storageRef = firebase.storage().ref('audio/' + this.cUser.uid + '/audio.mp3');

                if (this.audio && this.audio.size < 1024 * 1024) {

                    this.uploadTask = storageRef.put(this.audio);
                    // create new path in storage
                    this.uploadTask.then(e => {
                        const id = user.uid;
                        e;
                        console.log('Uploaded!');
                        storageRef.getDownloadURL().then(audioURL => {
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
                .doc(this.cUser.uid)
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
                    this.saved();
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
                });
            },
            imageError () {
                this.$notify({
                    message: 'File is not an image!',
                    top: true,
                    right: true,
                    type: 'warning',
                });
            },
            audioError () {
                this.$notify({
                    message: 'File is not an mp3!',
                    top: true,
                    right: true,
                    type: 'warning',
                });
            },
            fileUploaded() {
                this.$notify({
                    message: 'File uploaded!',
                    top: true,
                    right: true,
                    type: 'success',
                });
            },
            saved () {
                this.$notify({
                    message: 'Saved!',
                    top: true,
                    right: true,
                    type: 'success',
                });
            },
        },
        user () {
             return this.$store.getters.user;
        }
        
    }
</script>