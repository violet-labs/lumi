<template>
  <div class="page-header align-items-start min-vh-100" v-bind:style="backgroundImage">
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container my-auto">
      <div class="row">
        <div class="col-lg-4 col-md-8 col-12 mx-auto">
          <div class="card z-index-0 fadeIn3 fadeInBottom">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div class="shadow-secondary border-radius-lg py-3 bg-gradient-lumi" style="border: 1px solid #D2D2D2; padding-left: 35px;">
                <img :src="LumiBlueLogo" class="login-page-logo">
              </div>
            </div>
            <div class="card-body">
              <form role="form" class="text-start mt-3">
                <div class="mb-3">
                  <MaterialInput id="email" type="email" label="Email" name="email" />
                </div>
                <div class="mb-3">
                  <MaterialInput id="senha" type="password" label="Senha" name="senha" />
                </div>
                <material-switch id="rememberMe" name="rememberMe">Manter este dispositivo conectado</material-switch>
                <div class="text-center">
                  <material-button class="my-4 mb-2" variant="gradient" color="secondary" fullWidth
                    @click="submitLogin()">{{ $t('login.submitAction') }}</material-button>
                </div>
                <p class="mt-1 text-center">
                  <a href="#reset-password">Esqueceu sua senha?</a>
                </p>
                <p class="mt-3 text-sm text-center">
                  <a href="https://www.lumiorthosystem.com.br#one" class="d-flex flex-column">
                  <span>Ainda não é cliente?</span>
                  <b>Conheça-nos</b>
                </a>
                  <!-- <router-link
                    :to="{ name: 'SignUp' }"
                    class="text-success text-gradient font-weight-bold"
                    >Sign up</router-link
                  > -->
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer position-absolute bottom-2 py-2 w-100">
      <div class="container">
        <div class="row align-items-center justify-content-lg-between">
          <div class="col-12 my-auto">
            <div class="copyright text-center text-sm text-white text-lg-start d-flex flex-column" style="font-weight: 400;">
              <span style="font-size: 11pt;">© {{ new Date().getFullYear() }} Lumi Ortho System</span>
              <span style="font-size: 9pt;">by
              <a href="https://www.violetlabs.com.br" class="font-weight-bold text-white" target="_blank">Violet Labs</a></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<style></style>

<script>
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { mapMutations } from "vuex";

import whiteConsultory from '@/assets/img/lumi/whiteConsultory.png';
import LumiBlueLogo from "@/assets/img/lumi/logo-blue.png"

import { isAuthenticated } from "../api.js";
import router from "../router/index.js";

export default {
  name: "entrar",
  components: {
    MaterialInput,
    MaterialSwitch,
    MaterialButton,
  },
  data() {
    return {
      LumiBlueLogo
    }
  },
  mounted() {
    // ToDo: comentar em produção
    localStorage.removeItem('isAuthenticated');

    if (isAuthenticated()) {
      router.push({ path: 'inicio' })
    }
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    submitLogin() {
      localStorage.setItem('isAuthenticated', 'true');
      this.$router.push({
        name: "Inicio"
      });
    }
  },
  computed: {
    backgroundImage() {
      return {
        backgroundImage: `url(${whiteConsultory})`,
        transform: 'scale(1.05)',
      }
    }
  },
  beforeMount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
};
</script>
