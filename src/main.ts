

import { createApp } from "vue"
import App from "./App.vue"
import store from "./store"
import router from "./router"
import "./assets/css/nucleo-icons.css"
import "./assets/css/nucleo-svg.css"

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import MaterialDashboard from "./material-dashboard"

import '@mdi/font/css/materialdesignicons.css'

import './assets/css/main.css'

import { ProCalendar } from "./components/lumi-agenda";

const appInstance = createApp(App)
appInstance.use(store)
appInstance.use(router)
appInstance.use(MaterialDashboard)
appInstance.use(ProCalendar)

const vuetify = createVuetify({
    components,
    directives,
})

appInstance.use(vuetify)

appInstance.mount("#app")
