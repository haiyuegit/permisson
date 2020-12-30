<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
        <el-form-item>
            <el-select v-model="formInline.platform" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="startEndTime"
            end-placeholder="结束日期"
            range-separator="-"
            start-placeholder="开始日期"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="getTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button class="fix_btn" type="primary" @click="onSubmit()">查询</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    data () {
        return {
            options: [],
            formInline:{
                createTimeFrom:"",
                createTimeTo:"",
                platform:"XHSR-OPER"
            },
            startEndTime: []
        }
    },
    mounted(){
        this.wordOptionQuery({"type":"platform"})
    },
    methods: {
        getTime(date){
            this.formInline.createTimeFrom=date[0];
            this.formInline.createTimeTo=date[1];
        },
        async wordOptionQuery(params){
            let res = await this.$service.wordOptionQuery(params);
            let arr=[];
            res.details.forEach(function(item){
              arr.push({value: item.code, label: item.name})
            })
            this.options=arr;
        },
        onSubmit(){
          this.$emit("noteListFormQueryTopar",this.formInline);
        }
    }
}
</script>
<style lang='less' scoped>

</style>