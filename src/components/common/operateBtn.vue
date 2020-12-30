<template>
    <div class="oprate_btn">
        <el-button v-if="operateBtns.ADD && !disAdd" class="fix_btn" type="primary" @click="add()">新增</el-button>
        <!-- <el-button type="primary" class="fix_btn" @click="edit()">修改</el-button> -->
        <el-button v-if="operateBtns.RETRACT && retract" class="fix_btn" type="primary" @click="retract()">撤回</el-button>
        <el-button v-if="operateBtns.FREEZE && freeze" class="fix_btn" type="primary" @click="changefreeze(0)">冻结</el-button>
        <el-button v-if="operateBtns.UNFREEZE && unfreeze" class="fix_btn" type="primary" @click="changefreeze(1)">解冻</el-button>
        <el-button v-if="operateBtns.ENABLED && !enabled" class="fix_btn" type="primary" @click="changeStatus(1)">启用</el-button>
        <el-button v-if="operateBtns.STOP && !stop" class="fix_btn" type="primary" @click="changeStatus(0)">停用</el-button>
        <el-button v-if="operateBtns.BATCH_DEL && !disPatchDel" class="fix_btn" type="primary" @click="patchdelete()">批量删除</el-button>
        <el-button v-if="operateBtns.REFRESH && showRefresh" class="fix_btn" type="primary" @click="refreshAuth">刷新</el-button>
        <el-button v-if="operateBtns.RESET_PWD && showReset" class="fix_btn" type="primary" @click="resetPwd">重置密码</el-button>
    </div>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
export default {
    name: '',
    components:{

    },
    data () {
        return {
            title: '',
        }
    },
    computed:{
        ...mapState({
            operateBtns:'operateBtns'
        }),
    },
    props:{
        detailData:{
            type:Object,
            // default:[]
        },
        retracted: false,
        freeze: false,
        unfreeze: false,
        stop: false,
        enabled: false,
        showRefresh:false,
        disPatchDel:false,
        disAdd:false,
        showReset:false
    },
    mounted() {
        // console.log('mounted')
    },
    
    methods: {
        add(){
            this.$emit("add")
        },
        retract(status){
            this.$emit("retract", status)
        },
        changefreeze(status){
            this.$emit("changefreeze", status)
        },
        changeStatus(status){
            this.$emit("changeStatus",status)
        },
        patchdelete(){
            this.$emit("patchdelete")
        },
        resetPwd(){
            this.$emit("resetPwd")
        },
        async refreshAuth(){
            let str = Math.random().toString(36).substr(2);
            let res = await this.$service.permRefresh({param:str});
            if(res){
                this.$message.success('刷新成功！')
            }
        }
    }
}
</script>
<style lang='less' scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
.el-col:first-child{
    text-align:right
}
.oprate_btn{
    padding:0 10px!important;
    // position:absolute;
    // top:94px;
    // left:20px;
    // right:0;
    z-index: 999;
    button{
        margin-top:10px;
        margin-bottom:10px;
    }
}
</style>