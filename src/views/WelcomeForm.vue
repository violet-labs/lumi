<template>
    <main class="mt-0 main-content">
        <div class="row">
            <div class="header-logo" :class="getLogoClass()">
                <img :src="logo" alt="main_logo" />
            </div>
        </div>
        <section>
            <div class="page-header">
                <div class="container start-form-container">
                    <div class="row d-flex justify-content-center">
                        <div class="col-xl-5 col-lg-6 col-md-7 col-sm-10">
                            <div style="width: 100%; text-align: center;">
                            </div>
                            <div class="card-container">
                                <div class="card card-plain">
                                    <div v-if="!hasStarted" class="pb-0 card-header text-start">
                                        <h4 class="font-weight-bolder highlight-txt">Seja muito bem-vindo!</h4>
                                    </div>
                                    <div class="card-body">

                                        <div v-if="!hasStarted">
                                            <div class="main-container">
                                                <p class="mb-0">Por favor, responda esta ficha com carinho, para que
                                                    possamos
                                                    atendê-lo de acordo com suas expectativas.</p>

                                                <button class="btn btn-sm start-button bg-gradient-secondary"
                                                    @click="startForm">Iniciar</button>
                                            </div>
                                        </div>

                                        <div v-if="hasStarted && hasFinished">
                                            <div class="main-container">
                                                <p class="mb-3">Obrigado por suas respostas! Elas irão nos ajudar a
                                                    entender melhor as suas necessidades e te apresentar a melhor
                                                    solução! Nos vemos jajá :z.</p>

                                                <h4>Siga-nos nas redes sociais:</h4>

                                                <button class="btn btn-sm start-button bg-gradient-secondary"
                                                    @click="startForm">Facebook</button>
                                            </div>
                                        </div>

                                        <div v-if="hasStarted && !hasFinished" class="px-4 main-form-container">
                                            <div class="pb-0 pt-4 text-center mb-4">
                                                <h4 class="font-weight-bolder highlight-txt">
                                                    Será um prazer atendê-lo!
                                                </h4>
                                            </div>

                                            <div v-for="(question, index) in questions" :key="index" class="mt-2 mb-4"
                                                :ref="'question' + index">
                                                <label v-if="question.tipo !== 'text'"
                                                    class="mb-3 p-0 font-weight-bolder label-highlight">{{
                                                    question.questao }}
                                                    <span v-if="question.obrigatoria" class="text-danger">*</span>
                                                </label>

                                                <div v-if="question.tipo === 'text'" class="mt-0 p-0">
                                                    <MaterialInput :name="question.id" :id="question.id"
                                                        :label="question.questao"
                                                        labelClass="font-weight-bolder label-highlight"
                                                        v-model="question.resposta" :required="question.obrigatoria"
                                                        :input="refreshProgress" />
                                                </div>

                                                <div v-else-if="question.tipo === 'checkbox'" class="px-3">
                                                    <table class="options-checkbox">
                                                        <tr v-for="(alternativa, alternativaIndex) in question.alternativas"
                                                            :key="alternativaIndex">
                                                            <td class="d-flex flex-row align-center">
                                                                <input type="checkbox" class="form-checkbox"
                                                                    :name="question.id + '-' + alternativa.resposta"
                                                                    :id="question.id + '-' + alternativa.resposta"
                                                                    v-model="alternativa.selecionada"
                                                                    @change="refreshProgress" />
                                                                <label :for="question.id + '-' + alternativa.resposta"
                                                                    style="padding-top: 5px;">{{
                                                                        alternativa.resposta }}</label>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>

                                                <div v-else-if="question.tipo === 'radio'" class="row px-3">
                                                    <div v-for="(alternativa, alternativaIndex) in question.alternativas" v-bind:key="alternativaIndex"
                                                        class="col-6" style="text-align: left;">
                                                        <input type="radio" class="form-radio" :name="question.id"
                                                            :id="`alternativa-${question.id}-${alternativaIndex}`"
                                                            @input="updateSelectedOption(question.id, alternativa.resposta)" />
                                                        <label :for="`alternativa-${question.id}-${alternativaIndex}`"
                                                            class="radio-label">
                                                            {{ alternativa.resposta }}</label>
                                                    </div>
                                                </div>

                                                <div v-if="question.detalhar && question.detalhar === 'opcional'"
                                                    class="d-flex flex-row align-center justify-content-center">
                                                    <input type="checkbox" class="form-checkbox"
                                                        :name="question.id + '-detalhar-cb'"
                                                        :id="question.id + '-detalhar-cb'" v-model="question.detalhando"
                                                        @change="refreshProgress" />
                                                    <label :for="question.id + '-detalhar-cb'" class="label-big"
                                                        style="padding-top: 8px;">
                                                        {{ question.titulo_questao_detalhe ?
                                                            question.titulo_questao_detalhe : 'Detalhar...' }}
                                                    </label>
                                                </div>

                                                <!-- Caso a questão tiver detalhamento obrigatório ou o detalhamento for optado pelo usuário -->
                                                <div
                                                    v-if="question.detalhar === 'sempre' || (question.detalhar === 'opcional' && question.detalhando === true)">
                                                    <MaterialInput :name="question.id + '-detalhar'"
                                                        :label="question.detalhar === 'sempre' ? (question.titulo_questao_detalhe ? question.titulo_questao_detalhe : 'Favor detalhar:') : ''"
                                                        labelClass="label-big" :id="question.id + '-detalhar'"
                                                        v-model="question.detalhe" :input="refreshProgress" />
                                                </div>

                                                <div class="p-horizontal-divider"></div>

                                            </div> <!-- v-for / -->

                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <div v-if="hasStarted">

                                            <button v-if="percentageCompleteRequired < 100"
                                                class="btn btn-sm btn-primary next-button bg-gradient-secondary"
                                                @click="scrollToNextUnansweredQuestion"
                                                :disabled="false">Avançar</button>

                                            <button v-if="percentageCompleteRequired == 100"
                                                class="btn btn-sm btn-primary next-button bg-gradient-secondary"
                                                @click="finish">Finalizar</button>

                                            <div class="progress progress-striped">
                                                <div class="progress-bar" style="width: 0% !important">
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
        </section>
    </main>
