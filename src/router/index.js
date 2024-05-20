import { createRouter, createWebHistory } from "vue-router";

import Entrar from "../views/Entrar.vue";
import Inicio from "../views/Inicio.vue";
import Agenda from "../views/Agenda.vue";
import Pacientes from "../views/Pacientes.vue";
import Tratamento from "../views/Tratamento.vue";
import Dentistas from "../views/Dentistas.vue";
import Financeiro from "../views/Financeiro.vue";
import Forms from "@/views/Forms.vue";

import Profile from "../views/Profile.vue";

import { isAuthenticated } from "../api.js";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/inicio",
    meta: {
      requiresAuth: true
    }
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
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/agenda",
    name: "Agenda",
    component: Agenda,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/pacientes",
    name: "Pacientes",
    component: Pacientes,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/tratamento/:id",
    name: "Tratamento",
    component: Tratamento,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/dentistas",
    name: "Dentistas",
    component: Dentistas,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/financeiro",
    name: "Financeiro",
    component: Financeiro,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/paciente",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/bem-vindo",
    name: "Forms",
    component: Forms,
    meta: {
      requiresAuth: false
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next("entrar");
  } else {
    next();
  }
});

export default router;
