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
                                if (this.userList.length != 5) {
                                    this.userList.push(el.val().id);
                                }
                                else {
                                    return this.userList;
                                }
                            }
                        });
                        console.log(this.userList);
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
                                    bio: document.bio
                                })
                            })
                        });
                        // set variable to length of the array
                        this.arrayLength = this.userList.length;

                        if (this.arrayLength == 0) {
                            this.noUsers = true;
                            console.log('null');
                        }
                        
                        console.log('data pending');
                        // console.log('userList', this.userList);
                        // console.log('usersData', this.usersData);
                        // console.log(this.arrayLength);
                        
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