<template>
<div class='friends_container' v-show='indexEggModalShow' @click='indexEggModalFn'>
    <div class='friends_content' @click="preventIndexEggModalFn($event)">
      <img class='friends_title_img' src="./exchange_gift_list_icon.png"/>
      <div class='friends_content_friends'>
          <span class="text">兑换礼物</span>
      </div>
      <div class='close_feed_box' @click="indexEggModalFnClose">
      </div> 
      <div class='img_grop'>
        <router-link  to='chickChangeRed'>
          <img class='img_changered' src='./hakkyuinkaku_icon@2x.png'>
        </router-link>
        <router-link  to='/chickChangeShop'>
          <img class='img_changegold' src='./exchange_of_goods@2x.png'>
        </router-link>   
        <router-link  to='/chickChangeRecord'>
          <img class='img_changegold' src='./egg_exchange_record_of_exchange.png'>
        </router-link>   
        <router-link  to='/chickEggDetail'>
          <img class='img_changegold' src='./exchange_eggs_detailed.png'>
        </router-link>      
      </div>   
    </div>
</div>
</template>
<script>
    export  default{
        name:"indexEggModal",
        props:{
          indexEggModalShow:{
            type:Boolean,
            default:false
          }
        },
        methods:{
          indexEggModalFn(){
            this.$emit("notifyIndexEggModalShow");
          },
          preventIndexEggModalFn($event){
            event.preventDefault();
            event.stopPropagation();
          },
          indexEggModalFnClose(){
            this.$emit("notifyIndexEggModalShow");
          }
        }
    }
</script>
<style scoped>
.friends_content {
  height: auto;
  min-height: 2.84rem;
}
.img_grop{margin-top: 0.2rem;text-align: center}
.img_grop a{display: inline-block;margin-bottom: 0.15rem;height: 0.88rem;}
.img_changered{ width: 3.35rem; }
.img_changegold{ width: 3.35rem;}
</style>
