<template>
<div>
    <el-input v-model="putVal" :disabled="disabled" class="prize_input" size="mini"></el-input>
    <span class="fen_cls">份</span>
    <el-checkbox v-model="check" @change="checkChange">不限</el-checkbox>
</div>
</template>
<script>

export default {
    name: '',
    components:{

    },
    props:{
        value:""
    },
    mounted() {
        this.putVal = this.value
    },
    watch: {
        putVal(newVal,oldVal){
            this.$emit("input",newVal)
        }
    },
    data () {
        return {
            putVal:"",
            title: '',
            check:false,
            disabled:false,
        }
    },
    methods: {
        checkChange(val){
            if(val){
                this.putVal = "";
                this.disabled = true
                this.$nextTick(function () {
                    this.$emit("input",-1)
                })
                
            }else{
                this.disabled = false
                this.$emit("input","")
            }
        }
    }
}
</script>
<style lang='less' scoped>
.prize_input{
    width:80px;
}
.fen_cls{
    margin:0 20px 0 10px;
}
</style>