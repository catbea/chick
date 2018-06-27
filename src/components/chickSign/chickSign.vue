<template>
	<div>
		<div class='sign_Box'>
		    <div class='sign_top'>
		        <div class='sign_ul'>
		            <div class='sign_li_con'>
		                <div class='sign_li' :key="index" v-for="(item,index) in signList" >
		
		                    <div class='day_word'>第{{index + 1}}天</div>
		                    <div class='sign_con'>
		                            <div class='sing_statu'  v-if="item.issign == 1 ">已签到</div> 
		                            <div class='sing_statu_no'  v-else-if="item.issign == 0 ">未签到</div>
		                            <div class='sing_statu_time'  v-else-if="item.issign == 2 "></div>
		                            <div class='sign_img'>
		                                <img :src='defaultImgPath+item.imgPath'>
		                            </div>
		                            <div class='sign_name_num'>
		                                <span>{{item.productName}}</span>
		                                <span>×{{item.count}}</span>
		                            </div>
		 
		                    </div>
		                </div>
		            </div>
		
		            <div class='sign_li_btn' v-show="!issignToday"  v-on:click='signning'>
		                <div class='sign_li_text'>立即签到</div>
		                
		            </div>
		            <div class='sign_li_btn_end' v-if="signCount > 1 && issignToday" >
		                <div class='sign_li_count' >已累计签到{{signCount}}天</div>
		                
		            </div>
		            <div class='sign_li_btn_end' v-if="signCount == 1 && issignToday">
		                <div class='sign_li_count'>已签到</div>
		                
		            </div>
		        </div>
		    </div>
		  <div class='sign_bottom'>
		    <div class='signnedBox'>
		      <div class='signned_li' v-for="(item,index) in SignRecordList" v-on:click='getSignaward(item)' :key="index">
		        <div class='sign_word' v-if="item.isDraw ==false && item.signDay <= signCount">未领取</div>
		        <div class='sign_word' v-if="item.isDraw ==true">已领取</div>
		        <div class='sign_get'>
		          <div v-if="item.isDraw ==true" class='sign_Img_Mongolian'>
		            <img src='./taliban_icon@2x.png'>
		          </div>
		          <div v-if="item.isDraw ==false" class='sign_Img_MongolianFalse'>
		            
		          </div>
		          <div class='sign_get_Img'>
		            <img :src='defaultImgPath+item.imgPath'>
		          </div>
		          <div class='sign_get_name'>
		            <span>{{item.productName}}</span>
		            <span class='text'>×</span>
		            <span>{{item.count}}</span>
		          </div>
		          <div v-if="item.isDraw ==true" class='login_day999'>累计签到{{item.signDay}}天可领</div> 
		          <div v-if="item.isDraw ==false" class='login_day'>累计签到{{item.signDay}}天可领</div> 
		        </div>
		        <div></div>
		      </div>
		    </div>
		  </div>
		</div>

	</div>
