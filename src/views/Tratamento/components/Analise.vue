<template>
    <div class="tratamento-content">
        <div class="row">
            <div class="col-md-5 pe-md-0">
                <div class="custom-card primary h-100">
                    <div class="custom-card-header">
                        Extra-bucal
                        <font-awesome-icon :icon="['fas', 'edit']" class="ml-3 pointer"
                            :class="{ 'active': isEditing['extraBucal'] }"
                            :title="isEditing['extraBucal'] ? 'Sair do modo de edição' : 'Editar os parâmetros extra-bucais'"
                            @click="toggleEditMode('extraBucal')" />
                    </div>
                    <div v-if="isEditing['extraBucal']" class="w-100 text-center mb-3 mt-0">
                        <button class="btn btn-sm btn-primary mt-3 mb-0" title="Salvar as alterações realizadas">
                            Salvar
                        </button>
                    </div>
                    <div class="custom-card-body p-0">
                        <v-table density="compact" class="analises-table" style="border: 1px solid #DDD;">
                            <tbody>
                                <tr v-for="analise in analises['Extra-bucal']" v-bind:key="analise.id"
                                    :class="analise.type">
                                    <td>
                                        {{ analise.name }}
                                    </td>
                                    <td>
                                        <span v-if="!isEditing['extraBucal']">{{ analise.text }}</span>
                                        <select v-if="isEditing['extraBucal']" class="form-select select-sm"
                                            :value="analise.text" style="min-width: 170px;">
                                            <option>Opção 1</option>
                                            <option>Opção 2</option>
                                            <option>Opção 3</option>
                                            <option>Outro (especificar)...</option>
                                        </select>
                                        <input v-if="false" class="form-control input-sm"
                                            placeholder="Especifique..." />
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
                </div>
            </div>
            <div class="col-md-7 mt-4 mt-md-0 ps-md-4">
                <div class="custom-card primary h-100">
                    <div class="custom-card-header">Intra-bucal<font-awesome-icon :icon="['fas', 'edit']"
                            class="ml-3 pointer" :class="{ 'active': isEditing['intraBucal'] }"
                            :title="isEditing['intraBucal'] ? 'Sair do modo de edição' : 'Editar os parâmetros intra-bucais'"
                            @click="toggleEditMode('intraBucal')" /></div>
                    <div v-if="isEditing['intraBucal']" class="w-100 text-center mb-3 mt-0">
                        <button class="btn btn-sm btn-primary mt-3 mb-0" title="Salvar as alterações realizadas">
                            Salvar
                        </button>
                    </div>
                    <div class="custom-card-body p-0">
                        <v-table density="compact" class="analises-table">
                            <tbody>
                                <tr v-for="analise in analises['Intra-bucal']" v-bind:key="analise.id"
                                    :class="analise.type">
                                    <td>
                                        {{ analise.name }}
                                    </td>
                                    <td>
                                        <span v-if="!isEditing['intraBucal']">{{ analise.text }}</span>
                                        <select v-if="isEditing['intraBucal']" class="form-select select-sm"
                                            :value="analise.text" style="min-width: 170px;">
                                            <option>Opção 1</option>
                                            <option>Opção 2</option>
                                            <option>Opção 3</option>
                                            <option>Outro (especificar)...</option>
                                        </select>
                                        <input v-if="false" class="form-control input-sm"
                                            placeholder="Especifique..." />
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
                </div>
            </div>
            <div class="col-md-5 pe-md-0">
                <div class="custom-card primary mt-4">
                    <div class="custom-card-header">Análises radiográficas<font-awesome-icon :icon="['fas', 'edit']"
                            class="ml-3 pointer" :class="{ 'active': isEditing['analisesRadiograficas'] }"
                            :title="isEditing['analisesRadiograficas'] ? 'Sair do modo de edição' : 'Editar as análises radiográficas'"
                            @click="toggleEditMode('analisesRadiograficas')" /></div>
                    <div v-if="isEditing['analisesRadiograficas']" class="w-100 text-center mb-3 mt-0">
                        <button class="btn btn-sm btn-primary mt-3 mb-0" title="Salvar as alterações realizadas">
                            Salvar
                        </button>
                    </div>
                    <div class="custom-card-body p-0">
                        <v-table density="compact" class="analises-table">
                            <tbody>
                                <tr v-for="analise in analises['Radiográficas']" v-bind:key="analise.id"
                                    :class="analise.type">
                                    <td>
                                        {{ analise.name }}
                                    </td>
                                    <td>
                                        <span v-if="!isEditing['analisesRadiograficas']">{{ analise.text }}</span>
                                        <select v-if="isEditing['analisesRadiograficas']" class="form-select select-sm"
                                            :value="analise.text" style="min-width: 170px;">
                                            <option>Opção 1</option>
                                            <option>Opção 2</option>
                                            <option>Opção 3</option>
                                            <option>Outro (especificar)...</option>
                                        </select>
                                        <input v-if="false" class="form-control input-sm"
                                            placeholder="Especifique..." />
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
                </div>
                <div class="custom-card primary mt-4">
                    <div class="custom-card-header">Necessidade de encaminhamentos<font-awesome-icon
                            :icon="['fas', 'edit']" class="ml-3 pointer" title="Editar" /></div>
                    <div class="custom-card-body pt-2">
                        Não há necessidade de encaminhamentos.
                    </div>
                </div>
            </div>
            <div class="col-md-7 ps-md-4">
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
                                        <div class="info-container" v-for="perception in perceptions"
                                            v-bind:key="perception.text" :class="perception.type">
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
</template>

<style>
.card {
    border: 1px solid #DDD;
}

.card-body {
    font-size: 1rem;
    font-weight: 300;
}
</style>

<script>


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

var isEditing = []

export default {
    name: "Analise",
    props: {
        personalPerceptions: {
            type: Object,
        },
    },
    data() {
        return {
            isEditing,
            analises
        }
    },
    methods: {
        toggleEditMode(section) {
            this.isEditing[section] = !this.isEditing[section]
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