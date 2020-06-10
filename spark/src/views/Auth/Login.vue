<template>
    <div>
        Login
        <div v-if="error">
            {{ error.message }}
        </div>

        <form @submit.prevent="onSubmit">
            <div>
                <input type="email" v-model='email' placeholder="e-mailadress" >
            </div>
            <div>
                <input type="password" v-model='password' placeholder="Password" >
            </div>
            <button type='submit'>Login</button>
        </form>
        <router-link to="resetpassword">Forgot password?</router-link>
        <p>Don't have an account yet? <router-link to="/register">Register</router-link></p>
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