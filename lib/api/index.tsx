import { computed } from 'vue'
import { createDiscreteApi, darkTheme, type DialogOptions, NFlex } from 'naive-ui'
import { default as theme0 } from '../themes'

const configProviderProps = computed(() => {
  return {
    theme: { dark: darkTheme }[theme0.currentTheme.value],
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

const $confirm = (options: DialogOptions) => {
  return $dialog.warning({
    // title: () => <div style="visibility: hidden">title</div>,
    titleStyle: { visibility: 'hidden' },
    content: () =>
        <NFlex>
          { typeof options.content === 'function' ? options.content() : options.content }
        </NFlex>,
    contentStyle: { fontSize: '16px' },
    showIcon: false,
    positiveText: '确 定',
    negativeText: '取 消',
    positiveButtonProps: { type: 'primary', size: 'medium' },
    negativeButtonProps: { type: 'primary', size: 'medium' },
    onPositiveClick: options.onPositiveClick,
  })
}

const $alert = () => {
}

export default { $message, $notification, $dialog, $loading, $confirm, $alert }
