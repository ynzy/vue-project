import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

Vue.use(Vuex)

const types = {
  SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED', // 是否认证通过
  SET_USER: 'SET_USER' // 用户信息
}

const state = { // 需要维护的状态
  isAutnenticated: false,  // 是否认证
  user: {}   // 存储用户信息
}

const getters ={
  isAutnenticated: state => state.isAutnenticated,
  user: state => state.user
}
const actions ={
  setIsAutnenticated: ({commit}, isAutnenticated) => {
    commit(types.SET_IS_AUTNENTIATED, isAutnenticated)
  },
  setUser: ({commit}, user ) => {
    commit(types.SET_USER, user)
  },
  //退出登录
  clearCurrentState: ({ commit }) => {
    commit(types.SET_IS_AUTNENTIATED, false)
    commit(types.SET_USER, null)
  }
}
const mutations ={
  [types.SET_IS_AUTNENTIATED](state, isAutnenticated) {
    if (isAutnenticated) {
      state.isAutnenticated = isAutnenticated
    }else {
      state.isAutnenticated = false
    }
  },
  [types.SET_USER](state, user) {
    if (user) {
      state.user = user
    }else {
      state.user = {}
    }
  }
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
