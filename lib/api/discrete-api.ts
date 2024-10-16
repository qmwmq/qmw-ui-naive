import { computed, ref } from 'vue'
import { createDiscreteApi, darkTheme } from 'naive-ui'

export const theme0 = ref<any>('light')

const configProviderProps = computed(() => {
  return {
    theme: theme0.value === 'dark' ? darkTheme : null,
  }
})
const {
  message: $message,
  notification: $notification,
  dialog: $dialog,
  loadingBar: $loading,
} = createDiscreteApi(
    [ 'message', 'dialog', 'notification', 'loadingBar' ],
    { configProviderProps }
)

// 根据dialog二次封装
// let $confirm = () => {
//   return new Promise((resolve, reject) => {
//     $dialog.warning({
//       content: '确认删除？',
//       positiveText: '确 认',
//       negativeText: '取 消',
//       onPositiveClick: () => resolve(),
//       onNegativeClick: () => reject(),
//     })
//   }).catch(() => void 0)
// }

export { $message, $notification, $dialog, $loading }

