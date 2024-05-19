<template>
    <v-tabs bg-color="deep-purple-darken-4" center-active fixed-tabs v-model="getCurrentTab">
        <v-tab @click="openPage('inicio')">
            <v-icon>mdi-home</v-icon>
        </v-tab>
        <v-tab @click="openPage('agenda')">
            <v-icon class="mr-3 d-none d-md-block">mdi-calendar-month</v-icon>
            {{$t('agenda')}}
        </v-tab>
        <v-tab @click="openPage('pacientes')" value="pacientes">
            <v-icon class="mr-3 d-none d-md-block">mdi-account-details</v-icon>
            Pacientes
        </v-tab>
        <v-tab @click="openPage('dentistas')">
            <v-icon class="mr-3 d-none d-md-block">mdi-doctor</v-icon>
            Dentistas
        </v-tab>
        <v-tab @click="openPage('financeiro')">
            <v-icon class="mr-3 d-none d-md-block">mdi-currency-usd</v-icon>
            Financeiro
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
            let currentPathObject = this.$router.currentRoute.value.path.replace('/', '')

            var tabsMap = {
                '': 0,
                'inicio': 0,
                'agenda': 1,
                'pacientes': 2,
                'dentistas': 3,
                'financeiro': 4,
            }

            return tabsMap[currentPathObject]
        }
    }
}
</script>