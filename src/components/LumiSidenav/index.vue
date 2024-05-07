<template>
  <aside
    id="sidenav-main"
    class="sidenav navbar navbar-vertical navbar-expand-xs rotate-caret fixed-end bg-transparent" style="background: linear-gradient(180deg, #FFF, #fbfdfe, #fbfdfe) !important;"
  >
    <div class="sidenav-header text-center">
      <v-icon style="font-size: 55pt; color: #5988A8 !important; margin: 0.5rem; margin-top: 0.8rem">mdi-calendar-month</v-icon>
    </div>
    <sidenav-list />
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/logo-ct.png";
import logoDark from "@/assets/img/logo-ct-dark.png";
import lumiLogo from "@/assets/img/logos/lumi.png";
import { mapState } from "vuex";

export default {
  name: "index",
  components: {
    SidenavList,
  },
  data() {
    return {
      logo,
      logoDark,
      lumiLogo,
    };
  },
  computed: {
    ...mapState(["isRTL", "sidebarType", "isDarkMode"]),
  },
};
</script>
