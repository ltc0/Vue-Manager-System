import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import {router} from './router/index'
import { createPinia } from 'pinia'
import "./permission"
import "nprogress/nprogress.css"
const app = createApp(App)

//全局引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

//自定义指令
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
//自定义指令
import permission from './directives/permission.js'
app.use(permission) 

app.mount('#app')

