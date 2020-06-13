<template>
    <div class="footer-wrapper container-fluid">
        <div class="row">
                <div class="text-left footer col-6">
                    <p><Logo class="footerlogo" /></p>
                </div>
                <div class="text-right col-6 footer">
                    <a href="" class="footersocial"><Facebook /></a>
                    <a href="" class="footersocial"><Instagram /></a>
                </div>
        </div>           
    </div>
</template>

<script>
import Facebook from '../assets/SVG/socials/facebook.svg';
import Instagram from '../assets/SVG/socials/instagram.svg';
import Logo from '../assets/SVG/logo/logowhite.svg';

    export default {
        components: {
            Facebook,
            Instagram,
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