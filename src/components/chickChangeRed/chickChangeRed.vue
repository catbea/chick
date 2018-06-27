<template>
	<div>
		<div class='changeglod'>
		  <div class='img_bg'>  
		    <img src='./parcel_icon@2x.png'>
		    <div class='change_word'>可兑换<span class='change_word_num'>{{redPackeNum}}</span>个红包</div>
		   
		  </div>
		  <div class='width_auto'>
		   <div class="changeglod_btn" v-on:click="showMoney">兑换</div>
		     <router-link to='/chickRedDesc'>
		      <div class='changedes'>兑换说明</div>
		    </router-link>
		  </div>
		</div>
		
		<div class="modal-box" v-show="flag" v-on:click="hide">
		    <div class="modal-body" v-show="succe">
		      <div class="modal-content">
		        
		        <img src="./parcel_icon2@2x.png" class="fenxiang">
		        <div class='money_num'>￥{{amount}}元</div>
		        <img v-on:click="hide" src="./close_iocn@2x.png" class="close">
		     </div>
		     
		    </div>
		
		    <div class='fail_box' v-show="show">
		        <div class='fail_title'>兑换失败</div>
		        <div class='fail_content'>鸡蛋不够，不满足兑换条件</div>
		        <div class='fail_btn'>我知道了</div>
		    </div>
		  
		
		</div>
	</div>

</template>

<script>
	export default{
		data(){
			return{
				redPackeNum:"",
			    flag: false,
			    show:false,
			    succe:true,
			    amount:"",
			    userToken:localStorage.getItem("userToken")
			}
		},
		created(){
			this.$CommFunc.commFunc("兑换红包"); 
			this.getredPacketNum();
		},
		methods:{
			/** 获取红包数量**/
			  getredPacketNum: function () {
			    var that = this;
			    let typeEnum="REDPACKET";
			   
			   that.$ajax({
			        method: 'GET',
			        url: that.$utils.getEggExchangeVal+"?typeEnum="+ typeEnum,
			      }).then((response) => {
			      	let rps = response.data;
			      	
			        if (rps.ret === 1000) {
			            that.redPackeNum = rps.model.eggExchangeVal;
			            
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
			   showMoney: function () {
			  	var that = this;
			  	if(that.redPackeNum<=0){
		  		 	that.flag = true ;
		            that.succe = false;
		            that.show = true;
                    return;
			  	}
			   	that.$ajax({
			        method: 'POST',
			        url: that.$utils.eggExchangeRedpacket,
			        
			      }).then((response) => {
			      	let rps = response.data;
			      	
			        if (rps.ret === 1000) {
			          
			                that.flag = true ;
			                that.succe = true;
			                that.show = false;
			                that.amount = rps.model.amount
			            
			            
			        }else{
			        		that.flag = true ;
			                that.succe = false;
			                that.show = true;
			              
			        }
			      }).catch(function (error) {
			        console.log(error);
			      });
			   
			    },
			  	hide:function(){
			  		var that = this;
			  		that.flag = false ;
		            that.succe = false;
		            that.show = false;
			  		let typeEnum="REDPACKET";
				    that.$ajax({
				        method: 'GET',
				        url: that.$utils.getEggExchangeVal+"?typeEnum="+ typeEnum,
				        
				      }).then((response) => {
				      	let rps = response.data;
				      	
				        if (rps.ret === 1000) {
				            that.redPackeNum = rps.model.eggExchangeVal;
				            
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
			  		
			  		
			  	}
		}
	}
</script>
<style lang="css" scoped>
.changeglod{ }
.img_bg{background: url("./hakkyuinkaku_img@2x.png")top center no-repeat; width: 100%; background-size:100% 100%; text-align: center; height: 2.91rem;position: relative;}
.img_bg img{width: 3.23rem;height:3.62rem;margin-top:0.55rem;position: relative;top: 0.55rem; margin:0 auto;}
.change_word{ position: relative;top: 0.5rem}
.changeglod_btn{ position: absolute;bottom: 0.38rem;width: 3.39rem; height: 0.74rem; margin: 0rp auto;  background:url("./warehouse_usual_icon@2x.png") center center; background-size:100% 100%;line-height: 0.65rem;font-size: 0.16remrpx;color: #FF6F2D;letter-spacing: 0.6px; text-align: center }
.width_auto{width: 3.38rem;margin: 0 auto}
.changedes{position: absolute;bottom: 0.25rem;font-size: 0.13rem;color: #666;text-align: right;width: 3.2rem;}
.change_word_num{font-size: 0.17rem;color: #FF686F;margin: 0 0.05rem;display: inline-block}
.modal-box{
  position:fixed;
  width:100%;
  height:100%;
  top:0px;
  background:rgba(0,0,0,0.4);
  overflow: hidden;
  display: flex;
  justify-content:  center;
  align-items: center;
  }

.modal-body{
  position:relative;
  width: 100%;
  height: 95vh;
  background: none;
  border-radius: 0.1rem;
  }

.modal-content{
  width: 100%;
  height:100vh; 
  display: flex;
  padding-top:-1.5rem;
  flex-direction: column;
  
  align-items:center;
}

.modal-content .fenxiang{
  width:3.23rem;
  height: 4.01rem;
  z-index: 1;
  position: relative;
  
}
.close{ width: 0.3rem;height: 0.3rem;position: relative;z-index: 2;}
.money_num{position: absolute;font-weight: bold; width: 100%; text-align: center;  z-index: 2;color: #fff;font-size: 0.38rem;display: inline-block;top:29vh}


.fail_box{background: #FFFFFF;border-radius: 0.1rem; width: 3rem; height: 1.86rem; text-align: center; position: relative;}
.fail_title{font-size: 0.17rem;color: #444444;letter-spacing: 1px; margin-top: 0.25rem;}
.fail_content{font-size: 0.15rem;color: #666666;letter-spacing: 1px;text-align: center;margin-top: 0.22rem}
.fail_btn{ border-radius: 0 0 0.1rem 0.1rem;background-image: linear-gradient(90deg, #FFEC00 0%, #FECC00 98%);position: absolute; bottom: 0; width: 100%; height: 0.5rem; line-height: 0.5rem;font-size: 0.16rem;color: #FF6F2D;letter-spacing: 0.0012rem;}
</style>