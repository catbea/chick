<template>
	<div>
		<div class='shopBox'>
		    <div class="topImg">
		    	<img src='./store_bg@2x.png'>
		    	<dl><router-link to="/"><img src="./chicken_house_return_icon@2x.png" width="40px" height="40px" /></router-link></dl>
		    	<div class='egg_con_exchangeRecord'>
		          	<router-link to='/chickBuyRecord'><span>消费记录</span></router-link>
		        </div>
		    
		    </div>
		    <div class="shopListCon">
			    <div class='shopList' v-for="(item,index) in listshop" :key="index">
			        <div class='shopList_top'>
			            <div class="shopList_img">
			            	<div class="List_img_bg">
			            		<img :src='defaultImgPath+item.imgPath'>
			            	</div>
			            </div>
			            <div class='shop_info'>
			                <div class='shop_name_num'>
			                    <div class='shop_name'>{{item.name}}</div>
			                    <div class='shop_num'>
			                    <span class='price_right'><span>￥</span>  <span style="font-size:0.17rem">{{priceArr.priceInt}}</span>.<span style="font-size:0.12rem">{{priceArr.priceFlot}}</span></span>
			                    <span class='originalPrice' v-if="item.originalPrice != undefined">￥{{item.originalPrice}}</span></div>
			                </div>
			                <div class='shop_desc'>{{item.intro}}</div>
			            </div>
			        </div>
			       
			        <div class='shopList_bottom'  v-on:click='showDialogBtn(item)'>购买</div>
			    </div>
			</div>
		    <div class='egg_con_clear'></div>
		    
		</div>
		
		<!--弹窗-->
		<div class="modal-mask" v-on:click="hideModal"  v-show="showModal"></div>
		<div class="modal-dialog" v-show="showModal">
		  <div class="modal_top">
		  	 <div class="top_left">支付</div>
		  	 <div v-on:click='onCancel' class='close_img_feed'></div>
		  </div>
		  <div class="modal-content">
		    <div class='modal-left'>
		        <div class='Img_top'><img :src='dataImg'></div>
		        
		    </div>
		    <div class="modal-right">
		      <div class='buy_box'>
		         <div class="buy_box_left">
		         	{{dataName}}
		         </div>
		         <div class="buy_box_right">
		         	<div class="pric_single">
		         		<span>￥</span>
		         		<span style="font-size:0.17rem">{{dataPricess.priceInt}}</span>.<span style="font-size:0.12rem">{{dataPricess.priceFlot}}</span>
		         	</div>
		         	<div class='btnGrop'>
			            <div class='minus_img_div' v-show="left_img_def" v-on:click="minusInput" >
			                <img
			                class="minus_img" src='./left_reduction_icon_default@2x.png' width="13px" height="2px">
			                
			                <img
			                class="minus_img"
			                 v-on:click="minusInput" 
			                 v-show="left_img"
			                src='./left_reduction_icon@2x.png' width="13px" height="2px">	                
			                
			            </div> 
			            
						<div class='minus_img_div' v-show="left_img" v-on:click="minusInput">               
			                <img width="13px" height="2px"
			                class="minus_img"
			                src='./left_reduction_icon@2x.png'>	               		                
			            </div> 
			            
			            <div class='inputChange_div'>
			             <input  value='' v-model="quantity" type="text" maxlength="5" v-on:blur="inputChange(dataPrice)" class="input" />
			            </div> 
			            
			            
			            <div class='add_img_div' v-show="right_img_def"  v-on:click="addInput" >
			            	<img class="add_img" width="13px" height="15px" src='./right_addition_icon@2x.png'>
			            </div>
			            
			            <div class='add_img_div' v-show="right_img"  v-on:click="addInput" >
			            	<img class="add_img" width="13px" height="15px" src='./store_plus_icon2@2x.png'>
			            </div>
			            
			         </div> 
		         </div>
		      </div>
		      
		    </div>
		  </div>
		  <div class="modal-footer">
		  	<div class='price'> 
		        <div class='price_text'>合计：</div>
		        <div class='price_num'><span style="font-size:0.12rem">￥</span><span style="font-size:0.17rem">{{dataPriceAll.priceInt}}</span>.<span style="font-size:0.12rem">{{dataPriceAll.priceFlot}}</span><span style="font-size:0.12rem">元</span></div>
		    </div>
			      	  
		    <div class="foot_right">
		    	<div class='shopList_bottom_btn' v-show="disabled" ></div>
		    	<div class="btn-confirm" v-on:click="buyBtn(dataId)" data-status="confirm">去结算</div>
		    </div>
		    
		  </div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				  currentPage :1,
			      pageSize :10,
			      rpsWx:{},
			      listshop:[
			      	/*{	"dayUsageLimit":0,
						"fullVal":	100 ,
						"growthVal":	1,
						"imgPath":	"group1/M01/00/80/wKhk41rqz5CASIFiAAB1Jv7AQt0124.png",
						"intro":"萌味小鸡，产量一般，喂得好小鸡的产量会提高哦~",
						"isFullFirst":false,
						"isGrowthFirst":	false ,
						"isJoyfulFirst":	false,
						"joyfulVal":	100,
						"name":	"小鸡仔",
						"num":"P989043116096880640",
						"originalPrice":999,
						"price":	0.01 ,
						"type":	"CHICK"
					}*/
			      ],
			      defaultImgPath:  this.$CommFunc.defulatimg,
			      productNum:"",
			      quantity:"1",
			      payModel:{},
			      showModal: false,
			      dataImg:"",
			      dataId:"",
			      dataName:"",
			      dataPrice:[],
			      dataPricess:[],
			      dataPriceAll:[],
			      priceArr:[],
			      isFirstClick:true,
			      disabled:false,
			      leftReductionIconDefault:"./left_reduction_icon_default@2x.png",
			      userToken:localStorage.getItem("userToken"),
			      left_img_def:true,
			      left_img:false,
			      right_img_def:true,
			      right_img:false
			}
		},
		created(){
			this.$CommFunc.commFunc("商店"); 
			this.productPage();
		},
		methods:{
			productPage:function(){
			      
			      var that = this;
			      var _self=this;
			      var params = {
			          currentPage: 1,
			          pageSize: this.pageSize
			      }
			     
			     this.$ajax({
			        method: 'GET',
			        url: _self.$utils.productPage,
			        params: params,
			      }).then((response) => {
			      	let rps = response.data;
			        if (rps.ret === 1000) {
			              let records = rps.model.records;
			              records.forEach((item) => {
			                  if (item.intro.length > 36){
			                    item.intro = item.intro.substring(0, 36)+"...";
			                  }else{
			                      item.intro = item.intro.substring(0, 36)
			                  }
			                  
			                  this.priceArr = this.PriceSize(item.price);
			                  
			              })
			              this.listshop = records;
			              
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
			onBridgeReady:function(){
				var _self =this;
	      		WeixinJSBridge.invoke(
			       'getBrandWCPayRequest', {
			           "appId":this.rpsWx.appid,     //公众号名称，由商户传入     
			           "timeStamp":this.rpsWx.timeStamp,         //时间戳，自1970年以来的秒数     
			           "nonceStr":this.rpsWx.nonceStr, //随机串     
			           "package":this.rpsWx.dataPackage,     
			           "signType":this.rpsWx.signType,         //微信签名方式：     
			           "paySign":this.rpsWx.paySign //微信签名 
			       },
			       function(res){     
			       	
			       	console.log(res);
			          	if(res.err_msg == "get_brand_wcpay_request:ok" ) {
			           		
				           	wu.showToast({
								title: "购买成功",
								mask: false,
								icon: 'icon-info', // icon-success | icon-error | icon-info
								duration: 2000
							});
							_self.showModal = false;
	          				_self.disabled = false;
			           	
			           }else{
			           	console.log(res)
			           		wu.showToast({
								title: "购买失败",
								mask: false,
								icon: 'icon-info', // icon-success | icon-error | icon-info
								duration: 2000
							});
							
							_self.showModal = false;
	          				_self.disabled = false;
	          				
			           }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
			       }
			   ); 
	        	
	      	},
	      	pay:function(){  
              			
	            if (typeof WeixinJSBridge == "undefined"){  
	               if( document.addEventListener ){  
	                   document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);  
	               }else if (document.attachEvent){  
	                   document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);   
	                   document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);  
	               }  
	            }else{  
	               this.onBridgeReady();  
	            }   
	              
	        },  
			buyBtn:function(ids){
			      var that = this;
			      var _self = this;
			      var num = ids;
			      var params = {
			          productNum: num,
			          quantity: this.quantity //购买数量
			      }
			      if (params.quantity == 0){
			        wu.showToast({
							title: '购买数量不能为0',
							mask: false,
							icon: 'icon-info', // icon-success | icon-error | icon-info
							duration: 2000
					});
					 return;
			      }
			      this.disabled = true;
			      this.$ajax({
				        method: 'POST',
				        url: _self.$utils.buy,
				        params: params,
				       
			      }).then((response) => {
			      	let rps = response.data;
			      	if(rps.ret != 1000){
			      		wu.showToast({
		                	title: rps.msg,
		                	duration: 2000
		                });
		                this.disabled = false;
		                return;
			      	}
			      	this.rpsWx=rps.model;
			      	this.pay();
			      }).catch(function (error) {
			        console.log(error);
			      });
			      
			  },
			  showDialogBtn: function (item) {
			          this.showModal = true;
			          this.dataImg = this.defaultImgPath+item.imgPath;
			          this.dataId = item.num;
			          this.dataName = item.name;
			          this.dataPrice = item.price;
			          this.dataPricess = this.PriceSize(item.price);
			          this.dataPriceAll =this.PriceSize(item.price);
			      	  
			  },
			  inputChange:function(pice){
			    var that =this;
			    var regNum = new RegExp("^[0-9]*[1-9][0-9]*$");//判断用户输入的是否为数字
			    if (!regNum.test(that.quantity)) {
			        wu.showToast({
			            title: "请输入正确的数字",
			            mask: false,
						icon: 'icon-info', // icon-success | icon-error | icon-info
						duration: 2000
			        })
			         that.disabled = false;
			        return;
			    }else if(that.quantity > 99){
			    	wu.showToast({
			              title: "购买数量太多",
			              mask: false,
						  icon: 'icon-info', // icon-success | icon-error | icon-info
						  duration: 2000
			          })
			          return;
			    }else{
			        that.disabled = false;
			
			    }
			    var dataPriceNu = that.quantity * pice;
			    //that.dataPriceAll = dataPriceNu.toFixed(2)
			   that.dataPriceAll = this.PriceSize(dataPriceNu.toFixed(2)) 
			    
			  },
			  /**
			   * 减少购买数量事件
			   * **/
			  minusInput: function (e) {
			      var that = this;
			      that.disabled = false;
			      var shopNum = parseInt(that.quantity) - 1 ;
			      if (shopNum <= 1){
			            that.leftReductionIconDefault ="./left_reduction_icon_default@2x.png";
			            that.left_img_def=true;
			            that.left_img =false;
			      }
			      
			      if(shopNum < 99){
			      	that.right_img_def=true;
			        that.right_img =false;
			      }
			      
			      if (shopNum < 1) {
			          wu.showToast({
			              title: "购买数量不能小于1",
			              mask: false,
						  icon: 'icon-info', // icon-success | icon-error | icon-info
						  duration: 2000
			          })
			          return;
			      }
			        var dataPriceNu = shopNum * that.dataPrice;
			        dataPriceNu = dataPriceNu.toFixed(2);
			        
			        that.quantity = shopNum;
			        //that.dataPriceAll = dataPriceNu;
			        that.dataPriceAll = this.PriceSize(dataPriceNu) 
			     
			  },/**
			   * 增加购买数量事件
			   * **/
			  addInput: function (e) {
			      var that = this;
			      that.disabled = false;
			      
			      var shopNum = parseInt(that.quantity) + 1;
			      
			      that.leftReductionIconDefault = "./left_reduction_icon@2x.png";
			      that.left_img_def=false;
			      that.left_img =true;
			      
			      if(shopNum >= 99){
			          that.right_img_def=false;
			          that.right_img =true;
			      }
			      
			      if (shopNum > 99) {
			          wu.showToast({
			              title: "购买数量太多",
			              mask: false,
						  icon: 'icon-info', // icon-success | icon-error | icon-info
						  duration: 2000
			          })
			          return;
			      }
			      var dataPriceNu = shopNum * that.dataPrice;
			      dataPriceNu = dataPriceNu.toFixed(2);
			      console.log(dataPriceNu)
		          that.quantity = shopNum;
		          //that.dataPriceAll = dataPriceNu;
		          that.dataPriceAll = this.PriceSize(dataPriceNu);
				  console.log(this.PriceSize(dataPriceNu))
			  },
			  /**
			   * 弹出框蒙层截断touchmove事件
			   */
			  preventTouchMove: function () {
			  },
			  /**
			   * 隐藏模态对话框
			   */
			  hideModal: function () {
			      
			          this.showModal = false;
			          this.disabled = false;
			          this.quantity = "1"
			      
			  },
			  /**
			   * 对话框取消按钮点击事件
			   */
			  onCancel: function () {
			      this.hideModal();
			  },
			  /**
			   * 对话框确认按钮点击事件
			   */
			  onConfirm: function () {
			      this.hideModal();
			  }

		}
	}
