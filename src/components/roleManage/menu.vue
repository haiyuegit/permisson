<template>
    <el-form ref="form" label-width="120px" size="medium">
        <el-form-item label="请选择权限:" prop="pid">
            <el-tree
            ref="tree"
            :data="treeData"
            :props="defaultProps"
            check-strictly
            default-expand-all
            node-key="id"
            show-checkbox>
            </el-tree>
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
                label: 'label'
            },
        }
    },
    methods: {
        onSubmit(){
            let ids = this.$refs.tree.getCheckedKeys() || [];
            // if(!ids.length){
            //     this.$message.warning("请选择节点");
            //     return
            // }
            let params = JSON.parse(JSON.stringify(ids));
            // console.log('select',ids,params)
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
        cancle(){
            this.$emit("close")
        }
    }
}
</script>
<style lang='less' scoped>

</style>