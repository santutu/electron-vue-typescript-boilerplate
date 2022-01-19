import Vue from "vue";
import VueScreen from "vue-screen";

Vue.use(VueScreen, {
    xs: screen < (screen as any).sm,
    sm: 600, // will be converted to 480px
    md: 960,
    lg: 1264,
    xl: 904
});
