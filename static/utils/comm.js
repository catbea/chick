/**
 * 所有页面都需要加的方法
 * 
 */
import axios from 'axios'
var isSaveShared = false;
function addTileIos(title){

    document.title = title;

    // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
    if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
       const hackIframe = document.createElement('iframe');
       hackIframe.style.display = 'none';
       hackIframe.src = '/static/fixIosTitle.html?r=' + Math.random();
       document.body.appendChild(hackIframe);
       setTimeout(_ => {
           document.body.removeChild(hackIframe)
       }, 300)
    }
}
const commFunc = function(title){
    addTileIos(title);
}
/**
 * 分享
 * @param shareFriendTitle 分享给朋友标题
 * @param shareFriendDesc 分享给朋友描述
 * @param shareQuanTitle 分享到朋友圈标题
 * @param shareImgUrl 分享图标
 * @param shareUrl 分享URL
 * @param afterReady 初始化之后的回调
 */

let devOrigin="https://chick.edian.shop"//测试环境域名
let preOrigin="https://chickpp.edian.shop"//预发布环境域名
let proOrigin="https://xjmc.yuliju.com"//生产环境域名
var DOMIN="";//服务端接口访问跟路径

//根据当前访问域名获取对应的服务端接口访问跟路径
let origin=location.origin//当前访问域名
if(origin==devOrigin){//测试
    DOMIN = devOrigin;
}
else if(origin==proOrigin||origin==preOrigin){//生产和预发布
    DOMIN = proOrigin;
}else{//其他
    DOMIN = devOrigin;
}
const initShare = function(shareFriendTitle, shareFriendDesc, shareQuanTitle, shareImgUrl, shareUrl, afterReady) {

    axios({
        method: 'get',        
        url: DOMIN+"/mp/jsconfig/get?url=" + encodeURIComponent(window.location.href),
      }).then((response) => {
          var data=response.data;
          if(data.ret == 1000) {
            wx.config( {
                debug : false,
                appId: data.model.appId,
                timestamp: data.model.timestamp,
                nonceStr: data.model.nonceStr,
                signature: data.model.signature,
                jsApiList : [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo'
                ]
            });
        } else{
           alert(data.msg);
        }
      }).catch(err =>{
        console.log(err);

      })
    wx.error(function(res){

        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    //    alert(JSON.stringify(res));
    });

    wx.ready(function () {
        changeShare(shareFriendTitle, shareFriendDesc, shareQuanTitle, shareImgUrl, shareUrl);
        if(afterReady != undefined) {
            afterReady();
        }
    });
}


/**
 * 分享
 * @param shareFriendTitle 分享给朋友标题
 * @param shareFriendDesc 分享给朋友描述
 * @param shareQuanTitle 分享到朋友圈标题
 * @param shareImgUrl 分享图标
 * @param shareUrl 分享URL
 */
const changeShare = function(shareFriendTitle, shareFriendDesc, shareQuanTitle, shareImgUrl, shareUrl) {

    wx.onMenuShareAppMessage({
        title: shareFriendTitle,
        desc: shareFriendDesc,
        link: shareUrl,
        imgUrl: shareImgUrl,
        success: function (res) {
            // alert("success");
        },
        cancel: function (res) {
           // alert("cancel");
        },
        fail: function (res) {
           // alert("fail");
        }
    });
    wx.onMenuShareTimeline({
        title: shareQuanTitle,
        link: shareUrl,
        imgUrl: shareImgUrl,
        success: function (res) {
            //alert("success");
        },
        cancel: function (res) {
           // alert("cancel");
        },
        fail: function (res) {
           // alert("fail");
        }
    });
}


//普通图片前缀域名
const imgUrl = 'https://xjmc.yuliju.com/appimages/';
//接口返回的图片前缀域名
const defulatimg = 'http://file.edian.shop/files/';
const userToken = "";
export default {
    commFunc,
    imgUrl,
    defulatimg,
    initShare,
    changeShare,
    userToken
}
