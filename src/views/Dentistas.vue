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

        <div v-if="isLoading.dentistasList" class="w-100 text-center py-5">
          <div class="spinner-border text-primary" role="status">
          </div>
        </div>

        <v-table v-if="!isLoading.dentistasList && dentistas.length == 0" class="m-3">
          <tbody>
            <tr>
              <td class="bg-gradient-light text-dark text-center" style="border-radius: 3px; padding: 2px 20px;">
                <span v-if="search == ''">Ainda não existem ortodontistas cadastrados.</span>
                <span v-if="search != ''">A busca não encontrou nenhum paciente.</span>
              </td>
            </tr>
          </tbody>
        </v-table>

        <EasyDataTable v-if="dentistas.length > 0" :headers="tableheaders" :items="dentistas" @click-row="openDentista"
          body-row-class-name="clickable" header-item-class-name="table-header-item"
          body-item-class-name="table-body-item">

          <template #header-nome="header">
            <div class="w-100 ps-3">
              ORTODONTISTA
            </div>
          </template>

          <template #item-nome="{ nome }">
            <div class="w-100 ps-3">
              <h6 class="mb-0 text-sm text-bold">{{ nome }}</h6>
            </div>
          </template>

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

          <template #header-pacientes_count="header">
            <div class="w-100 ps-3 text-center">
              PACIENTES
            </div>
          </template>

          <template #item-pacientes_count="{ pacientes_count }">
            <div class="w-100 text-center">
              <span class="badge bg-info mx-auto" style="font-size: 9pt;">
                {{ pacientes_count }}
              </span>
            </div>
          </template>

          <template #item-created_at="{ created_at }">
            <p class="text-xs font-weight-bold mb-0">{{ $filters.dateTime(created_at) }}</p>
          </template>

        </EasyDataTable>
      </div>
    </div>
  </div>


  <div class="modal" tabindex="-1" id="modalNovoDentista" ref="modalNovoDentista">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Novo ortodontista</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            ref="closeModalNovoDentista"></button>
        </div>
        <div class="modal-body px-4">
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

              <select v-if="novoDentista.clinica_id !== 'add'" name="" id="" class="form-select"
                v-model="novoDentista.clinica_id" @change="changeClinica">
                <option hidden selected value="">Selecionar...</option>
                <option v-for="clinica in clinicas" :key="clinica.id" :value="clinica.id">{{ clinica.nome }}</option>
                <option value="add">Nova...</option>
              </select>

              <MaterialInput v-if="novoDentista.clinica_id == 'add'" type="text" placeholder="Nome da nova clínica..."
                ref="novaClinica" :input="function ($event) { capitalizeAll($event) }"
                v-model="novoDentista.novaClinica" />

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
import { getClinicas } from "@/services/clinicasService"

const tableheaders = [
  { text: "ORTODONTISTA", value: "nome", sortable: true },
  { text: "CLÍNICA", value: "clinica.nome", sortable: true },
  { text: "PACIENTES", value: "pacientes_count", sortable: true,/*  align: 'center' */ },
  { text: "E-MAIL", value: "user.email", sortable: true },
  { text: "CADASTRADO EM", value: "created_at", sortable: true },
];

var dentistas = []

var search = ''

function getNovoDentista() {
  return {
    novaClinica: '',
    clinica_id: '',
  }
}

export default {
  name: "Dentistas",
  components: {
    MaterialInput,
    DentistsTable,
    LumiSidenav,
    SidenavListDentistas,
  },
  async mounted() {
    this.clinicas = await getClinicas()

    if (this.$refs.modalNovoDentista) {
      this.$refs.modalNovoDentista.addEventListener('shown.bs.modal', event => {
        this.$refs.nome.getInput().focus();
      })
    }

    this.updateList()
  },
  methods: {
    changeClinica() {
      if (this.novoDentista.clinica_id == 'add') {
        this.$refs.novaClinica.getInput().focus()
      }
    },

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
          this.novoDentista = getNovoDentista()
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
      clinicas: [],
      isLoading: {
        dentistasList: true
      },
      tableheaders,
      search,
      novoDentista: getNovoDentista(),
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
