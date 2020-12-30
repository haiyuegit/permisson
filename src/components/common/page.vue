<template>
  <div v-if="total" class="page_bottom">
      <el-pagination
          :current-page="pageNum"
          :page-size="10"
          :page-sizes="[10, 20, 30, 40]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>
  </div>  
</template>
<script>

export default {
    props:['total','pageNum'],
    data () {
        return {
            
        }
    },
    methods: {
        handleSizeChange(val) {//切换每页显示条数
            this.$emit("handleSizeChangeToPar",val);
        },
        handleCurrentChange(val) {//切换当前页
            this.$emit("handleCurrentChangeToPar",val);
        },
    }
}
</script>
<style lang='less' scoped>

</style>