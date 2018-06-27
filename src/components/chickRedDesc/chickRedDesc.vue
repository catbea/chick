<template>
	<div>
		<div class="word_box">
		    <div class='toppng'>
		      <img src="./exchange_bg_explain.png">
		    </div>
		    <div class='word'>
		    1、用户收获的金蛋，可用于兑换红包。每1个金蛋可兑换1个随机金额的红包。
		    </div>
		    <div  class='word'>
		    2、用户需关注公众号【小鸡牧场】，兑换的红包将通过公众号发放至用户微信账户。
		    </div>
		    <div  class='word'>
		    3、用户需通过小鸡牧场合规合法的途径获得及消耗金蛋。
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
			this.$CommFunc.commFunc("红包兑换说明"); 
		},
		methods:{
			
		}
	}
</script>
<style lang="css" scoped>
	.word{padding: 0 0.15rem;font-size: 0.15rem;color: #444444;letter-spacing: 0.0045rem;text-align: justify;line-height: 0.22rem; margin-bottom: 0.1rem;}
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