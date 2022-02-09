<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked === 1"
              @change="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <!-- <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li> -->
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handlerSkuNum('mins', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handlerSkuNum('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handlerSkuNum('plus', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 全选,需判断产品的数量和是否全部选中,可参考todoLists -->
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartInfoList.length > 0"
          @change="updateAllCartChecked"
        />

        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 按需引入：只是引入节流函数，其他的函数没有引入（模块），这样做的好处是，当你打包项目的时候体积会小一些
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  methods: {
    // 获取个人购物车的数据
    getData () {
      this.$store.dispatch('getCartList')
    },
    // 修改某一个产品的个数
    // flag 区分元素
    // disNum 形参是变化量(+1,-1,但是input传递的是最终的个数) 两个量,一个是变化的量,一个是最终的量
    // 在修改产品的个数的时候,需要用到函数的节流
    handlerSkuNum: throttle(async function (flag, disNum, cart) {
      switch (flag) {
        case 'plus':
          // 带给服务器变化的量
          disNum = 1
          break
        case 'mins':
          // 判断产品的个数是否大于1,才可以传递给服务器 -1 ,如果出现了小于1,则传递给服务器的个数为0 ,原封不动
          // if (cart.skuNum > 1) {
          //   disNum = -1
          // } else {
          //   disNum = 0
          // }
          disNum = cart.skuNum > 1 ? -1 : 0
          break
        case 'change':
          // 如果用户输入的量是非法的,带有汉子或者字母,则带给服务器的是0,
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
          } else {
            // 带给服务器的是变化的量
            disNum = parseInt(disNum) - cart.skuNum
          }
          break
      }
      // ! 向服务器发请求 修改购物车的数据
      try {
        await this.$store.dispatch('addOrUpdateShopCart', {
          skuId: cart.skuId,
          skuNum: disNum
        })
        // 重新获取数据,刷新视图
        this.getData()
      } catch (error) {
        alert(error)
      }
    }, 500),
    // 删除购物车的元素
    async deleteCartById (skuId) {
      try {
        // 如果删除成功,再次发起请求获取新的数据
        await this.$store.dispatch('deleteCart', skuId)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改购物车中某一个产品勾选的状态
    async updateChecked (cart, $event) {
      // console.log(cart, $event) $event的target有checked属性是布尔值
      const checked = $event.target.checked ? '1' : '0'
      // console.log(cart.skuId, checked)
      try {
        await this.$store.dispatch('updateCheckedById', {
          skuId: cart.skuId,
          isChecked: checked
        })
        // 重新获取数据
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // !删除全部选中的产品
    //! Promise.all() 方法接收一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入，并且只返回一个Promise实例
    async deleteAllCheckedCart () {
      try {
        // 获取仓库中的全部Promise.all方法的返回值
        await this.$store.dispatch('deleteAllCheckedCart')
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // !修改全部产品的选中状态
    async updateAllCartChecked (e) {
      // console.log(e.target.checked) 根据选中的状态确定1或者0
      const isChecked = e.target.checked ? '1' : '0'
      // console.log(isChecked)
      // 派发action
      try {
        await this.$store.dispatch('updateAllCartChecked', isChecked)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapGetters(['cartInfoList']),
    // 总价
    totalPrice () {
      let sum = 0
      this.cartInfoList.forEach((item) => {
        sum += item.skuPrice * item.skuNum
      })
      return sum
    },
    // 判断底部复选框是否勾选
    isAllChecked () {
      return this.cartInfoList.every((item) => item.isChecked === 1)
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        // .cart-list-con3 {
        //   width: 20.8333%;

        //   .item-txt {
        //     text-align: center;
        //   }
        // }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
