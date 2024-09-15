

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

import './assets/css/lumi.css'

import { LumiCalendar } from "./views/components/LumiCalendar";

import VioletJs from './plugins/VioletJs'

import i18n from './i18n'


import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import filters from './helpers/filters'

import moment from 'moment-timezone'

import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

moment.tz.setDefault('America/Sao_Paulo')

library.add(fas);
library.add(fab);

const appInstance = createApp(App)
appInstance.use(store)
appInstance.use(router)
appInstance.use(MaterialDashboard)
appInstance.use(LumiCalendar)
appInstance.use(VioletJs)
appInstance.use(i18n)
appInstance.use(VueViewer)

appInstance.config.globalProperties.$filters = filters

const vuetify = createVuetify({
    components,
    directives,
})

appInstance.use(vuetify)

appInstance.mount("#app")
appInstance.component('EasyDataTable', Vue3EasyDataTable)
// appInstance.component('font-awesome-icon', FontAwesomeIcon);
