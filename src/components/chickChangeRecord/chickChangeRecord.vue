<template>
	<div class="changeRecordBox">
		<div class='changeRecord'>
		  <div class='changeRecord_li' :key="item.index" v-for="item in listExchangeRecord" v-if="listExchangeRecord != 0">
		    <div class='changeRecord_box'>
		      <div class='img_word'>
		        <img v-if="item.typeEnum == 'REDPACKET'" src='./exchange_record_parcel_icon@2x.png'>
		        <img v-else-if="item.typeEnum == 'GOLD'" src='./exchange_record_golden_img@2x.png'>
		         <img v-else-if="item.typeEnum == 'GIFT'" :src='defaultImgPath+item.giftImgPath'>
		        <div class='redpacket'>
		          <div v-if="item.typeEnum == 'REDPACKET'" class='gray'>
		            <span v-if="item.statusEnum == 'PENDING'" class='gray3'>红包</span>
		            <span v-else-if="item.statusEnum == 'FAIL'" class='gray'>红包</span>
		            <span v-else-if="item.statusEnum == 'SENT'" class='gray3'>红包</span>
		            <span v-else-if="item.statusEnum == 'RECEIVED'" class='gray'>红包</span>
		            <span v-else-if="item.statusEnum == 'REFUND'" class='gray'>红包</span>
		          </div>
		          <div v-else-if="item.typeEnum == 'GOLD'">
		            <span v-if="item.statusEnum == 'PENDING'">黄金</span>
		            <span v-else-if="item.statusEnum == 'FAIL'"  class='gray'>黄金</span>
		            <span v-else-if="item.statusEnum == 'SENT'"  class='gray'>黄金</span>
		            <span v-else-if="item.statusEnum == 'RECEIVED'" class='gray'>黄金</span>
		            <span v-else-if="item.statusEnum == 'REFUND'" class='gray'>黄金</span>
		          </div>
		
		          <div v-else-if="item.typeEnum == 'GIFT'" >
		            <span v-if="item.statusEnum == 'PENDING'" class='gray3'>{{item.giftName}}</span>
		            <span v-else-if="item.statusEnum == 'FAIL'"  class='gray3'>{{item.giftName}}</span>
		            <span v-else-if="item.statusEnum == 'SENT'"  class='gray3'>{{item.giftName}}</span>
		            <span v-else-if="item.statusEnum == 'RECEIVED'" class='gray'>{{item.giftName}}</span>
		            <span v-else-if="item.statusEnum == 'REFUND'" class='gray'>{{item.giftName}}</span>
		          </div>
		         
		          <div v-if="item.typeEnum == 'REDPACKET' || item.typeEnum == 'GIFT'" class='gray1'>
		          <span class='gray1'>￥</span><span class='gray'>{{item.amount}}</span><span class='gray1'>元</span></div>
		          <div v-else-if="item.typeEnum == 'GOLD'" class='gray'>{{item.amount}}克</div>
		          
		        </div>
		      </div>
		      <div class='word'>
		
		        <div v-if="item.statusEnum == 'PENDING' && item.typeEnum == 'GIFT'" class='gray3'>未发货</div>
		        <div v-else-if="item.statusEnum == 'PENDING' && item.typeEnum == 'REDPACKET'" class='gray3'>待处理</div>
		        <div v-else-if="item.statusEnum == 'FAIL'"  class='gray'>发放失败</div>
		        <div v-else-if="item.statusEnum == 'SENT'  && item.typeEnum == 'GIFT'"  class='gray3'>已发货</div>
		        <div v-else-if="item.statusEnum == 'SENT'  && item.typeEnum == 'REDPACKET'"  class='gray3'>已发放</div>
		        <div v-else-if="item.statusEnum == 'RECEIVED'" class='gray'>已到账</div>
		        <div v-else-if="item.statusEnum == 'REFUND'" class='gray'>已退款</div>
		        <div class='gray time'>{{item.gmtCreate}}</div>
		      </div>
		    </div>
		    <div class='express_box show' v-if="item.expressNum != null && item.typeEnum == 'GIFT'">
		      <span>运单号：<span class="expressNum">{{item.expressNum}}</span></span>
		      <!--<span data-expressNum="item.expressNum" bindtap='copyTBL' class='copy_expressNum'>复制</span>-->
		    </div>
		  </div>
		</div>
		<div class='No_record' v-if="listExchangeRecord == 0">
		      <img src='./shop_consumption_no_record@2x.png'>
		       <span> 还没有兑换过宝物哦~</span>
		</div>
	</div>
	
</template>

<script>
	export default{
		data(){
			return{
				expressNum: "",
			    defaultImgPath: this.$CommFunc.defulatimg,
			    listExchangeRecord:[],
			    currentPage: 1,
			    pageSize: 10,
			    userToken:localStorage.getItem("userToken")
			}
		},
		created(){
			this.$CommFunc.commFunc("兑换记录"); 
			this.ExchangeRecord();
		},
		methods:{
			ExchangeRecord: function () {
			    var that = this;
			    var params={
			        currentPage: that.currentPage,
			        pageSize: that.pageSize 
			    }
			    this.$ajax({
			        method: 'GET',
			        url: that.$utils.listMemberEggExchangeRecord,
			        params: params
			       
			      }).then((response) => {
			      	let rps = response.data;
			        if (rps.ret === 1000) {
			             that.listExchangeRecord = rps.model.records;
			             
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
	
	
.changeRecordBox{background: #F8F8F8; height: 100%; min-height: 100vh; }
.changeRecord{padding: 0 0.15rem; padding-top: 0.2rem;}
.changeRecord_li{ background: #fff;border-radius: 8px; width: 100%;display: flex;flex-direction:column; margin-bottom: 0.15rem}
.img_word img{width:0.56rem;height: 0.56rem;border-radius: 50%;}
.img_word{display: flex;width:2rem;height: 0.26rem;}
.word{font-size: 0.15rem;height: 0.56rem; text-align: right;line-height: 0.2rem; margin-top:0.1rem; }
.redpacket{font-size: 0.15rem; height: 0.56rem; line-height: 0.2rem; margin-top:0.1rem;margin-left: 0.06rem}
.changeRecord_box{display: flex;flex-direction: row;justify-content:space-between; padding: 0.15rem 0.12rem 0 0.2rem }
.express_box{ font-size: 0.12rem;color: #999999; height: 0.44rem; line-height: 0.44rem;padding-left:0.2rem;display: none }
.copy_expressNum{ margin-left: 0.1rem;font-size: 0.12rem;color: #309DFE;}
.gray{color:#999999;font-size: 0.15rem;}
.gray1{color:#999999;font-size: 0.12rem;}
.gray3{color:#444444;font-size: 0.15rem;}
.show{display: inline-block}
.time{ font-size: 0.12rem; margin-top:0.03rem }

.No_record{height:100vh;font-size: 0.14rem; text-align: center; color: #ccc; display: flex;flex-direction: column; justify-content: center;align-items: center;}
.No_record img{ width: 1.54rem; height: 1.85rem; margin-bottom: 0.33rem;}
.No_record span{font-size: 0.16rem;color: #C5C5C5;letter-spacing: 0.0012rem;}
.expressNum{
-webkit-touch-callout: all;
-webkit-user-select: all;
-moz-user-select: all;
-ms-user-select: all;
user-select: all;
}

</style>