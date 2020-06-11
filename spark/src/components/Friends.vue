<template>
    <div>
        <h2>Your Sparks</h2>
        <input type="text" v-model="searchInput">
        <div v-if="!myMatches[0]">
            No sparks yet
        </div>
        <div v-else v-for="match in filteredList" :key="match.id">
            <button >
                <router-link :to="'profile/' + match.id">{{ match.name }}</router-link>
            </button>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {db} from '../main';

    export default {
        data() {
            return {
                myMatches: [],
                counter: 0,
                id: '',
                searchInput: ''
            }
        },
        created () {
            this.$store.dispatch('fetchUserData');

            const id = firebase.auth().currentUser.uid;
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
            })
            this.myMatches = matches;
            console.log(this.myMatches);
        },
        methods: {
            
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