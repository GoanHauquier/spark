<template>
    <div class="container-fluid error-wrapper"> 
        <div class="error container">
            <vue-typed-js :strings="['I have looked far and wide...']" :loop="false" :showCursor="false" :typeSpeed="50">
                <h1><span class="typing"></span></h1>
            </vue-typed-js>
            <vue-typed-js :strings="['But this page is nowhere to be found']" :loop="false" :showCursor="false" :startDelay="4000" :typeSpeed="50">
                <h1><span class="typing"></span></h1>
            </vue-typed-js>
            <br>
            <br>
            <vue-typed-js :strings="['Click <u>HERE</u> to go back']" :loop="false" :showCursor="false" :startDelay="8000" :typeSpeed="50">
                <router-link to='/'><h1><span class="typing"></span></h1></router-link>
            </vue-typed-js>
        </div>
        <img src="../assets/images/error-404-monochrome-400px.png" alt="">
    </div>
</template>

<script>
    export default {
        components: {
            
        },
    }
</script>

<style lang="scss" scoped>
    .error-wrapper {
        height: 100vh;
        background-color: whitesmoke;
    }
    .error {
        padding-top: 30vh;

        h1 {
            font-size: 10em;
        }
    }
    .text {
        transition: 0.2s ease;

        &:hover {
            stroke-dasharray: 50;
            animation: dash 4s infinite;
            transform: scale(1.02);
        }

    }
    @keyframes dash {
        to {
            stroke-dashoffset: 100;
        }
    }

    .logo {
        &:hover {
            animation: logo 0.2s ease-out;
        }
    }
    @keyframes logo {
        60% {
            transform: translateX(3px) translateY(-3px);
        }
        100% {
            transform: translateX(0) translateY(0);
        }
    }
</style>