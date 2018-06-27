<template>
    <div class="chickBlessing">
        <div class="sign sign1" :class="{'sign1_active':blessSignData.signDay==1||blessSignData.signDay==2||blessSignData.signDay==3}"></div>
        <div class="sign sign2" :class="{'sign2_active':blessSignData.signDay==2||blessSignData.signDay==3}"></div>
        <div class="sign sign3" :class="{'sign3_active':blessSignData.signDay==3}"></div>
        <div class="bless-btn" @click="bless"></div>
        <div class="bless-box" :style="'background-image: url('+blessBoxBgList[this.curblessBoxBgIndex].bg+')'" v-show="isShowBlessBox">
            <div class="bless-sign">
                <span class="sign-child" @click="signFn($event)" v-for="(item,index) in awards" :key="index"><img :src="defulatimg+item.imgPath" alt=""><span class="awardCount">x{{item.awardCount}}</span><span class="name" style="display:none">{{item.name}}</span></span>
            </div>
            <!-- 领取奖励 -->
            <div class="sign-draw" v-show="!blessSignData.isDraw||!isDrawReward" @click="signDraw"></div>
            <div class="sign-tips" v-show="blessSignData.isDraw||isDrawReward">已领取祈福奖励，请明日再来</div>
        </div>
        <div class="back" onclick="javascript:history.back(-1);"></div>
    </div> 
</template>
<script>
    export default {
        name:"chickBlessing",
        data(){
            return {
                defulatimg:this.$CommFunc.defulatimg,
                blessSignData:{},
                blessBoxBgList:[
                    { bg:require("./blessing_pop_ups_bg1@2x.png")},
                    { bg:require("./blessing_pop_ups_bg2@2x.png")},
                    { bg:require("./blessing_pop_ups_bg3@2x.png")},
                    { bg:require("./blessing_pop_ups_bg4@2x.png")},
                    { bg:require("./blessing_pop_ups_bg5@2x.png")},
                    { bg:require("./blessing_pop_ups_bg6@2x.png")},
                    { bg:require("./blessing_pop_ups_bg7@2x.png")}                
                ],
                awards:[],
                curblessBoxBgIndex:0, //保存当前显示的随机背景图索引
                isShowBlessBox:false,//是否显示领取奖励弹窗
                isClickBlessBtn:false,//是否点击了祈福按钮
                isDrawReward:false,//是否领取了奖励
            }
        },
        created(){
            this.initChickBless();
        },
        methods:{
            //初始化祈福数据
            initChickBless(){
                this.$ajax({
                method: 'get',
                url: this.$utils.DOMIN+'praySignRecord/praySignRecordInfo'
                }).then((response) => {
                    var rps=response.data;
                    if(rps.ret == 1000){                    
                        this.blessSignData = rps.model;
                        if(this.blessSignData.isSign){                            
                            this.awards = this.blessSignData.awards;
                        }
                        if(this.blessSignData.isDraw){
                            this.isDrawReward = true;
                        }
                    }
                }).catch(err =>{
                    console.log(err);
                }) 
            },
            // 祈福
            bless(){                
                let num = Math.floor(Math.random()*this.blessBoxBgList.length);
                if(!this.isClickBlessBtn){
                    this.curblessBoxBgIndex = num;  
                }            
                
                if(!this.blessSignData.isSign){
                    this.$ajax({
                    method: 'post',
                    url: this.$utils.DOMIN+'praySignRecord/addPraySign'
                    }).then((response) => {
                        var rps=response.data;
                        if(rps.ret == 1000){                    
                            this.awards = rps.model.awardDTOS;
                            this.isShowBlessBox = true;  
                            this.isClickBlessBtn = true;
                            //保存索引值
                            localStorage.setItem("curblessBoxBgIndex",this.curblessBoxBgIndex);
                        }else{
                            wu.showToast({
                                title:rps.msg,
                                duration: 2000
                            });  
                        }
                    }).catch(err =>{
                        console.log(err);
                    }) 
                }else{
                    let _curblessBoxBgIndex =localStorage.getItem("curblessBoxBgIndex")||0;
                    if(_curblessBoxBgIndex!=null){
                        this.curblessBoxBgIndex = _curblessBoxBgIndex;
                    }    
                    this.isShowBlessBox = true;  
                }
            },
            //领取奖励
            signDraw(){                
                this.$ajax({
                method: 'post',
                url: this.$utils.DOMIN+'praySignRecord/drawReward'
                }).then((response) => {
                    var rps=response.data;
                    if(rps.ret == 1000){   
                        wu.showToast({
                            title:"领取成功",
                            duration: 2000
                        });                  
                        this.isDrawReward = true;
                    }else{
                        wu.showToast({
                            title:rps.msg,
                            duration: 2000
                        });  
                    }
                }).catch(err =>{
                    console.log(err);
                }) 
            },
            //点击道具图
            signFn(e){
                document.querySelectorAll(".name").forEach(element => {
                    element.style.display="none";
                });

                e.target.lastChild.style.display="block";
            }
        }
    }
