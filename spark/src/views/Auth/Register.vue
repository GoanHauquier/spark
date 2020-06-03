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
            <div>
                <input type="password" placeholder="Retype password" ref="passwordval" required>
            </div>
            <button type='submit'>Register</button>
        </form>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import {db} from '../../main';

    export default {
        data() {
            return {
                username: '',
                email: '',
                password: '',
                bio: '',
                picture: '',
                error: '',
                standard: 'https://firebasestorage.googleapis.com/v0/b/spark-a6f3f.appspot.com/o/standard%2Fspark_logo.png?alt=media&token=c5efe70e-527f-4986-9827-71360a4e2f91'

            }
        },
        methods: {
            async onSubmit() {
                const passwordValidation = this.$refs.passwordval.value;
                if (passwordValidation == this.password) {
                    // make a new user record in firebase Auth()
                    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user)=> {
                        // if new user record is created successfully
                        if(user) {
                            // fetch user data
                            const cUser = firebase.auth().currentUser;

                            // set username as form input username
                            cUser.updateProfile({
                                displayName: this.username
                            });
                            // make new user document in firestore
                            db.collection('users').doc(cUser.uid).set({
                                userId: cUser.uid,
                                username: this.username,
                                bio: 'My Bio',
                                isAdmin: false,
                                picture: this.standard,
                            });
                            // move views
                            this.$router.replace({ name: 'Home' });
                        }
                    }).catch(function(error) {
                        // if errors occur
                        console.log(error);
                    });
                }
                
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
