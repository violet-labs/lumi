<template>
  <div class="page-width-container">
    <main class="page-width">
      <div class="container-fluid p-0">
        <div class="card no-shadow">
          <div class="card-body p-3">
            <div class="row gx-4">
              <div class="col-auto">
                <div class="avatar avatar-xl position-relative">

                  <input id="profilePictureFileInput" type="file" accept="image/*" @change=profilePicUpload hidden>

                  <div class="profile-pic pointer" @click="confirmUpdatePhoto">
                    <img :src="paciente.profile_picture_url" alt="profile_image"
                      class="shadow-sm w-100 border-radius-lg" />
                  </div>

                </div>
              </div>
              <div class="col-auto my-auto">
                <div class="h-100">
                  <h5 class="mb-1 fs-4">{{ paciente.nome }}</h5>
                  <p class="mb-0 font-weight-bold">{{ $filters.howMuchTime(paciente.data_nascimento, new Date(), false)
                    }}</p>
                </div>
              </div>
              <div class="mx-auto mt-3 col-md-6 my-sm-auto ms-sm-auto me-sm-0">
                <div class="nav-wrapper position-relative end-0">
                  <ul class="p-1 bg-transparent nav nav-pills nav-fill" role="tablist">
                    <li class="nav-item" @click="openTab('perfil')">
                      <a class="px-0 py-1 mb-0 nav-link nav-tab active" data-bs-toggle="tab" href="javascript:;"
                        role="tab" aria-selected="true">
                        <i class="fas fa-user"></i>
                        <br>
                        <span class="ms-1">Perfil</span>
                      </a>
                    </li>
                    <li class="nav-item" @click="openTab('tratamento')">
                      <a class="px-0 py-1 mb-0 nav-link nav-tab" data-bs-toggle="tab" href="javascript:;" role="tab"
                        aria-selected="false">
                        <i class="fas fa-teeth-open"></i>
                        <br>
                        <span class="ms-1">Tratamento</span>
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
                    <li class="nav-item" @click="openTab('financeiro')">
                      <a class="px-0 py-1 mb-0 nav-link nav-tab" data-bs-toggle="tab" href="javascript:;" role="tab"
                        aria-selected="false">
                        <i class="fas fa-dollar-sign"></i>
                        <br>
                        <span class="ms-1">Financeiro</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transition>
        <div class="p-0 container-fluid" v-if="activeTab == 'perfil'">
          <div class="row">
            <div class="col-md-12">
              <Transition>
                <div class="main-container" v-if="activeProfileTab == 'perfilPessoal'">
                  <div class="row p-3 pt-1 pb-4 w-100 mx-auto">
                    <div class="col-md-6 border-end pe-4">
                      <p class="text-uppercase text-sm mt-3" style="font-weight: 600">Informações pessoais</p>
                      <div class="row mt-4">
                        <div class="col-md-6 mb-2">
                          <label for="paciente_ortodontista" class="form-control-label">Ortodontista</label>
                          <select class="form-select" id="paciente_ortodontista" v-model="paciente.dentista_id">
                            <option hidden>Selecionar...</option>
                            <option v-for="dentista in dentistas" :key="dentista.id" :value="dentista.id"> {{
                              dentista.nome }} </option>
                          </select>
                        </div>
                        <div class="col-md-6 mb-2">
                          <MaterialInput label="Nascimento" type="date" v-model="paciente.data_nascimento"
                            id="paciente_dataNascimento" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <MaterialInput type="text" label="RG" v-model="paciente.rg" id="paciente_rg" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <MaterialInput label="CPF" type="text" v-model="paciente.cpf" id="paciente_cpf"
                            mask="###.###.###-##" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <MaterialInput label="Nome da mãe" type="text" v-model="paciente.nome_mae"
                            :input="function ($event) { capitalizeAll($event) }" id="paciente_nome_mae" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <MaterialInput label="Nome do pai" type="text" v-model="paciente.nome_pai"
                            :input="function ($event) { capitalizeAll($event) }" id="paciente_nome_pai" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <MaterialInput label="Como conheceu a clínica" type="text" v-model="paciente.como_conheceu"
                            id="paciente_como_conheceu" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <label for="paciente_observacoes" class="text-uppercase text-sm"
                            style="font-weight: 500">Observações</label>
                          <textarea class="form-control" id="paciente_observacoes" rows="3"
                            v-model="paciente.observacoes">
                      </textarea>
                        </div>
                        <div class="col-12">
                          <p class="text-uppercase text-sm mt-3" style="font-weight: 600">Informações do responsável</p>
                        </div>
                        <div class="col-md-6 mb-2">
                          <MaterialInput label="Nome" type="text" v-model="paciente.responsavel_nome"
                            :input="function ($event) { capitalizeAll($event) }" id="responsavel_nome" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <MaterialInput label="RG" type="text" v-model="paciente.responsavel_rg" id="responsavel_rg" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <MaterialInput label="CPF" type="text" v-model="paciente.responsavel_cpf"
                            mask="###.###.###-##" id="responsavel_cpf" />
                        </div>
                      </div>
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
                          <tr v-for="contato in paciente.contatos" v-bind:key="contato.id">
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

                      <div class="p-horizontal-divider mb-0"></div>

                      <div class="row">

                        <div class="col-sm-6 d-flex flex-column align-items-center justify-content-center">
                          <div v-if="isLoading.paciente" class="w-100 text-center py-5">
                            <div class="spinner-border text-primary" role="status">
                            </div>
                          </div>

                          <div v-if="!isLoading.paciente" class="text-center">
                            <p class="text-uppercase text-sm mt-3" style="font-weight: 600">
                              Ficha de avaliação inicial</p>
                            <span v-if="paciente.formulario_respondido"
                              class="badge badge-sm bg-success">Respondida</span>
                            <span v-else class="badge badge-sm bg-warning">Não respondida</span>
                          </div>
                        </div>

                        <div class="col-sm-6 d-flex align-items-end justify-content-center">

                          <div v-if="isLoading.paciente" class="w-100 text-center py-5">
                            <div class="spinner-border text-primary" role="status">
                            </div>
                          </div>

                          <div v-if="!isLoading.paciente" class="mt-3 mt-sm-0">
                            <button v-if="!paciente.formulario_respondido" class="btn btn-primary mb-0"
                              @click="handleFormLinkBtn">
                              <i class="me-2" :class="possuiWhatsapp ? 'fab fa-whatsapp' : 'fas fa-copy'"
                                style="font-size: 13pt;"></i>
                              <span style="font-size: 10pt;">
                                {{ possuiWhatsapp ? 'ENVIAR LINK' :
                                  'COPIAR LINK' }}
                              </span>
                            </button>
                            <button v-else class="btn btn-primary mb-0" @click="toggleFormularioView"
                              data-bs-toggle="modal" data-bs-target="#modalFormularioView">
                              <i class="me-2 fas fa-eye" style="font-size: 13pt;"></i>
                              <span style="font-size: 10pt;">
                                VISUALIZAR
                              </span>
                            </button>
                          </div>

                        </div>

                      </div>

                      <div class="p-horizontal-divider"></div>

                      <p class="text-uppercase text-sm mt-3" style="font-weight: 600">Endereço</p>
                      <div class="row">
                        <div class="col-md-4 mb-2">
                          <MaterialInput label="CEP" type="text" v-model="paciente.endereco_cep" :input="getEndereco"
                            mask="#####-###" id="paciente_enderecoCep" />
                        </div>
                        <div class="col-md-6 mb-2">
                          <MaterialInput label="Logradouro" type="text" v-model="paciente.endereco_logradouro"
                            id="paciente_enderecoLogradouro" />
                        </div>
                        <div class="col-md-2 mb-2">
                          <MaterialInput label="Nº" type="text" v-model="paciente.endereco_numero"
                            id="paciente_enderecoNumero" ref="endereco_numero" />
                        </div>
                        <div class="col-md-4">
                          <MaterialInput label="Complemento" type="text" v-model="paciente.endereco_complemento"
                            id="paciente_enderecoComplemento" />
                        </div>
                        <div class="col-md-4">
                          <MaterialInput label="Cidade" type="text" v-model="paciente.endereco_cidade"
                            id="paciente_enderecoCidade" />
                        </div>
                        <div class="col-md-4">
                          <MaterialInput label="Estado" type="text" v-model="paciente.endereco_estado"
                            id="paciente_enderecoEstado" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Transition name="fadeHeight">
                    <div v-cloak v-if="hasPendingChanges" class="row col-12">
                      <div class="p-horizontal-divider my-0"></div>
                      <div class="w-100 py-3 text-center">
                        <button class="btn btn btn-primary m-0" @click="confirmSavePaciente">
                          Salvar alterações
                        </button>
                      </div>
                    </div>
                  </Transition>
                  <div class="row p-0 w-100 mx-auto"
                    style="border-top: 1px solid #EEE; background: linear-gradient(to bottom, #d7e6ef, #e6eff4,  #e6eff4, #FFF, #FFF);">
                    <div class="col-12 text-center mb-1 p-3 m-0"
                      style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.1))">
                      <span class="fs-5" style="">Detalhes do paciente</span>
                    </div>

                    <div class="col-12">
                      <div class="row p-0">

                        <div v-if="isLoading.paciente" class="w-100 text-center py-5">
                          <div class="spinner-border text-primary" role="status">
                          </div>
                        </div>

                        <div v-if="!isLoading.paciente">
                          <div v-if="!paciente.formulario_respondido || detalhesPessoais.length == 0"
                            style="padding: 15px 15px 0px 15px; font-size: 12pt;" class="text-info text-center py-3">
                            O paciente ainda não respondeu à ficha de avaliação inicial. Para enviar-lhe o formulário,
                            utilize o
                            botão "<font-awesome-icon
                              :icon="possuiWhatsapp ? ['fab', 'fa-whatsapp'] : ['fas', 'fa-copy']"
                              class="me-1 text-sm" /><span class="text-sm font-weight-bold uppercase">{{ possuiWhatsapp
                                ?
                                'ENVIAR LINK' : 'COPIAR LINK' }}</span>" acima.
                          </div>
                          <div v-if="paciente.formulario_respondido" class="row">
                            <div v-for="(detalhe, index) in detalhesPessoais" v-bind:key="index"
                              class="col-sm-6 col-md-4">
                              <div class="info-container mt-2" :class="detalhe.nivel">
                                <div style="width: 30px; text-align: center;">
                                  <font-awesome-icon :icon="['fas', getInfoIcon(detalhe.nivel)]" />
                                </div>
                                <div class="">
                                  <span>{{ detalhe.detalhe }}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>

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
        <Tratamento v-if="activeTab == 'tratamento'" :paciente="paciente" @pacienteChange="refreshPaciente" />
      </Transition>

      <Transition>
        <div class="py-4 container-fluid" v-if="activeTab == 'consultas'">

          <div class="row">
            <div class="col-sm-6 col-md-3 text-center">
              <MaterialInput label="Consultas realizadas" readonly centered type="text"
                :modelValue="paciente.consultas_realizadas ? paciente.consultas_realizadas : 0"
                id="paciente_proximaConsulta" />
            </div>
            <div class="col-sm-6 col-md-3 text-center">
              <MaterialInput label="Primeira consulta" readonly centered type="text"
                :modelValue="$filters.dateDmy(paciente.primeira_consulta)" id="paciente_primeiraConsulta" />
              <span>
                {{ $filters.howMuchTime(paciente.primeira_consulta) }}
              </span>
            </div>
            <div class="col-sm-6 col-md-3 text-center">
              <MaterialInput label="Última consulta" readonly centered type="text"
                :modelValue="$filters.dateDmy(paciente.ultima_consulta)" id="paciente_ultimaConsulta" />
              <span>
                {{ $filters.howMuchTime(paciente.ultima_consulta) }}
              </span>
            </div>
            <div class="col-sm-6 col-md-3 text-center">
              <MaterialInput label="Próxima consulta" readonly centered type="text"
                :modelValue="$filters.dateDmy(paciente.proxima_consulta)" id="paciente_proximaConsulta" />
              <span class="text-success" style="font-weight: 500;">
                {{ $filters.howMuchTime(paciente.proxima_consulta) }}
              </span>
            </div>
          </div>

          <div class="p-horizontal-divider"></div>

          <!-- <div class="w-100 text-center">
            <button class="btn btn-primary"><font-awesome-icon :icon="['fas', 'fa-plus']" class="me-2" /> Nova
              consulta</button>
          </div> -->

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


    <div class="modal" tabindex="-1" id="modalFormularioView">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ficha de avaliação inicial</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-3 px-4" style="max-height: 80vh; overflow-y: auto;">

            <div class="d-flex flex-column align-center justify-content-center mb-0 pb-0">
              <label for=""><b>Respondida em:</b></label>
              <span>{{ $filters.dateTime(dataRespostaFicha) }}</span>
            </div>

            <div class="p-horizontal-divider"></div>

            <div style="max-width: 400px; margin: 0 auto;">
              <div v-for="(question, index) in questoesFichaInicial" :key="index" class="mt-2 mb-4"
                :ref="'question' + index">

                <label
                  v-if="question.tipo !== 'text' && question.tipo !== 'date' && question.tipo !== 'phone' && question.tipo !== 'email'"
                  class="mb-3 p-0 font-weight-bolder label-highlight">{{
                    question.questao }}
                  <span v-if="question.obrigatoria" class="text-danger">*</span>
                </label>

                <div
                  v-if="question.tipo === 'text' || question.tipo === 'date' || question.tipo === 'phone' || question.tipo === 'email'"
                  class="mt-0 p-0">
                  <MaterialInput :readonly="true" :type="question.tipo === 'phone' ? 'text' : question.tipo"
                    :name="question.id" :id="question.id" :ref="question.id" :label="question.questao"
                    labelClass="font-weight-bolder label-highlight" v-model="question.resposta"
                    :required="question.obrigatoria" :input="function ($event) { textInputEvent($event, question) }"
                    :placeholder="question.tipo === 'phone' ? '(##) #####-####' : null"
                    :style="question.textOptions && question.textOptions.includes('center') ? 'text-align: center !important' : ''" />
                </div>

                <div v-else-if="question.tipo === 'checkbox'" class="px-3">
                  <table class="options-checkbox">
                    <tr v-for="(alternativa, alternativaIndex) in question.alternativas" :key="alternativaIndex">
                      <td class="d-flex flex-row align-center">
                        <input type="checkbox" class="form-checkbox" :name="question.id + '-' + alternativa.resposta"
                          :id="question.id + '-' + alternativa.resposta" :checked="alternativa.selecionada"
                          @click.prevent />
                        <label :for="question.id + '-' + alternativa.resposta" style="padding-top: 5px;">{{
                          alternativa.resposta }}</label>
                      </td>
                    </tr>
                  </table>
                </div>

                <div v-else-if="question.tipo === 'radio'" class="row px-3">
                  <div v-for="(alternativa, alternativaIndex) in question.alternativas" v-bind:key="alternativaIndex"
                    class="col-6" style="text-align: left;"
                    :class="{ 'ps-6': (question.alternativas.length == 2 && alternativaIndex == 0) }">
                    <input type="radio" class="form-radio" :name="question.id"
                      :id="`alternativa-${question.id}-${alternativaIndex}`" :value="alternativa.resposta"
                      v-model="question.resposta" @click.prevent />
                    <label :for="`alternativa-${question.id}-${alternativaIndex}`" class="radio-label">
                      {{ alternativa.resposta }}</label>
                  </div>
                </div>

                <div v-if="question.detalhar && question.detalhar === 'opcional'"
                  class="d-flex flex-row align-center justify-content-center">
                  <input type="checkbox" class="form-checkbox" :name="question.id + '-detalhar-cb'"
                    :id="question.id + '-detalhar-cb'" v-model="question.detalhando" @click.prevent />
                  <label :for="question.id + '-detalhar-cb'" class="label-big" style="padding-top: 8px;">
                    {{ question.titulo_questao_detalhe ?
                      question.titulo_questao_detalhe : 'Detalhar...' }}
                  </label>
                </div>

                <!-- Caso a questão tiver detalhamento obrigatório ou o detalhamento for optado pelo usuário -->
                <div v-if="question.detalhes">
                  <MaterialInput :readonly="true" :name="question.id + '-detalhar'" label="Detalhes"
                    labelClass="label-big" :id="question.id + '-detalhar'" v-model="question.detalhes" />
                </div>
                <!-- Exibe o divider, exceto no último elemento -->
                <div v-if="index !== questoesFichaInicial.length - 1" class="p-horizontal-divider primary"></div>
              </div>
            </div> <!-- v-for / -->

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { phoneMask } from "@/utils.js";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
// import ProfileCard from "./components/ProfileCard.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { useRoute } from 'vue-router';
import Tratamento from "@/views/Tratamento.vue"
import { getEnderecoByCep } from "@/services/commonService"
import { uploadImage } from "@/services/imagensService"
import { getDentistas } from "@/services/dentistasService"
import { getPaciente, updatePaciente, adicionarMeioContato, excluirMeioContato, getFichaInicial } from "@/services/pacientesService"
import cSwal from "@/utils/cSwal.js"

