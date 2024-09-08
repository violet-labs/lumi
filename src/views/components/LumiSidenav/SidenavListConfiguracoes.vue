<template>
  <div class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="mt-3 nav-item mb-1">
        <h6 class="text-xs pl-6 text-center text-uppercase font-weight-bolder text-white">
          CONFIGURAÇÕES
        </h6>
      </li>
      <li class="nav-item nav-btn-container" @click="changeTab('perfil')">
        <a href="#" class="nav-btn" :class="selectedTab == 'perfil' ? 'highlight' : ''">
          <div class="text-center d-flex align-items-center justify-content-center me-2"><font-awesome-icon
              :icon="['fas', 'user']" /></div>
          <span>Meu perfil</span>
        </a>
      </li>
      <div class="mt-2"
        style="width: 100%; height: 1px; background: linear-gradient(90deg, #fbfdfe, #c7d7e0, #fbfdfe) !important;">
      </div>
      <li class="mt-3 nav-item mb-1">
        <h6 class="text-xs pl-6 text-center text-uppercase font-weight-bolder text-white">
          TRATAMENTOS
        </h6>
      </li>
      <li class="nav-item nav-btn-container" @click="changeTab('mentorias')">
        <a href="#" class="nav-btn" :class="selectedTab == 'mentorias' ? 'highlight' : ''">
          <div class="text-center d-flex align-items-center justify-content-center me-2"><font-awesome-icon
              :icon="['fas', 'handshake-angle']" /></div>
          <span>Solicitações de mentorias</span>
        </a>
      </li>
      <div class="mt-2"
        style="width: 100%; height: 1px; background: linear-gradient(90deg, #fbfdfe, #c7d7e0, #fbfdfe) !important;">
      </div>
      <li class="mt-3 nav-item mb-1">
        <h6 class="text-xs pl-6 text-center text-uppercase font-weight-bolder text-white">
          SISTEMA
        </h6>
      </li>
      <li class="nav-item nav-btn-container text-danger" @click="changeTab('registros')">
        <a href="#" class="nav-btn" :class="selectedTab == 'registros' ? 'highlight' : ''">
          <div class="text-center d-flex align-items-center justify-content-center me-2"><font-awesome-icon
              :icon="['fas', 'list']" /></div>
          <span>Registros</span>
        </a>
      </li>
      <li class="nav-item nav-btn-container text-danger mt-5" @click="confirmLogout">
        <a href="#" class="nav-btn text-danger">
          <div class="text-center d-flex align-items-center justify-content-center me-2 text-danger"><font-awesome-icon
              :icon="['fas', 'right-from-bracket']" />
          </div>
          <span class="text-danger">Sair</span>
        </a>
      </li>
    </ul>
    <div class="sidenav-footer position-absolute w-100 bottom-0 pl-6 text-center">
      <img :src="lumiLogo" class="navbar-brand-img h-100 center-self mt-6" alt="main_logo" />
      <!-- <span class="ms-2 font-weight-bold text-white"
          >Material Dashboard 2</span
        > -->
    </div>
  </div>
</template>
<script>
import usuariosService from '@/services/usuariosService'
import cSwal from '@/utils/cSwal'
import SidenavCollapse from "./SidenavCollapse.vue";
import lumiLogo from "@/assets/img/logos/lumi.png";

export default {
  name: "SidenavListConfiguracoes",
  props: {
    selectedTab: {
      type: String,
      default: 'perfil',
    }
  },
  data() {
    return {
      userInfo: null,
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active",
      lumiLogo,
    };
  },
  components: {
    SidenavCollapse,
  },
  created() {
    this.userInfo = usuariosService.decodedToken()
  },
  methods: {
    confirmLogout() {
      cSwal.cConfirm('Deseja realmente sair do sistema?', async () => {
        await usuariosService.logout()
      })
    },
    changeTab(tab) {
      this.$emit('changeTab', tab);
    },
  }
};
</script>
