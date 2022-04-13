import { App } from 'vue'
// import { ElIcon, ElLoading, ElCard, ElButton } from 'element-plus'
import { Button, Card } from 'ant-design-vue'
/**
 * 按需导入 Element Plus 组件
 * Vite 插件 https://github.com/element-plus/vite-plugin-element-plus
 * @param app {App}
 */
export default function styleImport(app: App) {
  ;[Button, Card].forEach((v) => {
    app.use(v)
  })
  return app
}
