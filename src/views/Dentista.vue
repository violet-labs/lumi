<template>
  <div class="page-width-container">
    <main class="page-width">
      <div class="container-fluid p-0">
        <div class="card no-shadow">
          <div class="card-body p-3">
            <div class="row gx-4">
              <div class="col-auto">
                <div class="avatar avatar-xl position-relative">
                  <div class="shadow-sm border-radius-lg d-flex align-center justify-content-center px-2 pb-3"
                    style="border: 2px solid #deeaf2; font-size: 25pt;color: #5988A8;">
                    <v-icon class="d-none d-md-block">mdi-doctor</v-icon>
                  </div>
                </div>
              </div>
              <div class="col-auto my-auto">
                <div class="h-100">
                  <h5 class="mb-1 fs-4">{{ dentista.nome }}</h5>
                  <p class="mb-0 font-weight-bold">{{ dentista.clinica.nome_fantasia }}</p>
                </div>
              </div>
              <div class="mx-auto mt-3 col-md-6 my-sm-auto ms-sm-auto me-sm-0">
                <div class="nav-wrapper position-relative end-0">
                  <ul class="p-1 bg-transparent nav nav-pills nav-fill" role="tablist">
                    <li class="nav-item" @click="openTab('detalhes')">
                      <a class="px-0 py-1 mb-0 nav-link nav-tab active" data-bs-toggle="tab" href="javascript:;"
                        role="tab" aria-selected="true">
                        <i class="fas fa-list"></i>
                        <br>
                        <span class="ms-1">Detalhes</span>
                      </a>
                    </li>
                    <li class="nav-item" @click="openTab('pacientes')">
                      <a class="px-0 py-1 mb-0 nav-link nav-tab" data-bs-toggle="tab" href="javascript:;" role="tab"
                        aria-selected="false">
                        <i class="fas fa-user"></i>
                        <br>
                        <span class="ms-1">Pacientes</span>
                      </a>
                    </li>
                    <li class="nav-item" @click="openTab('consultas')">
                      <a class="px-0 py-1 mb-0 nav-link nav-tab" data-bs-toggle="tab" href="javascript:;" role="tab"
                        aria-selected="false">
                        <i class="fas fa-calendar-alt"></i>
                        <br>
                        <span class="ms-1">Consultas</span>
                      </a>
                    </li>
                    <!-- <li class="nav-item" @click="openTab('financeiro')">
                      <a class="px-0 py-1 mb-0 nav-link nav-tab" data-bs-toggle="tab" href="javascript:;" role="tab"
                        aria-selected="false">
                        <i class="fas fa-dollar-sign"></i>
                        <br>
                        <span class="ms-1">Financeiro</span>
                      </a>
                    </li> -->
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transition>
        <div class="p-0 container-fluid" v-if="activeTab == 'detalhes'">
          <div class="row">
            <div class="col-md-12">
              <Transition>
                <div class="main-container" v-if="activeProfileTab == 'perfilPessoal'">
                  <div class="row p-3 pt-1 pb-4 w-100 mx-auto">
                    <div class="col-md-6 border-end pe-4">
                      <p class="text-uppercase text-sm mt-3" style="font-weight: 600">Informações pessoais</p>
                      <div class="row mt-4">
                        <div class="col-md-6 mb-2">
                          <label for="dentista_clinica" class="form-control-label">Clínica</label>
                          <select class="form-select" id="dentista_clinica" v-model="dentista.clinica.id">
                            <option hidden>Selecionar...</option>
                            <option v-for="clinica in clinicas" :key="clinica.id" :value="clinica.id">{{ clinica.nome }}</option>
                          </select>
                        </div>

                        <div class="col-sm-6 col-md-3 mb-2 text-center">
                          <MaterialInput readonly class="text-center" label="Pacientes" type="text"
                            :modelValue="dentista.pacientes_count" />
                        </div>

                        <div class="col-sm-6 col-md-3 mb-2 text-center">
                          <MaterialInput readonly class="text-center" label="Consultas" type="text"
                            :modelValue="dentista.consultas_count" />
                        </div>

                        <div class="col-md-6 mb-2">
                          <MaterialInput type="email" label="E-mail" v-model="dentista.user.email" id="dentista_rg" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <MaterialInput label="Nova senha" type="password" v-model="dentista.novaSenha"
                            placeholder="********" id="dentista_cpf" />
                        </div>
                      </div>

                      <p class="text-uppercase text-sm mt-3" style="font-weight: 600"><label
                          for="dentista_observacoes">Observações</label></p>
                      <textarea class="form-control" id="dentista_observacoes" rows="5" v-model="dentista.observacoes">
                      </textarea>
                    </div>
                    <div class="col-md-6 ps-4">

                      <hr class="horizontal dark" />
                      <p class="text-uppercase text-sm mt-3 mb-2" style="font-weight: 600">Meios de
                        contato<font-awesome-icon :icon="['fas', 'edit']" class="ms-2 pointer"
                          title="Gerenciar meios de contato" @click="toggleEditMode('meiosContatos')" />
                        <span v-if="isEditing.meiosContatos" class="text-capitalize text-info pointer ms-2"
                          @click="toggleEditMode('meiosContatos')"><u>Cancelar edição</u></span>
                      </p>
                      <v-table style="font-size: 12pt;" class="contains-dropdown">
                        <thead>
                          <tr>
                            <th><label>Contato</label></th>
                            <th style="width: 50%;"><label>Descrição</label></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="contato in dentista.contatos" v-bind:key="contato.id">
                            <td>
                              <a :href="getContatoHref(contato.tipo, contato.contato)" class="hoverable">
                                <span class="d-inline-block text-center" style="width: 30px;">

                                  <font-awesome-icon v-if="contato.tipo != 'telefone'"
                                    :icon="getContatoIcon(contato.tipo)" class="me-2"
                                    :class="{ 'text-success': contato.tipo == 'whatsapp', 'fs-14': contato.tipo == 'email', 'fs-15': contato.tipo != 'email' }" />

                                  <v-icon v-if="contato.tipo == 'telefone'" class="me-2" style="font-size: 17pt;">{{
                                    getContatoIcon(contato.tipo) }}</v-icon>

                                </span>
                                {{ contato.contato }}
                              </a>
                            </td>
                            <td>{{ contato.descricao }}</td>
                            <td>
                              <button v-if="isEditing.meiosContatos" class="btn btn-vsm btn-sm btn-danger"
                                @click="excluirContato(contato.id, contato.tipo)">
                                <font-awesome-icon :icon="['fas', 'trash']" />
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td style="vertical-align: middle;">
                              <div class="d-flex flex-row align-center">
                                <div class="dropdown text-center dropup">
                                  <span data-bs-toggle="dropdown" class="pointer dropdown-toggle">
                                    <font-awesome-icon v-if="novoContato.tipo == 'email'" :icon="['fas', 'envelope']"
                                      style="font-size: 15pt; margin-right: 3px;" />
                                    <v-icon v-if="novoContato.tipo == 'telefone'"
                                      style="font-size: 17pt;">mdi-phone</v-icon>
                                    <font-awesome-icon v-if="novoContato.tipo == 'celular'"
                                      :icon="['fas', 'mobile-screen-button']"
                                      style="font-size: 15pt; margin-right: 3px;" />
                                    <font-awesome-icon v-if="novoContato.tipo == 'whatsapp'" :icon="['fab', 'whatsapp']"
                                      class="text-success" style="font-size: 15pt;" />
                                  </span>
                                  <ul class="dropdown-menu dropdown-menu-icons hidden">
                                    <li title="E-mail" @click="selectMeioContato('email')">
                                      <a class="dropdown-item dropdown-item-sm" href="#">
                                        <font-awesome-icon icon="fa-solid fa-envelope" style="font-size: 14pt;" />
                                      </a>
                                    </li>
                                    <li title="Telefone" @click="selectMeioContato('telefone')">
                                      <a class="dropdown-item dropdown-item-sm" href="#">
                                        <v-icon style="font-size: 17pt;">mdi-phone</v-icon>
                                      </a>
                                    </li>
                                    <li title="Celular" @click="selectMeioContato('celular')">
                                      <a class="dropdown-item dropdown-item-sm" href="#">
                                        <font-awesome-icon :icon="['fas', 'mobile-screen-button']"
                                          style="font-size: 15pt; margin-right: 3px;" />
                                      </a>
                                    </li>
                                    <li title="WhatsApp" @click="selectMeioContato('whatsapp')">
                                      <a class="dropdown-item" href="#">
                                        <font-awesome-icon :icon="['fab', 'whatsapp']" class="text-success"
                                          style="font-size: 15pt;" />
                                      </a>
                                    </li>
                                  </ul>
                                </div>

                                <MaterialInput type="text" class="form-control input-sm"
                                  :placeholder="getContatoPlaceholder"
                                  style="display: inline-block; width: calc(100% - 30px);" v-model="novoContato.contato"
                                  ref="contatoInput" :mask="novoContatoMask" :input="contatoChange" />

                              </div>
                            </td>
                            <td style="vertical-align: middle; padding-top: 5px;">

                              <MaterialInput type="text" class="form-control input-sm" placeholder="Descrição"
                                style="display: inline; width: calc(100% - 51px);" ref="contatoDescricaoInput"
                                v-model="novoContato.descricao" />
                              <button class="btn btn-sm btn-primary mt-2" style="width: 46px; margin-left: 5px;"
                                @click="adicionarContato">
                                <font-awesome-icon :icon="['fas', 'plus']" />
                              </button>

                            </td>
                            <td></td>
                          </tr>
                        </tbody>
                      </v-table>

                      <div class="p-horizontal-divider"></div>

                      <p class="text-uppercase text-sm mt-3" style="font-weight: 600">Endereço</p>
                      <div class="row">
                        <div class="col-md-4 mb-2">
                          <MaterialInput label="CEP" type="text" v-model="dentista.endereco_cep" :input="getEndereco"
                            mask="#####-###" id="dentista_enderecoCep" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <MaterialInput label="Logradouro" type="text" v-model="dentista.endereco_logradouro"
                            id="dentista_enderecoLogradouro" />
                        </div>
                        <div class="col-md-2 mb-2">
                          <MaterialInput label="Nº" type="text" v-model="dentista.endereco_numero"
                            id="dentista_enderecoNumero" ref="endereco_numero" />
                        </div>
                        <div class="col-md-4">
                          <MaterialInput label="Complemento" type="text" v-model="dentista.endereco_complemento"
                            id="dentista_enderecoComplemento" />
                        </div>
                        <div class="col-md-4">
                          <MaterialInput label="Cidade" type="text" v-model="dentista.endereco_cidade"
                            id="dentista_enderecoCidade" />
                        </div>
                        <div class="col-md-4">
                          <MaterialInput label="Estado" type="text" v-model="dentista.endereco_estado"
                            id="dentista_enderecoEstado" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Transition name="fadeHeight">
                    <div v-cloak v-if="hasPendingChanges" class="row col-12">
                      <div class="p-horizontal-divider my-0"></div>
                      <div class="w-100 py-3 text-center">
                        <button class="btn btn btn-primary m-0" @click="confirmSaveDentista">
                          Salvar alterações
                        </button>
                      </div>
                    </div>
                  </Transition>

                </div>
              </Transition>
              <Transition>
                <div v-if="activeProfileTab == 'perfilClinico'">
                </div>
              </Transition>
            </div>
            <!-- <div class="col-md-4">
          <profile-card />
        </div> -->
          </div>
        </div>
      </Transition>

      <Transition>
        <div class="py-4 container-fluid" v-if="activeTab == 'pacientes'">
          <div class="row">
            <v-table>
                <tbody>
                  <tr>
                    <td class="bg-gradient-light text-dark text-center" style="border-radius: 3px; padding: 2px 20px;">
                      Este ortodontista ainda não cadastrou pacientes.
                    </td>
                  </tr>
                </tbody>
              </v-table>
          </div>
        </div>
      </Transition>

      <Transition>
        <div class="py-4 container-fluid" v-if="activeTab == 'consultas'">

          <div class="row">
            <div class="col-sm-6 col-md-3 text-center">
              <MaterialInput label="Consultas realizadas" readonly centered type="text"
                :modelValue="dentista.consultas_realizadas ? dentista.consultas_realizadas : 0"
                id="dentista_proximaConsulta" />
            </div>
            <div class="col-sm-6 col-md-3 text-center">
              <MaterialInput label="Primeira consulta" readonly centered type="text"
                :modelValue="$filters.dateDmy(dentista.primeira_consulta)" id="dentista_primeiraConsulta" />
              <span>
                {{ $filters.howMuchTime(dentista.primeira_consulta) }}
              </span>
            </div>
            <div class="col-sm-6 col-md-3 text-center">
              <MaterialInput label="Última consulta" readonly centered type="text"
                :modelValue="$filters.dateDmy(dentista.ultima_consulta)" id="dentista_ultimaConsulta" />
              <span>
                {{ $filters.howMuchTime(dentista.ultima_consulta) }}
              </span>
            </div>
            <div class="col-sm-6 col-md-3 text-center">
              <MaterialInput label="Próxima consulta" readonly centered type="text"
                :modelValue="$filters.dateDmy(dentista.proxima_consulta)" id="dentista_proximaConsulta" />
              <span class="text-success" style="font-weight: 500;">
                {{ $filters.howMuchTime(dentista.proxima_consulta) }}
              </span>
            </div>
          </div>

          <div class="p-horizontal-divider"></div>

          <div class="row">
            <div class="col-md-12">
              <v-table>
                <tbody>
                  <tr>
                    <td class="bg-gradient-light text-dark text-center" style="border-radius: 3px; padding: 2px 20px;">
                      Ainda não foram agendadas consultas.
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
            <!-- <div class="col-md-4">
          <profile-card />
        </div> -->
          </div>
        </div>
      </Transition>

      <Transition>
        <div class="py-4 container-fluid" v-if="activeTab == 'financeiro'">
          <div class="row">
            <div class="col-md-12">
              <v-table>
                <tbody>
                  <tr>
                    <td class="bg-gradient-success text-light text-center"
                      style="border-radius: 3px; padding: 2px 20px;">
                      Não há pendências financeiras.
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
            <!-- <div class="col-md-4">
          <profile-card />
        </div> -->
          </div>
        </div>
      </Transition>
    </main>
  </div>
