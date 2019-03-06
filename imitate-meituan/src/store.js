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
  setshoplist(state, data) {
    state.shop.list = state.shop.list.concat(data)
  },
  nextpage(state){
    state.shop.page++;
  }
}

export default new Vuex.Store({
  state,
  mutations
})
