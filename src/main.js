import { createApp } from 'vue'
import store from './store/store'
import router from './router/router'
import App from './App.vue'
import * as echarts from 'echarts'
import axios from 'axios'
import { ArtifactsSim,artiConst } from './utils/ArtifactsUpradeSim_module@0.1.9'
// 全局样式
// import './style/common.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

// 创建实例
const app = createApp(App)

app.config.globalProperties.$axios = axios
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$artifact = ArtifactsSim
app.config.globalProperties.$artiConst = artiConst

app.use(router)
app.use(store)

// router.isReady().then(app.mount('#app'))
app.mount('#app')
