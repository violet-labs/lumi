<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <div class="flex center-items justify-content-center w-full mb-3 bg-gradient-secondary py-2 text-light" style="color: #F2F3F4 !important; font-weight: bold;">
        AGENDA
      </div>

      <!-- <div class="flex center-items justify-content-center w-full mb-3 pb-2 text-light border-radius-sm" style="border-bottom-width: 1px; border-bottom-style: solid; border-color: linear-gradient(180deg, #000, #fff, #000) !important; font-weight: bold;">
        AGENDA
      </div> -->
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="dashboard"
          navText="Nova consulta"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">add</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="dashboard"
          navText="Reagendar"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">settings_backup_restore</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="tables"
          navText="Imprimir agenda"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">print</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder text-white"
          :class="$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          CONSULTAS
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="profile"
          navText="Confirmar"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">check</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="profile"
          navText="Novo prontuário"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">person_add</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="profile"
          navText="Pagamento"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">add_card</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="sign-in"
          navText="Atestado"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">text_snippet</i>
          </template>
        </sidenav-collapse>
      </li>
    </ul>
    <div class="sidenav-footer position-absolute w-100 bottom-0">
      <div class="mx-3">
        <i
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      ></i>
      <a class="m-0 navbar-brand text-center" href="/">
        <img
          :src="lumiLogo"
          class="navbar-brand-img h-100 center-self"
          alt="main_logo"
        />
        <!-- <span class="ms-2 font-weight-bold text-white"
          >Material Dashboard 2</span
        > -->
      </a>
      </div>
    </div>
  </div>
</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";
import lumiLogo from "@/assets/img/logos/lumi.png";

export default {
  name: "SidenavList",
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
