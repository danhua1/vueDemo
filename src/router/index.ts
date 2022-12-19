import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GetOurToken from '../views/getToken.vue'
import GetRsToken from '../views/rsToken.vue'
import GetTwoDistance from '../views/getTwoDistance.vue'

console.log(import.meta.env)
console.log(import.meta.env.BASE_URL)
console.log(import.meta.env.BASE_URL1)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    // {
    //   path: '/getToken',
    //   name: 'getToken',
    //   component: () => import('../views/getToken.vue')
    // },
    {
      path: '/getToken',
      name: 'getToken',
      component: GetOurToken
    },
    {
      path: '/rsToken',
      name: 'rsToken',
      component: () => import('../views/rsToken.vue')
    },
    {
      path: '/getTwoDistance',
      name: 'getTwoDistance',
      component: () => import('../views/getTwoDistance.vue')
    },
    {
      path: '/changeStrToJson',
      name: 'changeStrToJson',
      component: () => import('../views/changeStrToJson.vue')
    },
  ]
})

export default router
