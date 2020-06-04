<template>
    <div>
        <button v-if="users[0].id != user.uid" @click="sendRequest(users[0].id)">{{ users[0].id }}</button>
        <button v-else @click="sendRequest(users[1].id)">{{ users[1].id }}</button>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {db} from '../../main'; 

    export default {
        data() {
            return {
                users: [0],
                user: {},
            }
        },
        created() {
            const user = firebase.auth().currentUser;
            this.user = user;

            if (this.users) {
                db.collection('users')
                .limit(2)
                .get()
                .then((snapshot) => {
                    // this.users = snapshot.docs;
                    const res = snapshot.docs;
                    this.users.forEach(res => {
                        snapshot.docs.push(res);
                    });
                    this.users = res;
                })
            }
            else {
                console.log('ayy');
            }
        },
        methods: {
            sendRequest(id) {
                console.log('pressed', id);

                if (id) {
                    firebase.firestore()
                    .collection('matches')
                    .doc(this.user.uid)
                    .collection('myMatches')
                    .doc(id)
                    .get()
                    .then((snapshot) => {
                        const data = snapshot.data();
                        console.log('data', data);

                        if (!data) {
                            firebase.firestore()
                            .collection('matches')
                            .doc(this.user.uid)
                            .collection('myMatches')
                            .doc(id)
                            .set(
                                { matchIdentifier: id, matched: null, sent: true },
                            )
                        }
                        else if (data.matchIdentifier != id) {
                            firebase.firestore()
                            .collection('matches')
                            .doc(this.user.uid)
                            .collection('myMatches')
                            .doc(id)
                            .set(
                                { matchIdentifier: id, matched: null, sent: true },
                            )
                            console.log('ayy');
                        }
                        else if (data.matchIdentifier == id) {
                            firebase.firestore()
                            .collection('matches')
                            .doc(this.user.uid)
                            .collection('myMatches')
                            .doc(id)
                            .set(
                                { matchIdentifier: id, matched: true, sent: true },
                            ),
                            firebase.firestore()
                            .collection('matches')
                            .doc(id)
                            .collection('myMatches')
                            .doc(this.user.uid)
                            .set(
                                { matchIdentifier: this.user.uid, matched: true, sent: true },
                            )
                            console.log('yeet');
                        }
                        else {
                            console.log('error');
                        }
                    })
                    
                }
                else {
                    console.log('error bij match');
                }
            }
        },
    }
</script>