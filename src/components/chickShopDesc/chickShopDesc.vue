<template>
	<div>
		<div class='word_box'>
		    <div class='toppng'>
		      <img src="./commodity_exchange_bg.png">
		    </div>
		    <div class='word'>
		    1、用户收获的鸡蛋，可用于兑换商品实物。消耗一定数量的鸡蛋就可兑换对应的商品实物。
		    </div>
		    <div  class='word'>
		    2、用户点击兑换后，需根据提示填写收货信息，客服将根据用户填写的收货信息进行发货，请认真填写收货信息。
		    </div>
		    <div  class='word'>
		    3、商品寄出后，用户可根据兑换记录中邮寄的运单号自行查询物流详情。
		    </div>
		     <div  class='word'>
		    4、用户需通过小鸡牧场合规合法的途径获得金蛋并兑换商品。
		    </div>
		</div>




	</div>
</template>
<script>
	export default{
		data(){
			return{
				imgUrl: 'https://xjmc.yuliju.com/appimages/'
			}
		},
		created(){
			this.$CommFunc.commFunc("商品兑换说明"); 
		},
		methods:{
			
		}
	}
</script>
<style lang="css" scoped>
	.word{padding: 0 0.15rem;font-size: 0.15rem;color: #444444;letter-spacing: 1px;text-align: justify;line-height: 0.22rem; margin-bottom: 0.1rem;}
.toppng{
  margin: 0 auto;
  width: 1.95rem;
  margin-top: 0.4rem;
  margin-bottom: 0.61rem;
} 
.toppng image{
  width: 1.95rem;
  height:1.7rem;
}
</style>