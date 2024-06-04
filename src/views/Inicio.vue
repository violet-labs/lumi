<template>
  <div class="main-page-content">
    <div class="py-4 container-fluid">
      <div class="row mb-4">
        <div class="col-lg-12 position-relative z-index-2">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6">
              <mini-statistics-card :title="{ text: 'Ações pendentes', value: '2' }"
                detail="<span class='text-success text-sm font-weight-bolder'>3</span> resolvidas hoje" :icon="{
                  name: 'error',
                  color: 'text-white',
                  background: 'warning',
                }" />
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
              <mini-statistics-card :title="{ text: 'Consultas hoje', value: '7' }"
                detail="<span class='text-success text-sm font-weight-bolder'>16</span> ainda nesta semana" :icon="{
                  name: 'calendar_month',
                  color: 'text-white',
                  background: 'success',
                }" />
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
              <mini-statistics-card :title="{ text: 'Tratamentos', value: '26' }"
                detail="<span class='text-success text-sm font-weight-bolder'>+4</span> no último mês" :icon="{
                  name: 'leaderboard',
                  color: 'text-white',
                  background: 'primary',
                }" />
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
              <mini-statistics-card :title="{ text: 'Dentistas ativos', value: '37' }"
                detail="<span class='text-success text-sm font-weight-bolder'>+2</span> no último mês" :icon="{
                  name: 'person_4',
                  color: 'text-white',
                  background: 'info',
                }" />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
          <project-card title="Histórico"
            description="<i class='fa fa-check text-info' aria-hidden='true'></i> <span class='font-weight-bold ms-1'>4 ações</span> hoje"
            :headers="['Ação', 'Dia', 'Horário', 'Usuário']" :projects="[
              {
                acao: 'Adicionou paciente Lucas Carvalho',
                dia: '27/05/2024',
                horario: '12:12h',
                usuario: 'Thales Lima',
              },
              {
                acao: '<b>Beatriz</b> preencheu o formulário de boas-vindas',
                dia: '26/05/2024',
                horario: '10:05h',
                usuario: '-',
              },
              {
                acao: 'Criou tratamento #1',
                dia: '24/05/2024',
                horario: '14:30h',
                usuario: 'Thales Lima',
              },
              {
                acao: 'Adicionou paciente Teste da Silva',
                dia: '24/05/2024',
                horario: '09:47h',
                usuario: 'Thales Lima',
              },
            ]" />
        </div>
        <div class="col-lg-4 col-md-6">
          <timeline-list class="h-100" title="Últimos pacientes cadastrados" description="<i class='fa fa-arrow-up text-success' aria-hidden='true'></i>
        <span class='font-weight-bold'>14</span> este mês">
            <timeline-item :icon="{
              component: 'person',
              class: 'text-success',
            }" title="Thales Casa Grande de Lima" date-time="27 MAI 14:23h" />
            <timeline-item :icon="{
              component: 'person',
              class: 'text-success',
            }" title="Thales Casa Grande de Lima" date-time="27 MAI 09:34" />
            <timeline-item :icon="{
              component: 'person',
              class: 'text-success',
            }" title="Thales Casa Grande de Lima" date-time="25 MAI 10:43" />
            <timeline-item :icon="{
              component: 'person',
              class: 'text-success',
            }" title="Thales Casa Grande de Lima" date-time="23 MAI 09:05" />
          </timeline-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChartHolderCard from "./components/ChartHolderCard.vue";
import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
import ReportsLineChart from "@/examples/Charts/ReportsLineChart.vue";
import MiniStatisticsCard from "./components/MiniStatisticsCard.vue";
import ProjectCard from "./components/ProjectCard.vue";
import TimelineList from "@/examples/Cards/TimelineList.vue";
import TimelineItem from "@/examples/Cards/TimelineItem.vue";
import logoXD from "@/assets/img/small-logos/logo-xd.svg";
import logoAtlassian from "@/assets/img/small-logos/logo-atlassian.svg";
import logoSlack from "@/assets/img/small-logos/logo-slack.svg";
import logoSpotify from "@/assets/img/small-logos/logo-spotify.svg";
import logoJira from "@/assets/img/small-logos/logo-jira.svg";
import logoInvision from "@/assets/img/small-logos/logo-invision.svg";
import team1 from "@/assets/img/team-1.jpg";
import team2 from "@/assets/img/team-2.jpg";
import team3 from "@/assets/img/team-3.jpg";
import team4 from "@/assets/img/team-4.jpg";
export default {
  name: "dashboard-default",
  data() {
    return {
      logoXD,
      team1,
      team2,
      team3,
      team4,
      logoAtlassian,
      logoSlack,
      logoSpotify,
      logoJira,
      logoInvision,
    };
  },
  components: {
    ChartHolderCard,
    ReportsBarChart,
    ReportsLineChart,
    MiniStatisticsCard,
    ProjectCard,
    TimelineList,
    TimelineItem,
  },
};
</script>
