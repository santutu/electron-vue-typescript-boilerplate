import 'reflect-metadata';
import 'es6-promise/auto'
import Vue from "vue"
import Component from "vue-class-component"
import DefaultLayout from "./views/layouts/DefaultLayout.vue";
import "./systems/plugins/vueShortKey"
import "./systems/plugins/vueScreen"
import "./systems/plugins/extendFormValidationRules"
import "./systems/plugins/filters"
import "./systems/plugins/local-storage"
import {registerVueGlobalVariables} from './types/registerVuegobalVariables'
import router from "./views/routers/router"
import {store} from "./store";
import {Provide} from "vue-inversify-decorator";
import InitializeApp from "./systems/InitializeApp";
import {container} from "./systems/Container";
import {listenMenubarCommands} from "./listenMenubarCommands";


(async () => {

    await new InitializeApp().init();

    @Component({
                   components: {
                       DefaultLayout
                   },
                   template: `
                       <DefaultLayout/>`
               })
    @Provide(container)
    class VueApp extends Vue {

        created() {
            console.log('hello world')
        }
    }


    registerVueGlobalVariables();


    listenMenubarCommands(router);

    new VueApp({
                   router,
                   store,
               }).$mount('#app');
})();



