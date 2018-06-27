<template>
	<div>
		<div class='changeShop'>
		    <img class='bgg' src='./exchange_of_goods_img2@2x.png' width="100%">
		    <div class='change_shop_word_div'>
		        <div class='change_nav'>
		          <img src="./exchange_of_goods_img1@2x.png">
		          <div class='change_shop_word'> <router-link to='/chickShopDesc'>兑换说明</router-link></div>
		        </div>
		    </div>
		    <div class='changeUl'>
		        <div class='changeLi' :key="item.index" v-for="item in listGift" >
		            <div class='li_img'  v-on:click='changeShopFunc(item)'><img :src='defaultImgPath+item.imgPath'></div>
		            <div class='li_name'>{{item.name}}</div>
		            <div class='li_price'>
		                <div class='egg_price'>{{item.eggQuantity}}<span>鸡蛋</span></div>
		                <div class='have' 
		                    v-on:click='changeShopFunc(item)' 
		                    v-if="item.inventory != 0">
		                    <img src='./exchange_icon@2x.png'>
		                </div> 
		                <div class='have_no' v-if="item.inventory == 0">
		                    <img src='./redeem_icon@2x.png'>
		                </div>
		            </div>
		        </div>
		    </div>
		</div>
		
		<div class='Modal_box' v-show='Modal_box'>
		    <div class='Modal_meng'></div>
		
		    <div class='goodsModal' v-show='goodsModal'>
		        <div class='goodsCon'>
		            <div class='goodsTop'>
		                <div class='tipview'>图片仅供参考，以实物为准</div>
		                <img :src="defaultImgPath+giftImg">
		                <div class='close' v-on:click='closeModal'>
		                    <img src='./exchange_icon_close@2x.png'>
		                </div>
		            </div>
		            <div class='goodsDesc'>
		                <div class='giftegg'>{{giftEgg}}<span>鸡蛋</span></div>
		                <div class='giftprice'>￥<span>{{giftPrice}}</span></div>
		                <div class='giftname'>{{giftName}}</div>
		                <div class='giftdesc'>{{giftDesc}}</div>
		            </div>
		            <div class='btnGroup'>
		                <div class='haveEgg' v-if="eggs >= giftEgg" v-on:click='changegiftFunc(giftType)'>立即兑换</div>
		                <div class='NoEgg' v-else-if="eggs < giftEgg">鸡蛋不足</div>
		            </div>
		        </div>
		        
		    </div>
		
		     <div class='addressModal' v-show='addressModal'>
		        <div class='addressModalCon'>
		            <div class='addcon'>
		                <div class='addresstitleTel'>收货地址</div>
		                <div class='addressinputTel'>
		                    <span>收货人姓名:</span>
		                    <input type='text' value='name' placeholder='请输入收货人姓名'  v-model='name' maxlength='8' />
		                </div>
		                <div class='addressinputTel'>
		                    <span>联系电话:</span>
		                    <input type='text' value='mobile' placeholder='请输入联系电话'  v-model='mobile' maxlength='11' />
		                </div>
		                <div class='addressinputTeladd'>
		                    <span>收货地址:</span>
		                </div>
		                <div class='addressinputTelRess'>
		                	<textarea rows="2" value='address' maxlength="30" placeholder='请输入收货人地址' v-model='address'></textarea>
		                	<div class="line_bottom"></div>
		                </div>
		                <div class='addresstipTel'>提示：填写后不可修改，请仔细确认信息！</div>
		            </div>
		                <div class='btnTel' v-on:click='changefinishAddress'>确认收货信息</div>
		            
		        </div>
		     </div>
		
		     <div class='telModal' v-show='telModal'>
		        <div class='telModalCon'>
		            <div class='titleTel'>输入号码</div>
		            <div class='inputTel'>
		                <span>手机号码：</span>
		                <input type='text' v-model='mobile' value="mobile" maxlength='11'></input>
		            </div>
		            <div class='tipTel'>提示：填写后不可修改，请仔细确认信息！</div>
		            <div class='btnTel' v-on:click='changefinish'>确定手机信息</div>
		        </div>
		     </div>
		
		
		
		</div>

		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				  listGift:[],
			      defaultImgPath: this.$CommFunc.defulatimg,
			      imgUrl: 'https://xjmc.yuliju.com/appimages/',
			      //defulatimg:'http://file.edian.shop/files/',
			      giftName:"",
			      giftPrice:"",
			      giftImg:"",
			      giftEgg:"",
			      giftId:"",
			      giftDesc:"",
			      giftType:"",
			      goodsModal:false,
			      addressModal:false,
			      telModal:false,
			      Modal_box:false,
			      eggs:"",
			      mobile:"",
			      name:"",
			      address:"",
			      userToken:localStorage.getItem("userToken")
			}
		},
		created(){
			this.$CommFunc.commFunc("兑换说明"); 
			this.getlistGift();
      		this.getEggNum();
		},
		methods:{
			 /** 获取鸡蛋数量**/
			  getEggNum: function () {
			   var that = this;
			   that.$ajax({
			        method: 'GET',
			        url: that.$utils.getEggs,
			        params: "",
			        
			      }).then((response) => {
			      	let rps = response.data;
			        if (rps.ret === 1000) {
			           that.eggs = rps.model.eggs;
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
			  /**
			   * 商品列表
			   * **/
			  getlistGift:function(){
			      var that = this;
			      
			     that.$ajax({
			        method: 'GET',
			        url: that.$utils.listGift,
			        
			      }).then((response) => {
			      	let rps = response.data;
			        if (rps.ret === 1000) {
			          	  let getlist = rps.model.giftDTOS;
			              getlist.forEach((item) => {
			                  item.shopName = item.name;
			                  if (item.name.length > 7) {
			                      item.name = item.name.substring(0, 7) + "...";
			                  } else {
			                      item.name = item.name.substring(0, 7)
			                  }
			                  if (item.description.length > 65) {
			                      
			                      item.description = item.description.substring(0, 65) + "...";
			                  } else {
			                      item.description = item.description.substring(0, 65)
			                  }
			              })
			              
			              that.listGift = rps.model.giftDTOS;
			              
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
			  /**
			   * 兑换事件
			   * **/
			  changeShopFunc:function(item){
			        if (item.inventory ==0){
			          return;
			        }
			        console.log(item.shopName)
			        var that =this;
			        that.giftName=item.shopName;
                    that.giftPrice=item.price;
                    that.giftImg=item.imgPath;
                    that.giftDesc=item.description;
                    that.giftEgg=item.eggQuantity;
                    that.giftId=item.id;
                    that.giftType=item.typeEnum;
                    that.giftInventory=item.inventory;
			        that.Modal_box=true;
			        that.goodsModal=true;
			        
			  },
			  /**
			   * 判断类型弹出不同实物或者好似虚拟货物弹窗
			   * **/
			  changegiftFunc:function(giftType){
			      var that = this;
			      console.log(giftType)
			      if (that.giftType == "GOODS") {// GOODS, VIRTUAL_GOODS
			            
			            that.Modal_box=true;
			            that.goodsModal=false;
			            that.addressModal=true;
			            that.telModal =false;
			           
			      } else if (that.giftType == "VIRTUAL_GOODS"){
			         	that.Modal_box=true;
			            that.goodsModal=false;
			            that.addressModal=false;
			            that.telModal =true;
			         		
			      }
			  },
			  /**
			   * 兑换商品 虚拟
			   * **/
			  changefinish:function(){
			      var that = this;
			      var params={
			          giftId: that.giftId,
			          mobile: that.mobile,
			      } 
			      var regNum = new RegExp("^1[0-9]{10}$");//判断用户输入的是否为数字
			      if (!regNum.test(params.mobile)) {
			          wu.showToast({
			            title: "请输入正确的手机号",
			            mask: false,
						icon: 'icon-info', // icon-success | icon-error | icon-info
						duration: 2000
			          })
			          return;
			      }
			      
			      that.$ajax({
			        method: 'POST',
			        url: that.$utils.eggExchangeGift,
			        params:params,
			        
			      }).then((response) => {
			      	let rps = response.data;
			        if (rps.ret === 1000) {
			          	  wu.showToast({
			                title: "兑换成功!",
			                mask: false,
							icon: 'icon-info', // icon-success | icon-error | icon-info
							duration: 2000
			              });
			              that.getlistGift();
		                  that.mobile= "";
		                  that.Modal_box=false;
		                  that.goodsModal=false;
		                  that.telModal=false;
			              
			              
			        }else{
			            wu.showToast({
							title: rps.msg,
							mask: false,
							icon: 'icon-info', // icon-success | icon-error | icon-info
							duration: 2000
						});
						that.getlistGift();
		                  that.mobile= "";
		                  that.Modal_box=false;
		                  that.goodsModal=false;
		                  that.telModal=false;
			        }
			      }).catch(function (error) {
			        console.log(error);
			      });
			  },
			  /**
			  * 兑换商品实物
			  * **/
			  changefinishAddress: function () {
			      var that = this;
			      var params = {
			          giftId: that.giftId,
			          mobile: that.mobile,
			          name: that.name,
			          address: that.address
			      }
			      if (params.name == undefined || params.name == "") {
			          wu.showToast({
			              title: "请输入收货人姓名",
			              mask: false,
							icon: 'icon-info', // icon-success | icon-error | icon-info
							duration: 2000
			          })
			          return;
			      } 
			      var regNum = new RegExp("^1[0-9]{10}$");//判断用户输入的是否为数字
			      if (!regNum.test(params.mobile)) {
			          wu.showToast({
			              title: "请输入正确的手机号",
			              mask: false,
							icon: 'icon-info', // icon-success | icon-error | icon-info
							duration: 2000
			          })
			          return;
			      }
			      if (params.address == undefined || params.address == "") {
			          wu.showToast({
			              title: "请输入收货人地址",
			              mask: false,
							icon: 'icon-info', // icon-success | icon-error | icon-info
							duration: 2000
			          })
			          return;
			      } 
			      
					
					 that.$ajax({
				        method: 'POST',
				        url: that.$utils.eggExchangeGift,
				        params:params,
				        
				      }).then((response) => {
				      	let rps = response.data;
				        if (rps.ret === 1000) {
				            wu.showToast({
				                  title: "兑换成功!",
				                 mask: false,
								icon: 'icon-info', // icon-success | icon-error | icon-info
								duration: 2000
				            });
				            that.getlistGift();
			                that.Modal_box = false;
			                that.goodsModal =false;
			                that.addressModal =false;
			                that.mobile = "";
			                that.name = "";
			                that.address = "";
				              
				              
				        }else{
				            wu.showToast({
				                title: rps.msg,
				                mask: false,
								icon: 'icon-info', // icon-success | icon-error | icon-info
								duration: 2000
				            });
				            that.getlistGift();
			                that.Modal_box = false;
			                that.goodsModal =false;
			                that.addressModal =false;
			                that.mobile = "";
			                that.name = "";
			                that.address = "";
				        }
				      }).catch(function (error) {
				        console.log(error);
			      	});
			  },
			
			  
			  /**
			   * 关闭商品详情弹窗
			   * **/
			  closeModal:function(){
			    var that = this;
			    that.Modal_box = false;
			    that.goodsModal = false;
			    
			  },
		}
	}
</script>

<style lang="css" scoped>
input,textarea{border: 0; -webkit-appearance: none;}
input::-webkit-input-placeholder{color: #C5C5C5;font-size:0.14rem;}
textarea::-webkit-input-placeholder{color: #C5C5C5;font-size:0.14rem;}
.changeShop{ width: 100%; background: #F8F8F8; min-height: 100vh; z-index: 0; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif}
.changeShop .bgg{ width: 100%;position: absolute;z-index: 1;}
.change_shop_word_view{ width: 100%; height: 0.18rem; position: relative;z-index: 3;}
.change_nav{position: fixed;width: 100%;z-index: 3; }
.change_nav img{width: 100%;height: 0.33rem;position: relative;}
.change_shop_word{ padding: 0 0.16rem;font-size: 0.13rem;color: #FFFFFF; text-align: right; width: 100%;float: right; height: 0.16rem;margin-right: 0.03rem;padding-bottom: 0.1rem;position: absolute;top:0.085rem;right: 0px}
.change_shop_word a{color: #fff;}
.changeUl{ padding: 0 0.16rem; top: 0.3rem; position: relative;z-index: 2; display: flex; justify-content:flex-start ;align-items: center;flex-wrap: wrap;}
.changeLi{ width: 1.11rem; height: 1.6rem;background: #FFFFFF;border-radius: 0.08rem; margin-right: 0.05rem; margin-bottom: 0.05rem}
.changeLi:nth-child(3n+3){ margin-right: 0}
.changeLi img{ width: 1.11rem; height: 1.11rem;border-radius: 0.08rem 0.08rem 0 0;}
.li_name{font-size: 0.11rem;color: #111111; text-align: center; padding: 0 0.08rem}
.egg_price{font-size: 0.14rem;color: #FF4F00;padding: 0 0.04rem 0 0.08rem}
.egg_price span{font-size: 0.1rem; margin-left: 0.02rem;}
.have img{ width: 0.32rem; height: 0.18rem;}
.have_no img{ width: 0.32rem; height: 0.18rem;}
.li_price{display: flex;justify-content: space-around;margin-top: 0.03rem;}
.Modal_box{display: flex;width:100%;height:100vh;justify-content: center;align-items: center;position: fixed;top: 0;bottom:0;z-index: 5}
.Modal_meng{background: rgba(0,0,0,0.50); position: absolute;z-index: 5; height: 100vh;width: 100%}
.goodsModal{position: absolute;z-index: 6;width:100%;}
.goodsCon{background: #fff;border-radius: 0.1rem; margin: 0 0.15rem}
.goodsTop{position: relative; border: 0.1rem;}
.goodsTop img{ width: 100%; height:3.45rem;position: relative; top: 0;border-radius: 0.1rem;z-index: 6 }
.tipview{font-size: 0.12rem;color: #FF6F2D;letter-spacing: 0;background: #FFDA17;border-radius: 0.1rem 0.12rem 0.12rem 0; height: 0.23rem;width: 1.64rem; text-align: center;line-height: 0.23rem;position: absolute;left: 0;top: 0;z-index: 7}
.close{position: absolute;right: 0.15rem;height: 0.1rem;top:0.15rem;}
.close img{ width: 0.21rem;height: 0.21rem;}
.goodsDesc{ padding:0.15rem;}
.giftegg{font-size: 0.23rem;color: #FF4F00;padding-left:0.05rem;font-weight: bold;}
.giftegg span{font-size: 0.15rem;color: #FF4F00;margin-left: 0.02rem;font-weight: normal;}
.giftprice{font-size: 0.13rem;color: #999999; padding-left:0.05rem;}
.giftprice span{font-size: 0.13rem;letter-spacing: 0;line-height: 0.18rem; text-decoration:line-through}
.giftname{font-size: 0.15rem;color: #444444;letter-spacing: 0; padding: 0.05rem 0 0.1rem 0;font-weight: bold}
.giftdesc{font-size: 0.14rem;color: #666666;}
.haveEgg{ background: #FFDA17;color: #FF762B; height: 0.43rem;text-align: center;line-height: 0.43rem;font-weight: bold;font-size:0.15rem;border-radius: 0 0 0.1rem 0.1rem;box-shadow:0rpx 0rpx 0.1rem rgba(255,218,23,1)}
.NoEgg{background:rgba(255,218,23,0.20);color: #FF6F2D; height: 0.43rem;text-align: center;line-height: 0.43rem;font-weight: bold;font-size:0.15rem;border-radius: 0 0 0.1rem 0.1rem;box-shadow:0rpx 0rpx 0.1rem rgba(255,218,23,0.2);}


.telModal{position: absolute;z-index: 6;width:100%;}
.telModalCon{background: #fff;border-radius: 0.1rem; width: 3rem; margin: 0 auto; display: flex;flex-direction:column;justify-content: center;align-items: center;}
.titleTel{font-size: 0.17rem;color: #444444;letter-spacing: 0.0013rem; width: 100%; text-align: center; padding: 0.25rem 0 0.17rem 0;}
.inputTel{display: flex; justify-content: center;align-items: center;}
.inputTel span{font-size: 0.15rem;color: #999999;letter-spacing: 0.0012rem;}
.inputTel input{width: 1.73rem; height: 0.3rem; line-height: 0.3rem; background: #F8F8F8;border-radius: 0.08rem; padding-left: 0.08rem;font-size: 0.12rem;color: #666666; }
.tipTel{font-size: 0.12rem;color: #C5C5C5;letter-spacing: 0.009rem; padding: 0.21rem 0 0.22rem 0;}
.btnTel{height: 0.5rem; line-height: 0.5rem;font-size: 0.16rem;color: #FF6F2D;letter-spacing: 0.0012rem; background:linear-gradient(90deg, #FFEC00 0%, #FECC00 98%);width: 100% ; text-align: center;border-radius: 0 0 0.1rem 0.1rem}
.addressModal{position: absolute;z-index: 6;width:100%;}
.addressModalCon{background: #fff;border-radius: 0.1rem; width: 3rem; margin: 0 auto; display: flex;flex-direction:column;justify-content: center;align-items: center;}
.addresstitleTel{font-size: 0.17rem;color: #444444;letter-spacing: 0.0013rem; width: 100%; text-align: center; padding: 0.25rem 0 0.17rem 0;}
.addressinputTel{display: flex; justify-content: center;align-items: center; margin-bottom: 0.2rem}
.addressinputTeladd{text-align: left;}
.addressinputTeladd span{font-size: 0.15rem;color: #999999;letter-spacing: 0.0012rem; width: 1.02rem; text-align: right;    margin-left: 30px;}
.addressinputTel span{font-size: 0.15rem;color: #999999;letter-spacing: 0.0012rem; width: 1.02rem; text-align: right;}
.addressinputTel input{width: 1.58rem; height: 0.21rem; line-height: 0.21rem; border-radius: 0.08rem; padding-left: 0.08rem;font-size: 0.14rem;color: #666666;border-bottom:1px solid #F8F8F8;min-height: 0.21rem;font-family: "微软雅黑"; }
.addresstipTel{font-size: 0.12rem;color: #C5C5C5;letter-spacing: 0.009rem; padding: 0.16rem 0 0.17rem 0;}
.addcon{width: 2.5rem; margin: 0 auto}
.place{font-size: 0.14rem;color: #C5C5C5;}
.addressinputTelRess{position:relative;font-size: 0.17rem;color: #444444;letter-spacing: 0.0013rem; width: 100%; text-align: center; padding: 0rem 0 0.17rem 0;}
.addressinputTelRess textarea{z-index:1;font-family: Arial, Helvetica, STHeiTi, sans-serif;width: 2.2rem; margin-top: 5px; margin-left: 30px;resize:none;font-size: 0.14rem;color: #666666;letter-spacing: 0.11px;line-height: 0.27rem;border-bottom:1px solid #F8F8F8;min-height: 0.21rem;}
.line_bottom{border-bottom:1px solid #F8F8F8; height: 1px; width: 2.2rem;position: absolute;z-index: 2;top: 0.3rem;left:0.3rem}

</style>