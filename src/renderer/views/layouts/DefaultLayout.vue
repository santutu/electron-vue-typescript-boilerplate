<template>
    <div>
        <div v-if="$isDev" v-hotkey="globalShortcuts"></div>


        <div>
            <router-link to="/">MainPage</router-link>
            <router-link to="/SamplePage">SamplePage</router-link>
        </div>

        <div>
            <router-view/>
        </div>
    </div>
</template>


<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class DefaultLayout extends Vue {

    test() {
        console.log('test')
    }

    globalShortcuts = {
        'ctrl+shift+1': this.test,

    }
}
</script>

<style scoped>

</style>
