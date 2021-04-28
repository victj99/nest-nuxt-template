<template>
  <!-- eslint-disable vue/singleline-html-element-content-newline -->
  <div>
    <v-menu left offset-x transition="slide-x-transition">
      <template #activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item link @click="edit()">
          <v-list-item-icon>
            <v-icon dense color="orange">mdi-pencil</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Editar</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon dense color="error">mdi-delete</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Eliminar</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class TableActions extends Vue {
  @Prop(Number) id: Number

  alert = { success: false }

  edit () {
    this.$router.push({ query: { editar: this.id.toString() } })
  }
}
</script>