</script>
<style scoped>
.chickBlessing{
    width: 100vw;
    height: 100vh;
    background: url(./blessing_bg@2x.png) center no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    position: relative;
}
.chickBlessing .sign{
    width: 1.2rem;
    height: 1.36rem;
    position: absolute;
    background-position:center;
    background-repeat: no-repeat; 
    background-size: 100% 100%;
}
/*签到2*/
.chickBlessing .sign1{
    top: 49.77511244377811vh;
    left: .18rem;
    background-image: url(./blessing_light_dark_icon1@2x.png);
} 
.chickBlessing .sign1_active{
    background-image: url(./blessing_light_bright_icon1@2x.png);
} 
.chickBlessing .sign2{
    top: 33.5832083958021vh;
    right:.19rem;
    background-image: url(./blessing_light_dark_icon2@2x.png);
} 
.chickBlessing .sign2_active{
    background-image: url(./blessing_light_bright_icon2@2x.png);
} 
.chickBlessing .sign3{
    top: 19.79010494752624vh;
    left: .52rem;
    background-image: url(./blessing_light_dark_icon3@2x.png);
} 
.chickBlessing .sign3_active{
    background-image: url(./blessing_light_bright_icon3@2x.png);
} 
.chickBlessing .bless-btn{
    width: 1.74rem;
    height: 0.9rem;
    background: url(./blessing_icon@2x.png) center no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: 0.57rem;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
}
.chickBlessing .bless-box{
    width: 3.3rem;
    height: 4.64rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -1.65rem;
    margin-top: -2.32rem;
    background-position:center;
    background-repeat: no-repeat; 
    background-size: 100% 100%;
}
.chickBlessing .bless-box .bless-sign{
    position: absolute;
    top:3.02rem;
    left: 0;
    width: 100%;
    display: -webkit-flex; 
    display: flex; 
    -webkit-flex-direction: row; 
    flex-direction: row; 
    -webkit-align-items: center; 
    align-items: center; 
    -webkit-justify-content: center; 
    justify-content: center; 
}
.bless-box .bless-sign .sign-child{
    display: block;
    width: 0.42rem;
    height: 0.43rem;
    position: relative;
    background: url(./blessing_spotlight_img@2x.png) center no-repeat;
    background-size: 100% 100%;
    margin-right: 0.09rem;
}
.bless-box .bless-sign .sign-child img{
    width: 100%;
    height: 100%;
}
.bless-box .bless-sign .sign-child .awardCount{
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 0.10rem;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 1;
}
.bless-box .bless-sign .sign-child .name{
    width: 0.75rem;
    height: 0.3rem;
    line-height: 0.27rem;
    position: absolute;
    left:-0.165rem;
    top: -0.3rem;
    background: url(./name_box_img@2x.png) center no-repeat;
    background-size: 100% 100%;
    font-size: 0.12rem;
    color: #FFFFFF;
    text-align: center;
}
.bless-box .sign-draw{
    width: 1.16rem;
    height: 0.45rem;
    position: absolute;
    left:50%;
    margin-left: -0.58rem;
    bottom: 0.45rem;
    background: url(./blessing_receive_icon@2x.png) center no-repeat;
    background-size: 100% 100%;
}
.bless-box .sign-tips{
    width: 100%;
    position: absolute;
    bottom: 0.6rem;
    font-size: 0.12px;
    color: #FFFFFF;
    text-align: center;
}
.back{
  width: 0.4rem;
  height: 0.4rem;
  position: fixed;
  top: 0.31rem;
  left: 0.15rem;
  background:url(./chicken_house_return_icon2@2x.png) no-repeat center; 
  background-size: 100% 100%;
  z-index: 30;
}
</style>
