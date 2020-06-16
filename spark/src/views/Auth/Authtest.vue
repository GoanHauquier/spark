<template>
    <div class="container">
        <div>
            {{ cUserData.cUsername }} <br>
            {{ cUserData.cBio }} <br>
            <input type="text" :placeholder="cUserData.cBio" ref="bioInput"><button @click="editBio()">Edit</button>
            <div v-if="cUserData.cIsAdmin == false">You're not an admin</div>
            <div v-else>Welcome admin</div>
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
                    cIsAdmin: null,
                },
                
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
            editBio() {
                
                // set variable equal to user input
                const newBio = this.$refs.bioInput.value;
                
                // if new input exists when submitted
                if (newBio) {
                        // set firestore data equal to new data
                        db.collection("users").doc(this.id).update({
                            bio: newBio
                        }
                    );

                    this.$refs.bioInput.value = newBio;
                }
                else {
                    console.log('error');
                }
                
            }
        },
        
    }
</script>