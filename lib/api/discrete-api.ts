import { computed, ref } from 'vue'
import { createDiscreteApi, darkTheme } from 'naive-ui'

export const theme0 = ref<any>('light')

const configProviderProps = computed(() => {
  return {
    theme: theme0.value === 'dark' ? darkTheme : null,
  }
})
export const {
  message: $message,
  notification: $notification,
  dialog: $dialog,
  loadingBar: $loading,
} = createDiscreteApi(
    [ 'message', 'dialog', 'notification', 'loadingBar' ],
    { configProviderProps }
)
