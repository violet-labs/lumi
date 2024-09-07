<template>
  <lumi-sidenav icon="mdi-doctor" class="fixed-end lumi-sidenav" v-if="showSidenav">
    <sidenav-list-dentistas />
  </lumi-sidenav>

  <div class="main-page-content">
    <div class="row">
      <div class="col-12">


        <div class="w-100 text-center mt-4">
          <input type="text" class="search-input" placeholder="Pesquisar..." @input="updateList($event.target.value)"
            v-model="search">
        </div>

        <EasyDataTable :headers="tableheaders" :items="dentistas" @click-row="openDentista"
          body-row-class-name="clickable" header-item-class-name="table-header-item"
          body-item-class-name="table-body-item">

          <template #header-status="header">
            <div class="text-center w-100">
              STATUS
            </div>
          </template>

          <template #header-pacientes="header">
            <div class="text-center w-100">
              PACIENTES
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

          <template #item-pacientes="{ pacientes }">
            <div class="align-middle text-center text-sm">
              {{ pacientes }}
            </div>
          </template>

          <template #item-status="{ status }">
            <div class="align-middle text-center text-sm">
              <span class="badge badge-sm w-100 w-md-70" :class="statusClass(status)">
                {{ statusText(status) }}
              </span>
            </div>
          </template>

        </EasyDataTable>
      </div>
    </div>
  </div>


  <div class="modal" tabindex="-1" id="modalNovoDentista">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Novo dentista</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            ref="closeModalNovoDentista"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <label>
                <span class="me-1"><font-awesome-icon :icon="['fas', 'user']" /></span>
                Nome:
              </label>
              <input type="text" class="form-control" v-model="novoDentista.nome">
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
                <span class="me-1">
                  <font-awesome-icon :icon="['fas', 'tooth']" />
                </span>
                Especialidade:
              </label>
              <select class="form-select" aria-label="Default select example">
                <option hidden selected>Selecionar...</option>
                <option value="1">Ortodontia</option>
                <option value="2">Endodontia</option>
                <option value="3">Clínico geral</option>
                <option value="4">Odontopediatria</option>
                <option value="5">Periodontia</option>
                <option value="6">Protese dentária</option>
                <option value="7">Cirurgia bucomaxilofacial</option>
              </select>
            </div>
            <div class="col-12 mt-3">
              <label>
                <span class="me-1"><font-awesome-icon :icon="['fas', 'bars']" /></span>
                Observações:
              </label>
              <textarea name="" id="novoDentista_observacoes" class="form-control" rows="5"></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="addNovoDentista">Adicionar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapState } from "vuex";
import DentistsTable from "./components/DentistsTable.vue";
import LumiSidenav from "@/views/components/LumiSidenav/index.vue";
import SidenavListDentistas from "@/views/components/LumiSidenav/SidenavListDentistas.vue"
import { addNovoDentista, searchDentistas } from "@/services/dentistasService"

const tableheaders = [
  { text: "DENTISTA", value: "name", sortable: true },
  { text: "ESPECIALIDADE", value: "especialidade", sortable: true },
  { text: "PACIENTES", value: "pacientes", sortable: true,/*  align: 'center' */ },
  { text: "STATUS", value: "status", sortable: true },
  { text: "CLÍNICA", value: "clinica.nome", sortable: true },
];

var dentistas = [
  {
    id: 1,
    name: 'Dr. Eduardo Carvalho Silva',
    cpf: '019.647.076-50',
    rg: '19.833.663',
    data_nascimento: '1992-02-12',
    especialidade: 'Ortodontia',
    email: 'contato@eduardosilva.com.br',
    place: 'Poços de Caldas',
    picture_url: 'pictures/1/1.jpg',
    registered_date: '2023-11-01 14:02:03',
    completed_date: '2023-11-01 17:38:12',
    status: 'ATIVO',
    pacientes: 0,
    clinica: {
      nome: 'Clinica X',
    },
  },
  {
    id: 2,
    name: 'Dr. Thales Casa Grande',
    cpf: '019.647.076-50',
    rg: '19.833.663',
    data_nascimento: '1991-02-12',
    especialidade: 'Ortodontia',
    email: 'thales-lima@live.com',
    place: 'Poços de Caldas',
    picture_url: 'pictures/1/2.jpg',
    registered_date: '2023-12-01 14:02:03',
    completed_date: '2023-12-01 17:38:12',
    status: 'ATIVO',
    pacientes: 0,
    clinica: {
      nome: 'Clinica Y',
    },
  },
  {
    id: 3,
    name: 'Dr. Pedro Campos Rodrigues',
    cpf: '019.647.076-50',
    rg: '19.833.663',
    data_nascimento: '1990-02-12',
    especialidade: 'Endodontia',
    email: 'pedro.campos@gmail.com',
    place: 'Andradas',
    picture_url: 'pictures/1/2.jpg',
    registered_date: '2023-12-01 14:02:03',
    completed_date: '2023-12-01 17:38:12',
    status: 'ATIVO',
    pacientes: 0,
    clinica: {
      nome: 'Clinica Z',
    },
  },
]

var search = ''

var novoDentista = {
  nome: ''
}

export default {
  name: "Dentistas",
  components: {
    DentistsTable,
    LumiSidenav,
    SidenavListDentistas,
  },
  async mounted() {
    this.updateList()
  },
  methods: {
    async updateList(search = '') {
      // this.dentistas = await searchDentistas(search)
    },
    async addNovoDentista() {
      await addNovoDentista({
        nome: this.novoDentista.nome,
      })
      await this.updateList(this.search)
      this.$refs.closeModalNovoDentista.click()
    },
    statusClass(status) {
      const classMap = {
        'INATIVO': 'bg-gradient-danger',
        'ATIVO': 'bg-gradient-success',
      };

      return classMap[status] || '';
    },
    statusText(status) {
      const textMap = {
        'INATIVO': 'INATIVO',
        'ATIVO': 'ATIVO',
      };

      return textMap[status] || '';
    },
    openDentista(dentista) {
      this.$router.push({
        name: "Dentista",
        params: {
          id: dentista.id
        }
      });
    },
  },
  data() {
    return {
      tableheaders,
      search,
      novoDentista,
      dentistas,
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
