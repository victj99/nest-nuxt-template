import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Framework } from 'vuetify'
// import { Route } from 'vue-router'

declare module '@nuxt/types' {
  interface Context {
    $axios: NuxtAxiosInstance
    $vuetify: Framework
    // $route: Route
  }
}
