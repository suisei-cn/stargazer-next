import { EN } from './en'
import { resources, defaultNS } from './index'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: EN
  }
}
