<template>
  <div>
    <typeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor" />
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Brand from './Brand/Brand'
import Floor from './Floor/Floor'
import Like from './Like/Like'
import ListContainer from './ListContainer/ListContainer'
import Rank from './Rank/Rank'
import TodayRecommend from './TodayRecommend/TodayRecommend'
export default {
  name: 'Home',
  components: {
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    TodayRecommend
  },
  mounted () {
    // 通知vuex去后台获取floorList,不能在floor内部去发,因为模拟数据是两条数据,两层的数据
    this.$store.dispatch('getFloorData')
    // !放在路由里去获取用户的信息,要不从主页切换到其他的页面,一刷新就没有了用户信息
    // this.$store.dispatch('getUserInfo')
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList
    })
  }
}
</script>

<style lang="less" scoped></style>
