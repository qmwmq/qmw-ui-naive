import type { App } from 'vue'
import QnButton from './components/QnButton.vue'
import QnDatePicker from './components/QnDatePicker.vue'
import QnDateRangePicker from './components/QnDateRangePicker.vue'
import QnConfigProvider from './components/QnConfigProvider.vue'
import QnContextMenu from './components/QnContextMenu.vue'
import QnDataTable from './components/QnDataTable.vue'
import QnGridForm from './components/QnGridForm.vue'
import QnLoadingSelect from './components/QnLoadingSelect.vue'
import QnModal from './components/QnModal.vue'
import QnModuleMenu from './components/QnModuleMenu.vue'
import QnIcon from './components/QnIcon.vue'
import QnInputNumber from './components/QnInputNumber.vue'
import QnSelect from './components/QnSelect.vue'
import QnTabs from './components/QnTabs.vue'

export { default as api } from './api'
export { default as theme } from './themes'

export type { DataTableColumn } from './components/QnDataTable.vue'
export type { Option as MenuOption } from './components/QnModuleMenu.vue'

export {
  QnButton,
  QnConfigProvider,
  QnContextMenu,
  QnDataTable,
  QnDatePicker,
  QnDateRangePicker,
  QnGridForm,
  QnLoadingSelect,
  QnModal,
  QnModuleMenu,
  QnIcon,
  QnInputNumber,
  QnSelect,
  QnTabs
}

export default {
  install(app: App) {
    app.component('QnButton', QnButton)
    app.component('QnConfigProvider', QnConfigProvider)
    app.component('QnContextMenu', QnContextMenu)
    app.component('QnDataTable', QnDataTable)
    app.component('QnDatePicker', QnDatePicker)
    app.component('QnDateRangePicker', QnDateRangePicker)
    app.component('QnGridForm', QnGridForm)
    app.component('QnLoadingSelect', QnLoadingSelect)
    app.component('QnModal', QnModal)
    app.component('QnModuleMenu', QnModuleMenu)
    app.component('QnIcon', QnIcon)
    app.component('QnInputNumber', QnInputNumber)
    app.component('QnSelect', QnSelect)
    app.component('QnTabs', QnTabs)
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    QnButton: typeof QnButton
    QnConfigProvider: typeof QnConfigProvider
    QnContextMenu: typeof QnContextMenu
    QnDataTable: typeof QnDataTable
    QnDatePicker: typeof QnDatePicker
    QnDateRangePicker: typeof QnDateRangePicker
    QnGridForm: typeof QnGridForm
    QnLoadingSelect: typeof QnLoadingSelect
    QnModal: typeof QnModal
    QnModuleMenu: typeof QnModuleMenu
    QnIcon: typeof QnIcon
    QnSelect: typeof QnSelect
    QnTabs: typeof QnTabs
  }
}