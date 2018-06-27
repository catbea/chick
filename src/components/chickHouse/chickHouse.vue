<template>
<div class="chickhouse" :class="{'chickhouse-bg':type}" v-show="isShowChickhouse" style="display:none">
  		<div class="swiper-container" id="alibanner">
        <swiper class="swiper-wrapper" :options="swiperOption" ref="mySwiper" v-if="chickInfo">
          <swiperSlide class="swiper-slide" v-for="(item,index) in chickInfo" :key="index">
            <div class="chick-content">
            	<!-- 鸡蛋数量 -->
            	<div class="chicken_house_eggs_count" v-show="isShowGoldenEggImg" @click="getChickenEggs()">{{item.houseEggs}}</div> 
                <!-- 鸡窝 -->
                <div class="chicken_house_nest_img"></div>
                <!-- 垃圾 -->
                <div class="chicken_house_messy_img" v-show="item.cleannessVal != 100&&!isSHowCleanMove"></div>
                <!-- 清理垃圾动画 -->
                <div class="chicken_house_messy_img_move" v-show="isSHowCleanMove"></div>
                <!-- 鸡 -->
                <div class="chicken_house_big_img" :class="chickenByPeriod" v-show="!isShowGoldenEggImg"   @click="clickChicken"></div>
                <!-- 鸡蛋 -->
                <div class="getChickenEggs" :class="{'receiveEggMove':isShowReceiveEggMove}" v-show="isShowGoldenEggImg"  @click="getChickenEggs()">    
                    <div class="getChickenEggs-img"></div>
                    <div class="ChickenEggsLight"></div>
                </div>

               <!--属性-->
                <div class="growthBox circle-comm">
                  <cicleProgress :tramsFrmValGDef="item.growthVal"  :tramsFrmVal="tramsFrmValG.Val"></cicleProgress>
                  <div  class="defaultVal">{{item.growthVal}}</div>
                </div>
                <div class="HungryBox circle-comm">
                  <cicleProgress :tramsFrmValGDef="item.fullVal" :tramsFrmVal="tramsFrmValH.Val" :tramsFrmWatchctive="watchctiveIndex" :tramsFrmIndex="index" ></cicleProgress>
                  <div  class="defaultVal">{{item.fullVal}}</div>
                </div>
                <div class="ClearBox circle-comm">
                  <cicleProgress :tramsFrmValGDef="item.cleannessVal" :tramsFrmVal="tramsFrmValC.Val"></cicleProgress>
                  <div  class="defaultVal">{{item.cleannessVal}}</div>
                </div>
            
                <div class="chicken_name">{{item.name}}</div>

            </div> 
            
            <div class="chicken_house_pleasure"><img src="./chicken_house_pleasure2_img@2x.png" alt=""><span class="pleasure-txt">愉悦值: </span><span class="pleasure-value">{{item.joyfulVal | addKToPleasureValue}}</span></div>   
              
            <div class="eggTimeWraper" v-show="isSHowEggTimeWraper">
              <span class="time-dist"></span>
              <span class="hour"></span>
              <span class="minute" :style="' transform: rotate('+rotate+'deg);'"></span>
            </div>
            <!-- 对话组件 -->
            <!-- 单行文字调用 -->
            <!-- <chickTalk ref="chickTalkWraper"><span class="talk-content-sin">别偷看，我在睡觉哦~</span></chickTalk> -->
            <!-- <chickTalk :isSHowChickTalk="isSHowChickTalk">
              <span class="talk-content-sin" v-if="isSHowDormancy">我休眠了,我要吃东西~</span>
              <span class="talk-content-sin" v-if="isSHowSleep">别偷看，我在睡觉哦~</span>
              <span class="talk-content-sin" v-if="isSHowProduce">别偷看，好害羞哎~</span>
              <span class="talk-content-sin" v-if="isSHowClear">我爱洗澡皮肤好好，昂昂昂昂</span>
              <span class="talk-content-sin" v-if="isSHowClearAll">宝宝现在不想洗澡</span>
              <span class="talk-content-sin" v-if="isSHowSendOut">宝宝出去玩了，会按时回来哦</span>
              <span class="talk-content-sin" v-if="isSHowHungry">宝宝饿得一点力气都没有了</span>
              <span class="talk-content-sin" v-if="isSHowGoHome">宝宝现在不方便出门</span>
              <span class="talk-content-sin" v-if="isSHowDoSleep">宝宝现在只想睡觉</span>
              <span class="talk-content-sin" v-if="isSHowFeedFull">宝宝已经吃不下了！</span>
              <span class="talk-content-sin" v-if="isSHowFeedA">如果现在有一碗谷子，宝宝能一口吃完~</span>
              <span class="talk-content-sin" v-if="isSHowFeedB">宝宝的肚子在咕咕叫了，好想吃饭哦~</span>          
            </chickTalk> -->
          </swiperSlide>

        </swiper>
		  </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    
    <div class="pageBottom">   
    	<!--<div class="itemtype" :class="{'fadeOut':feed,'fadeIn':listfeed}">-->
    	<div class="itemtype" v-show="feed">
    		<div class="itemtypeBg">
    			<img class="bg_img_item" width="100%" src="./chicken_house_bottom2_img@3x.png" />
    			<div class="itemClick">
	    			<div class="sendOut" @click="sendOutAll"><img src="./chicken_house_stocking_icon@2x.png" /></div>
	    			<div class="feedItem" @click="feedListShow"><img src="./chicken_house_feeding_icon@2x.png" /></div>
	    			<div class="ClearItem" @click="clearAll"><img src="./chicken_house_clear_icon@2x.png" /></div>
    			</div>
    		</div>
    	</div>
    	<!--<div class="clickFeed" :class="{'fadeIn':feed,'fadeOut':listfeed}">-->
    	<div class="clickFeed" v-show="listfeed">
    		<div class="closeBox" @click="feedTypeShow"><img  src="./close_button_icon@2x.png" width="100%" /></div>
    		
    		<div class="swiper-container-feed" id="swiperFeedList">
		        <swiper class="swiper-wrapper-feed" :options="swiperOptionFeedList" ref="mySwiperFeedList">
					
					
					<swiperSlide class="swiper-slide-feed" v-for="(item,index) in feedListArr" :key="index">
						<div class="chick-content-feed" @click="feedChick(item)">
							<img :src="defulatimg+item.productImg" />
							<div class="name_num_feed">
								<span>{{item.name}}</span>
							</div>
							<div class="feed_num_fiex">
								<span>×</span><span>{{item.quantity}}</span>
							</div>
						</div> 
					</swiperSlide>
					<swiperSlide class="swiper-slide-feed">
						<div class="chick-content-feed">
              <router-link to='/chickShop' class="navigator">						
								<img src="./feeding_store_icon@2x.png" />
								<div class="name_num_feed">
									去商店
								</div>
							</router-link>
						</div> 
					</swiperSlide>		         
		        </swiper>
		        <div class="swiper-button-next-feed"></div>
      			<div class="swiper-button-prev-feed"></div>
		  	</div>  		
    	</div>
    </div>    
    <div class="back" onclick="javascript:history.back(-1);"></div>
	
