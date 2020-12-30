<template>
<el-container>
  <el-form ref="loginForm" :model="loginForm" :rules="rules2" class="demo-ruleForm login-container" label-position="left" label-width="0px" size="medium" @submit.native.prevent>
    <h3 class="title">运营管理系统登录</h3>
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" auto-complete="off" placeholder="账号" type="text"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" auto-complete="off" placeholder="密码" type="password"></el-input>
    </el-form-item>
    <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
    <el-form-item style="width:100%;">
      <el-button :loading="logining" native-type="submit" style="width:100%;" type="primary" @click="handleSubmit2" @keyup.enter.native="handleSubmit2">登录</el-button>
    </el-form-item>
  </el-form>
</el-container>
</template>

<script>
export default {
    components:{
    },
  data() {
    return {
      logining: false,
      loginForm: {
        account: "",
        checkPass: ""
      },
      rules2: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: true,
    };
  },
  methods: {
    handleReset2() {
      this.$refs.loginForm.resetFields();
    },
    async login(params) {
      let res = await this.$service.login(params);
      if (res) {
        this.$registLogin(params.username, res,()=>{
          this.$registMenu()
        });
        
        this.$router.push({ path: "/" });
      } else {
        this.logining = false;
      }
    },
    handleSubmit2(ev) {
      var _this = this;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.logining = true;
          this.login({
            grantType: "password",
            scope: ["read", "write"],
            registerApp: "XHSR-OPER",
            username: this.loginForm.username,
            password: this.loginForm.password
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.el-container {
  height: 100%;
  background: #efefef;
}
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #409eff;
    font-size: 22px;
    font-weight: bold;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>