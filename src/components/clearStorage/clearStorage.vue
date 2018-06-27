<template>
<div class="clear" @click="cleatFn">清理本地缓存</div>    
</template>
<script>
export default {
    name:"",
    data(){
        return {

        }
    },
    methods:{
        cleatFn(){
            localStorage.clear();
            sessionStorage.clear();
            alert("清理干净了");
        }
    }
}
</script>
<style scoped>
    .clear{
        width: 100w;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 17px;
        background: #ccc;
    }
</style>

