<template>
  <lumi-sidenav :custom_class="color" icon="mdi-account-details" class="fixed-end lumi-sidenav" v-if="showSidenav">
    <sidenav-list-pacientes />
  </lumi-sidenav>

  <div class="main-page-content">
    <TreatmentsTable :treatments="patients" />

    <EasyDataTable :headers="headers" :items="patients">

      <template #item-name="{ name, email }">
        <div class="d-flex px-2 py-1">
          <div>
            <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user1" />
          </div>
          <div class="d-flex flex-column justify-content-center">
            <h6 class="mb-0 text-sm">{{ name }}</h6>
            <p class="text-xs text-secondary mb-0">{{ email }}</p>
          </div>
        </div>
      </template>

      <template #item-diagnosis="{ diagnosis, recommended_treatment }">
        <p class="text-xs font-weight-bold mb-0">{{ diagnosis }}</p>
        <p class="text-xs text-secondary mb-0">{{ recommended_treatment }}</p>
      </template>

      <template #item-status="{ status, progress }">
        <span class="badge badge-sm" :class="statusClass(status)">{{
          statusText(status)
          }}</span>

        <div class="d-flex flex-column align-items-center justify-content-center mt-2" v-if="status === 'ONGOING'">
          <div>
            <div class="progress">
              <div class="progress-bar bg-gradient-success" role="progressbar" aria-valuenow="100" aria-valuemin="0"
                aria-valuemax="100" style="width: 100%"></div>
            </div>
          </div>
          <span class="me-2 text-xs font-weight-bold">100%</span>
        </div>
      </template>

      <template #item-city="{ place }">
        <span class="text-secondary text-xs font-weight-bold">{{ place }}</span>
      </template>
    </EasyDataTable>
  </div>
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
import TreatmentsTable from "@/views/components/TreatmentsTable.vue";
import LumiSidenav from "@/views/components/LumiSidenav/index.vue";
import SidenavListPacientes from "@/views/components/LumiSidenav/SidenavListPacientes.vue"

const headers = [
  { text: "PACIENTE", value: "name", sortable: true },
  { text: "DIAGNÓSTICO/TRATAMENTO", value: "diagnosis", sortable: true },
  { text: "STATUS DO TRATAMENTO", value: "status", sortable: true },
  { text: "LOCALIDADE", value: "city", sortable: true },
];

export default {
  name: "tables",
  components: {
    TreatmentsTable,
    LumiSidenav,
    SidenavListPacientes,
  },
  methods: {
    statusClass(status) {
      const classMap = {
        'NOT STARTED': 'bg-gradient-warning',
        'COMPLETED': 'bg-gradient-success',
        'ONGOING': 'bg-gradient-secondary',
      };

      return classMap[status] || '';
    },
    statusText(status) {
      const textMap = {
        'NOT STARTED': 'NÃO INICIADO',
        'COMPLETED': 'CONCLUÍDO',
        'ONGOING': 'EM ANDAMENTO',
      };

      return textMap[status] || '';
    }
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
      headers,
      cfg,
      evts,
      patients: [
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
          status: 'COMPLETED',
          progress: 100
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
          status: 'NOT STARTED',
          progress: 100
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
          status: 'ONGOING',
          progress: 100
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
          status: 'ONGOING',
          progress: 100
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
          status: 'ONGOING',
          progress: 100
        },
      ]
    }
  }
};
</script>
