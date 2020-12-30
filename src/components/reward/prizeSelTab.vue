<template>
<div>
    <div>
        <el-button slot="trigger" size="mini" type="primary" @click="add">新增</el-button>
    </div>

    <div class="prizeTab">
        <djqTab v-if="type==='DJQ'" :tabData="djqList" v-on:edit="edit"></djqTab>
        <xjhbljTab v-if="type==='XJHB_LJ'" :tabData="xjhbljList" v-on:edit="edit"></xjhbljTab>
        <xjhbdqTab v-if="type==='XJHB_DQ'" :tabData="xjhbdqList" v-on:edit="edit"></xjhbdqTab>
        <syqTab v-if="type==='SYQ'" :tabData="syqList" v-on:edit="edit"></syqTab>
        <txqTab v-if="type==='TXQ'" :tabData="txqList" v-on:edit="edit"></txqTab>
        <xnlpTab v-if="type==='XNLP'" :tabData="xnlpList" v-on:edit="edit"></xnlpTab>
    </div>

    <el-dialog
        :visible.sync="centerDialogVisible"
        center
        title="添加"
        width="50%">
        <djqForm v-if="centerDialogVisible && type==='DJQ'" :form="djqData" v-on:submit="submit"></djqForm>
        <xjhbljForm v-if="centerDialogVisible && type==='XJHB_LJ'" :form="xjhbljData" v-on:submit="submit"></xjhbljForm>
        <xjhbdqForm v-if="centerDialogVisible && type==='XJHB_DQ'" :form="xjhbdqData" v-on:submit="submit"></xjhbdqForm>
        <syqForm v-if="centerDialogVisible && type==='SYQ'" :form="syqData" v-on:submit="submit"></syqForm>
        <txqForm v-if="centerDialogVisible && type==='TXQ'" :form="txqData" v-on:submit="submit"></txqForm>
        <xnlpForm v-if="centerDialogVisible && type==='XNLP'" :form="xnlpData" :giftClasses="this.giftClasses" v-on:submit="submit"></xnlpForm>
    </el-dialog>
</div>
</template>
<script>
import djqTab from './prizeTab/djqTab'
import xjhbljTab from './prizeTab/xjhbljTab'
import xjhbdqTab from './prizeTab/xjhbdqTab'
import syqTab from './prizeTab/syqTab'
import txqTab from './prizeTab/txqTab'
import xnlpTab from './prizeTab/xnlpTab'

import djqForm from './addPrize/djqForm'
import xjhbljForm from './addPrize/xjhbljForm'
import xjhbdqForm from './addPrize/xjhbdqForm'
import syqForm from './addPrize/syqForm'
import txqForm from './addPrize/txqForm'
import xnlpForm from './addPrize/xnlpForm'
export default {
    name: '',
    components:{
        djqTab,
        xjhbljTab,
        xjhbdqTab,
        syqTab,
        txqTab,
        xnlpTab,

        djqForm,
        xjhbljForm,
        xjhbdqForm,
        syqForm,
        txqForm,
        xnlpForm
    },
    props:{
        type:"",
        giftClasses:{
            type:Array,
            default:function(){
                return []
            }
        },
        listdata:{
            type:Array,
            default:function(){
                return []
            }
        }
    },
    inject:{
        conditionData:{
            default:'conditionData'
        }
    },
    data () {
        return {
            title: '',
            centerDialogVisible: false,
            oprateType:'add', //操作类型
            djqData:{
                serviceTime:["JAN"]
            },
            xjhbljData:{},
            xjhbdqData:{},
            syqData:{},
            txqData:{},
            xnlpData:{},

            djqList:[],
            xjhbljList:[],
            xjhbdqList:[],
            syqList:[],
            txqList:[],
            xnlpList:[],
            idx:0 //修改时记录当前行index
        }
    },
    computed:{
        tabName:function(){
            switch(this.type){
                case "DJQ": return "djq";
                case "XJHB_LJ": return "xjhblj";
                case "XJHB_DQ": return "xjhbdq";
                case "SYQ": return "syq";
                case "TXQ": return "txq";
                default: return "djq";
            }
        }
    },
    watch:{
        "type" : function(val,oldval){
            this.setlData(val)
        }
    },
    mounted(){

    },
    methods: {
        add(){
            this.centerDialogVisible = true
            this.oprateType = "add"
            this.djqData = {}
            // console.log('add',this.conditionData)
        },
        submit(data){
            this.centerDialogVisible = false
            switch(this.type){
                case "DJQ": this.funHandle("djqList",data)//this.djqList.push(data);
                break;
                case "XJHB_LJ": this.funHandle("xjhbljList",data)
                break;
                case "XJHB_DQ": this.funHandle("xjhbdqList",data)
                break;
                case "SYQ": this.funHandle("syqList",data)
                break;
                case "TXQ": this.funHandle("txqList",data)
                break;
                case "XNLP": this.funHandle("xnlpList",data)
                break;
            }
        },
        edit(data,idx){
            this.idx = idx;     
            this.centerDialogVisible = true
            this.oprateType = "edit"
            switch(this.type){
                case "DJQ": this.djqData = data
                break;
                case "XJHB_LJ": this.xjhbljData = data
                break;
                case "XJHB_DQ": this.xjhbdqData = data
                break;
                case "SYQ": this.syqData = data
                break;
                case "TXQ": this.txqData = data
                break;
                case "XNLP": this.xnlpData = data
                break;
            }
        },
        funHandle(name,data){
            if(this.oprateType === "add"){
                this[name].push(data)
            }else{
                this[name].splice(this.idx,1,data)
            }
            console.log(name,this[name])
            this.$emit('getPrizeList',this[name])
        },
        setlData(type){
            switch(this.type){
                case "DJQ": this.djqList = this.listdata
                break;
                case "XJHB_LJ": this.xjhbljList =  this.listdata
                break;
                case "XJHB_DQ": this.xjhbdqList =  this.listdata
                break;
                case "SYQ": this.syqList = this.listdata
                break;
                case "TXQ": this.txqList = this.listdata
                break;
                case "XNLP": this.xnlpList = this.listdata
                break;
            }
        }
    }
}
</script>
<style lang='less' scoped>
.prizeTab{
    margin-top:15px;
}
</style>