</template>

<script>
import { phoneMask } from "@/utils.js";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
// import ProfileCard from "./components/ProfileCard.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import Tratamento from "@/views/Tratamento.vue"
import { getEnderecoByCep } from "@/services/commonService"
import { getDentista, updateDentista, adicionarMeioContato, excluirMeioContato } from "@/services/dentistasService"
import { getClinicas } from "@/services/clinicasService"
import cSwal from "@/utils/cSwal.js"

var isEditing = []

var dentista = {
  pacientes_count: '-',
  consultas_count: '-',
  user: {
    email: '',
  },
  clinica: {
    nome_fantasia: '',
  },
}

var originalDentista = {
  pacientes_count: '-',
  consultas_count: '-',
  user: {
    email: '',
  },
  clinica: {
    nome_fantasia: '',
  },
}

var showTratamento = false;

var activeProfileTab = 'perfilPessoal';

var activeTab = 'detalhes'

export default {
  name: "dentista",
  components: {
    // ProfileCard,
    MaterialInput,
    MaterialButton,
    Tratamento,
  },
  data() {
    return {
      clinicas: [],
      isEditing,
      novoContato: {
        tipo: 'whatsapp',
        contato: '',
        descricao: '',
      },
      showMenu: false,
      dentista,
      originalDentista,
      showTratamento,
      activeTab,
      activeProfileTab
    };
  },
  computed: {
    getContatoPlaceholder() {
      var placeholder = null;
      switch (this.novoContato.tipo) {
        case 'whatsapp':
          placeholder = 'WhatsApp';
          break;
        case 'celular':
          placeholder = 'Celular';
          break;
        case 'telefone':
          placeholder = 'Telefone';
          break;
        case 'email':
          placeholder = 'E-mail'
          break;
      }

      return placeholder;
    },

    novoContatoMask() {
      return [
        'telefone', 'celular', 'whatsapp'
      ].includes(this.novoContato.tipo) ? phoneMask(this.novoContato.contato) : ''
    },
    possuiWhatsapp() {
      return this.dentista && this.dentista.contatos && this.dentista.contatos.some(contato => contato.tipo === 'whatsapp');
    },
    whatsappNumero() {
      if (this.possuiWhatsapp) {
        const whatsappContato = this.dentista.contatos.find(contato => contato.tipo === 'whatsapp');
        return whatsappContato.contato;
      } else {
        return null;
      }
    },
    detalhesPessoais() {
      return this.dentista.detalhes_dentista ? this.dentista.detalhes_dentista.filter(detalhe => detalhe.tipo == 'pessoal') : [];
    },
    hasPendingChanges() {
      return this.originalDentista && this.dentista && JSON.stringify(this.originalDentista) !== JSON.stringify(this.dentista)
    }
  },
  watch: {
    dentista: {
      handler() {
        for (const propriedade in this.dentista)
          if (this.dentista[propriedade] === '')
            this.dentista[propriedade] = null
      },
      deep: true // Observação profunda de alterações aninhadas
    }
  },
  methods: {

    contatoChange() {
      if (this.novoContato.tipo == 'celular' || this.novoContato.tipo == 'whatsapp') {
        if (this.novoContato.contato.length > 14) {
          this.$refs.contatoDescricaoInput.getInput().focus();
        }
      }
    },

    toggleEditMode(section) {
      this.isEditing[section] = !this.isEditing[section];
    },
    clearNovoContato() {
      this.novoContato.contato = ''
      this.novoContato.descricao = ''
    },
    getContatoHref(tipo, contato) {
      switch (tipo) {
        case 'email':
          return `mailto:${contato}`;
        case 'whatsapp':
          return `https://wa.me/55${contato.replace(/\D+/g, '')}`;
        case 'telefone':
        case 'celular':
          return `tel:${contato.replace(/\D+/g, '')}`;
        default:
          return '#';
      }
    },
    async adicionarContato() {
      cSwal.loading('Adicionando contato...')
      const add = await adicionarMeioContato(this.dentista.id, this.novoContato);

      if (add) {
        await this.refreshDentista({ onlyContatos: true })
        cSwal.loaded()
        this.clearNovoContato()
      }
      else {
        cSwal.loaded()
        cSwal.cError('Ocorreu um erro ao salvar o contato.')
      }

    },

    excluirContato(id, tipo) {
      if (tipo == 'whatsapp')
        tipo = 'WhatsApp'
      else if (tipo == 'email')
        tipo = 'e-mail'

      cSwal.cConfirm('Deseja realmente excluir este ' + tipo + '?', async () => {
        cSwal.loading('Excluindo contato...')
        const del = await excluirMeioContato(id)
        if (del) {
          await this.refreshDentista({ onlyContatos: true })
          cSwal.loaded()
        }
        else {
          cSwal.loaded()
          cSwal.cError('Ocorreu um erro ao excluir o meio de contato')
        }
      })
    },

    selectMeioContato(tipo) {
      this.novoContato.tipo = tipo
      this.$refs.contatoInput.getInput().focus()
    },
    async refreshDentista(options) {
      await this.getDentistaDetails(this.dentista.id, options)
    },
    confirmSaveDentista() {
      cSwal.cConfirm('Deseja realmente salvar as alterações?', async () => {
        const update = await updateDentista(this.dentista)

        if (update) {
          cSwal.cSuccess('As alterações foram salvas.')
          await this.refreshDentista()
        }
        else {
          cSwal.cError('Ocorreu um erro ao salvar as alterações.')
        }
      })
    },

    validarCep(cep) {
      return /^\d{8}$/.test(cep.replace(/[^\d]+/g, ""))
    },

    zipCodeMask(value) {
      if (!value) return ""
      value = value.replace(/\D/g, '')
      value = value.replace(/(\d{5})(\d)/, '$1-$2')
      return value
    },

    async getEndereco(event) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(async () => {
        var cep = event.target.value
        cep = this.dentista.endereco_cep

        if (!this.validarCep(cep))
          return false

        const enderecoInfo = await getEnderecoByCep(cep)
        if (!enderecoInfo)
          return false

        this.dentista.endereco_logradouro = enderecoInfo.street
        this.dentista.endereco_cidade = enderecoInfo.city
        this.dentista.endereco_estado = enderecoInfo.state

        if (!this.dentista.endereco_numero)
          this.$refs.endereco_numero.getInput().focus();
      }, 50);
    },

    getContatoIcon(type) {
      var icon = null;
      switch (type) {
        case 'whatsapp':
          icon = ['fab', 'whatsapp'];
          break;
        case 'celular':
          icon = ['fas', 'mobile-screen-button'];
          break;
        case 'telefone':
          icon = 'mdi-phone';
          break;
        case 'email':
          icon = ['fas', 'envelope'];
          break;
      }

      return icon;
    },

    getInfoIcon(nivel) {
      var icon = null
      switch (nivel) {
        case 'positivo':
          icon = 'thumbs-up'
          break
        case 'neutro':
          icon = 'info-circle'
          break
        case 'atencao':
          icon = 'circle-exclamation'
          break
        case 'negativo':
          icon = 'thumbs-down'
          break
      }

      return icon
    },

    setProfileTab(tab) {
      this.activeProfileTab = tab
    },

    openTab(tab) {
      this.activeTab = tab;
    },

    async getDentistaDetails(id, options) {
      options = {
        onlyContatos: false,
        ...options
      }
      const dentista = await getDentista(id)
      if (dentista && !options.onlyContatos) {
        this.dentista = JSON.parse(JSON.stringify(dentista))
        this.originalDentista = JSON.parse(JSON.stringify(dentista))
      }
      else if (dentista && options.onlyContatos) {
        this.dentista.contatos = dentista.contatos
        this.originalDentista = {
          ...this.originalDentista,
          contatos: dentista.contatos,
        }
      }
    },
  },

  async mounted() {
    this.clinicas = await getClinicas()
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
    await this.getDentistaDetails(this.$route.params.id);
  },

  async beforeMount() {
  },

  beforeUnmount() {
  }
};
</script>
