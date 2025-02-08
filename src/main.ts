import { createApp } from 'vue'
import './style.css'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Config Pinia
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// vue-toastification
import Toast, { PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
const options: PluginOptions = {
    maxToasts: 10,
    position: POSITION.TOP_RIGHT,
    newestOnTop: true,
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: true,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
}

import App from './App.vue'
import router from './routes';

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
    },
})

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

createApp(App).use(vuetify).use(router).use(pinia).use(Toast, options).mount('#app')
