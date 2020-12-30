<template>
    <div class="xhead">
        <h1>运营管理平台</h1>
        <el-dropdown>
            <span class="el-dropdown-link">
                {{uname}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><div @click="person">个人信息</div></el-dropdown-item>
                <el-dropdown-item><div @click="resetPwd">修改密码</div></el-dropdown-item>
                <el-dropdown-item><div @click="logout">退出</div></el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <el-dialog
        :visible.sync="showPwdForm"
        center
        custom-class="limit_dialog"
        title="修改密码"
        width="40%">
        <editPwd 
            ref="pwdForm"
            v-on:close="closeAdd"
            v-on:submitAddPerm="submitAddPerm"
        ></editPwd>
        </el-dialog>
    </div>
</template>
<script>
import editPwd from '../common/editPwd'
export default {
    name: '',
    components:{
        editPwd
    },
    data () {
        return {
            title: '',
            uname:"",
            showPwdForm:false
        }
    },
    mounted() {
        this.uname = localStorage.getItem('uname') || "";
        this.$store.dispatch("getSystemListAction",{type:"platform"})
    },
    methods: {
        logout(){
            this.$logout()
        },
        person(){
            this.$router.push({path:"/"})
        },
        resetPwd(){
            console.log('reset pwd')
            this.showPwdForm = true
        },
        async submitAddPerm(data){
            let uname = localStorage.getItem("uname")
            let res = await this.$service.pwd({...data,username:uname});
            if(res){
                this.$message.success("修改成功")
                this.closeAdd()
            }
        },
        closeAdd(){
            this.showPwdForm = false;
            this.$refs.pwdForm.$refs['form'].resetFields() 
        }
    }
}
</script>
<style lang='less' scoped>
.xhead h1{
    width:200px;
    text-align:left;
    font-size:18px;
    font-weight:bold;
    color: #fff;
    line-height:45px;
    float:left;
}
.el-dropdown{
    float:right;
    .el-dropdown-link{
        color:#fff;
        line-height:45px;
        .el-icon-arrow-down{
            color:#fff;
        }
    }
}
</style>