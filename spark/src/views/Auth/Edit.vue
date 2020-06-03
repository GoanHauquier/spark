<template>
    <div class="container">
        <div>
            Username: 
            <input type="text" :value="cUserData.cUsername" ref="usernameInput"><br>
            Bio: 
            <input type="text" :value="cUserData.cBio" ref="bioInput">
            <br>
            <input type="file" @change="getFile()" ref="myFile">
            <button v-show="hasFile" @click="editPicture()">Save img</button>
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
                },
                file: {},
                hasFile: false,
                
            }
        },
        created () {
            // fetch user data
            const user = firebase.auth().currentUser;
            this.id = user.uid;
            this.id = this.id.toString();

            // fetch user data from firestore
            db.collection('users')
            .doc(this.id)
            .get()
            .then(snapshot => {
                const document = snapshot.data()
                // set the userdata object to the current firestore data
                this.cUserData.cUsername = document.username;
                this.cUserData.cBio = document.bio;
                this.cUserData.cIsAdmin = document.isAdmin;
            })
        },
        methods: {
            getFile() {
                // get the uploaded file
                this.file = this.$refs.myFile.files[0];
                this.hasFile = true;
            },
            editPicture() {
                const user = firebase.auth().currentUser;

                // make new storage record uniquely for the user and add the uploaded file
                const storageRef = firebase.storage().ref('users/' + user.uid + '/profile' + Date.now().toString() + '.jpg');
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