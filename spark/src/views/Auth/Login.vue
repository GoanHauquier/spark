<template>
<div class="form-wrapper container-fluid">
        <div class="form">
            <h1>Login</h1>
            <div v-if="error">
                {{ error.message }}
            </div>

            <form @submit.prevent="onSubmit">
                <div>
                    <input class="inputfield" type="email" v-model='email' placeholder="e-mailadress" >
                </div>
                <div>
                    <input class="inputfield" type="password" v-model='password' placeholder="Password" >
                </div>
                <input class="formbutton" type="submit" value="Login">
            </form>
            <router-link to="resetpassword">Forgot password?</router-link>
            <p>Don't have an account yet? <router-link to="/register">Register</router-link></p>

           
        </div>
        <svg class="wave2" xmlns="http://www.w3.org/2000/svg" viewBox="0 -20 1440 200"><path fill="#273036" fill-opacity="1" d="M0,128L60,122.7C120,117,240,107,360,112C480,117,600,139,720,138.7C840,139,960,117,1080,90.7C1200,64,1320,32,1380,16L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
</div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

    export default {
        data() {
            return {
                email: '',
                password: '',
                error: '',
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
                try {
                    // await log in credentials from firebase to login
                    if (this.email == '' || this.password == '') {
                        this.fieldError();
                    }
                    else if (this.email != '' || this.password != '') {
                        const val = await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
                        val;
                        // move views
                        this.$router.replace({ name: 'Home' });
                    }           
                }
                catch(error) {
                    this.credentialError();
                    
                }
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
        },
    }
</script>

<style lang="scss" scoped>

</style>