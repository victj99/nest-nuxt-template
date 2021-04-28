<template>
  <!-- eslint-disable vue/singleline-html-element-content-newline -->
  <div @mouseenter="refresh()">
    <v-alert
      v-if="alertGetter.type == 'not-exist'"
      :value="alertValue"
      class="absolute"
      transition="slide-x-reverse-transition"
      type="warning"
      text
      dismissible
    >
      El elemento no existe, intenta crear uno nuevo
    </v-alert>
    <v-alert
      v-if="alertGetter.type == 'created'"
      :value="alertValue"
      class="absolute"
      transition="slide-x-reverse-transition"
      type="success"
      text
      outlined
    >
      ¡Hecho!
      <!-- prettier-ignore -->
      <br>
      <small>Codigo de creacion: {{ alertGetter.msg }}</small>
    </v-alert>
    <v-alert
      v-if="alertGetter.type == 'updated'"
      :value="alertValue"
      class="absolute"
      transition="slide-x-reverse-transition"
      type="success"
      text
      outlined
    >
      ¡Hecho!
      <!-- prettier-ignore -->
      <br>
      <small>Codigo del elemento: {{ alertGetter.msg }}</small>
    </v-alert>
    <v-alert
      v-if="alertGetter.type == 'error'"
      :value="alertValue"
      class="absolute"
      transition="slide-x-reverse-transition"
      type="error"
      text
      dismissible
      outlined
      h
    >
      ¡Oops! ha occurido un error
      <!-- prettier-ignore -->
      <br>
      <small>{{ alertGetter.msg }}</small>
      <!-- prettier-ignore -->
      <br>
      <v-btn x-small text>Generar informe</v-btn>
    </v-alert>
  </div>
</template>

<script lang="ts">
import { Action, Component, Getter, Vue, Watch } from 'nuxt-property-decorator'
import { AlertPayload } from '~/utils/storeTypes'

@Component
export default class CrudOverlay extends Vue {
  // Types => not-exist | created | error
  @Getter('alertContent') alertGetter: AlertPayload

  alTimeout: ReturnType<typeof setTimeout> = null
  alertValue: boolean = false

  @Action('setAlert') actionAlert

  @Watch('alertGetter')
  alertTimeout () {
    if (this.alertGetter.type) {
      this.alertValue = false
      clearTimeout(this.alTimeout)

      setTimeout(() => {
        this.alertValue = true
      }, 200)

      this.timeout()
    }
  }

  timeout () {
    this.alTimeout = setTimeout(() => {
      this.alertValue = false
      this.actionAlert({ type: '' } as AlertPayload)
    }, 6000)
  }

  refresh () {
    if (this.alTimeout !== null) {
      console.log('Refresh')

      clearTimeout(this.alTimeout)
      this.timeout()
    }
  }
}
</script>

<style scoped>
.absolute {
  position: fixed;
  bottom: 2%;
  right: 1%;
  z-index: 210;
}
</style>
