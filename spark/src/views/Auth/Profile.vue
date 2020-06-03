<template>
    <div>
        <div>
            {{ cUserData.cUsername }} <br>
            {{ cUserData.cBio }} <br>
            <div v-if="cUserData.cIsAdmin == false">You're not an admin</div>
            <div v-else>Welcome admin</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'cUserData'
        ]
    }
</script>

<style lang="scss" scoped>

</style>