</template>

<style scoped>
.question-container {
    font-weight: bold;
    font-size: 1rem !important;
    color: #45444f;
    padding: 6px 13px;
}

.main-container {
    padding: 15px;
    line-height: 25px;
}

.main-container label {
    font-size: 0.9rem !important;
}

.main-container input[type="checkbox"] {
    width: 18px !important;
    height: 18px !important;
}

.main-container input[type="radio"] {
    width: 15px !important;
    height: 15px !important;
}

#form-page1 input {
    text-align: center;
}

.main-content {
    background: linear-gradient(0deg, #EDEDED, #F2F2F2) !important;
    min-height: 100vh;
}

.header-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2vh;
    margin-bottom: 1vh;
}

.header-logo img {
    width: 130px !important;
}

/* .header-logo.small {
    padding: 1vh;
    margin-bottom: 0vh;
}

.header-logo.small img {
    width: 110px !important;
} */

.card-container {
    height: auto !important;
    max-height: 87vh !important;
    border: 2px solid #E8E8E8;
    border-radius: 20px;
    background: #FBFBFB;
    padding: 0px !important;
}

.card-container .card-header {
    height: 9vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #FBFBFB !important;
    border-radius: 20px !important;
    border-top-right-radius: 10px !important;
}

.card-container {
    border-top-right-radius: 10px !important;
}

.card-body {
    text-align: center;
    max-height: 70vh !important;
    overflow-y: auto;
    padding: 0px !important;
}

.card-body::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #f5f5f5;
}

.card-body::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
}

.card-body::-webkit-scrollbar-track {
    border-top-right-radius: 10px !important;
    background-color: #EEE;
}

.card-footer {}

.form-checkbox {
    min-width: 18px;
    min-height: 18px;
    width: 18px;
    height: 18px;
    margin-right: 6px !important;
}

.form-radio {
    width: 19px;
    height: 19px;
    margin-right: 6px !important;
}

.radio-label {
    padding-top: 7px;
}

