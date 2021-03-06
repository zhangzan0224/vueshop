import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入elementui
import { MessageBox } from 'element-ui'
// 导入api工具
import * as API from '@/api'
// 定义全局组件：在入口文件注册一次之后，在任何组件当中都可以使用
import typeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 导入mock的服务器接口
// 只是执行这个js文件,不需要使用其中的函数等等
import '@/mock/mockServer'
// 引入swiper 的css样式,在全局引用,因为很多模块使用
import 'swiper/css/swiper.css'
// 导入图片懒加载插件
import loadingImg from '@/assets/1.gif'
import VueLazyload from 'vue-lazyload'
// 引用表单验证插件
import '@/plugins/validate'
Vue.use(VueLazyload, {
  loading: loadingImg
})
// element ui 按需引入
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
// console.log(API)
// 全局组件：第一个参数 组件名字  第二个参数：那个组件
Vue.component(typeNav.name, typeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  // 安装全局事件总线
  beforeCreate () {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  render: (h) => h(App)
}).$mount('#app')
