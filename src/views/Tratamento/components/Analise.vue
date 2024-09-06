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
                                    :class="analise.nivel">
                                    <td>
                                        {{ analise.analise }}
                                    </td>
                                    <td>
                                        <span v-if="!isEditing['extraBucal']">{{ analise.resposta ? analise.resposta :
                                            '-' }}</span>

                                        <select v-if="isEditing['extraBucal'] && analise.tipo == 'unica_escolha'"
                                            class="form-select select-sm" v-model="analise.resposta" @change="updateNivel"
                                            style="min-width: 170px;">
                                            <option hidden value="">Selecione...</option>
                                            <option v-for="alternativa in analise.alternativas"
                                                v-bind:key="alternativa.resposta" :class="'text-' + alternativa.nivel"
                                                :selected="alternativa.resposta == analise.resposta">
                                                {{ alternativa.resposta }}
                                            </option>
                                            <option value="detalhe">{{ analise.titulo_detalhe ? analise.titulo_detalhe :
                                                'Especificar...' }}</option>
                                        </select>

                                        <template v-if="analise.tipo == 'multipla_escolha' && isEditing['extraBucal']">
                                            <div v-for="alternativa in analise.alternativas"
                                                :key="alternativa.resposta">
                                                <input type="checkbox" :id="alternativa.resposta"
                                                    :value="alternativa.resposta" :name="analise.id"
                                                    v-model="alternativa.selecionada" @click="updateNivel" />
                                                <label :for="alternativa.resposta"
                                                    :class="'text-' + alternativa.nivel">{{ alternativa.resposta
                                                    }}</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" :id="analise.id + 'detalhe'" value="detalhe"
                                                    :name="analise.id" v-model="analise.detalhar" />
                                                <label :for="analise.id + 'detalhe'">{{ analise.titulo_detalhe ?
                                                    analise.titulo_detalhe : 'Especificar...' }}</label>
                                            </div>
                                        </template>

                                        <MaterialInput
                                            v-if="isEditing['extraBucal'] && (analise.detalhar || analise.resposta == 'detalhe')"
                                            type="text" class="input-sm" v-model="analise.detalhe" />
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
                                    :class="analise.nivel">
                                    <td>
                                        {{ analise.name }}
                                    </td>
                                    <td>
                                        <span v-if="!isEditing['analisesRadiograficas']">{{ analise.resposta }}</span>
                                        <select
                                            v-if="isEditing['analisesRadiograficas'] && analise.tipo == 'unica_escolha'"
                                            class="form-select select-sm" v-model="analise.resposta"
                                            style="min-width: 170px;">
                                            <option v-for="alternativa in analise.alternativas"
                                                v-bind:key="alternativa.resposta" :class="'text-' + alternativa.nivel"
                                                :selected="alternativa.resposta == analise.resposta">
                                                {{ alternativa.resposta }}
                                            </option>
                                            <option value="outro">Outro (especificar)...</option>
                                        </select>

                                        <template
                                            v-if="analise.tipo == 'multipla_escolha' && isEditing['analisesRadiograficas']">
                                            <div v-for="alternativa in analise.alternativas"
                                                :key="alternativa.resposta">
                                                <input type="checkbox" :id="alternativa.resposta"
                                                    :value="alternativa.resposta" v-model="analise[option.id]" />
                                                <label :for="option.id" :class="'text-' + alternativa.nivel">{{
                                                    alternativa.resposta
                                                }}</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="outro" value="Outro (especificar)..."
                                                    v-model="analise.detalhe" />
                                                <label for="outro">Outro (especificar)...</label>
                                            </div>
                                        </template>

                                        <MaterialInput
                                            v-if="isEditing['analisesRadiograficas'] && (analise.detalhe || analise.resposta == 'outro')"
                                            type="text" class="input-sm" v-model="analise.detalheText" />
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
                                    :class="analise.nivel">
                                    <td>
                                        {{ analise.name }}
                                    </td>
                                    <td>
                                        <span v-if="!isEditing['intraBucal']">{{ analise.resposta }}</span>
                                        <select v-if="isEditing['intraBucal'] && analise.tipo == 'unica_escolha'"
                                            class="form-select select-sm" v-model="analise.resposta"
                                            style="min-width: 170px;">
                                            <option v-for="alternativa in analise.alternativas"
                                                v-bind:key="alternativa.resposta" :class="'text-' + alternativa.nivel"
                                                :selected="alternativa.resposta == analise.resposta">
                                                {{ alternativa.resposta }}
                                            </option>
                                            <option value="outro">Outro (especificar)...</option>
                                        </select>

                                        <template v-if="analise.tipo == 'multipla_escolha' && isEditing['intraBucal']">
                                            <div v-for="alternativa in analise.alternativas"
                                                :key="alternativa.resposta">
                                                <input type="checkbox" :id="alternativa.resposta"
                                                    :value="alternativa.resposta" v-model="analise[option.id]" />
                                                <label :for="option.id" :class="'text-' + alternativa.nivel">{{
                                                    alternativa.resposta
                                                }}</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="outro" value="Outro (especificar)..."
                                                    v-model="analise.detalhe" />
                                                <label for="outro">Outro (especificar)...</label>
                                            </div>
                                        </template>

                                        <MaterialInput
                                            v-if="isEditing['intraBucal'] && (analise.detalhe || analise.resposta == 'outro')"
                                            type="text" class="input-sm" v-model="analise.detalheText" />
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
import { salvarAnalises } from '@/services/tratamentosService'

