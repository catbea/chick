<template>
	<div class="buyBox">
		<div class='buyrecord' v-if="buylist.length !=0">
	    <div class='buyrecord_li' v-for="item in buylist" :key="item.index">
		        <div class='buyrecord_li_top'>
		            <div class='buy_img_name'>
		                <img class='buy_img' :src='defaultImgPath+item.productImgPath'>
		                <div class='name_num'>
		                    <span class='buy_name'>{{item.productName}}</span>
		                    <div class='buy_num'>
		                        购买数量×{{item.quantity}}
		                    </div>
		                </div>
		            </div>
		            <div class='buy_price'>-{{item.totalPrice}}<span>元</span></div>
		
		        </div>
		        <div class='buyrecord_li_bottom'>
		           <div></div> <div class='buy_time'>{{item.gmtCreate}}</div>
		        </div>
		    </div>
		    
		</div>
		<div class='No_record' v-if="buylist.length == 0">
		        <img src='./shop_consumption_no_record@2x.png' />
		        <span>还没有买过道具哦~</span>
	    </div>
	</div>
</template>

<script>


export default {
	data(){
	    return{
	    	defaultImgPath: this.$CommFunc.defulatimg,
	    	
		    buylist:[],
		    currentPage:1,
		    pageSize:10
	       
	    }
	},
	created(){
			this.$CommFunc.commFunc("消费记录");     
			this.geteggdetail();
	}, 
	methods:{ 
		
		geteggdetail:function(){
		     var params = {
		         currentPage: 1,
		         pageSize: this.pageSize
		     }
		     var _self=this;
		     let userToken = localStorage.getItem("userToken");
		     this.$ajax({
		        method: 'get',
		        url: _self.$utils.getProductOrderList,
		        params: params,
		      }).then((response) => {
		      	let rps = response.data;
		        if (rps.ret == 1000) {
			        	
		               let records = rps.model.records;
		               records.forEach((item) => {
		                   item.gmtCreate = item.gmtCreate.substring(0, 16)
		               })
		            
		                this.buylist = rps.model.records;
		            
		        }else{
		        	wu.showToast({
						title: rps.msg,
						mask: false,
						icon: 'icon-info', // icon-success | icon-error | icon-info
						duration: 3000
					});
		            
		        }
		        
		      }).catch(function (error) {
		        console.log(error);
		      });
		     
		
		     
		     
		},
		
	 
	 
	},
}
	
</script>

<style lang="css" scoped>
.buyBox{background: #F8F8F8; height: 100%; min-height: 100vh;}
.buyrecord{ margin: 0 auto; padding: 0.15rem;}
.buyrecord_li{ padding:0.15rem; display: flex; flex-direction:column; justify-content: space-between;margin-bottom: 0.15rem; background: url("./expenses_record_bg@2x.png"); background-size:100% 100%; }
.buyrecord_li_top{display: flex;justify-content: space-between;align-items: center}
.buyrecord_li_top img{ width: 0.5rem; height: 0.5rem}
.buyrecord_li_bottom{display: flex;margin-top: 0.34rem; justify-content: space-between;font-size: 0.13rem;
color: #C5C5C5;}
.buy_name{ font-size: 0.15rem;color: #666666;}
.buy_img_name{display: flex}
.buy_num{font-size: 0.13rem;;color: #999999;text-align:left;padding-top:0.05rem;}
.buy_time{font-size: 0.13rem;;line-height: 50%;margin-bottom:-0.05rem;}

.name_num{display:flex; flex-direction: column; justify-content: center;  text-align: left;margin-left: 0.1rem;}
.buy_price{font-size: 0.17rem;color: #444444;}
.buy_price span{ font-size: 0.12rem;color: #444444;padding-left:0.025rem;}
.No_record{height:100vh;font-size: 0.14rem; text-align: center; color: #ccc; display: flex;flex-direction: column; justify-content: center;align-items: center;}
.No_record img{ width: 1.54rem; height: 1.85rem; margin-bottom: 0.33rem;}
.No_record span{font-size: 0.16rem;color: #C5C5C5;letter-spacing: 0.012rem;}
</style>