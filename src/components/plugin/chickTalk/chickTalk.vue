<template>
<transition name="fade">
<div class="chick-talk" v-show="isSHowChickTalk">
    <img src="./chicken_house_dialogue_big_img.png" alt="" class="chick-img">
    <span class="talk-content" v-show="isSHowTalkContent">{{talkContent}}</span>
    <slot class="talk-content-sin" v-show="!isSHowTalkContent"></slot>
</div> 
</transition>
   
</template>
<script>
export default{
    name:"chick-talk",
    props:{
        isSHowChickTalk:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            isSHowTalkDialog:false,
            isSHowTalkContent:true, // 多行文字显示
            talkContent:"",  
            talkContentIndex:-1,          
            talkList:[
                {"name":"长大以后，宝宝要做一只战斗鸡！拳打少林脚踢峨眉"},
                {"name":"宝宝在想，是先打个滚呢，还是先游个泳呢"},
                {"name":"长得高的才叫雄鸡，长得矮的那叫短小的鸡崽~"},
                {"name":"长得白的才叫高冷，长得黑的那叫冰霜乌骨鸡~"},
                {"name":"好热啊，好想喝肥鸡快乐水~喝完马上变快乐"},
                {"name":"啊！大海啊~全是水，夏天啊~全是腿！"}
            ]
        }
    },
    created(){
        if(this.$slots){
            if(this.$slots.default&&this.$slots.default.length>0){
                this.isSHowTalkContent = false; 
            }           
        }
        this.initChickTalk(); 
    },
    watch:{
        isSHowChickTalk(val,oldVal){
            // console.log("子组件",val,oldVal);
            if(val){
               this.initChickTalk(); 
            }
        }
    },
    methods:{
        initChickTalk(){
            let num = Math.floor(Math.random()* this.talkList.length);
            //如果上次的随机数和本次的相等,重新调用
            if(this.talkContentIndex == num){   
                this.initChickTalk()             
                return ;
            }
            this.talkContentIndex = num;
            this.talkContent = this.talkList[num].name;
        }
    }
}    
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.chick-talk{  
    width: 2.27rem;
    height: 0.54rem;
    position: absolute;   
    top: 15vh;
    left: 50%;
    transform: translateX(-50%); 
    background: url(./chicken_house_dialogue_bg_img.png) no-repeat center;
    background-size: 100% 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
}
.chick-talk .chick-img{
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    left: -0.07rem;
    bottom: 0.06rem;
}
.chick-talk .talk-content{
    width: 100%;
    font-size: 0.13rem;
    color: #AA694E;
    line-height: 0.17rem;
    display: inline-block;
    text-align: left;
    padding-left: 0.53rem;
    padding-right: 5px;
}

</style>
