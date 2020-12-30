<template>
    <el-form :inline="true" :model="formInline" size="medium">
            <el-form-item>
                <el-input v-model="formInline.menuname" :placeholder="inputPlace" class="normalInput"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-if="isOrg==='show'" v-model="formInline.orgName" class="normalInput" placeholder="请输入部门名称"></el-input>
            </el-form-item>
            <el-form-item>
            <el-select v-if="isSelStatus2!=='hide'" v-model="formInline.selvalue" placeholder="请选择状态">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            
            </el-form-item>
            <el-form-item v-if="isSystem">
                <system-select v-model="formInline.system"></system-select>
            </el-form-item>
            <el-form-item>
                <el-button class="fix_btn" type="primary" @click="onSubmit()">查询</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
</template>
<script>
import systemSelect from './systemSelect'
export default {
    name: '',
    components:{
        systemSelect
    },
    props:{
        inputPlace:{
            default:"请输入值"
        },
        isSystem:{
            type:Boolean,
            default:false
        },
        isOrg:{
            type:String,
            default:''
        },
        
        isSelStatus2:{
            type:String,
            default:''
        }
    },
    data () {
        return {
            options: [{
                value: '1',
                label: '启用'
                }, {
                value: '0',
                label: '禁用'
            }],
            options2: [{
                value: '1',
                label: '在职'
                }, {
                value: '0',
                label: '离职'
            }],
            // selvalue:""
            formInline:{
                menuname:"",
                selvalue:"",
                system:"XHSR-OPER",
                orgName:"",
                selStaffStatus:""
            },
        }
    },
    methods: {
        onSubmit(){
            this.$emit('search',this.formInline)
        },
        resetForm() {
            this.formInline = {
                menuname:"",
                selvalue:"",
                system:"XHSR-OPER",
                orgName:"",
                selStaffStatus:""
            }
        }
    }
}
</script>
<style lang='less' scoped>

</style>