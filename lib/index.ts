import type { App } from 'vue'
import QnButton from './components/QnButton.vue'
import QnConfigProvider from './components/QnConfigProvider.vue'
import QnContextMenu from './components/QnContextMenu.vue'
import QnModuleMenu from './components/QnModuleMenu.vue'
import QnIcon from './components/QnIcon.vue'
import QnTabs from './components/QnTabs.vue'

export { QnButton, QnConfigProvider, QnContextMenu, QnIcon, QnModuleMenu, QnTabs }

export default {
  install(app: App) {
    app.component('QnButton', QnButton)
    app.component('QnConfigProvider', QnConfigProvider)
    app.component('QnContextMenu', QnContextMenu)
    app.component('QnIcon', QnIcon)
    app.component('QnModuleMenu', QnModuleMenu)
    app.component('QnTabs', QnTabs)
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    QnButton: typeof QnButton
    QnConfigProvider: typeof QnConfigProvider
    QnContextMenu: typeof QnContextMenu
    QnIcon: typeof QnIcon
    QnModuleMenu: typeof QnModuleMenu
    QnTabs: typeof QnTabs
  }
}