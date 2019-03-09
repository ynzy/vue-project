import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import FooterGuide from '@/components/FooterGuide/FooterGuide'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FooterGuide',
      component: FooterGuide
    }
  ]
})
