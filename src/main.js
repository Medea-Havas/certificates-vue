import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import dayjs from 'dayjs'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import es from 'element-plus/dist/locale/es.mjs'
import './assets/main.css'

dayjs.Ls.es ??= {}
dayjs.Ls.es.weekStart = 1

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, {
  locale: es
})
app.use(createPinia())
app.use(router)

app.mount('#app')
