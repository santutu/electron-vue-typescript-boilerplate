import 'reflect-metadata';
import 'es6-promise/auto'
import Vue from "vue"
import Component from "vue-class-component"
import DefaultLayout from "./views/layouts/DefaultLayout.vue";
import "./plugins/vueShortKey"
import "./plugins/vueScreen"
import "./plugins/extendFormValidationRules"
import "./plugins/filters"
import "./plugins/local-storage"
import vuetify from "./plugins/vuetify"
import './types/vue-global-variable'
import router from "./views/routers/router"
import {store} from "./store";
import {Provide} from "vue-inversify-decorator";
import container from "./container";
import InitializeApp from "./systems/InitializeApp";

@Component({
               components: {
                   DefaultLayout
               },
               template: `
                   <DefaultLayout/>`
           })
@Provide(container)
class App extends Vue {

    created() {
        console.log('hello world')
    }
}

(async () => {
    await new InitializeApp().init();
    new App({
                router,
                store,
                vuetify,
            }).$mount('#app');
})();



