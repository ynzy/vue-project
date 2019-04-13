import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Nofind from './views/404'
import Home from './views/Home.vue'
import InfoShow from './views/InfoShow.vue'
import FoundList from './views/FoundList'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        { path: '', component: Home },
        { path: '/home', name: 'home', component: Home },
        { path: '/infoshow', name: 'infoshow', component: InfoShow },
        { path: '/foundlist', name: 'foundlist', component: FoundList }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    { path: '*', name: '/404', component: Nofind },
  ]
})

//路由守卫,判断token是否过期
router.beforeEach((to, from, next) => {
  //判断本地存储token是否过期
  const isLogin = localStorage.eleToken ? true : false
  if(to.path == "/login" || to.path == '/register') {
    next();
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router