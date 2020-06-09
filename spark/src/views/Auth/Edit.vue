<template>
    <div class="container">
        <div>
            Username: 
            <input type="text" :value="cUserData.cUsername" ref="usernameInput"><br>
            Bio: 
            <input type="text" :value="cUserData.cBio" ref="bioInput">
            <br>
            <input type="text" :value="cUserData.cBio" ref="bioInput"><br>
            <input type="text" :value="cUserData.cBio" ref="bioInput"><br>
            <input type="text" :value="cUserData.cBio" ref="bioInput"><br>
            <img :src="cUserData.cPicture" ref="myImg"><br>
            <input type="file" @change="getFile()" ref="myFile">
            <button v-show="hasFile" @click="editPicture()">Save img</button>
            <br>
            <input type="file" @change="getAudio()" ref="myAudio">
            <button v-show="hasAudio" @click="editAudio()">Save img</button>
            <br>
            <button @click="editProfile()">Save</button>
            <button><router-link to='/profile'>Cancel</router-link></button>
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
                    links: {
                        previewId: '',
                        soundcloud: '',
                        youtube: '',
                        facebook: '',
                    }
                },
                file: {},
                hasFile: false,
                audio: {},
                hasAudio: false,
                user: {}
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
            })
        },
        methods: {
            getFile() {
                // get the uploaded file
                this.file = this.$refs.myFile.files[0];
                this.hasFile = true;
            },
            getAudio() {
                // get the uploaded file
                this.audio = this.$refs.myAudio.files[0];
                this.hasAudio = true;
            },
            editPicture() {
                const user = this.user;

                // make new storage record uniquely for the user and add the uploaded file
                const storageRef = firebase.storage().ref('users/' + this.user.uid + '/profile' + Date.now().toString() + '.jpg');
                console.log(storageRef);

                if (this.file) {
                    // create new path in storage
                    storageRef.put(this.file).then(function() {
                        const id = user.uid;
                        console.log('Uploaded!');
                        storageRef.getDownloadURL().then(imgUrl => {
                            console.log(imgUrl);
                            // set firestore data equal to new data
                            db.collection("users").doc(id).update({
                                picture: imgUrl,
                            }); 
                        })
                    });
                    this.hasFile = false;
                }
            },
            editAudio() {
                const user = this.user;

                // make new storage record uniquely for the user and add the uploaded file
                const storageRef = firebase.storage().ref('audio/' + this.user.uid + '/audio.mp3');
                console.log(storageRef);

                if (this.audio) {
                    // create new path in storage
                    storageRef.put(this.audio).then(function() {
                        const id = user.uid;
                        console.log('Uploaded!');
                        storageRef.getDownloadURL().then(audioURL => {
                            console.log(audioURL);
                            // set firestore data equal to new data
                            db.collection("users").doc(id).update({
                                audio: audioURL,
                            }); 
                        })
                    });
                    this.hasAudio = false;
                }
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

                    this.$router.replace({ name: 'Profile' });
                }
                else {
                    alert('error');
                }
                
            },
        },
        
    }
</script>