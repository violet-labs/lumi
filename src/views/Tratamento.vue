<template>
  <div>
    <div class="row py-3 py-md-0 px-3">
      <div class="col-sm-6 col-md-4 px-2 py-1 py-md-3 text-center">
        <material-input label="Fase atual (2/3)" readonly type="text" centered value="Alinhamento e Nivelamento"
          id="paciente_inicio_tratamento" label-class="me-3" />
        <span class="text-sm">Maio/2024 a Maio/2025</span>
      </div>
      <div class="col-sm-6 col-md-2 px-2 py-1 py-md-3 text-center">
        <material-input label="Início do tratamento" readonly type="text" centered
          v-bind:value="$filters.dateDmy(paciente.data_inicio_tratamento)" id="paciente_inicio_tratamento"
          label-class="me-3" />
        <span class="text-sm">há 4 anos</span>
      </div>
      <div class="col-sm-6 col-md-2 px-2 py-1 py-md-3 text-center">
        <material-input label="Término previsto" readonly type="text" centered
          v-bind:value="$filters.dateDmy(paciente.data_final_previsa)" id="paciente_inicio_tratamento"
          label-class="me-3" />
        <span class="text-sm text-success">em 1 ano</span>
      </div>
      <div class="col-sm-6 col-md-4 px-2 py-1 py-md-3 text-center" v-if="paciente.status_tratamento == 'ATIVO'">
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
      <div class="col-sm-6 col-md-4 py-1 py-md-3 px-2 text-center" v-if="paciente.status_tratamento != 'ATIVO'">
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
      <div class="tratamento-content" v-if="tratamentoTab === 'analise'">

        <div class="row">
          <div class="col-md-5 pe-md-1">

            <div class="custom-card primary">
              <div class="custom-card-header">
                Extra-bucal
                <font-awesome-icon :icon="['fas', 'edit']" class="ml-3 pointer" title="Editar" />
              </div>
              <div class="custom-card-body p-0">
                <v-table density="compact" class="analises-table">
                  <tbody>
                    <tr v-for="analise in analises['Extra-bucal']" v-bind:key="analise.id" :class="analise.type">
                      <td>
                        {{ analise.name }}
                      </td>
                      <td>
                        {{ analise.text }}
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </div>
            </div>

          </div>

          <div class="col-md-7 mt-4 mt-md-0">
            <div class="custom-card primary">
              <div class="custom-card-header">Intra-bucal<font-awesome-icon :icon="['fas', 'edit']" class="ml-3 pointer"
                  title="Editar" /></div>
              <div class="custom-card-body p-0">
                <v-table density="compact" class="analises-table">
                  <tbody>
                    <tr v-for="analise in analises['Intra-bucal']" v-bind:key="analise.id" :class="analise.type">
                      <td>
                        {{ analise.name }}
                      </td>
                      <td>
                        {{ analise.text }}
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </div>
            </div>
          </div>

          <div class="col-md-5 pe-md-1">
            <div class="custom-card primary mt-4">
              <div class="custom-card-header">Análises radiográficas<font-awesome-icon :icon="['fas', 'edit']"
                  class="ml-3 pointer" title="Editar" /></div>
              <div class="custom-card-body p-0">
                <v-table density="compact" class="analises-table">
                  <tbody>
                    <tr v-for="analise in analises['Radiográficas']" v-bind:key="analise.id" :class="analise.type">
                      <td>
                        {{ analise.name }}
                      </td>
                      <td>
                        {{ analise.text }}
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </div>
            </div>

            <div class="custom-card primary mt-4">
              <div class="custom-card-header">Necessidade de encaminhamentos<font-awesome-icon :icon="['fas', 'edit']"
                  class="ml-3 pointer" title="Editar" /></div>
              <div class="custom-card-body pt-2">
                Não há necessidade de encaminhamentos.
              </div>
            </div>
          </div>

          <div class="col-md-7">
            <div class="custom-card primary mt-4">
              <div class="custom-card-header">
                Relatos do paciente
              </div>
              <div class="custom-card-body p-0 pb-3">
                <div class="row px-3">
                  <div v-for="(perceptions, categoria) in personalPerceptions" v-bind:key="perceptions"
                    class="col-md-6 mt-2 px-2 py-1">
                    <div class="card">
                      <div class="card-header p-3 pb-0">
                        <p class="text-uppercase text-sm" style="font-weight: 500">{{ categoria }}</p>
                      </div>
                      <div class="card-body m-0 p-3 pt-2">
                        <div class="info-container" v-for="perception in perceptions" v-bind:key="perception.text"
                          :class="perception.type">
                          <div style="width: 30px; text-align: center;">
                            <font-awesome-icon :icon="['fas', getInfoIcon(perception.type)]" />
                          </div>
                          <div class="">
                            <span>{{ perception.text }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </Transition>
    <Transition>

      <div class="tratamento-content" v-if="tratamentoTab === 'diagnostico'">
        <div class="row">

          <div class="col-12">
            <div class="box primary">
              <p class="custom-card-header">Tratamento recomendado<font-awesome-icon :icon="['fas', 'edit']" class="ml-3 pointer"
                  title="Editar" /></p>
              <div>

              </div>
            </div>
          </div>

          <div class="col-md-6 mt-3">
            <div class="box primary">
              <p class="custom-card-header">Diagnóstico<font-awesome-icon :icon="['fas', 'edit']" class="ml-3 pointer"
                  title="Editar" /></p>
              <p class="text-justify py-2 px-4">
                Apinhamentos dentários severos com má oclusão Classe II, divisão 1 de Angle e mordida aberta
                anterior leve.
              </p>
            </div>
          </div>

          <div class="col-md-6 mt-3">
            <div class="box primary">
              <p class="custom-card-header">Prognóstico<font-awesome-icon :icon="['fas', 'edit']" class="ml-3 pointer"
                  title="Editar" /></p>
              <p class="text-justify py-2 px-4">
                Favorável, com a expectativa de correção dos apinhamentos dentários e da má oclusão, proporcionando ao
                paciente um sorriso esteticamente agradável e funcional.
              </p>
            </div>
          </div>

        </div>
      </div>
    </Transition>


    <Transition>

      <div class="tratamento-content" v-if="tratamentoTab === 'planoTratamento'">
        <div class="row">
          <div class="col-md-6">
            <div class="box primary" ref="metasTerapeuticasBox">
              <p class="custom-card-header">
                Metas terapêuticas
                <font-awesome-icon :icon="['fas', 'edit']" class="ml-3 pointer"
                  :class="{ 'active': isEditing['metasTerapeuticas'] }"
                  :title="isEditing['metasTerapeuticas'] ? 'Sair do modo de edição' : 'Editar as metas terapêuticas'"
                  @click="toggleEditMode('metasTerapeuticas')" />
              </p>
              <button class="btn btn-sm btn-primary mt-3 mb-0" v-if="isEditing['metasTerapeuticas']"
                title="Adicionar uma nova meta terapêutica">
                Adicionar
              </button>
              <div v-for="meta in metasTerapeuticas" v-bind:key="meta.id" class="card m-3"
                :class="meta.finished ? 'border-success' : ''">
                <div class="fase-header d-flex flex-row">
                  <i class="fas fa-trash ms-1 text-danger-dark pointer" v-if="isEditing['metasTerapeuticas']"
                    title="Excluir esta meta terapêutica"></i>
                  <div class="col" :style="meta.finished ? { 'padding-left': '30px' } : {}">
                    <strong>{{ meta.alvo }}</strong>
                  </div>
                  <div class="col-auto">
                    <button v-if="!meta.finished" class="btn btn-vsm btn-outline-success mr-1"
                      title="Marcar como concluída"><font-awesome-icon :icon="['fas', 'check']" /></button>
                    <button v-if="meta.finished && isEditing['metasTerapeuticas']"
                      class="btn btn-vsm btn-desmarcar-meta btn-success mr-1"
                      title="Marcar como não concluída"><font-awesome-icon :icon="['fas', 'check']" /></button>
                    <span v-if="meta.finished && !isEditing['metasTerapeuticas']"
                      class="text-success px-2 text-sm font-weight-bold">
                      CONCLUÍDA
                    </span>
                  </div>
                </div>
                <div class="card-body px-4 py-3 text-center" v-html="meta.meta.replaceAll('\n', '<br>')">
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="box primary">
              <p class="custom-card-header">Aparatologia<font-awesome-icon :icon="['fas', 'edit']" class="ml-3 pointer"
                  title="Editar" /></p>
              <div class="card-body p-0">

                <table class="table-sm table-striped w-100 table-aparatologia">
                  <tbody>
                    <tr>
                      <td><strong>Aparelho utilizado:</strong></td>
                      <td>autoligado metálico bidimensional</td>
                    </tr>
                    <tr>
                      <td><strong>Tipo de colagem:</strong></td>
                      <td>Alexander (x = centro da coroa clínica pré-molar)</td>
                    </tr>
                    <tr>
                      <td><strong>Contenção superior:</strong></td>
                      <td>placa acetato</td>
                    </tr>
                    <tr>
                      <td><strong>Contenção inferior:</strong></td>
                      <td>placa acetato</td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
            <div class="box primary mt-4">
              <p class="custom-card-header">Plano de tratamento<font-awesome-icon :icon="['fas', 'edit']"
                  class="ml-3 pointer" title="Editar" /></p>

              <div class="card m-3 mb-2">
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

              <font-awesome-icon :icon="['fas', 'arrow-down']" />
              <div class="card m-3 mt-2 mb-2 active">
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
              <font-awesome-icon :icon="['fas', 'arrow-down']" />
              <div class="card m-3 mt-2">
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
      </div>
    </Transition>

    <Transition>

      <div class="tratamento-content" v-if="tratamentoTab === 'imagens'">
        <div class="row border-between">
          <div class="col-md-6 border-end">
            <div class="section-header">
              <font-awesome-icon :icon="['fas', 'x-ray']" />
              Radiografias
              <div class="p-horizontal-divider"></div>
              <div class="radiografias-container w-100">
                <div class="row">
                  <div class="col-md-12">
                    <v-table>
                      <tbody>
                        <tr>
                          <td class="bg-gradient-light text-dark text-center"
                            style="border-radius: 3px; padding: 2px 20px;">
                            Ainda não há radiografias.
                          </td>
                        </tr>
                        <tr>
                          <td class="text-center pt-3">
                            <button class="btn bg-gradient-primary">
                              Adicionar
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </v-table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-horizontal-divider d-block d-md-none"></div>
          <div class="col-md-6">
            <div class="section-header">
              <font-awesome-icon :icon="['fas', 'camera']" />
              Fotos
              <div class="p-horizontal-divider"></div>
              <div class="fotos-container w-100">
                <div class="row">
                  <div class="col-md-12">
                    <v-table>
                      <tbody>
                        <tr>
                          <td class="bg-gradient-light text-dark text-center"
                            style="border-radius: 3px; padding: 2px 20px;">
                            Ainda não há fotos.
                          </td>
                        </tr>
                        <tr>
                          <td class="text-center pt-3">
                            <input type="file" accept="image/*" @change="uploadImage($event, 'radiografia')"
                              id="file-input">

                            <button class="btn bg-gradient-primary">
                              Adicionar
                            </button>

                          </td>
                        </tr>
                      </tbody>
                    </v-table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition>
      <div class="tratamento-content" v-if="tratamentoTab === 'historico'">
        <div class="row">
          <div class="col-md-12">
            <v-table>
              <tbody>
                <tr>
                  <td class="bg-gradient-light text-dark text-center" style="border-radius: 3px; padding: 2px 20px;">
                    Não há histórico a ser exibido.
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
          <!-- <div class="col-md-4">
          <profile-card />
        </div> -->
        </div>
      </div>
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

.wrapper {
  display: -ms-flexbox;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.box {
  /* box-sizing: border-box;
  width: calc(50% - 10px); */
  text-align: center;
  align-items: center;
  vertical-align: middle;

  border: 1px solid #DDD;
  border-radius: 5px;

  /* @media (max-width: 768px) {
    width: 100%;
  } */
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
  background: linear-gradient(to right, #E8E8E8, #DDD, #E8E8E8);
  border-radius: 10px 10px 0px 0px;
  padding: 7px 5px;
}

.table-aparatologia td {
  padding: 10px 10px;
  text-align: center;
  border-bottom: 1px solid #DDD;
}

.table-aparatologia tr>td:first-child {
  width: 40%;
  background: #F8F8F8;
  border-right: 1px solid #DDD;
}

.table-aparatologia tr>td:last-child {
  font-weight: 500;
  font-size: 11pt;
}
</style>

<script>

import MaterialInput from "@/components/MaterialInput.vue";
import { uploadImage } from "@/services/pacientesService"

const analises = {
  'Extra-bucal': [
    {
      id: 10,
      type: 'good',
      name: 'Agradabilidade facial',
      text: 'aceitável',
      observation: '',
    },
    {
      id: 20,
      type: 'neutral',
      name: 'Biotipo facial',
      text: 'dolicocefálico',
      observation: '',
    },
    {
      id: 30,
      type: 'good',
      name: 'Simetria facial',
      text: 'simétrico',
      observation: '',
    },
    {
      id: 40,
      type: 'neutral',
      name: 'Perfil facial',
      text: 'convexo',
      observation: '',
    },
    {
      id: 50,
      type: 'good',
      name: 'Selamento labial',
      text: 'selamento passivo',
      observation: '',
    },
    {
      id: 60,
      type: 'neutral',
      name: 'Exposição dos dentes no sorriso',
      text: 'normal',
      observation: '',
    },
    {
      id: 70,
      type: 'neutral',
      name: 'Exposição gengival ao sorrir',
      text: 'baixa',
      observation: '',
    },
    {
      id: 80,
      type: 'bad',
      name: 'ATM',
      text: 'dor e estalido',
      observation: '',
    },
    {
      id: 90,
      type: 'bad',
      name: 'Respiração',
      text: 'bucal',
      observation: '',
    },
    {
      id: 100,
      type: 'bad',
      name: 'Deglutição',
      text: 'adaptada',
      observation: '',
    },
    {
      id: 110,
      type: 'bad',
      name: 'Hábitos',
      text: 'dedo e chupeta',
      observation: '',
    },
    {
      id: 120,
      type: 'bad',
      name: 'Posição da língua',
      text: 'posteriorizada',
      observation: '',
    },
  ],

  'Intra-bucal': [
    {
      id: 130,
      type: 'neutral',
      name: 'Dentição',
      text: 'permanente',
      observation: '',
    },
    {
      id: 140,
      type: 'attention',
      name: 'Diferença entre RC e MIH',
      text: 'diferença relevante - sem sintomas DTM',
      observation: '',
    },
    {
      id: 150,
      type: 'bad',
      name: 'Relação molar',
      text: 'classe II bilateral',
      observation: '',
    },
    {
      id: 160,
      type: 'bad',
      name: 'Relação canina - lado DIREITO',
      text: 'relação Classe II',
      observation: '',
    },
    {
      id: 170,
      type: 'bad',
      name: 'Relação canina - lado ESQUERDO',
      text: 'relação Classe II',
      observation: '',
    },
    {
      id: 180,
      type: 'attention',
      name: 'Análise transversal',
      text: 'deficiência dentária: cruzada unilateral funcional',
      observation: '',
    },
    {
      id: 190,
      type: 'attention',
      name: 'Análise vertical',
      text: 'mordida aberta - esquelética',
      observation: '',
    },
    {
      id: 200,
      type: 'attention',
      name: 'Curva de Spee',
      text: 'pouco aumentada',
      observation: '',
    },
    {
      id: 210,
      type: 'attention',
      name: 'Linha média',
      text: 'desvio superior para direita',
      observation: '',
    },
    {
      id: 220,
      type: 'neutral',
      name: 'Formato do arco superior',
      text: 'triangular',
      observation: '',
    },
    {
      id: 230,
      type: 'good',
      name: 'Formato do arco inferior',
      text: 'normal',
      observation: '',
    },
    {
      id: 240,
      type: 'bad',
      name: 'Apinhamentos',
      text: 'superior - severo',
      observation: '',
    },
    {
      id: 250,
      type: 'bad',
      name: 'Diastemas',
      text: 'superior',
      observation: '',
    },
  ],

  'Radiográficas': [
    {
      id: 260,
      type: 'bad',
      name: 'Ausência de dentes',
      text: 'existem dentes ausentes',
      observation: '',
    },
    {
      id: 270,
      type: 'attention',
      name: 'Inclinação dos incisivos superiores',
      text: 'vestibularizados',
      observation: '',
    },
    {
      id: 280,
      type: 'bad',
      name: 'Posição dos incisivos superiores',
      text: 'protruídos',
      observation: '',
    },
    {
      id: 290,
      type: 'good',
      name: 'Inclinação dos incisivos inferiores',
      text: 'bem posicionados',
      observation: '',
    },
    {
      id: 300,
      type: 'good',
      name: 'Posição dos incisivos inferiores',
      text: 'bem posicionados',
      observation: '',
    },
    {
      id: 310,
      type: 'neutral',
      name: 'Outras observações',
      text: '',
      observation: '',
    },
  ],
}

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

var isEditing = []

const items = []

export default {
  name: "tratamento",
  props: {
    paciente: {
      type: Object,
    },
    personalPerceptions: {
      type: Array,
    },
  },
  data() {
    return {
      items,
      tratamentoTab,
      isEditing,
      metasTerapeuticas,
      analises,
    }
  },
  methods: {
    uploadImage,
    toggleEditMode(section) {
      this.isEditing[section] = !this.isEditing[section]

      if (this.isEditing[section]) {
        this.$refs['metasTerapeuticasFraming'].scrollIntoView(
          {
            behavior: 'smooth',
          }
        )
      }
    },
    getInfoIcon(type) {
      var icon = null
      switch (type) {
        case 'good':
          icon = 'thumbs-up'
          break
        case 'bad':
          icon = 'thumbs-down'
          break
        case 'attention':
          icon = 'circle-exclamation'
          break
        case 'neutral':
          icon = 'info-circle'
          break
      }

      return icon
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
    selectTratamentoTab(tab) {
      this.tratamentoTab = tab
    },
    getTextClass(type) {
      var textClass = null
      switch (type) {
        case 'neutral':
          textClass = 'text-dark'
          break
        case 'good':
          textClass = 'text-success'
          break
        case 'attention':
          textClass = 'text-warning'
          break
        case 'bad':
          textClass = 'text-danger'
          break
      }
      return textClass
    },
  },
  components: {
    MaterialInput
  },
  computed: {
    getProgresso() {
      if (!this.paciente.data_inicio_tratamento)
        return '-';

      const inicio = new Date(this.paciente.data_inicio_tratamento);
      const termino = new Date(this.paciente.data_final_previsa);
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
  },
  beforeMount() {
  },
  beforeUnmount() {
  }
};
</script>