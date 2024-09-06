<template>
  <div class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="mt-3 nav-item mb-1">
        <h6 class="text-xs pl-6 text-center text-uppercase font-weight-bolder text-white">
          DENTISTAS
        </h6>
      </li>
      <li class="nav-item nav-btn-container">
        <a href="#" class="nav-btn" data-bs-toggle="modal" data-bs-target="#modalNovoDentista">
          <div class="text-center d-flex align-items-center justify-content-center me-2"><font-awesome-icon :icon="['fas', 'plus']" /></div>
          <span>Novo dentista</span>
        </a>
      </li>
      <div class="mt-2"
        style="width: 100%; height: 1px; background: linear-gradient(90deg, #fbfdfe, #c7d7e0, #fbfdfe) !important;">
      </div>
      <li class="mt-3 nav-item mb-1">
        <h6 class="text-xs pl-6 text-center text-uppercase font-weight-bolder text-white">
          CLÍNICAS
        </h6>
      </li>
      <li class="nav-item nav-btn-container">
        <a href="#" class="nav-btn" data-bs-toggle="modal" data-bs-target="#modalNovoDentista">
          <div class="text-center d-flex align-items-center justify-content-center me-2"><font-awesome-icon :icon="['fas', 'cog']" /></div>
          <span>Gerenciar clínicas</span>
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
import SidenavCollapse from "./SidenavCollapse.vue";
import lumiLogo from "@/assets/img/logos/lumi.png";

export default {
  name: "SidenavListDentistas",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active",
      lumiLogo,
    };
  },
  components: {
    SidenavCollapse,
  },
};
</script>
