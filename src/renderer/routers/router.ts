import VueRouter from 'vue-router'

import Vue from "vue"
import MainPage from "../pages/MainPage.vue";

Vue.use(VueRouter);

const router = new VueRouter({
                                 mode: 'history',
                                 routes: [
                                     {
                                         path: '/',
                                         name: 'MainPage',
                                         component: MainPage
                                     },
                                 ]
                             });

export default router;