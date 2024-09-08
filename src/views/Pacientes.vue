<template>
  <lumi-sidenav :custom_class="color" icon="mdi-account-details" class="fixed-end lumi-sidenav" v-if="showSidenav">
    <sidenav-list-pacientes />
  </lumi-sidenav>

  <div class="main-page-content">
    <!-- <div class="container-fluid mb-4">
      <div class="row">
        <div class="col-md-6">
          <div class="card mt-3" style="border: 1px solid #EEE;">
            <div class="card-body px-3">
              <div class="pb-1 text-start">
                <p class="mb-0" style="font-weight: 400;">Formulários de boas-vindas</p>
              </div>
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
                    <td>
                      <span class="text-sm font-weight-bold">29/05, às 10:33</span>
                    </td>
                    <td>Beatriz Oliveira Martins</td>
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
        <div class="col-md-6">
          <div class="card mt-3" style="border: 1px solid #EEE;">
            <div class="card-body">
              <div class="pb-1 text-start">
                <p class="mb-0" style="font-weight: 400;">Últimos pacientes adicionados</p>
              </div>
              <table class="table-sm w-100 vsm-table">
                <thead>
                  <tr>
                    <th>Adicionado em</th>
                    <th>Paciente</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span class="text-sm font-weight-bold">29/05, às 11:58</span>
                    </td>
                    <td>Luca Mathias Sanches</td>
                  </tr>
                  <tr>
                    <td>
                      <span class="text-sm font-weight-bold">25/05, às 16:12</span>
                    </td>
                    <td>Júlia Simões Manzoli</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div v-if="isLoading.pacientesList" class="w-100 text-center py-5">
      <div class="spinner-border text-primary" role="status">
      </div>
    </div>

    <div v-if="!isLoading.pacientesList && (search != '' || pacientes.length > 0)" class="w-100 text-center mt-4">
      <input type="text" class="search-input" placeholder="Pesquisar..." @input="updateList($event.target.value)"
        v-model="search">
    </div>

    <v-table v-if="!isLoading.pacientesList && pacientes.length == 0" class="m-3">
      <tbody>
        <tr>
          <td class="bg-gradient-light text-dark text-center" style="border-radius: 3px; padding: 2px 20px;">
            <span v-if="search == ''">Ainda não existem pacientes cadastrados.</span>
            <span v-if="search != ''">A busca não encontrou nenhum paciente.</span>
          </td>
        </tr>
      </tbody>
    </v-table>

    <EasyDataTable v-if="pacientes.length > 0" :headers="headers" :items="pacientes" @click-row="openPaciente"
      body-row-class-name="clickable" header-item-class-name="table-header-item" body-item-class-name="table-body-item">

      <template #header-status="header">
        <div class="text-center w-100">
          STATUS DO TRATAMENTO
        </div>
      </template>
      <template #header-city="header">
        <div class="text-center w-100 p-0">
          ORTODONTISTA
        </div>
      </template>

      <template #item-name="{ nome, data_nascimento }">
        <div class="d-flex px-2 py-1">
          <div style="min-width: 40px;" class="d-none d-md-block">
            <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user1" />
          </div>
          <div class="d-flex flex-column justify-content-center">
            <h6 class="mb-0 text-sm">{{ nome }}</h6>
            <p class="text-xs text-bold mb-0">{{ $filters.howMuchTime(data_nascimento, new Date(), false) }}</p>
          </div>
        </div>
      </template>

      <template #item-created_at="{ created_at }">
        <p class="text-xs font-weight-bold mb-0">{{ $filters.dateDmy(created_at) }}</p>
      </template>

      <template #item-status="{ status_tratamento, data_inicio_tratamento, data_final_prevista }">
        <div class="align-middle text-center text-sm">
          <span class="badge badge-sm w-100 w-md-40" :class="statusClass(status_tratamento)"
            v-if="status_tratamento !== 'ATIVO'">{{
              statusText(status_tratamento)
            }}</span>

          <div class="d-flex flex-column align-items-center justify-content-center mt-2"
            v-if="status_tratamento === 'ATIVO'">
            <div class="progress progress-md w-100 w-md-70">
              <div :style="{ width: getProgresso(data_inicio_tratamento, data_final_prevista) + '%' }">
                <div class="progress-bar bg-gradient-success" role="progressbar" aria-valuenow="100" aria-valuemin="0"
                  aria-valuemax="100"></div>
              </div>
            </div>
            <span class="me-2 text-xs font-weight-bold"
              style="margin-top: -19px; background: rgba(255,255,255,0.5); border-radius: 5px; font-weight: 700 !important; padding: 0px 5px;">{{
                getProgresso(data_inicio_tratamento, data_final_prevista) }}%</span>
          </div>
        </div>
      </template>

      <template #item-city="{ dentista }">
        <div class="w-100 text-center">
          <span class="text-xs text-dark font-weight-bold">{{ dentista }}</span>
        </div>
      </template>
    </EasyDataTable>
  </div>

  <div class="modal" tabindex="-1" id="modalAdicionarPacienteDoFormulario">
    <div class="modal-dialog modal-dialog-centered">
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
            <button class="btn btn-primary my-3" data-bs-toggle="modal" data-bs-target="#modalNovoPaciente">
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

  <div class="modal" tabindex="-1" id="modalNovoPaciente" ref="modalNovoPaciente">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Novo paciente</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            ref="closeModalNovoPaciente"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <label>
                <span class="me-1"><font-awesome-icon :icon="['fas', 'user']" /></span>
                Nome:
              </label>
              <MaterialInput type="text" class="form-control" v-model="novoPaciente.nome"
                ref="nome"
                :input="function ($event) { capitalizeAll($event) }" />
            </div>

            <div class="col-md-6 mt-3">
              <label>
                <span class="me-1"><font-awesome-icon :icon="['fas', 'hospital']" /></span>
                Clínica:
              </label>
              <select class="form-select" aria-label="Default select example" v-model="novoPaciente.clinica_id">
                <option hidden selected value="">Selecionar...</option>
                <option value="1">Clínica X</option>
                <option value="2">Clínica Y</option>
                <option value="3">Clínica Z</option>
              </select>
            </div>

            <div class="col-md-6 mt-3">
              <label>
                <span class="me-1"><font-awesome-icon :icon="['fas', 'tooth']" /></span>
                Ortodontista:
              </label>
              <select class="form-select" aria-label="Default select example" v-model="novoPaciente.dentista_id">
                <option hidden selected value="">Selecionar...</option>
                <option value="1">Daniel Salles</option>
                <option value="2">Thales Casa Grande</option>
                <option value="3">Murillo Motta</option>
              </select>
            </div>
            
            <div class="col-md-6 mt-3" style="margin: 0 auto; max-width: 250px;">
              <label>
                <span class="me-1"><font-awesome-icon :icon="['fas', 'phone']" /></span>
                Celular:
              </label>
              <MaterialInput type="text" label="" v-model="novoPaciente.celular"
                :mask="phoneMaskWrapper(novoPaciente.celular)" placeholder="(##) #####-####" />
              <label for="novo-paciente-celular-whatsapp" class="pointer">
                <div class="mt-2">
                  <input type="checkbox" id="novo-paciente-celular-whatsapp" class="mx-1"
                    v-model="novoPaciente.celular_whatsapp">
                  WhatsApp<i class="fab fa-whatsapp ms-2" style="font-size: 13pt;"></i>
                </div>
              </label>
            </div>
            
            <div class="col-md-6 mt-3" style="margin: 0 auto; max-width: 250px;">
              <label>
                <span class="me-1"><font-awesome-icon :icon="['fas', 'globe']" /></span>
                Idioma:
              </label>
              <select name="" id="" class="form-select" v-model="novoPaciente.idioma">
                <option value="pt">Português</option>
                <option value="en">Inglês</option>
                <option value="es">Espanhol</option>
              </select>
            </div>

            <div class="col-12 mt-3">
              <label>
                <span class="me-1"><font-awesome-icon :icon="['fas', 'bars']" /></span>
                Observações:
              </label>
              <textarea name="" class="form-control" rows="5" v-model="novoPaciente.observacoes"></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="_addNovoPaciente">Adicionar</button>
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

