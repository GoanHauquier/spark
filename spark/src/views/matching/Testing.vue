<template>
    <div>
        <div v-if="started">
            <Matching
                :potentialMatches="usersData"
                :arrayLength="arrayLength"
                :noUsers="noUsers"
                @clicked="emptyArray"
            /> 
        </div>  
        <div v-else>
            <button @click="getPotentialMatches()">Start</button>
        </div>  
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import'firebase/database';
import 'firebase/firestore';
import {db} from '../../main';

import Matching from './Matching';

    export default {
        components: {
            Matching,
        },
        data() {
            return {
                userList: [],
                usersData: [],
                started: false,
                arrayLength: 0,
                noUsers: false
            }
        },
        created () {
            // check for online users
            this.loading = true;
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
            };

            const isOnlineForDatabase = {
                state: 'online',
                last_changed: firebase.database.ServerValue.TIMESTAMP,
            };

            const setData = {
                id: uid,
            }

            userStatusDatabaseRef.update(setData);

            firebase.database().ref('status').once('value', snapshot => {
                snapshot.forEach(el => {
                    if (el.val().id == undefined) {
                        firebase.database().ref('status/' + el.key).remove();
                    }
                })
            });
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
                userStatusDatabaseRef.onDisconnect().update(isOfflineForDatabase).then(function() {
                    // The promise returned from .onDisconnect().set() will
                    // resolve as soon as the server acknowledges the onDisconnect() 

                    // We can now safely set ourselves as 'online' knowing that the
                    // server will mark us as offline once we lose connection.
                    userStatusDatabaseRef.update(isOnlineForDatabase);
                });
            });
        },
        methods: {
            getPotentialMatches() {
                const uid = firebase.auth().currentUser.uid;
                // get users from database based on when they last logged in
                firebase.database().ref('status').orderByChild('last_changed').limitToLast(50).once('value', snapshot => {

                    // initialize arrays
                    const metUsers = [];
                    this.noUsers = false;

                        console.log('looking for potential matches');

                        // fill array with id's of users you've already met from firestore
                        db.collection('matches')
                        .doc(uid)
                        .collection('usersMet')
                        .get()
                        .then( snap => {
                            snap.forEach(el => {
                                metUsers.push(el.id);
                            });

                            console.log('filling list');

                            // fill array with users you've not met based on the previous array
                            snapshot.forEach(el => {
                            if (metUsers.includes(el.val().id) || el.val().id == uid) {
                                console.log('user met');
                            }
                            else {
                                if (this.userList.length != 10) {
                                    this.userList.push(el.val().id);
                                }
                                else {
                                    return this.userList;
                                }
                            }
                        });
                        console.log('getting users data');

                        // fill a new array with data objects from the selected users
                        this.userList.forEach(doc => {
                            db.collection('users')
                            .doc(doc)
                            .get()
                            .then(el => {
                                const document = el.data();
                                this.usersData.push({
                                    id: document.userId,
                                    username: document.username,
                                    bio: document.bio,
                                    audio: document.audio
                                })
                            })
                        });
                        // set variable to length of the array
                        this.arrayLength = this.userList.length;

                        if (this.arrayLength == 0) {
                            this.noUsers = true;
                        }
                        
                        console.log('data pending');
                    })
                })
                // start the matching process
                this.started = true;
            },
            emptyArray() {
                this.started = false;
                // empty the arrays
                this.userList = [];
                this.usersData = [];
                
                // when the arrays are empty refire the getPotentialMatches() function
                if (this.userList.length == 0  && this.usersData.length == 0) {
                    this.getPotentialMatches();
                }
            }
        },
    }
</script>