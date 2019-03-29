/*
包含多个基于state的getter计算属性的对象
 */

const getters = {
    //计算总数量，reduce()函数进行累加
  totalCount(state) {  
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
  },
  //计算总价格
  totalPrice(state) {
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
  },
}

export default getters
