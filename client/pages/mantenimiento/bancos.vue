<template>
  <!-- eslint-disable vue/singleline-html-element-content-newline -->
  <v-row dense>
    <BancoForm @search="search()" />
    <CrudOverlay />
    <v-col>
      <v-row dense>
        <v-spacer />
        <v-menu
          left
          :close-on-content-click="false"
          :nudge-width="400"
          offset-x
        >
          <template #activator="{ on, attrs }">
            <!-- Prettier-ignore -->
            <v-btn text color="primary" v-bind="attrs" v-on="on">
              <v-icon>mdi-magnify</v-icon>
              {{ $vuetify.breakpoint.xsOnly ? null : 'Buscar' }}
            </v-btn>
          </template>

          <v-card>
            <v-card-text>
              Filtros
              <v-row dense class="mt-1">
                <v-col>
                  <v-text-field
                    v-model="queryParams.name"
                    dense
                    label="Nombre"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="queryParams.accountNumber"
                    dense
                    label="Nro Cuenta"
                  />
                </v-col>
              </v-row>
              <v-row dense class="mt-1">
                <v-col>
                  <v-text-field
                    v-model="queryParams.swift"
                    dense
                    label="Swift"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="queryParams.address"
                    dense
                    label="Direccion"
                  />
                </v-col>
              </v-row>
              <v-divider />
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn color="info" plain small text @click="search(true)">
                Limpiar
              </v-btn>
              <v-btn color="primary" plain small text @click="search()">
                Buscar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        <v-btn
          color="success"
          text
          @click="$router.push({ query: { crear: '' } })"
        >
          <v-icon>mdi-plus</v-icon>
          {{ $vuetify.breakpoint.xsOnly ? null : 'Nuevo' }}
        </v-btn>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-data-table
        :loading="table.loading"
        :headers="tableHeaders"
        :items="table.items"
        :server-items-length="table.totalItems"
        @update:options="setFilter"
      >
        <template #[`item.actions`]="{ item }">
          <TableActions :id="item.id" />
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { DataTableParams } from '@common/rest'
import { Component, Vue } from 'nuxt-property-decorator'

import { BankQuery } from '@common/entity/bank'
import BancoForm from '~/components/bancos/BancoForm.vue'
import CrudOverlay from '~/components/CrudOverlay.vue'
import TableActions from '~/components/menus/TableActions.vue'

import { bank } from '~/utils/tableHeaders'

@Component({ components: { BancoForm, TableActions, CrudOverlay } })
export default class Bancos extends Vue {
  id: number = 1
  tableHeaders = bank // Headers del banco

  queryParams: BankQuery = { size: 10 }
  table = { items: [], totalItems: 0, loading: false }

  mounted (): void {
    this.search()
  }

  search (clear?: boolean): void {
    if (clear) { this.queryParams = { size: this.queryParams.size } }

    this.table.loading = true
    this.$getWithParams({ url: 'bank', params: this.queryParams }).then((res: DataTableParams) => {
      this.table.items = res.items
      this.table.totalItems = res.total
    }).finally(() => { this.table.loading = false })
  }

  setFilter (e: any): void {
    this.queryParams.page = e.page - 1
    this.queryParams.size = e.itemsPerPage
    this.search()
  }
}
</script>
