<template>
    <div>
        <div v-if="potentialMatches.length > 0 && !arrayEmpty">
            <h3>{{ potentialMatches[counter].username }}</h3>
            <button @click="likeUser()">Like</button>
            <button @click="addUserToDB()">Next</button>
        </div>
        <div v-else-if="(potentialMatches.length == 0 || arrayEmpty) && !noUsers">
            loading
        </div>
        <div v-else-if="noUsers">
            No more users in the queue, please come back later...
        </div>
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
                count: 0,
                counter: 0,
                userList: [],
                arrayEmpty: false,
            }
        },
        props: [
            'potentialMatches',
            'arrayLength',
            'noUsers'
        ],
        watch: {
            potentialMatches() {
                // wait for entire array to arrive in this component
                if (this.potentialMatches.length == this.arrayLength) {
                    this.arrayEmpty = false;
                }
            },
        },
        methods: {
            next() {
                // check if counter is equal to the length of the array
                if (this.counter == this.potentialMatches.length-1) {
                    // if yes, fire the reload() function
                    this.arrayEmpty = true;
                    this.reload();
                }
                else {
                    // if not, counter + 1
                    this.counter++;
                }
            },
            reload() {
                // set counter to 0 and emit the event to parent component
                this.counter = 0;
                this.$emit('clicked', 'reload');
            },
            addUserToDB() {
                // add every user to the usersMet table in the db
                db.collection("matches")
                .doc(this.user.userId)
                .collection('usersMet')
                .doc(this.potentialMatches[this.counter].id)
                .set({
                    activated: true,
                }).then(this.next());
            },
            likeUser() {
                firebase.database().ref('status/' + this.potentialMatches[this.counter].id + '/pending/' + this.user.userId).once('value', snapshot => {
                    if (snapshot.val() == null) {
                        console.log('doesnt exist');
                        firebase.database()
                        .ref('status/' + this.user.userId + '/pending/' + this.potentialMatches[this.counter].id)
                        .set({
                            pending: 1
                        });
                        this.addUserToDB();
                    }
                    else {
                        console.log('exists');
                        // add every user to the usersMet table in the db
                        db.collection("matches")
                        .doc(this.user.userId)
                        .collection('myMatches')
                        .doc(this.potentialMatches[this.counter].id)
                        .set({
                            match: 1,
                        });
                        db.collection("matches")
                        .doc(this.potentialMatches[this.counter].id)
                        .collection('myMatches')
                        .doc(this.user.userId)
                        .set({
                            match: 1,
                        });
                        this.addUserToDB();
                    }
                    
                })
            }
        },
        computed: {
            user () {
                return this.$store.getters.user;
            }
        },
        created () {
            this.$store.dispatch('fetchUserData');
        },
    }
</script>