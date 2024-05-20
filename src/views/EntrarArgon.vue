<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <div style="width: 100%; text-align: center; padding-bottom: 40px">
                    <img
                      :src="
                        logo
                      "
                      alt="main_logo"
                    />
                  </div>
                  <h4 class="font-weight-bolder">Entrar</h4>
                  <p class="mb-0">Insira seu e-mail e senha para entrar</p>
                </div>
                <div class="card-body">
                  <form role="form">
                    <div class="mb-3">
                      <input type="email" placeholder="E-mail" name="email" size="lg" id="email" class="form-control" v-model="username" />
                    </div>
                    <div class="mb-3">
                      <input type="password" placeholder="Senha" name="password" size="lg" id="password" class="form-control" v-model="password" />
                    </div>
                    <material-switch id="rememberMe">Lembrar dispositivo</material-switch>

                    <div class="text-center">
                      <material-button
                      type="button"
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        @click="submitLogin()"
                      >Entrar</material-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Não tem uma conta?
                    <a
                      href="javascript:;"
                      class="text-success text-gradient font-weight-bold"
                    >Solicite agora</a>
                  </p>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                :style="{ backgroundImage: `url(${entrarImg})`, backgroundSize: 'cover' }"
              >
                <span class="mask bg-gradient-success opacity-4"></span>
                <h4
                  class="mt-5 text-white font-weight-bolder position-relative"
                >Instituto Daniel Salles</h4>
                <p
                  class="text-white position-relative"
                >Transformando cuidados em resultados impressionantes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import entrarImg from "@/assets/img/signin.png";
import logo from "@/assets/img/daniel-salles-logo-120.png";
const body = document.getElementsByTagName("body")[0];

var username = null;
var password = null;

export default {
  name: "entrar",
  components: {
    // MaterialInput,
    MaterialSwitch,
    MaterialButton,
  },
  data() {
    return {
      entrarImg, logo
    }
  },
  mounted() {
    localStorage.removeItem('isAuthenticated');
  },
  methods: {
    submitLogin() {
      localStorage.setItem('isAuthenticated', 'true');
      this.$router.push({
        name: "Visão geral"
      });
    }
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
</script>
