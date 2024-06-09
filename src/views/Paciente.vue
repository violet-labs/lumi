<template>
  <div class="page-width-container">
    <main class="page-width">
      <div class="container-fluid p-0">
        <div class="card no-shadow">
          <div class="card-body p-3">
            <div class="row gx-4">
              <div class="col-auto">
                <div class="avatar avatar-xl position-relative">
                  <img src="../assets/img/team-2.jpg" alt="profile_image" class="shadow-sm w-100 border-radius-lg" />
                </div>
              </div>
              <div class="col-auto my-auto">
                <div class="h-100">
                  <h5 class="mb-1 fs-4">{{ paciente.nome }}</h5>
                  <p class="mb-0 font-weight-bold">{{ $filters.dateYearsMonths(paciente.data_nascimento) }}</p>
                </div>
              </div>
              <div class="mx-auto mt-3 col-md-6 my-sm-auto ms-sm-auto me-sm-0">
                <div class="nav-wrapper position-relative end-0">
                  <ul class="p-1 bg-transparent nav nav-pills nav-fill" role="tablist">
                    <li class="nav-item" @click="openTab('perfil')">
                      <a class="px-0 py-1 mb-0 nav-link nav-tab active" data-bs-toggle="tab" href="javascript:;"
                        role="tab" aria-selected="true">
                        <i class="fas fa-user"></i>
                        <br>
                        <span class="ms-1">Perfil</span>
                      </a>
                    </li>
                    <li class="nav-item" @click="openTab('tratamento')">
                      <a class="px-0 py-1 mb-0 nav-link nav-tab" data-bs-toggle="tab" href="javascript:;" role="tab"
                        aria-selected="false">
                        <i class="fas fa-teeth-open"></i>
                        <br>
                        <span class="ms-1">Tratamento</span>
                      </a>
                    </li>
                    <li class="nav-item" @click="openTab('consultas')">
                      <a class="px-0 py-1 mb-0 nav-link nav-tab" data-bs-toggle="tab" href="javascript:;" role="tab"
                        aria-selected="false">
                        <i class="fas fa-calendar-alt"></i>
                        <br>
                        <span class="ms-1">Consultas</span>
                      </a>
                    </li>
                    <li class="nav-item" @click="openTab('financeiro')">
                      <a class="px-0 py-1 mb-0 nav-link nav-tab" data-bs-toggle="tab" href="javascript:;" role="tab"
                        aria-selected="false">
                        <i class="fas fa-dollar-sign"></i>
                        <br>
                        <span class="ms-1">Financeiro</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transition>
        <div class="p-0 container-fluid" v-if="activeTab == 'perfil'">
          <div class="row">
            <div class="col-md-12">
              <Transition>
                <div class="main-container" v-if="activeProfileTab == 'perfilPessoal'">
                  <div class="row p-3 pt-1 pb-4 w-100 mx-auto">
                    <div class="col-md-6 border-end pe-4">
                      <p class="text-uppercase text-sm mt-3" style="font-weight: 600">Informações pessoais</p>
                      <div class="row mt-4">
                        <div class="col-md-6 mb-2">
                          <label for="paciente_dentista" class="form-control-label">Dentista padrão</label>
                          <select class="form-select" id="paciente_dentista">
                            <option hidden>Selecionar...</option>
                            <option value="1" selected>Daniel Salles</option>
                            <option value="2">Thales Casa Grande</option>
                            <option value="3">Murillo Motta</option>
                          </select>
                        </div>
                        <div class="col-md-6 mb-2">
                          <material-input label="Nascimento" type="date" v-bind:value="paciente.data_nascimento"
                            id="paciente_dataNacsimento" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <material-input type="text" label="Objetivo do tratamento"
                            v-bind:value="paciente.objetivo_tratamento" id="paciente_objetivoTratamento" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <material-input label="CPF" type="text" v-bind:value="paciente.cpf" id="paciente_cpf" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <material-input label="Convênio" type="text" v-bind:value="paciente.id_convenio"
                            id="paciente_convenio" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <material-input label="Clínica" type="text" v-bind:value="paciente.id_clinica"
                            id="paciente_clinica" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <material-input label="Como conheceu a clínica" type="text"
                            v-bind:value="paciente.como_conheceu" id="paciente_como_conheceu" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <material-input label="Indicado por" type="text" v-bind:value="paciente.indicado_por"
                            id="paciente_indicado_por" />
                        </div>
                      </div>

                      <p class="text-uppercase text-sm mt-3" style="font-weight: 600"><label
                          for="paciente_observacoes">Observações</label></p>
                      <textarea class="form-control" id="paciente_observacoes" rows="2" v-model="paciente.observacoes">
                      </textarea>
                    </div>
                    <div class="col-md-6 ps-4">

                      <hr class="horizontal dark" />
                      <p class="text-uppercase text-sm mt-3 mb-2" style="font-weight: 600">Meios de contato<font-awesome-icon :icon="['fas', 'edit']" class="ms-2 pointer"
                          title="Gerenciar meios de contato" /></p>
                      <v-table style="font-size: 12pt;">
                        <thead>
                          <tr>
                            <th><label>Contato</label></th>
                            <th style="width: 50%;"><label>Descrição</label></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <a href="#" class="hoverable">
                                <span class="d-inline-block text-center" style="width: 30px;">
                                  <font-awesome-icon :icon="['fab', 'whatsapp']" class="text-success me-2"
                                    style="font-size: 15pt;" />
                                </span>
                                (35) 99108-4588
                              </a>
                            </td>
                            <td>WhatsApp particular</td>
                          </tr>
                          <tr>
                            <td>
                              <span class="d-inline-block text-center" style="width: 30px;">
                                <!-- <font-awesome-icon icon="fa-solid fa-mobile-screen-button" class="me-2" style="font-size: 15pt;" /> -->
                                <v-icon class="me-2" style="font-size: 17pt;">mdi-phone</v-icon>
                              </span>
                              (35) 95822-6675
                            </td>
                            <td>Thaís (irmã)</td>
                          </tr>
                          <tr>
                            <td>
                              <a href="#" class="hoverable">
                                <span class="d-inline-block text-center" style="width: 30px;">
                                  <font-awesome-icon icon="fa-solid fa-envelope" class="me-2"
                                    style="font-size: 14pt;" />
                                </span>
                                thales-lima@live.com
                              </a>
                            </td>
                            <td>E-mail particular</td>
                          </tr>
                          <tr>
                            <td style="vertical-align: middle;">
                              <div class="d-flex flex-row align-center">
                                <div class="dropdown text-center">
                                  <span data-bs-toggle="dropdown" class="pointer dropdown-toggle">
                                    <font-awesome-icon :icon="['fas', 'mobile-screen-button']"
                                      style="font-size: 15pt; margin-right: 3px;" />
                                  </span>
                                  <ul class="dropdown-menu dropdown-menu-icons hidden">
                                    <li title="E-mail">
                                      <a class="dropdown-item dropdown-item-sm" href="#">
                                        <font-awesome-icon icon="fa-solid fa-envelope" style="font-size: 14pt;" />
                                      </a>
                                    </li>
                                    <li title="Telefone">
                                      <a class="dropdown-item dropdown-item-sm" href="#">
                                        <v-icon style="font-size: 17pt;">mdi-phone</v-icon>
                                      </a>
                                    </li>
                                    <li title="Celular">
                                      <a class="dropdown-item dropdown-item-sm" href="#">
                                        <font-awesome-icon :icon="['fas', 'mobile-screen-button']"
                                          style="font-size: 15pt; margin-right: 3px;" />
                                      </a>
                                    </li>
                                    <li title="WhatsApp">
                                      <a class="dropdown-item" href="#">
                                        <font-awesome-icon :icon="['fab', 'whatsapp']" class="text-success"
                                          style="font-size: 15pt;" />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <input type="text" class="form-control input-sm"
                                  style="display: inline-block; width: calc(100% - 30px);">
                              </div>
                            </td>
                            <td style="vertical-align: middle; padding-top: 5px;">
                              <input type="text" class="form-control input-sm"
                                style="display: inline; width: calc(100% - 51px);">
                              <button class="btn btn-sm btn-primary mt-2" style="width: 46px; margin-left: 5px;">
                                <font-awesome-icon :icon="['fas', 'plus']" />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </v-table>

                      <div class="p-horizontal-divider"></div>

                      <p class="text-uppercase text-sm mt-3" style="font-weight: 600">Endereço</p>
                      <div class="row">
                        <div class="col-md-4 mb-2">
                          <material-input label="CEP" type="text" v-bind:value="paciente.endereco_cep"
                            id="paciente_enderecoCep" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <material-input label="Logradouro" type="text" v-bind:value="paciente.endereco_logradouro"
                            id="paciente_enderecoLogradouro" />
                        </div>
                        <div class="col-md-2 mb-2">
                          <material-input label="Nº" type="text" v-bind:value="paciente.endereco_numero"
                            id="paciente_enderecoNumero" />
                        </div>
                        <div class="col-md-4">
                          <material-input label="Complemento" type="text" v-bind:value="paciente.endereco_complemento"
                            id="paciente_enderecoComplemento" />
                        </div>
                        <div class="col-md-4">
                          <material-input label="Cidade" type="text" v-bind:value="paciente.endereco_cidade"
                            id="paciente_enderecoCidade" />
                        </div>
                        <div class="col-md-4">
                          <material-input label="Estado" type="text" v-bind:value="paciente.endereco_estado"
                            id="paciente_enderecoEstado" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row p-0 w-100 mx-auto"
                    style="border-top: 1px solid #EEE; background: linear-gradient(to bottom, #d7e6ef, #e6eff4,  #e6eff4, #FFF, #FFF);">
                    <div class="col-12 text-center mb-1 p-3 m-0"
                      style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.1))">
                      <span class="fs-5" style="">Detalhes do paciente</span>
                    </div>

                    <div class="col-12">
                      <div class="row p-0">

                        <div v-for="(perceptions, categoria) in personalPerceptions" v-bind:key="perceptions"
                          class="col-sm-6 col-md-4 mt-2">
                          <div class="card">
                            <div class="card-header pb-2">
                              <p class="text-uppercase text-sm" style="font-weight: 600">{{ categoria }}</p>
                            </div>
                            <div class="card-body m-0 pt-2">
                              <div class="info-container" v-for="perception in perceptions" v-bind:key="perception.text"
                                :class="perception.type">
                                <div style="width: 30px; text-align: center;">
                                  <font-awesome-icon :icon="['fas', getInfoIcon(perception.type)]" />
                                </div>
                                <div class="">
                                  <span>{{ perception.text }}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </Transition>
              <Transition>
                <div v-if="activeProfileTab == 'perfilClinico'">
                </div>
              </Transition>
            </div>
            <!-- <div class="col-md-4">
          <profile-card />
        </div> -->
          </div>
        </div>
      </Transition>

      <Transition>
        <Tratamento v-if="activeTab == 'tratamento'" :paciente="paciente" :personalPerceptions="personalPerceptions" />
      </Transition>

      <Transition>
        <div class="py-4 container-fluid" v-if="activeTab == 'consultas'">

          <div class="row">
            <div class="col-sm-6 col-md-3 text-center">
              <material-input label="Total de consultas" readonly centered type="text"
                v-bind:value="paciente.total_consultas ? paciente.total_consultas : 0" id="paciente_proximaConsulta" />
            </div>
            <div class="col-sm-6 col-md-3 text-center">
              <material-input label="Primeira consulta" readonly centered type="text"
                v-bind:value="$filters.dateDmy(paciente.primeira_consulta)" id="paciente_primeiraConsulta" />
              <span>há 4 anos</span>
            </div>
            <div class="col-sm-6 col-md-3 text-center">
              <material-input label="Última consulta" readonly centered type="text"
                v-bind:value="$filters.dateDmy(paciente.ultima_consulta)" id="paciente_ultimaConsulta" />
              <span>há 1 mês</span>
            </div>
            <div class="col-sm-6 col-md-3 text-center">
              <material-input label="Próxima consulta" readonly centered type="text"
                v-bind:value="$filters.dateDmy(paciente.proxima_consulta)" id="paciente_proximaConsulta" />
              <span class="text-success" style="font-weight: 500;">Hoje!</span>
            </div>
          </div>

          <div class="p-horizontal-divider"></div>

          <div class="row">
            <div class="col-md-12">
              <v-table>
                <tbody>
                  <tr>
                    <td class="bg-gradient-light text-dark text-center" style="border-radius: 3px; padding: 2px 20px;">
                      Ainda não foram agendadas consultas.
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
            <!-- <div class="col-md-4">
          <profile-card />
        </div> -->
          </div>
        </div>
      </Transition>

      <Transition>
        <div class="py-4 container-fluid" v-if="activeTab == 'financeiro'">
          <div class="row">
            <div class="col-md-12">
              <v-table>
                <tbody>
                  <tr>
                    <td class="bg-gradient-success text-light text-center"
                      style="border-radius: 3px; padding: 2px 20px;">
                      Não há pendências financeiras.
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
            <!-- <div class="col-md-4">
          <profile-card />
        </div> -->
          </div>
        </div>
      </Transition>
    </main>
  </div>
