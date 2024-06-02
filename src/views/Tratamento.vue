<template>
  <div>
    <div class="tratamento-tabs-container">
      <div class="tratamento-tab" style="flex: 3 1 100px">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="mr-3" />
        Análise
      </div>
      <div class="tratamento-tab active" style="flex: 4 1  100px">
        <font-awesome-icon :icon="['fas', 'list-check']" class="mr-3" />
        Resumo e planejamento
      </div>
      <div class="tratamento-tab" style="flex: 3 1  100px">
        <font-awesome-icon :icon="['fas', 'image']" class="mr-3" />
        Imagens
      </div>
      <div class="tratamento-tab" style="flex: 3 1  100px">
        <font-awesome-icon :icon="['fas', 'history']" class="mr-3" />
        Histórico
      </div>
    </div>

    <div class="tratamento-content">
      <div class="wrapper">
        <div class="box">
          <p class="box-header">Diagnóstico<font-awesome-icon :icon="['fas', 'edit']" class="ml-3 pointer" title="Editar" /></p>
          <p class="text-justify py-2 px-4">
            Apinhamentos dentários severos com má oclusão Classe II, divisão 1 de Angle e mordida aberta
            anterior leve.
          </p>
        </div>
        <div class="box">
          <p class="box-header">Prognóstico<font-awesome-icon :icon="['fas', 'edit']" class="ml-3 pointer" title="Editar" /></p>
          
          <p class="text-justify py-2 px-4">
            Favorável, com a expectativa de correção dos apinhamentos dentários e da má oclusão, proporcionando ao
            paciente um sorriso esteticamente agradável e funcional.
          </p>
        </div>
        <div class="box">
          <p class="box-header">Metas terapêuticas<font-awesome-icon :icon="['fas', 'edit']" class="ml-3 pointer" title="Editar" /></p>
          <p class="mt-3">
            <strong>Apinhamentos Dentários</strong>:<br>
            Superior: 7 mm (medida de Steiner)<br>
            Inferior: 6 mm (medida de Steiner)<br>
            <br>
            <strong>Mordida Aberta Anterior</strong>:<br>
            Vertical: 2 mm (medida interincisiva)<br>
            Horizontal: 3 mm (medida interlabial)<br>
            <br>
            <strong>Má Oclusão Classe II</strong>:<br>
            Overjet: 7 mm (medida de Moyers)<br>
            Overbite: 2 mm (medida de Moyers)<br>
            <br>
            <strong>Ângulo ANB</strong>:<br>
            25° (valor normal entre 22° e 34°)<br>
            <br>
            <strong>Ângulo SNA</strong>:<br>
            80° (valor normal entre 78° e 82°)<br>
            <br>
            <strong>Ângulo SNB</strong>:<br>
            75° (valor normal entre 72° e 80°)<br>
          </p>
        </div>
        <div class="box">
          <p class="box-header">Plano de tratamento<font-awesome-icon :icon="['fas', 'edit']" class="ml-3 pointer" title="Editar" /></p>
          <div class="card m-3">
            <div class="fase-header">
              <strong>Aparatologia</strong>
            </div>
            <div class="card-body px-4 py-3">
              <strong>Aparelho utilizado</strong>: autoligado metálico bidimensional.
              <div class="p-horizontal-divider m2"></div>
              <strong>Tipo de colagem</strong>: Alexander (x = centro da coroa clínica pré-molar).
              <div class="p-horizontal-divider m2"></div>
              <strong>Contenção superior</strong>: placa acetato.
              <div class="p-horizontal-divider m2"></div>
              <strong>Contenção inferior</strong>: placa acetato.
              <div class="p-horizontal-divider m2"></div>
              <strong>Necessidades de exercícios miofuncionais</strong>: nenhuma.
            </div>
          </div>
          <div class="card m-3">
            <div class="fase-header">
              <strong>Fase 1: Expansão Palatina (3 meses)</strong>
              <span class="text-sm" style="text-decoration: line-through;">Maio/2024 a Maio/2025</span>
            </div>
            <div class="card-body px-4 py-3">
              <strong>Objetivo</strong>: descomprimir os arcos dentários e criar espaço para o alinhamento dos dentes.
              <div class="p-horizontal-divider m2"></div>
              <strong>Mecânica</strong>: aparelho expansor palatino com ativação semanal.
              <div class="p-horizontal-divider m2"></div>
              <strong>Acompanhamento</strong>: consultas mensais para acompanhamento da expansão e avaliação da
              necessidade
              de ajustes no
              aparelho.
            </div>
          </div>
          <div class="card m-3 active">
            <div class="fase-header">
              <strong>Fase 2 (atual): Alinhamento e Nivelamento (12 meses)</strong>
              <span class="text-sm font-weight-bold">Maio/2024 a Maio/2025</span>
            </div>
            <div class="card-body px-4 py-3">
              <strong>Objetivo</strong>: alinhar e nivelar os dentes em ambos os arcos.
              <div class="p-horizontal-divider m2"></div>
              <strong>Mecânica</strong>: aparelho fixo vestibular com bráquetes metálicos e fios de níquel-titânio.
              <div class="p-horizontal-divider m2"></div>
              <strong>Acompanhamento</strong>: consultas quinzenais para ativação dos fios e ajustes no aparelho.<br>
            </div>
          </div>
          <div class="card m-3">
            <div class="fase-header">
              <strong>Fase 3: Finalização e Contenção (9 meses)</strong>
              <span class="text-sm">Maio/2024 a Maio/2025</span>
            </div>
            <div class="card-body px-4 py-3">
              <strong>Objetivo</strong>: finalizar o alinhamento e nivelamento dos dentes, estabelecer a oclusão ideal e
              manter a
              estabilidade do tratamento.
              <div class="p-horizontal-divider m2"></div>
              <strong>Mecânica</strong>: aparelho fixo vestibular com bráquetes metálicos e fios de aço inoxidável com
              posterior contenção fixa.
              <div class="p-horizontal-divider m2"></div>
              <strong>Acompanhamento</strong>: consultas mensais para ajustes no aparelho e acompanhamento da
              oclusão.
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.tratamento-tabs-container {
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
}

