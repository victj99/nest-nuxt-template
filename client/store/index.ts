import { Module, VuexAction, VuexModule, VuexMutation } from 'nuxt-property-decorator'
import { AlertPayload } from '~/utils/storeTypes'

@Module
export default class Index extends VuexModule {
  alertComp: AlertPayload = { type: '' }
  errors: Record<string, string> = {}

  get alertContent () {
    return this.alertComp
  }

  @VuexMutation
  alertMutation (payload: AlertPayload) {
    this.alertComp = payload
  }

  @VuexAction
  setAlert (payload: AlertPayload) {
    // if (this.alertComp.type) {
    //   this.context.commit('alertMutation', { type: '', msg: '' } as AlertPayload)
    // }
    setTimeout(() => {
      this.context.commit('alertMutation', payload)
    }, 400)
  }
}