const analises = {
    'Extra-bucal': [
        {
            id: 10,
            nivel: 'neutro',
            analise: 'Agradabilidade facial',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'agradável', selecionada: false },
                { nivel: 'positivo', resposta: 'aceitável', selecionada: false },
                { nivel: 'atencao', resposta: 'desagradável', selecionada: false },
            ],
        },
        {
            id: 20,
            nivel: 'neutro',
            analise: 'Biotipo facial',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'neutro', resposta: 'braquicefálico', selecionada: false },
                { nivel: 'neutro', resposta: 'mesocefálico', selecionada: false },
                { nivel: 'neutro', resposta: 'dolicocefálico', selecionada: false },
                { nivel: 'neutro', resposta: 'face curta', selecionada: false },
                { nivel: 'neutro', resposta: 'face longa', selecionada: false },
            ],
        },
        {
            id: 30,
            nivel: 'neutro',
            analise: 'Simetria facial',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'simétrico (ou leve assimetria)', selecionada: false },
                { nivel: 'atencao', resposta: 'assimétrico (assimetria importante)', selecionada: false },
            ],
        },
        {
            id: 40,
            nivel: 'neutro',
            analise: 'Perfil facial',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'neutro', resposta: 'convexo', selecionada: false },
                { nivel: 'neutro', resposta: 'reto', selecionada: false },
                { nivel: 'neutro', resposta: 'côncavo', selecionada: false },
            ],
        },
        {
            id: 50,
            nivel: 'neutro',
            analise: 'Selamento labial',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'selamento passivo', selecionada: false },
                { nivel: 'atencao', resposta: 'selamento forçado', selecionada: false },
                { nivel: 'negativo', resposta: 'sem selamento', selecionada: false },
            ],
        },
        {
            id: 60,
            nivel: 'neutro',
            analise: 'Exposição dos dentes no sorriso',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'normal', selecionada: false },
                { nivel: 'neutro', resposta: 'pouca exposição', selecionada: false },
                { nivel: 'neutro', resposta: 'muita exposição', selecionada: false },
            ],
        },
        {
            id: 70,
            nivel: 'neutro',
            analise: 'Exposição gengival ao sorrir',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'normal', selecionada: false },
                { nivel: 'neutro', resposta: 'pouca exposição', selecionada: false },
                { nivel: 'atencao', resposta: 'muita exposição', selecionada: false },
            ],
        },
        {
            id: 80,
            nivel: 'negativo',
            analise: 'ATM',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Outro(s)...',
            tipo: 'multipla_escolha',
            alternativas: [
                { nivel: 'neutro', resposta: 'normal', selecionada: false },
                { nivel: 'neutro', resposta: 'dor', selecionada: false },
                { nivel: 'neutro', resposta: 'estalido', selecionada: false },
                { nivel: 'neutro', resposta: 'abertura limitada', selecionada: false },
                { nivel: 'neutro', resposta: 'desvio na abertura/fechamento', selecionada: false },
            ],
        },
        {
            id: 90,
            nivel: 'negativo',
            analise: 'Respiração',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'normal', selecionada: false },
                { nivel: 'negativo', resposta: 'bucal', selecionada: false },
                { nivel: 'neutro', resposta: 'mista', selecionada: false },
                { nivel: 'atencao', resposta: 'problema alérgico', selecionada: false },
            ]
        },
        {
            id: 100,
            nivel: 'negativo',
            analise: 'Deglutição',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'normal', selecionada: false },
                { nivel: 'atencao', resposta: 'atípica', selecionada: false },
                { nivel: 'atencao', resposta: 'adaptada', selecionada: false },
            ]
        },
        {
            id: 110,
            nivel: 'negativo',
            analise: 'Hábitos',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Outro(s)...',
            tipo: 'multipla_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'nenhum', selecionada: false },
                { nivel: 'negativo', resposta: 'chupeta', selecionada: false },
                { nivel: 'negativo', resposta: 'dedo', selecionada: false },
                { nivel: 'atencao', resposta: 'succção de lábio', selecionada: false },
                { nivel: 'atencao', resposta: 'onicofagia', selecionada: false },
                { nivel: 'negativo', resposta: 'bruxismo', selecionada: false },
            ]
        },
        {
            id: 120,
            nivel: 'negativo',
            analise: 'Posição da língua',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'normal', selecionada: false },
                { nivel: 'atencao', resposta: 'interposição', selecionada: false },
                { nivel: 'atencao', resposta: 'anteriorizizada', selecionada: false },
                { nivel: 'atencao', resposta: 'posteriorizada', selecionada: false },
            ]
        },
        {
            id: 126,
            nivel: 'negativo',
            analise: 'Observações',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'normal', selecionada: false },
                { nivel: 'atencao', resposta: 'interposição', selecionada: false },
                { nivel: 'atencao', resposta: 'anteriorizizada', selecionada: false },
                { nivel: 'atencao', resposta: 'posteriorizada', selecionada: false },
            ]
        },
    ],

    'Intra-bucal': [
        {
            id: 130,
            nivel: 'neutro',
            analise: 'Dentição',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'permanente', selecionada: false },
                { nivel: 'neutro', resposta: 'mista', selecionada: false },
                { nivel: 'neutro', resposta: 'decídua', selecionada: false },
            ]
        },
        {
            id: 140,
            nivel: 'atencao',
            analise: 'Diferença entre RC e MIH',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'RC = MIH', selecionada: false },
                { nivel: 'neutro', resposta: 'diferença leve (irrelevante)', selecionada: false },
                { nivel: 'atencao', resposta: 'diferença relevante - sem sintomas DTM', selecionada: false },
                { nivel: 'negativo', resposta: 'diferença relevante - com sintomas DTM', selecionada: false },
            ]
        },
        {
            id: 150,
            nivel: 'negativo',
            analise: 'Relação molar',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'classe I', selecionada: false },
                { nivel: 'atencao', resposta: 'classe II bilateral', selecionada: false },
                { nivel: 'atencao', resposta: 'classe II unilateral - desvio superior', selecionada: false },
                { nivel: 'atencao', resposta: 'classe II unilateral - desvio inferior', selecionada: false },
                { nivel: 'atencao', resposta: 'classe III', selecionada: false },
            ]
        },
        {
            id: 160,
            nivel: 'negativo',
            analise: 'Relação canina - lado DIREITO',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'neutro', resposta: 'em chave', selecionada: false },
                { nivel: 'atencao', resposta: 'relação Classe II', selecionada: false },
                { nivel: 'atencao', resposta: 'relação Classe III', selecionada: false },
                { nivel: 'neutro', resposta: 'ectópico', selecionada: false },
            ]
        },
        {
            id: 170,
            nivel: 'negativo',
            analise: 'Relação canina - lado ESQUERDO',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'neutro', resposta: 'em chave', selecionada: false },
                { nivel: 'atencao', resposta: 'relação Classe II', selecionada: false },
                { nivel: 'atencao', resposta: 'relação Classe III', selecionada: false },
                { nivel: 'neutro', resposta: 'ectópico', selecionada: false },
            ]
        },
        {
            id: 180,
            nivel: 'atencao',
            analise: 'Análise transversal',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'normal', selecionada: false },
                { nivel: 'atencao', resposta: 'deficiência dentária: cruzada unilateral verdadeira', selecionada: false },
                { nivel: 'atencao', resposta: 'deficiência dentária: cruzada unilateral funcional', selecionada: false },
                { nivel: 'atencao', resposta: 'deficiência esquelética', selecionada: false },
            ]
        },
        {
            id: 190,
            nivel: 'atencao',
            analise: 'Análise vertical',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'Normal', selecionada: false },
                { nivel: 'atencao', resposta: 'mordida aberta - dentária', selecionada: false },
                { nivel: 'atencao', resposta: 'mordida aberta - esquelética', selecionada: false },
                { nivel: 'atencao', resposta: 'mordida profunda - dentária', selecionada: false },
                { nivel: 'atencao', resposta: 'mordida profunda - esquelética', selecionada: false },
            ]
        },
        {
            id: 200,
            nivel: 'atencao',
            analise: 'Curva de Spee',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'normal', selecionada: false },
                { nivel: 'atencao', resposta: 'pouco aumentada', selecionada: false },
                { nivel: 'negativo', resposta: 'muito aumentada', selecionada: false },
                { nivel: 'atencao', resposta: 'invertida', selecionada: false },
            ]
        },
        {
            id: 210,
            nivel: 'atencao',
            analise: 'Linha média',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'Normal', selecionada: false },
                { nivel: 'atencao', resposta: 'desvio superior para a direita', selecionada: false },
                { nivel: 'atencao', resposta: 'desvio superior para a esquerda', selecionada: false },
                { nivel: 'atencao', resposta: 'desvio inferior para a direita', selecionada: false },
                { nivel: 'atencao', resposta: 'desvio inferior para a esquerda', selecionada: false },
            ]
        },
        {
            id: 220,
            nivel: 'neutro',
            analise: 'Formato do arco superior',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'normal', selecionada: false },
                { nivel: 'atencao', resposta: 'atrésico', selecionada: false },
                { nivel: 'atencao', resposta: 'hiper-expandido', selecionada: false },
                { nivel: 'atencao', resposta: 'triangular', selecionada: false },
                { nivel: 'atencao', resposta: 'quadrado', selecionada: false },
            ]
        },
        {
            id: 230,
            nivel: 'neutro',
            analise: 'Formato do arco inferior',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'normal', selecionada: false },
                { nivel: 'atencao', resposta: 'atrésico', selecionada: false },
                { nivel: 'atencao', resposta: 'hiper-expandido', selecionada: false },
                { nivel: 'atencao', resposta: 'triangular', selecionada: false },
                { nivel: 'atencao', resposta: 'quadrado', selecionada: false },
            ]
        },
        {
            id: 240,
            nivel: 'negativo',
            analise: 'Apinhamentos',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Outro(s)...',
            tipo: 'multipla_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'normal', selecionada: false },
                { nivel: 'neutro', resposta: 'superior - leve', selecionada: false },
                { nivel: 'atencao', resposta: 'superior - moderado', selecionada: false },
                { nivel: 'negativo', resposta: 'superior - severo', selecionada: false },
                { nivel: 'neutro', resposta: 'inferior - leve', selecionada: false },
                { nivel: 'atencao', resposta: 'inferior - moderado', selecionada: false },
                { nivel: 'negativo', resposta: 'inferior - severo', selecionada: false },
            ]
        },
        {
            id: 250,
            nivel: 'negativo',
            analise: 'Diastemas',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'ausente', selecionada: false },
                { nivel: 'atencao', resposta: 'superior', selecionada: false },
                { nivel: 'atencao', resposta: 'inferior', selecionada: false },
            ]
        },
    ],

    'Radiográficas': [
        {
            id: 260,
            nivel: 'negativo',
            analise: 'Ausência de dentes',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Outro(s)...',
            tipo: 'multipla_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'todos presentes', selecionada: false },
                { nivel: 'atencao', resposta: 'ausnetes', selecionada: false },
                { nivel: 'atencao', resposta: 'retidos', selecionada: false },
                { nivel: 'atencao', resposta: 'supranumerários', selecionada: false },
            ]
        },
        {
            id: 270,
            nivel: 'atencao',
            analise: 'Inclinação dos incisivos superiores',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'bem posicionados', selecionada: false },
                { nivel: 'atencao', resposta: 'vestibularizados', selecionada: false },
                { nivel: 'atencao', resposta: 'lingualizados', selecionada: false },
            ]
        },
        {
            id: 280,
            nivel: 'negativo',
            analise: 'Posição dos incisivos superiores',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'bem posicionados', selecionada: false },
                { nivel: 'atencao', resposta: 'protruídos', selecionada: false },
                { nivel: 'atencao', resposta: 'retraídos', selecionada: false },
            ]
        },
        {
            id: 290,
            nivel: 'neutro',
            analise: 'Inclinação dos incisivos inferiores',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'bem posicionados', selecionada: false },
                { nivel: 'atencao', resposta: 'vestibularizados', selecionada: false },
                { nivel: 'atencao', resposta: 'lingualizados', selecionada: false },
            ]
        },
        {
            id: 300,
            nivel: 'neutro',
            analise: 'Posição dos incisivos inferiores',
            resposta: '',
            detalhe: '',
            titulo_detalhe: 'Especificar...',
            tipo: 'unica_escolha',
            alternativas: [
                { nivel: 'positivo', resposta: 'bem posicionados', selecionada: false },
                { nivel: 'atencao', resposta: 'protruídos', selecionada: false },
                { nivel: 'atencao', resposta: 'retraídos', selecionada: false },
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
        updateNivel() {
            Object.values(this.analises).forEach((categoria) => {
                categoria.forEach((analise) => {
                    if (analise.resposta) {
                        const selectedAlternativa = analise.alternativas.find((alternativa) => alternativa.resposta === analise.resposta);
                        if (selectedAlternativa) {
                            analise.nivel = selectedAlternativa.nivel;
                        }
                        else {
                            analise.nivel = 'neutro'
                        }
                    }
                });
            });
        },
        getInfoIcon(type) {
            var icon = null
            switch (type) {
                case 'positivo':
                    icon = 'thumbs-up'
                    break
                case 'negativo':
                    icon = 'thumbs-down'
                    break
                case 'atencao':
                    icon = 'circle-exclamation'
                    break
                case 'neutro':
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