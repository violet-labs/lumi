<template>
  <div class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <!-- <div class="flex center-items justify-content-center w-full mb-3 bg-gradient-secondary py-2 text-light" style="color: #F2F3F4 !important; font-weight: bold;">
        AGENDA
      </div> -->

      <!-- <div class="flex center-items justify-content-center w-full mb-3 pb-2 text-light border-radius-sm" style="border-bottom-width: 1px; border-bottom-style: solid; border-color: linear-gradient(180deg, #000, #fff, #000) !important; font-weight: bold;">
        AGENDA
      </div> -->
      <li class="mt-3 nav-item mb-1">
        <h6 class="text-xs pl-6 text-center text-uppercase font-weight-bolder text-white">
          PACIENTES
        </h6>
      </li>
      <li class="nav-item nav-btn-container">
        <a href="#" class="nav-btn" data-bs-toggle="modal" data-bs-target="#modalNovoPaciente">
          <div class="text-center d-flex align-items-center justify-content-center me-2"><i class="material-icons-round opacity-10 fs-5">add</i></div>
          <span>Novo paciente</span>
        </a>
      </li>
      <!-- <li class="nav-item nav-btn-container">
        <a href="#" class="nav-btn">
          <div class="text-center d-flex align-items-center justify-content-center me-2"><i class="material-icons-round opacity-10 fs-5">print</i></div>
          <span>Imprimir</span>
        </a>
      </li>
      <div class="mt-2"
        style="width: 100%; height: 1px; background: linear-gradient(90deg, #fbfdfe, #c7d7e0, #fbfdfe) !important;">
      </div> -->
      <!-- <li class="mt-3 nav-item mb-1">
        <h6 class="text-xs pl-6 text-center text-uppercase font-weight-bolder text-white">
          RELATÓRIOS
        </h6>
      </li>
      <li class="nav-item nav-btn-container">
        <a href="#" class="nav-btn">
          <div class="text-center d-flex align-items-center justify-content-center me-2"><i class="material-icons-round opacity-10 fs-5">downloading</i></div>
          <span>Baixa frequência</span>
        </a>
      </li>
      <li class="nav-item nav-btn-container">
        <a href="#" class="nav-btn">
          <div class="text-center d-flex align-items-center justify-content-center me-2"><i class="material-icons-round opacity-10 fs-5">timer</i></div>
          <span>Aguardando retorno</span>
        </a>
      </li>
      <li class="nav-item nav-btn-container">
        <a href="#" class="nav-btn">
          <div class="text-center d-flex align-items-center justify-content-center me-2"><i class="material-icons-round opacity-10 fs-5">list</i></div>
          <span>Todos pacientes</span>
        </a>
      </li> -->
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
  name: "SidenavListPacientes",
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
