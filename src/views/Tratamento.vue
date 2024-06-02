<template>
  <div>
    <div class="row py-3 py-md-0 px-3">
      <div class="col-sm-6 col-md-4 px-2 py-1 py-md-3">
        <material-input label="Fase atual (2/3)" readonly type="text" centered value="Alinhamento e Nivelamento"
          id="paciente_inicio_tratamento" />

      </div>
      <div class="col-sm-6 col-md-2 px-2 py-1 py-md-3">
        <material-input label="Início do tratamento" readonly type="text" centered
          v-bind:value="$filters.dateDmy(paciente.data_inicio_tratamento)" id="paciente_inicio_tratamento" />
      </div>
      <div class="col-sm-6 col-md-2 px-2 py-1 py-md-3">
        <material-input label="Término previsto" readonly type="text" centered
          v-bind:value="$filters.dateDmy(paciente.data_final_previsa)" id="paciente_inicio_tratamento" />
      </div>
      <div class="col-sm-6 col-md-4 py-1 py-md-3 px-2" v-if="paciente.status_tratamento == 'ATIVO'">
        <label for="">Progresso</label>
        <div class="d-flex flex-column align-items-center justify-content-center w-100 p-0 m-0">
          <div class="progress progress-lg w-100" style="">
            <div class="progress-bar bg-gradient-success" role="progressbar" aria-valuenow="95" aria-valuemin="0"
              aria-valuemax="100" :style="{ width: getProgresso + '%' }"></div>
          </div>
          <span class="me-2"
            style="margin-top: -34px; background: rgba(255, 255, 255, 0.4); font-weight: 500 !important; font-size: 13pt; padding: 0px 9px; border-radius: 0.375rem; color: #666;">{{
              getProgresso }}%</span>
        </div>
      </div>
      <div class="col-sm-6 col-md-4 py-1 py-md-3 px-2" v-if="paciente.status_tratamento != 'ATIVO'">
        <div class="d-flex flex-column w-100 p-0 m-0">
          <label for="">Status</label>
          <span class="badge badge-sm" :class="statusClass(paciente.status_tratamento)"
            style="height: 42px; width: 100%; padding-top: 12px;font-size: 12pt; font-weight: 600;">
            {{ statusText(paciente.status_tratamento) }}
          </span>
        </div>
      </div>
    </div>

    <div class="p-horizontal-divider mt-0"></div>

    <div class="tratamento-tabs-container">
      <div class="tratamento-tab" :class="tratamentoTab == 'analise' ? 'active' : ''" style="flex: 3 1 100px"
        @click="selectTratamentoTab('analise')">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="mr-3" />
        Análise
      </div>
      <div class="tratamento-tab" :class="tratamentoTab == 'resumo' ? 'active' : ''" style="flex: 4 1  100px"
        @click="selectTratamentoTab('resumo')">
        <font-awesome-icon :icon="['fas', 'list-check']" class="mr-3" />
        Resumo e planejamento
      </div>
      <div class="tratamento-tab" :class="tratamentoTab == 'imagens' ? 'active' : ''" style="flex: 3 1  100px"
        @click="selectTratamentoTab('imagens')">
        <font-awesome-icon :icon="['fas', 'image']" class="mr-3" />
        Imagens
      </div>
      <div class="tratamento-tab" :class="tratamentoTab == 'historico' ? 'active' : ''" style="flex: 3 1  100px"
        @click="selectTratamentoTab('historico')">
        <font-awesome-icon :icon="['fas', 'history']" class="mr-3" />
        Histórico
      </div>
    </div>

