<template>
    <div class="container-fluid error-wrapper"> 
        <div class="error container text-center">
            <h1 class="col-12">404</h1>
        </div>
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