import { createI18n } from "vue-i18n"; //引入vue-i18n组件

const i18n = createI18n({
  locale: "zh",
  globalInjection: true,
  legacy: false, // you must specify 'legacy: false' option
  messages: {
    zh: require("./zh.js"),
    en: require("./en.js"),
  },
});

export default i18n;
