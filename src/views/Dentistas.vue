<template>
  <lumi-sidenav icon="mdi-doctor" class="fixed-end lumi-sidenav" v-if="showSidenav">
    <sidenav-list-dentistas />
  </lumi-sidenav>

  <div class="main-page-content">
    <div class="row">
      <div class="col-12">

        <div v-if="isLoading.dentistasList" class="w-100 text-center py-5">
          <div class="spinner-border text-primary" role="status">
          </div>
        </div>
        <div v-if="!isLoading.dentistasList && (search != '' || dentistas.length > 0)" class="w-100 text-center mt-4">
          <input type="text" class="search-input" placeholder="Pesquisar..." @input="updateList($event.target.value)"
            v-model="search">
        </div>

        <v-table v-if="!isLoading.dentistasList && dentistas.length == 0" class="m-3">
          <tbody>
            <tr>
              <td class="bg-gradient-light text-dark text-center" style="border-radius: 3px; padding: 2px 20px;">
                <span v-if="search == ''">Ainda não existem pacientes cadastrados.</span>
                <span v-if="search != ''">A busca não encontrou nenhum paciente.</span>
              </td>
            </tr>
          </tbody>
        </v-table>

        <EasyDataTable v-if="dentistas.length > 0" :headers="tableheaders" :items="dentistas" @click-row="openDentista"
          body-row-class-name="clickable" header-item-class-name="table-header-item"
          body-item-class-name="table-body-item">

          <template #header-pacientes="header">
            <div class="text-center w-100">
              PACIENTES
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


  <div class="modal" tabindex="-1" id="modalNovoDentista" ref="modalNovoDentista">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Novo dentista</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            ref="closeModalNovoDentista"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-7">
              <label>
                <span class="me-1"><font-awesome-icon :icon="['fas', 'user']" /></span>
                Nome:
              </label>

              <MaterialInput type="text" v-model="novoDentista.nome" ref="nome"
                :input="function ($event) { capitalizeAll($event) }" />
            </div>

            <div class="col-md-5">
              <label>
                <span class="me-1"><font-awesome-icon :icon="['fas', 'hospital']" /></span>
                Clínica:
              </label>
              <select name="" id="" class="form-select" v-model="novoDentista.clinica_id">
                <option value="1">Clinica X</option>
                <option value="2">Clinica Y</option>
                <option value="3">Clinica Z</option>
              </select>
            </div>

            <div class="col-md-7 mt-3">
              <label>
                <span class="me-1"><font-awesome-icon :icon="['fas', 'envelope']" /></span>
                E-mail:
              </label>
              <MaterialInput type="email" v-model="novoDentista.email" />
            </div>
            <div class="col-md-5 mt-3">
              <label>
                <span class="me-1">
                  <font-awesome-icon :icon="['fas', 'lock']" />
                </span>
                Senha:
              </label>
              <MaterialInput type="password" v-model="novoDentista.senha" />
            </div>
            <div class="col-12 mt-3">
              <label>
                <span class="me-1"><font-awesome-icon :icon="['fas', 'bars']" /></span>
                Observações:
              </label>
              <textarea name="" id="novoDentista_observacoes" class="form-control" rows="5"
                v-model="novoDentista.observacoes"></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="confirmAddNovoDentista">Adicionar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cSwal from "@/utils/cSwal.js"
import MaterialInput from "@/components/MaterialInput.vue";
import { mapMutations, mapState } from "vuex";
import DentistsTable from "./components/DentistsTable.vue";
import LumiSidenav from "@/views/components/LumiSidenav/index.vue";
import SidenavListDentistas from "@/views/components/LumiSidenav/SidenavListDentistas.vue"
import { addNovoDentista, searchDentistas } from "@/services/dentistasService"

const tableheaders = [
  { text: "DENTISTA", value: "nome", sortable: true },
  { text: "CLÍNICA", value: "clinica.nome", sortable: true },
  { text: "PACIENTES", value: "pacientes_count", sortable: true,/*  align: 'center' */ },
  { text: "E-MAIL", value: "user.email", sortable: true },
];

var dentistas = []

var search = ''

export default {
  name: "Dentistas",
  components: {
    MaterialInput,
    DentistsTable,
    LumiSidenav,
    SidenavListDentistas,
  },
  async mounted() {

    this.$refs.modalNovoDentista.addEventListener('shown.bs.modal', event => {
      this.$refs.nome.getInput().focus();
    })

    this.updateList()
  },
  methods: {
    capitalizeAll($event) {
      event.target.value = event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    },
    async updateList(search = '') {
      this.isLoading.dentistasList = true
      this.dentistas = await searchDentistas(search)
      this.isLoading.dentistasList = false
    },
    confirmAddNovoDentista() {
      cSwal.cConfirm('Deseja realmente adicionar este ortodontista?', async () => {
        cSwal.loading('Adicionando ortodontista...')
        const add = await addNovoDentista(this.novoDentista)
        cSwal.loaded()

        if (add) {
          cSwal.cSuccess('O ortodontista foi adicionado.')
        }
        else {
          cSwal.cError('Ocorreu um erro ao adicionar o ortodontista.')
        }

        await this.updateList(this.search)
        this.$refs.closeModalNovoDentista.click()
      })
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
      isLoading: {
        dentistasList: false
      },
      tableheaders,
      search,
      novoDentista: {},
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
