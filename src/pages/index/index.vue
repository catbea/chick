<template>
  <div id="app">
  <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive||isRouterAlive"></router-view>
  </keep-alive> -->
  	<div id="div1" v-show="show">
			<div id="div2" onclick="javascript:history.back(-1);"><img src="static/images/suspension_return_icon@2x.png" /></div>
    </div>
    
    <router-view v-if="isRouterAlive"></router-view> 
  </div>
</template>

<script>
import CommFunc from '../../../static/utils/comm'
export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload
    }
  },
  data(){
    return {
       isRouterAlive: true,
       show:false,
    }
  },
  created(){
  	
  },
  mounted(){
    let shareUrl = location.origin+location.pathname+"#/?userId="+localStorage.getItem("userId");
    let shareImgUrl = location.origin+location.pathname+"chick.png";
    let shareFriendDesc = "你的好友正在小鸡牧场向你求助！快来帮ta喂养小鸡吧~";
    let shareFriendTitle = '你的好友正在小鸡牧场向你求助！快来帮ta喂养小鸡吧~';
    CommFunc.initShare(shareFriendTitle, shareFriendDesc, shareFriendTitle, shareImgUrl, shareUrl);
  },
	watch: {
          // 如果路由有变化，会再次执行该方法
          "$route": "reload"
  },
  methods: {
    reload () {
		      this.isRouterAlive = false
		      this.$nextTick(() => (this.isRouterAlive = true));
		      
		      var IndexHref = window.location.href;
			    var strIndex = IndexHref.charAt(IndexHref.length - 2);
			    if(strIndex == "#"){  //首页
			    	 this.show = false;
			    }else if(IndexHref.indexOf("?code=") != -1){//首页
			    	 this.show = false;
			    }else if(IndexHref.indexOf("?userId=") != -1){//分享进首页
			    	 this.show = false;
			    }else if(IndexHref.indexOf("/chickHouse") != -1){//鸡舍
			    	 this.show = false;
			    }else{
			    	this.show = true;
			    }
			   
      		/*if(this.$route.name == "chickIndex" || this.$route.name == "chickHouse"){
      			this.show = false;
      		}else{
      			this.show = true;
      		}*/
      		
      		
      		var flag = false;
			    var cur = {
			        x:0,
			        y:0
			    }
			    var vw = document.documentElement.clientWidth -50; 
    			var vh = document.documentElement.clientHeight -50;
			    var nx,ny,dx,dy,x,y ;
			    function down(){
			        flag = true;
			        var touch ;
			        if(event.touches){
			            touch = event.touches[0];
			        }else {
			            touch = event;
			        }
			        cur.x = touch.clientX;
			        cur.y = touch.clientY;
			        dx = div2.offsetLeft;
			        dy = div2.offsetTop;
			    }
			    function move(){
			        if(flag){
			            var touch ;
			            if(event.touches){
			                touch = event.touches[0];
			            }else {
			                touch = event;
			            }
			            nx = touch.clientX - cur.x;
			            ny = touch.clientY - cur.y;
			            x = dx+nx;
			            y = dy+ny;
			            
			            
			            if(x<0){
			            	x = 0;
			            }else if(x > vw ){
			            	x = vw;
			            }
			            if(y<0){
			            	y = 0;
			            }else if(y > vh ){
			            	y = vh;
			            }
						           
			            
			            div2.style.left = x+"px";
			            div2.style.top = y +"px";
			            //阻止页面的滑动默认事件
			           /* document.addEventListener("touchmove",function(){
			                event.preventDefault();
			            },false);*/
			        }
			    }
			    //鼠标释放时候的函数
			    function end(){
			        flag = false;
			    }
			    var div2 = document.getElementById("div2");
			    div2.addEventListener("mousedown",function(){
			        down();
			    },false);
			    div2.addEventListener("touchstart",function(){
			        down();
			    },false)
			    div2.addEventListener("mousemove",function(){
			        move();
			    },false);
			    div2.addEventListener("touchmove",function(){
			        move();
			    },false)
			    document.body.addEventListener("mouseup",function(){
			        end();
			    },false);
			    div2.addEventListener("touchend",function(){
			        end();
			    },false);
      		
      
    }   
  }
}
</script>

<style>

#app{
  width: 100%;
  height: 100%;
}
#div1{}
#div2{
    position: fixed;
    top:20vh;
    left:10vw;
    width: 50px;
    height: 50px;
    z-index: 999999;
}
</style>
