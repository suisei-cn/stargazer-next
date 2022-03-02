import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en'
import zh from './zh'

export const resources = { en, zh }
export const defaultNS = 'translation'

i18n.use(initReactI18next).init({
  resources,
  defaultNS,
  lng: 'en',
  fallbackLng: 'en'
})

export default i18n
