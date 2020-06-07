<template>
    <div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import'firebase/database';
import 'firebase/firestore';
import {db} from '../../main';

    export default {
        data() {
            return {
                userList: [],
            }
        },
        created () {
            // check for online users

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

            
            firebase.database().ref('status').orderByChild('last_changed').once('value', function(snapshot) {
                const userList = [];
                const metUsers = [];
                // const listLength = snapshot.val().length;

                    db.collection('matches')
                    .doc(uid)
                    .collection('usersMet')
                    .get()
                    .then(snap => {
                        snap.forEach(el => {
                            metUsers.push(el.id);
                        });
                    })
                    
                    snapshot.forEach(el => {
                        if (!metUsers.includes(el.val().id) && el.val().id != uid) {
                            if (userList.length != 5) {
                                userList.push(el.val().id);
                            }
                            else {
                                return userList;
                            }
                        }
                        else {
                            console.log(el.val().id, 'alreay met');
                        } 
                    });
                    console.log('users met', metUsers);
                    console.log('new users', userList);
            })
        },
    }
</script>

<style lang="scss" scoped>

</style>