</script>
<style lang="css" scoped>
body{background: #6CC1FC;}
.shopBox{background: #6CC1FC; min-height: 100vh;}
.topImg{ padding-bottom: 0.12rem;position: relative;height: 1.16rem;}
.topImg img{position: absolute;z-index: 0;}
/*.shopBox img{ height: 0.34rem; width: 100%}*/
.shopListCon{position: relative;}
.shopList{display: flex; flex-direction: column;padding: 0 0.15rem; margin-bottom: 0.15rem;}
.shopList_img{width:1rem;}
.shopList img{ width:0.7rem; height: 0.7rem;}
.shopList_top{border-top-left-radius: 0.08rem;border-top-right-radius: 0.08rem; background: #fff; height: 0.96rem; display: flex;justify-content: left;align-items: center; padding: 0 0.15rem}
.shopList_bottom{border-bottom-left-radius: 0.08rem;border-bottom-right-radius: 0.08rem; background-image: linear-gradient(90deg, #FFEC00 0%, #FECC00 98%); height: 0.4rem;text-align: center;line-height: 0.4rem;font-size: 0.15rem;color: #FF6F2D; font-weight: bold}

.Img_top{ border-radius: 8px; background: #fff;width:0.73rem;height:0.73rem;}
.shop_info{display: flex;flex-direction:column; margin-left: 0.1rem; width: 100%}
.shop_name_num{display: flex;justify-content:space-between; margin-top: 10px; }
.shop_name{font-size: 0.15rem;color: #444444;}
.price_right{font-size: 0.17rem;color: #FF575F;}
.price_right span{font-size: 0.12rem;color: #FF575F; }
.originalPrice{font-size: 0.13rem;color: #BBBBBB;letter-spacing: -0.6px; text-decoration: line-through;
}
.shop_desc{font-size: 0.12rem;color: #999999; height: 0.4rem; }
.shop_num{ display: flex; justify-content: center;align-items:  center}

.show-btn {
  margin-top: 0.5rem;
  color: #22cc22;
}
.btnGrop{ display:inline-block;flex-direction:row;background: #fff; width: 0.99rem;height: 0.3rem;padding: 0 0.1rem;border-radius: 5px;}
.btnGrop img{display:inline-block;}
.minus_img_div{background: #fff;display:inline-block;text-align: center; }
.inputChange_div{  background: #fff; display:inline-block;text-align: center;}
.add_img_div{ background: #fff;display:inline-block; text-align: center;}
.modal-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  overflow: hidden;
  z-index: 3;
  color: #fff;
}

.modal-dialog {
  width: 100%;
  position: fixed;
  bottom: 0%;
  left: 0;
  z-index: 9999;
  background: #fff;
  height: 2.30rem;
  border-radius: 0.05rem 0.05rem 0 0;
  
  
}

.modal-title {
  padding-top: 0.25rem;
  font-size: 0.18rem;
  color: #030303;
  text-align: center;
}

.modal_top{ height: 0.45rem; padding: 0 0.15rem; line-height: 0.45rem;display: flex;justify-content: space-between;align-items: center;}
.top_left{height: 0.45rem;line-height: 0.45rem;font-size: 15px;color: #444444; }


.modal-content {
 margin: 0px auto;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  height: 1.35rem;
  background: #F8F8F8;
}

.modal-input {
  display: flex;
  background: #fff;
  border: 1 solid #ddd;
  border-radius: 0.02rem;
  font-size: 0.14rem;
}


.input {
  width: 0.37rem;
  height: 0.3rem;
  font-size: 0.15rem;;
  line-height: 0.3rem;;
  padding: 0 0.025rem;
  box-sizing: border-box;
  color: #666;
  text-align:center;
  /* border:2rpx solid #BBBBBB; */
  border-radius: 3px;
  border: 0;
  /* margin-left: 10rpx; */
 
}

.input-holder {
  color: #ddd;
  font-size: 0.14rem;
}

.modal-footer {
 
  height: 0.5rem;
  position: absolute;
  bottom: 0;
  z-index: 5;
  width: 100%;
  font-size: 0.15rem;
  line-height: 0.5rem;
  color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-cancel {
  width: 50%;
  color: #666;
  text-align: center;
  border-right: 1px solid #dedede;
}

.btn-confirm {
  width: 1.19rem;
  text-align: center;
  font-size: 0.17rem;
  background: #FD3E3E;
  color: #FFFFFF;
  height: 0.5rem;
}

.shopList_bottom_btn{ width:1.19rem;
  text-align: center;
  font-size: 0.15rem;
  height: 0.43rem;
 
  line-height: 0.43rem;
   color: #FF6F2D;
    position: absolute;z-index: 19;bottom:0;
   background: rgba(0, 0, 0, 0);
  }


.modal-left{ display: flex;flex-direction: row; justify-content:center;align-items: center;position: relative; text-align: center; margin-left: 0.15rem;}
.modal-left span{font-size: 0.17rem;color: #666666; }
.modal-right{display: flex; flex-direction: row; position: relative; justify-content: center;align-items: center;width: 100%;}
.modal-left img{ width: 0.73rem;height: 0.73rem;border-radius: 50%; }
.buy_box{width: 100%; padding: 0 0.1rem;}
.buy_box_left {text-align: left;display: flex;width: 1rem;font-size: 0.15rem;color: #444444;}
.buy_box_right {text-align: left;display: flex;flex-direction: row;align-items: center;justify-content: space-between;}
.price{display: flex;  text-align: left; margin-left: 0.15rem; justify-content: left;}
.price_text{ font-size: 0.13rem;color: #666; height: 0.5rem;line-height: 0.5rem}
.price_num{font-size: 0.17rem;color: #FF575F;  text-align: left; margin-left: 0.05rem;height: 0.5rem;line-height: 0.5rem;}
.price_num span{ font-size: 0.12rem;color: #FF575F;}
.egg_con_exchangeRecord{font-size: 0.15rem;text-align: center; color: #fff;background: #69AAFF;border: 2px solid #FFFFFF;width:0.96rem;height:0.31rem;line-height:0.31rem;border-radius: 13px;position: absolute;top:0.15rem;z-index: 1;right: 0.15rem;}
.topImg dl{position: absolute;left: 0.15rem; top: 0.15rem;width:0.4rem; height: 0.4rem;}
.topImg dl a{display: inline-block;width:0.4rem; height: 0.4rem;}
.egg_con_exchangeRecord a{color: #fff;}
.egg_con_clear{
  padding-top: 0.35rem;
}
.pric_single{font-size: 0.12rem; color: #666;}
.close_img_feed{
  width: 0.21rem;
  height:0.21rem;
  background:url(./friends_list_icon_close@2x.png) center no-repeat;
  background-size:0.21rem 0.21rem;
}


</style>