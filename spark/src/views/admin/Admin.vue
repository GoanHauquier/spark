<template>
    <div>
        {{ welcome }}
    </div>
</template>

<script>
import * as firebase from 'firebase/app';

    export default {
        data() {
            return {
                welcome: ''
            }
        },
        created () {
            const admin = firebase.auth().currentUser;
            if (admin.isAdmin == true) {
                this.welcome = 'welcome admin'
            }
            else {
                this.welcome = 'nice try';
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>