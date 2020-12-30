<template>
    <div class="content">
        <h2>欢迎 {{uname}} ！</h2>
    </div>
</template>
<script>
export default {
    name: '',
    components:{

    },
    data () {
        return {
            uname: '',
        }
    },
    mounted() {
        this.uname = localStorage.getItem("uname") || '您'
    },
    method: {

    }
}
</script>
<style lang='less' scoped>
.content h2{
    font-size:24px;
    font-weight: bold;
    text-align:center;
    line-height:120px;
}
</style>