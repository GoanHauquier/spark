<template>
    <div class="form-wrapper register container-fluid">
        
        <div class="form ">

            <div v-if="error">
                {{ error.message }}
            </div>

            <h1>Register</h1>
            <form @submit.prevent="onSubmit">
            <div>
                <input class="inputfield" type="text" v-model="username" placeholder="Username" minlength="2" maxlength="32">
            </div>
            <div>
                <input class="inputfield" type="email" v-model='email' placeholder="e-mailadress" >
            </div>
            <div>
                <input class="inputfield" type="password" v-model='password' placeholder="Password" minlength="7">
            </div>
            <div>
                <input class="inputfield" type="password" placeholder="Retype password" ref="passwordval" >
            </div>
            <div class="row checkbox">
                <div>
                    <input class="" type="checkbox" required>
                </div>
                <div>
                    
                    <p>I accept the terms of service</p>
                </div>
            </div>
            <input class="formbutton" type="submit" value="Register">
            </form>
            <p class="whitespace">Already have an account? <router-link to="/login">Login</router-link></p>
        </div>
        <svg class="wave2" xmlns="http://www.w3.org/2000/svg" viewBox="0 -20 1440 200"><path fill="#273036" fill-opacity="1" d="M0,128L60,122.7C120,117,240,107,360,112C480,117,600,139,720,138.7C840,139,960,117,1080,90.7C1200,64,1320,32,1380,16L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
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
        created () {
            const user = firebase.auth().currentUser;
            if (user) {
                this.$router.replace({ name: 'Home' });
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
                                    links: {
                                        soundcloud: {
                                            link: '',
                                            class: 'soundcloud'
                                        },
                                        spotify: {
                                            link: '',
                                            class: 'spotify'
                                        },
                                        facebook: {
                                            link: '',
                                            class: 'facebook'
                                        },
                                        instagram: {
                                            link: '',
                                            class: 'instagram'
                                        },
                                    }
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
