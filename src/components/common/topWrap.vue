<template>
    <div id="top_wrap" class="top_wrap">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: '',
    components:{
        
    },
    props:{
        
    },
    data () {
        return {
           
        }
    },
    mounted() {
        setTimeout(() => {
            this.resetSize()
        },0);
        
    },
    methods: {
        resetSize(){
            let topWrap = document.getElementById('top_wrap')
            let _height = topWrap.offsetHeight;
            document.querySelector('.content').style.paddingTop = (_height+40) + "px"
        }
    }
}
</script>
<style lang='less' scoped>
.top_wrap{
    position: absolute;
    top:40px;
    left:20px;
    right:0;
    z-index:99;
    padding:10px 20px 0 0;
    background:#fff;
}
</style>