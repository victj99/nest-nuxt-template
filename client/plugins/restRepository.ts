import { Payload } from '@common/rest'
import { Context } from '@nuxt/types'
import { AxiosResponse, AxiosError } from 'axios'
import { AlertPayload } from '~/utils/storeTypes'

declare module 'vue/types/vue' {
  interface Vue {
    $getWithParams (payload: Payload): Promise<any>
    $getById (payload: Payload): Promise<any>
    $create (payload: Payload): Promise<any>
    $update (payload: Payload): Promise<any>
  }
}

export default ({ $axios, store }: Context, inject: Function) => {
  // alert-ypes => not-exist | created | error
  const getWithParams = (payload: Payload) => {
    return new Promise((resolve, reject) => {
      $axios.get(`${payload.url}/search`, { params: payload.params }).then((response: AxiosResponse) => {
        resolve(response.data)
      }).catch((error: AxiosError) => { console.log(error.response); reject(alert(error.response?.data)) })
    })
  }

  const getById = (payload: Payload) => {
    return new Promise((resolve, reject) => {
      $axios.get(`${payload.url}/search/${payload.id}`).then((response: AxiosResponse) => {
        resolve(response.data)
        if (!response.data) {
          store.dispatch('setAlert', { type: 'not-exist' } as AlertPayload)
        }
      }).catch((error: AxiosError) => {
        store.dispatch('setAlert', { type: 'error', msg: error.response?.data.message } as AlertPayload)
        reject(new Error(error.response?.data))
      })
    })
  }

  const create = (payload: Payload) => {
    return new Promise((resolve, reject) => {
      $axios.post(`${payload.url}/create`, payload.item).then((response: AxiosResponse) => {
        store.dispatch('setAlert', { type: 'created', msg: response.data } as AlertPayload)
        resolve(response.data)
      }).catch((error: AxiosError) => {
        store.dispatch('setAlert', { type: 'error', msg: error.response?.data } as AlertPayload)
        reject(new Error(error.response?.data))
      })
    })
  }

  const update = (payload: Payload) => {
    return new Promise((resolve, reject) => {
      $axios.put(`${payload.url}/update/${payload.id}`, payload.item).then((response: AxiosResponse) => {
        store.dispatch('setAlert', { type: 'updated', msg: response.data } as AlertPayload)
        resolve(response.data)
      }).catch((error: AxiosError) => {
        store.dispatch('setAlert', { type: 'error', msg: error.response?.data } as AlertPayload)
        reject(new Error(error.response?.data))
      })
    })
  }

  inject('getWithParams', getWithParams)
  inject('getById', getById)
  inject('create', create)
  inject('update', update)
}
