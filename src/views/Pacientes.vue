<template>
  <TreatmentsTable  :treatments="treatments" />
</template>

<script>
const evts = [
  {
    date: "2024-05-04T14:00:00.000Z",
    comment: "",
    id: "cl32rbkjk1700101o53e3e3uhn",
    keywords: "Projet BAMBA",
    name: "MONTCHO Kévin",
  },
  //...
]

const cfg = {
  viewEvent: undefined,
  reportEvent: {
    icon: true,
    text: "",
  },
  searchPlaceholder: "",
  eventName: "",
  closeText: "",
  nativeDatepicker: false,
  todayButton: true,
  firstDayOfWeek: 1,
}

import { mapMutations, mapState } from "vuex";
import TreatmentsTable from "./components/TreatmentsTable.vue";

export default {
  name: "tables",
  components: {
    TreatmentsTable
  },
  computed: {
    ...mapState([
      "isRTL",
      "color",
      "isAbsolute",
      "isNavFixed",
      "navbarFixed",
      "absolute",
      "showSidenav",
      "showNavbar",
      "showFooter",
      "showConfig",
      "hideConfigButton",
    ]),
  },
  data() {
    return {
      cfg,
      evts,
      treatments: [
        {
          id: 1,
          name: 'Beatriz Souza Costa',
          cpf: '019.647.076-50',
          rg: '19.833.663',
          diagnosis: 'Classe II',
          email: 'bia.souza@gmail.com',
          recommended_treatment: 'Usar arcos X',
          place: 'Poços de Caldas',
          picture_url: 'pictures/1/1.jpg',
          registered_date: '2023-11-01 14:02:03',
          completed_date: '2023-11-01 17:38:12',
          status: 'COMPLETED'
        },
        {
          id: 2,
          name: 'Paciente da Silva',
          cpf: '019.647.076-50',
          rg: '19.833.663',
          diagnosis: 'Mordida cruzada',
          email: 'paciente.silva@gmail.com',
          recommended_treatment: 'Usar arcos YY',
          place: 'Poços de Caldas',
          picture_url: 'pictures/1/2.jpg',
          registered_date: '2023-12-01 14:02:03',
          completed_date: '2023-12-01 17:38:12',
          status: 'NOT STARTED'
        },
        {
          id: 3,
          name: 'Laura Antunes Mendes',
          cpf: '019.647.076-50',
          rg: '19.833.663',
          diagnosis: 'Classe III',
          email: 'laura.mendes@hotmail.com',
          recommended_treatment: 'Usar arcos ZZZ',
          place: 'Poços de Caldas',
          picture_url: 'pictures/1/2.jpg',
          registered_date: '2023-12-01 14:02:03',
          completed_date: '2023-12-01 17:38:12',
          status: 'ONGOING'
        },
        {
          id: 3,
          name: 'André Custódio Bueno',
          cpf: '019.647.076-50',
          rg: '19.833.663',
          diagnosis: 'Classe I',
          email: 'andre.bueno@gmail.com',
          recommended_treatment: 'Usar arcos ZZZ',
          place: 'Andradas',
          picture_url: 'pictures/1/2.jpg',
          registered_date: '2023-12-01 14:02:03',
          completed_date: '2023-12-01 17:38:12',
          status: 'ONGOING'
        },
        {
          id: 3,
          name: 'Mayara Alcântara Muniz',
          cpf: '019.647.076-50',
          rg: '19.833.663',
          diagnosis: 'Classe I',
          email: 'mayara.muniz@gmail.com',
          recommended_treatment: 'Usar arcos ZZZ',
          place: 'Poços de Caldas',
          picture_url: 'pictures/1/2.jpg',
          registered_date: '2023-12-01 14:02:03',
          completed_date: '2023-12-01 17:38:12',
          status: 'ONGOING'
        },
      ]
    }
  }
};
</script>
