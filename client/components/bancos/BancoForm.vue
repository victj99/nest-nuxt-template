<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card :loading="loaders.form" :disabled="loaders.form">
      <v-card-title>
        <div v-show="!loaders.form">
          <span v-if="!bank.id">Crear nuevo Banco</span>
          <span v-else>Modificar Banco N° {{ bank.id }}</span>
        </div>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="validation.form">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="bank.name"
                  :rules="validation.textfield2"
                  counter="50"
                  class="req"
                  label="Nombre del Banco"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="bank.accountNumber"
                  counter="60"
                  label="Numero de cuenta"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="bank.swift" label="Swift" counter="11" />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="bank.address"
                  class="req"
                  :rules="validation.address"
                  label="Dirección"
                  counter="150"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <!-- eslint-disable-next-line -->
        <v-btn color="primary" text @click="clear()">Cancelar</v-btn>
        <v-btn
          color="success"
          :disabled="!validation.form"
          :loading="loaders.postBtn"
          text
          @click="bank.id ? update() : save()"
        >
          {{ bank.id ? 'Modificar' : 'Crear' }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- <CrudOverlay /> -->
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { Bank } from '@common/entity/bank'
import { Payload } from '@common/rest'

import { textfield2, address } from '~/utils/rules'

@Component
export default class BancoForm extends Vue {
  dialog: Boolean = true
  bank: Bank | null = { address: '', name: '', accountNumber: '', swift: '' }
  validation = { form: true, textfield2, address }
  loaders = { postBtn: false, form: false }

  @Watch('$route.query')
  openDialog () { // Observara los cambios en la ruta y mostrara, obtendra u ocultara
    const query = this.$route.query
    if ('crear' in query || query.editar) { this.dialog = true } else { this.dialog = false } // Verifica la ruta

    // Si es editar entonces obtendra los datos del form por id
    if (query.editar) {
      this.loaders.form = true
      const payload: Payload<Bank> = { url: 'bank', id: parseInt(query.editar.toString()) }
      this.$getById(payload).then((response: Bank | null) => {
        if (response !== null) {
          this.bank = response
        }
      }).finally(() => { this.loaders.form = false })
    }
  }

  mounted () {
    console.log('Mounted!')
    this.openDialog()
  }

  save () {
    this.loaders.postBtn = true // Activa los loaders
    const payload: Payload<Bank> = { url: 'bank', item: this.bank } // Asigna el payload
    this.$create(payload).then(() => {
      this.dialogDimiss()
    }).finally(() => { this.loaders.postBtn = false })
  }

  update () {
    this.loaders.postBtn = true
    const payload: Payload<Bank> = { url: 'bank', item: this.bank, id: this.bank.id }
    this.$update(payload).then(() => {
      this.dialogDimiss()
    }).finally(() => { this.loaders.postBtn = false })
  }

  clear (): void {
    (this.$refs.form as HTMLFormElement).reset()
    delete this.bank.id
    this.dialog = false
    this.$router.replace({ query: {} })
  }

  dialogDimiss (): void {
    this.$emit('search')
    this.clear()
  }
}
</script>
