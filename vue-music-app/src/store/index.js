import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import state from './state'
import mutations from './mutations'
import actions from './action'
Vue.use(Vuex)


export default new Vuex.Store({
    getters,
    state,
    mutations,
    actions,
})