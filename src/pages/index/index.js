// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './index.vue'
import router from './router'
import axios from 'axios'
import store from '../../store/store'
import utils from '../../../static/utils/utils'
import myStorage from '../../../static/utils/myStorage'
import account from '../../../static/utils/account'
import filters from '../../../static/filter/filter'
import VueLazyload from 'vue-lazyload' //引入这个懒加载插件
import CommFunc from '../../../static/utils/comm'

import countUp from '../../../static/utils/coutUp'
//配置懒加载
Vue.use(VueLazyload, {
 preLoad: 1.3,
 error: '',
 loading: '',
 attempt: 1,
 // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
 listenEvents: [ 'scroll' ]
})

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.prototype.$utils = utils
Vue.prototype.$filters = filters
Vue.prototype.$account = account
Vue.prototype.$myStorage = myStorage
Vue.prototype.$CommFunc = CommFunc
Vue.prototype.$countUp = countUp

//登录授权
Vue.prototype.userLoginRedirect = function(){
  let redirect = localStorage.getItem("redirect");
  if(redirect==null){
    localStorage.setItem("redirect","redirect");
    location.href=utils.DOMIN+'redirect?redirectURL='+encodeURIComponent(location.href);
  }else{
    return true;
  }           
}




//添加全部token
Vue.prototype.$ajax.defaults.headers['authorization'] = localStorage.getItem("userToken");
//添加全部拦截,授权失效
Vue.prototype.$ajax.interceptors.response.use(function (response) {
    let rps = response.data;
    if(rps.ret == 401){
      localStorage.removeItem("redirect");
      localStorage.removeItem("userToken");
      Vue.userLoginRedirect();
    }
    return response;
}, function (err) {
    console.log(err);
});

//过滤器统一处理加载
Object.keys(filters).forEach(key => {  
  Vue.filter(key, filters[key])  
})  

var app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

//价格过滤
Vue.prototype.PriceSize = function(price){
	var priceStr = price.toString();
	var i = priceStr.indexOf(".");
	var priceLength=priceStr.length;
	if(i != -1){
		var priceInt = priceStr.substr(0,i);
		var priceFlot = priceStr.substr(i+1,priceLength);
	}
	var priceAll ={
		priceInt:priceInt,
		priceFlot:priceFlot
	}
	return priceAll;
}

//监听返回处理
window.addEventListener("popstate",() => {
  // console.log(33333333);
  let urlIndex = localStorage.getItem("urlIndex");
  // alert(urlIndex);
  if(urlIndex!=null){
    urlIndex = JSON.parse(urlIndex);

    // alert(urlIndex.pageIndex);
    if(urlIndex.pageIndex==8888){
      return ;
    }

    if(urlIndex.pageIndex==1||urlIndex.pageIndex==4){
      account.ready(function(){
          // AlipayJSBridge.call('exitApp');
          AlipayJSBridge.call('exitApp', {
            closeActionType:"exitSelf"
          });
      });     
    }
    else if(urlIndex.pageIndex==2||urlIndex.pageIndex==5){
      app.$router.push({path:'/'})
    }
    else if(urlIndex.pageIndex==3){
      let goodsId = sessionStorage.getItem("goods_id")
      app.$router.push({path:'/goodsDetail',query:{goodsId:goodsId}})
    }

  }
},false);   


