/*
直接更新state的多个方法的对象
 */

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'

const mutations = {
    [RECEIVE_ADDRESS](state,{address}) {
        state.address = address
    },

    [RECEIVE_CATEGORYS](state,{categorys}) {
        state.categorys = categorys
    },

    [RECEIVE_SHOPS](state,{shops}) {
        state.shops = shops
    },
}

export default  mutations
