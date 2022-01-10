<template>
  <div class="swiper-container" ref="floor1Swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in carouselList"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: ['carouselList'],
  watch: {
    carouselList: {
      // 立即监听,不管你的数据有没有变化,上来就监听一次
      // 为什么watch监听不到floor的数据,因为floor的数据是父组件传递过来的,数据不会变化,所以需要立即监听
      immediate: true,
      handler () {
        // 只能监听到数据已经有了 但是v-for动态渲染结构我们还是没有办法确定的，因此还是需要用nextTick
        this.$nextTick((_) => {
          var mySwiper = new Swiper(this.$refs.floor1Swiper, {
            loop: true,
            autoplay: true, // 可选选项，自动滑动
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              // 点击小球的时候也切换图片
              clickable: true
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          })
        })
      }
    }
  }
}
</script>

<style></style>
