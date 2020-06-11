<template>
    <div class="wrapper"> <!-- Main wrapper -->
        <div class="top-wrapper"> <!-- Top wrapper -->
            <Header />
            <router-view />
        </div>
        <Footer />
    </div>
</template>

<script>
// import * as firebase from 'firebase/app';
// import 'firebase/firestore';
// import {db} from '../main'; 

import Header from './Header';
import Footer from './Footer';

    export default {
        components: {
            Header,
            Footer
        },
        data() {
            return {
                id: '',
                // create userdata object
                // cUserData: {
                //     cUsername: '',
                //     cBio: '',
                //     cIsAdmin: null,
                // },
                
                
            }
        },
        created () {
            
            // fetch user data
            
            // if (user) {
            //     this.id = user.uid;
            //     this.id = this.id.toString();

            //     // fetch user data from firestore
            //     db.collection('users')
            //     .doc(this.id)
            //     .get()
            //     .then(snapshot => {
            //         const document = snapshot.data()
            //         // set the userdata object to the current firestore data
            //         this.cUserData.cUsername = document.username;
            //         this.cUserData.cBio = document.bio;
            //         this.cUserData.cIsAdmin = document.isAdmin;
            //     })
            // }
        },
    }
</script>