</div>
</template>
<script>
// alert(document.body.clientWidth+','+document.body.clientHeight);
  var timer_house =null; //小鸡随机对话定时器
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import cicleProgress from '../plugin/circleProgress/circleProgress.vue'
  // import chickTalk from '../plugin/chickTalk/chickTalk.vue'
  export default {
        data(){
            return {
              defulatimg:this.$CommFunc.defulatimg,
              watchctiveIndex:0,
              currentPage:1,
              pageSize:10,
              feedListArr:"",
              show: true ,
              feed:true,
              feedClick:false,
              listfeed:false,
              isSHowClearAll:false,
              isSHowClear:false,
              isSHowSendOut:false,
              isSHowHungry:false,
              isSHowGoHome:false, 
              isSHowDoSleep:false,
              isSHowFeedFull:false,
              isSHowFeedA:false,
              isSHowFeedB:false,
              type:false,
              clickNum:1,
              isShowReceiveEggMove:false,//是否加载领取鸡蛋动画
              isShowChickhouse:false,//时候显示鸡舍界面
              isSHowCleanMove:false,//是否显示打扫动画
              isShowGoldenEggImg:false,//生完蛋显示蛋
              isSHowEggTimeWraper:false,//是否显示生蛋倒计时
              isSHowDormancy:false,//是否处于休眠
              isSHowSleep:false,//是否处于睡眠
              isSHowProduce:false,//是否处于生蛋
              isSHowChickTalk:false,//是否显示对话
              isSHowEggs:false,//是否显示蛋数
              randomChickTalk:true,//随机不定时出发小鸡对话
              rotate:0,//旋转角度
              model:{},//鸡舍数据集
              chickInfo:[],//小鸡列表
              swiperOption:{},
              chickenByPeriod:"",
              talkContentIndex:-1, //保存小鸡对话随机值
              talkList:[ // 小鸡随机对话
                  {"name":"长大以后，宝宝要做一只战斗鸡！拳打少林脚踢峨眉"},
                  {"name":"宝宝在想，是先打个滚呢，还是先游个泳呢"},
                  {"name":"长得高的才叫雄鸡，长得矮的那叫短小的鸡崽~"},
                  {"name":"长得白的才叫高冷，长得黑的那叫冰霜乌骨鸡~"},
                  {"name":"好热啊，好想喝肥鸡快乐水~喝完马上变快乐"},
                  {"name":"啊！大海啊~全是水，夏天啊~全是腿！"}
              ],
	            swiperOptionFeedList: {
	                pagination: {
	                  el: '.swiper-pagination',
	                  clickable: true,
	                  renderBullet(index, className) {
	                    return `<span class="${className} swiper-pagination-bullet-custom"></span>`
	                  }
	                },
	               
			        effect : 'slide',
					slidesPerView: 3,
					centeredSlides: true,
					coverflow: {
			            rotate: 10,
			            stretch: 0,
			            depth: 0,
			            modifier: 50,
			            slideShadows : false
			       },
			        
	                paginationClickable: false,
	                navigation: {
	                  nextEl: '.swiper-button-next-feed',
	                  prevEl: '.swiper-button-prev-feed',
	                },
	                on: {
	                    slideChangeTransitionStart: function(){
	                    }
	                }
	            },
	            tramsFrmValG:{
	            	ValDefault:0,
	            	Val:0,
	            },
	            tramsFrmValH:{
	            	ValDefault:0,
	            	Val:0,
	            },
	            tramsFrmValC:{
	            	ValDefault:0,
	            	Val:0,
	            },
            }
        },
        components:{
        	cicleProgress,
        	swiper,
          swiperSlide
          // chickTalk
        },
        created(){
          wu.showChickLoding();
          this.swiperOption = this.initSwiperConfig();
          this.initMyChickHouseInfo();           
        }, 
        watch:{
          watchctiveIndex:function(val,oldVal){
            if(val!=oldVal){
              this.chickenByPeriod = this.chickenByPeriodClass();              
            }
            console.log(val, oldVal)
          }
        },        
        mounted() {
          //this.onReady();               
          this.getFeedList();      
        }, 
        destroyed(){          
          wraper.remove(); 
          clearTimeout(timer_house);
          clearTimeout(timer);
        }, 
        methods:{
          //初始化swiper配置
          initSwiperConfig(){
            let _self = this;
            return {pagination: {
	                  el: '.swiper-pagination',
	                  clickable: true,
	                  renderBullet(index, className) {
	                    return `<span class="${className} swiper-pagination-bullet-custom"></span>`
	                  }
	                },
	                paginationClickable: false,
	                navigation: {
	                  nextEl: '.swiper-button-next',
	                  prevEl: '.swiper-button-prev',
	                },
	                on: {
	                    slideChangeTransitionStart: function(){   
                        _self.watchctiveIndex = this.activeIndex;
                        clearTimeout(timer_house);
                        console.log("滚动索引",this.activeIndex);
	                    }
	                }
	            }
          },
          //取小鸡的状态图片
          chickenByPeriodClass(){
              //根据当前小鸡的生长状态period的值 确定小鸡需要显示的图片  每种状态有三个图片
                //period :GROWTH HALF_GROWTH MATURE 
              // ACTIVITY (活动)  SLEEP（睡眠）    HUNGER(饥饿)    HUNGERHALO(饿晕,需要睡眠)  PRODUCE（生产）
              let outside = this.chickInfo[this.watchctiveIndex].outside;//是否被放养
              let inHouse = this.chickInfo[this.watchctiveIndex].inHouse;//是否在鸡舍
              let status = this.chickInfo[this.watchctiveIndex].status;
              // let status = "ACTIVITY";
              let period = this.chickInfo[this.watchctiveIndex].period;
              let houseEggs = this.chickInfo[this.watchctiveIndex].houseEggs;
              let eggLayCutdown = this.chickInfo[this.watchctiveIndex].eggLayCutdown;//生蛋时间
              //  console.log(outside,period,status,this.watchctiveIndex);

              //初始化倒计时和鸡蛋显示
              this.isSHowEggTimeWraper=false;
              this.isShowGoldenEggImg = false;
              this.isShowReceiveEggMove = false;

              // if(houseEggs!=0){
              //   this.isSHowEggTimeWraper=false;
              //   this.isShowGoldenEggImg = true;
              //   // return ;
              // }          
               //被放养就不需要显示图片了
              if(!inHouse){//不在鸡舍
                if(houseEggs!=0){
                  this.isShowGoldenEggImg = true;
                  showMessage.showInfo({
                    period:this.chickInfo[this.watchctiveIndex].period,
                    message: '点击金蛋可以领取哦~',
                    time: 3000
                  });
                }else{
                  showMessage.showInfo({
                    period:this.chickInfo[this.watchctiveIndex].period,
                    message: '宝宝出去玩了，会按时回来哦~',
                    time: 3000
                  });
                }                  
                return ;
              }else{//在鸡舍
                if(houseEggs!=0){
                  this.isShowGoldenEggImg = true;
                  showMessage.showInfo({
                    period:this.chickInfo[this.watchctiveIndex].period,
                    message: '点击金蛋可以领取哦~',
                    time: 3000
                  });
                }
              }   

              // debugger
              if(status ==="ACTIVITY"||status ==="HUNGER"){
                if(inHouse){
                  this.randomChickTalkFun(); 
                } 
                //图片随机
                let mum =Math.ceil(Math.random()*3);
                if(mum==1){return period+'_'+mum}
                else if(mum==2){return period+'_'+mum}
                else if(mum==3){return period+'_'+mum}

              }
              else if(status ==="HUNGERHALO"){
                this.isSHowDormancy = true;
                showMessage.showInfo({
                  period:this.chickInfo[this.watchctiveIndex].period,
                  message: '我休眠了,我要吃东西~',
                  time: 3000
                });
                return period+"_"+status;
              }
              else if(status ==="PRODUCE"){
                this.isSHowProduce=true;

                let eggLayCutdown = this.chickInfo[this.watchctiveIndex].eggLayCutdown;
                if(eggLayCutdown!=0){
                  this.isSHowEggTimeWraper=true;
                  //计算剩余的倒计时时间
                  let remainCutdown=eggLayCutdown==60?eggLayCutdown:60-eggLayCutdown;
                  if(remainCutdown==60){
                    this.rotate=0;
                  }else{
                    this.rotate=remainCutdown*6;
                  }
                  //生蛋倒计时
                  let timer6 = setInterval(()=>{
                      this.rotate +=6;
                      if(this.rotate==360){
                        this.rotate = 360;
                        clearInterval(timer6);
                      }
                  },60000)  
                }   
                showMessage.showInfo({
                  period:this.chickInfo[this.watchctiveIndex].period,
                  message: '别偷看，好害羞哎~',
                  time: 3000
                });
                return period+"_"+status;
              }
              else if(status ==="SLEEP"){
                this.isSHowSleep = true;                
                showMessage.showInfo({
                  period:this.chickInfo[this.watchctiveIndex].period,
                  message: '别偷看，我在睡觉哦~',
                  time: 3000
                });
                return period+"_"+status;
              }else{

              }
          },
          //点击小鸡,触发对话
          clickChicken(){
              let status = this.chickInfo[this.watchctiveIndex].status;
              if(status !="ACTIVITY"){
                return ;
              }
              this.randomChickTalkFun();
          },
          //随机触发小鸡对话方法
          randomChickTalkFun(){
              clearTimeout(timer_house);
              let num = Math.floor(Math.random()* this.talkList.length);
              //如果上次的随机数和本次的相等,重新调用
              if(this.talkContentIndex == num){   
                  this.randomChickTalkFun()             
                  return ;
              }
              this.talkContentIndex = num;

              showMessage.showInfo({
                period:this.chickInfo[this.watchctiveIndex].period,
                message: this.talkList[num].name,
                time: 3000
              });
              //随机时间触发
              let randomTime = (Math.ceil(Math.random()*15))*10000;
              randomTime = randomTime>2000?randomTime:2;
              timer_house = setTimeout(()=>{                
                this.randomChickTalkFun();
              },randomTime);           
          },
          //初始化鸡舍信息
          initMyChickHouseInfo(){
            this.$ajax({
              method: 'get',
              url: this.$utils.DOMIN+'rangelandInfo/getMyChickHouseInfo'
            }).then((response) => {
                var rps=response.data;
                if(rps.ret == 1000){
                  this.model = rps.model;
                  this.chickInfo = this.model.chickInfo;
                  this.type = (this.model.type!='DAY');    

                  this.chickenByPeriod = this.chickenByPeriodClass();
                  wu.hideChickLoding();
                  this.isShowChickhouse = true;
                }else{
                  wu.hideChickLoding();
                  this.isShowChickhouse = true;
                }

            }).catch(err =>{
                wu.hideChickLoding();
                this.isShowChickhouse = true;
            })
          },
          //领取鸡蛋
        	getChickenEggs(){
            this.$ajax({
              method: 'PUT',
              url: this.$utils.DOMIN+'chicken/receiveEggs',
              params:{
                chickNum:this.chickInfo[this.watchctiveIndex].num
              }
            }).then((response) => {
                var rps=response.data;
                if(rps.ret == 1000){
                  this.isShowReceiveEggMove = true;
                  setTimeout(()=>{
                    this.isShowGoldenEggImg = false;
                    this.isShowReceiveEggMove = false;
                    this.initMyChickHouseInfo(); 
                    wu.showToast({
                      title: "领取成功！",
                      duration: 2000
                    });    
                  },1500);

                }
            }).catch(err =>{
              console.log(err);
            }) 
          },
        	feedListShow:function(){
            console.log(this.feed);
        			this.feed = false;
        			this.listfeed = true;
        			console.log("feed:"+this.feed);
        			console.log("listfeed:"+this.listfeed);
        	},
        	feedTypeShow:function(){
        			this.feed = true;
        			this.listfeed = false;
        			/*console.log("feed:"+this.feed);
        			console.log("listfeed:"+this.listfeed);
        			setTimeout(() => {
        				this.feed = false;
        				this.listfeed = false;
        				console.log("feed:"+this.feed);
        				console.log("listfeed:"+this.listfeed);
        			},1500)*/
        			
        			
        	},
        	//喂食小鸡
        	feedChick:function(feedChick){
        			var that =this;
        			var depot_id = feedChick.id;
        			var chick_num = this.chickInfo[this.watchctiveIndex].num;
        			let Feedperiod =this.chickInfo[this.watchctiveIndex].period;
        			var VinHouse = this.chickInfo[this.watchctiveIndex].inHouse;
        			var growthVal = this.chickInfo[this.watchctiveIndex].growthVal;
        			var params = {
        				inventoryId:depot_id,
        				num:chick_num
        			};
        			
        			if(!VinHouse){
        				showMessage.showInfo({
			                period:Feedperiod,
			                message: "宝宝出去玩了，会按时回来哦",
			                time: 3000
			            });
			            return;
              }

              if(this.chickInfo[this.watchctiveIndex].fullVal == 100){
                  showMessage.showInfo({
                      period:Feedperiod,
                      message: "宝宝已经吃不下了！",
                      time: 3000
                  });
                  return ;
              }       			
        			
        			this.$ajax({
        				method: 'POST',
				        url: that.$utils.ownerFeed,
				        params: params,
        			}).then((response) => {
        				//console.log(response);
			      		let rps = response.data;
        				if (rps.ret === 1000) {

							if(rps.model.fullVal < 100){	        						
								this.tramsFrmValH.Val = feedChick.fullVal;        								
								if(this.clickNum%2 ==0){	        							
									showMessage.showInfo({
						                period:Feedperiod,
						                message: "如果现在有一碗谷子，宝宝能一口吃完~",
						                time: 3000
						            });	        							
								}else{	        							
									showMessage.showInfo({
						                period:Feedperiod,
						                message: "宝宝的肚子在咕咕叫了，好想吃饭哦~",
						                time: 3000
						            });	        							
								}
		                    }
		                    if(growthVal !=100){
		                      // let _growthVal =growthVal + feedChick.growthVal;
		                      this.tramsFrmValG.Val = feedChick.growthVal;
		                    }       					
			
							if(rps.model.fullVal == 100){
								var numMath = Math.floor(Math.random()*10+1);
								if(numMath%2 == 0){
									showMessage.showInfo({
						                period:Feedperiod,
						                message: " 宝宝现在充满了力量，感觉能绕着牧场跑十圈",
						                time: 3000
						            });
								}else{
									showMessage.showInfo({
						                period:Feedperiod,
						                message: "鸡是铁，谷是钢，一顿不吃贼拉慌",
						                time: 3000
						            });
								}										
		                    }
		
		                    this.initMyChickHouseInfo();       					
				            this.getFeedList();
				             	
			        	}else if(rps.ret === 2019){
			        		showMessage.showInfo({
					                period:Feedperiod,
					                message: "宝宝已经吃不下了！",
					                time: 3000
					            });
			        	}else{
			        		wu.showToast({
                    title: rps.msg,
                    mask: false,
                    icon: 'icon-info', // icon-success | icon-error | icon-info
                    duration: 2000
                  });
			        	}
			        		
        			})
        			
        			this.clickNum++;
        			console.log(this.clickNum);
        	},
        	//饲料列表
        	getFeedList:function(){
        		var that =this;
        		var params={
			        currentPage: that.currentPage,
			        pageSize: that.pageSize 
			    }
        		this.$ajax({
			        method: 'GET',
			        url: that.$utils.getMyInventoryFeedInfo,
			        params: params,
			      }).then((response) => {
			      	let rps = response.data;
			        if (rps.ret === 1000) {
			             this.feedListArr = rps.model.records;
			        }else{
			            wu.showToast({
                    title: rps.msg,
                    mask: false,
                    icon: 'icon-info', // icon-success | icon-error | icon-info
                    duration: 2000
                  });
			        }
			        
			      }).catch(function (error) {
			        console.log(error);
			      });     		
        	},
        	//放养
        	sendOutAll:function(){
        		var that =this;
	            var statusChick = this.chickInfo[this.watchctiveIndex].status;
	            var sendOutperiod = this.chickInfo[this.watchctiveIndex].period;
        		
        		if(statusChick == "SLEEP"){//（睡眠）
			            showMessage.showInfo({
			                period:sendOutperiod,
			                message: "宝宝现在只想睡觉",
			                time: 3000
			            });
	            }else if(statusChick == "HUNGERHALO"){//（饥饿）
	            		showMessage.showInfo({
			                period:sendOutperiod,
			                message: "宝宝饿得一点力气都没有了",
			                time: 3000
			            });
	            		
	            }else if(statusChick == "PRODUCE"){//（生产）
	            		showMessage.showInfo({
			                period:sendOutperiod,
			                message: "宝宝现在不方便出门",
			                time: 3000
			            });
	            }
        		this.$ajax({
			        method: 'GET',
			        url: that.$utils.restocking,
			       
			      }).then((response) => {
			      	console.log(response);
			      	let rps = response.data;
			        if (rps.ret === 1000) {
			            if(statusChick == "ACTIVITY"){//(活动) 
			            	
	            			showMessage.showInfo({
				                period:sendOutperiod,
				                message: "宝宝出去玩了，会按时回来哦",
				                time: 3000
				            });
			           
			            }
			            
			            this.initMyChickHouseInfo();
			            
			        }else{
			            wu.showToast({
                    title: rps.msg,
                    mask: false,
                    icon: 'icon-info', // icon-success | icon-error | icon-info
                    duration: 2000
                  });
						
			        }
			        
			      }).catch(function (error) {
			        console.log(error);
			      });
        	},
        	//清洁
        	clearAll:function(){
        		var clearperiod = this.chickInfo[this.watchctiveIndex].period;
            var that =this;
            if(this.chickInfo[this.watchctiveIndex].cleannessVal==100){
		        		showMessage.showInfo({
                    period:clearperiod,
                    message: "宝宝现在不想洗澡",
                    time: 3000
                });
                return ;
            }else{
                this.isSHowCleanMove = true;
                setTimeout(()=>{
                  this.isSHowCleanMove = false;
                },1000);
            }
        		this.$ajax({
			        method: 'PUT',
			        url: that.$utils.ownerSweep+"?typeEnum=HOUSE",
        		}).then((response) => {
			      	console.log(response);
			      	let rps = response.data;
			        if (rps.ret === 1000) {
			        	
			        	if(this.chickInfo[this.watchctiveIndex].cleannessVal != 100){
			        		this.tramsFrmValC.Val = (100 - this.chickInfo[this.watchctiveIndex].cleannessVal);
			        	}
			        	var cleannessValItme = this.chickInfo[this.watchctiveIndex].cleannessVal;
                		
			        	if(cleannessValItme == 100){
			        		
			        		showMessage.showInfo({
				                period:clearperiod,
				                message: "宝宝现在不想洗澡",
				                time: 3000
				            });
				            
			        	}else{
			        		showMessage.showInfo({
				                period:clearperiod,
				                message: "我爱洗澡皮肤好好，昂昂昂昂",
				                time: 3000
				            });
			        	}
			        	
			        	
			        	
						this.initMyChickHouseInfo();
						
			        }else{
			            wu.showToast({
							title: rps.msg,
							mask: false,
							icon: 'icon-info', // icon-success | icon-error | icon-info
							duration: 2000
						});
			        }
			        
			      }).catch(function (error) {
			        console.log(error);
			      });
			    
        	},
        	
        }        
    } 
