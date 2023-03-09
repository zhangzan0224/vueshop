<!--
 * @Description: 级联选择器首层单选,其他可以多选
 * @Version: 2.0
 * @Author: ZhangZan
 * @Date: 2023-03-08 13:39:39
 * @LastEditors: ZhangZan
 * @LastEditTime: 2023-03-08 14:28:08
-->
<template>
  <div class="aaa">
    <el-cascader
      v-model="youHuiQuanValue"
      size="mini"
      :options="options1"
      :props="props"
      collapse-tags
      @change="changeYouHuiQuan"
    >
    </el-cascader>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      props: { multiple: true },
      youHuiQuanValue: [],
      shareScopeEnd: [],
      options1: [
        { value: 1, label: '通用券' },
        {
          value: 2,
          label: '商品券',
          children: [
            { value: 22, label: '手机' },
            { value: 23, label: '电脑' },
            { value: 24, label: '电视' },
            { value: 25, label: '家电' }
          ]
        }
      ]
    }
  },
  // 计算属性
  computed: {},
  watch: {},
  mounted () {},
  methods: {
    changeYouHuiQuan (val) {
      // console.log(val)
      let changeFlag = false
      let changeItem = null
      if (this.shareScopeEnd.length === 0) {
        this.youHuiQuanValue = val
      } else {
        this.youHuiQuanValue.forEach(item => {
          if (item[0] !== this.shareScopeEnd[0][0]) {
            // 一级标签不同的情况
            changeFlag = true
            changeItem = item
          }
        })
      }
      if (changeFlag) {
        this.youHuiQuanValue = []
        this.youHuiQuanValue.push(changeItem)
      }
      this.shareScopeEnd = this.youHuiQuanValue
    }
  }
}

</script>
