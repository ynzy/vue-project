// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

//引入axios
import axios from 'axios';
Vue.prototype.axios = axios;
//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
//引入museui
import './MuseUi';
//引入自定义字体图标
import '@/assets/icomt/style.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',

})


