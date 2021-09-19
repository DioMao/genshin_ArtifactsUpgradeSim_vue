import { createApp } from 'vue'
import store from './store/store'
import router from './router/router'
import App from './App.vue'
// 全局样式
import './style/common.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

// 创建实例
const app = createApp(App)

app.use(router)
app.use(store)

// router.isReady().then(app.mount('#app'))
app.mount('#app')