<div class="p-horizontal-divider mb-0"></div>

    <Transition>
      <div class="tratamento-content" v-if="tratamentoTab === 'analise'">

        <div class="custom-card primary">
          <div class="custom-card-header">Intra-bucal<font-awesome-icon :icon="['fas', 'edit']" class="ml-3 pointer"
              title="Editar" /></div>
          <div class="custom-card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="info-container good">
                  <div style="width: 30px; text-align: center;">
                    <font-awesome-icon :icon="['fas', 'thumbs-up']" />
                  </div>
                  <div class="">
                    <span>Teste</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="info-container good">
                  <div style="width: 30px; text-align: center;">
                    <font-awesome-icon :icon="['fas', 'thumbs-up']" />
                  </div>
                  <div class="">
                    <span>Teste</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="custom-card primary mt-4">
          <div class="custom-card-header">Extra-bucal<font-awesome-icon :icon="['fas', 'edit']" class="ml-3 pointer"
              title="Editar" /></div>
          <div class="custom-card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="info-container good">
                  <div style="width: 30px; text-align: center;">
                    <font-awesome-icon :icon="['fas', 'thumbs-up']" />
                  </div>
                  <div class="">
                    <span>Teste</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="info-container good">
                  <div style="width: 30px; text-align: center;">
                    <font-awesome-icon :icon="['fas', 'thumbs-up']" />
                  </div>
                  <div class="">
                    <span>Teste</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="custom-card primary mt-4">
          <div class="custom-card-header">Análises radiográficas<font-awesome-icon :icon="['fas', 'edit']"
              class="ml-3 pointer" title="Editar" /></div>
          <div class="custom-card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="info-container good">
                  <div style="width: 30px; text-align: center;">
                    <font-awesome-icon :icon="['fas', 'thumbs-up']" />
                  </div>
                  <div class="">
                    <span>Teste</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="info-container good">
                  <div style="width: 30px; text-align: center;">
                    <font-awesome-icon :icon="['fas', 'thumbs-up']" />
                  </div>
                  <div class="">
                    <span>Teste</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Transition>
    <Transition>

      <div class="tratamento-content" v-if="tratamentoTab === 'resumo'">
        <div class="wrapper">
          <div class="box primary">
            <p class="custom-card-header">Diagnóstico<font-awesome-icon :icon="['fas', 'edit']" class="ml-3 pointer"
                title="Editar" /></p>
            <p class="text-justify py-2 px-4">
              Apinhamentos dentários severos com má oclusão Classe II, divisão 1 de Angle e mordida aberta
              anterior leve.
            </p>
          </div>
          <div class="box primary">
            <p class="custom-card-header">Prognóstico<font-awesome-icon :icon="['fas', 'edit']" class="ml-3 pointer"
                title="Editar" /></p>

            <p class="text-justify py-2 px-4">
              Favorável, com a expectativa de correção dos apinhamentos dentários e da má oclusão, proporcionando ao
              paciente um sorriso esteticamente agradável e funcional.
            </p>
          </div>
          <div class="box primary">
            <p class="custom-card-header">Metas terapêuticas<font-awesome-icon :icon="['fas', 'edit']"
                class="ml-3 pointer" title="Editar" /></p>

            <div v-for="meta in metasTerapeuticas" v-bind:key="meta.id" class="card m-3"
              :class="meta.finished ? 'border-success' : ''">
              <div class="fase-header d-flex flex-row">
                <div class="col" :style="meta.finished ? { 'padding-left': '30px' } : {}">
                  <strong>{{ meta.alvo }}</strong>
                </div>
                <div class="col-auto">
                  <button v-if="!meta.finished" class="btn btn-vsm btn-outline-success mr-1"
                    title="Marcar como concluída"><font-awesome-icon :icon="['fas', 'check']" /></button>
                  <span v-if="meta.finished" class="text-success px-2 text-sm font-weight-bold">
                    CONCLUÍDA
                  </span>
                </div>
              </div>
              <div class="card-body px-4 py-3 text-center" v-html="meta.meta.replaceAll('\n', '<br>')">
              </div>
            </div>

          </div>
          <div class="box primary">
            <p class="custom-card-header">Plano de tratamento<font-awesome-icon :icon="['fas', 'edit']"
                class="ml-3 pointer" title="Editar" /></p>
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
                <strong>Objetivo</strong>: descomprimir os arcos dentários e criar espaço para o alinhamento dos
                dentes.
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
                <span class="active"><strong>Fase 2 (atual): Alinhamento e Nivelamento (12 meses)</strong></span>
                <span class="text-sm font-weight-bold active">Maio/2024 a Maio/2025</span>
              </div>
              <div class="card-body px-4 py-3">
                <strong>Objetivo</strong>: alinhar e nivelar os dentes em ambos os arcos.
                <div class="p-horizontal-divider m2"></div>
                <strong>Mecânica</strong>: aparelho fixo vestibular com bráquetes metálicos e fios de níquel-titânio.
                <div class="p-horizontal-divider m2"></div>
                <strong>Acompanhamento</strong>: consultas quinzenais para ativação dos fios e ajustes no
                aparelho.<br>
              </div>
            </div>
            <div class="card m-3">
              <div class="fase-header">
                <strong>Fase 3: Finalização e Contenção (9 meses)</strong>
                <span class="text-sm">Maio/2024 a Maio/2025</span>
              </div>
              <div class="card-body px-4 py-3">
                <strong>Objetivo</strong>: finalizar o alinhamento e nivelamento dos dentes, estabelecer a oclusão
                ideal
                e
                manter a
                estabilidade do tratamento.
                <div class="p-horizontal-divider m2"></div>
                <strong>Mecânica</strong>: aparelho fixo vestibular com bráquetes metálicos e fios de aço inoxidável
                com
                posterior contenção fixa.
                <div class="p-horizontal-divider m2"></div>
                <strong>Acompanhamento</strong>: consultas mensais para ajustes no aparelho e acompanhamento da
                oclusão.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition>

      <div class="tratamento-content" v-if="tratamentoTab === 'imagens'">
        <div class="row border-between">
          <div class="col-md-6 border-end">            
            <div class="section-header">
              <font-awesome-icon :icon="['fas', 'x-ray']" />
              Radiografias
            </div>
          </div>
          <div class="col-md-6">           
            <div class="section-header">
              <font-awesome-icon :icon="['fas', 'camera']" />
              Fotos
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <Transition>

      <div class="tratamento-content" v-if="tratamentoTab === 'historico'">
        Histórico
      </div>
    </Transition>
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
  height: 42px;
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
  color: #4487d3;
  border: 2px solid #4487d3;
  border-radius: 3px;
}

