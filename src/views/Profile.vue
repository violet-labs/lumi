<template>
  <main>
    <div class="container-fluid">
      <div class="card shadow-lg">
        <div class="card-body p-3">
          <div class="row gx-4">
            <div class="col-auto">
              <div class="avatar avatar-xl position-relative">
                <img src="../assets/img/team-2.jpg" alt="profile_image" class="shadow-sm w-100 border-radius-lg" />
              </div>
            </div>
            <div class="col-auto my-auto">
              <div class="h-100">
                <h5 class="mb-1">{{ paciente.name }}</h5>
                <p class="mb-0 font-weight-bold text-sm"></p>
              </div>
            </div>
            <div class="mx-auto mt-3 col-md-6 my-sm-auto ms-sm-auto me-sm-0">
              <div class="nav-wrapper position-relative end-0">
                <ul class="p-1 bg-transparent nav nav-pills nav-fill" role="tablist">
                  <li class="nav-item" @click="openInfo()">
                    <a class="px-0 py-1 mb-0 nav-link nav-tab active" data-bs-toggle="tab" href="javascript:;"
                      role="tab" aria-selected="true">
                      <i class="fas fa-user"></i>
                      <br>
                      <span class="ms-1">Perfil</span>
                    </a>
                  </li>
                  <li class="nav-item" @click="openTratamento()">
                    <a class="px-0 py-1 mb-0 nav-link nav-tab" data-bs-toggle="tab" href="javascript:;" role="tab"
                      aria-selected="false">
                      <i class="fas fa-teeth-open"></i>
                      <br>
                      <span class="ms-1">Tratamento</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="px-0 py-1 mb-0 nav-link nav-tab" data-bs-toggle="tab" href="javascript:;" role="tab"
                      aria-selected="false">
                      <i class="fas fa-calendar-alt"></i>
                      <br>
                      <span class="ms-1">Consultas</span>
                    </a>
                  </li>
                  <li class="nav-item">
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
    <div class="py-4 pt-4 container-fluid" v-if="!showTratamento">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header p-0" style="border-top: 1px solid #EEE;">
              <div class="tab-selector-container">
                <div class="tab-selector-item" :class="activeTab == 'perfilPessoal' ? 'active' : ''" @click="setTab('perfilPessoal')">
                  <font-awesome-icon :icon="['fas', 'id-card-clip']" />
                  <br>
                  Perfil pessoal
                </div>
                <div class="tab-selector-divider">
                  &nbsp;
                </div>
                <div class="tab-selector-item" :class="activeTab == 'perfilClinico' ? 'active' : ''" @click="setTab('perfilClinico')">
                  <font-awesome-icon :icon="['fas', 'id-card']" />
                  <br>
                  Perfil clínico
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="main-container" v-if="activeTab == 'perfilPessoal'">
                <p class="text-uppercase text-sm">Informações</p>
                <div class="row">
                  <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label">Username</label>
                    <material-input type="text" value="" />
                  </div>
                  <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label">Email address</label>
                    <material-input type="email" v-bind:value="paciente.email" />
                  </div>
                  <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label">Primeiro nome</label>
                    <input class="form-control" type="text" v-bind:value="paciente.name.split(' ')[0]" />
                  </div>
                  <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label">Sobrenome</label>
                    <material-input type="text" v-bind:value="paciente.name.split(' ')[1]" />
                  </div>
                </div>
                <hr class="horizontal dark" />
                <p class="text-uppercase text-sm">Dados de contato</p>
                <div class="row">
                  <div class="col-md-12">
                    <label for="example-text-input" class="form-control-label">Endereço</label>
                    <material-input type="text" value="Av Miguel Vacarelli, 75" />
                  </div>
                  <div class="col-md-4">
                    <label for="example-text-input" class="form-control-label">Cidade</label>
                    <material-input type="text" value="Poços de Caldas" />
                  </div>
                  <div class="col-md-4">
                    <label for="example-text-input" class="form-control-label">Estado</label>
                    <material-input type="text" value="Minas Gerais" />
                  </div>
                  <div class="col-md-4">
                    <label for="example-text-input" class="form-control-label">CEP</label>
                    <material-input type="text" value="37.713-188" />
                  </div>
                </div>
                <hr class="horizontal dark" />
                <!-- <p class="text-uppercase text-sm">About me</p> -->
                <div class="row">
                  <div class="col-md-12">
                    <label for="example-text-input" class="form-control-label">Observações</label>
                    <material-input type="text" value="" />
                  </div>
                </div>
              </div>
              <div v-if="activeTab == 'perfilClinico'">
                aaaa
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="col-md-4">
          <profile-card />
        </div> -->
      </div>
    </div>
    <div class="py-4 container-fluid" v-if="showTratamento">
      <div class="row">
        <div class="col-md-12">
          <Tratamento></Tratamento>
        </div>
        <!-- <div class="col-md-4">
          <profile-card />
        </div> -->
      </div>
    </div>
  </main>
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

var activeTab = 'perfilPessoal';

export default {
  name: "profile",
  data() {
    return {
      showMenu: false,
      paciente,
      showTratamento,
      activeTab,
    };
  },
  methods: {
    setTab(tab) {
      this.activeTab = tab
    },
    openTratamento() {
      this.showTratamento = true;
    },
    openInfo() {
      this.showTratamento = false;
    }
  },
  components: {
    // ProfileCard,
    MaterialInput, MaterialButton,
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
