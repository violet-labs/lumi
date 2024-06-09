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
                                                <button class="btn bg-gradient-primary">
                                                    Adicionar
                                                </button>
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
                                                <input type="file" accept="image/*"
                                                    @change="uploadImage($event, 'radiografia')" id="file-input">

                                                <button class="btn bg-gradient-primary">
                                                    Adicionar
                                                </button>

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

<style></style>

<script>
import { uploadImage } from "@/services/pacientesService"

export default {
    name: "Imagens",
    data() {
        return {
        }
    },
    methods: {
        uploadImage,
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