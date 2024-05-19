import { createI18n } from 'vue-i18n'

import br from './locale/br.ts'
import en from './locale/en.ts'

function loadLocaleMessages() {
    const locales = [{ en: en }, { br: br }]
    const messages = {}
    locales.forEach(lang => {
        const key = Object.keys(lang)
        messages[key] = lang[key]
    })
    return messages
}

export default createI18n({
    locale: 'br',
    fallbackLocale: 'en',
    messages: loadLocaleMessages()
})