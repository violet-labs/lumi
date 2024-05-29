<template>
  <lumi-sidenav :custom_class="color" icon="mdi-account-details" class="fixed-end lumi-sidenav" v-if="showSidenav">
    <sidenav-list-pacientes />
  </lumi-sidenav>

  <div class="main-page-content">
    <div class="container-fluid mb-4">
      <div class="row">
        <div class="col-md-12 col-lg-4">
          <div class="card mt-3" style="border: 1px solid #DDD;">
            <div class="card-body p-2 px-3">
              <label for="" class="fs-6 fw-5">Últimos formulários</label>
              <table class="table-sm w-100 vsm-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Paciente</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>29/05, às 10:33h</td>
                    <td>Beatriz Oliveira Martins</td>
                    <td>
                      <button class="btn btn-success btn-sm" title="Adicionar paciente" style="padding: 4px 8px;" data-bs-toggle="modal" data-bs-target="#modalAdicionarPacienteDoFormulario"><i
                          class="fas fa-plus me-1" style="font-size: 7pt"></i><i class="fas fa-user d-none d-md-inline"
                          style="font-size: 10pt"></i></button>
                    </td>
                  </tr>
                  <tr>
                    <td>29/05, às 13:48h</td>
                    <td>Thales Casa Grande</td>
                    <td>
                      <button class="btn btn-success btn-sm" title="Adicionar paciente" style="padding: 4px 8px;" data-bs-toggle="modal" data-bs-target="#modalAdicionarPacienteDoFormulario"><i
                          class="fas fa-plus me-1" style="font-size: 7pt"></i><i class="fas fa-user d-none d-md-inline"
                          style="font-size: 10pt"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="card mt-3" style="border: 1px solid #DDD;">
            <div class="card-body">
              <label for="" class="fs-6 fw-5">Últimos pacientes adicionados</label>
              <table class="table-sm w-100 vsm-table">
                <thead>
                  <tr>
                    <th>Adicionado em</th>
                    <th>Paciente</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>hoje, às 11:58h</td>
                    <td>Luca Mathias Sanches</td>
                  </tr>
                  <tr>
                    <td>25/05, às 16:12h</td>
                    <td>Júlia Simões Manzoli</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="card mt-3" style="border: 1px solid #DDD;">
            <div class="card-body">
              <label for="" class="fs-6 fw-5">Próximos a consultar</label>
              <table class="table-sm w-100 vsm-table">
                <thead>
                  <tr>
                    <th>Consulta</th>
                    <th>Paciente</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>hoje, às 17:00h</td>
                    <td>Thales Casa Grande</td>
                  </tr>
                  <tr>
                    <td>hoje, às 17:30h</td>
                    <td>Graziela Ramos dos Santos</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <EasyDataTable :headers="headers" :items="patients" @click-row="openPaciente" body-row-class-name="clickable"
      header-item-class-name="table-header-item" body-item-class-name="table-body-item">

      <template #header-status="header">
        <div class="text-center w-100">
          STATUS DO TRATAMENTO
        </div>
      </template>
      <template #header-city="header">
        <div class="text-center w-100 p-0">
          LOCALIDADE
        </div>
      </template>

      <template #item-name="{ name, email }">
        <div class="d-flex px-2 py-1">
          <div style="min-width: 40px;" class="d-none d-md-block">
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
        <div class="align-middle text-center text-sm">
          <span class="badge badge-sm" :class="statusClass(status)" v-if="status !== 'ONGOING'">{{
            statusText(status)
            }}</span>

          <div class="d-flex flex-column align-items-center justify-content-center mt-2" v-if="status === 'ONGOING'">
            <div class="progress" style="width: 50%;">
              <div class="progress-bar bg-gradient-success" role="progressbar" aria-valuenow="100" aria-valuemin="0"
                aria-valuemax="100" :style="{ width: progress + '%' }"></div>
            </div>
            <span class="me-2 text-xs font-weight-bold"
              style="margin-top: -13px; background: rgba(255,255,255,0.5); border-radius: 50%; font-weight: 700 !important; padding: 2px;">{{
              progress }}%</span>
          </div>
        </div>
      </template>

      <template #item-city="{ place }">
        <div class="w-100 text-center">
          <span class="text-secondary text-xs font-weight-bold">{{ place }}</span>
        </div>
      </template>
    </EasyDataTable>
  </div>

  <div class="modal" tabindex="-1" id="modalAdicionarPacienteDoFormulario">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Adicionar paciente</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body py-4">
          <div class="d-flex flex-column">
            <button class="btn btn-secondary my-3">
              <i class="fas fa-user me-2"></i>
              Vincular a paciente existente
            </button>
            <button class="btn btn-primary my-3">
              <i class="fas fa-plus me-2"></i>
              Criar novo paciente
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-bs-dismiss="modal">Voltar</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" tabindex="-1" id="modalNovoPaciente">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Novo paciente</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <label>
                <span class="me-1"><font-awesome-icon :icon="['fas', 'user']" /></span>
                Nome:
              </label>
              <input type="text" class="form-control" v-bind="nomeNovoPaciente">
            </div>

            <div class="col-md-6 mt-3">
              <label>
                <span class="me-1"><font-awesome-icon :icon="['fas', 'phone']" /></span>
                Celular:
              </label>
              <input type="text" class="form-control">
            </div>
            <div class="col-md-6 mt-3">
              <label>
                <span class="me-1"><font-awesome-icon :icon="['fas', 'tooth']" /></span>
                Dentista:
              </label>
              <select class="form-select" aria-label="Default select example">
                <option hidden selected>Selecionar...</option>
                <option value="1">Daniel Salles</option>
                <option value="2">Thales Casa Grande</option>
                <option value="3">Murillo Motta</option>
              </select>
            </div>
            <div class="col-12 mt-3">
              <label>
                <span class="me-1"><font-awesome-icon :icon="['fas', 'bars']" /></span>
                Observações:
              </label>
              <textarea name="" id="novoPaciente_observacoes" class="form-control" rows="5"></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="addNovoPaciente">Adicionar</button>
        </div>
      </div>
    </div>
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
import LumiSidenav from "@/views/components/LumiSidenav/index.vue";
import SidenavListPacientes from "@/views/components/LumiSidenav/SidenavListPacientes.vue"
import { novoPaciente, getAllPacientes } from "@/services/pacientesService"

