import { computed } from 'vue'
import { createDiscreteApi, darkTheme, type DialogOptions, lightTheme, NFlex } from 'naive-ui'
import QnIcon, { type Icon } from '../components/QnIcon.vue'
import theme from '../themes'
import { common } from '../themes/bootstrap.ts'

const configProviderProps = computed(() => {
  return {
    theme: { dark: darkTheme, light: lightTheme }[theme.currentTheme.value],
    themeOverrides: theme.themeOverrides.value
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

const dialog = (options: DialogOptions) => {
  const icon = {
    success: 'check-filled',
    warning: 'warning-filled',
    error: 'close-filled',
  }[options.type as string] || 'info-filled'

  const color = {
    success: common.common?.successColor,
    warning: common.common?.warningColor,
    error: common.common?.errorColor,
  }[options.type as string] || common.common?.infoColor

  return $dialog.create({
    title: () => <div style="visibility: hidden">title</div>,
    content: () =>
        <NFlex align="center" size="small">
          <QnIcon size={ 30 } icon={ icon as Icon } color={ color }></QnIcon>
          <div>
            { typeof options.content === 'function' ? options.content() : options.content }
          </div>
        </NFlex>,
    type: options.type,
    contentStyle: { fontSize: '16px' },
    showIcon: false,
    positiveText: options.positiveText,
    negativeText: options.negativeText,
    positiveButtonProps: { type: 'primary', size: 'medium' },
    negativeButtonProps: { type: 'primary', size: 'medium' },
    onPositiveClick: options.onPositiveClick,
  })
}

const $confirm = (options: DialogOptions) => {
  options.positiveText = options.positiveText || '确 定'
  options.negativeText = options.negativeText || '取 消'
  return dialog(options)
}

const $alert = (options: DialogOptions) => {
  options.positiveText = options.positiveText || '确 定'
  return dialog(options)
}

export default { $message, $notification, $dialog, $loading, $confirm, $alert }
