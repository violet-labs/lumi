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
                                        <h4 class="font-weight-bolder">Seja muito bem-vindo!</h4>
                                    </div>
                                    <div v-if="currentPage == totalPages" class="pb-0 card-header text-center"
                                        style="padding-top: 50px;">
                                        <h4 class="font-weight-bolder">
                                            É um prazer recebê-lo, Thales!
                                        </h4>
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
                                        <div v-if="hasStarted">
                                            <div v-if="currentPage == 1" id="form-page1">
                                                <div class="main-container">
                                                    <label for="nome_completo">Nos diga o seu nome completo:</label>
                                                    <MaterialInput id="nome_completo" name="nome_completo">
                                                    </MaterialInput>

                                                    <div class="option-divider"></div>

                                                    <label for="nome_completo">Qual é a sua idade?</label>
                                                    <MaterialInput id="nome_completo" name="nome_completo">
                                                    </MaterialInput>

                                                    <div class="option-divider"></div>

                                                    <label for="nome_completo">Seu e-mail, para ficar informado:</label>
                                                    <MaterialInput id="nome_completo" name="nome_completo">
                                                    </MaterialInput>

                                                    <div class="option-divider"></div>

                                                    <label for="nome_completo">Agora seu celular/WhatsApp:</label>
                                                    <MaterialInput id="nome_completo" name="nome_completo">
                                                    </MaterialInput>

                                                </div>
                                            </div>
                                            <div v-if="currentPage == 2">
                                                <div class="question-container">
                                                    O que mais te incomoda em seu sorriso? O que você gostaria de mudar?
                                                </div>
                                                <div class="main-container">
                                                    <table class="options-checkbox">
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> dentes
                                                                    encavalados</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="checkbox"> dentes para frente
                                                                    (dentuço)</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> espaço entre os
                                                                    dentes</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="checkbox"> sorriso torto</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> dor ou sensibilidade nos
                                                                    dentes</label>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                    </table>

                                                    <label><input type="checkbox"> Outro(s):</label>
                                                </div>
                                            </div>
                                            <div v-if="currentPage == 3">
                                                <div class="question-container">
                                                    O que isso interfere no seu dia-a-dia?
                                                </div>
                                                <div class="main-container">
                                                    <table class="options-checkbox">
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> Vergonha / medo de
                                                                    sorrir</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> Dificuldade em falar /
                                                                    pronunciar algumas palavras</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> medo e/ou preocupação em
                                                                    comer ou beber algo</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> Outro(s):</label>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                            <div v-if="currentPage == 4">
                                                <div class="question-container">
                                                    Você tem, ou já teve, algum destes hábitos?
                                                </div>
                                                <div class="main-container">
                                                    <table class="options-checkbox">
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> Chupar chupeta</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="checkbox"> Chupar dedos</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> Roer unhas</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="checkbox"> Ranger os dentes</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> Apertar os dentes</label>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                    </table>
                                                    <label><input type="checkbox"> Outro(s):</label>
                                                </div>
                                            </div>
                                            <div v-if="currentPage == 5">
                                                <div class="question-container">
                                                    Quão bem você respira pelo nariz?
                                                </div>
                                                <div class="main-container">
                                                    <table class="options-checkbox">
                                                        <tr>
                                                            <td>
                                                                <label><input type="radio"> Muito bem</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="radio"> Normal</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label><input type="radio"> Não muito bem</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="radio"> Quase nada</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label><input type="radio"> Nada</label>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                    </table>
                                                    <label><input type="radio"> Detalhar:</label>
                                                </div>
                                            </div>
                                            <div v-if="currentPage == 6">
                                                <div class="question-container">
                                                    Você costuma ter dores de cabeça?
                                                </div>
                                                <div class="main-container">
                                                    <table class="options-checkbox">
                                                        <tr>
                                                            <td>
                                                                <label><input type="radio"> Sempre</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="radio"> Quase sempre</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label><input type="radio"> Às vezes</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="radio"> Dificilmente</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label><input type="radio"> Nunca</label>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                    </table>
                                                    <label><input type="radio"> Detalhar:</label>
                                                </div>
                                            </div>
                                            <div v-if="currentPage == 7">
                                                <div class="question-container">
                                                    Descreva como é a sua dor de cabeça:
                                                </div>
                                                <div class="main-container">
                                                    <MaterialInput></MaterialInput>
                                                </div>
                                                <div class="question-container">
                                                    Você pratica algum esporte de contato físico?
                                                </div>
                                                <div class="main-container">
                                                    <table class="options-checkbox align-center">
                                                        <tr>
                                                            <td>
                                                                <label><input type="radio"> Sim</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="radio"> Não</label>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                            <div v-if="currentPage == 8">
                                                <div class="question-container">
                                                    Qual é a sua profissão/ocupação?
                                                </div>
                                                <div class="main-container">
                                                    <MaterialInput></MaterialInput>
                                                </div>
                                                <div class="question-container">
                                                    Você lida com o público?
                                                </div>
                                                <div class="main-container">
                                                    <table class="options-checkbox align-center">
                                                        <tr>
                                                            <td>
                                                                <label><input type="radio"> Sim</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="radio"> Não</label>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                                <div class="question-container">
                                                    Você já fez tratamento ortodôntico?
                                                </div>
                                                <div class="main-container">
                                                    <table class="options-checkbox align-center">
                                                        <tr>
                                                            <td>
                                                                <label><input type="radio"> Sim</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="radio"> Não</label>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                            <!-- v-if="Se a resposta acima for sim": -->
                                            <div v-if="currentPage == 9">
                                                <div class="question-container">
                                                    Como foi sua experiência com aparelho fixo?
                                                </div>
                                                <div class="main-container">
                                                    <table class="options-checkbox">
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> Sem incômodo</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="checkbox"> Desagradável</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> Quebrava
                                                                    constantamente</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="checkbox"> Machucava minha
                                                                    boca</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> Não combinava
                                                                    comigo</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="checkbox"> Era difícil de
                                                                    higienizar</label>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <label><input type="checkbox"> Detalhar:</label>
                                                </div>
                                            </div>
                                            <div v-if="currentPage == 10">
                                                <div class="question-container">
                                                    Qual sua percepção ao ver alguém com aparelho fixo?
                                                </div>
                                                <div class="main-container">
                                                    <table class="options-checkbox">
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> Acho normal</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="checkbox"> Acho bonito</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> Acho estranho</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="checkbox"> Acho feio</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> Parece doer</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="checkbox"> Parece coisa de
                                                                    adolescente</label>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <label><input type="checkbox"> Detalhar:</label>
                                                </div>
                                            </div>
                                            <div v-if="currentPage == 11">
                                                <div class="question-container">
                                                    O que você considera importante em um tratamento ortodôntico?
                                                </div>
                                                <div class="main-container">
                                                    <table class="options-checkbox">
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> Ser estético</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="checkbox"> Ser removível</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> Facilidade de
                                                                    limpar</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="checkbox"> Não atrapalhar na
                                                                    alimentação</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> Não dificultar a higiene
                                                                    dos dentes</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="checkbox"> Previsibilidade do
                                                                    resultado final</label>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <label><input type="checkbox"> Detalhar:</label>
                                                </div>
                                            </div>
                                            <div v-if="currentPage == 12">
                                                <div class="question-container">
                                                    Você está sob tratamento médico?
                                                </div>
                                                <div class="main-container">
                                                    <table class="options-checkbox align-center">
                                                        <tr>
                                                            <td>
                                                                <label><input type="radio"> Sim</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="radio"> Não</label>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                                <div class="question-container">
                                                    Você tem algum destes problemas de saúde?
                                                </div>
                                                <div class="main-container">
                                                    <table class="options-checkbox">
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> Pressão alta</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="checkbox"> Diabetes</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label><input type="checkbox"> Problema cardíaco</label>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                    </table>
                                                    <label><input type="checkbox"> Outro(s):</label>
                                                </div>
                                            </div>
                                            <div v-if="currentPage == 13">
                                                <div class="question-container">
                                                    Você já sofreu algum acidente em que bateu a boca?
                                                </div>
                                                <div class="main-container">
                                                    <table class="options-checkbox align-center">
                                                        <tr>
                                                            <td>
                                                                <label><input type="radio"> Sim</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="radio"> Não</label>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                                <div class="question-container">
                                                    Você já teve algum problema em um tratamento odontológico anterior?
                                                </div>
                                                <div class="main-container">
                                                    <table class="options-checkbox align-center">
                                                        <tr>
                                                            <td>
                                                                <label><input type="radio"> Sim</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="radio"> Não</label>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                            <!-- v-if="Se a resposta da pergunta acima for Sim" -->
                                            <div v-if="currentPage == 14">
                                                <div class="question-container">
                                                    Conte-nos como foi o problema que você enfrentou:
                                                </div>
                                                <div class="main-container">
                                                    <MaterialInput></MaterialInput>
                                                </div>
                                                <div class="question-container">
                                                    Quando foi sua última consulta e/ou tratamento odontológico? Se
                                                    quiser, pode nos contar como foi sua experiência:
                                                </div>
                                                <div class="main-container">
                                                    <MaterialInput></MaterialInput>
                                                </div>
                                            </div>
                                            <div v-if="currentPage == 15">
                                                <div class="question-container">
                                                    Nos conte como você conheceu o Instituto Daniel Salles:
                                                </div>
                                                <div class="main-container">
                                                    <MaterialInput></MaterialInput>
                                                </div>
                                                <div class="question-container">
                                                    Você bem atendido(a) pela nossa equipe?
                                                </div>
                                                <div class="main-container">
                                                    <table class="options-checkbox align-center">
                                                        <tr>
                                                            <td>
                                                                <label><input type="radio"> Sim</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="radio"> Não</label>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                            <!-- v-if="Se a resposta anterior for Sim" -->
                                            <!-- <div v-if="currentPage == 16">
                                                <div class="question-container">
                                                    Por favor, nos diga o que houve:
                                                </div>
                                                <div class="main-container">
                                                    <MaterialInput></MaterialInput>
                                                </div>
                                            </div> -->
                                            <div v-if="currentPage == 17">
                                                <div class="question-container">
                                                    Você autoriza a nossa equipe a tirar algumas fotos durante seu
                                                    atendimento? Lembrando que não há exposição direta do paciente.
                                                </div>
                                                <div class="main-container">
                                                    <table class="options-checkbox align-center">
                                                        <tr>
                                                            <td>
                                                                <label><input type="radio"> Sim</label>
                                                            </td>
                                                            <td>
                                                                <label><input type="radio"> Não</label>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                            <div v-if="currentPage == 18">
                                                <div class="main-container">
                                                    <p>
                                                        <br>
                                                        Obrigado por suas respostas! Elas irão nos ajudar a entender
                                                        melhor as suas necessidades e te apresentar a melhor solução!
                                                        <br>
                                                        Nos vemos jajá :)
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <div v-if="hasStarted">
                                            <button v-if="currentPage < totalPages - 1"
                                                class="btn btn-sm btn-primary next-button bg-gradient-secondary"
                                                @click="nextPage" :disabled="currentPage >= totalPages">Avançar</button>
                                            <button v-if="currentPage == totalPages - 1"
                                                class="btn btn-sm btn-primary next-button bg-gradient-secondary"
                                                @click="nextPage">Finalizar</button>
                                            <div class="progress progress-striped">
                                                <div class="progress-bar">
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

