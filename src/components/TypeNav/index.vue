<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委托和事件代理 -->
      <div @mouseleave="resetCurrent()" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 判断二三级菜单是否需要展示 -->
        <transition name="sort">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="changeCurrentIndex(index)"
                :class="{ cur: currentIndex === index }"
              >
                <h3>
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二三级菜单 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none'
                  }"
                >
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入lodash:是把lodash全部封装好的函数全都引入进来了
// 按需引入：只是引入节流函数，其他的函数没有引入（模块），这样做的好处是，当你打包项目的时候体积会小一些
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data () {
    return {
      currentIndex: -1,
      isShow: true
    }
  },
  computed: {
    ...mapState({ categoryList: (state) => state.home.categoryList })
  },
  methods: {
    changeCurrentIndex: throttle(function (index) {
      this.currentIndex = index
    }, 100),
    resetCurrent () {
      if (this.$route.path !== '/home') {
        this.isShow = false
      }
      this.currentIndex = -1
    },
    goSearch (event) {
      // event.target:获取到的是出发事件的元素(div、h3、a、em、dt、dl)
      const element = event.target
      // console.log(element.dataset)
      const { categoryname, category1id, category2id, category3id } =
        element.dataset
      if (categoryname) {
        const toAddress = { name: 'Search' }
        // 制作push的参数对象
        // Object.defineProperty(toAddress, 'name', { value: 'Search' })
        const queryObj = { categoryName: categoryname }
        if (category1id) {
          queryObj.category1Id = category1id
        } else if (category2id) {
          queryObj.category2Id = category2id
        } else {
          queryObj.category3Id = category3id
        }
        toAddress.query = queryObj
        // 判断：如果路由跳转的时候，带有params参数，捎带脚传递过去
        if (this.$route.params) {
          toAddress.params = this.$route.params
        }
        // 路由跳转
        this.$router.push(toAddress)
      }
    },
    enterShow () {
      this.isShow = true
    }
  },
  mounted () {
    // 当组件挂载完毕，让show属性变为false
    // 如果不是Home路由组件，将typeNav进行隐藏
    if (this.$route.path != '/home') {
      console.log('111')
      this.isShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background: skyblue;
        }
      }
    }
    //过渡动画的样式
    //过渡动画开始状态（进入）
    .sort-enter,
    .sort-leave-to {
      height: 0px;
    }
    // 过渡动画结束状态（进入）
    .sort-enter-to,
    .sort-leave {
      height: 461px;
    }
    // 定义动画时间、速率
    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