</template>

<script>


import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
// import ProfileCard from "./components/ProfileCard.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { useRoute } from 'vue-router';
import Tratamento from "@/views/Tratamento.vue"
import { getPaciente } from "@/services/pacientesService"

const body = document.getElementsByTagName("body")[0];

var paciente = {}

var showTratamento = false;

var activeProfileTab = 'perfilPessoal';

var personalPerceptions = {
  'Sobre aparelho': [
    {
      type: 'good',
      text: 'Acha legal usar aparelho'
    },
  ],
  'Hábitos': [
    {
      type: 'bad',
      text: 'Roe unhas'
    },
    {
      type: 'bad',
      text: 'Chupou chupeta'
    }
  ],
  'Histórico': [
    {
      type: 'attention',
      text: 'Já bateu os dentes'
    },
    {
      type: 'neutral',
      text: 'Já fez outros tratamentos'
    }
  ],
  'Saúde': [
    {
      type: 'attention',
      text: 'Toma medicação controlada'
    },
    {
      type: 'attention',
      text: 'Possui pressão alta'
    }
  ],
}

var activeTab = 'perfil'

export default {
  name: "profile",
  components: {
    // ProfileCard,
    MaterialInput,
    MaterialButton,
    Tratamento,
    FontAwesomeIcon,
  },
  data() {
    return {
      showMenu: false,
      paciente,
      showTratamento,
      activeTab,
      activeProfileTab,
      personalPerceptions
    };
  },
  methods: {
    getInfoIcon(type) {
      var icon = null
      switch (type) {
        case 'good':
          icon = 'thumbs-up'
          break
        case 'bad':
          icon = 'thumbs-down'
          break
        case 'attention':
          icon = 'circle-exclamation'
          break
        case 'neutral':
          icon = 'info-circle'
          break
      }

      return icon
    },
    setProfileTab(tab) {
      this.activeProfileTab = tab
    },
    openTab(tab) {
      this.activeTab = tab;
    },
    async getPacienteDetails(id) {
      const paciente = await getPaciente(id)
      if (paciente)
        this.paciente = paciente
    }
  },

  async mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
    await this.getPacienteDetails(this.$route.params.id);
  },
  async beforeMount() {
  },
  beforeUnmount() {
  }
};
</script>
