<template>
  <!-- <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12"> -->
  <div class="card">
    <div class="card-body px-0 pt-0 pb-2" style="padding-top: 0px; padding-bottom: 0px !important;">
      <div class="row">
        <div class="main-container" style="padding: 0px !important;">
          <div class="question-container">
            <h5>
              Tratamento #4 - Paciente: <strong>{{ paciente.nomeCompleto }}</strong>
            </h5>
          </div>
          <div class="container options-container" ref="optionsContainer" style="max-width: none;">
            <div v-for="optionArray in historyOptionsArrays" :key="optionArray.id" class="row justify-content-md-center"
              style="max-width: 1200px; margin: 0 auto;">
              <div v-for="option in optionArray" :key="option.id">
                <div v-if="option.question" class="row justify-content-md-center">
                  <div class="options-question-container history">
                    {{ option.question }}
                  </div>
                </div>
              </div>
              <div v-for="option in optionArray" :key="option.id" class="col col-sm-6 col-md-4">
                <div class="card option-card history" :class="{ 'selected': option.selected }">
                  <div class="option-image-container">
                    <img :src="option.image" class="card-img-top">
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">{{ option.option }}</h5>
                    <p class="card-text">
                      {{ option.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="row justify-content-md-center">
              <div v-if="currentQuestion" class="options-question-container">
                {{ currentQuestion }}
              </div>
            </div>
            <div class="row justify-content-md-center" ref="currentOptionContainer"
              style="max-width: 1200px; margin: 0 auto;">
              <div v-for="option in currentOptions" :key="option.id" class="col col-sm-6 col-md-4 mb-4">
                <div class="card option-card" :class="{ 'selected': option.selected }"
                  v-on:click="selectOption(option)">
                  <div class="option-image-container">
                    <img :src="option.image" class="card-img-top">
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">{{ option.option }}</h5>
                    <p class="card-text">
                      {{ option.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="currentTreatments.length > 0"
              style="width: 100%; height: 1px; background: #CCC; margin-top: 30px; margin-bottom: 30px;"></div>

            <div v-if="currentTreatments.length > 0" class="row justify-content-md-center">
              <div class="options-question-container outcome">
                {{ currentTreatments.length > 1 ? 'Tratamentos recomendados' : 'Tratamento recomendado' }}:
              </div>
            </div>
            <div v-if="currentTreatments.length > 0" class="row justify-content-md-center" ref="treatmentContainer"
              style="max-width: 1200px; margin: 0 auto;">
              <div v-for="treatment in currentTreatments" :key="treatment.id" class="col col-sm-6 col-md-4 mb-4">
                <div class="card option-card outcome" v-on:click="selectOption(option)">
                  <div class="option-image-container">
                    <img :src="treatment.image" class="card-img-top">
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">{{ treatment.title }}</h5>
                    <p class="card-text">
                      {{ treatment.description }}
                      <br v-if="treatment.secondary_description">
                      <span style="font-size: 10pt;">{{ treatment.secondary_description }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <br>
              <div style="width: 100%; text-align: center; padding-bottom: 20px; padding-top: 15px;">
                <button class="btn btn-sm btn-primary" style="width: 150px;">Salvar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </div>
    </div>
  </div> -->
</template>


<style>
.main-container {
  padding: 0px;
}

.options-question-container {
  width: 70%;
  margin: 0 auto;
  padding: 5px 10px;
  border: 1px solid #666;
  text-align: center;
  border-radius: 6px;
  margin-bottom: 20px;
  background: linear-gradient(#DDD, #EEE, #DDD);
  color: #0F0F0F;
  font-size: 15pt;
}

.options-question-container.outcome {
  border: 1px solid #900;
  cursor: default !important;
}

.options-question-container.outcome:hover {
  cursor: default !important;
}

.options-question-container.history {
  scale: 0.75
}

.question-container {
  border: 1px solid #EEE;
  border-radius: 1rem 1rem 0px 0px;
  padding: 10px 20px;
  background: #EEE;
  color: #333;
}

.options-container {

  background-image: linear-gradient(#E0E0E0 15%, #EEE 30%, #FFF);
  background-repeat: repeat;
  background-attachment: scroll;
  overflow-y: auto;
  max-height: 80vh;
  padding: 10px;
  border: 1px solid #DDD;
  border-radius: 0px 0px 1rem 1rem;
  padding-top: 20px;
}

.card.option-card {
  transition: transform 1.5s ease;
  text-align: center;
  border: 1px solid #DDD;
  border: 2px solid transparent;


  &:hover,
  &:focus {
    /* margin-top: 3px; */
    cursor: pointer;
    border: 2px solid #73A0DF;
  }
}

.card.option-card.history {
  margin: -20px;
  scale: 0.7;
  margin-top: -40px;
  filter: gray;
  /* IE6-9 */
  -webkit-filter: grayscale(1);
  /* Google Chrome, Safari 6+ & Opera 15+ */
  filter: grayscale(1);
  /* Microsoft Edge and Firefox 35+ */


  &:hover,
  &:focus {
    /* margin-top: 3px; */
    cursor: pointer;
    border: 2px solid #73A0DF;
  }
}

.card.option-card.history.selected::after {
  content: "";
  position: absolute;
  border-radius: 15px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  /* Altere o último valor (0.5) para ajustar a opacidade */
  z-index: 1;
  /* Ajuste conforme necessário */
}

.card.option-card.history::after {
  content: "";
  position: absolute;
  border-radius: 15px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  /* Altere o último valor (0.5) para ajustar a opacidade */
  z-index: 1;
  /* Ajuste conforme necessário */
}

.card.option-card.outcome {
  border: 1px solid #900;
}

.card.option-card.history.selected {
  text-align: center;
  -webkit-filter: grayscale(0);
  filter: none;


  &:hover,
  &:focus {
    /* margin-top: 3px; */
    cursor: pointer;
    border: 2px solid #73A0DF;
  }
}

.card.option-card.selected {
  text-align: center;
  border: 1px solid #00A8E9;

  &:hover,
  &:focus {
    /* margin-top: 3px; */
    cursor: pointer;
    border: 2px solid #73A0DF;
  }
}

.card.option-card .card-body {
  background: #EEE;
  border-radius: 0px 0px 1rem 1rem;
}

.option-image-container {
  width: 100%;
  text-align: center;
}

.option-image-container img {
  margin: 0 auto;
  width: 160px;
}
</style>

<script>

import imgDefault from "@/assets/img/protocolos/default.png";

import imgClasseI from "@/assets/img/protocolos/classe1.png";
import imgClasseII from "@/assets/img/protocolos/classe2.png";
import imgClasseIII from "@/assets/img/protocolos/classe3.png";

import imgMascaraFacial from "@/assets/img/protocolos/treatments/mascara_facial.png"
import imgCirurgiaOrtognatica from "@/assets/img/protocolos/treatments/cirurgia-ortognatica.png"

import imgAntesPicoCrescimentoPuberal from "@/assets/img/protocolos/antes_pico_crescimento_puberal.png"
import imgAposPicoCrescimentoPuberal from "@/assets/img/protocolos/apos_pico_crescimento_puberal.png"

import imgDolico from "@/assets/img/protocolos/biotipo-dolico.png"
import imgMesoBraqui from "@/assets/img/protocolos/biotipo-meso-braqui.png"

import imgLinhaMediaSemDesvio from "@/assets/img/protocolos/linhamedia-sem-desvio.png"
import imgLinhaMediaSuperiorDesviada from "@/assets/img/protocolos/linhamedia-superior-desviada.png"
import imgLinhaMediaInferiorDesviada from "@/assets/img/protocolos/linhamedia-inferior-desviada.png"

import imgPequenoApinhamento from "@/assets/img/protocolos/pequeno-apinhamento.jpg"
import imgApinhamentoSevero from "@/assets/img/protocolos/apinhamento-severo.jpg"

export default {
  name: "Tratamento",
  components: {

  },
  mounted() {
  },
  methods: {
    selectOption(option) {
      for (let opt of this.currentOptions) {
        opt.selected = false
      }
      option.selected = true

      window.setTimeout(() => {
        this.currentTreatments = []
        this.historyOptionsArrays.push(this.currentOptions)
        this.currentOptions = option.children

        if (option.outcomes && option.outcomes.length > 0) {
          for (let treatmentId of option.outcomes)
            for (let treatment of this.treatments)
              if (treatment.id == treatmentId) {
                this.currentTreatments.push(treatment)
                this.currentQuestion = null
              }
        }

        else {
          for (option of this.currentOptions)
            if (option.question)
              this.currentQuestion = option.question
        }

        window.setTimeout(() => {
          var container = this.$refs.currentOptionContainer;
          container.scrollIntoView({
            behavior: 'smooth'
          })
        }, 300)
      }, 300);
    }
  },
  data() {
    return {
      settings: {
        itemsToShow: 1,
        snapAlign: 'center',
      },
      // breakpoints are mobile first
      // any settings not specified will fallback to the carousel settings
      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 3.5,
          snapAlign: 'center',
        },
        // 1024 and up
        1024: {
          itemsToShow: 5,
          snapAlign: 'start',
        },
      },
      chosenOptionsHtml: '',
      choosingOptionsHtml: '',
      finalOptionsHtml: '',
      currentQuestion: 'Qual tratamento iremos iniciar?',
      currentOptionsPath: [],
      renderedOptions: [],
      paciente: {
        nomeCompleto: 'Thales Casa Grande de Lima',
        primeiroNome: 'Thales'
      },
      currentTreatments: [],
      historyOptionsArrays: [],
      currentOptions: [
        {
          question: 'Qual tratamento iremos iniciar?',
          id: 4,
          image: imgClasseI,
          option: 'Classe I',
          description: 'Arcos dentários em relação mesiodistal normal',
          children: [
            {
              question: 'Em qual dos casos o paciente se encaixa?',
              id: 7,
              image: imgPequenoApinhamento,
              option: 'Pequenos apinhamentos ou Curva de Spee Plana',
              description: '',
              outcomes: [1]
            },
            {
              id: 8,
              image: imgApinhamentoSevero,
              option: 'Apinhamentos severos ou Curva de Spee muito acentuada ou Biprotrusão',
              description: '',
              children: [
                {
                  question: 'Existe sobremordida?',
                  id: 81,
                  image: imgDefault,
                  option: 'Sem sobremordida',
                  description: '',
                  outcomes: [2]
                },
                {
                  id: 91,
                  image: imgDefault,
                  option: 'Com sobremordida',
                  description: '',
                  children: [
                    {
                      question: 'Qual é o biotipo facial?',
                      id: 92,
                      image: imgDolico,
                      option: 'Dólico',
                      description: '',
                      outcomes: [2]
                    },
                    {
                      id: 93,
                      image: imgMesoBraqui,
                      option: 'Meso ou braqui',
                      description: '',
                      outcomes: [3]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 5,
          image: imgClasseII,
          option: 'Classe II',
          description: 'Arco inferior distal ao normal em sua relação para o arco superior',
          children: [
            {
              question: 'Há desvio da linha média?',
              id: 101,
              image: imgLinhaMediaSemDesvio,
              option: 'Não há desvio',
              description: '',
              children: [
                {
                  question: 'Qual o tamanho da classe II?',
                  id: 111,
                  image: imgDefault,
                  option: 'Pequena',
                  description: '1 a 2mm',
                  outcomes: [4]
                },
                {
                  id: 112,
                  image: imgDefault,
                  option: 'Média',
                  description: '3 a 4mm',
                  children: [
                    {
                      question: 'Existe protusão maxilar ou retrusão mandibular?',
                      id: 121,
                      image: imgDefault,
                      option: 'Protrusão maxilar',
                      children: [
                        {
                          question: 'Qual é o biotipo facial?',
                          id: 131,
                          image: imgMesoBraqui,
                          option: 'Braqui / Meso',
                          outcomes: [5]
                        },
                        {
                          id: 132,
                          image: imgDolico,
                          option: 'Dólico',
                          outcomes: [6]
                        }
                      ]
                    },
                    {
                      id: 122,
                      image: imgDefault,
                      option: 'Retrusão mandibular',
                      description: '',
                      children: [
                        {
                          question: 'Qual é o biotipo facial?',
                          id: 131,
                          image: imgMesoBraqui,
                          option: 'Braqui / Meso',
                          outcomes: [7]
                        },
                        {
                          id: 132,
                          image: imgDolico,
                          option: 'Dólico',
                          outcomes: [8]
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 113,
                  image: imgDefault,
                  option: 'Grande',
                  description: '+5mm',
                  children: [
                    {
                      question: 'Existe protusão maxilar ou retrusão mandibular?',
                      id: 141,
                      image: imgDefault,
                      option: 'Protrusão maxilar',
                      children: [
                        {
                          question: 'Qual é o biotipo facial?',
                          id: 151,
                          image: imgMesoBraqui,
                          option: 'Braqui / Meso',
                          outcomes: [5]
                        },
                        {
                          id: 152,
                          image: imgDolico,
                          option: 'Dólico',
                          outcomes: [9]
                        }
                      ]
                    },
                    {
                      id: 142,
                      image: imgDefault,
                      option: 'Retrusão mandibular',
                      children: [
                        {
                          question: 'Qual é o biotipo facial?',
                          id: 161,
                          image: imgMesoBraqui,
                          option: 'Braqui / Meso',
                          outcomes: [10]
                        },
                        {
                          id: 162,
                          image: imgDolico,
                          option: 'Dólico',
                          outcomes: [8]
                        }
                      ]
                    },
                    {
                      id: 143,
                      image: imgDefault,
                      option: 'Protrusão maxilar e retrusão mandibular',
                      children: [
                        {
                          question: 'Qual é o biotipo facial?',
                          id: 171,
                          image: imgMesoBraqui,
                          option: 'Braqui / Meso',
                          outcomes: [10, 11]
                        },
                        {
                          id: 172,
                          image: imgDolico,
                          option: 'Dólico',
                          outcomes: [8]
                        }
                      ]
                    },
                  ]
                }
              ]
            },
            {
              id: 102,
              image: imgLinhaMediaSuperiorDesviada,
              option: 'Linha média superior desviada e inferior centralizada',
              description: 'Problema: protrusão maxilar unilateral',
              children: [
                {
                  question: 'Qual o tamanho da Classe II?',
                  id: 181,
                  image: imgDefault,
                  option: 'Pequena',
                  description: '1 a 2mm',
                  outcomes: [4]
                },
                {
                  id: 182,
                  image: imgDefault,
                  option: 'Média',
                  description: '3 a 4mm',
                  children: [
                    {
                      question: 'Qual é o biotipo facial?',
                      id: 191,
                      image: imgMesoBraqui,
                      option: 'Braqui / Meso',
                      outcomes: [12]
                    },
                    {
                      id: 192,
                      image: imgDolico,
                      option: 'Dólico',
                      outcomes: [13]
                    }
                  ]
                },
                {
                  id: 183,
                  image: imgDefault,
                  option: 'Grande',
                  description: '+ 5mm',
                  secondary_description: 'Braqui, meso ou dólico',
                  outcomes: [14]
                }
              ]
            },
            {
              id: 103,
              image: imgLinhaMediaInferiorDesviada,
              option: 'Linha média inferior desviada e superior centralizada',
              description: 'Problema: retrusão mandibular unilateral',
              children: [
                {
                  question: 'Qual o tamanho da Classe II?',
                  id: 211,
                  image: imgDefault,
                  option: 'Pequena',
                  description: '1 a 2mm',
                  outcomes: [4]
                },
                {
                  id: 212,
                  image: imgDefault,
                  option: 'Média',
                  description: '3 a 4mm',
                  outcomes: [15]
                },
                {
                  id: 213,
                  image: imgDefault,
                  option: 'Grande',
                  description: '+ 5mm',
                  children: [
                    {
                      question: 'Qual é o biotipo facial?',
                      id: 221,
                      image: imgMesoBraqui,
                      option: 'Braqui / Meso',
                      outcomes: [16]
                    },
                    {
                      id: 222,
                      image: imgDolico,
                      option: 'Dólico',
                      description: '* Problema',
                      children: [
                        {
                          question: 'Possui retrusão mandibular ou protrusão maxilar?',
                          id: 231,
                          image: imgDefault,
                          option: 'Retrusão mandibular',
                          outcomes: [8]
                        },
                        {
                          id: 232,
                          image: imgDefault,
                          option: 'Protrusão maxilar',
                          outcomes: [17]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 6,
          image: imgClasseIII,
          option: 'Classe III',
          description: 'Arco inferior mesial à sua relação normal com o arco superior',
          children: [
            {
              question: 'Já ocorreu o pico de crescimento puberal?',
              id: 2,
              image: imgAntesPicoCrescimentoPuberal,
              option: 'Não',
              description: 'Até pico de crescimento puberal',
              outcomes: [18]
            },
            {
              id: 3,
              image: imgAposPicoCrescimentoPuberal,
              option: 'Sim',
              description: 'Após pico de crescimento puberal',
              children: [
                {
                  question: 'Qual o nível da classe III?',
                  id: 5,
                  image: imgDefault,
                  option: 'Pequena',
                  description: '1 a 2mm',
                  outcomes: [19]
                },
                {
                  id: 6,
                  image: imgDefault,
                  option: 'Média',
                  description: '3 a 4mm',
                  outcomes: [19, 20]
                },
                {
                  id: 7,
                  image: imgDefault,
                  option: 'Grande',
                  description: 'Acima de 5mm',
                  outcomes: [21, 11]
                }
              ]
            }
          ]
        },
      ],
      treatments: [
        {
          id: 1, // (IDs 1-1)
          image: imgDefault,
          title: 'Tratamento simples',
          description: '(alinhamento e nivelamento)',
          secondary_description: '*Bráquetes estéticos / *alinhadores'
        },
        {
          id: 2, // (IDs 1-2)
          image: imgDefault,
          title: 'Distalização e/ou intrusão com DATs',
          description: 'Exodontia 4 prés',
          secondary_description: '(quando o perfil permitir)'
        },
        {
          id: 3, // (IDs 1-3)
          image: imgDefault,
          title: 'Priorizar desenvolvimento transversal',
          description: 'Vestibularização incisivos / desgastes interproximais superior e inferior',
          secondary_description: 'Nunca fazer extrações'
        },
        {
          id: 4, // (IDs 3-1, 6-1, 7-1)
          image: imgDefault,
          title: 'Elástico Classe II',
          description: 'desde o início do tratamento',
          secondary_description: '*Bráquetes estéticos'
        },
        {
          id: 5, // (IDs 3-2, 4-1)
          image: imgDefault,
          title: 'Distalização com cursor',
          description: 'Ancoragem em IZC',
          secondary_description: 'JAMAIS pensar em extração!'
        },
        {
          id: 6, // (IDs 3-3)
          image: imgDefault,
          title: 'Distalização e intrusão',
          description: 'Ancoragem em IZC',
          secondary_description: '(exo 2 prés COM PERDA de ancoragem)'
        },
        {
          id: 7, // (IDs 3-4)
          image: imgDefault,
          title: 'Cursor',
          description: 'Com ancoragem inferior',
          secondary_description: ''
        },
        {
          id: 8, // (IDs 3-5, 4-4, 5-3, 7-4)
          image: imgCirurgiaOrtognatica,
          title: 'Cirurgia ortognática',
          description: 'Protrator mandibular:',
          secondary_description: 'SOMENTE quando, após os dentes nivelados, o avanço da mandíbula NÃO abrir a mordida'
        },
        {
          id: 9, // (IDs 4-1)
          image: imgDefault,
          title: 'Distalização e/ou intrusão',
          description: 'Ancoragem em IZC',
          secondary_description: '(exo 2 prés SEM PERDA de ancoragem)'
        },
        {
          id: 10, // (IDs 4-3, 5-1)
          image: imgDefault,
          title: 'Protrator mandibular',
          description: '',
          secondary_description: ''
        },
        {
          id: 11, // (IDs 5-2, 8-5)
          image: imgCirurgiaOrtognatica,
          title: 'Cirurgia ortognática',
          description: '',
          secondary_description: ''
        },
        {
          id: 12, // (IDs 6-2)
          image: imgDefault,
          title: 'Distalização unilateral com cursor',
          description: 'Ancoragem em IZC ou inferior',
          secondary_description: ''
        },
        {
          id: 13, // (IDs 6-3)
          image: imgDefault,
          title: 'Distalização e intrusão unilateral com cursor',
          description: 'Angoragem em IZC',
          secondary_description: '(exo 1 pré - do lado da Classe II - COM PERDA de ancoragem)'
        },
        {
          id: 14, // (IDs 6-4)
          image: imgDefault,
          title: 'Distalização e intrusão unilateral',
          description: 'Ancoragem em IZC',
          secondary_description: '(exo 1 pré - do lado da Classe II - SEM PERDA de ancoragem)'
        },
        {
          id: 15, // (IDs 7-2)
          image: imgDefault,
          title: 'Distalização com cursor',
          description: 'Ancoragem inferior',
          secondary_description: ''
        },
        {
          id: 16, // (IDs 7-3)
          image: imgDefault,
          title: 'Protrator mandibular',
          description: 'Forças assimétricas',
          secondary_description: ''
        },
        {
          id: 17, // (IDs 7-5)
          image: imgDefault,
          title: 'Distalização e intrusão superior + Distalização inferior do lado da classe I',
          description: 'Ancoragem superior em IZC + Ancoragem inferior em Buccal Shelf',
          secondary_description: ''
        },
        {
          id: 18, // (IDs 8-1)
          image: imgMascaraFacial,
          title: 'Disjunção + Máscara Facial',
          description: '',
          secondary_description: ''
        },
        {
          id: 19, // (IDs 8-2)
          image: imgDefault,
          title: 'Elástico Classe III',
          description: '',
          secondary_description: ''
        },
        {
          id: 20, // (IDs 8-3)
          image: imgDefault,
          title: 'Elástico Classe III + Desgastes Interproximais (Inferior)',
          description: '',
          secondary_description: ''
        },
        {
          id: 21, // (IDs 8-4)
          image: imgDefault,
          title: 'Retração Inferor + Angoragem Absoluta Buccal Shelf',
          description: '',
          secondary_description: ''
        }
      ]
    };
  }
};
</script>
