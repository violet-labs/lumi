<template>
  <div class="py-4 container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row">
          <div class="col-md-4 col-sm-6">
            <mini-statistics-card
              :title="{ text: 'Pagamentos atrasados', value: 'R$ 658,00' }"
              detail="de 7 pacientes"
              :icon="{
                name: 'hourglass',
                color: 'text-white',
                background: 'warning',
                type: 'fas'
              }"
            />
          </div>
          <div class="col-md-4 col-sm-12 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Pagamentos recebidos', value: 'R$ 8.765,00' }"
              detail="este mês"
              :icon="{
                name: 'hand-holding-dollar',
                color: 'text-white',
                background: 'success',
                type: 'fas',
              }"
            />
          </div>
          <div class="col-md-4 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Pagamentos efetuados', value: 'R$ 2.354,00' }"
              detail="<span class='text-danger text-sm font-weight-bolder'>R$ 587,00</span> a mais que no último mês"
              :icon="{
                name: 'sack-dollar',
                color: 'text-white',
                background: 'danger',
                type: 'fas',
              }"
            />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-4 col-md-6 mt-4">
            <chart-holder-card
              title="Consultas pagas"
              subtitle="<span class='font-weight-bolder'>12</span> esta semana"
              update="atualizado há 5 horas"
            >
              <reports-bar-chart
                :chart="{
                  labels: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
                  datasets: {
                    label: 'Consultas',
                    data: [50, 20, 10, 22, 50, 10, 40],
                  },
                }"
              />
            </chart-holder-card>
          </div>
          <div class="col-lg-4 col-md-6 mt-4">
            <chart-holder-card
              title="Pagamentos recebidos (histórico)"
              subtitle="<span class='font-weight-bolder'>+15%</span> em relação ao mês anterior"
              update="atualizado há 4 minutos"
              color="success"
            >
              <reports-line-chart
                :chart="{
                  labels: [
                    'Abr',
                    'Mai',
                    'Jun',
                    'Jul',
                    'Ago',
                    'Set',
                    'Out',
                    'Nov',
                    'Dez',
                  ],
                  datasets: {
                    label: 'R$',
                    data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
                  },
                }"
              />
            </chart-holder-card>
          </div>
          <div class="col-lg-4 mt-4">
            <chart-holder-card
              title="Pagamentos efetuados (histórico)"
              subtitle="<span class='font-weight-bolder'>R$ 690,00</span> este mês"
              update="atualizado agora"
              color="danger"
            >
              <reports-line-chart
                id="tasks-chart"
                :chart="{
                  labels: [
                    'Abr',
                    'Mai',
                    'Jun',
                    'Jul',
                    'Ago',
                    'Set',
                    'Out',
                    'Nov',
                    'Dez',
                  ],
                  datasets: {
                    label: 'R$',
                    data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                  },
                }"
              />
            </chart-holder-card>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-7 col-md-6 mb-md-0 mb-4">
        <project-card
          title="Contas em aberto"
          description="não há contas em aberto"
        />
      </div>
      <div class="col-lg-5 col-md-6">
        <timeline-list
          class="h-100"
          title="Últimos pagamentos"
          description="<i class='fa fa-arrow-up text-success' aria-hidden='true'></i>
        <span class='font-weight-bold'>R$ 1.358,00</span> esta semana"
        >
          <timeline-item
            :icon="{
              component: 'attach_money',
              class: 'text-success',
            }"
            title="R$ 150,00 - Paciente Beatriz Oliveira Martins"
            date-time="27 MAI 12:40"
          />
          <timeline-item
            :icon="{
              component: 'attach_money',
              class: 'text-success',
            }"
            title="R$ 280,00 - Paciente Júlia Simões Manzoli"
            date-time="25 MAI 14:22"
          />
          <timeline-item
            :icon="{
              component: 'attach_money',
              class: 'text-success',
            }"
            title="R$ 280,00 - Paciente Thales Casa Grande de Lima"
            date-time="22 MAI 10:25"
          />
        </timeline-list>
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