</template>
<script>
	export default{
		data(){
			return{
				SignRecordList: [],
		        recordDTOS: [],
		        gmtEnd: "",
		        gmtStart: "",
		        imgPath: "",
		        productName: "",
		        count:"",
		        signList: [],
		        signObj: {},
		        signObjLength: "",
		        defaultImgPath: this.$CommFunc.defulatimg,
		        dayTime: "",
		        signTime:"",
		        signDay:"",
		        signned:[],
		        flag:true,
		        one:1,
		        issignToday:true,
		        signCount:"",
		        userToken:localStorage.getItem("userToken")
			}
		},
		created(){
			this.$CommFunc.commFunc("任务"); 
			this.signListFun();
		},
		methods:{
			getSignaward:function(item){
		       
		        var that = this;
		        var signDay = item.signDay
		        var signNumber = that.recordDTOS.length;
		        if (signNumber < signDay){
		          wu.showToast({
		            title: "累计天数不够！",
		            mask: false,
					icon: 'icon-info', // icon-success | icon-error | icon-info
					duration: 2000
		          })
		          return false;
		        }
		        var params={
		          signDay: signDay
		        }
		        
		        that.$ajax({
			        method: 'POST',
			        url: that.$utils.getSignAward+"?signDay=" + signDay,
			      }).then((response) => {
			      	let rps = response.data;
			        if (rps.ret === 1000) {
			             
			            wu.showToast({
	                        title: "领取成功！",
	                        mask: false,
							icon: 'icon-info', // icon-success | icon-error | icon-info
							duration: 2000
	                    })
	                    that.signListFun();
			             
			        }else{
			            wu.showToast({
							title: rps.msg,
							mask: false,
							icon: 'icon-info', // icon-success | icon-error | icon-info
							duration: 2000
						});
						that.signListFun();
			        }
			        
			      }).catch(function (error) {
			        console.log(error);
			      });
		        
		    },
		    signning: function () {
		        var that = this;
		        
		       	that.$ajax({
			        method: 'POST',
			        url: that.$utils.sign,
			        
			      }).then((response) => {
			      	let rps = response.data;
			        if (rps.ret === 1000) {
			             
			            wu.showToast({
	                        title: "签到成功！",
	                        mask: false,
							icon: 'icon-info', // icon-success | icon-error | icon-info
							duration: 2000
	                    })
	                    that.signListFun();
			             
			        }else{
			            wu.showToast({
							title: rps.msg,
							mask: false,
							icon: 'icon-info', // icon-success | icon-error | icon-info
							duration: 2000
						});
						that.signListFun();
			        }
			        
			      }).catch(function (error) {
			        console.log(error);
			      });
		    },
		    //签到列表
		    signListFun: function () {
		        var that = this;
		        that.$ajax({
			        method: 'GET',
			        url: that.$utils.getSignRecordList,
			      }).then((response) => {
			      	let rps = response.data;
			        if (rps.ret === 1000) {
			            
			            var startTime = new Date(Date.parse(rps.model.gmtStart.replace(/-/g, "/"))).getTime();
		                var endTime = new Date(Date.parse(rps.model.gmtEnd.replace(/-/g, "/"))).getTime();
		                var dates = (Math.abs((endTime - startTime)) / (1000 * 60 * 60 * 24)) + 1;
		                var dayTime = {};
		                var issign = [];
		                var gmtCreate ={};
		               
		                var recordDTOS=[];
		                
		                var signList = [];
		                var issignToday = true;
		                var signCount=[];
		               
		                var gmtCreate = {};
		                for (let i = 0; i < dates; i++) {
		                    
		                    var signObj = {
		                        gmtEnd: rps.model.gmtEnd,
		                        gmtStart: rps.model.gmtStart,
		                        imgPath: rps.model.imgPath,
		                        productName: rps.model.productName,
		                        count: rps.model.count,
		                        dayTime: dayTime,
		                        recordDTOS: gmtCreate,
		                        issign: 0,
		                        issignToday:false,
		                        signCount:0
		
		                    };
		                    signObj.dayTime = signObj[i];
		                    signObj.dayTime = startTime + ((1000 * 60 * 60 * 24) * i);
		                    signList.push(signObj); 
		
		                    if (rps.model.recordDTOS[i] != undefined) {
		                        gmtCreate[i] = new Date(Date.parse(rps.model.recordDTOS[i].gmtCreate.replace(/-/g, "/"))).getTime();
		                        recordDTOS.push(gmtCreate[i]);
		                        
		                    } 
		                    var lasttime = new Date();
		
		                    var newTime = lasttime.getFullYear() + '/' + (lasttime.getMonth() + 1) + '/' + lasttime.getDate();
		                    var date = new Date(newTime.replace(/-/, "/"));
		                    issignToday = false;
		                    if (rps.model.recordDTOS.length>0){
		                      var signTime = new Date(Date.parse(rps.model.recordDTOS[rps.model.recordDTOS.length - 1].gmtCreate.replace(/-/g, "/"))).getTime();
		                      if (date.getTime() == signTime){
		                        issignToday = true;
		                      }else{
		                        issignToday =false;
		                      }
		                      signCount = rps.model.recordDTOS.length;
		                    }
		                    
		                    //还没有签到
		                    if (signObj.dayTime > lasttime.getTime() ){
		                       signObj.issign = 2;
		                    }
		                   
		                    for (var c = 0; c < rps.model.recordDTOS.length; c++) {
		                      var time = new Date(Date.parse(rps.model.recordDTOS[c].gmtCreate.replace(/-/g, "/"))).getTime();
		                      //已签到
		                      if (signObj.dayTime == time) {
		                            
		                            signObj.issign = 1;
		                        }
		                    }
		                }
		                
	                    that.SignRecordList=rps.model.extras;
	                    that.recordDTOS=recordDTOS;
	                    that.gmtEnd=rps.model.gmtEnd;
	                    that.gmtStart= rps.model.gmtStart;
	                    that.imgPath=rps.model.imgPath;
	                    that.productName= rps.model.productName;
	                    that.count=rps.model.count;
	                    that.signObjLength=dates;
	                    that.signObj= signObj;
	                    that.signList= signList;
	                    that.issign=issign;
	                    that.issignToday=issignToday;
	                    that.signCount=signCount;
			             
			            
			        }else{
			            wu.showToast({
										title: rps.msg,
										mask: false,
										icon: 'icon-info', // icon-success | icon-error | icon-info
										duration: 2000
									});
									// that.signListFun();
			        }
			        
			      }).catch(function (error) {
			        console.log(error);
			      });
		        
		    }
		}
	}
