import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 按需导入封装的图片懒加载插件
import { lazyPlugin } from './dirctives'

import './common/element-plus.common.js'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
// 注册懒加载插件
// 使用方式：<img v-img-lazy="item.picture">

app.mount('#app')
