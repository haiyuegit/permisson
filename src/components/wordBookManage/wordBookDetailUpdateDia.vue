<template>
  <div>
      <el-form :label-position="labelPosition" :label-width="formLabelWidth">
        <el-form-item label="值">
          <el-input v-model="updform.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="updform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="序号">
          <el-input v-model="updform.sortNum" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update()">确 定</el-button>
      </div>
  </div>
</template>
<script>

export default {
    props:['updform'],
    data () {
        return {
            formLabelWidth: '50px',
            labelPosition:'center'
        }
    },
    methods: {
      cancel(){
        this.$emit("cancelUpdTopar");
      },
      update(){
        this.$emit("updateTopar",this.updform);
      }
    }
}
</script>
<style lang='less' scoped>
.dialog-footer {
  text-align: center;
}
</style>