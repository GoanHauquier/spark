<template>
    <div>
        Login
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
            <button type='submit'>Login</button>
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
                try {
                    // await log in credentials from firebase to login
                    const val = await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
                    console.log(val);
                    // move views
                    this.$router.replace({ name: 'Home' });
                }
                catch(err) {
                    console.log(err);
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>