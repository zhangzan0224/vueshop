<template>
  <div id="app">
    <Header />
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home与Search可见的，但是Login|Register不可见 -->
    <!-- 利用路由元信息解决当前问题好处：一行代码就可以解决 -->
    <Footer v-show="!$route.meta.isHideFooter" />
  </div>
</template>
<script>
// 引入Header与Footer非路由组件
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  components: {
    Header,
    Footer
  },
  async mounted () {
    // 三级菜单可以放在app中,要不当typenav去挂载的时候每次都发送一次请求
    this.$store.dispatch('getBaseCategoryList')
  }
}
</script>

<style lang="less"></style>
