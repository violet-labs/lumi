<template>
    <lumi-sidenav icon="mdi-cog" class="fixed-end lumi-sidenav" v-if="showSidenav">
        <sidenav-list-configuracoes :selectedTab="selectedTab" @changeTab="changeTab" />
    </lumi-sidenav>

    <div class="main-page-content">
        <div class="p-0 container-fluid">
            <div v-if="selectedTab == 'perfil'" class="row justify-content-center">
                <div class="col-lg-12 position-relative z-index-2 py-3" style="max-width: 600px;">
                    <div class="row justify-content-center">
                        <div class="col-12 form-group">
                            <label for="nome">Nome:</label>
                            <input type="text" id="nome" class="form-control">
                        </div>
                        <div class="col-sm-6 form-group mt-2">
                            <label for="especialidade">Especialidade:</label>
                            <input type="text" id="especialidade" class="form-control">
                        </div>
                        <div class="col-sm-6 form-group mt-2">
                            <label for="clinica">Clínica:</label>
                            <input type="text" id="clinica" class="form-control">
                        </div>
                        <div class="col-sm-6 form-group mt-2">
                            <label for="usuario" class="form-control-label">E-mail:</label>
                            <input type="email" id="usuario" class="form-control">
                        </div>
                        <div class="col-sm-6 form-group mt-2">
                            <label for="senha">Senha:</label>
                            <input type="password" id="senha" class="form-control">
                        </div>
                    </div>
                    <div class="w-100 text-center mt-3">
                        <button type="button" class="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </div>

            <div v-if="selectedTab == 'mentorias'" class="row mb-4">
                <div class="col-lg-12 position-relative z-index-2">
                    <EasyDataTable :headers="headers" :items="mentorias" @click-row="openPaciente"
                        body-row-class-name="clickable" header-item-class-name="table-header-item"
                        body-item-class-name="table-body-item">

                        <template #item-created_at="{ created_at }">
                            {{ $filters.dateTime(created_at) }}
                        </template>

                    </EasyDataTable>
                </div>
            </div>

        </div>
    </div>
</template>
<script>

import { mapMutations, mapState } from "vuex";

import LumiSidenav from "@/views/components/LumiSidenav/index.vue";
import SidenavListConfiguracoes from "@/views/components/LumiSidenav/SidenavListConfiguracoes.vue"

import { getMentorias } from "@/services/mentoriasService"

const headers = [
    { text: "SOLICITADA EM", value: "created_at", sortable: true },
    { text: "PACIENTE", value: "paciente.nome", sortable: true },
    { text: "SOLICITANTE", value: "solicitante.nome", sortable: true, align: 'center' },
    { text: "OBSERVAÇÕES", value: "observacao", sortable: true, align: 'center' },
];

export default {
    name: "configuracoes",
    data() {
        return {
            headers,
            mentorias: [],
            selectedTab: 'perfil',
        };
    },
    components: {
        LumiSidenav,
        SidenavListConfiguracoes,
    },
    methods: {
        openPaciente(mentoria) {
            this.$router.push({
                name: "Paciente",
                params: {
                    id: mentoria.paciente_id
                }
            });
        },
        changeTab(tab) {
            this.selectedTab = tab;
            console.log('this.selectedTab:', this.selectedTab)
            this.$emit('changeTab', tab);
        },
    },
    computed: {
        ...mapState([
            "isRTL",
            "color",
            "isAbsolute",
            "isNavFixed",
            "navbarFixed",
            "absolute",
            "showSidenav",
            "showNavbar",
            "showFooter",
            "showConfig",
            "hideConfigButton",
        ]),
    },
    async created() {
        this.mentorias = await getMentorias()
    },
};
</script>