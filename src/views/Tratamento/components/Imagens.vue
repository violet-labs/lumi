<template>
    <div class="tratamento-content">
        <div class="row border-between">
            <div class="col-md-6 border-end">
                <div class="section-header">
                    <font-awesome-icon :icon="['fas', 'x-ray']" />
                    Radiografias
                    <div class="p-horizontal-divider"></div>
                    <div class="radiografias-container w-100">
                        <div class="row">
                            <div class="col-md-12">
                                <v-table>
                                    <tbody>
                                        <tr>
                                            <td class="bg-gradient-light text-dark text-center"
                                                style="border-radius: 3px; padding: 2px 20px;">
                                                Ainda não há radiografias.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center pt-3">
                                                
                                                <div v-if="!pendingXrayUpload">
                                                    <input id="xrayFileInput" type="file" accept="image/*"
                                                        @change=setXrayPreview hidden>

                                                    <button class="btn bg-gradient-primary" @click="chooseXrayFile()">
                                                        Adicionar
                                                    </button>
                                                </div>

                                                <div v-if="pendingXrayUpload" class="d-flex flex-column align-center">
                                                    <img :src="xrayPreviewImage" class="image-preview" />

                                                    <div class="l-input-group mt-3">
                                                        <span>Data:</span>
                                                        <input type="date" class="form-control input-sm"
                                                            v-model="xrayDate" />
                                                    </div>

                                                    <div class="l-input-group mt-3 w-100">
                                                        <span>Descrição:</span>
                                                        <input type="text" ref="xrayDescriptionInput"
                                                            class="form-control input-sm" v-model="xrayDescription" />
                                                    </div>

                                                    <div class="d-flex flex-row justify-center mt-3" style="gap: 10px;">
                                                        <button class="btn btn-sm btn-danger"
                                                            @click="cancelXrayUpload()">
                                                            Cancelar
                                                        </button>
                                                        <button class="btn btn-sm btn-primary"
                                                            @click="confirmXrayUpload()">
                                                            Salvar
                                                        </button>
                                                    </div>
                                                </div>

                                            </td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-horizontal-divider d-block d-md-none"></div>
            <div class="col-md-6">
                <div class="section-header">
                    <font-awesome-icon :icon="['fas', 'camera']" />
                    Fotos
                    <div class="p-horizontal-divider"></div>
                    <div class="fotos-container w-100">
                        <div class="row">
                            <div class="col-md-12">
                                <v-table>
                                    <tbody>
                                        <tr>
                                            <td class="bg-gradient-light text-dark text-center"
                                                style="border-radius: 3px; padding: 2px 20px;">
                                                Ainda não há fotos.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center pt-3">

                                                <div v-if="!pendingPhotoUpload">
                                                    <input id="photoFileInput" type="file" accept="image/*"
                                                        @change=setPhotoPreview hidden>

                                                    <button class="btn bg-gradient-primary" @click="choosePhotoFile()">
                                                        Adicionar
                                                    </button>
                                                </div>

                                                <div v-if="pendingPhotoUpload" class="d-flex flex-column align-center">
                                                    <img :src="photoPreviewImage" class="image-preview" />

                                                    <div class="l-input-group mt-3">
                                                        <span>Data:</span>
                                                        <input type="date" class="form-control input-sm"
                                                            v-model="photoDate" />
                                                    </div>

                                                    <div class="l-input-group mt-3 w-100">
                                                        <span>Descrição:</span>
                                                        <input type="text" ref="photoDescriptionInput"
                                                            class="form-control input-sm" v-model="photoDescription" />
                                                    </div>

                                                    <div class="d-flex flex-row justify-center mt-3" style="gap: 10px;">
                                                        <button class="btn btn-sm btn-danger"
                                                            @click="cancelPhotoUpload()">
                                                            Cancelar
                                                        </button>
                                                        <button class="btn btn-sm btn-primary"
                                                            @click="confirmPhotoUpload()">
                                                            Salvar
                                                        </button>
                                                    </div>
                                                </div>

                                            </td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.image-preview {
    border: 2px solid #AAA;
    border-radius: 5px;
    width: 150px !important;
    height: 150px !important;
}
</style>

<script>
import { uploadImage } from "@/services/pacientesService"

let pendingPhotoFile = null
let pendingXrayFile = null

export default {
    name: "Imagens",
    data() {
        return {
            photoPreviewImage: null,
            pendingPhotoUpload: false,
            photoDescription: '',
            photoDate: new Date().toISOString().slice(0, 10),
            xrayPreviewImage: null,
            pendingXrayUpload: false,
            xrayDescription: '',
            xrayDate: new Date().toISOString().slice(0, 10)
        }
    },
    methods: {
        cancelPhotoUpload() {
            this.pendingPhotoUpload = false
            this.pendingPhotoFile = null
            this.photoPreviewImage = null
        },

        choosePhotoFile() {
            document.getElementById('photoFileInput').click()
        },

        async confirmPhotoUpload() {
            const response = await uploadImage(this.pendingPhotoFile, 'photo', this.photoDate, this.photoDescription)
        },

        setPhotoPreview(e) {
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                this.photoPreviewImage = e.target.result
                this.pendingPhotoUpload = true
                this.pendingPhotoFile = image
                this.$nextTick(() => {
                    this.$refs.photoDescriptionInput.focus()
                });
            };
        },

        cancelXrayUpload() {
            this.pendingXrayUpload = false
            this.pendingXrayFile = null
            this.xrayPreviewImage = null
        },

        chooseXrayFile() {
            document.getElementById('xrayFileInput').click()
        },

        async confirmXrayUpload() {
            const response = await uploadImage(this.pendingXrayFile, 'xray', this.xrayDate, this.xrayDescription)
        },

        setXrayPreview(e) {
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                this.xrayPreviewImage = e.target.result
                this.pendingXrayUpload = true
                this.pendingXrayFile = image
                this.$nextTick(() => {
                    this.$refs.xrayDescriptionInput.focus()
                });
            };
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