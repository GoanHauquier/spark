<template>
    <div class="wrapper"> <!-- Main wrapper -->
        <div class="top-wrapper"> <!-- Top wrapper -->
            <Header />
            <router-view />
        </div>
        <Footer />
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {db} from '../main'; 

import Header from './Header';
import Footer from './Footer';

    export default {
        components: {
            Header,
            Footer
        },
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
            if (user) {
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
            }

            // Fetch the current user's ID from Firebase Authentication.
            const uid = firebase.auth().currentUser.uid;

            // Create a reference to this user's specific status node.
            // This is where we will store data about being online/offline.
            const userStatusDatabaseRef = firebase.database().ref('/status/' + uid);

            // We'll create two constants which we will write to 
            // the Realtime database when this device is offline
            // or online.
            const isOfflineForDatabase = {
                state: 'offline',
                last_changed: firebase.database.ServerValue.TIMESTAMP,
                id: uid
            };

            const isOnlineForDatabase = {
                state: 'online',
                last_changed: firebase.database.ServerValue.TIMESTAMP,
                id: uid
            };

            // Create a reference to the special '.info/connected' path in 
            // Realtime Database. This path returns `true` when connected
            // and `false` when disconnected.
            firebase.database().ref('.info/connected').on('value', function(snapshot) {
                // If we're not currently connected, don't do anything.
                if (snapshot.val() == false) {
                    return;
                }

                // If we are currently connected, then use the 'onDisconnect()' 
                // method to add a set which will only trigger once this 
                // client has disconnected by closing the app, 
                // losing internet, or any other means.
                userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
                    // The promise returned from .onDisconnect().set() will
                    // resolve as soon as the server acknowledges the onDisconnect() 

                    // We can now safely set ourselves as 'online' knowing that the
                    // server will mark us as offline once we lose connection.
                    userStatusDatabaseRef.set(isOnlineForDatabase);
                });
            });
        },
    }
</script>