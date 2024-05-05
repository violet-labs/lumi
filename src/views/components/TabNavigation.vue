<template>
    <v-tabs bg-color="deep-purple-darken-4" center-active fixed-tabs>
        <v-tab>
            <v-icon class="mr-3" v-if="!isMobile()">mdi-calendar-month</v-icon>
            Agenda
        </v-tab>
        <v-tab>
            <v-icon class="mr-3" v-if="!isMobile()">mdi-tooth</v-icon>
            Tratamentos
        </v-tab>
        <v-tab>
            <v-icon class="mr-3" v-if="!isMobile()">mdi-currency-usd</v-icon>
            Financeiro
        </v-tab>
    </v-tabs>
</template>

<script>
export default {
    name: "tab-navigation",
    methods: {
        isMobile() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true
            } else {
                return false
            }
        }
    }
}
</script>