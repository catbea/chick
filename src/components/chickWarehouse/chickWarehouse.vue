<template>
	<div class="warehouse">
		<div class="warehouse_top">
			<dl><router-link to="/"><img src="./chicken_house_return_icon@2x.png" width="40px" height="40px" /></router-link></dl>
			<dl><router-link to="/chickShop"><img src="./store_icon@2x.png" width="100px" height="36px" /></router-link></dl>
		</div>
		<div class="warehouse_middle">
			
			<div class="propList">
				<li v-bind:class="{action_click:index==current,action:index!=current}" v-for="(item,index) in ChickProp" :key="item.index" v-if="item.quantity !=0 && item.quantity !=null" v-on:click="changeProp(item,index)">
					<img :src='defaultImgPath+item.productImg' />
					<div class="num_prop"><span>×</span>{{item.quantity}}</div>
				</li>
			</div>
			
			
			
			<div class="No_record" v-if="ChickProp.length == 0 || NOCord">
				<img src="./props_default_img@2x.png" width="124px" height="149px" />
				<p>怎么没有吃的了~</p>
			</div>
			
			
			
		</div>
		<div class="propDec">
			<div class="propDecCon">
				<!--<dt>是打发士大夫</dt>
				<dl>水电费水电</dl>
				<dl>阿三的风格</dl>-->
				<dt>{{itemFirst.name}}</dt>
				<dl>{{itemFirst.intro}}</dl>
				<dl>
					<span v-if="itemFirst.fullVal != 0 && itemFirst.fullVal != null ">饱腹值+{{itemFirst.fullVal}}</span>
					<span v-if="itemFirst.growthVal != 0 && itemFirst.growthVal != null ">成长值+{{itemFirst.growthVal}}</span>
					<span v-if="itemFirst.joyfulVal != 0 && itemFirst.joyfulVal != null ">愉悦值+{{itemFirst.joyfulVal}}</span>
				</dl>
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
			    current:0,
			    ChickProp:[],
			    NOCord:false,
			    itemFirst:[],
			    defaultImgPath: this.$CommFunc.defulatimg,
			    userToken:localStorage.getItem("userToken")
			}
		},
		created(){
			this.getChickProp();
		},
		methods:{
			/**饲料列表**/
			getChickProp:function(page,pagesize){
			    var that = this;
			    
			    this.$ajax({
			        method: 'GET',
			        url: that.$utils.inventorypage,
			        
			      }).then((response) => {
			      	let rps = response.data;
			        if (rps.ret === 1000) {
			              
			            let records = rps.model.records;
			            records.forEach((item,index) => {
			
			                if (item.intro.length > 28) {
			                    item.intro = item.intro.substring(0, 28) + "...";
			                } else {
			                    item.intro = item.intro.substring(0, 28)
			                }
			                
			                if(item.quantity == 0){
			                	this.NOCord = true;
			                }
			                
			                if(index == 0){
			                	that.itemFirst = item;
			                }
			                
			                console.log(that.itemFirst);
			                
			                
			            })
			             that.ChickProp = records;
			            
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
			changeProp:function(item,index){
				this.current=index;
				this.itemFirst = item;
			}
		}
			
	}
	
</script>

<style lang="css" scoped>
	.warehouse{ background:url('./props_bg@2x.png') top center no-repeat; min-height: 100vh; width: 100vw; background-size: 100% 100%; }
	.warehouse_top{display:flex;justify-content: space-between; margin: 0 0.15rem; padding-top:0.13rem}
	.warehouse_middle{position: relative;bottom: 0;}
	.propList{width: 92vw;height:50vh;position:absolute;left: 4vw;z-index:2;margin:0 auto;padding:0 0.25rem;margin-top: 0.90rem;overflow: scroll;}
	.propList li{background: #FFF9EB;border-radius: 18px; width:0.89rem; height: 0.98rem;float:left;margin-right: 0.14rem;margin-top:0.05rem;position: relative;display: flex;justify-content: center;align-items: center;margin-bottom: 0.25rem;}
	.propList li:nth-child(3n){ margin-right: 0;}
	.propList li img{width: 0.75rem;height: 0.75rem;}
	.propList li .num_prop{background: #C16C43;color:#fff;border: 1px solid #F2BE94;padding:0 0.06rem;border-radius: 55px;position: absolute;top:-0.05rem;right: 0;z-index: 99;}
	.num_prop span{position: relative;bottom: -2px;}
	.No_record{ width: 100vw;height: 80vh; margin: 0 auto;display: flex;justify-content: center;align-items: center;flex-direction: column;}
	.No_record p{color:#CA7950; font-size: 0.16rem; margin-top: 0.2rem;}
	.propDec{width: 92vw; height: 1.64rem; margin: 0 auto;position: absolute;left: 4vw;bottom: 0;z-index:3;}
	.propDecCon{width: 92vw; height: 1.64rem; background: url('./props_bg2@2x.png') top center no-repeat;background-size: 100% 100%;position: absolute;bottom: 0;z-index: 99; }
	.propDecCon dt{font-size: 0.15rem;color: #EFA166;letter-spacing: 0.88px; width: 3.05rem; border-bottom: 1px solid #FFEFCA; margin: 0 auto; margin-top: 0.57rem;height: 0.23rem;}
	.propDecCon dl{font-size:0.13rem;color: #F1BE93;letter-spacing: 0.76px; width: 3.05rem; border-bottom: 1px solid #FFEFCA; margin: 0 auto;margin-top: 0.15rem;height: 0.2rem}
	.action_click{border: 2px solid #F1BE93;}
	.action{border: 2px solid #F5E3B9;}
	.blue {color: #2175bc;}
	
</style>