import type { App, Plugin } from "vue";
import { createPinia } from "pinia";
import { default as widget } from "./components/calendar/core-index.vue";
import { i18n } from "./assets/i18n";

// import the fontawesome core
import { library } from "@fortawesome/fontawesome-svg-core";

// import font awesome icon component
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// import specific icons
import {
  faEye,
  faXmark,
  faChevronRight,
  faChevronLeft,
  faMagnifyingGlass,
  faPenNib,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

// add icons to the library
library.add(
  faEye,
  faXmark,
  faChevronRight,
  faChevronLeft,
  faMagnifyingGlass,
  faPenNib,
  faCalendar
);

const pinia = createPinia();

import LumiDatePicker from "./components/calendar/calendar-native-datepicker.vue";

const LumiCalendar: Plugin<any[]> = {
  install: (app: App, options: any[]) => {
    app.use(pinia);
    // app.use(i18n);

    // app.provide("$t", app.config.globalProperties.$t);
    // app.provide("$i18n", app.config.globalProperties.$i18n);
    // app.provide("$locale", app.config.globalProperties.$i18n.locale);

    app.component("font-awesome-icon", FontAwesomeIcon);
    app.component('LumiDatePicker', LumiDatePicker)

    // Plugin code goes here
    app.component("LumiCalendar", widget);
  },
};

export { LumiCalendar };
export type { Appointment, T_View, T_Action, Configs } from "./stores/events";
export { E_View, E_CustomEvents, DEFAULT_CONFIGS } from "./stores/events";
