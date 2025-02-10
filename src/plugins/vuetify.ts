import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


export const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
    },
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#1976D2',
                    'cardCustom': '#EDF0F4'
                }
            },
            dark: {
                dark: true,
                colors: {
                    primary: '#1976D2',
                    'cardCustom': '#3E4144'
                }
            }
        }
    }
})