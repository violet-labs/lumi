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
                  <h5 class="mb-1 fs-4">{{ paciente.name }}</h5>
                  <p class="mb-0 font-weight-bold">27 anos e 6 meses</p>
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
              <div class="selector-tab-container">
                <div class="selector-tab-item" :class="activeProfileTab == 'perfilPessoal' ? 'active' : ''"
                  @click="setProfileTab('perfilPessoal')">
                  <font-awesome-icon :icon="['fas', 'id-card-clip']" />
                  <br>
                  Perfil pessoal
                </div>
                <div class="selector-tab-divider">
                  &nbsp;
                </div>
                <div class="selector-tab-item" :class="activeProfileTab == 'perfilClinico' ? 'active' : ''"
                  @click="setProfileTab('perfilClinico')">
                  <font-awesome-icon :icon="['fas', 'id-card']" />
                  <br>
                  Perfil clínico
                </div>
              </div>

              <Transition>
                <div class="main-container" v-if="activeProfileTab == 'perfilPessoal'">
                  <div class="row p-3 pt-0 w-100 mx-auto">
                    <div class="col-md-6">

                      <p class="text-uppercase text-sm mt-3" style="font-weight: 600">Informações pessoais</p>
                      <div class="row">
                        <div class="col-md-7">
                          <label for="example-text-input" class="form-control-label">Dentista padrão</label>
                          <select class="form-select" aria-label="Default select example">
                            <option hidden>Selecionar...</option>
                            <option value="1" selected>Daniel Salles</option>
                            <option value="2">Thales Casa Grande</option>
                            <option value="3">Murillo Motta</option>
                          </select>
                        </div>
                        <div class="col-md-5 mb-2">
                          <label for="example-text-input" class="form-control-label">Nascimento</label>
                          <material-input type="date" value="1996-12-02" />
                        </div>
                        <div class="col-md-7 mb-2">
                          <label for="example-text-input" class="form-control-label">Objetivo do tratamento</label>
                          <material-input type="text" value="" />
                        </div>
                        <div class="col-md-5">
                          <label for="example-text-input" class="form-control-label">CPF</label>
                          <material-input type="text" value="019.647.076-50" />
                        </div>
                        <div class="col-md-7">
                          <label for="example-text-input" class="form-control-label">Convênio</label>
                          <material-input type="text" value="Uniodonto" />
                        </div>
                        <div class="col-md-5">
                          <label for="example-text-input" class="form-control-label">Clínica</label>
                          <material-input type="text" value="Instituto Daniel Salles" />
                        </div>
                      </div>
                      <p class="text-uppercase text-sm mt-3" style="font-weight: 600">Consultas</p>
                      <div class="row">
                        <div class="col-md-4">
                          <label for="example-text-input" class="form-control-label">Primeira consulta</label>
                          <material-input disabled type="date" value="2019-11-16" />
                          <div class="w-100"><span>há 4 anos</span>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <label for="example-text-input" class="form-control-label">Última consulta</label>
                          <material-input disabled type="date" value="2024-04-20" />
                          <div class="w-100"><span>há 1 mês</span>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <label for="example-text-input" class="form-control-label">Próxima consulta</label>
                          <material-input disabled type="date" value="2024-05-29" />
                          <div class="w-100"><span class="text-success" style="font-weight: 500;">Hoje!</span></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">

                      <hr class="horizontal dark" />
                      <p class="text-uppercase text-sm mt-3" style="font-weight: 600">Contato</p>
                      <div class="row">
                        <div class="col-md-6 mb-2">
                          <label for="example-text-input4" class="form-control-label">Celular/WhatsApp</label>
                          <material-input type="text" value="(35) 99108-4588" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <label for="example-text-input4" class="form-control-label">E-mail</label>
                          <material-input type="text" value="thales-lima@live.com" />
                        </div>
                      </div>

                      <hr class="horizontal dark" />
                      <p class="text-uppercase text-sm mt-3" style="font-weight: 600">Endereço</p>
                      <div class="row">
                        <div class="col-md-4 mb-2">
                          <label for="example-text-input4" class="form-control-label">CEP</label>
                          <material-input type="text" value="37.713-188" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <label for="example-text-input1" class="form-control-label">Logradouro</label>
                          <material-input type="text" value="Av Miguel Vacarelli" />
                        </div>
                        <div class="col-md-2 mb-2">
                          <label for="example-text-input1" class="form-control-label">Nº</label>
                          <material-input type="text" value="75" />
                        </div>
                        <div class="col-md-4">
                          <label for="example-text-input2" class="form-control-label">Complemento</label>
                          <material-input type="text" value="" />
                        </div>
                        <div class="col-md-4">
                          <label for="example-text-input2" class="form-control-label">Cidade</label>
                          <material-input type="text" value="Poços de Caldas" />
                        </div>
                        <div class="col-md-4">
                          <label for="example-text-input3" class="form-control-label">Estado</label>
                          <material-input type="text" value="Minas Gerais" />
                        </div>
                      </div>
                      <hr class="horizontal dark" />
                      <!-- <p class="text-uppercase text-sm">About me</p> -->
                      <p class="text-uppercase text-sm mt-3" style="font-weight: 600">Observações</p>
                      <div class="row">
                        <div class="col-md-12">
                          <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row p-0 w-100 mx-auto"
                    style="border-top: 1px solid #EEE; background: linear-gradient(to bottom, #d7e6ef, #e6eff4,  #e6eff4, #FFF, #FFF);">
                    <div class="col-12 text-center mb-1 d-flex flex-column p-3 m-0"
                      style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.1))">
                      <span class="fs-5" style="">Detalhes do paciente</span>
                      <span>(visível apenas para dentistas)</span>
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
        <div class="py-4 container-fluid" v-if="activeTab == 'tratamento'">
          <div class="row">
            <div class="col-md-12">
              <Tratamento></Tratamento>
            </div>
            <!-- <div class="col-md-4">
          <profile-card />
        </div> -->
          </div>
        </div>
      </Transition>

      <div class="py-4 container-fluid" v-if="activeTab == 'consultas'">
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
      <div class="py-4 container-fluid" v-if="activeTab == 'financeiro'">
        <div class="row">
          <div class="col-md-12">
            <v-table>
              <tbody>
                <tr>
                  <td class="bg-gradient-success text-light text-center" style="border-radius: 3px; padding: 2px 20px;">
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

    </main>
  </div>
</template>

<script>
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
// import ProfileCard from "./components/ProfileCard.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { useRoute } from 'vue-router';
import Tratamento from "@/views/Tratamento.vue"

const body = document.getElementsByTagName("body")[0];

var paciente = {
  name: 'Thales Casa Grande de Lima',
  email: 'thales-lima@live.com',
  birthdate: '1996-12-02',
};

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
    }
  },
  components: {
    // ProfileCard,
    MaterialInput,
    MaterialButton,
    Tratamento
  },

  mounted() {

    // this.paciente = JSON.parse(useRoute().params.paciente);
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
  },
  beforeMount() {
    this.$store.state.imageLayout = "profile-overview";
    this.$store.state.showNavbar = false;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = true;
    body.classList.add("profile-overview");
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
    this.$store.state.imageLayout = "default";
    this.$store.state.showNavbar = true;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = false;
    body.classList.remove("profile-overview");
  }
};
</script>
