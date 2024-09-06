<template>
    <div class="tratamento-content">
        <div class="row">

            <div class="col-12">
                <div class="custom-card primary">
                    <div class="custom-card-header">
                        Relatos do paciente<font-awesome-icon :icon="['fas', 'info-circle']" class="ml-3 pointer"
                            title="Como funciona?" />
                    </div>
                    <div class="custom-card-body p-0 pb-3">
                        <div class="row px-3">
                            <!-- <div v-for="(perceptions, categoria) in personalPerceptions" v-bind:key="perceptions"
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
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-6">
                <div class="custom-card primary mt-4">
                    <div class="custom-card-header">
                        Extra-bucal
                        <font-awesome-icon :icon="['fas', 'edit']" class="ml-3 pointer"
                            :class="{ 'active': isEditing['extraBucal'] }"
                            :title="isEditing['extraBucal'] ? 'Sair do modo de edição' : 'Editar os parâmetros extra-bucais'"
                            @click="toggleEditMode('extraBucal')" />
                    </div>
                    <div v-if="isEditing['extraBucal']" class="w-100 text-center mb-3 mt-0">
                        <button class="btn btn-sm btn-primary mt-3 mb-0 btn-edit"
                            title="Salvar as alterações realizadas" @click="_salvarAnalises()">
                            Salvar
                        </button>
                    </div>
                    <div class="custom-card-body p-0 card-top-border">
                        <v-table density="compact" class="analises-table extra-bucal"
                            style="border-bottom: 1px solid #DDD;">
                            <tbody>
                                <tr v-for="analise in analises['Extra-bucal']" v-bind:key="analise.id"
                                    :class="analise.mood">
                                    <td>
                                        {{ analise.name }}
                                    </td>
                                    <td>
                                        <span v-if="!isEditing['extraBucal']">{{ analise.text }}</span>
                                        <select v-if="isEditing['extraBucal'] && analise.type == 'options'"
                                            class="form-select select-sm" v-model="analise.text"
                                            style="min-width: 170px;">
                                            <option v-for="option in analise.options" v-bind:key="option.id"
                                                :class="'text-' + option.mood" :selected="option.text == analise.text">
                                                {{ option.text }}
                                            </option>
                                            <option value="outro">Outro (especificar)...</option>
                                        </select>

                                        <template v-if="analise.type == 'multiple' && isEditing['extraBucal']">
                                            <div v-for="option in analise.options" :key="option.id">
                                                <input type="checkbox" :id="option.id" :value="option.text" :name="analise.id"
                                                    v-model="analise[option.id]" />
                                                <label :for="option.id" :class="'text-' + option.mood">{{ option.text
                                                    }}</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" :id="analise.id + 'outro'" value="outro" :name="analise.id"
                                                    v-model="analise.outro" />
                                                <label :for="analise.id + 'outro'">Outro (especificar)...</label>
                                            </div>
                                        </template>

                                        <MaterialInput v-if="isEditing['extraBucal'] && (analise.outro || analise.text == 'outro')" type="text" class="input-sm" v-model="analise.outroText" />
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
                </div>

                <div class="spacer">
                    <div class="icon-wrapper">
                        <font-awesome-icon :icon="['fas', 'search']" />
                    </div>
                    <div class="stripe"></div>
                    <div class="stripe"></div>
                    <div class="stripe"></div>
                </div>

                <div class="custom-card primary mt-4">
                    <div class="custom-card-header">Análises radiográficas<font-awesome-icon :icon="['fas', 'edit']"
                            class="ml-3 pointer" :class="{ 'active': isEditing['analisesRadiograficas'] }"
                            :title="isEditing['analisesRadiograficas'] ? 'Sair do modo de edição' : 'Editar as análises radiográficas'"
                            @click="toggleEditMode('analisesRadiograficas')" /></div>
                    <div v-if="isEditing['analisesRadiograficas']" class="w-100 text-center mb-3 mt-0">
                        <button class="btn btn-sm btn-primary mt-3 mb-0 btn-edit"
                            title="Salvar as alterações realizadas" @click="salvarAnalises()">
                            Salvar
                        </button>
                    </div>
                    <div class="custom-card-body p-0 card-top-border">
                        <v-table density="compact" class="analises-table radiograficas">
                            <tbody>
                                <tr v-for="analise in analises['Radiográficas']" v-bind:key="analise.id"
                                    :class="analise.mood">
                                    <td>
                                        {{ analise.name }}
                                    </td>
                                    <td>
                                        <span v-if="!isEditing['analisesRadiograficas']">{{ analise.text }}</span>
                                        <select v-if="isEditing['analisesRadiograficas'] && analise.type == 'options'"
                                            class="form-select select-sm" v-model="analise.text"
                                            style="min-width: 170px;">
                                            <option v-for="option in analise.options" v-bind:key="option.id"
                                                :class="'text-' + option.mood" :selected="option.text == analise.text">
                                                {{ option.text }}
                                            </option>
                                            <option value="outro">Outro (especificar)...</option>
                                        </select>

                                        <template v-if="analise.type == 'multiple' && isEditing['analisesRadiograficas']">
                                            <div v-for="option in analise.options" :key="option.id">
                                                <input type="checkbox" :id="option.id" :value="option.text"
                                                    v-model="analise[option.id]" />
                                                <label :for="option.id" :class="'text-' + option.mood">{{ option.text
                                                    }}</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="outro" value="Outro (especificar)..."
                                                    v-model="analise.outro" />
                                                <label for="outro">Outro (especificar)...</label>
                                            </div>
                                        </template>

                                        <MaterialInput v-if="isEditing['analisesRadiograficas'] && (analise.outro || analise.text == 'outro')" type="text" class="input-sm" v-model="analise.outroText" />
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
                </div>
            </div>

            <div class="col-sm-6 mt-sm-4">
                <div class="spacer">
                    <div class="icon-wrapper">
                        <font-awesome-icon :icon="['fas', 'search']" />
                    </div>
                    <div class="stripe"></div>
                    <div class="stripe"></div>
                    <div class="stripe"></div>
                </div>
                <div class="custom-card primary">
                    <div class="custom-card-header">Intra-bucal<font-awesome-icon :icon="['fas', 'edit']"
                            class="ml-3 pointer" :class="{ 'active': isEditing['intraBucal'] }"
                            :title="isEditing['intraBucal'] ? 'Sair do modo de edição' : 'Editar os parâmetros intra-bucais'"
                            @click="toggleEditMode('intraBucal')" /></div>
                    <div v-if="isEditing['intraBucal']" class="w-100 text-center mb-3 mt-0">
                        <button class="btn btn-sm btn-primary mt-3 mb-0 btn-edit"
                            title="Salvar as alterações realizadas" @click="salvarAnalises()">
                            Salvar
                        </button>
                    </div>
                    <div class="custom-card-body p-0 card-top-border">
                        <v-table density="compact" class="analises-table intra-bucal">
                            <tbody>
                                <tr v-for="analise in analises['Intra-bucal']" v-bind:key="analise.id"
                                    :class="analise.mood">
                                    <td>
                                        {{ analise.name }}
                                    </td>
                                    <td>
                                        <span v-if="!isEditing['intraBucal']">{{ analise.text }}</span>
                                        <select v-if="isEditing['intraBucal'] && analise.type == 'options'"
                                            class="form-select select-sm" v-model="analise.text"
                                            style="min-width: 170px;">
                                            <option v-for="option in analise.options" v-bind:key="option.id"
                                                :class="'text-' + option.mood" :selected="option.text == analise.text">
                                                {{ option.text }}
                                            </option>
                                            <option value="outro">Outro (especificar)...</option>
                                        </select>

                                        <template v-if="analise.type == 'multiple' && isEditing['intraBucal']">
                                            <div v-for="option in analise.options" :key="option.id">
                                                <input type="checkbox" :id="option.id" :value="option.text"
                                                    v-model="analise[option.id]" />
                                                <label :for="option.id" :class="'text-' + option.mood">{{ option.text
                                                    }}</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="outro" value="Outro (especificar)..."
                                                    v-model="analise.outro" />
                                                <label for="outro">Outro (especificar)...</label>
                                            </div>
                                        </template>

                                        <MaterialInput v-if="isEditing['intraBucal'] && (analise.outro || analise.text == 'outro')" type="text" class="input-sm" v-model="analise.outroText" />
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.input-sm {
    background: #F2F2F2;
}

