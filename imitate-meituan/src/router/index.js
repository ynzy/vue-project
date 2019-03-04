import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/Pages/Main.vue'
import Home from '@/Pages/Home/Home'
import Recent from '@/Pages/Recent/Recent'
import Guang from '@/Pages/Guang/Guang'
import Order from '@/Pages/Order/Order'
import Me from '@/Pages/Me/Me'

import MeShi from '@/Pages/Home/Meishi.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children: [  //TODO: 设置子路由
        {
          path: '',  //设置空路由，父级匹配一个子路由
          name: 'main',
          component: Home
        },
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/recent',
          name: 'recent',
          component: Recent
        },
        {
          path: '/guang',
          name: 'guang',
          component: Guang
        },
        {
          path: '/order',
          name: 'order',
          component: Order
        },
        {
          path: '/me',
          name: 'me',
          component: Me
        }
      ]
    },
    {
      path: '/meishi',
      name: 'meishi',
      component: MeShi
    }
    

  ]
})
