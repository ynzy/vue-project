/*
直接更新state的多个方法的对象
 */
import Vue from 'vue'
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
    [RECEIVE_USER_INFO](state,{userInfo}) {
        state.userInfo = userInfo
    },
    [RESET_USER_INFO](state) {
        state.userInfo = {}
    },

    [RECEIVE_INFO](state,{info}) {
        state.info = info
    },
    [RECEIVE_RATINGS](state,{ratings}) {
        state.ratings = ratings
    },
    [RECEIVE_GOODS](state,{goods}) {
        state.goods = goods
    },

    [INCREMENT_FOOD_COUNT](state,{food}) {
        if(!food.count) { //第一次增加
        // food.count = 1  // 新增属性(没有数据绑定)
    
        //TODO: 在已绑定的数据中添加新的数据进行绑定
        Vue.set(food, 'count', 1)  //让新增的属性也有数据绑定
        } else {
            food.count++
        }
    },
    [DECREMENT_FOOD_COUNT](state,{food}) {
        if(food.count) {  //只有有值大于0才减
          food.count--
        }
        
    },
}

export default  mutations