const headers = [
  { text: "PACIENTE", value: "name", sortable: true },
  { text: "DIAGNÓSTICO/TRATAMENTO", value: "diagnosis", sortable: true },
  { text: "STATUS DO TRATAMENTO", value: "status", sortable: true, align: 'center' },
  { text: "LOCALIDADE", value: "city", sortable: true },
];

var nomeNovoPaciente = '';

var pacientes = []

export default {
  name: "tables",
  components: {
    LumiSidenav,
    SidenavListPacientes,
  },
  async mounted() {
    this.pacientes = await getAllPacientes()

    console.log('this.pacientes:', this.pacientes)
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
    async addNovoPaciente() {
      console.log('aaaaaa');
      await novoPaciente()
    },
    statusText(status) {
      const textMap = {
        'NOT STARTED': 'NÃO INICIADO',
        'COMPLETED': 'CONCLUÍDO',
        'ONGOING': 'EM ANDAMENTO',
      };

      return textMap[status] || '';
    },
    openPaciente(paciente) {
      console.log('paciente:', paciente)
      console.log('paciente.name:', paciente.name)
      this.$router.push({
        name: "Profile",
        params: { paciente: JSON.stringify(paciente) }
      });
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
      nomeNovoPaciente,
      headers,
      cfg,
      evts,
      pacientes,
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
          progress: 12
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
          progress: 86
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
          progress: 95
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
          progress: 18
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
          progress: 26
        },
      ]
    }
  }
};
</script>
