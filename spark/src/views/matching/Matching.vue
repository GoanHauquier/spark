<template>
    <div class="matching-wrapper fade-in">
        <div v-if="potentialMatches.length > 0 && !arrayEmpty">
            <h2 class="artist-title">{{ quotes[number] }}</h2>
            <mini-audio      
                :html5="true"
                :src="potentialMatches[counter].audio"
            >
            </mini-audio>
            <h3>Like what you hear?</h3>
            <div class="row panel">
                <!-- <button @click="likeUser()">Like</button> -->
                <div  @click="likeUser()" class="judgebutton heart">
                    <a class=""><Heart /></a>
                </div>
                <!-- <button @click="addUserToDB()">Next</button> -->
                <div @click="addUserToDB()" class="judgebutton cross">
                    <a class=""><Cross /></a>
                </div>
            </div>
        </div>
        <div v-else-if="(potentialMatches.length == 0 || arrayEmpty) && !noUsers">
            loading new users...
        </div>
        <div v-else-if="noUsers">
            <h1>Oh no!</h1>
            <p>No more users in <u>the Queue</u>, please come back later...</p>

            <router-link to='/' class="back-btn">Back</router-link>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import'firebase/database';
import 'firebase/firestore';
import {db} from '../../main';

import Cross from '../../assets/SVG/cross.svg';
import Heart from '../../assets/SVG/heart.svg';

    export default {
        components: {
            Cross,
            Heart
        },
        data() {
            return {
                count: 0,
                counter: 0,
                userList: [],
                arrayEmpty: false,
                id: '',
                audioState: 'paused',
                quotes: [
                    'Anonymous artist',
                    'Anonymous sparker',
                    'Anonymous musical mastermind',
                ],
                number: 0
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
                    if (this.number < 2) {
                        this.number++;
                    }
                    else  {
                        this.number = 0;
                    }
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
                .doc(this.id)
                .collection('usersMet')
                .doc(this.potentialMatches[this.counter].id)
                .set({
                    activated: true,
                }).then(this.next());
            },
            likeUser() {
                this.right = true;
                setTimeout(() => this.right == false, 5000);
                firebase.database().ref('status/' + this.potentialMatches[this.counter].id + '/pending/' + this.id).once('value', snapshot => {
                    
                    if (snapshot.val() == null) {
                        firebase.database()
                        .ref('status/' + this.id + '/pending/' + this.potentialMatches[this.counter].id)
                        .set({
                            pending: 1
                        });
                        this.addUserToDB();
                    }
                    else {
                        // add user to my matches table
                        db.collection("matches")
                        .doc(this.id)
                        .collection('myMatches')
                        .doc(this.potentialMatches[this.counter].id)
                        .set({
                            match: 1,
                            name: this.potentialMatches[this.counter].username,
                            id: this.potentialMatches[this.counter].id,
                            date: firebase.database.ServerValue.TIMESTAMP,
                        });
                        // add me to my matches' matches table
                        db.collection("matches")
                        .doc(this.potentialMatches[this.counter].id)
                        .collection('myMatches')
                        .doc(this.id)
                        .set({
                            match: 1,
                            name: this.user.username,
                            id: this.id,
                            date: firebase.database.ServerValue.TIMESTAMP,
                        });
                        // set has notification to true for my profile
                        firebase.database()
                        .ref('status/' + this.id)
                        .update({
                            hasNotification: true
                        });
                        this.newMatch();
                        this.addUserToDB();
                        // set has notification to true for my match' profile
                        firebase.database()
                        .ref('status/' + this.potentialMatches[this.counter].id)
                        .update({
                            hasNotification: true
                        });
                        
                        this.newMatch();
                        this.addUserToDB();
                        
                    }   
                })
            },
            newMatch () {
                this.$notify({
                    message: "You've got a new Spark!",
                    top: true,
                    right: true,
                    type: 'succes',
                    theme: {
                        colors: {
                            succes: '#eb9788',
                        },
                    },
                });
            },
        },
        computed: {
            user () {
                return this.$store.getters.user;
            }
        },
        created () {
            this.$store.dispatch('fetchUserData');
            this.id = firebase.auth().currentUser.uid;
        },
    }
</script>