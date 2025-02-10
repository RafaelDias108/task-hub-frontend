import { createApp } from 'vue'
import './style.css'

// Vuetify
import { vuetify } from './plugins/vuetify';

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

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

createApp(App).use(vuetify).use(router).use(pinia).use(Toast, options).mount('#app')
