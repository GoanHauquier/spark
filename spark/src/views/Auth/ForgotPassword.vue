<template>
    <div class="form-wrapper container-fluid">
        <div class="form">
            <h1>Forgot password?</h1><br>
            <form @submit.prevent="resetPassword">
            <input class="inputfield" type="email" v-model="email" placeholder="e-mailadress"><br>
            <input class="formbutton" type="submit" value="Send">
        </form>
        <router-link to="/login">Back</router-link>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';

    export default {
        data() {
            return {
                email: ''
            }
        },
        methods: {
            resetPassword() {
                const auth = firebase.auth();
                const emailAddress = this.email;

                if (this.email != '') {
                    auth.sendPasswordResetEmail(emailAddress).then(send => {
                        send;
                        this.$router.replace({ name: 'Login' });
                        this.succes();
                    }).catch(err => {
                        err;
                        this.error();
                    });
                }
                else {
                    this.error();
                }
            },
            succes () {
                this.$notify({
                    message: 'Email sent!',
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
            error () {
                this.$notify({
                    message: 'Please enter a valid email!',
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
