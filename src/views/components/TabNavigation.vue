<template>
    <v-tabs bg-color="deep-purple-darken-4" center-active fixed-tabs>
        <v-tab>
            <v-icon class="mr-3">mdi-calendar-month</v-icon>
            Agenda
        </v-tab>
        <v-tab>
            <v-icon class="mr-3">mdi-tooth</v-icon>
            Tratamentos
        </v-tab>
        <v-tab>
            <v-icon class="mr-3">mdi-currency-usd</v-icon>
            Financeiro
        </v-tab>
    </v-tabs>
</template>

<script>
export default {
    name: "tab-navigation"
}
</script>