.main-container p,
.main-form-container label,
.main-form-container span,
.label-big {
    font-size: 12pt !important;
}

.highlight-txt {
    font-size: 14pt;
    color: #666;
}

.start-button {
    width: 100%;
    font-size: 12pt !important;
    height: 50px;
    margin-top: 7vh;
}

.next-button {
    width: 100%;
    font-size: 12pt !important;
    height: 50px;
}

.card-footer button {
    width: 100%;
    font-size: 12pt;
}

.btn {
    margin-bottom: 0px !important;
}

table.align-center td {
    text-align: center !important;
}

table.options-checkbox {
    width: 100%;
    margin: 0 auto !important;
}

table.options-checkbox td {
    text-align: left;
}

.option-divider {
    width: 80%;
    height: 1px;
    background: linear-gradient(90deg, #FFF 0%, #E0E0E0 20%, #E0E0E0 80%, #FFF 100%) !important;
    margin: 0 auto;
    margin-top: 1vh;
    margin-bottom: 1vh;
}


.progress {
    margin-top: 1.5vh;
    width: 100% !important;
    height: 10px !important;
    padding: 1px;
    background: rgba(0, 0, 0, 0.05) !important;
    border-radius: 3px !important;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15),
        0 1px rgba(255, 255, 255, 0.08);
}

