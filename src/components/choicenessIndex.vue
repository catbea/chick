<template lang="html">
  <div class="main">      
     首页
  </div>
</template>

<script>
import commFunc from '../../static/utils/comm'
import BScroll from 'better-scroll'
const map=null;
export default {
  data:function(){
    return{
       
    }
  },
  created:function(){
        this.visitjudgment();
  }, 
  mounted () { 
    commFunc.commFunc("小鸡牧场");     

    
    this.$account.sessionUrlIndex(1);
    // let urlIndex = localStorage.getItem("urlIndex");
    // alert("首页："+urlIndex);

    this.$account.account(this.$router);      
  },
  methods:{
    //访问前期判断
    visitjudgment:function(){
        this.cityName=this.$myStorage.myStorage.get("cityName")||"定位中...";
        this.city_code=this.$myStorage.myStorage.get("cityCode");

        //记录是否是第一次访问
        let userFirstVisit=this.$myStorage.myStorage.get("userFirstVisit");
        console.log(userFirstVisit);
        //是第一次访问
        if(userFirstVisit==null||userFirstVisit==undefined||userFirstVisit==false){
            this.isUserFirstVisit=true;
            this.$myStorage.myStorage.set("userFirstVisit","userFirstVisit");
        }

        console.log("历史保存的城市"+this.cityName+""+this.city_code);
        //如果有访问记录，不是第一次访问，先根据历史记录获取数据  然后再定位
        if(this.cityName&&this.city_code){
            this.indexWrap=true;     
            this.isVisited=true; 
            this.getChoiceness();
        }
        var isClickCityList=sessionStorage.getItem("isClickCityList");
        //是否还在访问中
        var isKeepVisit=sessionStorage.getItem("isKeepVisit");
        if(isKeepVisit==null||isKeepVisit==undefined||isKeepVisit==false){
            this.isKeepVisit=true;
            sessionStorage.setItem("isKeepVisit","isKeepVisit");
        }
        console.log(isClickCityList);
        if(isClickCityList==null&&this.isKeepVisit){
            this.getUserLocalAddr();
            this.isloadtimeout();
        }
    },
    //获取数据
    getChoiceness:function(){

      var _self=this;
      this.loading=true;
      this.$ajax({
        method: 'post',
        url: _self.$utils.DOMIN+'goods/querychoiceness',
        params: {
            city_code : _self.city_code,
            page :_self.page,
            pagesize:_self.pageSize
        }
      }).then((response) => {
        var data=response.data;
        if(data.s===0){
          _self.goods_list = _self.goods_list.concat(data.d.goods_list);
          if(_self.goods_list.length == 0){
                _self.loadMore=false;
                _self.failMess="您所在的城市还未开通服务<br>您可以选择别的城市看看";
                _self.indexWrap=false;       
                _self.error_addr_box=true;  
                return ;
          }

          _self.allPageCount=data.d.total_count;
           if(this.allPageCount<=this.pageSize||this.page>=Math.ceil(this.allPageCount/this.pageSize)){
                this.copyright=true;
            }
          _self.loadMore=false;
          _self.indexWrap=true;         

          this.loading=false;
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.wrapper, {click:true})
              this.scroll.on('scrollEnd', (pos) => {
                // 上拉动作
                this.loading=true;
                if(this.scroll.y <= (this.scroll.maxScrollY + 50) && this.loading) {
                     _self.page++; 
                     //判断是否超过加载页面
                     if(_self.page>Math.ceil(_self.allPageCount/_self.pageSize)){
                         this.loading=false;
                         this.copyright=true;
                         return ;
                     }else{
                        this.getChoiceness();
                        this.loading=false;
                     }                  

                }
              })
            } else {
                this.scroll.refresh()
            }
          }); 


        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    goToGoodsDetail:function(goodsId){
        this.$router.push({path:'/goodsDetail',query:{goodsId:goodsId}});
    },
    //高德地图获取用户位置信息
    getUserLocalAddr:function(){       

        var map, geolocation,_self=this;
        //加载地图，调用浏览器定位服务
        map = new AMap.Map('container');  
        map.plugin('AMap.Geolocation', function() {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition:'RB'
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        });
                                    
        //解析定位结果
        function onComplete(r) {
            
            if(_self.isMapComplete) return;
            console.log(r);
            _self.isTimeout=true;     
            _self.indexWrap=true;
            _self.mapAddressComponent=r.addressComponent;
            _self.mapPosition=r.position;            
            _self.mapCityName=r.addressComponent.city||r.addressComponent.province;
            console.log("历史城市："+_self.cityName+",定位的城市："+_self.mapCityName+"/"+_self.isUserFirstVisit);

            //定位到的城市和历史城市不一致
            if(_self.cityName!=_self.mapCityName&&!_self.isUserFirstVisit){
                _self.ui_widget_overlay=true;   
                // _self.trueChange();      
            }else{
                // var isClickCityList=sessionStorage.getItem("isClickCityList");
                _self.ui_widget_overlay=false;   
                _self.trueChange();
                if(!_self.isVisited){
                    _self.getChoiceness();
                }
                
                // _self.getChoiceness();
            }



        }
        //解析定位错误信息
        function onError(e) {
            if(_self.isMapComplete) return;

            _self.isTimeout=true;   
            _self.loadMore=false;

            if(_self.cityName&&_self.city_code&&!_self.isUserFirstVisit){
                _self.indexWrap=true;      
            }else{
                _self.indexWrap=false; 
                _self.error_addr_box=true;
                _self.$myStorage.myStorage.remove("userFirstVisit");
                 sessionStorage.removeItem("isKeepVisit");
            }            
            // _self.indexWrap=false;       
            console.log('定位失败',e);
        }
    },
    cancel:function(){
        this.ui_widget_overlay=false;   
    },
    truewidget:function(){
        this.ui_widget_overlay=false;  
        this.goods_list=[];
        this.trueChange();
        this.getChoiceness()
    },
    //定位到的城市和历史城市不一致，确定切换
    trueChange:function(){
        console.log("调用了么");
        var _self=this;       
        _self.page=1;
        _self.cityName=_self.mapCityName;
        _self.city_code= _self.mapAddressComponent.citycode;

        _self.user_lng= _self.mapPosition.lng;
        _self.user_lat= _self.mapPosition.lat;

        _self.$myStorage.myStorage.set("cityName",_self.cityName);
        _self.$myStorage.myStorage.set("user_lng",_self.user_lng);
        _self.$myStorage.myStorage.set("user_lat", _self.user_lat);
        _self.$myStorage.myStorage.set("cityCode", _self.city_code);  
        
        
        // _self.getChoiceness();//定位成功，确定切换，调用数据接口
    },
    //判断是否加载超时了
    isloadtimeout:function(){
        var _self=this;
        //第一次访问超时，否则就根据上次访问记录获取数据
        setTimeout(function(){
            if(_self.isUserFirstVisit&&!_self.isTimeout){
                _self.indexWrap=false;       
                _self.error_addr_box=true;
                _self.loadMore=false;
                _self.isMapComplete=true;
            }
        },8000);
    },
    //此处调用支付宝的城列表
    gotoCityList:function(){
      let _self=this;           
      this.$router.push({path:'/cityList'});
      _self.error_addr_box=false;
    },
    //判断一个字符串是否包含另一个字符串
    isContains:function(str, substr) {
        return new RegExp(substr).test(str);
    }

  }
}
</script>

