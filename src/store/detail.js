import Vue from 'vue'
import Vuex from 'vuex'
// 导入api获取数据
import { reqGetDetail, reqAddOrUpdateShopCart } from '@/api'

Vue.use(Vuex)

const state = {
  detailInfo: {}
}
const mutations = {
  GET_DETAIL_BY_SKU_ID (state, detailInfo) {
    state.detailInfo = detailInfo
  }
}
const actions = {
  async getDetailBySkuId ({ commit }, skuID) {
    const getDetailRes = await reqGetDetail(skuID)
    // console.log(getDetailRes)
    if (getDetailRes.code === 200) {
      commit('GET_DETAIL_BY_SKU_ID', getDetailRes.data)
    }
  },
  // 添加或者更改购物车的事件
  async addOrUpdateShopCart ({ commit }, { skuId, skuNum }) {
    const addOrUpdateShopCartRes = await reqAddOrUpdateShopCart({
      skuId,
      skuNum
    })
    console.log(addOrUpdateShopCartRes)
  }
}
// 简化数据而生
const getters = {
  categoryView (state) {
    // 注意,state.detailInfo可能返回数据不对,所以会出现undefined 因为state.detailInfo是个空对象 所以它的categoryView 可能没有值,最起码对象的value值为未定义
    // 可以保证当前计算出来的最起码是个空对象
    return state.detailInfo.categoryView || {}
  },
  skuInfo (state) {
    return state.detailInfo.skuInfo || {}
  },
  spuSaleAttrList (state) {
    return state.detailInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
