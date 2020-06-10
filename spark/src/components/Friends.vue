<template>
    <div>
        <div v-for="match in myMatches" :key="match.id">
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
                activeClass: 'hasNotifications',
                isActive: false,
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
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>