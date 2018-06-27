<template>
	<div class="depot_con_box">
			<div class="depot_box">
			  <div class='depot_top'>
				    <div class='depot_top_banwidth'>
				      	<div id='egg_click' class="egg_click" :class="{'action_click':showdiv}" v-on:click='changeEgg'>我的鸡蛋</div>
				    </div>
				    <div class='depot_top_banwidth'>
				      	<div id='depot_click' class="depot_click" :class="{'action_click':!showdiv}" v-on:click='changeEgg' >我的存货</div>
				    </div>
			  </div>
			  <div class="egg_con" v-show="showdiv">
			    <div class='eggdetail'>
			        
			            <div class='egg_con_exchangedetail'><router-link to='/chickEggDetail'>鸡蛋明细</router-link></div>
			        
			    </div>
			    <div class='egg_content'>
			      <div class='egg_img'><img src='./millet_protein_img@2x.png'></div>
			      <div class='egg_word_numb'><span class='egg_word'>鸡蛋</span><span class='egg_numb'><span>×</span>{{eggs}}</span></div>
			      <div class='glod_egg'>金鸡蛋，母鸡随机生下的金色鸡蛋，不仅可以用来换取红包，还能来兑换商品~</div>
			    </div>
			    <div class='img_grop'>
			      <router-link  to='/chickChangeRed'>
			        <img class='img_changered' src='./hakkyuinkaku_icon@2x.png'>
			      </router-link>
			      <router-link  to='/chickChangeShop'>
			        <img class='img_changegold' src='./exchange_of_goods@2x.png'>
			      </router-link>
			    <div class='eggdetail'>
			        <router-link  to='/chickChangeRecord'>
			            <div class='egg_con_exchangeRecord'>兑换记录</div>
			        </router-link>
			    </div>
			    </div>
			  </div>
			  <div class="depot_con" v-show="!showdiv">
			    <div class="depot_con_list">
			      <div class='stock_li' v-for="item in chickList" :key="item.index" v-if="item.quantity !=0 && item.quantity !=null">
			        <div class='stock_img'><img :src='defaultImgPath+item.productImg'></div>
			        <div class='stock_text'>
			            <div class='stock_name_num'>
			                <span class='stock_name'>{{item.name}}</span>
			                <span class='stock_num'><span class='stock_number'>×</span>{{item.quantity}}</span>
			            </div>
			            <div class='stock_describe'>
			                <div class='text_des'>{{item.intro}}</div>
			                <!--去喂养-开始饲养-->
			                <span class='goeat' v-on:click='showMeng(item)' v-if="item.type == 'CHICK'">开始饲养</span>
			                <router-link  v-if="item.type == 'CHICKEN_PROPS'"  to='/'>
			                <span class='goeat'>去喂养</span>
			                </router-link>
			            </div>
			        </div>
			      </div>
			      
			      <div class='No_record' v-if="chickList.length == 0 || NOCord">
			      	<img src="./shop_consumption_no_record@2x.png" />
			      	<span>去给小鸡买吃的吧~</span>
			      </div>
			      
			      
			      
			    </div>
			    
				<div class="buy_btn"><router-link  to='/chickShop'>购买更多</router-link></div>
				
			    
			  </div>
			   
			
			</div>
			
			
			
			<div class="modal-box" v-show="flag" v-on:click="hide">
			    <div class="modal-body" v-show="succe">
			        <div class='modal_title'>是否确认开始饲养1只小鸡</div>
			        <div class='btn_group'>
			            <div class='false_btn' v-on:click="hide">我再想想</div>
			            <div class='ture_btn' v-on:click="activateChicken">确定饲养</div>
			        </div>
			    </div>
			    <div class='fail_box' v-show="show">
			        <div class='fail_title'>饲养失败</div>
			        <div class='fail_content'>牧场空间有限，最多只能同时饲养5只小鸡~</div>
			        <div class='fail_btn'>我知道了</div>
			    </div>
			
			    <div class='fail_box' v-show="chenggong">
			        <div class='fail_title'>饲养成功</div>
			        <div class='fail_content'>已经成功饲养1只小鸡，快去牧场看看吧~</div>
			        <router-link  to='/'>
					   	<div class='fail_btn'>我知道了</div>
					</router-link>
			    </div>
			
			</div>


		
	</div>
	
