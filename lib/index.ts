import type { App } from 'vue'
import QnButton from './components/QnButton.vue'
import QnConfigProvider from './components/QnConfigProvider.vue'
import QnIcon from './components/QnIcon.vue'

export { QnButton, QnConfigProvider, QnIcon }

export default {
  install(app: App) {
    app.component('QnButton', QnButton)
    app.component('QnConfigProvider', QnConfigProvider)
    app.component('QnIcon', QnIcon)
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    QnButton: typeof QnButton
    QnConfigProvider: typeof QnConfigProvider
    QnIcon: typeof QnIcon
  }
}