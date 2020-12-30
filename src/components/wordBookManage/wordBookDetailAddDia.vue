<template>
  <div>
      <el-form :label-position="labelPosition" :label-width="formLabelWidth">
        <el-form-item label="值">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="序号">
          <el-input v-model="form.sortNum" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
  </div>
</template>
<script>

export default {
    data () {
        return {
            form: {//新增表单参数
              code:'',
              sortNum: '',
              name:''
            },
            formLabelWidth: '50px',
            labelPosition:'center'
        }
    },
    methods: {
      cancel(){
        this.$emit("cancelTopar");
        this.form={//新增表单参数
          code:'',
          sortNum: '',
          name:''
        }
      },
      add(){
        this.$emit("addTopar",this.form);
        this.form={//新增表单参数
          code:'',
          sortNum: '',
          name:''
        }
      }
    }
}
</script>
<style lang='less' scoped>
.dialog-footer {
  text-align: center;
}
</style>