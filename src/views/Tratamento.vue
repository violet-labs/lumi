<template>
  <div>
    <div class="row py-3 py-md-0 px-3">

      <div class="col-sm-6 col-md-3 px-2 py-1 py-md-3 text-center">

        <MaterialInput v-if="isEditing['data_inicio_tratamento']" label="Início do tratamento" type="date" centered
          v-model="data_inicio_tratamento" id="paciente_inicio_tratamento" label-class="me-3" />

        <MaterialInput v-if="!isEditing['data_inicio_tratamento']" label="Início do tratamento" readonly type="text" centered
          :modelValue="data_inicio_tratamento" label-class="me-3" @click="toggleEditMode('data_inicio_tratamento')" />

        <span class="text-sm">{{ $filters.howMuchTime(data_inicio_tratamento, new Date()) }}</span>
      </div>

      <div class="col-sm-6 col-md-3 px-2 py-1 py-md-3 text-center">

        <MaterialInput v-if="isEditing['data_final_prevista']" label="Início do tratamento" type="date" centered
          v-model="data_final_prevista" id="paciente_inicio_tratamento" label-class="me-3" />

        <MaterialInput v-if="!isEditing['data_final_prevista']" label="Início do tratamento" readonly type="text" centered
          :modelValue="data_final_prevista" label-class="me-3" @click="toggleEditMode('data_final_prevista')" />

      </div>

      <div class="col-md-6 px-2 py-1 py-md-3 text-center" v-if="paciente.status_tratamento == 'ATIVO'">
        <label for="" class="me-3">Progresso</label>
        <div class="d-flex flex-column align-items-center justify-content-center w-100 p-0 m-0">
          <div class="progress progress-lg w-100" style="">
            <div :style="{ width: getProgresso + '%' }">
              <div class="progress-bar bg-gradient-success" role="progressbar" aria-valuenow="95" aria-valuemin="0"
                aria-valuemax="100"></div>
            </div>
          </div>
          <span class="me-2"
            style="margin-top: -34px; background: rgba(255, 255, 255, 0.4); font-weight: 500 !important; font-size: 13pt; padding: 0px 9px; border-radius: 0.375rem; color: #666;">{{
              getProgresso }}%</span>
          <span class="text-sm" style="margin-top: 11px;">com <strong>3 de 6</strong> metas concluídas</span>
        </div>
      </div>

      <div class="col-md-6 py-1 py-md-3 px-2 text-center" v-if="paciente.status_tratamento != 'ATIVO'">
        <div class="d-flex flex-column w-100 p-0 m-0">
          <label for="">Status</label>
          <span class="badge badge-sm" :class="statusClass(paciente.status_tratamento)"
            style="height: 42px; width: 100%; padding-top: 12px;font-size: 12pt; font-weight: 600;">
            {{ statusText(paciente.status_tratamento) }}
          </span>
        </div>
      </div>
    </div>

    <div class="p-horizontal-divider my-0" ref="metasTerapeuticasFraming"></div>

    <div class="py-2 px-3 d-flex flex-row img-carousel-container" v-viewer>
      <div v-for="imagem in imagens" :key="imagem.url">
        <img :src="imagem.url" :key="imagem.url" alt="">
      </div>
    </div>

    <div class="p-horizontal-divider my-0" ref="metasTerapeuticasFraming"></div>

    <div class="d-flex flex-row w-100" style="padding: 15px 10px; align-content: space-evenly !important;">
      <div class="tratamento-tab" :class="tratamentoTab == 'analise' ? 'active' : ''"
        @click="selectTratamentoTab('analise')">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="mr-3" />
        Análise
      </div>
      <div class="tratamento-tab" :class="tratamentoTab == 'diagnostico' ? 'active' : ''"
        @click="selectTratamentoTab('diagnostico')">
        <font-awesome-icon :icon="['fas', 'tooth']" class="mr-3" />
        Diagnóstico
      </div>
      <div class="tratamento-tab" :class="tratamentoTab == 'planoTratamento' ? 'active' : ''"
        @click="selectTratamentoTab('planoTratamento')">
        <font-awesome-icon :icon="['fas', 'file-pen']" class="mr-3" />
        Plano de tratamento
      </div>
      <div class="tratamento-tab" :class="tratamentoTab == 'imagens' ? 'active' : ''"
        @click="selectTratamentoTab('imagens')">
        <font-awesome-icon :icon="['fas', 'image']" class="mr-3" />
        Imagens
      </div>
      <div class="tratamento-tab" :class="tratamentoTab == 'historico' ? 'active' : ''"
        @click="selectTratamentoTab('historico')" style="flex: 1">
        <font-awesome-icon :icon="['fas', 'history']" class="mr-3" />
        Histórico
      </div>
    </div>

    <div class="p-horizontal-divider mt-0"></div>

    <Transition>
      <Analise v-if="tratamentoTab === 'analise'" :paciente="paciente" :detalhesClinicos="detalhesClinicos"
        @pacienteChange="$emit('pacienteChange')" />
    </Transition>

    <Transition>
      <Diagnostico v-if="tratamentoTab === 'diagnostico'" :paciente="paciente" :diagnostico="paciente.diagnostico"
        :prognostico="paciente.prognostico" @pacienteChange="$emit('pacienteChange')" />
    </Transition>

    <Transition>
      <PlanoTratamento v-if="tratamentoTab === 'planoTratamento'" :paciente="paciente"
        @pacienteChange="$emit('pacienteChange')" />
    </Transition>

    <Transition>
      <Imagens v-if="tratamentoTab === 'imagens'" :paciente="paciente" @pacienteChange="$emit('pacienteChange')" />
    </Transition>

    <Transition>
      <Historico v-if="tratamentoTab === 'historico'" />
    </Transition>

  </div>