.tratamento-tab:hover {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.01));
}

.tratamento-tab.active:hover {
  color: #4487d3;
  border: 2px solid #4487d3;
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
  gap: 16px;
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

.card-body {
  font-size: 1rem;
  font-weight: 300;
}

.fase-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(to right, #F8F8F8, #EEE, #F8F8F8);
  border-radius: 10px 10px 0px 0px;
  padding: 7px 5px;
}
</style>

<script>
import MaterialInput from "@/components/MaterialInput.vue";

var tratamentoTab = 'analise'

const metasTerapeuticas = [
  {
    id: 0,
    alvo: 'Apinhamentos Dentários',
    meta: 'Superior: 7 mm (medida de Steiner)\nInferior: 6 mm (medida de Steiner)',
    finished: true,
  },
  {
    id: 1,
    alvo: 'Mordida Aberta Anterior',
    meta: 'Vertical: 2 mm (medida interincisiva)\nHorizontal: 3 mm (medida interlabial)',
    finished: true,
  },
  {
    id: 2,
    alvo: 'Má Oclusão Classe II',
    meta: 'Overjet: 7 mm (medida de Moyers)\nOverbite: 2 mm (medida de Moyers)',
    finished: true,
  },
  {
    id: 3,
    alvo: 'Ângulo ANB',
    meta: '25° (valor normal entre 22° e 34°)',
    finished: false,
  },
  {
    id: 4,
    alvo: 'Ângulo SNA',
    meta: '80° (valor normal entre 78° e 82°)',
    finished: false,
  },
  {
    id: 5,
    alvo: 'Ângulo SNB',
    meta: '75° (valor normal entre 72° e 80°)',
    finished: false,
  },
];

const items = [
]
export default {
  name: "tratamento",
  props: {
    paciente: {
      type: Object,
    },
  },
  data() {
    return {
      items,
      tratamentoTab,
      metasTerapeuticas,
    }
  },
  methods: {
    statusClass(status) {
      const classMap = {
        'NÃO INICIADO': 'bg-gradient-warning',
        'CONCLUÍDO': 'bg-gradient-success',
        'ATIVO': 'bg-gradient-secondary',
      };

      return classMap[status] || '';
    },
    statusText(status) {
      const textMap = {
        'NÃO INICIADO': 'NÃO INICIADO',
        'CONCLUÍDO': 'CONCLUÍDO',
        'ATIVO': 'EM ANDAMENTO',
      };

      return textMap[status] || '';
    },
    selectTratamentoTab(tab) {
      this.tratamentoTab = tab
    }
  },
  components: {
    MaterialInput
  },
  computed: {
    getProgresso() {
      if (!this.paciente.data_inicio_tratamento)
        return '-';

      const inicio = new Date(this.paciente.data_inicio_tratamento);
      console.log('inicioo:', inicio)
      const termino = new Date(this.paciente.data_final_previsa);
      const hoje = new Date();

      if (hoje < inicio)
        return 0.00;
      if (hoje > termino)
        return 100.00;

      const duracaoTotal = termino.getTime() - inicio.getTime();
      const duracaoAteHoje = hoje.getTime() - inicio.getTime();

      const progresso = (duracaoAteHoje / duracaoTotal) * 100;

      return parseFloat(progresso.toFixed(2));
    },
  },

  mounted() {
  },
  beforeMount() {
  },
  beforeUnmount() {
  }
};
</script>