.progress-striped .progress-bar {
    height: 8px !important;
    border-radius: 3px !important;
    transition: 0.4s linear;
    transition-property: width, background-color;
    background: linear-gradient(310deg, #73a0df 0%, #2dcecc 100%) !important;
}
</style>

<script>
import entrarImg from "@/assets/img/signin.png";
import logo from "@/assets/img/lumi/logo-blue.png";
const body = document.getElementsByTagName("body")[0];
import MaterialInput from "@/components/MaterialInput.vue";
import { isMobile } from "@/utils.js";

const questions = [
    {
        questao: 'Nos diga o seu nome completo:',
        tipo: 'text',
        id: 'nome_completo',
        ordem: 10,
        obrigatoria: true,
        resposta: '',
        alternativas: null,
    },
    {
        questao: 'A sua idade:',
        tipo: 'text',
        id: 'idade',
        ordem: 20,
        obrigatoria: true,
        resposta: '',
        alternativas: null,
    },
    {
        questao: 'Seu e-mail, para ficar informado:',
        tipo: 'text',
        id: 'email',
        ordem: 30,
        obrigatoria: false,
        resposta: '',
        alternativas: null,
    },
    {
        questao: 'Agora seu celular/WhatsApp:',
        tipo: 'text',
        id: 'telefone',
        ordem: 40,
        obrigatoria: true,
        resposta: '',
        alternativas: null,
    },
    {
        questao: 'O que mais te incomoda em seu sorriso e que você gostaria de mudar?',
        tipo: 'checkbox',
        id: 'sorriso_incomodo',
        ordem: 50,
        obrigatoria: true,
        alternativas: [
            { resposta: 'dentes encavalados', selecionada: false, ponto_atencao: 'Dentes encavalados' },
            { resposta: 'dentes para frente (dentuço)', selecionada: false, ponto_atencao: 'Dentes para frente' },
            { resposta: 'espaço entre os dentes', selecionada: false, ponto_atencao: 'Espaço entre os dentes' },
            { resposta: 'sorriso torto', selecionada: false, ponto_atencao: 'Sorriso torto' },
            { resposta: 'dor ou sensibilidade nos dentes', selecionada: false, ponto_atencao: 'Dor ou sensibilidade nos dentes' },
        ],
        detalhar: "opcional",
        detalhando: false,
        titulo_questao_detalhe: "Outro(s):",
        titulo_consideracoes_detalhe: "Incômodos com o sorriso",
        detalhe: "",
    },
    {
        questao: 'O que isso interfere no seu dia-a-dia?',
        tipo: 'checkbox',
        id: 'problemas_sorriso',
        ordem: 60,
        obrigatoria: true,
        alternativas: [
            { resposta: 'Vergonha / medo de sorrir', selecionada: false, ponto_negativo: 'Vergonha ou medo de sorrir' },
            { resposta: 'Dificuldade em falar / pronunciar algumas palavras', selecionada: false, ponto_atencao: 'Dificuldade em falar' },
            { resposta: 'Medo e/ou preocupação em comer ou beber algo', selecionada: false, ponto_atencao: 'Preocupação em comer ou beber' },
        ],
        detalhar: "opcional",
        detalhando: false,
        titulo_questao_detalhe: "Outro(s):",
        titulo_consideracoes_detalhe: "Consequências no dia-a-dia",
        detalhe: "",
    },
    {
        questao: 'Você tem, ou já teve, algum destes hábitos?',
        tipo: 'checkbox',
        id: 'habitos_ruins',
        ordem: 70,
        obrigatoria: false,
        alternativas: [
            { resposta: 'Chupar chupeta', selecionada: false, ponto_negativo: 'Chupar chupeta' },
            { resposta: 'Chupar dedos', selecionada: false, ponto_negativo: 'Chupar dedos' },
            { resposta: 'Roer unhas', selecionada: false, ponto_negativo: 'Roer unhas' },
            { resposta: 'Ranger os dentes', selecionada: false, ponto_atencao: 'Ranger os dentes' },
            { resposta: 'Apertar os dentes', selecionada: false, ponto_atencao: 'Apertar os dentes' },
        ],
        detalhar: "opcional",
        detalhando: false,
        titulo_questao_detalhe: "Outro(s):",
        titulo_consideracoes_detalhe: "Hábitos",
        detalhe: "",
    },


    {
        questao: 'Quão bem você respira pelo nariz?',
        tipo: 'radio',
        id: 'respiracao_nariz',
        ordem: 80,
        obrigatoria: true,
        alternativas: [
            { resposta: 'Muito bem', selecionada: false, ponto_positivo: 'Respira muito bem pelo nariz' },
            { resposta: 'Normal', selecionada: false, ponto_neutro: 'Respira normalmente pelo nariz' },
            { resposta: 'Não muito bem', selecionada: false, ponto_negativo: 'Não respira muito bem pelo nariz' },
            { resposta: 'Quase nada', selecionada: false, ponto_negativo: 'Quase não respira pelo nariz' },
            { resposta: 'Nada', selecionada: false, ponto_negativo: 'Não respira pelo nariz' },
        ],
        detalhar: "opcional",
        detalhando: false,
        titulo_questao_detalhe: "Detalhar:",
        titulo_consideracoes_detalhe: "Respiração pelo nariz",
        detalhe: "",
    },
    {
        questao: 'Você costuma ter dores de cabeça?',
        tipo: 'radio',
        id: 'dores_cabeca',
        ordem: 90,
        obrigatoria: true,
        alternativas: [
            { resposta: 'Sempre', selecionada: false, ponto_negativo: 'Sempre tem dores de cabeça' },
            { resposta: 'Quase sempre', selecionada: false, ponto_negativo: 'Quase sempre tem dores de cabeça' },
            { resposta: 'Às vezes', selecionada: false, ponto_neutro: 'Às vezes tem dores de cabeça' },
            { resposta: 'Dificilmente', selecionada: false, ponto_positivo: 'Dificilmente tem dores de cabeça' },
            { resposta: 'Nunca', selecionada: false, ponto_positivo: 'Nunca tem dores de cabeça' },
        ],
        detalhar: "sempre",
        detalhando: false,
        titulo_questao_detalhe: "Se sim, por favor descreva:",
        titulo_consideracoes_detalhe: "Detalhes sobre a dor de cabeça",
        detalhe: "",
    },
    {
        questao: 'Você pratica algum esporte de contato físico?',
        tipo: 'radio',
        id: 'esporte_contato',
        ordem: 110,
        obrigatoria: true,
        alternativas: [
            { resposta: 'Sim', selecionada: false, ponto_atencao: 'Pratica esporte de contato físico' },
            { resposta: 'Não', selecionada: false }
        ]
    },
    {
        questao: 'Você tem algum problema de saúde?',
        tipo: 'checkbox',
        id: 'problemas_saude',
        ordem: 120,
        obrigatoria: false,
        alternativas: [
            { resposta: 'Diabetes', selecionada: false, ponto_negativo: 'Tem diabetes' },
            { resposta: 'Hipertensão', selecionada: false, ponto_negativo: 'Tem hipertensão' },
            { resposta: 'Doença cardíaca', selecionada: false, ponto_negativo: 'Tem doença cardíaca' },
            { resposta: 'Doença respiratória', selecionada: false, ponto_negativo: 'Tem doença respiratória' },
        ],
        detalhar: "opcional",
        detalhando: false,
        titulo_questao_detalhe: "Detalhar:",
        titulo_consideracoes_detalhe: "Problemas de saúde",
        detalhe: "",
    },
    {
        questao: 'Você tem algum problema de saúde mental?',
        tipo: 'checkbox',
        id: 'problemas_saude_mental',
        ordem: 130,
        obrigatoria: false,
        alternativas: [
            { resposta: 'Ansiedade', selecionada: false, ponto_negativo: 'Tem ansiedade' },
            { resposta: 'Depressão', selecionada: false, ponto_negativo: 'Tem depressão' },
        ],
        detalhar: "opcional",
        detalhando: false,
        titulo_questao_detalhe: "Detalhar:",
        titulo_consideracoes_detalhe: "Problemas de saúde mental",
        detalhe: "",
    },
    {
        questao: 'Você possui algum hábito que possa impactar negativamente sua saúde?',
        tipo: 'checkbox',
        id: 'habitos_saude',
        ordem: 140,
        obrigatoria: false,
        alternativas: [
            {
                resposta: 'Fumar',
                selecionada: false,
                ponto_negativo: 'Possui hábito de fumar'
            },
            {
                resposta: 'Beber',
                selecionada: false,
                ponto_negativo: 'Possui hábito de beber'
            },
        ],
        detalhar: "opcional",
        detalhando: false,
        titulo_questao_detalhe: "Outro(s):",
        titulo_consideracoes_detalhe: "Maus hábitos à saúde",
        detalhe: "",
    },
    {
        questao: 'Você tem algum problema de saúde bucal?',
        tipo: 'checkbox',
        id: 'problemas_saude_bucal',
        ordem: 150,
        obrigatoria: false,
        alternativas: [
            {
                resposta: 'Dor de dente',
                selecionada: false,
                ponto_atencao: 'Possui dor de dente'
            },
            {
                resposta: 'Sensibilidade nos dentes',
                selecionada: false,
                ponto_atencao: 'Possui sensibilidade nos dentes'
            },
            {
                resposta: 'Gengivite',
                selecionada: false,
                ponto_negativo: 'Possui gengivite'
            },
            {
                resposta: 'Periodontite',
                selecionada: false,
                ponto_negativo: 'Possui periodontite'
            },
        ],
        detalhar: "opcional",
        detalhando: false,
        titulo_questao_detalhe: "Outro(s):",
        titulo_consideracoes_detalhe: "Problemas de saúde bucal",
        detalhe: "",
    },
    {
        questao: 'Você autoriza a nossa equipe a tirar algumas fotos durante seu atendimento? Lembrando que não há exposição direta do paciente',
        tipo: 'radio',
        id: 'autorizacao_fotos',
        ordem: 160,
        obrigatoria: true,
        alternativas: [
            {
                resposta: 'Sim',
                selecionada: false,
                ponto_positivo: 'Autorizou a tirada de fotos'
            },
            {
                resposta: 'Não',
                selecionada: false,
                ponto_neutro: 'Não autorizou a tirada de fotos'
            }
        ]
    },
    {
        questao: 'Qual sua profissão/ocupação atual?',
        tipo: 'text',
        id: 'profissao_ocupacao',
        ordem: 170,
        obrigatoria: true,
        resposta: '',
        alternativas: null,
    },
    {
        questao: 'Você lida com o público?',
        tipo: 'radio',
        id: 'lida_publico',
        ordem: 180,
        obrigatoria: true,
        alternativas: [
            { resposta: 'Sim', selecionada: false },
            { resposta: 'Não', selecionada: false }
        ],
    },
    {
        questao: 'Você já fez tratamento ortodôntico no passado? Usou aparelho fixo ou removível?',
        tipo: 'radio',
        id: 'tratamento_ortodontico_passado',
        ordem: 190,
        obrigatoria: true,
        alternativas: [
            { resposta: 'Sim', selecionada: false },
            { resposta: 'Não', selecionada: false }
        ]
    },
    {
        questao: 'Como foi sua experiência com aparelho fixo? (assinale quantas opções você quiser)',
        tipo: 'checkbox',
        id: 'experiencia_aparelho_fixo',
        ordem: 200,
        obrigatoria: true,
        alternativas: [
            { resposta: 'Normal - nenhum incômodo', selecionada: false },
            { resposta: 'Desagradável', selecionada: false },
            { resposta: 'Quebrava / descolava constantemente', selecionada: false },
            { resposta: 'Machucava meus lábios, bochecha e/ou gengiva', selecionada: false },
            { resposta: 'Não combinava com minha personalidade / não gostava', selecionada: false },
            { resposta: 'Era difícil de higienizar', selecionada: false },
        ],
        detalhar: "sempre",
        detalhando: false,
        titulo_questao_detalhe: "Por favor, descreva:",
        titulo_consideracoes_detalhe: "",
        detalhe: "",
    },
    {
        questao: 'Qual sua percepção quando você vê alguém com aparelho fixo? (assinale quantas opções você quiser)',
        tipo: 'checkbox',
        id: 'percepcao_aparelho_fixo',
        ordem: 210,
        obrigatoria: true,
        alternativas: [
            { resposta: 'Normal', selecionada: false },
            { resposta: 'Acho bonito', selecionada: false },
            { resposta: 'Acho estranho', selecionada: false },
            { resposta: 'Acho feio', selecionada: false },
            { resposta: 'Deve doer', selecionada: false },
            { resposta: 'Não combina com a idade da pessoa - se ela é mais velha', selecionada: false },
            { resposta: 'Aparelho fixo é coisa de adolescentes', selecionada: false },
        ],
        detalhar: "sempre",
        detalhando: false,
        titulo_questao_detalhe: "Por favor, descreva:",
        titulo_consideracoes_detalhe: "",
        detalhe: "",
    },
    {
        questao: 'O que você considera importante em um tratamento ortodôntico? (assinale quantas opções você quiser)',
        tipo: 'checkbox',
        id: 'importante_tratamento_ortodontico',
        ordem: 220,
        obrigatoria: true,
        alternativas: [
            { resposta: 'Ser estético', selecionada: false },
            { resposta: 'Ser removível', selecionada: false },
            { resposta: 'Fácil de limpar', selecionada: false },
            { resposta: 'Não atrapalhar na alimentação', selecionada: false },
            { resposta: 'Fácil de higienizar os dentes', selecionada: false },
            { resposta: 'Saber como ficará meu sorriso no final do tratamento (previsibilidade)', selecionada: false },
        ],
        detalhar: "sempre",
        detalhando: false,
        titulo_questao_detalhe: "Por favor, descreva:",
        titulo_consideracoes_detalhe: "",
        detalhe: "",
    },
    {
        questao: 'Você está sob tratamento médico?',
        tipo: 'radio',
        id: 'tratamento_medico',
        ordem: 230,
        obrigatoria: true,
        alternativas: [
            { resposta: 'Sim', selecionada: false },
            { resposta: 'Não', selecionada: false },
        ],
        detalhar: "sempre",
        detalhando: false,
        titulo_questao_detalhe: "Se sim, descreva:",
        titulo_consideracoes_detalhe: "",
        detalhe: "",
    },
    {
        questao: 'Você já teve algum acidente e bateu a boca?',
        tipo: 'radio',
        id: 'acidente_bateu_boca',
        ordem: 240,
        obrigatoria: true,
        alternativas: [
            { resposta: 'Sim', selecionada: false },
            { resposta: 'Não', selecionada: false },
        ],
        detalhar: "sempre",
        detalhando: false,
        titulo_questao_detalhe: "Se sim, descreva:",
        titulo_consideracoes_detalhe: "Acidentes com a boca",
        detalhe: "",
    },
    {
        questao: 'Você já teve algum problema em tratamentos odontológicos anteriores?',
        tipo: 'radio',
        id: 'problema_tratamento_odontologico',
        ordem: 250,
        obrigatoria: true,
        alternativas: [
            { resposta: 'Sim', selecionada: false },
            { resposta: 'Não', selecionada: false }
        ]
    },
    {
        questao: 'Se já teve algum problema em tratamentos anteriores, nos conte como foi:',
        tipo: 'text',
        id: 'descricao_problema_tratamento_odontologico',
        ordem: 260,
        obrigatoria: false,
        resposta: '',
        alternativas: null,
    },
    {
        questao: 'Quando foi sua última consulta e/ou tratamento odontológico? (se quiser, pode nos dizer o nome do dentista e/ou como foi sua última experiência)',
        tipo: 'text',
        id: 'ultima_consulta_tratamento_odontologico',
        ordem: 270,
        obrigatoria: true,
        resposta: '',
        alternativas: null,
    },
];

export default {
    name: "welcomeForm",
    components: {
        MaterialInput,
    },
    computed: {
        percentageComplete() {
            const totalQuestions = this.questions.length;
            let answeredQuestions = 0;

            for (const question of this.questions) {
                if (this.isQuestionAnswered(question)) {
                    answeredQuestions++;
                }
            }

            return (answeredQuestions / totalQuestions) * 100;
        },
        percentageCompleteRequired() {
            const requiredQuestions = this.questions.filter(question => question.obrigatoria);
            let answeredRequiredQuestions = 0;

            for (const question of requiredQuestions) {
                if (this.isQuestionAnswered(question)) {
                    answeredRequiredQuestions++;
                }
            }

            return (answeredRequiredQuestions / requiredQuestions.length) * 100;
        },
    },
    methods: {
        scrollToNextUnansweredQuestion() {
            const requiredQuestions = this.questions.filter(question => question.obrigatoria);

            const unansweredQuestion = requiredQuestions.find(question => !this.isQuestionAnswered(question))

            if (unansweredQuestion) {
                const questionElement = this.$refs['question' + this.questions.indexOf(unansweredQuestion)][0]
                questionElement.scrollIntoView({ behavior: 'smooth' })
            }
        },
        updateSelectedOption(questionName, optionValue) {
            this.questions.forEach((question) => {
                if (question.id === questionName) {
                    question.alternativas.forEach((option) => {
                        option.selecionada = option.resposta === optionValue;
                    });
                }
            });

            this.refreshProgress()
        },
        startForm() {
            this.hasStarted = true;

            window.setTimeout(() => {
                this.refreshProgress()
            }, 50)
        },
        refreshProgress() {
            document.getElementsByClassName('progress-bar')[0].style = 'width: ' + this.percentageComplete + '% !important';
        },
        isQuestionAnswered(question) {
            return (
                (question.tipo === "text" && question.resposta !== '')

                ||

                (
                    (question.tipo === "checkbox" || question.tipo === "radio")
                    &&
                    question.alternativas.some(option => option.selecionada)
                )

                ||

                (question.detalhar && question.detalhar === 'sempre' && question.detalhe && question.detalhe.trim() !== '')

                ||

                (question.detalhar && question.detalhar === 'opcional' && question.detalhando && question.detalhe && question.detalhe.trim() !== '')
            )
        },
        getLogoClass() {
            return this.hasStarted ? 'small' : '';
        },
    },
    data() {
        return {
            entrarImg,
            logo,
            hasStarted: false,
            hasFinished: false,
            isMobile: isMobile(),
            questions,
        }
    },
    created() {
        this.$store.state.hideConfigButton = true;
        this.$store.state.showNavbar = false;
        this.$store.state.showSidenav = false;
        this.$store.state.showFooter = false;
        body.classList.remove("bg-gray-100");
    },
    beforeUnmount() {
        this.$store.state.hideConfigButton = false;
        this.$store.state.showNavbar = true;
        this.$store.state.showSidenav = true;
        this.$store.state.showFooter = true;
        body.classList.add("bg-gray-100");
    },
};
</script>