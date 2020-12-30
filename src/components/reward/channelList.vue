<template>
    <div>
    <el-form v-if="operateBtns.SEARCH" :inline="true" size="medium">
        <el-form-item label="渠道码">
            <el-input v-model="channelCode" class="normalInput" placeholder=""></el-input>
        </el-form-item>
        
        <el-form-item>
            <el-button class="fix_btn" type="primary" @click="onSubmit()">查询</el-button>
        </el-form-item>
    </el-form>

    <el-table
        ref="permTable"
        :data="channelCodeList"
        
        border
        
        style="width: 100%">
        <el-table-column
            label="渠道名称"
            prop="channelName"
            >
        </el-table-column>
        <el-table-column
            label="渠道码"
            prop="channelCode"
            >
        </el-table-column>
            
        </el-table>
    </div>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
import Vue from 'vue';
export default {
    name: '',
    components:{
    },
    props:{
        channelCodeList:{
            type:Array,
            default:function(){
                return []
            }
        },
    },
    computed:{
        ...mapState({
            operateBtns:'operateBtns'
        }),
    },
    
    data () {
        return {
            channelCode:''
        }
    },
    methods: {
        onSubmit(){
            this.$emit('searchChannel',this.channelCode)
        },
        
        getTime(){

        }
    }
}
</script>
<style lang='less' scoped>

</style>