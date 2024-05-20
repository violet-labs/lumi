T<template>
    <div class="card">
        <div class="card-header pb-0">
            <h6>Pacientes</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                    <thead>
                        <tr>
                            <th class="text-uppercase text-start text-secondary text-xxs font-weight-bolder opacity-7">
                                Paciente</th>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                Diagnóstico/tratamento</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Status do
                                tratamento</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Localidade
                            </th>
                            <th class="text-secondary opacity-7"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="treatment in treatments" :key="treatment.id" class="paciente-item"
                            @click="openPaciente(treatment)">
                            <td>
                                <div class="d-flex px-2 py-1">
                                    <div>
                                        <img src="../../assets/img/team-2.jpg" class="avatar avatar-sm me-3"
                                            alt="user1" />
                                    </div>
                                    <div class="d-flex flex-column justify-content-center">
                                        <h6 class="mb-0 text-sm">{{ treatment.name }}</h6>
                                        <p class="text-xs text-secondary mb-0">{{ treatment.email }}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p class="text-xs font-weight-bold mb-0">{{ treatment.diagnosis }}</p>
                                <p class="text-xs text-secondary mb-0">{{ treatment.recommended_treatment }}</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <span class="badge badge-sm" :class="statusClass(treatment.status)">{{
                                    statusText(treatment.status)
                                }}</span>
                                
                                <div class="d-flex flex-column align-items-center justify-content-center mt-2" v-if="treatment.status === 'ONGOING'">
                                    <div>
                                        <div class="progress">
                                            <div class="progress-bar bg-gradient-success" role="progressbar"
                                                aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                                                style="width: 100%"></div>
                                        </div>
                                    </div>
                                    <span class="me-2 text-xs font-weight-bold">100%</span>
                                </div>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">{{ treatment.place }}</span>
                            </td>
                            <td class="align-middle">
                                <a href="javascript:;" class="text-secondary font-weight-bold text-xs"
                                    data-toggle="tooltip" data-original-title="Editar user">
                                    <!-- Editar -->
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style>
.paciente-item {}

.paciente-item:hover {
    background: rgba(0, 0, 0, 0.05);
    cursor: pointer;
}
</style>

<script>
var selectedItem = {
    name: null,
    email: null
};

var modal = null

export default {
    name: "TreatmentsTable",
    props: {
        treatments: Array
    },
    data() {
        return {
            selectedItem
        }
    },
    mounted() {
    },
    methods: {
        openPaciente(paciente) {
            console.log('paciente:', paciente)
            console.log('paciente.name:', paciente.name)
            this.$router.push({
                name: "Profile",
                params: { paciente: JSON.stringify(paciente) }
            });
        },
        closeModal() {
            modal.hide();
        },
        statusClass(status) {
            const classMap = {
                'NOT STARTED': 'bg-gradient-warning',
                'COMPLETED': 'bg-gradient-success',
                'ONGOING': 'bg-gradient-secondary',
            };

            return classMap[status] || '';
        },
        statusText(status) {
            const textMap = {
                'NOT STARTED': 'NÃO INICIADO',
                'COMPLETED': 'CONCLUÍDO',
                'ONGOING': 'EM ANDAMENTO',
            };

            return textMap[status] || '';
        }
    },
};
</script>