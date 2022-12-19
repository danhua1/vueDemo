/*
 * @Author: dsy
 * @Date: 2022-10-17 11:29:10
 * @LastEditors: dsy
 * @LastEditTime: 2022-12-14 10:36:34
 * @Description: Do not edit
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import HomeView from "./views/HomeView.vue"
import router from './router'

import './assets/main.css'


const app = createApp(App)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.config.errorHandler = (err) => {
    console.log(err)
  }

app.mount('#app')
