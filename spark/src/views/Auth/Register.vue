<template>
    <div>
        Register
        <div v-if="error">
            {{ error.message }}
        </div>

        <form @submit.prevent="onSubmit">
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
                alert('registered');
                try {
                    const user = firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
                    console.log(user);
                    this.$router.replace({name: 'Authtest'});
                }
                catch(err) {
                    console.log('error');
                }
            }
        },
    }
</script>
