<!--
 * @Description:aaa
 * @Version: 2.0
 * @Author: ZhangZan
 * @Date: 2023-03-09 13:17:17
 * @LastEditors: ZhangZan
 * @LastEditTime: 2023-03-09 13:18:41
-->
<template>
  <div style="background: #ccc; height: 50px;">
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button>给BABA钱: 100</button>
  </div>
</template>

<script>
export default {
  name: 'DaughterT',
  data () {
    return {
      money: 20000
    }
  },

  methods: {

  }
}
</script>
