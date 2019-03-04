// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index'

//按需引入
import './vant-components'

//导入所有组件
// import Vant from 'vant';
// import 'vant/lib/index.css';

// Vue.use(Vant);

Vue.prototype.$axios = axios  //将axios添加到vue的原型上，所有vue实例上都可以使用axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
