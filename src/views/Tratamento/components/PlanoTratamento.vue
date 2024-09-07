<template>
    <div class="tratamento-content">
        <div class="row">
            <div class="col-12">
                <div class="box primary" ref="metasTerapeuticasBox">
                    <p class="custom-card-header">
                        Metas terapêuticas
                        <font-awesome-icon :icon="['fas', 'edit']" class="ml-3 pointer"
                            :class="{ 'active': isEditing['metasTerapeuticas'] }"
                            :title="isEditing['metasTerapeuticas'] ? 'Sair do modo de edição' : 'Editar as metas terapêuticas'"
                            @click="toggleEditMode('metasTerapeuticas')" />
                    </p>

                    <div v-if="isEditing['metasTerapeuticas']" class="d-flex flex-row w-100 justify-center">
                        <button class="btn btn-sm btn-primary mt-3 mb-0 btn-edit"
                            title="Adicionar uma nova meta terapêutica">
                            Adicionar meta
                        </button>
                        <div class="p-vertical-divider"></div>
                        <button class="btn btn-sm btn-primary mt-3 mb-0 btn-edit"
                            title="Salvar as alterações realizadas">
                            Salvar
                        </button>
                    </div>

                    <div class="row px-3 pt-0 pb-1">
                        <div v-for="meta in paciente.metas_terapeuticas" v-bind:key="meta.id" class="col-sm-6 col-md-4">
                            <div class="card m-2 mx-0" :class="meta.concluida ? 'border-success' : ''">
                                <div class="fase-header d-flex flex-row">
                                    <i class="fas fa-trash ms-1 text-danger-dark pointer"
                                        v-if="isEditing['metasTerapeuticas']" title="Excluir esta meta terapêutica"></i>
                                    <div class="col" :style="meta.concluida ? { 'padding-left': '30px' } : {}">
                                        <strong>{{ meta.descricao }}</strong>
                                    </div>
                                    <div class="col-auto">
                                        <button v-if="!meta.concluida" class="btn btn-vsm btn-outline-success mr-1"
                                            title="Marcar como concluída"><font-awesome-icon
                                                :icon="['fas', 'check']" /></button>
                                        <button v-if="meta.concluida && isEditing['metasTerapeuticas']"
                                            class="btn btn-vsm btn-desmarcar-meta btn-success mr-1"
                                            title="Marcar como não concluída"><font-awesome-icon
                                                :icon="['fas', 'check']" /></button>
                                        <span v-if="meta.concluida && !isEditing['metasTerapeuticas']"
                                            class="text-success px-2 text-sm font-weight-bold">
                                            CONCLUÍDA
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-6 h-100">
                <div class="box primary mt-4">
                    <p class="custom-card-header">Aparatologia<font-awesome-icon :icon="['fas', 'edit']"
                            class="ml-3 pointer" :class="{ 'active': isEditing['aparatologia'] }"
                            :title="isEditing['aparatologia'] ? 'Sair do modo de edição' : 'Editar as metas terapêuticas'"
                            @click="toggleEditMode('aparatologia')" /></p>

                    <div v-if="isEditing['aparatologia']" class="d-flex flex-row w-100 justify-center my-3">
                        <button class="btn btn-sm btn-primary mb-0 btn-edit" title="Adicionar um novo item">
                            Adicionar
                        </button>
                        <div class="p-vertical-divider"></div>
                        <button class="btn btn-sm btn-primary mb-0 btn-edit" title="Salvar as alterações realizadas">
                            Salvar
                        </button>
                    </div>

                    <div class="card-body p-0 card-top-border">
                        <table class="table-sm table-striped w-100 table-aparatologia">
                            <tbody>
                                <tr v-for="item in aparatologia" v-bind:key="item.id">
                                    <td><strong>{{ item.name }}:</strong></td>
                                    <td>
                                        <span v-if="!isEditing['aparatologia']">{{ item.text }}</span>
                                        <select v-if="isEditing['aparatologia'] && item.type == 'options'"
                                            class="form-select select-sm" :value="item.text" style="min-width: 170px;">
                                            <option v-for="option in item.options" v-bind:key="option.id"
                                                :class="'text-' + option.mood" :selected="option.text == item.text">{{
                                                    option.text }}</option>
                                            <option>Outro (especificar)...</option>
                                        </select>
                                        <input v-if="false" class="form-control input-sm"
                                            placeholder="Especifique..." />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="col-6">
                <div class="box primary mt-4" style="height: calc(100% - 1.5rem)">
                    <p class="custom-card-header">Contenção<font-awesome-icon :icon="['fas', 'edit']"
                            class="ml-3 pointer" :class="{ 'active': isEditing['contencao'] }"
                            :title="isEditing['contencao'] ? 'Sair do modo de edição' : 'Editar as metas terapêuticas'"
                            @click="toggleEditMode('contencao')" /></p>

                    <div v-if="isEditing['contencao']" class="d-flex flex-row w-100 justify-center my-3">
                        <button class="btn btn-sm btn-primary mb-0 btn-edit" title="Adicionar um novo item">
                            Adicionar
                        </button>
                        <div class="p-vertical-divider"></div>
                        <button class="btn btn-sm btn-primary mb-0 btn-edit" title="Salvar as alterações realizadas">
                            Salvar
                        </button>
                    </div>

                    <div class="card-body p-0 card-top-border">
                        <table class="table-sm table-striped w-100 table-aparatologia">
                            <tbody>
                                <tr v-for="item in contencao" v-bind:key="item.id">
                                    <td><strong>{{ item.name }}:</strong></td>
                                    <td>
                                        <span v-if="!isEditing['contencao']">{{ item.text }}</span>
                                        <select v-if="isEditing['contencao'] && item.type == 'options'"
                                            class="form-select select-sm" :value="item.text" style="min-width: 170px;">
                                            <option v-for="option in item.options" v-bind:key="option.id"
                                                :class="'text-' + option.mood" :selected="option.text == item.text">{{
                                                    option.text }}</option>
                                            <option>Outro (especificar)...</option>
                                        </select>
                                        <input v-if="false" class="form-control input-sm"
                                            placeholder="Especifique..." />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <!-- <div class="box primary mt-4 pb-2">
                    <p class="custom-card-header mb-3">Planejamento<font-awesome-icon :icon="['fas', 'edit']"
                            class="ml-3 pointer" :class="{ 'active': isEditing['planoTratamento'] }"
                            :title="isEditing['planoTratamento'] ? 'Sair do modo de edição' : 'Editar as metas terapêuticas'"
                            @click="toggleEditMode('planoTratamento')" /></p>

                    <div v-if="isEditing['planoTratamento']" class="d-flex flex-row w-100 justify-center mt-0 mb-3">
                        <button class="btn btn-sm btn-primary mb-0 btn-edit"
                            title="Adicionar uma nova fase de tratamento">
                            Adicionar fase
                        </button>
                        <div class="p-vertical-divider"></div>
                        <button class="btn btn-sm btn-primary mb-0 btn-edit" title="Salvar as alterações realizadas"
                            @click="save('fasesTratamento')">
                            Salvar
                        </button>
                    </div>

                    <div v-for="(fase, index) in paciente.fases_tratamento" v-bind:key="fase.id">
                        <div class="card mx-3 my-2">

                            <div class="fase-header d-flex flex-row">
                                <i class="fas fa-trash ms-4 text-danger-dark pointer"
                                    v-if="isEditing['planoTratamento']" title="Excluir esta fase do plano de tratamento"
                                    style="font-size: 14pt;"></i>

                                <div class="col d-flex flex-column" style="padding-left: 30px;">

                                    <span :class="{ 'active': fase.id == paciente.fase_atual.id }">
                                        <strong>
                                            <span v-if="!isEditing['planoTratamento']">
                                                Fase {{ index + 1 }}
                                                <span v-if="fase.id == paciente.fase_atual.id">
                                                    (atual)</span>:
                                            </span>

                                            <span v-if="!isEditing['planoTratamento']">{{ fase.nome }}</span>

                                            <div v-if="isEditing['planoTratamento']" class="l-input-group mb-1">
                                                <span>Fase {{ index + 1 }}</span>
                                                <input type="text"
                                                    class="form-control inline-input text-center input-sm"
                                                    v-model="fase.nome" style="max-width: 250px;">
                                            </div>
                                            ({{ $filters.howMuchTime(fase.data_inicio, fase.data_fim, false) }})
                                        </strong>
                                    </span>

                                    <span v-if="!isEditing['planoTratamento']" class="text-sm"
                                        :class="{ 'font-weight-bold active': fase.id == paciente.fase_atual.id }"
                                        :style="new Date() >= new Date(fase.data_fim) ? { 'text-decoration': 'line-through' } : {}">
                                        {{ $filters.dateDDY(fase.data_inicio) }}
                                        a
                                        {{ $filters.dateDDY(fase.data_fim) }}
                                    </span>

                                    <div v-if="isEditing['planoTratamento']"
                                        class="d-flex flex-row flex-wrap l-input-group mt-2 w-100 pe-2"
                                        style="margin: 0 auto;">
                                        <span>De</span>
                                        <input type="date" class="form-control input-sm" v-model="fase.data_inicio"
                                            style="max-width: 165px;" />
                                        <span>a</span>
                                        <input type="date" class="form-control input-sm" v-model="fase.data_fim"
                                            style="max-width: 165px;" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-body px-4 py-3">
                                <strong>Objetivo</strong>:
                                <span v-if="!isEditing['planoTratamento']">{{ fase.objetivo }}</span>
                                <textarea v-if="isEditing['planoTratamento']" class="form-control"
                                    v-model="fase.objetivo"></textarea>

                                <div class="p-horizontal-divider m2"></div>
                                <strong>Mecânica</strong>:
                                <span v-if="!isEditing['planoTratamento']">{{ fase.mecanica }}</span>
                                <textarea v-if="isEditing['planoTratamento']" class="form-control"
                                    v-model="fase.mecanica"></textarea>

                                <div class="p-horizontal-divider m2"></div>
                                <strong>Acompanhamento</strong>:
                                <span v-if="!isEditing['planoTratamento']">{{ fase.acompanhamento }}</span>
                                <textarea v-if="isEditing['planoTratamento']" class="form-control"
                                    v-model="fase.acompanhamento"></textarea>
                            </div>
                        </div>

                        <font-awesome-icon v-if="index < paciente.fases_tratamento.length - 1"
                            :icon="['fas', 'arrow-down']" />
                    </div>
                </div> -->
                
                <div class="custom-card primary mt-4">
                    <p class="custom-card-header">Necessidade de encaminhamentos<font-awesome-icon
                            :icon="['fas', 'edit']" class="ml-3 pointer"
                            :class="{ 'active': isEditing['necessidadesEncaminhamento'] }"
                            :title="isEditing['necessidadesEncaminhamento'] ? 'Sair do modo de edição' : 'Editar as necessidades de encaminhamento'"
                            @click="toggleEditMode('necessidadesEncaminhamento')" /></p>

                    <div v-if="isEditing['necessidadesEncaminhamento']" class="w-100 text-center mb-3">
                        <div class="p-vertical-divider"></div>
                        <button class="btn btn-sm btn-primary mt-3 mb-0 btn-edit"
                            title="Salvar as alterações realizadas">
                            Salvar
                        </button>
                    </div>
                    <p v-if="!isEditing['necessidadesEncaminhamento']" class="text-justify py-2 px-4">
                        Não há necessidade de encaminhamentos.
                    </p>
                    <textarea v-if="isEditing['necessidadesEncaminhamento']" name="" id="" class="form-control"
                        rows="4">Não há necessidade de encaminhamentos.</textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tratamento-tab {
    text-align: center;
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

.card {
    border: 1px solid #DDD;
}

.card-body {
    font-size: 1rem;
    font-weight: 300;
}
</style>

<script>

const aparatologia = [
    {
        id: 10,
        name: 'Aparelho utilizado',
        text: 'autoligado metálico bidimensional',
        observation: '',
        type: 'options',
        options: [
            { id: 10, text: 'autoligado metálico bidimensional' },
            { id: 20, text: 'autoligado estético' },
            { id: 30, text: 'alinhadores' },
            { id: 40, text: 'miofuncional' },
            { id: 50, text: 'autoligado + miofuncional' },
            { id: 60, text: 'alinhadores + miofuncional' },
        ],
    },
    {
        id: 20,
        name: 'Tipo de colagem',
        text: 'Alexander (x = centro da coroa clínica pré-molar)',
        observation: '',
        type: 'options',
        options: [
            { id: 70, text: 'agradávRoth (x = 4)el' },
            { id: 80, text: 'Alexander (x = centro da coroa clínica pré-molar)' },
            { id: 90, text: 'Pitts (smile arc)' },
            { id: 95, text: 'SADB' },
        ],
    },
    // {
    //     id: 50,
    //     name: 'Necessidade de exercícios miofuncionais',
    //     text: 'nenhuma',
    //     observation: '',
    //     type: 'options',
    //     options: [
    //         { id: 150, text: 'nenhuma' },
    //         { id: 160, text: 'respiração' },
    //         { id: 170, text: 'deglutição' },
    //         { id: 180, text: 'posição de língua' },
    //     ]
    // },
]

const contencao = [
    {
        id: 30,
        name: 'Contenção superior',
        text: 'placa acetato',
        observation: '',
        type: 'options',
        options: [
            { id: 100, text: 'placa acetato' },
            { id: 105, text: 'placa acetato com posicionado de língua' },
            { id: 110, text: 'placa Hawley' },
            { id: 115, text: 'placa picvem' },
            { id: 120, text: 'placa acetato + placa de Michigan' },
            { id: 125, text: 'contenção fixa 6x6' },
        ],
    },
    {
        id: 40,
        name: 'Contenção inferior',
        text: 'placa acetato',
        observation: '',
        type: 'options',
        options: [
            { id: 130, text: 'placa acetato' },
            { id: 140, text: 'contenção fixa 6x6' },
        ]
    },
    // {
    //     id: 50,
    //     name: 'Necessidade de exercícios miofuncionais',
    //     text: 'nenhuma',
    //     observation: '',
    //     type: 'options',
    //     options: [
    //         { id: 150, text: 'nenhuma' },
    //         { id: 160, text: 'respiração' },
    //         { id: 170, text: 'deglutição' },
    //         { id: 180, text: 'posição de língua' },
    //     ]
    // },
]

var isEditing = []

export default {
    name: "PlanoTratamento",
    props: {
        paciente: {
            type: Object,
        },
    },
    data() {
        return {
            isEditing,
            aparatologia,
            contencao,
        }
    },
    computed: {
        ultimaFase() {
            return this.paciente.fases_tratamento[this.paciente.fases_tratamento.length - 1];
        }
    },
    methods: {
        save(section) {
            switch (section) {
                case 'fasesTratamento':
                    this.saveFasesTratamento();
                    break;
                case 'aparatologia':
                    this.saveAparatologia()
                    break
                case 'metasTerapeuticas':
                    this.saveMetasTerapeuticas()
            }
        },
        saveFasesTratamento() {
        },
        saveAparatologia() {

        },
        saveMetasTerapeuticas() {

        },
        toggleEditMode(section) {
            this.isEditing[section] = !this.isEditing[section]
        },
        textNewLine(descricao) {
            return descricao.replaceAll('\\n', '&#13;&#10;')
        }
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