body {
    background: linear-gradient(0deg, #EDEDED, #fbfbfb) !important;
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
    border: 1px solid #DDD;
    border-radius: 20px;
    background: #FBFBFB;
    transition: box-shadow 0.3s ease;
    padding: 0px !important;
}

.card-container .card-header {
    height: 9vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #FBFBFB !important;
    border-radius: 20px !important;
}

.card-body {
    text-align: center;
    max-height: 70vh !important;
    overflow-y: auto;
    padding: 0px !important;
}

.card-footer {}

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

var hasStarted = false;
var currentPage = 1;
var totalPages = 18;

export default {
    name: "entrar",
    components: {
        MaterialInput,
    },
    methods: {
        startForm() {
            this.hasStarted = true;

            window.setTimeout(() => {
                this.refreshProgress()
            }, 50)
        },
        nextPage() {
            if (this.currentPage > this.totalPages + 1)
                return false;

            this.currentPage++;

            if (this.currentPage == 16)
                this.currentPage = 17

            this.refreshProgress()
        },
        refreshProgress() {
            var percentageComplete = parseFloat((this.currentPage - 1) / ((this.totalPages - 1) / 100)).toFixed(2)

            document.getElementsByClassName('progress-bar')[0].style = 'width: ' + percentageComplete + '%';
        },
        getLogoClass() {
            return this.hasStarted ? 'small' : '';
        },
    },
    data() {
        return {
            entrarImg,
            logo,
            hasStarted,
            currentPage,
            totalPages,
            isMobile: isMobile()
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