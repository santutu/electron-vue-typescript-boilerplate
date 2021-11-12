<template>
    <v-app>
        <div v-if="$isDev" v-hotkey="globalShortcuts"></div>

        <v-navigation-drawer v-model="isShowMenus" app floating>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        Application
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        subtext
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list
                dense
                nav
            >
                <v-list-item
                    link
                    @click.prevent="$router.push('/')"
                >
                    <v-list-item-icon>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Main Page</v-list-item-title>
                    </v-list-item-content>


                </v-list-item>

                <v-list-item
                    link
                    @click.prevent="$router.push('/SamplePage')"
                >
                    <v-list-item-icon>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>SamplePage</v-list-item-title>

                    </v-list-item-content>


                </v-list-item>


            </v-list>

        </v-navigation-drawer>

        <v-app-bar app>
            <button @click="isShowMenus = !isShowMenus" style="height: 100%; width: 70px; ">
                <v-icon>mdi-menu</v-icon>
            </button>
            <v-divider vertical/>
            <v-toolbar-title class="pl-4">
                title
            </v-toolbar-title>
            <v-spacer/>

        </v-app-bar>


        <v-main>
            <v-container fluid class="pt-3 pt-sm-3 pt-md-5 pt-lg-10 px-0 px-sm-3 px-md-6 px-lg-10 pb-4 pb-sm-16"
                         style="max-width: 1500px">
                <!--                <transition name="fade">-->
                <router-view/>
                <!--                </transition>-->
            </v-container>
        </v-main>

        <v-footer app inset class="px-4 py-2">
            <template v-if="$authStore.isAuth">
                {{ $authStore.user.email }}
            </template>
        </v-footer>

    </v-app>
</template>


<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class DefaultLayout extends Vue {
    isShowMenus: boolean = true

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