</script>
<style scoped>
@import url(../../../static/font/font.css);
.back{
  width: 0.4rem;
  height: 0.4rem;
  position: fixed;
  top: 0.31rem;
  left: 0.15rem;
  background:url(./chicken_house_return_icon@2x.png) no-repeat center; 
  background-size: 100% 100%;
  z-index: 30;
}
.pageBottom{ position: absolute;bottom: 0;width: 100%;z-index: 100; height: 1.26rem;}
.itemtype{position: absolute;bottom: 0;background: url(chicken_house_bottom1_img@2x.png) center center no-repeat; background-size:100% 100%;height: 1.26rem; width: 100%;}
.itemtypeBg{position: relative;margin: 0 0.15rem;z-index: 99;bottom: 0; height: 1.26rem;}
.bg_img_item{position: absolute; bottom: 0.08rem; height: 0.66rem;}
.itemClick{display: flex; z-index: 101;position: relative;height: 1.26rem;}
.sendOut{ width: 0.9rem;margin-left: 0.16rem; height: 1.26rem;position: relative; bottom: 0.08rem;}
.sendOut img{ position: absolute;bottom: 0.11rem;}
.feedItem{ width: 1.17rem;margin-left: 0.08rem;height: 1.26rem;position: relative; bottom: 0.08rem;}
.feedItem img{ position: absolute;bottom: 0.05rem;}
.ClearItem{ width: 0.9rem;margin-left: 0.06rem; height: 1.26rem;position: relative; bottom: 0.08rem;}
.ClearItem img{ position: absolute;bottom: 0.11rem;}
.clickFeed{position: relative;opacity: 1; background: url(chicken_house_bottom1_img@2x.png) center center no-repeat; background-size:100% 100%;height: 1.26rem; width: 100%;}
.closeBox{ position: absolute; right: 0px; top: -20px; width: 0.4rem;z-index: 5;}
.chickhouse{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  background-image:url(./chicken_house_bg_day_img@2x.png); 
}
.chickhouse-bg{
    background-image:url(./chicken_house_bg_img@2x.png); 
}
.swiper-wrapper{
    width: 100vw;
  height: 100vh;
}
.swiper-container {
	margin-right: auto;
	margin-left: auto;
	width: 100%;
}

