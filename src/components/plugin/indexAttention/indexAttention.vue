<template>
    <div class="index-invite-friend friends_container" :class="{'index-invite-friend-active':isAttented}" v-show="isSHowAttent">
        <div class="index-invite-content" :class="{'packages-list-active':isAttented}">
             <img id="attente" src="./pay_attention_to_the_public_number_e_store_default_bg.png" @touchstart="attented" @touchend="attented2" alt="" v-show="!isAttented">   
             <img src="./pay_attention_to_the_public_number_e_store_bg.png" alt="" v-show="isAttented">   
            <span class="close-invite" @click="closeAttent"></span>
        </div>
    </div>      
</template>
<script>
 export default {
     name:"indexAttention",
     props:{
         isSHowAttent:{
             type:Boolean,
             default:false
         },
         isAttented:{
             type:Boolean,
             default:false
         }
     },
     methods:{
        closeAttent(){
            this.$emit("notifyIndexAttent");
        },
        attented(){
            alert("关注了")
            
        },
        attented2(){
            alert("关注了2")
        }
     }
 }   
</script>
<style scoped>

.index-invite-friend{
    background:rgba(0, 0, 0, 0.31);
    display: -webkit-box;
    -webkit-box-pack: center;
    padding-top: 8.5vh;
}
.index-invite-friend-active{
    padding-top: 7.5vh;
}
.index-invite-friend .index-invite-content{
    width: 2.95rem;
    height: 3.85rem;
    position: relative;
}
.index-invite-friend .packages-list-active{
    height: 4.25rem;
}
.index-invite-friend img{
    width: 100%;
    height: 100%;
    pointer-events: auto;
}
.index-invite-content .close-invite{
    width: 30px;
    height: 30px;
    position: absolute;
    background: url(./close_icon.png) center no-repeat;
    background-size: 100% 100%;  
    bottom: -0.6rem;
    left: 50%;
    margin-left: -15px;
}
</style>
