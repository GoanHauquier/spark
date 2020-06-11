<template>
    <div>
        <form @submit.prevent="resetPassword">
            <input type="email" v-model="email">
            <button type='submit'>Send email</button>
        </form>
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
                    }).catch(function(error) {
                        console.log(error);
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
