<template>
    <v-tabs bg-color="deep-purple-darken-4" center-active fixed-tabs v-model="getCurrentTab">
        <!-- <v-tab @click="openPage('inicio')">
            <div class="pb-1">
                <v-icon>mdi-home</v-icon>
            </div>
        </v-tab> -->
        <v-tab @click="openPage('agenda')">
            <div class="pb-1">
                <v-icon class="mr-3 d-none d-md-block">mdi-calendar-month</v-icon>
            </div>
            <!-- <i class="fas fa-calendar-alt mr-3 pt-1 d-none d-md-block"></i> -->
            {{ $t('agenda') }}
        </v-tab>
        <v-tab @click="openPage('pacientes')" value="pacientes">
            <div class="pb-1">
                <v-icon class="mr-3 d-none d-md-block">mdi-account-details</v-icon>
            </div>
            Pacientes
        </v-tab>
        <v-tab @click="openPage('ortodontistas')">
            <div class="pb-1">
                <v-icon class="mr-3 d-none d-md-block">mdi-doctor</v-icon>
            </div>
            Ortodontistas
        </v-tab>
        <v-tab @click="openPage('financeiro')">
            <!-- <v-icon class="mr-3 d-none d-md-block">mdi-currency-usd</v-icon> -->
            <i class="fas fa-dollar-sign mr-3 pt-1 d-none d-md-block"></i>
            Financeiro
        </v-tab>
        <v-tab @click="openPage('configuracoes')">
            <!-- <v-icon class="mr-3 d-none d-md-block">mdi-currency-usd</v-icon> -->
            <i class="fas fa-cog pt-1" style="font-size: 12pt"></i>
        </v-tab>
    </v-tabs>
</template>

<script>

var tab = 0
import { useRoute } from 'vue-router';

export default {
    name: "tab-navigation",
    data() {
        return {
            tab
        }
    },
    methods: {
        openPage(page) {
            this.$router.push(`/${page}`)
        },
    },
    mounted() {
    },
    computed: {
        route: () => useRoute(),

        getCurrentTab() {
            let currentPathObject = this.$router.currentRoute.value.path.replace('/', '').split('/')[0]

            // var tabsMap = {
            //     '': 0,
            //     'inicio': 0,

            //     'agenda': 1,

            //     'paciente': 2,
            //     'pacientes': 2,

            //     'ortodontista': 3,
            //     'ortodontistas': 3,

            //     'financeiro': 4,
            // }

            var tabsMap = {
                '': 0,

                'agenda': 0,

                'paciente': 1,
                'pacientes': 1,

                'ortodontista': 2,
                'ortodontistas': 2,

                'financeiro': 3,
            }

            return tabsMap[currentPathObject]
        }
    }
}
</script>