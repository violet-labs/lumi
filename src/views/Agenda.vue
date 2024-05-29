<template>
  <lumi-sidenav :custom_class="color" class="fixed-end lumi-sidenav" icon="mdi-calendar-month" v-if="showSidenav" >
    <sidenav-list-agenda></sidenav-list-agenda>
  </lumi-sidenav>
  <!-- <div
    class="bg-gradient-secondary shadow-success pt-1 pb-1"
  >
    <h6 class="text-white text-center ps-3">{{data}}</h6>
  </div> -->
  <div class="main-page-content calendar-container center-self border-radius-2xl">
    <div class="row border-radius-2xl">
      <div class="col-12 d-flex justify-content-center text-center border-radius-2xl">
        <div class="w-full max-w-20rm flex-shrink-0 p-4 py-2 text-center border-radius-2xl">
          <lumi-date-picker />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <lumi-calendar :events="events" :loading="false" :config="cfg" view="week" v-model:date="data"
          @calendarClosed="void 0" @fetchEvents="void 0" @dateSelected="onDateSelected" />
      </div>
    </div>
  </div>
</template>

<script>
import LumiSidenav from "@/views/components/LumiSidenav/index.vue";
import SidenavListAgenda from "@/views/components/LumiSidenav/SidenavListAgenda.vue"
import moment from 'moment';
import { mapMutations, mapState } from "vuex";

const cfg = {
  viewEvent: undefined,
  reportEvent: {
    icon: true,
    text: "",
  },
  searchPlaceholder: "",
  eventName: "",
  closeText: "",
  nativeDatepicker: true,
  todayButton: true,
  firstDayOfWeek: 1,
};

const events = [
  {
    date: "2022-11-19T14:00:00.000Z",
    comment: "",
    id: "cl32rbkjk1700101o53e3e3uhn",
    keywords: "Projet BAMBA",
    name: "MONTCHO Kévin",
  },
  //...
]

const data = new Date()

export default {
  name: "agenda",
  components: {
    LumiSidenav,
    SidenavListAgenda,
    // DatePicker,
  },
  computed: {
    ...mapState([
      "showSidenav",
    ]),
  },
  data() {
    return {
      date: new Date(),
      cfg,
      events,
      data,
    };
  },
  methods: {
    onDateSelected(dateSelected) {
      let dataFormatada = moment(dateSelected).lang("pt").format('dddd, D [de] MMMM [de] YYYY')
      this.data = dataFormatada
    }
  }
};
</script>
