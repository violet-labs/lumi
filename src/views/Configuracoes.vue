<template>
    <lumi-sidenav icon="mdi-doctor" class="fixed-end lumi-sidenav" v-if="showSidenav">
        <sidenav-list-configuracoes />
    </lumi-sidenav>

    <div class="main-page-content">
        <div class="py-4 container-fluid">
            <div class="row mb-4">
                <div class="col-lg-12 position-relative z-index-2">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { mapMutations, mapState } from "vuex";

import LumiSidenav from "@/views/components/LumiSidenav/index.vue";
import SidenavListConfiguracoes from "@/views/components/LumiSidenav/SidenavListConfiguracoes.vue"

export default {
    name: "configuracoes",
    data() {
        return {
        };
    },
    components: {
        LumiSidenav,
        SidenavListConfiguracoes,
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
};
</script>