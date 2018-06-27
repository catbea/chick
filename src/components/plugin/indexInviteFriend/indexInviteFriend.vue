<template>
    <div class="index-invite-friend friends_container" v-show="isShowInvite">
        <div class="index-invite-content">
            <section class="packages-list">
                <span class="gift_chick" v-for="(item,index) in rewewardConfigForwardDTOS" :key="index"><img :src="defulatimg+item.productImgPath" alt=""><span class="productCount">x{{item.productCount}}</span></span>

                <span class="invite-btn" @click="goToInvite">去邀请</span>
            </section>
            <span class="close-invite" @click="closeInvite"></span>
        </div>
    </div>      
</template>
<script>
 export default {
     name:"indexInviteFriend",
     props:{
         isShowInvite:{
             type:Boolean,
             default:false
         },
         rewewardConfigForwardDTOS:{
             type:Array,
             default:[]
         }
     },
     data(){
         return {
            defulatimg:this.$CommFunc.defulatimg,
         }
     },
     methods:{
         goToInvite(){
            this.$emit("notifyIndexInviteFriend",1);
         },
         closeInvite(){
             this.$emit("notifyIndexInviteFriend",2);
         }
     }

 }   
</script>
<style scoped>
.index-invite-friend{
    background:rgba(0, 0, 0, 0.31);
    display: -webkit-box;
    -webkit-box-pack: center;
    padding-top: 1.02rem;
}
.index-invite-friend .index-invite-content{
    width: 2.95rem;
    height: 4.06rem;
    background: url(./inviting_a_gift_bag_bg@2x.png) center no-repeat;
    background-size: 100% 100%;
    position: relative;
}
.packages-list{
    position: absolute;
    top:2.21rem;
    left: 0;
    width: 100%;
    padding: 0 0.1rem 0 0.2rem;
    display: -webkit-flex; 
    display: flex; 
    -webkit-flex-direction: row; 
    flex-direction: row; 
    -webkit-align-items: center; 
    align-items: center; 
    -webkit-justify-content: center; 
    justify-content: center; 
}
.packages-list .invite-btn{
    width: 1.16rem;
    height: 0.45rem;
    position: absolute;
    line-height: 0.45rem;
    text-align: center;
    top: 0.98rem;
    background: url(./invite_button.png) center no-repeat;
    background-size: 100% 100%;  
    color: #FF5D12;
    font-size: 0.17rem;
    font-weight: bold;  
}
.packages-list .gift_chick{
    display: block;
    width: 0.68rem;
    height: 0.78rem;
    margin-right: 0.1rem;
    position: relative;
}
.packages-list .gift_chick .productCount{
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 0.10rem;
    color: #FFF200;
    letter-spacing: 0;
}
.packages-list .gift_chick img{
    width: 100%;
    height: 100%;
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