.swiper-slide {
	display: -webkit-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	text-align: center;
	font-size: 18px;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	-webkit-align-items: center;
	align-items: center;
position: relative;
}

.swiper-button-next, .swiper-button-prev {
    position: absolute;
    top: 35vh;
    width: 0.4rem;
    height: 0.62rem;
    margin-top: -22px;
    z-index: 10;
    cursor: pointer;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}
.swiper-button-prev, .swiper-container-rtl .swiper-button-next {
    background-image: url(./chicken_house_left_icon@2x.png);
    left: 4px;
    right: auto;
}
.swiper-button-next, .swiper-container-rtl .swiper-button-prev {
    background-image: url(./chicken_house_right_icon@2x.png);
    right: 4px;
    left: auto;
}
.swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled {
    display: none;
}



.swiper-wrapper-feed{
  width: 100vw;
  height:1.16rem;
}
.swiper-container-feed {
	margin-right: auto;
	margin-left: auto;
	width: 100%;
}

.swiper-slide-feed {
	width: 1.24rem;
	height: 1.19rem;
	display: -webkit-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	text-align: center;
	font-size: 18px;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	-webkit-align-items: center;
	align-items: center;
	position: relative;
}
.swiper-slide-feed:nth-child(4n-3) .chick-content-feed{background: url(feeding_purple_big_icon@2x.png) center center no-repeat; background-size: 100% 100%;}
.swiper-slide-feed:nth-child(2) .chick-content-feed{background: url(feeding_rad_big_icon@2x.png) center center no-repeat; background-size: 100% 100%}
.swiper-slide-feed:nth-child(4n-2) .chick-content-feed{background: url(feeding_rad_big_icon@2x.png) center center no-repeat; background-size: 100% 100%}
.swiper-slide-feed:nth-child(3) .chick-content-feed{background: url(feeding_yellow_big_icon@2x.png) center center no-repeat; background-size: 100% 100%}
.swiper-slide-feed:nth-child(4n-1) .chick-content-feed{background: url(feeding_yellow_big_icon@2x.png) center center no-repeat; background-size: 100% 100%}
.swiper-slide-feed:nth-child(4) .chick-content-feed{background: url(feeding_green_big_icon@2x.png) center center no-repeat; background-size: 100% 100%}
.swiper-slide-feed:nth-child(4n-4) .chick-content-feed{background: url(feeding_green_big_icon@2x.png) center center no-repeat; background-size: 100% 100%}
.swiper-slide-feed:last-child .chick-content-feed{background: url(feeding_purple_big_icon@2x.png) center center no-repeat;background-size:100% 100% ;}


