<template>
    <div class="tratamento-content">
        <div class="row">

            <div class="col-md-12">
                <div class="box primary h-100">
                    <p class="custom-card-header">Diagnóstico<font-awesome-icon :icon="['fas', 'edit']"
                            class="ml-3 pointer" :class="{ 'active': isEditing['diagnostico'] }"
                            :title="isEditing['diagnostico'] ? 'Sair do modo de edição' : 'Editar o diagnóstico'"
                            @click="toggleEditMode('diagnostico')" /></p>

                    <div v-if="isEditing['diagnostico']" class="w-100 text-center mb-3">
                        <div class="p-vertical-divider"></div>
                        <button class="btn btn-sm btn-primary mt-3 mb-0 btn-edit"
                            title="Salvar as alterações realizadas">
                            Salvar
                        </button>
                    </div>

                    <p v-if="!isEditing['diagnostico']" class="text-justify py-2 px-4">
                        Apinhamentos dentários severos com má oclusão Classe II, divisão 1 de Angle e mordida aberta
                        anterior leve.
                    </p>
                    <textarea v-if="isEditing['diagnostico']" name="" id="" class="form-control"
                        rows="4">Apinhamentos dentários severos com má oclusão Classe II, divisão 1 de Angle e mordida aberta anterior leve.</textarea>
                </div>
            </div>

            <div class="col-12 mt-4">
                <div class="box primary">
                    <p class="custom-card-header">Protocolo de tratamento</p>
                    <div class="row border-between py-3">

                        <div class="col-6 pb-1 px-4 border-end text-center justify-content-center">
                            <p class="text-uppercase pb-2" style="font-weight: 600; font-size: 11pt;">Tratamento
                                recomendado:
                            </p>
                            <div class="card mx-2 mt-2 mx-auto" style="border: 1px solid #DDD; max-width: 250px;">
                                <div class="card-header p-0">
                                    <div class="option-image-container">
                                        <img :src="imgCirurgiaOrtognatica" class="card-img-top">
                                    </div>
                                    <div class="treatment-title p-2 bg-gradient-light">
                                        <h5 class="uppercase">Cirurgia ortognática</h5>
                                    </div>
                                </div>
                                <div class="card-body p-3">
                                    <p class="card-text p-0">
                                        <strong>Protrator mandibular:</strong>
                                        <br>
                                        <span style="font-size: 11pt;">SOMENTE quando, após os dentes nivelados, o
                                            avanço da mandíbula
                                            NÃO abrir a mordida</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="p-horizontal-divider mb-4"></div>
                            <p class="text-uppercase pb-2" style="font-weight: 600; font-size: 11pt;">Análise realizada:
                            </p>
                            <p class="text-justify my-0 pt-2 pb-2">
                                Através dos dados fornecidos na seção "<font-awesome-icon :icon="['fas', 'fa-search']"
                                    class="me-1 text-sm" /><span
                                    class="text-sm font-weight-bold uppercase">análise</span>", foi
                                possível designar um tratamento específico para o caso deste paciente.
                            </p>
                            <p class="text-justify my-0 py-1">
                                Se você tiver dúvidas sobre esta recomendação, <strong>você pode solicitar uma
                                    mentoria</strong> para este caso.
                            </p>
                            <div class="p-horizontal-divider m-3"></div>
                            <div class="w-100 text-center my-5">
                                <button class="btn btn-primary">Solicitar mentoria</button>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="p-horizontal-divider mt-4 mb-2"></div>
                            <p class="text-center my-0 py-2">
                                A recomendação da <strong class="text-sm uppercase">cirurgia ortognática</strong> como
                                tratamento
                                foi baseada nos seguintes fatores clínicos do paciente:
                            </p>
                            <div class="conditions-container">
                                <div class="condition">
                                    <div class="card mx-2 mt-0" style="border: 1px solid #DDD;">
                                        <div class="card-header p-0">
                                            <div class="option-image-container">
                                                <img :src="imgClasseII" class="card-img-top">
                                            </div>
                                        </div>
                                        <div class="card-body p-3">
                                            <p class="card-text p-0">
                                                <strong>Classe II:</strong>
                                                <br>
                                                <span style="font-size: 11pt;">Arco inferior distal ao normal em sua
                                                    relação para o arco
                                                    superior</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="condition">
                                    <div class="card mx-2 mt-0" style="border: 1px solid #DDD;">
                                        <div class="card-header p-0">
                                            <div class="option-image-container">
                                                <img :src="imgLinhaMediaSemDesvio" class="card-img-top">
                                            </div>
                                        </div>
                                        <div class="card-body p-3">
                                            <p class="card-text p-0">
                                                <strong>Desvio da linha média:</strong>
                                                <br>
                                                <span style="font-size: 11pt;">Sem desvio</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="condition">
                                    <div class="card mx-2 mt-0" style="border: 1px solid #DDD;">
                                        <div class="card-header p-0">
                                            <div class="option-image-container">
                                                <img :src="imgDefault" class="card-img-top">
                                            </div>
                                        </div>
                                        <div class="card-body p-3">
                                            <p class="card-text p-0">
                                                <strong>Tamanho do desvio classe II:</strong>
                                                <br>
                                                <span style="font-size: 11pt;">Grande (5mm/+)</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="condition">
                                    <div class="card mx-2 mt-0" style="border: 1px solid #DDD;">
                                        <div class="card-header p-0">
                                            <div class="option-image-container">
                                                <img :src="imgDefault" class="card-img-top">
                                            </div>
                                        </div>
                                        <div class="card-body p-3">
                                            <p class="card-text p-0">
                                                <strong>Protrusão maxilar e retrusão mandibular</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="condition">
                                    <div class="card mx-2 mt-0" style="border: 1px solid #DDD;">
                                        <div class="card-header p-0">
                                            <div class="option-image-container">
                                                <img :src="imgMesoBraqui" class="card-img-top">
                                            </div>
                                        </div>
                                        <div class="card-body p-3">
                                            <p class="card-text p-0">
                                                <strong>Biotipo facial:</strong>
                                                <br>
                                                <span style="font-size: 11pt;">Braqui / Meso</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-12 mt-4">
                <div class="box primary h-100">
                    <p class="custom-card-header">
                        Prognóstico
                        <font-awesome-icon :icon="['fas', 'edit']" class="ml-3 pointer"
                            :class="{ 'active': isEditing['prognostico'] }"
                            :title="isEditing['prognostico'] ? 'Sair do modo de edição' : 'Editar o prognóstico'"
                            @click="toggleEditMode('prognostico')" />
                    </p>
                    <div v-if="isEditing['prognostico']" class="w-100 text-center mb-3">
                        <div class="p-vertical-divider"></div>
                        <button class="btn btn-sm btn-primary mt-3 mb-0 btn-edit"
                            title="Salvar as alterações realizadas">
                            Salvar
                        </button>
                    </div>

                    <p v-if="!isEditing['prognostico']" class="text-justify py-2 px-4">
                        Favorável, com a expectativa de correção dos apinhamentos dentários e da má oclusão,
                        proporcionando ao paciente um sorriso esteticamente agradável e funcional.
                    </p>
                    <textarea v-if="isEditing['prognostico']" name="" id="" class="form-control"
                        rows="4">Favorável, com a expectativa de correção dos apinhamentos dentários e da má oclusão, proporcionando ao paciente um sorriso esteticamente agradável e funcional.</textarea>
                </div>
            </div>

        </div>
    </div>
