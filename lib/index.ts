import type { App } from 'vue'
import QnButton from './components/QnButton.vue'
import QnConfigProvider from './components/QnConfigProvider.vue'
import QnModuleMenu from './components/QnModuleMenu.vue'
import QnIcon from './components/QnIcon.vue'

export { QnButton, QnConfigProvider, QnIcon, QnModuleMenu }

export default {
  install(app: App) {
    app.component('QnButton', QnButton)
    app.component('QnConfigProvider', QnConfigProvider)
    app.component('QnIcon', QnIcon)
    app.component('QnModuleMenu', QnModuleMenu)
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    QnButton: typeof QnButton
    QnConfigProvider: typeof QnConfigProvider
    QnIcon: typeof QnIcon
    QnModuleMenu: typeof QnModuleMenu
  }
}