var isEditing = []

var paciente = {}
var originalPaciente = {}

var showTratamento = false;

var activeProfileTab = 'perfilPessoal';

var activeTab = 'perfil'

export default {
  name: "profile",
  components: {
    // ProfileCard,
    MaterialInput,
    MaterialButton,
    Tratamento,
  },
  data() {
    return {
      dataRespostaFicha: null,
      questoesFichaInicial: [],
      isLoading: {
        paciente: true
      },
      dentistas: [],
      isEditing,
      novoContato: {
        tipo: 'whatsapp',
        contato: '',
        descricao: '',
      },
      showMenu: false,
      paciente,
      originalPaciente,
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
      return this.paciente && this.paciente.contatos && this.paciente.contatos.some(contato => contato.tipo === 'whatsapp');
    },
    whatsappNumero() {
      if (this.possuiWhatsapp) {
        const whatsappContato = this.paciente.contatos.find(contato => contato.tipo === 'whatsapp');
        return whatsappContato.contato;
      } else {
        return null;
      }
    },
    detalhesPessoais() {
      return this.paciente.detalhes_paciente ? this.paciente.detalhes_paciente.filter(detalhe => detalhe.tipo == 'pessoal') : [];
    },
    hasPendingChanges() {
      return this.originalPaciente && this.paciente
        && JSON.stringify(this.originalPaciente) !== JSON.stringify(this.paciente)
    }
  },
  watch: {
    paciente: {
      handler() {
        for (const propriedade in this.paciente)
          if (this.paciente[propriedade] === '')
            this.paciente[propriedade] = null
      },
      deep: true // Observação profunda de alterações aninhadas
    }
  },
  methods: {
    getFichaInicialLink() {
      return `${window.location.origin}/bem-vindo/?t=${this.paciente.public_token}`
    },

    contatoChange() {
      if (this.novoContato.tipo == 'celular' || this.novoContato.tipo == 'whatsapp') {
        if (this.novoContato.contato.length > 14) {
          this.$refs.contatoDescricaoInput.getInput().focus();
        }
      }
    },

    cancelPhotoUpload() {
      this.pendingPhotoFile = null
      this.photoPreviewImage = null
    },

    confirmUpdatePhoto() {
      cSwal.cConfirm('Deseja atualizar a foto de perfil?', () => {
        this.chooseProfilePictureFile()
      })
    },

    chooseProfilePictureFile() {
      document.getElementById('profilePictureFileInput').click()
    },

    profilePicUpload(e) {
      cSwal.loading('Atualizando imagem de perfil...')

      const imagem = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(imagem);
      reader.onload = async e => {
        const imgData = {
          paciente_id: this.paciente.id,
          imagem,
          dir: 'profile_pic',
        }
        const upload = await uploadImage(imgData)

        if (upload) {
          await this.refreshPaciente()
          cSwal.loaded()
          cSwal.cSuccess('A foto de perfil do paciente foi atualizada.')
        }
        else {
          cSwal.loaded()
          cSwal.cError('Ocorreu um erro ao atualizar a foto de perfil do paciente.')
        }
      };
    },

    capitalizeAll($event) {
      event.target.value = event.target.value.replace(/\b\w/g, l => l.toUpperCase())
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

    excluirContato(id, tipo) {
      if (tipo == 'whatsapp')
        tipo = 'WhatsApp'
      else if (tipo == 'email')
        tipo = 'e-mail'

      cSwal.cConfirm('Deseja realmente excluir este ' + tipo + '?', async () => {
        cSwal.loading('Excluindo contato...')
        const del = await excluirMeioContato(id)
        if (del) {
          await this.refreshPaciente({ onlyContatos: true })
          cSwal.loaded()
        }
        else {
          cSwal.loaded()
          cSwal.cError('Ocorreu um erro ao excluir o meio de contato')
        }
      })
    },

    async adicionarContato() {
      cSwal.loading('Adicionando contato...')
      const add = await adicionarMeioContato(this.paciente.id, this.novoContato);

      if (add) {
        await this.refreshPaciente({ onlyContatos: true })
        cSwal.loaded()
        this.clearNovoContato()
      }
      else {
        cSwal.loaded()
        cSwal.cError('Ocorreu um erro ao salvar o contato.')
      }

    },
    selectMeioContato(tipo) {
      this.novoContato.tipo = tipo
      this.$refs.contatoInput.getInput().focus()
    },
    confirmSavePaciente() {
      cSwal.cConfirm('Deseja realmente salvar as alterações?', async () => {
        const update = await updatePaciente(this.paciente)

        if (update) {
          cSwal.cSuccess('As alterações foram salvas.')
          await this.refreshPaciente()
        }
        else {
          cSwal.cError('Ocorreu um erro ao salvar as alterações.')
        }
      })
    },
    async handleFormLinkBtn() {
      if (this.possuiWhatsapp)
        this.enviarFormulario()
      else
        await this.copiarLink()
    },
    async copiarLink() {
      const link = this.getFichaInicialLink()

      if (!navigator.clipboard) {
        cSwal.cInfo('Link da ficha de avaliação inicial para o paciente<br><b>' + this.paciente.nome + '</b>:<br><br><b>' + link + '</b>');
        return false;
      }

      // Copy link to clipboard
      await navigator.clipboard.writeText(link).then(() => {
        console.log('Link copied to clipboard!');
      }).catch((error) => {
        console.error('Error copying link:', error);
      });

      cSwal.cAlert('O link do formulário foi copiado.')
    },
    enviarFormulario() {
      const whatsappNumber = this.whatsappNumero;
      const phoneNumber = whatsappNumber.replace(/\D+/g, ''); // extract only numbers
      if (phoneNumber.length !== 11) {
        // show error message
        cSwal.cAlert('Número de WhatsApp inválido. Por favor, verifique o número.');
        return;
      }
      const link = this.getFichaInicialLink()
      const whatsappLink = `https://wa.me/55${phoneNumber}?text=Olá, bem-vindo a clínica! Por favor, preencha nosso formulário para lhe melhor atendermos: https://app.lumiorthosystem.com.br/bem-vindo/?t=${link}`;
      window.open(whatsappLink, '_blank'); // open in new tab
    },

    validarCep(cep) {
      return /^\d{8}$/.test(cep.replace(/[^\d]+/g, ""))
    },

    async getEndereco(event) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(async () => {
        var cep = event.target.value
        cep = this.paciente.endereco_cep

        if (!this.validarCep(cep))
          return false

        const enderecoInfo = await getEnderecoByCep(cep)
        if (!enderecoInfo)
          return false

        this.paciente.endereco_logradouro = enderecoInfo.street
        this.paciente.endereco_cidade = enderecoInfo.city
        this.paciente.endereco_estado = enderecoInfo.state

        if (!this.paciente.endereco_numero)
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
      return icon
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
    async refreshPaciente(options) {
      await this.getPacienteDetails(this.paciente.id, options)
    },
    async getPacienteDetails(id, options) {
      this.isLoading.paciente = true

      options = {
        onlyContatos: false,
        ...options
      }
      const paciente = await getPaciente(id)
      if (paciente && !options.onlyContatos) {
        this.paciente = JSON.parse(JSON.stringify(paciente))
        this.originalPaciente = JSON.parse(JSON.stringify(paciente))
      }
      else if (paciente && options.onlyContatos) {
        this.paciente.contatos = paciente.contatos
        this.originalPaciente = {
          ...this.originalPaciente,
          contatos: paciente.contatos,
        }
      }
      else if (id) {
        this.$router.push('/pacientes')
      }

      this.isLoading.paciente = false

      const fichaInicial = await getFichaInicial(this.paciente.id)
      if (fichaInicial) {
        this.questoesFichaInicial = fichaInicial.questoes
        this.dataRespostaFicha = fichaInicial.data_resposta
      }
    },
  },

  async created() {
    await this.getPacienteDetails(this.$route.params.id);
  },

  async mounted() {
    setNavPills();
    setTooltip();
    this.$store.state.isAbsolute = true;

    this.dentistas = await getDentistas()
  },

  beforeUnmount() {
  }
};
</script>
