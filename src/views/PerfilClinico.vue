<template>

</template>

<script>
// import ProfileCard from "./components/ProfileCard.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";

const analise = {
    categorias: [
        ''
    ]
}

export default {
    name: "profile",
    data() {
        return {
        };
    },
    methods: {
    },
    components: {
    },

    mounted() {
    },
    beforeMount() {
        this.$store.state.imageLayout = "profile-overview";
        this.$store.state.showNavbar = false;
        this.$store.state.showFooter = true;
        this.$store.state.hideConfigButton = true;
        body.classList.add("profile-overview");
    },
    beforeUnmount() {
        this.$store.state.isAbsolute = false;
        this.$store.state.imageLayout = "default";
        this.$store.state.showNavbar = true;
        this.$store.state.showFooter = true;
        this.$store.state.hideConfigButton = false;
        body.classList.remove("profile-overview");
    }
};
</script>