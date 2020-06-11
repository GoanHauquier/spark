<template>
    <div>
        <h2>{{ userData.username }}</h2><br>
        <p>{{ userData.bio }}</p><br>
        <img :src="userData.picture" :alt="userData.username + 's profilepicture'">
    </div>
</template>

<script>
import {db} from '../../main';
import 'firebase/firestore';

    export default {
        data() {
            return {
                id: this.$route.params.id,
                userData: {
                    bio: '',
                    username: '',
                    picture: ''
                }
            }
        },
        created () {
            // fill array with id's of users you've already met from firestore
            db.collection('users')
            .doc(this.id)
            .get()
            .then( snap => {
                const doc = snap.data();
                this.userData.username = doc.username;
                this.userData.bio = doc.bio;
                this.userData.picture = doc.picture;
            })
        },
    }
</script> 