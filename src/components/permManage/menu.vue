<template>

    <el-form ref="form" label-width="120px" size="medium">
        <el-form-item label="请选择菜单:" prop="pid">
            <el-tree
                ref="tree"
                :data="treeData"
                :props="defaultProps"
                check-strictly
                default-expand-all
                node-key="id"
                show-checkbox
                @check-change="nodecheck">
                
            </el-tree>
        </el-form-item>

        <el-form-item v-for="domain in menuOperates" :key="domain.menuId"
            :label="domain.name"
            prop="system"
        >
            <el-select v-model="domain.operateId" multiple placeholder="请选择">
                <el-option v-for="item in domain.selectOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
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
    props:{
        treeData:{
        },
    },
    data () {
        return {
            title: '',
            defaultProps: {
                children: 'children',
                label: 'label',
                operate:"operate"
            },
            
            menuOperates:[]
        }
    },
    created() {
        
    },
    methods: {
        async getOperatesByMenu(params){
            let res = await this.$service.getOperatesByMenu(params)
            return res.operates || [];
        },
        onSubmit(){
            let ids = this.$refs.tree.getCheckedNodes() || [];
            // if(!ids.length){
            //     this.$message.warning("请选择节点");
            //     return
            // }
            let params = this.menuOperates
            this.$emit('selData',params)
        },
        exData(list){
            return list.map((item)=>{
                return {
                    menuId:item.id,
                    operateId:item.label
                }
            })
        },
        async nodecheck(ndata,ischeck){
            if(ischeck){
                let selectOption = await this.getOperatesByMenu({menuId:ndata.id})
                
                this.menuOperates.push({
                    name:ndata.label,
                    menuId:ndata.id,
                    operateId:[],
                    selectOption:selectOption
                })
            }else{
                this.menuOperates = this.menuOperates.filter((item)=>{
                    return ndata.id !== item.menuId
                })
            }
        },
        cancle(){
            this.$emit('close')
        }
    }
}
</script>
<style lang='less' scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
.tree_slot{float:right}
</style>