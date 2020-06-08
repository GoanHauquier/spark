<template>
    <div>
        <div v-if="potentialMatches.length > 0 && !arrayEmpty">
            <h3>{{ potentialMatches[counter].username }}</h3>
            <button @click="next()">Next</button>
        </div>
        <div v-else-if="potentialMatches.length == 0 || arrayEmpty">
            loading
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                count: 0,
                counter: 0,
                userList: [],
                arrayEmpty: false,
            }
        },
        props: [
            'potentialMatches',
            'arrayLength'
        ],
        watch: {
            potentialMatches() {
                // wait for entire array to arrive in this component
                if (this.potentialMatches.length == this.arrayLength) {
                    this.arrayEmpty = false;
                }
            }
        },
        created () {
        },
        methods: {
            next() {
                // check if counter is equal to the length of the array
                if (this.counter == this.potentialMatches.length-1) {
                    // if yes, fire the reload() function
                    this.arrayEmpty = true;
                    this.reload();
                }
                else {
                    // if not, counter + 1
                    this.counter++
                }
            },
            reload() {
                // set counter to 0 and emit the event to parent component
                this.counter = 0;
                this.$emit('clicked', 'reload');
            }
        },
    }
</script>