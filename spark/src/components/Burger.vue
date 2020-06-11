<template>
    <div class="row burger-menu">
        <div class="text-right col-12 mobile-nav">
            <div class="text-right">
                <svg-transition :size="size" class="icons">
                    <MyIcon slot="initial" class="icon" @click="openMenu" />
                    <MyOtherIcon class="icon" @click="closeMenu" />
                </svg-transition>
            </div>

            <div v-show="menuOpen">
                <router-link to="/about">About</router-link> |
                
            </div>
        </div>
    </div>
</template>

<script>
// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import'firebase/database';



import MyIcon from "../assets/SVG/menu.svg";
import MyOtherIcon from "../assets/SVG/heart.svg";


    export default {
        components: {
            
            MyIcon,
            MyOtherIcon
        },
        data() {
            return {
                loggedIn: false,
                activeClass: 'hasNotifications',
                isActive: false,
                id: '',
                size: {
                    width: 48,
                    height: 48
                },
                menuOpen: false
            }
        },

        methods: {
            // removeNotifications() {
            //     console.log('remove');
            //     firebase.database()
            //     .ref('status/' + this.id)
            //     .update({
            //         hasNotification: false
            //     });
            //     this.isActive = false;
            // }
            openMenu() {
                this.menuOpen = true;
                console.log(this.menuOpen);
            },
            closeMenu() {
                this.menuOpen = false;
                console.log(this.menuOpen);
            }
        },
        computed: {
            user () {
                return this.$store.getters.user;
            }
        },
    }
</script>