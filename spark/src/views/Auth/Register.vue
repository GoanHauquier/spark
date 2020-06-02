<template>
    <div>
        Register
        <div v-if="error">
            {{ error.message }}
        </div>

        <form @submit.prevent="onSubmit">
            <div>
                <input type="text" v-model="username" placeholder="Username" required>
            </div>
            <div>
                <input type="email" v-model='email' placeholder="e-mailadress" required>
            </div>
            <div>
                <input type="password" v-model='password' placeholder="Password" required>
            </div>
            <button type='submit'>Register</button>
        </form>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {db} from '../../main';

    export default {
        data() {
            return {
                username: '',
                email: '',
                password: '',
                bio: '',
                error: '',
            }
        },
        methods: {
            async onSubmit() {
                alert('registered');

                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user)=> {

                    if(user) {

                        const cUser = firebase.auth().currentUser;
                        cUser.updateProfile({
                            displayName: this.username
                        });
                        db.collection('users').doc(cUser.uid).set({
                            userId: cUser.uid,
                            username: this.username,
                            bio: 'My Bio',
                            isAdmin: false
                        });
                    }
                }).catch(function(error) {
                        console.log(error);
                });
                
                /*
                try {
                    const user = firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
                    db.collection('users').doc(user.users.data).set({
                        username: this.username
                    });
                    console.log(user, db.collection('users').doc('data'));
                    this.$router.replace({name: 'Authtest'});
                }
                catch(err) {
                    console.log('database werkt ni man');
                }
                */
            }
        },
    }
</script>
