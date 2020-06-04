<template>
    <div>
        <div v-for="user in users" :key="user.id">>
            {{ user.id }}
        </div>
    </div>
</template>

<script>

import 'firebase/firestore';
import {db} from '../../main'; 

    export default {
        data() {
            return {
                users: []
            }
        },
        created() {
            db.collection('users')
            .limit(5)
            .get()
            .then((snapshot) => {
                this.users = snapshot.docs;
                console.log(this.users);
            })
        },
        methods: {
            sendRequest() {
                
            }
        },
    }
</script>