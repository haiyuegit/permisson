<template>
    <el-select v-model="title" multiple placeholder="请选择" @change="change" @remove-tag="remove">
        <el-option
        v-for="(val,key) in allList"
        :key="key"
        :label="val"
        :value="key">
        </el-option>
    </el-select>
</template>
<script>

export default {
    name: '',
    components:{

    },
    props:{
        optionList:{
            type:Object,
            default:function(){
                return {}
            }
        },
        value:{
            type:Array,
            default:function(){
                return []
            }
        }
    },
    mounted(){
        this.title = this.value
    },
    watch:{
        value: function(newval, oldval){
            if(newval.length === Object.keys(this.optionList).length){
                this.title = ['ALL']
            }else{
                this.title = newval
            }
            
        }
    },
    computed:{
        allList:function(){
            let obj = []
            if(!this.optionList.ALL){
                obj = Object.assign({},{ALL:"全部"},this.optionList)
            }
            return obj
        }
    },
    data () {
        return {
            title: '',
            oldVal:""
        }
    },
    methods: {
        change(val){
            // console.log(val.length,Object.keys(this.optionList).length)
            if(this.oldVal.indexOf("ALL")>-1 && val.indexOf('ALL') === -1){
                this.title = []
            }
            if(this.oldVal.indexOf("ALL")>-1 && val.length<Object.keys(this.allList).length && val.indexOf("ALL")>-1){
                // console.log('---')
                this.title = val.filter(item=>{
                    return item !== "ALL"
                })
            }
            if(this.oldVal.indexOf("ALL") === -1 && val.length===Object.keys(this.optionList).length){
                this.title = ['ALL']
            }
            if(this.oldVal.indexOf("ALL") === -1 && val.indexOf("ALL")>-1){
                this.title = ['ALL']
            }

            if(this.title.indexOf('ALL') > -1){
                this.$emit('input',Object.keys(this.optionList))
            }else{
                this.$emit('input',JSON.parse(JSON.stringify(this.title)))
            }
            // this.$emit('value',this.title)
            this.oldVal = this.title
        },
        remove(val){
            // console.log('remove',val)
            // this.title = this.title.filter(item=>{
            //     return item !== "ALL"
            // })
            
        }
    }
}
</script>
<style lang='less' scoped>

</style>