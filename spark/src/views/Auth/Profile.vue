<template>
    <div>
        <div>
            <img :src="user.picture"><br>
            {{ user.username }} <br>
            {{ user.bio }} <br>
            <div v-if="user.isAdmin == false">You're not an admin</div>
            <div v-else>Welcome admin</div>
            <button><router-link to='/edit'>Edit profile</router-link></button>
        </div>
    </div>
</template>

<script>
import 'firebase/firestore';
import {db} from '../../main';

    export default {
        created () {
            this.$store.dispatch('fetchUserData');

            const matches = [];

            // fill array with id's of users you've already met from firestore
            db.collection('matches')
            .doc(this.user.userId)
            .collection('myMatches')
            .get()
            .then( snapshot => {
                snapshot.forEach(el => {
                    if (el.pending == 1) {
                        matches.push(el.id);
                    }
                });
            });
            console.log(matches);
        },
        computed: {
            user () {
                return this.$store.getters.user;
            }
        },
    }
</script>
