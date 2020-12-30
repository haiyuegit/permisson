<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="medium">
        <el-form-item label="原密码" prop="currentPassword">
            <el-input v-model="form.currentPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
    
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="cancle">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>

export default {
    name: '',
    components:{

    },
    data () {
        let validateMix = (rule, value, callback) => {
            let re =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
            let result= re.test(value);
            if(result){
                callback();
            }else{
                callback(new Error());
            }
        }
        return {
            title: '',
            form:{
                currentPassword:"",
                password:""
            },
            rules:{
                currentPassword: [
                    { required: true, message: '请输入原密码', trigger: 'blur' },
                    { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min:8,max: 16, validator:validateMix,  message: '8-16位，必需同时包含大写字母、小写字母、数字', trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
        onSubmit(){
          this.$refs['form'].validate((valid) => {
            if (valid) {
                // // this.form["parentId"] = this.form.parentId.join();
                // let params = JSON.parse(JSON.stringify(this.form))
                // console.log('---',params)
                this.$emit("submitAddPerm",this.form)
                this.$refs['form'].resetFields();
            } else {
                return false;
            }
            });
        },
        cancle(){
            this.$emit('close')
        }
    }
}
</script>
<style lang='less' scoped>

</style>