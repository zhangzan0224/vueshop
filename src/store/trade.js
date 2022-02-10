// 导入api获取数据
import { reqFindUserAddressList, reqOrderInfo } from '@/api'

const state = {
  addressList: [], // 用户地址信息
  orderInfo: {} // 用户的商品清单数据
}
const mutations = {
  GET_FIND_USER_ADDRESS_LIST (state, addressList) {
    state.addressList = addressList
  },
  GET_ORDER_INFO (state, orderInfo) {
    state.orderInfo = orderInfo
  }
}
const actions = {
  // 获取用户地址信息
  async getFindUserAddressList ({ commit }) {
    const getFindUserAddressListRes = await reqFindUserAddressList()
    // console.log(getFindUserAddressListRes)
    if (getFindUserAddressListRes.code === 200) {
      commit('GET_FIND_USER_ADDRESS_LIST', getFindUserAddressListRes.data)
    }
  },
  // 获取商品清单的数据
  async getOrderInfo ({ commit }) {
    const getOrderInfoRes = await reqOrderInfo()
    if (getOrderInfoRes.code === 200) {
      commit('GET_ORDER_INFO', getOrderInfoRes.data)
    }
  }
}
// 简化数据而生
const getters = {
  // 购物的详情信息
  detailArrayList (state) {
    return state.orderInfo.detailArrayList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
