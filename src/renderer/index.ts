import 'reflect-metadata';
import 'es6-promise/auto'
import Vue from "vue"
import Component from "vue-class-component"
import DefaultLayout from "./layouts/DefaultLayout.vue";
import "video.js/dist/video-js.min.css"
import "video.js/dist/video.min"
import "./plugins/vueShortKey"
import "./plugins/vueScreen"
import "./plugins/extendFormValidationRules"
import "./plugins/filters"
import "./plugins/local-storage"
import "./plugins/inspectElement"
import vuetify from "./plugins/vuetify"
import './vue-global-variable'
import router from "./routers/router"
import {store} from "./store";
import {Provide} from "vue-inversify-decorator";
import container from "./container";

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

new App({
            router,
            store,
            vuetify,
        }).$mount('#app')

