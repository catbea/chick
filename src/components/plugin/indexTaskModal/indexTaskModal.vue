<template>
<div class='friends_container' v-show='chickSignShow' @click='indexEggModalFn'>
    <div class='friends_content' @click="preventIndexEggModalFn($event)">
        <img class='friends_title_img' src="./task_list_icon@2x.png"/>
        <div class='friends_content_friends'>
           <span class="text">任务</span>
        </div>
        <div class='close_feed_box' @click="indexEggModalFnClose">
        </div> 
        <div class="task_wrapper">
            <img src="./sign_in_reward_icon@2x.png" alt="">    
            <div class="task_content">
                <p class="title">祈福抽签</p>
                <p class="txt">祈福求签送道具，每天都有新惊喜</p> 
            </div>
            <span class="task-btn" @click="gochickSign">去祈福</span>
        </div>
        <div class="task_wrapper task_wrapper2" v-show="isSHowFriend">
            <img src="./sign_in_reward_icon@2x.png" alt="">    
            <div class="task_content">
                <p class="title">邀请好友</p>
                <p class="txt">邀请好友养小鸡，喜提超值大礼包哦</p> 
            </div>
            <span class="task-btn" @click="goToInvite">去邀请</span>
        </div>
        <div class="task_wrapper task_wrapper3" v-show="isSHowAttent">
            <img src="./sign_in_reward_icon@2x.png" alt="">    
            <div class="task_content">
                <p class="title">求关注</p>
                <p class="txt">关注牧场，领养萌萌鸡</p> 
            </div>
            <span class="task-btn"  @click="goToAttente">去关注</span>
        </div>                
    </div>
</div>
</template>
<script>
    export  default{
        name:"indexEggModal",
        props:{
          chickSignShow:{
            type:Boolean,
            default:false
          },
          isSHowFriend:{
            type:Boolean,
            default:false 
          },
          isSHowAttent:{
            type:Boolean,
            default:false 
          }
        },
        methods:{
          indexEggModalFn(){
            this.$emit("notifyIndexTaskModalShow",1);
          },
          preventIndexEggModalFn($event){
            event.preventDefault();
            event.stopPropagation();
          },
          indexEggModalFnClose(){
            this.$emit("notifyIndexTaskModalShow",1);
          },
          gochickSign(){
              this.$router.push({path:"/chickBlessing"});
          },
          goToInvite(){
            this.$emit("notifyIndexTaskModalShow",2);
            
          },
          goToAttente(){
            this.$emit("notifyIndexTaskModalShow",3);
          }
        }
    }
</script>
<style scoped>
.friends_content {
    min-height: 1.86rem;
}
.task_wrapper{
    width: 3.45rem;;
    height: 0.9rem;
    margin: 0.195rem auto 0;
    background: #FF5F62;
    box-shadow: 0 5px 0 0 #ECECEC;
    border-radius: 8px;
    position: relative;
    display: -webkit-box;
    -webkit-box-align: center;
    padding-left: 0.15rem;
}
.task_wrapper2{
    background: #FF9A27;
    box-shadow: 0 5px 0 0 #ECECEC;
}
.task_wrapper3{
    background: #309DFE;
    box-shadow: 0 5px 0 0 #ECECEC;
}
.task_wrapper img{
    width: 0.6rem;
    height: 0.6rem;
    margin-right: 0.15rem;
}
.task_content .title{
    font-size: 0.13rem;
    color: #FFFFFF;
}
.task_content .txt{
    max-width: 1.43rem;
    opacity: 0.8;
    font-size: 0.11rem;
    color: #FFFFFF;
}
.task_wrapper .task-btn{
    display: block;
    width: 0.7rem;
    height: 0.22rem;
    line-height: 0.22rem;
    text-align: center;
    position: absolute;
    top:0.34rem;
    right: 0.2rem;
    background: #FFFFFF;
    border-radius: 0.49rem;
    font-size: 0.11rem;
    color: #FF9A27;
}
</style>
