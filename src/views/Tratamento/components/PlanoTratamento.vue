<template>
    <div class="tratamento-content">
        <div class="row">
            <div class="col-md-5">
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
                                    title="Marcar como concluída"><font-awesome-icon
                                        :icon="['fas', 'check']" /></button>
                                <button v-if="meta.finished && isEditing['metasTerapeuticas']"
                                    class="btn btn-vsm btn-desmarcar-meta btn-success mr-1"
                                    title="Marcar como não concluída"><font-awesome-icon
                                        :icon="['fas', 'check']" /></button>
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
            <div class="col-md-7">
                <div class="box primary">
                    <p class="custom-card-header">Aparatologia<font-awesome-icon :icon="['fas', 'edit']"
                            class="ml-3 pointer" title="Editar" /></p>
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
                            <strong>Objetivo</strong>: descomprimir os arcos dentários e criar espaço para o alinhamento
                            dos
                            dentes.
                            <div class="p-horizontal-divider m2"></div>
                            <strong>Mecânica</strong>: aparelho expansor palatino com ativação semanal.
                            <div class="p-horizontal-divider m2"></div>
                            <strong>Acompanhamento</strong>: consultas mensais para acompanhamento da expansão e
                            avaliação da
                            necessidade
                            de ajustes no
                            aparelho.
                        </div>
                    </div>
                    <font-awesome-icon :icon="['fas', 'arrow-down']" />
                    <div class="card m-3 mt-2 mb-2 active">
                        <div class="fase-header">
                            <span class="active"><strong>Fase 2 (atual): Alinhamento e Nivelamento (12
                                    meses)</strong></span>
                            <span class="text-sm font-weight-bold active">Maio/2024 a Maio/2025</span>
                        </div>
                        <div class="card-body px-4 py-3">
                            <strong>Objetivo</strong>: alinhar e nivelar os dentes em ambos os arcos.
                            <div class="p-horizontal-divider m2"></div>
                            <strong>Mecânica</strong>: aparelho fixo vestibular com bráquetes metálicos e fios de
                            níquel-titânio.
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
                            <strong>Objetivo</strong>: finalizar o alinhamento e nivelamento dos dentes, estabelecer a
                            oclusão
                            ideal
                            e
                            manter a
                            estabilidade do tratamento.
                            <div class="p-horizontal-divider m2"></div>
                            <strong>Mecânica</strong>: aparelho fixo vestibular com bráquetes metálicos e fios de aço
                            inoxidável
                            com
                            posterior contenção fixa.
                            <div class="p-horizontal-divider m2"></div>
                            <strong>Acompanhamento</strong>: consultas mensais para ajustes no aparelho e acompanhamento
                            da
                            oclusão.
                        </div>
                    </div>
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

export default {
    name: "PlanoTratamento",
    data() {
        return {
            metasTerapeuticas,
            isEditing,
        }
    },
    methods: {
        toggleEditMode(section) {
            this.isEditing[section] = !this.isEditing[section]
        },
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