.swiper-slide-active{}
#swiperFeedList .swiper-slide-prev{width: 0.86rem;
	height: 0.75rem;
	display: -webkit-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	text-align: center;
	font-size: 18px;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	-webkit-align-items: center;
	align-items: center;
	position: relative;
	top:0.1rem;
	
	}
#swiperFeedList .swiper-slide-next{width: 0.86rem;
	height: 0.75rem;
	display: -webkit-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	text-align: center;
	font-size: 18px;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	-webkit-align-items: center;
	align-items: center;
	position: relative;
	top:0.1rem;
	
	}


.swiper-button-next-feed, .swiper-button-prev-feed {
    position: absolute;
    width: 1.1rem;
    height: 1rem;
    bottom: 0.1rem;
    z-index: 10;
    cursor: pointer;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}
.swiper-button-prev-feed, .swiper-container-rtl .swiper-button-next-feed {
    background:#007AFF;
    opacity: 0;
    left: 0;
    right: auto;
}
.swiper-button-next-feed, .swiper-container-rtl .swiper-button-prev-feed {
    background:#22CC22;
    opacity: 0;
    right: 0;
    left: auto;
}
.swiper-button-next-feed.swiper-button-disabled, .swiper-button-prev-feed.swiper-button-disabled {
    display: none;
}

