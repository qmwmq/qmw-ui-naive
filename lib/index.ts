import type { App } from 'vue'
import QnButton from './components/QnButton.vue'
import QnConfigProvider from './components/QnConfigProvider.vue'
import QnContextMenu from './components/QnContextMenu.vue'
import QnDatePicker from './components/QnDatePicker.vue'
import QnDateRangePicker from './components/QnDateRangePicker.vue'
import QnDataTable from './components/QnDataTable.vue'
import QnDescriptions from './components/QnDescriptions.vue'
import QnDrawer from './components/QnDrawer.vue'
import QnGridForm from './components/QnGridForm.vue'
import QnHighlight from './components/QnHighlight.vue'
import QnIcon from './components/QnIcon.vue'
import QnInput from './components/QnInput.vue'
import QnInputNumber from './components/QnInputNumber.vue'
import QnInputTextarea from './components/QnInputTextarea.vue'
import QnLoadingSelect from './components/QnLoadingSelect.vue'
import QnModal from './components/QnModal.vue'
import QnModuleMenu from './components/QnModuleMenu.vue'
import QnProgress from './components/QnProgress.vue'
import QnSegment from './components/QnSegment.vue'
import QnSelect from './components/QnSelect.vue'
import QnSingleMenu from './components/QnSingleMenu.vue'
import QnTabs from './components/QnTabs.vue'
import QnTree from './components/QnTree.vue'

export { default as api } from './api'
export { default as theme } from './themes'

export type { DataTableColumn } from './components/QnDataTable.vue'
export type { Option as MenuOption } from './components/QnModuleMenu.vue'
export type { Tab } from './components/QnTabs.vue'

export {
  QnButton,
  QnConfigProvider,
  QnContextMenu,
  QnDatePicker,
  QnDateRangePicker,
  QnDataTable,
  QnDescriptions,
  QnDrawer,
  QnGridForm,
  QnHighlight,
  QnIcon,
  QnInput,
  QnInputNumber,
  QnInputTextarea,
  QnLoadingSelect,
  QnModal,
  QnModuleMenu,
  QnProgress,
  QnSegment,
  QnSelect,
  QnSingleMenu,
  QnTabs,
  QnTree,
}

export default {
  install(app: App) {
    app.component('QnButton', QnButton)
    app.component('QnConfigProvider', QnConfigProvider)
    app.component('QnContextMenu', QnContextMenu)
    app.component('QnDatePicker', QnDatePicker)
    app.component('QnDateRangePicker', QnDateRangePicker)
    app.component('QnDataTable', QnDataTable)
    app.component('QnDescriptions', QnDescriptions)
    app.component('QnDrawer', QnDrawer)
    app.component('QnGridForm', QnGridForm)
    app.component('QnHighlight', QnHighlight)
    app.component('QnIcon', QnIcon)
    app.component('QnInput', QnInput)
    app.component('QnInputNumber', QnInputNumber)
    app.component('QnInputTextarea', QnInputTextarea)
    app.component('QnLoadingSelect', QnLoadingSelect)
    app.component('QnModal', QnModal)
    app.component('QnModuleMenu', QnModuleMenu)
    app.component('QnProgress', QnProgress)
    app.component('QnSegment', QnSegment)
    app.component('QnSelect', QnSelect)
    app.component('QnSingleMenu', QnSingleMenu)
    app.component('QnTabs', QnTabs)
    app.component('QnTree', QnTree)
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    QnButton: typeof QnButton
    QnConfigProvider: typeof QnConfigProvider
    QnContextMenu: typeof QnContextMenu
    QnDatePicker: typeof QnDatePicker
    QnDateRangePicker: typeof QnDateRangePicker
    QnDataTable: typeof QnDataTable
    QnDescriptions: typeof QnDescriptions
    QnDrawer: typeof QnDrawer
    QnGridForm: typeof QnGridForm
    QnHighlight: typeof QnHighlight
    QnIcon: typeof QnIcon
    QnInput: typeof QnInput
    QnInputNumber: typeof QnInputNumber
    QnInputTextarea: typeof QnInputTextarea
    QnLoadingSelect: typeof QnLoadingSelect
    QnModal: typeof QnModal
    QnModuleMenu: typeof QnModuleMenu
    QnProgress: typeof QnProgress
    QnSegment: typeof QnSegment
    QnSelect: typeof QnSelect
    QnSingleMenu: typeof QnSingleMenu
    QnTabs: typeof QnTabs
    QnTree: typeof QnTree
  }
}