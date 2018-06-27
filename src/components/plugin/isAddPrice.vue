<template>
    <div class="is-add-price-box borderTop_1px" @click="isClickAddShopFn">
        <div class="is-add-price">
            <span class="is-add-mark">加价购</span><p class="is-add-desc">{{addDesc}}</p><slot></slot>
        </div> 
    </div>
</template>
<script>
    export default{
        name:'isAddPrice',
        data(){
            return {
               addDesc: this.$store.store.state.addDesc.setAddDescTxt
            }
        },
        methods: {
            isClickAddShopFn:function(){
                this.$emit("showAddBox");
            }
        },
        created(){
            this.$on('change', () => {
                console.log("接收事件");
            });
        },
        computed: {
            getAddDesc(){
                
                return this.addDesc;
            }
        },
        watch: {
            addDesc(val,oldval){  
                    console.log(val.name)  
            }
        }
    }
</script>
<style scoped>
.is-add-price-box{
    padding: 0 1rem;
    background: #fffcef;
    position: relative;
}
.is-add-price{
    height: 44px;
    background: url(/static/image/arrow_icon.png) no-repeat right 0 center;
    background-size: 9px 16px;
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-align: center;
}
.is-add-price .is-add-mark{
    display: inline-block;
    height: 19px;
    width: 47px;
    border-radius:4px; 
    text-align: center;
    line-height: 19px;
    color: #fff;
    font-size: 12px;
    background-color: #ff3f00;
}
.is-add-price .is-add-desc{
    font-size: 13px;
    color: #000;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-box-flex: 1;
    line-height: normal;
}
.is-add-price img{
    width: 33px;
    height: 33px;
    margin-right: 18px;
}
.borderTop_1px::after{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 1px;
    border-bottom: 1px solid #eee;
    -webkit-transform: scale(.5);
    transform: scale(.5);
    -webkit-transform-origin: left top;
    transform-origin: left top;

}
</style>
