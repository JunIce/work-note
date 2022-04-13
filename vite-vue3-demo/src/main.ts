import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import router from '@/router/index'
import { key, store } from '@/store'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
app.use(Antd).use(router).use(store, key).mount('#app')
