import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)


const opts = {
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: '#6f85d2',
                // primary: '#8065ff',
                // secondary: colors.red.lighten4, // #FFCDD2
                // accent: colors.indigo.base, // #3F51B5
            },


        },
    },
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
}

//@ts-ignore
export default new Vuetify(opts)

