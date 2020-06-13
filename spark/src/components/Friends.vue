<template>
    <div class="friends ">
        <h3>Your Sparks</h3>
        <input type="text" v-model="searchInput" placeholder="Search Sparks" class="friendsearch">

        

        <div v-if="!myMatches[0]" class="matches scroll">
                <p>No sparks yet</p>
        </div>
        
        <div  v-for="match in filteredList" :key="match.id" class="friendlist scroll">
                <div v-bind:class="[{ '': match.match == 1}, 'match']" @click="removeNotifications(match.id)">
                    <router-link :to="'profile/' + match.id">{{ match.name }}</router-link><br>
                    <hr>
                </div>  
        </div>                         
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {db} from '../main';

    export default {
        components: {
        },
        data() {
            return {
                myMatches: [],
                counter: 0,
                id: '',
                searchInput: '',
            }
        },
        created () {
            this.$store.dispatch('fetchUserData');

            const id = firebase.auth().currentUser.uid;
            this.id = id;
            const matches = [];

            db.collection('matches')
            .doc(id)
            .collection('myMatches')
            .orderBy("date")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    if (doc.data().match != undefined) {
                        matches.push(doc.data());
                        this.counter++;
                    }
                });
            });
            this.myMatches = matches;
        },
        methods: {
            removeNotifications(matchId) {
                db.collection('matches')
                .doc(this.id)
                .collection('myMatches')
                .doc(matchId)
                .update({
                    match: 2,
                });
            }
        },
        computed: {
            user () {
                return this.$store.getters.user;
            },
            filteredList() {
                return this.myMatches.filter(post => {
                    return post.name.toLowerCase().includes(this.searchInput.toLowerCase())
                });
            }
        },   
    }
</script>

<style lang="scss" scoped>

</style>