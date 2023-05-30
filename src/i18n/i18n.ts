import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const locales = {
  vi: 'Tiếng Việt',
  en: 'English'
}
const resources = {
  en: {
    translation: {
      'all categories': 'All Categories'
    }
  },
  vi: {
    translation: {
      'all categories': 'Tất Cả Danh Mục'
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  }
})

export default i18n