#swiperFeedList .swiper-slide-prev .chick-content-feed img{width: 0.46rem;
    height: 0.46rem;
    border-radius: 0.46rem;
    margin-top: 0.15rem;}

    
#swiperFeedList .swiper-slide-active .chick-content-feed{
	width: 100%;height: 100%;font-size: 0.1rem;color: #FFFEFE;position: relative;
}    

#swiperFeedList .chick-content-feed .feed_num_fiex{
	position: absolute;right: 0.08rem; top: 0;background: #FF7520;border: 1px solid #FFFFFF;border-radius: 44px;padding: 0 0.05rem;
}
#swiperFeedList .chick-content-feed .feed_num_fiex span:first-child{
	position: relative;bottom:-2px;
}	
#swiperFeedList .swiper-slide-prev .chick-content-feed{
	width: 0.97rem;height: 0.85rem;font-size: 0.1rem;color: #FFFEFE;position: relative;top: 0.15rem;
}
#swiperFeedList .swiper-slide-next .chick-content-feed{
	width: 0.97rem;height: 0.85rem;font-size: 0.1rem;color: #FFFEFE;position: relative;top: 0.15rem;
}
#swiperFeedList .swiper-slide-active .chick-content-feed img{width: 0.61rem;
    height: 0.61rem;
    border-radius: 0.61rem;
    margin-top: 0.1rem;}

#swiperFeedList .swiper-slide-next .chick-content-feed img{width: 0.36rem;
    height: 0.36rem;
    border-radius: 0.36rem;
    margin-top: 0.09rem;}
#swiperFeedList .swiper-slide-prev .chick-content-feed img{width: 0.36rem;
    height: 0.36rem;
    border-radius: 0.36rem;
    margin-top: 0.09rem;}
