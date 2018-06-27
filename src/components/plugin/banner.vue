<template>
      <div class="swiper-container">
        <swiper class="swiper-wrapper" :options="swiperOption" ref="mySwiper">
            <swiperSlide class="swiper-slide" v-for="(item,index) in bannerlist" :key="index" v-bind:href="index.url"><img :src="item.goods_img_url1"/></swiperSlide>
            <div class="swiper-pagination" v-if="bannerlist.length>1" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
 export default {
     name:"banner",
     props:{
         bannerlist:{
            type:Array
         }
     },
     data(){
         return{
              swiperOption: {
                slidesPerView: 1,
                paginationClickable: true,
                spaceBetween:0,
                autoplay: 2500,
                loop: true,
                speed:1000,
                pagination: {
                    el: '.swiper-pagination',
                    renderBullet(index, className) {
                        return `<span class="${className} swiper-pagination-bullet-custom"></span>`
                    }
                },                
                paginationClickable :true
            }
         }
     },   
    components:{
        swiper,
        swiperSlide
    }
 }   
</script>
<style scoped>
.swiper-pagination-bullet{
    margin: 0 2px;
}
.swiper-container{margin-right:auto;margin-left:auto;width:100%;}
.swiper-pagination-bullet-active{background:#666}
.swiper-slide{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;background:#fff;text-align:center;font-size:18px;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center}
.swiper-container-horizontal > .swiper-pagination{
    bottom: 0;
    top: initial; 
}
</style>
