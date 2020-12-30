<template>
    <el-form v-if="operateBtns.SEARCH" :inline="true"  :model="formInline" size="medium">

        <el-form-item v-for="(item,index) in itemList" :key="index" :label="item.label">
            <el-input v-if="item.type==='input'" v-model="formInline[item.model]" :placeholder="item.placeholder" class="normalInput">
            </el-input>

            <el-select v-if="item.type==='select'" v-model="formInline[item.model]" :placeholder="item.placeholder">
                <el-option
                    v-for="per in item.options"
                    :key="per.code"
                    :label="per.name"
                    :value="per.code">
                </el-option>
            </el-select>

            <el-date-picker
                v-if="item.type==='rangeTime'"
                v-model="formInline[item.model]"
                :default-time="['00:00:00', '23:59:59']"
                :placeholder="item.placeholder"
                end-placeholder="结束日期"
                range-separator="至"
                start-placeholder="开始日期"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>

            <system-select v-if="item.type==='systemSelect'" v-model="formInline.system">
            </system-select>

        </el-form-item>

        <el-form-item>
            <el-button class="fix_btn" type="primary" @click="onSubmit()">查询</el-button>
            <el-button @click="resetForm()">重置</el-button>
            <el-button v-if="isExport" @click="exportForm()">导出</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
/** 
 * @Author: leoy 
 * @Date: 2019-04-10 09:45:12 
 * 
 * label:标题  | type:类型  |  placeholder:占位符  |  model:字段名
 * 
 * input 输入框
 * select 下拉选择
 * rangeTime 开始结束日期选择
 * systemSelect 选择系统
 */
import systemSelect from './systemSelect'
import { mapState,mapGetters } from 'vuex'
export default {
    name: '',
    components:{
        systemSelect
    },
    props:{
        itemList:{
            type:Array,
            default:function(){
                return []
            }
        },
        inputPlace:{
            default:"请输入值"
        },
        isSystem:{
            type:String,
            default:''
        },
        isExport:{
            type:String,
            default:''
        }
    },
    computed:{
        ...mapState({
            operateBtns:'operateBtns'
        }),
    },
    data () {
        return {
            formInline:{
               system:"XHSR-OPER",
            },
        }
    },
    methods: {
        onSubmit(){
            this.$emit('search',this.formInline)
        },
        resetForm() {
            this.formInline = {
                
            }
        },
        exportForm(){
            this.$emit('exportForm',this.formInline)
        }
    }
}
</script>
<style lang='less' scoped>

</style>