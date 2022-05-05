import { createApp } from 'vue'
import App from './App.vue'
import TdDesign from "tdesign-vue-next"
import "./styles/index.less"
// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';

createApp(App)
    .use(TdDesign)
    .mount('#app')
