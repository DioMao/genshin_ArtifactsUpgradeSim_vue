import { createApp } from 'vue'
import store from './store/store'
import router from './router/router'
import App from './App.vue'
// import * as echarts from 'echarts'
import axios from 'axios'
import i18n from './language'
import { ArtifactsSim,artiConst } from './utils/ArtifactsUpradeSim_module'
// 全局样式
import 'bootstrap/dist/css/bootstrap.min.css'

// 创建实例
const app = createApp(App)

// app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$axios = axios
app.config.globalProperties.$artifact = ArtifactsSim
app.config.globalProperties.$artiConst = artiConst

app.use(router)
    .use(store)
    .use(i18n)

router.isReady().then(app.mount('#app'))
// app.mount('#app')
