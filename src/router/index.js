import { createRouter, createWebHistory } from "vue-router";

import Entrar from "../views/Entrar.vue";
import Inicio from "../views/Inicio.vue";
import Agenda from "../views/Agenda.vue";
import Pacientes from "../views/Pacientes.vue";
import Dentistas from "../views/Dentistas.vue";
import Financeiro from "../views/Financeiro.vue";

import Profile from "../views/Profile.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/inicio",
  },
  {
    path: "/entrar",
    name: "Entrar",
    component: Entrar,
  },
  {
    path: "/inicio",
    name: "Inicio",
    component: Inicio,
  },
  {
    path: "/agenda",
    name: "Agenda",
    component: Agenda,
  },
  {
    path: "/pacientes",
    name: "Pacientes",
    component: Pacientes,
  },
  {
    path: "/dentistas",
    name: "Dentistas",
    component: Dentistas,
  },
  {
    path: "/financeiro",
    name: "Financeiro",
    component: Financeiro,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
