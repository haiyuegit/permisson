<template>
    <div class="el-transfer">
        <div class="el-transfer-panel">
            <p class="el-transfer-panel__header">选择列表</p>
            <div class="el-transfer-panel__body is-with-footer">
                <div class="el-transfer-panel__filter el-input el-input--small el-input--prefix">
                    <el-input v-model="staffName" @keyup.native="keyup">
                        <i slot="prefix" class="el-input__icon el-icon-search"
                            @click="searchQuery"
                            ></i>
                    </el-input>
                    <ul ref="trans_con" v-loading="loading" class="trans_con">
                        <li v-for="item in staffList" :key="item.bizId" @click="selectItem(item)">
                            <label for="">{{item.staffName?item.staffName:"无名氏"}}</label>
                            <span>{{item.orgName}}</span>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
        <div class="el-transfer__buttons">
            <el-button class="el-transfer__button">
                <span><i class="el-icon-arrow-right"></i></span>
            </el-button>
        </div>
        
        <div class="el-transfer-panel">
            <p class="el-transfer-panel__header">已选列表</p>
            <div class="el-transfer-panel__body is-with-footer">
                <div class="el-transfer-panel__filter el-input el-input--small el-input--prefix">
                    <el-tag
                    v-for="tag in selectedTag"
                    :key="tag[tagId]"
                    closable
                    @close="closeTag(tag[tagId])"
                    >
                    <!-- {{tag[tagId]}} -->
                    {{tag.staffName || tag.userName || "无名氏"}}
                    </el-tag>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: '',
    components:{
        
    },
    props:{
        staffList:{
            type:Array,
            default:function(){
                return []
            }
        },
        tagId:"",
        type:"",
        value:{
            type:Array,
            default:function(){
                return []
            }
        },
        loading:false
    },
    data () {
        return {
            staffName:"",
            selectedTag:[],
            timer:null
        }
    },
    watch:{
        value: function(newval, oldval){
            this.selectedTag = newval
        }
    },
    mounted() {
        this.$refs.trans_con.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        searchQuery(){
            this.$emit("lssearchQuery",this.staffName)
        },
        handleScroll(e){
            let scrollpx = e.target.clientHeight + e.target.scrollTop
            
            if(e.target.scrollHeight === scrollpx){
                this.$emit("lsGetData")
            }
        },
        selectItem(item){
            if(this.type === "single"){
                item[this.tagId] = item.bizId;
                this.selectedTag = [];
                this.selectedTag.push(item)
                this.$emit('input',this.selectedTag)
                return
            }

            let res = this.selectedTag.find((value, index, arr) => {
                return value[this.tagId] === item.bizId
            })
            
            if(!res){
                item[this.tagId] = item.bizId;
                this.selectedTag.push(item)
                this.$emit('input',this.selectedTag)
            }
        },
        closeTag(id){
            let arr = this.selectedTag.filter(item=>{
                return item[this.tagId] !== id
            })
            this.selectedTag = arr
            this.$emit('input',this.selectedTag)
        },
        keyup(e){
            let that = this
            clearTimeout(that.timer);
            this.timer = setTimeout(function () {
                that.staffName = e.target.value
                that.searchQuery()
            },300);
        },
    }
}
</script>
<style lang='less' scoped>
.trans_con{
    padding:5px 0;
    overflow:auto;
    height:200px;
    li{
        padding:0 10px;
        height:32px;
        line-height:32px;
        label{
            float:left;
        }
        span{
            float:right;
            color:#999;
            font-size:12px;
        }
        &:hover{
            background:#efefef;
            cursor: pointer;
        }
    }
}
.el-transfer-panel__filter{
    text-align: left;
    .el-tag{
        margin:0 5px 5px 0;
    }
}
.el-transfer-panel__header{
    color:#666
}
.el-transfer{
    text-align:center
}
</style>