</template>

<style scoped>
.tratamento-tabs-container {
  /* display: flex;
  flex-wrap: wrap; */
  border-radius: 5px;
}

.tratamento-tab {
  flex: 1.5;
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
  padding-top: 5px;
}

.img-carousel-container {
  overflow-y: hidden;
  overflow-x: auto;
  background: #F2F2F2;
  border-width: 0px 1px 0px 1px;
  border-style: solid;
  border-color: #e2e2e2;
  gap: 10px;
}

.img-carousel-container>div {
  background: #000;
  border: 2px solid #666;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 3px;
}

.img-carousel-container img {
  max-width: 100px;
  max-height: 70px;
}

.img-carousel-container>div:hover {
  filter: brightness(90%);
}

.empty-photo {
  width: 300px;
  height: 96px;
}
</style>

<script>
import MaterialInput from "@/components/MaterialInput.vue";
import Analise from "./Tratamento/components/Analise.vue"
import Diagnostico from "./Tratamento/components/Diagnostico.vue"
import Historico from "./Tratamento/components/Historico.vue"
import Imagens from "./Tratamento/components/Imagens.vue"
import PlanoTratamento from "./Tratamento/components/PlanoTratamento.vue"

var tratamentoTab = 'analise'
const items = []
var isEditing = []

export default {
  name: "tratamento",
  props: {
    paciente: {
      type: Object,
    },
  },
  data() {
    return {
      isEditing,
      items,
      tratamentoTab,
      data_inicio_tratamento: null,
      data_final_prevista: null,
    }
  },
  methods: {
    selectTratamentoTab(tab) {
      this.tratamentoTab = tab
    },
    toggleEditMode(section) {
      this.isEditing[section] = !this.isEditing[section]
    },
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
    getProgressoClass(progresso) {
      if (progresso < 20)
        return 'bg-gradient-warning'
      else if (progresso < 70)
        return 'bg-gradient-primary'
      else
        return 'bg-gradient-success'
    },
  },
  components: {
    Analise,
    Diagnostico,
    Historico,
    Imagens,
    PlanoTratamento,
    MaterialInput,
  },
  computed: {
    imagens() {
      return this.paciente.imagens.filter(imagem => imagem.dir !== 'profile_pic');
    },
    detalhesClinicos() {
      return this.paciente.detalhes_paciente ? this.paciente.detalhes_paciente.filter(detalhe => detalhe.tipo == 'clinico') : [];
    },
    ultimaFase() {
      return this.paciente.fases_tratamento[this.paciente.fases_tratamento.length - 1].data_fim;
    },
    getProgresso() {
      if (!this.paciente)
        return

      if (!this.paciente.data_inicio_tratamento)
        return '-';

      const inicio = new Date(this.paciente.data_inicio_tratamento);
      const termino = new Date(this.paciente.data_final_prevista);
      const hoje = new Date();

      if (hoje < inicio)
        return 0.00;
      if (hoje > termino)
        return 100.00;

      const duracaoTotal = termino.getTime() - inicio.getTime();
      const duracaoAteHoje = hoje.getTime() - inicio.getTime();

      const progresso = (duracaoAteHoje / duracaoTotal) * 100;

      return parseFloat(progresso.toFixed(1));
    },
  },

  mounted() {
    this.data_inicio_tratamento = this.paciente.data_inicio_tratamento
    this.data_final_prevista = this.paciente.data_final_prevista
  },
  beforeMount() {
  },
  beforeUnmount() {
  }
};
</script>