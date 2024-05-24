T<template>
    <div class="card">
        <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                    <thead>
                        <tr>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-start">
                                Dentista</th>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                Especialidades</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Status</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Localidade</th>
                            <th class="text-secondary opacity-7"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="dentist in dentists" :key="dentist.id">
                            <td>
                                <div class="d-flex px-2 py-1">
                                    <div>
                                        <img src="../../assets/img/team-2.jpg" class="avatar avatar-sm me-3"
                                            alt="user1" />
                                    </div>
                                    <div class="d-flex flex-column justify-content-center">
                                        <h6 class="mb-0 text-sm">{{ dentist.name }}</h6>
                                        <p class="text-xs text-secondary mb-0">{{ dentist.email }}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p class="text-xs font-weight-bold mb-0">{{ dentist.diagnosis }}</p>
                                <p class="text-xs text-secondary mb-0">{{ dentist.recommended_dentist }}</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <span class="badge badge-sm" :class="statusClass(dentist.status)">{{
                                    statusText(dentist.status) }}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">{{ dentist.place }}</span>
                            </td>
                            <td class="align-middle">
                                <a href="javascript:;" class="text-secondary font-weight-bold text-xs"
                                    data-toggle="tooltip" data-original-title="Editar user">Editar</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DentistsTable",
    props: {
        dentists: Array
    },
    methods: {
        statusClass(status) {
            const classMap = {
                'NOT STARTED': 'bg-gradient-warning',
                'COMPLETED': 'bg-gradient-success',
                'ATIVO': 'bg-gradient-success',
                'ONGOING': 'bg-gradient-secondary',
            };

            return classMap[status] || '';
        },
        statusText(status) {
            const textMap = {
                'NOT STARTED': 'NÃO INICIADO',
                'COMPLETED': 'CONCLUÍDO',
                'ATIVO': 'ATIVO',
                'ONGOING': 'EM ANDAMENTO',
            };

            return textMap[status] || '';
        }
    },
};
</script>