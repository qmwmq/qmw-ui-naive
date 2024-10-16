import type { GlobalThemeOverrides } from 'naive-ui'

const borderColor = '#ddd'

export const common: GlobalThemeOverrides = {
  common: {
    // primary
    primaryColor: '#2196F3',
    primaryColorHover: '#42A5F5',
    primaryColorPressed: '#2962FF',
    primaryColorSuppl: '#42A5F5',
    // info
    infoColor: '#00BCD4',
    infoColorHover: '#26C6DA',
    infoColorPressed: '#00B8D4',
    infoColorSuppl: '#26C6DA',
    // success
    successColor: '#4CAF50',
    successColorHover: '#66BB6A',
    successColorPressed: '#00C853',
    successColorSuppl: '#66BB6A',
    // warning
    warningColor: '#CDDC39',
    warningColorHover: '#D4E157',
    warningColorPressed: '#AEEA00',
    warningColorSuppl: '#D4E157',
    // error
    errorColor: '#F44336',
    errorColorHover: '#EF5350',
    errorColorPressed: '#D50000',
    errorColorSuppl: '#EF5350',
    // borderColor: borderColor,
  },
  Layout: {
    // headerBorderColor: borderColor,
    // siderBorderColor: borderColor
  },
  DataTable: {
    tdPaddingSmall: '6px 8px',
    lineHeight: 1.5,
    // borderColor: 'black',
  },
  Dialog: {
    // padding: 0,
  },
  // List: {
  //   borderColorModal: '#cacaca'
  // },
  Form: {
    feedbackHeightMedium: '10px'
  },
}

export const dark: GlobalThemeOverrides = {
  Layout: {
    colorEmbedded: '#000',
  },
}

export const light: GlobalThemeOverrides = {
  Layout: {
    colorEmbedded: '#f5f5f5'
    // headerBorderColor: borderColor,
    // siderBorderColor: borderColor
  },
  // List: {
  //   borderColorModal: '#cacaca'
  // },
}