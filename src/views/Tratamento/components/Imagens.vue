<template>
    <div class="tratamento-content">
        <div class="row border-between">
            <div class="col-md-6 border-end">
                <div class="section-header">
                    <font-awesome-icon :icon="['fas', 'x-ray']" />
                    Radiografias
                    <div class="p-horizontal-divider mb-0"></div>
                    <div class="radiografias-container w-100">

                        <div v-if="xrays.length > 0" class="row">
                            <div class="col-12 images-container"
                                v-viewer="{ title: [1, (image, imageData) => `${image.alt}`] }">

                                <div v-for="xray in xrays" :key="xray.url">
                                    <img :src="xray.url" :alt="getImageDescription(xray)">
                                </div>

                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <v-table>
                                    <tbody>
                                        <tr v-if="xrays.length == 0">
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
                    <div class="p-horizontal-divider mb-0"></div>
                    <div class="fotos-container w-100">

                        <div v-if="photos.length > 0" class="row">
                            <div class="col-12 images-container"
                                v-viewer="{ title: [1, (image, imageData) => `${image.alt}`] }">

                                <div v-for="photo in photos" :key="photo.url">
                                    <img :src="photo.url" :alt="getImageDescription(photo)">
                                </div>

                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <v-table>
                                    <tbody>
                                        <tr v-if="photos.length == 0">
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


.images-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 10px 0px;
    background: #F2F2F2;
    border-width: 0px 1px 0px 1px;
    border-style: solid;
    border-color: #e2e2e2;
    gap: 10px;
}

.images-container>div {
    background: #000;
    border: 2px solid #666;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 3px;
    height: 100%;
}

.images-container img {
    max-width: 120px;
    max-height: 90px;
}

.images-container>div:hover {
    filter: brightness(90%);
}
</style>

<script>
import { uploadImage } from "@/services/imagensService"
import cSwal from "@/utils/cSwal.js"
import { getImageDescription } from "@/utils"

export default {
    name: "Imagens",
    props: {
        paciente: {
            type: Object,
            default: () => { return {} },
        },
    },
    data() {
        return {
            photoPreviewImage: null,
            pendingPhotoFile: null,
            pendingPhotoUpload: false,
            photoDescription: '',
            photoDate: new Date().toISOString().slice(0, 10),
            xrayPreviewImage: null,
            pendingXrayUpload: false,
            xrayDescription: '',
            xrayDate: new Date().toISOString().slice(0, 10)
        }
    },
    computed: {
        xrays() {
            return this.paciente.imagens.filter(imagem => imagem.dir === 'xray');
        },
        photos() {
            return this.paciente.imagens.filter(imagem => imagem.dir === 'photo');
        }
    },
    methods: {
        getImageDescription,

        cancelPhotoUpload() {
            this.pendingPhotoUpload = false
            this.pendingPhotoFile = null
            this.photoPreviewImage = null
            this.photoDescription = '';
        },

        choosePhotoFile() {
            document.getElementById('photoFileInput').value = ''
            document.getElementById('photoFileInput').click()
        },

        async confirmPhotoUpload() {
            const imgData = {
                paciente_id: this.paciente.id,
                imagem: this.pendingPhotoFile,
                dir: 'photo',
                data: this.photoDate,
                descricao: this.photoDescription,
            }
            cSwal.loading('Adicionando foto...')
            const upload = await uploadImage(imgData)
            cSwal.loaded()

            if (upload) {
                cSwal.cSuccess('A foto foi adicionada.')
                this.cancelPhotoUpload()
                this.$emit('pacienteChange')
            }
            else {
                cSwal.cError('Ocorreu um erro ao adicionar a radiografia.')
            }
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
            this.xrayDescription = '';
        },

        chooseXrayFile() {
            document.getElementById('xrayFileInput').value = ''
            document.getElementById('xrayFileInput').click()
        },

        async confirmXrayUpload() {
            const imgData = {
                paciente_id: this.paciente.id,
                imagem: this.pendingXrayFile,
                dir: 'xray',
                data: this.xrayDate,
                descricao: this.xrayDescription,
            }
            cSwal.loading('Adicionando radiografia...')
            const upload = await uploadImage(imgData)
            cSwal.loaded()

            if (upload) {
                cSwal.cSuccess('A radiografia foi adicionada.')
                this.cancelXrayUpload()
                this.$emit('pacienteChange')
            }
            else {
                cSwal.cError('Ocorreu um erro ao adicionar a radiografia.')
            }
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