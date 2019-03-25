import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import FooterGuide from '@/components/FooterGuide/FooterGuide'

import Msite from '@/pages/Msite/Msite'
import Order from '@/pages/Order/Order'
import Profile from '@/pages/Profile/Profile'
import Search from '@/pages/Search/Search'
import Login from '@/pages/Login/Login'

import Shop from '@/pages/Shop/Shop'
import ShopGoods from '@/pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from '@/pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from '@/pages/Shop/ShopInfo/ShopInfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      name: 'msite',
      component: Msite,
      meta: {  //配置元数据确定是否显示footer
        showFooter: true
      }
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/goods'
        },
      ]
    },
  ]
})
