// 导入api
import { reqGetCartList, reqDeleteCart, reqUpdateCheckedById } from '@/api'
const state = {
  // 获取到的购物车数据
  cartList: []
}
const mutations = {
  GET_CART_LIST (state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  async getCartList ({ commit }) {
    const cartListRes = await reqGetCartList()
    // console.log(cartListRes)
    if (cartListRes.code === 200) {
      commit('GET_CART_LIST', cartListRes.data)
    }
  },
  async deleteCart ({ commit }, skuId) {
    const deleteCartRes = await reqDeleteCart(skuId)
    if (deleteCartRes.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 更改购物车选中的状态
  async updateCheckedById ({ commit }, { skuId, isChecked }) {
    const updateCheckedByIdRes = await reqUpdateCheckedById(skuId, isChecked)
    // console.log(updateCheckedByIdRes)
    if (updateCheckedByIdRes.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 删除全部选中的产品
  deleteAllCheckedCart ({ dispatch, getters }) {
    // console.log(getters.cartInfoList)
    // 获取购物车中全部的产品
    //! Promise.all() 方法接收一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入，并且只返回一个Promise实例
    const PromiseAll = []
    getters.cartInfoList.forEach((item) => {
      const promise =
        item.isChecked == 1 ? dispatch('deleteCart', item.skuId) : ''
      // !将每个返回的promise值推到数组中,然后实用promise.all返回一个promise
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  },
  // 修改全部产品的状态
  updateAllCartChecked ({ dispatch, getters }, isChecked) {
    // console.log(getters)
    // console.log(isChecked)
    const promiseAll = []
    getters.cartInfoList.forEach((item) => {
      const promise = dispatch('updateCheckedById', {
        skuId: item.skuId,
        isChecked
      })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}
const getters = {
  cartInfoList (state) {
    const cartInfoList = []
    state.cartList.forEach((item) => {
      item.cartInfoList.forEach((i) => {
        cartInfoList.push(i)
      })
    })
    // console.log(cartInfoList)
    return cartInfoList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
