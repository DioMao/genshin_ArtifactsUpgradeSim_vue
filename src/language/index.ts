import { createI18n } from 'vue-i18n'; //引入vue-i18n组件
import zh from './zh';
import en from './en';

const i18n = createI18n({
  locale: window.localStorage.language || 'zh',
  globalInjection: true,
  legacy: false, // you must specify 'legacy: false' option
  messages: {
    zh: zh,
    en: en
  }
});

export default i18n;
