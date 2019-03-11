import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var state = {
  shop: {
    num: 1,
    list: [],
    page: 0
  }
}

const mutations = {
  setshoplist(state, data) {  //设置商品列表数据
    state.shop.list = state.shop.list.concat(data)  //拼接数组
  },
  nextpage(state){  //下一页
    state.shop.page++;
  }
}

export default new Vuex.Store({
  state,
  mutations
})
