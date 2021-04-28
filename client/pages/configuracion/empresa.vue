<template>
  <v-row dense>
    <v-card :loading="loaders.form">
      <v-container>
        <v-form ref="form" v-model="validation.form">
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                v-model="company.ruc"
                counter="50"
                :rules="validation.address"
                class="req"
                label="Ruc"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                v-model="company.name"
                :rules="validation.address"
                counter="60"
                class="req"
                label="Razon Social"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                v-model="company.email"
                counter="50"
                class="req"
                :rules="validation.email"
                label="Correo"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                v-model="company.phone"
                counter="20"
                class="req"
                :rules="validation.address"
                label="Telefono"
              />
            </v-col>

            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                v-model="company.address"
                counter="100"
                class="req"
                :rules="validation.address"
                label="Direccion"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-row no-gutters>
                <v-col cols="12" sm="12" md="6">
                  <v-file-input
                    v-model="images.stamp"
                    accept="image/*"
                    label="Firma"
                  />
                  <v-img :src="stamp" contain />
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-file-input
                    v-model="images.logo"
                    accept="image/*"
                    label="Logo"
                  />
                  <v-img :src="logo" contain />
                </v-col>
              </v-row>
              <v-btn
                :disabled="!validation.form"
                fab
                color="green"
                fixed
                bottom
                right
                :loading="loaders.fab"
                @click="update()"
              >
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
    <CrudOverlay />
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { Company } from '@common/entity/company'

import { address, email } from '~/utils/rules'
import CrudOverlay from '~/components/CrudOverlay.vue'

@Component({ components: { CrudOverlay } })
export default class Empresa extends Vue {
  company: Company = { ruc: '', name: '', email: '', phone: '', address: '' }
  images = { logo: null, stamp: null }
  validation = { form: true, address, email }
  loaders = { form: true, fab: false, logo: false }

  get logo () {
    if (this.images.logo) { return URL.createObjectURL(this.images.logo) }
  }

  get stamp () {
    if (this.images.stamp) { return URL.createObjectURL(this.images.stamp) }
  }

  async mounted () {
    this.loaders.form = true; this.loaders.fab = true

    await this.$axios.get('company/search').then((response) => {
      if (response.data !== null) { this.company = response.data }
    }).finally(() => { this.loaders.form = false; this.loaders.fab = false })
  }

  update () {
    this.loaders.form = true; this.loaders.fab = true

    const data = new FormData()
    Object.keys(this.company).forEach(key => data.append(key, this.company[key]))
    if (this.images.logo) { data.append('logo', this.images.logo) }
    if (this.images.stamp) { data.append('stamp', this.images.stamp) }

    this.$axios.put('company/update', data, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res) => { console.log(res) })
      .finally(() => { this.loaders.form = false; this.loaders.fab = false })
  }
}
</script>
