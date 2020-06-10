<template>
    <div>
        Register
        <div v-if="error">
            {{ error.message }}
        </div>

        <form @submit.prevent="onSubmit">
            <div>
                <input type="text" v-model="username" placeholder="Username" minlength="2" maxlength="32">
            </div>
            <div>
                <input type="email" v-model='email' placeholder="e-mailadress" >
            </div>
            <div>
                <input type="password" v-model='password' placeholder="Password" minlength="7">
            </div>
            <div>
                <input type="password" placeholder="Retype password" ref="passwordval" >
            </div>
            <button type='submit'>Register</button>
        </form>
        <p>Already have an account? <router-link to="/login">Login</router-link></p>
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
                if (this.email == '' || this.username == '' || this.password == '' || passwordValidation == '') {
                    this.fieldError();
                }
                else {
                    if (passwordValidation == this.password) {
                        // make a new user record in firebase Auth()
                        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
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
                                    audio: '',
                                });

                                db.collection('matches').doc(cUser.uid).collection('myMatches').doc('Activated').set({activated: true});
                                db.collection('matches').doc(cUser.uid).collection('usersMet').doc(cUser.uid).set({activated: true});

                                this.sendVerificationEmail();
                                this.succesNotification();
                            
                                // move views
                                this.$router.replace({ name: 'Home' });
                            }
                        }).catch(error => {
                            console.log(error);
                            this.emailError();
                        });
                    }
                    else {
                        this.passwordError();
                    }
                }
                
            },
            sendVerificationEmail() {
                const user = firebase.auth().currentUser;
                user.sendEmailVerification().then(function() {
                    console.log('email sent');                    
                }).catch(error => {
                    console.log(error);
                });
            },
            fieldError () {
                this.$notify({
                    message: 'Please fill in all fields!',
                    top: true,
                    right: true,
                    type: 'warning',
                    theme: {
                        colors: {
                            warning: '#f8a623',
                        },
                    },
                });
            },
            passwordError () {
                this.$notify({
                    message: "Passwords don't match!",
                    top: true,
                    right: true,
                    type: 'warning',
                    theme: {
                        colors: {
                            warning: '#f8a623',
                        },
                    },
                });
            },
            credentialError () {
                this.$notify({
                    message: 'These credentials do not match!',
                    top: true,
                    right: true,
                    type: 'warning',
                    theme: {
                        colors: {
                            warning: '#f8a623',
                        },
                    },
                });
            },
            emailError () {
                this.$notify({
                    message: 'Email already in use!',
                    top: true,
                    right: true,
                    type: 'warning',
                    theme: {
                        colors: {
                            warning: '#f8a623',
                        },
                    },
                });
            },
            succesNotification() {
                this.$notify({
                    message: 'Verification email sent to ' + this.email,
                    top: true,
                    right: true,
                    type: 'succes',
                    theme: {
                        colors: {
                            succes: '#fofofo',
                        },
                    },
                });
            },
        },
    }
</script>
