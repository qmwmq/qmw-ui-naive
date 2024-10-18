import type { App } from 'vue'
// import { $alert, $confirm, $dialog, $loading, $message, $notification } from './api/discrete-api.tsx'
import QnButton from './components/QnButton.vue'
import QnConfigProvider from './components/QnConfigProvider.vue'
import QnContextMenu from './components/QnContextMenu.vue'
import QnDataTable from './components/QnDataTable.vue'
import QnGridForm from './components/QnGridForm.vue'
import QnModal from './components/QnModal.vue'
import QnModuleMenu from './components/QnModuleMenu.vue'
import QnIcon from './components/QnIcon.vue'
import QnTabs from './components/QnTabs.vue'

export { default as api } from './api'
export { default as theme } from './themes'

export {
  QnButton,
  QnConfigProvider,
  QnContextMenu,
  QnDataTable,
  QnGridForm,
  QnModal,
  QnModuleMenu,
  QnIcon,
  QnTabs
}

export default {
  install(app: App) {
    app.component('QnButton', QnButton)
    app.component('QnConfigProvider', QnConfigProvider)
    app.component('QnContextMenu', QnContextMenu)
    app.component('QnDataTable', QnDataTable)
    app.component('QnGridForm', QnGridForm)
    app.component('QnModal', QnModal)
    app.component('QnModuleMenu', QnModuleMenu)
    app.component('QnIcon', QnIcon)
    app.component('QnTabs', QnTabs)
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    QnButton: typeof QnButton
    QnConfigProvider: typeof QnConfigProvider
    QnContextMenu: typeof QnContextMenu
    QnDataTable: typeof QnDataTable
    QnGridForm: typeof QnGridForm
    QnModal: typeof QnModal
    QnModuleMenu: typeof QnModuleMenu
    QnIcon: typeof QnIcon
    QnTabs: typeof QnTabs
  }
}