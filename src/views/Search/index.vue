<template>
  <div>
    <typeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removecategoryName">x</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">x</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1]
              }}<i @click="removeTrademark">x</i>
            </li>
            <!-- 平台的售卖属性 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(':')[1]
              }}<i @click="removeAttrValue(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a>
                    综合
                    <span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-DOWN': isDesc, 'icon-UP': isAsc }"
                    >
                    </span>
                  </a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a>
                    价格
                    <span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-DOWN': isDesc, 'icon-UP': isAsc }"
                    >
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{
                      good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页的位置 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :continues="5"
            :total="total"
            @getPageNo="getPageNo"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Search',
  data () {
    return {
      searchParams: {
        // 产品相应的id
        category1Id: '',
        category2Id: '',
        category3Id: '',
        // 产品的名字
        categoryName: '',
        // 搜索的关键字
        keyword: '',
        // 排序:初始状态应该是综合且降序
        order: '1:desc',
        // 第几页
        pageNo: 1,
        // 每一页展示条数
        pageSize: 3,
        // 平台属性的操作
        props: [],
        // 品牌
        trademark: ''
      }
    }
  },
  components: {
    SearchSelector
  },
  // 在挂载之前调用一次|可以在发请求之前将带有参数进行修改
  beforeMount () {
    // !在发请求之前，把接口需要传递参数，进行整理（在给服务器发请求之前，把参数整理好，服务器就会返回查询的数据）
    // assign可以把对象合并
    Object.assign(this.searchParams, this.$route.params, this.$route.query)
    // console.log('发送数据之前', this.searchParams)
  },
  methods: {
    getData () {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    //  移除分类面包屑的事件
    removecategoryName () {
      // 把带给服务器的参数置空了，还需要向服务器发请求
      // 带给服务器参数说明可有可无的：如果属性值为空的字符串还是会把相应的字段带给服务器
      // !但是你把相应的字段变为undefined，当前这个字段不会带给服务器
      // !删除分类名字,必须得把id也清空
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.getData()
      // 地址栏也需要需改：进行路由跳转(现在的路由跳转只是跳转到自己这里)
      // 严谨：本意是删除query，如果路径当中出现params不应该删除，路由跳转的时候应该带着
      if (this.$route.params) {
        this.$router.push({ name: 'Search', params: this.$route.params })
      }
    },
    // 移除关键字面包屑事件
    removeKeyword () {
      // 给服务器带的数据进行清理
      this.searchParams.keyword = undefined
      // 通知header组件清空key的值
      this.$bus.$emit('clear')
      // 重新获取数据
      this.getData()
      // 进行路由的跳转
      if (this.$route.query) {
        this.$router.push({ name: 'Search', query: this.$route.query })
      }
    },
    // ! 从子组件中将品牌信息传递过来
    trademarkInfo (trademark) {
      // 从子组件传值
      // console.log(trademark)
      // 整理品牌数据
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.getData()
    },
    // 移除品牌事件
    removeTrademark () {
      this.searchParams.trademark = undefined
      this.getData()
    },
    // 移除售卖属性
    removeAttrValue (index) {
      // 移除售卖属性之后再次发送请求
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    // 售卖属性的回调函数,从子组件取值
    attrInfo (attr, attrValue) {
      // 商品属性的数组: ["属性ID:属性值:属性名"]示例: ["2:6.0～6.24英寸:屏幕尺寸"]
      const props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      // console.log(props)
      // 需判断这个元素有没有之前的元素 if语句只有一行代码可以省略花括号
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props)
      }
      // 再次发送请求
      this.getData()
    },

    // 排序
    changeOrder (flag) {
      const originFlag = this.searchParams.order.split(':')[0]
      const originType = this.searchParams.order.split(':')[1]
      let newOrder = ''
      // 初始和总和的相等
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originType == 'desc' ? 'asc' : 'desc'}`
      } else {
        newOrder = `${flag}:${'desc'}`
      }
      this.searchParams.order = newOrder
      this.getData()
    },

    // 丛子组件中获取页码
    getPageNo (pageNo) {
      // console.log(pageNo)
      this.searchParams.pageNo = pageNo
      // 重新获取数据
      this.getData()
    }
  },
  // 只能执行一次
  mounted () {
    // console.log(this.$route)
    this.getData()
  },
  computed: {
    ...mapGetters(['attrsList', 'goodsList']),
    isOne () {
      return this.searchParams.order.indexOf('1') !== -1
    },
    isTwo () {
      return this.searchParams.order.indexOf('2') != -1
    },
    isAsc () {
      return this.searchParams.order.indexOf('asc') != -1
    },
    isDesc () {
      return this.searchParams.order.indexOf('desc') != -1
    },
    // 获取search模块展示产品一共多少数据
    ...mapState({
      total: (state) => state.search.listData.total
    })
  },
  // 数据监听：监听组件实例身上的属性的属性值变化
  watch: {
    // 监听路由的信息是否发生变化，如果发生变化，再次发起请求
    $route (newValue, oldValue) {
      // 每一次请求完毕，应该把相应的1、2、3级分类的id置空的，让他接受下一次的相应1、2、3
      // 再次发请求之前整理带给服务器参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      // 再次发起ajax请求
      console.log(this.searchParams)
      this.getData()
      // 分类名字与关键字不用清理：因为每一次路由发生变化的时候，都会给他赋予新的数据,
      //! 路由如果刚开始点击一二级的菜单,需要进行重置,要不会把1 2 级的菜单id带过去,每次请求结束后,需要重置一下
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
