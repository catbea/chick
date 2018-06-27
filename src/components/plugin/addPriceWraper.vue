<template>
  <div class="add-buy_fixed" :class="{'add-buy_fixed_show':isClickAddShop}">
      <div class="add-buy_wraper">
          <div class="add-buy_goods_info">
                <p class="header-title"><span class="title">加价购商品</span><span class="close-buy_fixed" @click="addShopTrue"></span></p>
                <div class="select-goods-info borderTop_1px">
                    <span class="select-btn" v-bind:class="{'selected-btn':isSelectedRadio}" @click="selectAddRadio" data-lazyload="/static/add-selected.png"></span>
                    <div class="goods-info-panel">
                        <img src="http://static.e-mallchina.com/pic/product/brand/logo/hbw.jpg" alt="">
                        <div class="add-goods-info">
                            <p class="add-goods_name">爱奇艺黄金VIP会员卡</p>
                            <p class="add-expire">有效期：2018年8月30日前可用</p>
                            <p class="add-price_ant"><span class="add-price">9.90元+0积分</span><span class="add-ant-p">16.00元+88积分</span></p>
                        </div>
                    </div>
                </div> 
          </div>
          <div class="add-buy_true borderTop_1px borderTop_1px_2">
               <span class="selected-txt" v-if="isSelectedRadio">已选购1件商品</span> <span class="add-btn" @click="addShopTrue">确定</span> 
          </div>
      </div>
  </div>
</template>
<script>
export default {
    name:"isAddPrice",
    props:{
        addShopInfo:{
            type:Object
        },
        isClickAddShop:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            isSelectedRadio:false
        }
    },
    methods:{
        selectAddRadio:function(){
            this.isSelectedRadio=!this.isSelectedRadio;            
        },
        addShopTrue:function(){
            this.$emit("getSelectStatus",this.isSelectedRadio);//这里要把是否选中的状态传过去
        }
    }
} 
</script>
<style scoped>
.add-buy_fixed{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    z-index: 100;
    -webkit-transition: transform .2s cubic-bezier(0,0,.25,1),-webkit-transform .2s cubic-bezier(0,0,.25,1);
    transition: transform .2s cubic-bezier(0,0,.25,1),-webkit-transform .2s cubic-bezier(0,0,.25,1);
    -webkit-transform: translate3d(0,110%,0);
    transform: translate3d(0,110%,0);
}
.add-buy_fixed_show{
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
}
.add-buy_fixed .add-buy_wraper{
    width: 100%;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0; 
}
.add-buy_wraper .add-buy_goods_info{
    padding: 0 1rem;    
    position: relative;
}
.add-buy_wraper .add-buy_goods_info .header-title{
    height: 54px;
    line-height: 54px;
    text-align: center;
}
.add-buy_goods_info .header-title .close-buy_fixed{
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url(/static/image/close0.png) no-repeat center;
    background-size: 15px 15px; 
    position: absolute;
    right: 1rem;
    top:12px;
}
.add-buy_wraper .add-buy_goods_info .title{
    font-size: 18px;
    color: #000;
}
.add-buy_goods_info .select-goods-info{
    min-height: 115px;
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-align: center;
    position: relative;
}
.select-goods-info .select-btn{
    display: inline-block;
    width: 34px;
    height: 34px;
    background: url(/static/add-select.png) no-repeat center;
    background-size: 17px 17px;    
}
.select-goods-info .selected-btn{
    background: url(/static/add-selected.png) no-repeat center;
    background-size: 17px 17px;    
}
.select-goods-info .goods-info-panel{
    -webkit-box-flex: 1;
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-align: center;
}
.goods-info-panel img{
    width: 60px;
    height: 60px;
}
.goods-info-panel .add-goods-info{
    -webkit-box-flex: 1;    
}
.goods-info-panel .add-goods-info .add-goods_name{
    font-size: 13px;
    color: #000;
}
.goods-info-panel .add-goods-info .add-expire{
    font-size: 10px;
    color: #999;
    margin: 6px 0 7px;
}
.goods-info-panel .add-goods-info .add-price_ant{
    font-size: 13px;
}
.add-goods-info .add-price_ant .add-price{
    color: #ff3f00;
}
.add-goods-info .add-price_ant .add-ant-p{
    color: #999;
    margin-left: 10px;
    text-decoration: line-through;
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
.borderTop_1px_2::after{
    border-bottom: 1px solid #e5e5e5 !important;
}
.add-buy_true{
    height: 49px;
    line-height: 49px;
    position: relative;
    padding-left: 1rem;
}
.add-buy_true .selected-txt{
    font-size: 15px;
    color:#000;
}
.add-buy_true .add-btn{
    width: 150px;
    height: 49px;
    text-align: center;
    line-break: 49px;
    background: #ff3f00;
    color: #fff;
    font-size: 17px;
    position: absolute;
    right: 0;
    top:0;
}
</style>
