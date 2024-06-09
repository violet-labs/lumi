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
                    <div v-for="meta in paciente.metas_terapeuticas" v-bind:key="meta.id" class="card m-3"
                        :class="meta.concluida ? 'border-success' : ''">
                        <div class="fase-header d-flex flex-row">
                            <i class="fas fa-trash ms-1 text-danger-dark pointer" v-if="isEditing['metasTerapeuticas']"
                                title="Excluir esta meta terapêutica"></i>
                            <div class="col" :style="meta.concluida ? { 'padding-left': '30px' } : {}">
                                <strong>{{ meta.alvo }}</strong>
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
                        <div class="card-body px-4 py-3 text-center" v-html="meta.descricao.replaceAll('\\n', '<br>')">
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
                <div class="box primary mt-4 pb-2">
                    <p class="custom-card-header mb-3">Plano de tratamento<font-awesome-icon :icon="['fas', 'edit']"
                            class="ml-3 pointer" title="Editar" /></p>

                    <div v-for="(fase, index) in paciente.fases_tratamento" v-bind:key="fase.id">
                        <div class="card mx-3 my-2">
                            <div class="fase-header">
                                <span :class="{ 'active': fase.id == paciente.fase_atual.id }">
                                    <strong>Fase {{ index + 1 }}: {{ fase.nome }} (3 meses)</strong></span>
                                <span class="text-sm" :class="{ 'font-weight-bold active': fase.id == paciente.fase_atual.id }"
                                    style="text-decoration: line-through;">Maio/2024 a Maio/2025</span>
                            </div>
                            <div class="card-body px-4 py-3">
                                <strong>Objetivo</strong>: {{ fase.objetivo }}

                                <div class="p-horizontal-divider m2"></div>
                                <strong>Mecânica</strong>:
                                {{ fase.mecanica }}

                                <div class="p-horizontal-divider m2"></div>
                                <strong>Acompanhamento</strong>:
                                {{ fase.acompanhamento }}
                            </div>
                        </div>

                        <font-awesome-icon v-if="index < paciente.fases_tratamento.length -1"
                            :icon="['fas', 'arrow-down']" />
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