#swiperFeedList .swiper-slide-active .chick-content-feed .name_num_feed{ margin-top: 0.12rem}
#swiperFeedList .swiper-slide-prev .chick-content-feed .name_num_feed{ margin-top: 0.12rem;}
#swiperFeedList .swiper-slide-next .chick-content-feed .name_num_feed{ margin-top: 0.12rem;}
/*.chick-content-feed{ width: 100%;height: 1.19rem;font-size: 0.1rem;color: #FFFEFE;transform: rotate(0deg);}
.chick-content-feed img{ width: 0.61rem; height: 0.61rem;border-radius: 0.61rem;margin-top: 0.15rem;}
.name_num_feed{ margin-top: 0.05rem;}*/
.chick-content-feed a{color: #fff;}
.chickhouse .chicken_house_pleasure{
  min-width: 1.03rem;
  height: 0.3rem;
  line-height: 0.35rem;
  position: absolute;
  right: 0.15rem;
  top:0.31rem;
  background: url(./chicken_house_pleasure3_img.png) no-repeat center;
  background-size: 100% 100%;
  display: -webkit-box;
  -webkit-box-align: center;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  padding-right: 8px;
}
.chickhouse .chicken_house_pleasure img{
  width: 0.34rem;
  height: 0.34rem;
  position: relative;
  margin-right: 0.04rem;
}
.chicken_house_pleasure .pleasure-txt{
  font-size: 0.12rem;
  color: #A45E49;
  vertical-align: middle;
}
.chicken_house_pleasure .pleasure-value{
  font-size: 15px;
  color: #FF6800;
}
.chickhouse .getChickenEggs{
  width: 1rem;  
  height: 1.28rem;
  position: absolute;
  top: 0.29rem;
  left: 1.39rem;
  z-index: 5;
}
.chickhouse .receiveEggMove{
  transform-origin: 50% 100%;
-webkit-animation-name:receiveEggMove; /*动画名称*/
	-webkit-animation-duration: 1.5s; /*动画持续时间*/
	-webkit-animation-iteration-count: 1; /*动画次数*/
	-webkit-animation-delay: 0s; /*延迟时间*/
	animation-fill-mode:both;

}
@-webkit-keyframes receiveEggMove{
  0%{
    transform: rotate(0deg);
  }
  30%{
    transform: rotate(15deg);
  }
  60%{
    transform: rotate(-15deg);
  }
  90%{
    transform: rotate(15deg);
    opacity: 1;
  }
  90%{
    transform: rotate(0deg);
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
.chickhouse .getChickenEggs-img{
  width: 100%;  
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  background: url(./golden_egg_img@2x.png) no-repeat center;
  background-size: 100% 100%;

}
.chickhouse .getChickenEggs .ChickenEggsLight{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #FEF960;
  border-radius:1rem;
  z-index: 4;
  animation: eggsMove 2s infinite 0s;
  filter: blur(8px);
}
@-webkit-keyframes eggsMove{
  0%{
    transform: scale(1);
    opacity: 1;
  }
  /* 20%{
     transform: scale(1.2);
     opacity: 0.9;
  }
  40%{
     transform: scale(1.4);
      opacity: 0.7;
  } */
  50%{
     transform: scale(1.4);
     opacity: 0.6;
  }
  /* 60%{
     transform: scale(1.4);
     opacity: 0.7;
  }
  80%{
     transform: scale(1.2);
     opacity: 0.7;
  } */
  100%{
    transform: scale(1);
    opacity: 1;
  }
}
.chickhouse .chick-content{
  width: 100vw;
  height: 4.95rem;
  position: absolute;
  bottom: 0;
  left: 0;
  background: url(./chicken_house_bg2_img@2x.png) no-repeat center;
  background-size: 100% 100%;
}
.chick-content .chicken_house_nest_img{
  width: 2.12rem;
  height: 0.58rem;
  position: absolute;
  left: 50%;
  bottom: 3.09rem;
  transform: translateX(-50%);
  background: url(./chicken_house_nest_img@2x.png) no-repeat center;
  background-size: 100% 100%;
  z-index: 10;
}
.chick-content .chicken_house_messy_img{
  width: 2.25rem;
  height: 0.82rem;
  position: absolute;
  left: 50%;
  top: 1.16rem;
  transform: translateX(-50%);
  background: url(./chicken_house_messy_img.png) no-repeat center;
  background-size: 100% 100%;
  z-index: 10;
}
.chick-content .chicken_house_messy_img_move{
  width: 100vw;
  height:1.95rem;
  position: absolute;
  left: -0.35rem;
  top: 8vh;
  background: url(./clean.gif) no-repeat center;
  background-size: 100% 100%;
  z-index: 10;
}
.chick-content .chicken_house_big_img{
  width: 1.55rem;
  height: 1.75rem;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
.chickhouse .chicken_house_eggs_count{
  width: 0.59rem;
  height: 0.22rem;
  position: absolute;
  top: 0.91rem;
  left: 50%;
  font-family: ArialHebrew-Bold;
  background: url(./combined_shape_img@2x.png) no-repeat center;
  background-size: 100% 100%;
  transform: translateX(-50%);
  font-size: 0.15rem;
  color: #f00;
  z-index: 25;

}
/*雏鸡期*/
.chick-content .GROWTH_1{
    background: url(./chicken_house_small1_img.png) no-repeat center;
    background-size: 100% 100%;
}
.chick-content .GROWTH_2{
    background: url(./chicken_house_small2_img.png) no-repeat center;
    background-size: 100% 100%;
}
.chick-content .GROWTH_3{
    background: url(./chicken_house_small3_img.png) no-repeat center;
    background-size: 100% 100%;
}
/*活动*/
.chick-content .GROWTH_ACTIVITY{
  display: none;
}
/*休眠*/
.chick-content .GROWTH_HUNGERHALO{
    background: url(./chicken_house_dormancy_img.png) no-repeat center;
    background-size: 100% 100%;
}
/*睡眠*/
.chick-content .GROWTH_SLEEP{
    background: url(./chicken_house_bed_img.png) no-repeat center;
    background-size: 100% 100%;
}

/*发育期*/
.chick-content .HALF_GROWTH_1{
    background: url(./chicken_house_in1_img.png) no-repeat center;
    background-size: 100% 100%;   
}
.chick-content .HALF_GROWTH_2{
    background: url(./chicken_house_in2_img.png) no-repeat center;
    background-size: 100% 100%;
}
.chick-content .HALF_GROWTH_3{
    background: url(./chicken_house_in3_img.png) no-repeat center;
    background-size: 100% 100%;
}
/*活动*/
.chick-content .HALF_GROWTH_ACTIVITY{
  display: none;
}
/*休眠*/
.chick-content .HALF_GROWTH_HUNGERHALO{
    background: url(./chicken_house_in_dormancy_img.png) no-repeat center;
    background-size: 100% 100%;
}
/*睡眠*/
.chick-content .HALF_GROWTH_SLEEP{
    background: url(./chicken_house_in_bed_img.png) no-repeat center;
    background-size: 100% 100%;
}

/*成熟期*/
.chick-content .MATURE_1{
  background: url(./chicken_house_big_img.png) no-repeat center;
  background-size: 100% 100%;
}
.chick-content .MATURE_2{
    background: url(./chicken_house_big2_img.png) no-repeat center;
    background-size: 100% 100%;
}
.chick-content .MATURE_3{
    background: url(./chicken_house_big3_img.png) no-repeat center;
    background-size: 100% 100%;
}
/*活动*/
.chick-content .MATURE_ACTIVITY{
 display: none;
}
/*休眠*/
.chick-content .MATURE_HUNGERHALO{
    background: url(./chicken_house_big_dormancy_img.png) no-repeat center;
    background-size: 100% 100%;
}
/*生产期*/
.chick-content .MATURE_PRODUCE{
    background: url(./chicken_house_egg_img.png) no-repeat center;
    background-size: 100% 100%;
    z-index: 20;
    top:-0.12rem;
}
/*生完蛋了*/
.chick-content .MATURE_PRODUCED{
    background: url(./chicken_house_egg_img.png) no-repeat center;
    background-size: 100% 100%;
}
/*睡眠*/
.chick-content .MATURE_SLEEP{
    background: url(./chicken_house_big_bed_img.png) no-repeat center;
    background-size: 100% 100%;
}
.chick-content .circle-comm{
  width: 0.51rem;
  height: 0.51rem;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.chick-content .growthBox{
  position: absolute;
  left: 0.585rem;
  top:2.44rem;
  background-image: url(./growing_up_img.png);
}
.chick-content .HungryBox{
  position: absolute;
  left: 1.58rem;
  top:2.585rem;
  background-image: url(./full_stomach_img.png);
}
.chick-content .ClearBox{
  position: absolute;
  left: 2.59rem;
  top:2.425rem;
  background-image: url(./clean_img.png);
}

.chick-content .chicken_name{
  position: absolute;
  width: 100vw;
  left: 0;
  top: 2.06rem;
  text-align: center;
  font-size: 0.16rem;
  color: #A6634D;
  z-index: 20;
  font-weight: bold;
}
.chick-talk .talk-content-sin{
    width: 100%;
    height: 100%;
    line-height: 0.50rem;
    font-size: 0.13rem;
    color: #AA694E;
    display: inline-block;
    text-align: left;
    padding-left: 0.53rem;
    padding-right: 5px;
}

.chickhouse .eggTimeWraper{
  width: 0.73rem;
  height: 0.58rem;
  position: absolute;
  top:0.92rem;
  right:0.04rem;
  background: url(./countdown_img@2x.png) no-repeat center;
  background-size: 100% 100%;
}
.chickhouse .eggTimeWraper .time-dist{
    display: block;
    width: 0.1rem;
    height: 0.1rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -0.04rem;
    margin-top: -0.09rem;
    background: #FFFFFF;
    border: 0.03rem solid #FFDB20;
    border-radius: 0.1rem;
    z-index: 20;
}
.chickhouse .eggTimeWraper .hour{
    display: block;
    width: 0.03rem;
    height: 0.2rem;
    position: absolute;
    left: 50%;
    top: 24%;
    margin-left: 0;
    margin-top: -0.09rem;
    background: #FF6800;
    border-radius: 1rem;
}
.chickhouse .eggTimeWraper .minute{
    display: block;
    width:  0.03rem;
    height: 0.148rem;
    position: absolute;
    left: 50%;
    top: 40%;
    margin-left: 0;
    margin-top: -0.09rem;
    background: #FF6800;
    border-radius: 1rem;
    z-index: 15;
    transform-origin: 60% 80%;
    transform: rotate(180deg);
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

@-webkit-keyframes fadeOut {
	0% {
	opacity: 1; /*初始状态 透明度为0*/
	/*left:0;*/
	}
	100% {
	opacity: 0; /*结尾状态 透明度为1*/
	/*left:100vw;*/
	display: none;
	}
}

@-webkit-keyframes fadeIn {
	0% {
	opacity: 0; /*初始状态 透明度为0*/
	/*right:100vw;*/
	}
	100% {
	opacity: 1; /*结尾状态 透明度为1*/
	/*right:0;*/
	}
}


.fadeOut{	-webkit-animation-name:fadeOut; /*动画名称*/
	-webkit-animation-duration: 2s; /*动画持续时间*/
	-webkit-animation-iteration-count: 1; /*动画次数*/
	-webkit-animation-delay: 0s; /*延迟时间*/
	animation-fill-mode:both;
}

.fadeIn{	-webkit-animation-name:fadeIn; /*动画名称*/
	-webkit-animation-duration: 2s; /*动画持续时间*/
	-webkit-animation-iteration-count: 1; /*动画次数*/
	-webkit-animation-delay: 0s; /*延迟时间*/
	animation-fill-mode:both;
}


.defaultVal{color: #fff;font-size: 0.2rem;text-shadow: 0 0 4px #FF0000, 0 0 4px #FF0000, 0 0 4px #FF0000;
  position: absolute;
  width: 100%;
  text-align: center;
  left: 0;
  top: 0.335rem;
  font-family: ArialHebrew-Bold;
}
#swiperFeedList{ padding-top: 0.05rem;}

@media screen and  (device-width:414px) and (-webkit-device-pixel-ratio:3){
  .chickhouse .chick-content{
    height: 4.1rem;
  }  
  .chick-content .growthBox{
    top:2.08rem;
  }
  .chick-content .HungryBox{
    top:2.235rem;
  }
  .chick-content .ClearBox{
    top:2.105rem;
  }
  .chick-content .chicken_name{
    top: 1.8rem;
  }
  .chick-content .chicken_house_nest_img{
    bottom: 2.51rem;
  }
  .chick-content .chicken_house_big_img{
    top: -.25rem;
  }
  .chick-content .chicken_house_messy_img{
    top: 0.8rem;
  }
  .chick-content .chicken_house_messy_img_move{
    top: 8vh;
  }
  .chickhouse .getChickenEggs{
    top: 0.29rem;
  }
}
@media screen and  (max-height:580px){
  .chickhouse .chick-content{
    height: 4.1rem;
  }  
  .chick-content .growthBox{
    top:2.08rem;
  }
  .chick-content .HungryBox{
    top:2.235rem;
  }
  .chick-content .ClearBox{
    top:2.105rem;
  }
  .chick-content .chicken_name{
    top: 1.8rem;
  }
  .chick-content .chicken_house_nest_img{
    bottom: 2.51rem;
  }
  .chick-content .chicken_house_big_img{
    top: -.25rem;
  }
  .chick-content .chicken_house_messy_img{
    top: 0.8rem;
  }
  .chick-content .chicken_house_messy_img_move{
    top: 8vh;
  }
  .chickhouse .getChickenEggs{
    top: 0.29rem;
  }

}
</style>
