<!--
=========================================================
* Vue Material Dashboard 2 - v3.1.0
=========================================================

* Product Page: https://creative-tim.com/product/vue-material-dashboard-2
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
-->
<style>
body {
  background-color: #00F !important;
}
</style>
<template>
  <entrar v-if="!isAuthenticated() || $route.name === 'Entrar'"></entrar>
  <div class="user-access" v-if="isAuthenticated() && $route.name !== 'Entrar'">
    <tab-navigation class="bg-gradient-primary" v-if="isAuthenticated() && $route.name !== 'Forms'" />
    <main class="main-content position-relative max-height-vh-100 h-100 overflow-x-hidden">
      <router-view />
      <app-footer v-show="showFooter" />
      <fab-search :toggle="toggleConfigurator" :class="[showConfig ? 'show' : '', hideConfigButton ? 'd-none' : '']" />
    </main>
  </div>
</template>
<script>
import FabSearch from "@/views/components/FabSearch.vue";
import Navbar from "@/examples/Navbars/Navbar.vue";
import AppFooter from "@/examples/Footer.vue";
import { mapMutations, mapState } from "vuex";
import TabNavigation from "./views/components/TabNavigation.vue"
import Entrar from "./views/Entrar.vue"

import { isAuthenticated } from "./api.js";

export default {
  name: "App",
  components: {
    FabSearch,
    Navbar,
    AppFooter,
    TabNavigation,
    Entrar
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"]),
    isAuthenticated
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
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";
    const body = document.getElementsByTagName("body")[0];

    const sidenav = document.getElementsByClassName("g-sidenav-show")[0];

    if (window.innerWidth > 1200) {
      sidenav.classList.add("g-sidenav-pinned");
    }

    body.classList.remove("bg-gray-200");
  },
};
</script>
