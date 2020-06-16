<template>
    <div class="footer-wrapper container-fluid">
        <div class="row">
                <div class="text-left footer col-4">
                    <p><Logo class="footerlogo" /></p>
                </div>
                <div class="text-right col-8 footer">
                    <!-- <a href="" class="footersocial"><Facebook /></a> -->
                    <router-link to='/privacy#PrivacyPage'>Privacy</router-link>
                    <router-link to="/about#FAQAnchor">FAQ</router-link>
                </div>
        </div>           
    </div>
</template>

<script>

import Logo from '../assets/SVG/logo/logowhite.svg';

    export default {
        components: {
            
            Logo
        },
    }
</script>

<style lang="scss" scoped>
$pink: #eb9788;
a {
    fill: white;
    transition: 0.2 ease;

    &:hover {
        fill: $pink;
        transform: translateY(-10px);
    }
}

</style>