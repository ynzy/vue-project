import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/Recommend'
import Hot from '@/components/Hot'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MRecommend',
      redirect: '/recommend'  //重定向
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/hot',
      name: 'Hot',
      component: Hot
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ],
  linkActiveClass:'active'
})
