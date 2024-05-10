<style>
.lumi-fab {
  z-index: 10000 !important;
  position: fixed;
  bottom: 30px;
  right: 30px;
  border-radius: .6rem;
  height: 55px;
  width: 55px;
  background: #29618b !important;
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25pt
}

.lumi-fab:hover {
  background: #183f5b;
}
.g-sidenav-show.g-sidenav-pinned .lumi-fab {
  /* background: #183f5b !important; */
  color: #29618b !important;
  background: #FFF !important;
  border: 2px solid #29618b !important;
}
</style>

<template>
  <button class="lumi-fab" @click="toggleSidebar">
    <span class="mdi mdi-format-list-bulleted-square"></span>
  </button>

</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import { activateDarkMode, deactivateDarkMode } from "@/assets/js/dark-mode";

export default {
  name: "fab-search",
  props: ["toggle"],
  methods: {
    ...mapMutations(["navbarMinimize", "navbarFixed"]),
    ...mapActions(["setColor"]),

    toggleSidebar() {
      this.navbarMinimize();
    },

    sidebarColor(color = "success") {
      document.querySelector("#sidenav-main").setAttribute("data-color", color);
      this.setColor(color);
    },

    sidebar(type) {
      this.$store.state.sidebarType = type;
    },

    setNavbarFixed() {
      if (
        this.$route.name !== "Profile" ||
        this.$route.name !== "All Projects"
      ) {
        this.$store.state.isNavFixed = !this.$store.state.isNavFixed;
      }
    },

    darkMode() {
      if (this.$store.state.isDarkMode) {
        this.$store.state.isDarkMode = false;
        deactivateDarkMode();
        return;
      } else {
        this.$store.state.isDarkMode = true;
        activateDarkMode();
      }
    },

    sidenavTypeOnResize() {
      // let transparent = document.querySelector("#btn-transparent");
      // let white = document.querySelector("#btn-white");
      // if (window.innerWidth < 1200) {
      //   transparent.classList.add("disabled");
      //   white.classList.add("disabled");
      // } else {
      //   transparent.classList.remove("disabled");
      //   white.classList.remove("disabled");
      // }
    },
  },
  computed: {
    ...mapState(["isRTL", "sidebarType", "isPinned"]),
    sidenavResponsive() {
      return this.sidenavTypeOnResize;
    },
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";
    window.addEventListener("resize", this.sidenavTypeOnResize);
    window.addEventListener("load", this.sidenavTypeOnResize);
  },
};
</script>