.tratamento-tab {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid #DDD;
  padding: 8px 5px;
  text-transform: uppercase;
  font-size: 11pt;
  border-right: none;
}

.tratamento-tab:first-child {
  border-radius: 4px 0px 0px 4px;
}

.tratamento-tab:last-child {
  border-radius: 0px 4px 4px 0px;
  border-right: 1px solid #DDD;
}

.tratamento-tab.active {
  background: rgb(85, 125, 255);
  color: #FFF;
  border: 1px solid #DDD;
  border-radius: 4px;
}

.tratamento-tab:hover {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.01));
}

.tratamento-tab.active:hover {
  background: rgb(85, 125, 255, 1);
  color: #EEE;
}

.tratamento-content {
  padding: 20px;
}

.wrapper {
  display: -ms-flexbox;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.box {
  box-sizing: border-box;
  width: calc(50% - 10px);
  text-align: center;
  align-items: center;
  vertical-align: middle;

  border: 1px solid #DDD;
  border-radius: 5px;

  @media (max-width: 768px) {
    width: 100%;
  }
}

.box-header {
  text-transform: uppercase;
  font-size: 11pt;
  font-weight: 500;
  padding: 7px 0px !important;
  background: linear-gradient(to right, #F8F8F8, #EEE, #F8F8F8);
  border-bottom: 1px solid #E2E2E2;
}

.box p {
  text-align: center;
  padding: 0px 30px;
  padding-bottom: 20px;
}

.box .card {
  text-align: justify;
}

.card {
  border: 1px solid #DDD;
}

.fase-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #FAFAFA;
  border-radius: 10px 10px 0px 0px;
  padding: 7px 5px;
}
</style>

<script>

const items = [
]
export default {
  name: "tratamento",
  data() {
    return {
      items
    }
  },
  methods: {
  },
  components: {
  },

  mounted() {
  },
  beforeMount() {
  },
  beforeUnmount() {
  }
};
</script>