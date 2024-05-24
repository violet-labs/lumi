<template>
  <lumi-sidenav icon="mdi-doctor" class="fixed-end lumi-sidenav" v-if="showSidenav">
    <sidenav-list-dentistas />
  </lumi-sidenav>

  <div class="main-page-content">
    <div class="row">
      <div class="col-12">
        <DentistsTable :dentists="dentists" />
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapState } from "vuex";
import DentistsTable from "./components/DentistsTable.vue";
import LumiSidenav from "@/views/components/LumiSidenav/index.vue";
import SidenavListDentistas from "@/views/components/LumiSidenav/SidenavListDentistas.vue"

export default {
  name: "Dentistas",
  components: {
    DentistsTable,
    LumiSidenav,
    SidenavListDentistas,
  },
  data() {
    return {
      dentists: [
        {
          id: 1,
          name: 'Dr. Eduardo Carvalho Silva',
          cpf: '019.647.076-50',
          rg: '19.833.663',
          diagnosis: 'Ortodontia',
          recommended_dentist: 'Endodontia',
          email: 'contato@eduardosilva.com.br',
          place: 'Poços de Caldas',
          picture_url: 'pictures/1/1.jpg',
          registered_date: '2023-11-01 14:02:03',
          completed_date: '2023-11-01 17:38:12',
          status: 'ATIVO'
        },
        {
          id: 2,
          name: 'Dr. Thales Casa Grande',
          cpf: '019.647.076-50',
          rg: '19.833.663',
          diagnosis: 'Ortodontia',
          recommended_dentist: 'Clínico geral',
          email: 'thales-lima@live.com',
          place: 'Poços de Caldas',
          picture_url: 'pictures/1/2.jpg',
          registered_date: '2023-12-01 14:02:03',
          completed_date: '2023-12-01 17:38:12',
          status: 'ATIVO'
        },
        {
          id: 3,
          name: 'Dr. Pedro Campos Rodrigues',
          cpf: '019.647.076-50',
          rg: '19.833.663',
          diagnosis: 'Ortodontia',
          recommended_dentist: 'Odontopediatria',
          email: 'pedro.campos@gmail.com',
          place: 'Andradas',
          picture_url: 'pictures/1/2.jpg',
          registered_date: '2023-12-01 14:02:03',
          completed_date: '2023-12-01 17:38:12',
          status: 'ATIVO'
        },
      ]
    };
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
};
</script>
