/**
 * Copyrigth 2021-2022 DioMao (https://github.com/DioMao/genshin_ArtifactsUpgradeSim_vue/graphs/contributors)
 * Licensed under GPL3.0 (https://github.com/DioMao/genshin_ArtifactsUpgradeSim_vue/blob/master/LICENSE)
 */

import {createApp, ComponentCustomProperties} from 'vue';
import store from './store/store';
import router from './router/router';
import App from './App.vue';
// import * as echarts from 'echarts'
import axios from 'axios';
import i18n from './language';
import {ArtifactsSim, artiConst, IDB, initArtifactSim} from './utils/ArtifactsUpgradeSim_module';
// 全局样式
import 'bootstrap/dist/css/bootstrap.min.css';

// 创建实例
const app = createApp(App);

// app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$artifact = ArtifactsSim;
app.config.globalProperties.$db = IDB;
app.config.globalProperties.$artiConst = artiConst;

app.use(router).use(store).use(i18n);

// 初始化模拟器数据后挂载实例
initArtifactSim()
  .then(() => {
    app.mount('#app');
    window.scrollTo(0, 1);
  })
  .catch((err: any) => {
    console.log(err);
    if (confirm('Initialization failed, please try to clear local cache.\n数据初始化失败，请尝试清除本地缓存。')) {
      // 清除缓存
      window.localStorage.clear();
      IDB.delete();
      location.reload();
    }
  });

// router.isReady().then(app.mount("#app"));

// declare
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: typeof axios;
    $artifact: typeof ArtifactsSim;
    $db: typeof IDB;
    $artiConst: typeof artiConst;
  }
}
