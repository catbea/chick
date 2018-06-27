//百度统计
const account = function(router){
    let tile=router.history.current.meta.title;
    if(tile){
        document.title = tile;
    }
    let path=router.history.current.fullPath;
    if(path){
        console.log(path);
       _hmt.push(['_trackPageview', '/#' + path]); 
    }
}

const ready = function(callback) {
    // 如果jsbridge已经注入则直接调用
    if (window.AlipayJSBridge) {
        callback && callback();
    } else {
        // 如果没有注入则监听注入的事件
        document.addEventListener('AlipayJSBridgeReady', callback, false);
    }
}
const commFun = function(){
    var isToken = sessionStorage.getItem("isToken");
    
    _addEventListener();
} 
//详情页返回监听
const _addEventListener = function(){
    console.log(3333);
    ready(function(){
        AlipayJSBridge.call('exitApp'); 
    })
}
//购买成功卡券详情页返回监听
const _addEventListenerBuy = function(obj){
    ready(function(){
        AlipayJSBridge.call('exitApp'); 
    })
}

//返回监听
const addBackHandle = function(){
    window.addEventListener("popstate",commFun(_addEventListener),false);
}
//销毁监听
const destroyBackHandle = function(callback,callback2){
    window.removeEventListener("popstate",callback,false);
    window.removeEventListener("popstate",callback2,false);
}
//缓存所有的url
const sessionAllUrl = function(index){
    let _urlList = []||JSON.parse(sessionStorage.getItem("_urlList"));
    let _url = location.href;
    if(_url.indexOf("author")>=0){
        return ;
    }
    console.log(_url);
    let _locUrl = {"pageIndex":index,"url":_url}
    
    _urlList.push(_locUrl);

    sessionStorage.setItem("_urlList",JSON.stringify(_urlList));
}
//缓存当前也的index 当前使用的
const sessionUrlIndex = function(index){
    
    let _urlIndex = {"pageIndex":index}  

    localStorage.setItem("urlIndex",JSON.stringify(_urlIndex));
}

export default{
    account,
    ready,
    commFun,
    _addEventListener,
    _addEventListenerBuy,
    addBackHandle,
    destroyBackHandle,
    sessionUrlIndex
}