import cSwal from "@/utils/cSwal.js"
import { mapMutations, mapState } from "vuex";
import LumiSidenav from "@/views/components/LumiSidenav/index.vue";
import SidenavListPacientes from "@/views/components/LumiSidenav/SidenavListPacientes.vue"
import { addNovoPaciente, searchPacientes } from "@/services/pacientesService"
import { phoneMask } from "@/utils.js";
import MaterialInput from "@/components/MaterialInput.vue";

const headers = [
  { text: "PACIENTE", value: "name", sortable: true },
  { text: "CADASTRADO EM", value: "created_at", sortable: true },
  { text: "STATUS DO TRATAMENTO", value: "status", sortable: true, align: 'center' },
  { text: "LOCALIDADE", value: "city", sortable: true },
];

var nomeNovoPaciente = '';

var pacientes = []

var search = ''

var novoPaciente = {
  idioma: 'pt',
  clinica_id: '',
  dentista_id: '',
  nome: '',
  celular: '',
  celular_whatsapp: true,
}

export default {
  name: "tables",
  components: {
    MaterialInput,
    LumiSidenav,
    SidenavListPacientes,
  },
  async mounted() {
    this.$refs.modalNovoPaciente.addEventListener('shown.bs.modal', event => {
      this.$refs.nome.getInput().focus();
    })
    this.updateList()
  },
  methods: {

    capitalizeAll($event) {
      event.target.value = event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    },

    phoneMaskWrapper(length) {
      return phoneMask(length);
    },

    async updateList(search = '') {
      this.isLoading.pacientesList = true
      this.pacientes = await searchPacientes(search)
      this.isLoading.pacientesList = false
    },
    statusClass(status) {
      const classMap = {
        'NÃO INICIADO': 'bg-gradient-warning',
        'CONCLUÍDO': 'bg-gradient-success',
        'ATIVO': 'bg-gradient-secondary',
      };

      return classMap[status] || '';
    },
    async _addNovoPaciente() {
      const add = await addNovoPaciente(this.novoPaciente)

      if (add) {
        cSwal.cSuccess('O paciente foi adicionado com sucesso!');
      }
      else {
        cSwal.cError('Ocorreu um erro ao tentar adicionar o paciente.');
      }

      await this.updateList(this.search)
      this.$refs.closeModalNovoPaciente.click()
    },
    statusText(status) {
      const textMap = {
        'NÃO INICIADO': 'NÃO INICIADO',
        'CONCLUÍDO': 'CONCLUÍDO',
        'ATIVO': 'EM ANDAMENTO',
      };

      return textMap[status] || '';
    },
    openPaciente(paciente) {
      this.$router.push({
        name: "Paciente",
        params: {
          id: paciente.id
        }
      });
    },
    getProgresso(data_inicio_tratamento, data_final_prevista) {
      if (!data_inicio_tratamento || !data_final_prevista)
        return '-';

      const inicio = new Date(data_inicio_tratamento);
      const termino = new Date(data_final_prevista);
      const hoje = new Date();

      if (hoje < inicio)
        return 0.00;
      if (hoje > termino)
        return 100.00;

      const duracaoTotal = termino.getTime() - inicio.getTime();
      const duracaoAteHoje = hoje.getTime() - inicio.getTime();

      const progresso = (duracaoAteHoje / duracaoTotal) * 100;

      return parseFloat(progresso.toFixed(1));
    },
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
      isLoading: {
        pacientesList: false
      },
      nomeNovoPaciente,
      headers,
      cfg,
      evts,
      pacientes,
      search,
      novoPaciente,
    }
  }
};
</script>
