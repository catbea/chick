<template>
	<div class="circle">
		<div v-bind:class="{'floatAnim':show}" class="floatMsg">+{{floatMsg}}</div>
		<svg viewBox="0 0 44 44" class="center" >
	        <defs>
	           <linearGradient x1="1" y1="0" x2="0" y2="0" id="gradient2" transform="matrix(0,-1,1,0,0,44)">
	                <stop offset="0%" stop-color="#FED93A"></stop>
	                <stop offset="100%" stop-color="#FF8400"></stop>
	            </linearGradient>
	        </defs>
	        <!--<g transform="matrix(0,-1,1,0,0,44)">-->
	        <!--<g class="transformCircle">-->
	            <circle cx="22" cy="22" r="17" stroke-width="5" stroke="#f0f1f5" fill="none" stroke-dasharray="1069 1069"></circle>
	            <circle cx="22" cy="22" r="17" stroke-linecap="round" stroke-width="5" stroke="url('#gradient2')" fill="none" :stroke-dasharray="dasharray + ' 1069'"></circle>
	        <!--</g>-->
	    </svg>
	    
	</div>
</template>

<script>
export default{
	data(){
		return{
			dasharray:0,
			floatMsg:"",
			show:false,
			defaultVal:0,
			
		}
	},
	props:['tramsFrmValGDef','tramsFrmVal','tramsFrmWatchctive','tramsFrmIndex'],
	created(){
		
		this.onReady();
	},
	mounted(){
            /*this.$on('bridge',(val)=>{
                this.fnTimeCounts(val);
            });
            
            this.$on('ready',(val)=>{
                this.onReady(val);
            });*/
            
    },
    watch:{  
            tramsFrmValGDef:{  
                handler:function(val,oldval){  
                    if(val != oldval){
                    	this.onReady();
                    	this.fnTimeCounts();
                    }
                },  
                deep:true//对象内部的属性监听，也叫深度监听  
            },  
            tramsFrmVal:{  
                handler:function(val,oldval){  
                    if(val != oldval){
                    	this.fnTimeCounts();
                    }
                },  
                deep:true//对象内部的属性监听，也叫深度监听  
            },  
            defaultVal:{
            	 handler:function(val,oldval){  
                    if(val != oldval){
                    	this.onReady();
                    }
                },  
                deep:true//对象内部的属性监听，也叫深度监听  
            }
            
    },
	methods:{
		onReady:function(){
			this.defaultVal = this.tramsFrmValGDef;
		    var circle = document.querySelectorAll("circle")[1];
            var percent = this.defaultVal / 100, perimeter = Math.PI * 2 * 17;
            this.dasharray = perimeter * percent ;
            
		},
		
		fnTimeCounts:function(){
			
			console.log("this.tramsFrmWatchctive:",this.tramsFrmWatchctive)
			console.log("this.tramsFrmIndex:",this.tramsFrmIndex)
			
			if(this.tramsFrmWatchctive == this.tramsFrmIndex){
				this.floatMsg = this.tramsFrmVal;
			    var circle = document.querySelectorAll("circle")[1];
	            var percent = this.floatMsg / 100, perimeter = Math.PI * 2 * 17;
	            this.dasharray = perimeter * percent ;
	            this.show = true;
	            var clearTime = null
	             clearTime= setTimeout(() => {
					this.show = false;
					this.floatMsg = '';
				},1500)
	           // circle.setAttribute('stroke-dasharray', perimeter * percent + " " + perimeter * (1- percent));
			}
			
			
          
		}
	}
	
}				
</script>

<style lang="css" scoped>
@import url(../../../../static/font/font.css);
	circle {
	    -webkit-transition: stroke-dasharray .5s;
	    transition: stroke-dasharray .5s;
	}
	
	@-webkit-keyframes fadeIn {
	0% {
	opacity: 0; /*初始状态 透明度为0*/
	top:-0.26rem;
	}
	50% {
	opacity: 1; /*中间状态 透明度为0*/
	top:0px;
	}
	100% {
	opacity: 0; /*结尾状态 透明度为1*/
	top:0px;
	}
}
circle{border-radius: 10px;}
.center{transform: rotate(-90.1deg); width: 0.57rem; height: 0.57rem; }
.circle{position: relative; top: -3px;left: -3px; }
.floatMsg{
	font-family: ArialHebrew-Bold;
	opacity: 0;
	font-size: 0.26rem;
	width:0.51rem;
	color: #FF6800;
	font-family: ArialHebrew-Bold;
	position: absolute;
	top: -0.26rem;
	z-index: 99;
}
.floatAnim{	-webkit-animation-name:fadeIn; /*动画名称*/
	-webkit-animation-duration: 2s; /*动画持续时间*/
	-webkit-animation-iteration-count: 1; /*动画次数*/
	-webkit-animation-delay: 0s; /*延迟时间*/}
	
</style>