.analises-table td {
    padding: 2px 1.5rem !important;
    font-size: 11pt;
    color: #555 !important;
    text-align: left;
}

.analises-table tr>td:first-child {
    border-right: 1px solid #EEE;
    font-weight: 500 !important;
}

.analises-table tr>td:last-child {
    border-right: 1px solid #EEE;
    font-weight: 400 !important;
}

.analises-table tr:nth-of-type(odd)>* {
    background: #F8F8F8;
}


.analises-table.extra-bucal tr>td:first-child {
    width: 50%;
}


.spacer {
    margin: 35px 0px;
    position: relative;
    font-size: 35pt;
    color: #85A7C1
}

.spacer .icon-wrapper {
    
    position: absolute;
    /* posiciona a div.icon-wrapper absolutamente */
    left: 50%;
    /* centraliza horizontalmente */
    top: 50%;
    /* centraliza verticalmente */
    transform: translate(-50%, -50%);
}

.spacer .icon-wrapper::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0));
    z-index: 1000;
}

.stripe {
    height: 1px;
    width: 100%;
    background: linear-gradient(to right, #F2F2F2, #F2F2F2, #c0cbe4, #F2F2F2, #F2F2F2);
    /* ajuste a cor das listras */
    border-radius: 2px;
    /* adiciona um efeito de borda arredondada */
    margin-top: 12px;
}

.spacer .stripe:nth-child(3) {
    background: linear-gradient(to right, #F2F2F2, #c0cbe4, #F2F2F2);
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
import MaterialInput from '@/components/MaterialInput.vue'
import { salvarAnalises } from '@/services/pacientesService'

const analises = {
    'Extra-bucal': [
        {
            id: 10,
            mood: 'good',
            name: 'Agradabilidade facial',
            text: 'aceitável',
            observation: '',
            type: 'options',
            options: [
                { id: 10, mood: 'good', text: 'agradável' },
                { id: 20, mood: 'good', text: 'aceitável' },
                { id: 30, mood: 'attention', text: 'desagradável' },
            ],
        },
        {
            id: 20,
            mood: 'neutral',
            name: 'Biotipo facial',
            text: 'dolicocefálico',
            observation: '',
            type: 'options',
            options: [
                { id: 40, mood: 'neutral', text: 'braquicefálico' },
                { id: 50, mood: 'neutral', text: 'mesocefálico' },
                { id: 60, mood: 'neutral', text: 'dolicocefálico' },
                { id: 70, mood: 'neutral', text: 'face curta' },
                { id: 80, mood: 'neutral', text: 'face longa' },
            ],
        },
        {
            id: 30,
            mood: 'good',
            name: 'Simetria facial',
            text: 'simétrico (leve assimetria)',
            observation: '',
            type: 'options',
            options: [
                { id: 90, mood: 'good', text: 'simétrico (leve assimetria)' },
                { id: 100, mood: 'attention', text: 'assimétrico (assimetria importante)' },
            ],
        },
        {
            id: 40,
            mood: 'neutral',
            name: 'Perfil facial',
            text: 'convexo',
            observation: '',
            type: 'options',
            options: [
                { id: 110, mood: 'neutral', text: 'convexo' },
                { id: 120, mood: 'neutral', text: 'reto' },
                { id: 130, mood: 'neutral', text: 'côncavo' },
            ],
        },
        {
            id: 50,
            mood: 'good',
            name: 'Selamento labial',
            text: 'selamento passivo',
            observation: '',
            type: 'options',
            options: [
                { id: 140, mood: 'good', text: 'selamento passivo' },
                { id: 150, mood: 'attention', text: 'selamento forçado' },
                { id: 160, mood: 'bad', text: 'sem selamento' },
            ],
        },
        {
            id: 60,
            mood: 'good',
            name: 'Exposição dos dentes no sorriso',
            text: 'normal',
            observation: '',
            type: 'options',
            options: [
                { id: 170, mood: 'good', text: 'normal' },
                { id: 180, mood: 'neutral', text: 'pouca exposição' },
                { id: 190, mood: 'neutral', text: 'muita exposição' },
            ],
        },
        {
            id: 70,
            mood: 'neutral',
            name: 'Exposição gengival ao sorrir',
            text: 'pouca exposição',
            observation: '',
            type: 'options',
            options: [
                { id: 200, mood: 'good', text: 'normal' },
                { id: 210, mood: 'neutral', text: 'pouca exposição' },
                { id: 220, mood: 'attention', text: 'muita exposição' },
            ],
        },
        {
            id: 80,
            mood: 'bad',
            name: 'ATM',
            text: 'dor e estalido',
            observation: '',
            type: 'multiple',
            options: [
                { id: 230, mood: 'neutral', text: 'normal' },
                { id: 240, mood: 'neutral', text: 'dor' },
                { id: 250, mood: 'neutral', text: 'estalido' },
                { id: 260, mood: 'neutral', text: 'abertura limitada' },
                { id: 270, mood: 'neutral', text: 'desvio na abertura/fechamento' },
            ],
        },
        {
            id: 90,
            mood: 'bad',
            name: 'Respiração',
            text: 'bucal',
            observation: '',
            type: 'options',
            options: [
                { id: 290, mood: 'good', text: 'normal' },
                { id: 300, mood: 'bad', text: 'bucal' },
                { id: 310, mood: 'neutral', text: 'mista' },
                { id: 320, mood: 'attention', text: 'problema alérgico' },
            ]
        },
        {
            id: 100,
            mood: 'bad',
            name: 'Deglutição',
            text: 'adaptada',
            observation: '',
            type: 'options',
            options: [
                { id: 330, mood: 'good', text: 'normal' },
                { id: 340, mood: 'attention', text: 'atípica' },
                { id: 350, mood: 'attention', text: 'adaptada' },
            ]
        },
        {
            id: 110,
            mood: 'bad',
            name: 'Hábitos',
            text: 'dedo e chupeta',
            observation: '',
            type: 'multiple',
            options: [
                { id: 360, mood: 'good', text: 'nenhum' },
                { id: 370, mood: 'bad', text: 'chupeta' },
                { id: 380, mood: 'bad', text: 'dedo' },
                { id: 390, mood: 'attention', text: 'succção de lábio' },
                { id: 400, mood: 'attention', text: 'onicofagia' },
                { id: 410, mood: 'bad', text: 'bruxismo' },
            ]
        },
        {
            id: 120,
            mood: 'bad',
            name: 'Posição da língua',
            text: 'posteriorizada',
            observation: '',
            type: 'options',
            options: [
                { id: 420, mood: 'good', text: 'normal' },
                { id: 430, mood: 'attention', text: 'interposição' },
                { id: 440, mood: 'attention', text: 'anteriorizizada' },
                { id: 450, mood: 'attention', text: 'posteriorizada' },
            ]
        },
    ],

    'Intra-bucal': [
        {
            id: 130,
            mood: 'neutral',
            name: 'Dentição',
            text: 'permanente',
            observation: '',
            type: 'options',
            options: [
                { id: 460, mood: 'good', text: 'permanente' },
                { id: 470, mood: 'neutral', text: 'mista' },
                { id: 480, mood: 'neutral', text: 'decídua' },
            ]
        },
        {
            id: 140,
            mood: 'attention',
            name: 'Diferença entre RC e MIH',
            text: 'diferença relevante - sem sintomas DTM',
            observation: '',
            type: 'options',
            options: [
                { id: 490, mood: 'good', text: 'RC = MIH' },
                { id: 500, mood: 'neutral', text: 'diferença leve (irrelevante)' },
                { id: 510, mood: 'attention', text: 'diferença relevante - sem sintomas DTM' },
                { id: 520, mood: 'bad', text: 'diferença relevante - com sintomas DTM' },
            ]
        },
        {
            id: 150,
            mood: 'bad',
            name: 'Relação molar',
            text: 'classe II bilateral',
            observation: '',
            type: 'options',
            options: [
                { id: 530, mood: 'good', text: 'classe I' },
                { id: 540, mood: 'attention', text: 'classe II bilateral' },
                { id: 550, mood: 'attention', text: 'classe II unilateral - desvio superior' },
                { id: 560, mood: 'attention', text: 'classe II unilateral - desvio inferior' },
                { id: 570, mood: 'attention', text: 'classe III' },
            ]
        },
        {
            id: 160,
            mood: 'bad',
            name: 'Relação canina - lado DIREITO',
            text: 'relação Classe II',
            observation: '',
            type: 'options',
            options: [
                { id: 580, mood: 'neutral', text: 'em chave' },
                { id: 590, mood: 'attention', text: 'relação Classe II' },
                { id: 600, mood: 'attention', text: 'relação Classe III' },
                { id: 610, mood: 'neutral', text: 'ectópico' },
            ]
        },
        {
            id: 170,
            mood: 'bad',
            name: 'Relação canina - lado ESQUERDO',
            text: 'relação Classe II',
            observation: '',
            type: 'options',
            options: [
                { id: 620, mood: 'neutral', text: 'em chave' },
                { id: 630, mood: 'attention', text: 'relação Classe II' },
                { id: 640, mood: 'attention', text: 'relação Classe III' },
                { id: 650, mood: 'neutral', text: 'ectópico' },
            ]
        },
        {
            id: 180,
            mood: 'attention',
            name: 'Análise transversal',
            text: 'deficiência dentária: cruzada unilateral funcional',
            observation: '',
            type: 'options',
            options: [
                { id: 660, mood: 'good', text: 'normal' },
                { id: 670, mood: 'attention', text: 'deficiência dentária: cruzada unilateral verdadeira' },
                { id: 680, mood: 'attention', text: 'deficiência dentária: cruzada unilateral funcional' },
                { id: 690, mood: 'attention', text: 'deficiência esquelética' },
            ]
        },
        {
            id: 190,
            mood: 'attention',
            name: 'Análise vertical',
            text: 'mordida aberta - esquelética',
            observation: '',
            type: 'options',
            options: [
                { id: 700, mood: 'good', text: 'Normal' },
                { id: 710, mood: 'attention', text: 'mordida aberta - dentária' },
                { id: 720, mood: 'attention', text: 'mordida aberta - esquelética' },
                { id: 730, mood: 'attention', text: 'mordida profunda - dentária' },
                { id: 740, mood: 'attention', text: 'mordida profunda - esquelética' },
            ]
        },
        {
            id: 200,
            mood: 'attention',
            name: 'Curva de Spee',
            text: 'pouco aumentada',
            observation: '',
            type: 'options',
            options: [
                { id: 750, mood: 'good', text: 'normal' },
                { id: 760, mood: 'attention', text: 'pouco aumentada' },
                { id: 770, mood: 'bad', text: 'muito aumentada' },
                { id: 780, mood: 'attention', text: 'invertida' },
            ]
        },
        {
            id: 210,
            mood: 'attention',
            name: 'Linha média',
            text: 'desvio superior para a direita',
            observation: '',
            type: 'options',
            options: [
                { id: 800, mood: 'good', text: 'Normal' },
                { id: 810, mood: 'attention', text: 'desvio superior para a direita' },
                { id: 820, mood: 'attention', text: 'desvio superior para a esquerda' },
                { id: 830, mood: 'attention', text: 'desvio inferior para a direita' },
                { id: 840, mood: 'attention', text: 'desvio inferior para a esquerda' },
            ]
        },
        {
            id: 220,
            mood: 'neutral',
            name: 'Formato do arco superior',
            text: 'triangular',
            observation: '',
            type: 'options',
            options: [
                { id: 850, mood: 'good', text: 'normal' },
                { id: 860, mood: 'attention', text: 'atrésico' },
                { id: 870, mood: 'attention', text: 'hiper-expandido' },
                { id: 880, mood: 'attention', text: 'triangular' },
                { id: 890, mood: 'attention', text: 'quadrado' },
            ]
        },
        {
            id: 230,
            mood: 'good',
            name: 'Formato do arco inferior',
            text: 'normal',
            observation: '',
            type: 'options',
            options: [
                { id: 900, mood: 'good', text: 'normal' },
                { id: 910, mood: 'attention', text: 'atrésico' },
                { id: 920, mood: 'attention', text: 'hiper-expandido' },
                { id: 930, mood: 'attention', text: 'triangular' },
                { id: 940, mood: 'attention', text: 'quadrado' },
            ]
        },
        {
            id: 240,
            mood: 'bad',
            name: 'Apinhamentos',
            text: 'superior - severo',
            observation: '',
            type: 'multiple',
            options: [
                { id: 900, mood: 'good', text: 'normal' },
                { id: 910, mood: 'neutral', text: 'superior - leve' },
                { id: 920, mood: 'attention', text: 'superior - moderado' },
                { id: 930, mood: 'bad', text: 'superior - severo' },
                { id: 940, mood: 'neutral', text: 'inferior - leve' },
                { id: 950, mood: 'attention', text: 'inferior - moderado' },
                { id: 960, mood: 'bad', text: 'inferior - severo' },
            ]
        },
        {
            id: 250,
            mood: 'bad',
            name: 'Diastemas',
            text: 'superior',
            observation: '',
            type: 'options',
            options: [
                { id: 900, mood: 'good', text: 'ausente' },
                { id: 910, mood: 'attention', text: 'superior' },
                { id: 920, mood: 'attention', text: 'inferior' },
            ]
        },
    ],

    'Radiográficas': [
        {
            id: 260,
            mood: 'bad',
            name: 'Ausência de dentes',
            text: 'existem dentes ausentes',
            observation: '',
            type: 'multiple',
            options: [
                { id: 930, mood: 'good', text: 'todos presentes' },
                { id: 940, mood: 'attention', text: 'ausnetes' },
                { id: 950, mood: 'attention', text: 'retidos' },
                { id: 960, mood: 'attention', text: 'supranumerários' },
            ]
        },
        {
            id: 270,
            mood: 'attention',
            name: 'Inclinação dos incisivos superiores',
            text: 'vestibularizados',
            observation: '',
            type: 'options',
            options: [
                { id: 970, mood: 'good', text: 'bem posicionados' },
                { id: 980, mood: 'attention', text: 'vestibularizados' },
                { id: 990, mood: 'attention', text: 'lingualizados' },
            ]
        },
        {
            id: 280,
            mood: 'bad',
            name: 'Posição dos incisivos superiores',
            text: 'protruídos',
            observation: '',
            type: 'options',
            options: [
                { id: 1000, mood: 'good', text: 'bem posicionados' },
                { id: 1010, mood: 'attention', text: 'protruídos' },
                { id: 1020, mood: 'attention', text: 'retraídos' },
            ]
        },
        {
            id: 290,
            mood: 'good',
            name: 'Inclinação dos incisivos inferiores',
            text: 'bem posicionados',
            observation: '',
            type: 'options',
            options: [
                { id: 1030, mood: 'good', text: 'bem posicionados' },
                { id: 1040, mood: 'attention', text: 'vestibularizados' },
                { id: 1050, mood: 'attention', text: 'lingualizados' },
            ]
        },
        {
            id: 300,
            mood: 'good',
            name: 'Posição dos incisivos inferiores',
            text: 'bem posicionados',
            observation: '',
            type: 'options',
            options: [
                { id: 1060, mood: 'good', text: 'bem posicionados' },
                { id: 1070, mood: 'attention', text: 'protruídos' },
                { id: 1080, mood: 'attention', text: 'retraídos' },
            ]
        },
    ],
}

var isEditing = []

export default {
    name: "Analise",
    props: {
        // personalPerceptions: {
        //     type: Object,
        // },
    },
    data() {
        return {
            isEditing,
            analises
        }
    },
    methods: {
        async _salvarAnalises() {
            const response = await salvarAnalises(this.analises)
            console.log('response:', response)
        },
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
        MaterialInput,
    },
    mounted() {
    },
    beforeMount() {
    },
    beforeUnmount() {
    }
};
</script>