</template>
<script>
	export default{
		data(){
			return{
				imgUrl: 'https://xjmc.yuliju.com/appimages/',
			    showdiv: true,
			    page:1,
			    pagesize:10,
			    chickList:[],
			    eggs:"",
			    flag: false,
			    show: false,
			    succe: false,
			    chenggong:false,
			    defaultImgPath: this.$CommFunc.defulatimg,
			    ChickenId:"",
			    disabled: false,
			    NOCord:false,
			    userToken:localStorage.getItem("userToken")
			}
		},
		created(){
			this.$CommFunc.commFunc("仓库"); 
			this.getEggNum();
			this.getChick()
		},
		methods:{
			/** 获取小鸡信息**/
			  getChick:function(page,pagesize){
			    var that = this;
			    
			    this.$ajax({
			        method: 'GET',
			        url: that.$utils.inventorypage,
			        
			      }).then((response) => {
			      	let rps = response.data;
			        if (rps.ret === 1000) {
			              
			            let records = rps.model.records;
			            records.forEach((item) => {
			
			                if (item.intro.length > 28) {
			                    item.intro = item.intro.substring(0, 28) + "...";
			                } else {
			                    item.intro = item.intro.substring(0, 28)
			                }
			                
			                if(item.quantity == 0){
			                	this.NOCord = true;
			                }
			                
			                
			            })
			             that.chickList = records;
			            
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
			   /** 获取鸡蛋数量**/
			  getEggNum:function(){
			    var that = this;
			    
			   that.$ajax({
			        method: 'GET',
			        url: that.$utils.getEggs,
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
			  //激活小鸡
			  activateChicken:function(even){
			    var that = this;
			    var ChickenId=that.ChickenId;
			    
			    that.$ajax({
			        method: 'POST',
			        url: that.$utils.activateChicken + ChickenId,
			        
			      }).then((response) => {
			      	let rps = response.data;
			        if (rps.ret === 1000) {
			              
			            that.showdiv=false;
			            that.flag= true;
			            that.chenggong=true;
			            that.show=false;
			            that.succe=false;
			         
			        }else{
			        	
			            that.showdiv=false;
			            that.flag= true;
			            that.chenggong=false;
			            that.show=true;
			        }
			        
			      }).catch(function (error) {
			        console.log(error);
			      });
			    
			  },
			  
			  showMeng:function(item){
			  	
			      var that = this;
			      var ChickenId = item.id;
			      that.flag  = true,
			      that.show = false,
			      that.succe = true,
			      that.ChickenId = ChickenId
			     
			  },
			  hide: function () {
					var that = this;
			      	if(!that.chenggong){
			      		that.flag=false;
			      	}
			          
			          that.show=false;
			          that.succe=false;
			      
			
			  },
			  /**
			   * 切换
			   */
			  changeEgg: function(event) {
			    var that = this;
			   that.showdiv =!that.showdiv;
			  }
		}
	}
	
</script>
<style lang="css" scoped>
.depot_con_box{background: #fff!important; height: 100vh}
.depot_box{background: #fff}
.depot_top{background: rgba(254,204,0, 0.05);height:0.42rem;line-height:0.42rem; font-size: 0.15rem;color: #666666;display: flex;justify-content: center}
.egg_click{width: 1.05rem;text-align: center;margin:0px auto;}
.depot_click{width:1.05rem;text-align: center;margin:0px auto;}
.action_click{color: #FF6F2D;background: url("./warehouse_convoy_picking_icon@2x.png")center center; background-size: 100% 100%;}
.depot_top_banwidth{ width: 50%;text-align: center;height:0.34rem;line-height:0.34rem; margin-top: 0.08rem;}
.hide{display: none;}
.show{display: block;}
.egg_con_exchangeRecord{font-size: 0.13rem;color: #666666; margin-top: 0.15rem;text-align: right; width: 1rem;position: absolute;right: 0.3rem;}
.eggdetail{position: relative; height:0.26rem;}
.eggdetail a{display: inline-block;}
.egg_con_exchangedetail{font-size: 0.12rem;color: #FF6F2D; margin-top: 0.23rem;text-align: center;background: #FFEEBF;border-radius: 0.14rem 0 0 0.14rem; width: 0.76rem; height:0.26rem; line-height: 0.26rem; position: absolute;right: 0;}
.egg_con_exchangedetail a{color: #FF6F2D;display: inline-block;}
.egg_con{text-align: center; margin: 0px auto; width:100%;}
.egg_content{text-align: center; margin: 0repx auto; width:100%}
.egg_img{ width: 1.74rem; margin: 0px auto;padding-top:0.29rem;}
.egg_img img{ width: 1.74rem;height: 1.39rem}
.egg_word{font-size: 0.15rem;color: #444}
.egg_numb{ color: #FE4B66;font-size: 0.19rem}
.egg_numb text{float: left; margin-top: 0.001rem;}
.egg_word_numb{ margin-top:0.24rem;display: flex;justify-content: center; align-items: center;}
.glod_egg{font-size: 0.12rem; color: #999; width: 2.88rem; margin: 0 auto;padding-top: 0.09rem}
.img_changered{ width: 3.35rem; height: 0.88rem;}
.img_changegold{ width: 3.35rem; height: 0.88rem;margin-top: 0.13rem}
.img_grop{margin-top: 0.2rem}
.img_grop a{display: inline-block;}
.depot_con{text-align: center; margin: 0px auto; padding: 0 0.15rem; padding-bottom: 0.94rem;  }
.depot_con_list{ min-height:70vh;width:100%;}
.stock_li{width:100%;border-bottom: 1px solid #F2F2F2;height: 1rem; padding:0; display: flex;  justify-content:space-between; align-items: center}
.stock_img{width: 0.7rem;height:  0.7rem; margin-right: 0.1rem}
.stock_img img{width: 0.7rem;height:  0.7rem; border-radius: 50%;}
.stock_text{ margin-top:0.05rem; padding: 0; width: 3rem}
.stock_name_num{ display: inline-block;height: 0.21rem; line-height: 0.21rem;display: flex;justify-content: space-between}
.stock_name{float: left; width: 1.3rem;font-size:0.15rem;color: #444;text-align: left}
.stock_number{font-size: 0.13rem;}
.stock_describe{margin-top: 0.05rem;display: flex; justify-content: space-between; align-items: center;}
.stock_num{float: right;font-size: 0.17rem;}
.text_des{font-size: 0.12rem;line-height: 0.15rem;  color: #999;text-align:left; width: 2rem;}
.goeat{ border-radius: 0.12rem; background: #FFEB00; width: 0.59rem; height: 0.24rem;border:none;font-size: 0.11rem;color: #FF6F2D;margin-top:0.05rem;
line-height:0.24rem;display: inline-block}
.buy_btn{ height: 0.74rem; width: 100%; left:0;  background:url("./warehouse_usual_icon@2x.png") center center; background-size:100% 100%;line-height: 0.67rem;font-size: 0.16rem;color: #FF6F2D;letter-spacing: 0.6px; text-align: center ; position:fixed; bottom: 0;}
.buy_btn a{color:#FF6F2D;}

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
  width: 3rem;
  height: 1.6rem;
  background: #fff;
  border-radius: 0.1rem;
  }
.modal_title{
    font-size: 0.17rem;
    color: #666666;
    letter-spacing: 0.0013rem;
    margin-top: 0.45rem;
    text-align: center
}
.btn_group{display: flex;justify-content: space-between;align-items: center; position: absolute;bottom: 0; width: 100%;height: 0.5rem;}
.false_btn{ height: 0.5rem;text-align: center; width: 1.5rem;border-radius:0 0 0 0.1rem;background-image: linear-gradient(-90deg, #FFFBCC 2%, #FFF5CC 100%); font-size: 0.16rem;color: #FF6F2D; line-height: 0.5rem;letter-spacing: 0.02rem;}
.ture_btn{  height: 0.5rem;text-align: center; width:1.5rem;border-radius:0 0 0.1rem 0;background-image:linear-gradient(-90deg, #FECC00 2%, #FFEC00 100%); font-size: 0.16rem;color: #FF6F2D;  line-height: 0.5rem;letter-spacing: 0.02rem;font-weight: bold}

  
.fail_box{background: #FFFFFF;border-radius: 0.1rem; width: 3rem; height: 1.86rem; text-align: center; position: relative}
.fail_title{font-size: 0.17rem;color: #444444;letter-spacing: 0.0013rem; margin-top: 0.25rem;}
.fail_content{font-size: 0.15rem;color: #666666;letter-spacing: 0.0013remrpx;text-align: center; width:1.82rem; margin: 0 auto;margin-top: 0.22rem;}
.fail_btn{ border-radius: 0 0 0.1rem 0.1rem;background-image: linear-gradient(90deg, #FFEC00 0%, #FECC00 98%);position: absolute; bottom: 0; width: 100%; height: 100rpx; line-height: 0.5rem;font-size: 0.16rem;color: #FF6F2D;letter-spacing: 0.02rem;}


.No_record{height:75vh;font-size: 0.14rem; text-align: center; color: #ccc; display: flex;flex-direction: column; justify-content: center;align-items: center;}
.No_record img{ width: 1.54rem; height: 1.85rem; margin-bottom: 0.33rem;}
.No_record span{font-size: 0.16rem;color: #C5C5C5;letter-spacing: 0.0012rem;}
</style>