</template>

<style>
.treatment-title {
    border-top: 1px solid #CCC;
    border-bottom: 1px solid #CCC;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 13pt;
    color: #333;
    text-shadow: 2px 0 #F0F0F0, -2px 0 #F0F0F0, 0 2px #F0F0F0, 0 -2px #F0F0F0,
        1px 1px #F0F0F0, -1px -1px #F0F0F0, 1px -1px #F0F0F0, -1px 1px #F0F0F0;
}

.conditions-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    grid-row-gap: 20px;
    margin-top: 1rem;
}

.condition {
    max-width: 190px;
    font-size: 8pt;
}

.condition .card {
    height: 100%;
}

.condition .card-header {
    border-bottom: 1px solid #EEE;
}

.condition .card-body {
    background: linear-gradient(to bottom, #FAFAFA, #F2F2F2);
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

import imgCirurgiaOrtognatica from "@/assets/img/protocolos/treatments/cirurgia-ortognatica.jpg"
import imgClasseII from "@/assets/img/protocolos/classe2.png";
import imgLinhaMediaSemDesvio from "@/assets/img/protocolos/linhamedia-sem-desvio.png"
import imgDefault from "@/assets/img/protocolos/default.png";
import imgMesoBraqui from "@/assets/img/protocolos/biotipo-meso-braqui.png"

var isEditing = []

export default {
    name: "Diagnostico",
    data() {
        return {
            imgCirurgiaOrtognatica,
            imgClasseII,
            imgLinhaMediaSemDesvio,
            imgDefault,
            imgMesoBraqui,
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