</script>
<style lang="css" scoped>

.sign_Box{min-height: 100vh;    background: #fff;}
.sign_top{ background: url("./mission_background@2x.png")top center; height: 75vh;background-size: 100% 100%;padding-top: 0.25rem; }
.sign_ul{background: url("./mission_doing_it_background@2x.png")top center;  height: 4.1rem;background-size: 100% 100%;position: relative;}
.sign_li_con{position: absolute;top: 1.225rem;margin: 0px 8%;display:flex;flex-direction:row;flex-wrap:wrap; justify-content: space-between;}
.sign_li{margin-top: 0.15rem; width: 0.65rem; }
.sign_con{background: #F8F8F8;border-radius: 8px;width:0.65rem; height: 0.75rem; }
.day_word{font-size: 0.12rem;color: #999999;text-align: center; margin-bottom: 0.02rem; margin-top: 0.05rem;}
.sing_statu{background: #FFE130;border-radius: 8px;font-size: 0.11rem;color: #FF7431;text-align: center; height: 0.28rem;line-height: 0.28rem;position: relative;z-index: 1; font-weight: bold;}
.sign_img img{ width: 0.5rem;height: 0.5rem;position: relative;z-index: 2;top:-0.17rem}
.sign_img {text-align: center}
.sign_name_num{display: flex;font-size: 0.09rem;justify-content: center;align-items: center;color: #999999;position: relative;z-index: 2;top:-0.22rem}
.sing_statu_no{background: #E7E7E7;border-radius: 8px;font-size: 0.11rem;color: #999999;text-align: center; height: 0.28rem;line-height: 0.28rem;position: relative;font-weight: bold;}
.sing_statu_time{border-radius: 8px;font-size: 0.11rem;color: #666666;text-align: center; height:  0.28rem;;line-height:  0.28rem;;position: relative;font-weight: bold;}
.sign_li_con:after{content: ""; width: 0.68rem; } 
.sign_bottom{ margin: 0 auto;margin-top: 0.225rem; padding: 0 0.25rem}
.signnedBox{display: flex; align-items: center; width: 3.25rem;justify-content: flex-start; height: 1rem;}
.sign_word{font-size: 0.13rem;color: #666666; text-align: center; margin-top: -0.15rem;margin-right:0.15rem;position: absolute;top:-0.25rem; width: 100%}
.sign_get{display: flex;flex-direction: column;position: relative;width: 0.9rem;justify-content: center;align-items: center;}
.sign_get_Img img{ width: 0.5rem;position: relative;z-index: 6;}
.sign_get_name{position: absolute;z-index:6;font-size: 0.11rem; display: flex;justify-content:center;align-items: center; text-align: center; width: 0.9rem;bottom:-0.15rem;color: #999;}
.sign_get_name .text{vertical-align: bottom; line-height: 0.1rem}
.signned_li{width: 0.9rem;position: relative; margin-right: 0.29rem; }
.signned_li:last-child{margin-right:0;}
.sign_Img_Mongolian{ width: 0.9rem;height: 0.9rem;position:absolute;background:rgba(0,0,0,0.16);z-index: 7;border-radius:0.45rem; text-align: center;vertical-align: middle;  }
.sign_Img_MongolianFalse{ width: 0.9rem;height: 0.9rem;position:absolute;background:#f8f8f8;z-index: 5;border-radius:0.45rem; text-align: center;vertical-align: middle;  }
.sign_Img_Mongolian img{ width: 0.28rem; height: 0.28rem;margin-top: 0.325rem;}
.sign_sign_box{height: 0.28rem;}
.sign_li_btn{position: absolute;top: 3.59rem;margin: 0px 33%;display:flex;flex-direction:row;flex-wrap:wrap; justify-content: space-between;background:#FFE359;width: 1.36rem;height: 0.32rem;border-radius:0.06rem; }

.sign_li_btn_end{position: absolute;top: 3.6rem;margin: 0px 33%;display:flex;flex-direction:row;flex-wrap:wrap; justify-content: space-between;background:#E7E7E7;width: 1.36rem;height: 0.32rem;border-radius:0.06rem; }
.login_day{font-size: 0.12rem;color: #666666;width: 1rem;position: absolute;bottom: -0.475rem;}
.login_day999{font-size: 0.12rem;color: #999;width: 1rem;position: absolute;bottom: -0.475rem;}

.sign_li_text{font-size: 0.14rem;color:#FD3E3E;line-height: 50%; margin: auto auto;font-family:PingFangSC-Regular }
.sign_li_count{font-size: 0.14rem;color:#666666;line-height: 50%; margin: auto auto;font-family:PingFangSC-Regular; }
</style>