<template>
  <div class="pagination">
    <!-- <h2>{{ startNumAndEndNum }}'pageNo':{{ pageNo }}</h2> -->
    <button :disabled="pageNo === 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo === 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>
    <!-- 中间部分,跟start和end相关 -->

    <button
      v-for="(page, index) in startNumAndEndNumToArray"
      :key="index"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo === page }"
    >
      {{ page }}
    </button>
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo === totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo === totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'continues', 'total'],
  computed: {
    // 总共多少页
    totalPage () {
      // 向上取证
      return Math.ceil(this.total / this.pageSize)
    },
    // 连续的数字是谁 当前是8 那8 应该在中间,连续的应该是 6 7 8 9 10
    startNumAndEndNum () {
      // 定义两个变量存储起始数字和结束数字
      const { continues, pageNo, totalPage } = this
      let start = 0
      let end = 0
      //! 连续的页码是5,最少是五页,如果不够五页呢,需要进行判断
      if (continues > totalPage) {
        start = 1
        end = totalPage
      } else {
        // 但是start会出现负数和0,需进行纠正
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        if (start < 1) {
          start = 1
          end = continues
        }
        // end 会出现大于总页码的情况,同样需要纠正
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end }
    },
    startNumAndEndNumToArray () {
      const { start, end } = this.startNumAndEndNum
      const startNumAndEndNumArray = []
      for (var i = start; i <= end; i++) {
        startNumAndEndNumArray.push(i)
      }
      return startNumAndEndNumArray
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
