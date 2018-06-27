<template>
	<div class="eggBox">
		<div class='eggdetail'>
		    <div class='eggdetail_li' :key="item.index" v-for="item in eggdetailist" v-if="eggdetailist.length != 0">
		        <div class='egg_li_left'>
		            <div class='egg_title'>{{item.title}}</div>
		            <div class='egg_time'>{{item.gmtCreate}}</div>
		        </div>
		        <div class='egg_li_right' v-if="item.directionEnum == 'REDUCE'"><span>-</span>{{item.val}}</div>
		        <div class='egg_li_right' v-else-if="item.directionEnum == 'ADD'"><span>+</span>{{item.val}}</div>
		    </div>
		    
		</div>
		<div class='No_record' v-if="eggdetailist.length == 0">
		        <img src='./shop_consumption_no_record@2x.png'>
		       <span> 还没有收过鸡蛋呢~</span>
		</div>

	</div>
</template>
<script>
	export default{
		data(){
			return{
				  eggdetailist:[],
			      currentPage:1,
			      pageSize:10,
			      userToken:localStorage.getItem("userToken")
			}
		},
		created(){
			this.$CommFunc.commFunc("鸡蛋明细"); 
			this.geteggdetail();
		},
		methods:{
			geteggdetail:function(){
			     var that = this;
			     
			     var params = {
			         currentPage: 1,
			         pageSize: that.pageSize
			     }
			     
			    that.$ajax({
			        method: 'GET',
			        url: that.$utils.listEggRecord+"?currentPage=1&pageSize=" + that.pageSize,
			      }).then((response) => {
			      	let rps = response.data;
			        if (rps.ret === 1000) {
			           that.eggdetailist = rps.model.records
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
<style lang="css" scoped>
.eggBox{background: #F8F8F8!important; height: 100%; min-height: 100vh;}
.eggdetail{ margin: 0 auto; padding:0.2rem 0.15rem 0}
.eggdetail_li{ padding:0.2rem;display: flex; justify-content: space-between;background: #fff;border-radius: 8px; align-items: center; margin-bottom: 0.15rem; }
.egg_li_left{ display: flex;flex-direction: column;font-size: 0.15rem}
.egg_title{font-size: 0.15rem;color: #666666;}
.egg_time{ margin-top: 0.08rem;font-size: 26rpx;color: #999999;}
.egg_li_right{font-size: 0.17rem;color: #444444;}

.egg_li_right span{ padding-top:1rpx;display: inline-block;  float: left; }

.No_record{height:100vh;font-size: 0.14rem; text-align: center; color: #ccc; display: flex;flex-direction: column; justify-content: center;align-items: center;}
.No_record img{ width: 1.54rem; height: 1.85rem; margin-bottom: 0.33rem;}
.No_record span{font-size: 0.16rem;color: #C5C5C5;letter-spacing: 0.0012rem;}


</style>