<style lang="css" scoped>
body{max-width:750px;margin:0 auto;}
.main{
    width: 100%;
    height: 100%;
    background-color: #fff;
}
img{display:block;max-width:100%}
.ant-container{width:100%;height: 100%;}
#ant-prd-box{
    padding-bottom: 50px;
}
.foot-copyright{
  width: 100%;
  padding: 15px 0;
  text-align: center;
  font-size: 11px;
  color: #999;
}
.ant-prd-box .ant-prd-list{position: relative;}
.ant-prd-box .ant-prd-list a{display:-webkit-box;height:5.2rem;-webkit-box-orient:horizontal;position:relative}
.ant-prd-box .ant-prd-list .list-left{display:-webkit-box;width:37%;justify-content:center;-webkit-box-pack:center;-webkit-box-align:center}
.ant-prd-list .list-left img{width:4.48rem;height:3.68rem}
.ant-prd-box .ant-prd-list .list-right{display:-webkit-box;width:62%;-webkit-box-pack:start;-webkit-box-orient:vertical;position:relative;margin-left:1%;}
.ant-prd-list .list-right .title{
    color:#000;font-size:17px;margin-top:0.8rem;width:96%;
    overflow:hidden;
    text-overflow:ellipsis;
    /* display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    line-height: 1.45; */
    white-space: nowrap;
    vertical-align: top;
}
.list-right .title .activity_goods{
    font-size: 10px;
    border:1px solid #ff3f00;
    color: #ff3f00;
    padding: 0 2px;
    margin-right:5px;
    position: relative;
    top: -2px;
    border-radius:2px;
    line-height:15px;
    display:inline-block;
    height:15px;
}
@media screen and (max-width: 320px){
    .list-right .title .activity_goods{
        line-height:14px;
        top: -1px;
    }
}
.ant-prd-list .list-right .price{position:absolute;left:0;bottom:.64rem;color:#ff3f00;line-height: normal;}
.list-right .price .ant-price{font-size:21px}
.list-right .price .ant-txt{font-size:12px;position:relative;bottom:2px}
.list-right .price .add{font-size:16px}
.list-right .price .origin-price{display:block;color:#888;font-size:.48rem;text-decoration:line-through}

.location_panel:after,.ant-prd-box .ant-prd-list:after{content:"";position:absolute;bottom:0;left:0;width:200%;height:1px;border-bottom:1px dashed #ededed;-webkit-transform:scale(.5);transform:scale(.5);-webkit-transform-origin:left bottom;transform-origin:left top}
.radius{
     width: 5px;
    height: 10px;
    display: block;
    position: absolute;
    z-index: 8;
    bottom: -4px;
    background-size: 5px 10px;
    background-repeat: no-repeat;
    background-position:center;
    background-image:url(/static/radius_half.png);
}
.radius1{left:0}
.radius2{right:0;-webkit-transform:rotate(-180deg)}
.hide{display:none!important}
.index-wrap{width:100%;overflow:hidden;position:relative;height: 100%;}
#slide_addr_box{position:absolute;width:100%;top:0;z-index:50000;background:#fff;}
#l-map{width:100%;height:300px;display: none;}
.location_panel{height:44px;padding-top:7px;overflow:hidden;text-align:center;position: relative;}
.location_panel .city_btn{height:30px;font-size:15px;color:#666;line-height:30px;text-align:center;border-radius:20px;border:1px solid #ddd;padding:5px 15px;position:relative}
.location_panel .city_btn img{display:inline-block;position:relative;top:-1px}
.location_panel .city_btn i{margin:0 8px}
.location_panel .city_btn img.img1{width:12px;height:14px}
.location_panel .city_btn img.img2{width:11px}
.addr-header{height:44px;line-height:44px;font-size:15px;color:#333;padding-left:15px}
.hot-cty{background:#f8f8f8;height:190px;border-top:1px solid #e5e5e5}
.hot-cty .hot-title{font-size:13px;color:#999;padding:9px 0 9px 15px;display:block}
.hot-cty .hot-city-list{-moz-column-count:3;-webkit-column-count:3;column-count:3;padding:0 30px 0 15px;column-gap:2px}
.hot-cty .hot-city-list span{width:90%;height:39px;font-size:13px;line-height:39px;color:#333;display:block;border:1px solid #999;border-radius:6px;text-align:center;margin-bottom:10px;background:#fff}
.error_addr_box{width:100%;height:100%;}
.error_addr{height:100%;display:-webkit-box;-webkit-box-orient:vertical; padding-top: 35%;-webkit-box-align:center}
.error_addr a{display:block;margin:2px auto 0;width:40%;height:44px;border:1px solid #ff3f00;border-radius:6px;background-color:#fff;color:#ff3f00;text-align:center;font-size:17px;line-height:44px}
.error_addr .fail{font-size:15px;color:#333;margin:10px 0;text-align: center;}
.ui-widget-overlay {
    background: rgba(0,0,0,0.5);
}
.ui-dialog .ui-dialog-content{background-color:#fff}
.ui-dialog.showConfirmDialog .ui-dialog-buttonpane button:first-child{display:block!important;float:left;}
.ui-dialog.showConfirmDialog .ui-dialog-buttonpane button{display:block!important}
.ui-dialog .ui-dialog-content pre{font-family:initial;color:#333}
.ui-dialog.showConfirmDialog .ui-dialog-buttonpane button{background:#fff;color:#1c94eb}
.ui-button-text-only .ui-button-text{font-family:initial!important}
.ui-widget-content{border:0;}
.ui-widget-content::after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid #e5e5e5;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 200%;
      height: 200%;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      -webkit-transform-origin: left top;
      transform-origin: left top;
      border-radius: 0.625rem;
      z-index: -1;
}
.initials {
    top: 0px;
    padding-top: 20px;
}
.is-add-price-box{
    padding: 0 0.7rem;
    height: 2.6rem;
}
.is-add-price{
    height: 36px;
    background: url(/static/is_add_img.png) no-repeat center;
    background-size: 100% 100%;
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-align: center;
    padding-left: 10px;
    line-height: 41px;
}
.is-add-price .is-add-mark{
    display: inline-block;
    height: 19px;
    width: 47px;
    border-radius:2px; 
    text-align: center;
    line-height: 19px;
    color: #fff;
    font-size: 12px;
    background-color: #ff3f00;
}
.is-add-price .is-add-desc{
    font-size: 13px;
    color: #000;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-box-flex: 1;
}
</style>
