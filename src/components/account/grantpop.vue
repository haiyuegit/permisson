<template>
    <el-form ref="form" label-width="120px" size="medium">
        <el-form-item label="请选择角色:" prop="roleIds">
            <el-tree
            ref="tree"
            :data="filterTree"
            :props="defaultProps"
            check-strictly
            default-expand-all
            node-key="id"
            show-checkbox>
            </el-tree>
        </el-form-item>

        <el-form-item label="请选择用户组:" prop="userGroupIds">
            <el-select v-model="form.userGroupIds" multiple placeholder="请选择">
                <el-option
                v-for="item in groupList"
                :key="item.id"
                :label="item.groupName"
                :value="item.id">
                </el-option>
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
    computed:{
      filterTree:function(){
            let t = this.system;
            let res = this.filterSystem(this.permTree,t)
            return res
      }
    },
    watch:{
      "form.roleIds"(val,oldval){
          console.log('watch',val)
          if(val){
            // let arr = [];
            // arr.push(val)
            this.$refs.tree.setCheckedKeys(arr)
          }else{
            this.$refs.tree.setCheckedKeys([])
          }
      }
  },
    props:{
        permTree:{
            type:Array,
            // default:[]
        },
        system:{
            type:String
        },
        // form:{
        //     userGroupIds:[]
        // },
        groupList:{
            type:Array,
            default:function(){
                return []
            }
        }
    },
    data () {
        return {
            title: '',
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            form:{
                roleIds:[],
                userGroupIds:[]
            }
        }
    },
    methods: {
        onSubmit(){
            let ids = this.$refs.tree.getCheckedNodes() || [];
            // console.log('----------',this.form.userGroupIds)
            // if(!ids.length && !this.form.userGroupIds.length){
            //     this.$message.warning("请选择角色或用户组");
            //     return
            // }

            let uid = this.exData(ids)
            let roleNames = this.exroleName(ids)
            let userGroupNames = this.getUserGroupNames(this.form.userGroupIds)
            let params = {
                roleIds:uid,
                roleNames:roleNames,
                userGroupNames:userGroupNames,
                userGroupIds:this.form.userGroupIds
            }
            this.form.userGroupIds = []
            this.$emit('selData',params)
        },
        exData(list){
            return list.map((item)=>{
                return item.id
            })
        },
        exroleName(list){
            return list.map((item)=>{
                return item.label
            })
        },
        getUserGroupNames(list){
            let arr = []
            this.groupList.forEach(item=>{
                list.forEach(sel=>{
                    if(sel === item.id){
                        arr.push(item.groupName)
                    }
                })
            })
            return arr
        },
        cancle(){
            // this.form.userGroupIds = []
            this.$emit('close')
        }
    }
}
</script>
<style lang='less' scoped>

</style>