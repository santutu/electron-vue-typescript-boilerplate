import VueRouter from 'vue-router'

import Vue from "vue"
import MainPage from "../pages/MainPage.vue";
import SamplePage from "../pages/SamplePage.vue";

Vue.use(VueRouter);

const router = new VueRouter({
                                 mode: 'history',
                                 routes: [
                                     {
                                         path: '/',
                                         name: 'MainPage',
                                         component: MainPage
                                     },

                                     {
                                         path: '/SamplePage',
                                         name: 'SamplePage',
                                         component: SamplePage
                                     },
                                 ]
                             });

export default router;