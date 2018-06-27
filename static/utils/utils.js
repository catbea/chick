const devOrigin="https://chick.edian.shop"//测试环境域名
const preOrigin="https://chickpp.edian.shop"//预发布环境域名
const proOrigin="https://xjmc.yuliju.com"//生产环境域名
var DOMIN="";//服务端接口访问跟路径

//根据当前访问域名获取对应的服务端接口访问跟路径
const origin=location.origin//当前访问域名
if(origin==devOrigin){//测试
  DOMIN = "https://chick.edian.shop/chick-api/";
}
else if (origin==preOrigin){//预发布
	//其他环境（默认本地）
  DOMIN = "https://chickpp.edian.shop/chick-api/";
}else if(origin==proOrigin){//生产
  DOMIN = "https://xjmc.yuliju.com/chick-api/";
}else{//其他
  //DOMIN = "https://chick.edian.shop/chick-api/";
    DOMIN = "http://192.168.1.41:1111/";
}
console.log(DOMIN);



//打包生产之前删除掉注视的测试地址
export default{
  DOMIN,
  getProductOrderList:DOMIN+'productOrder/getProductOrderList',
  listMemberEggExchangeRecord:DOMIN+'eggExchangeRecord/listMemberEggExchangeRecord',
  getProductOrderList:DOMIN+'productOrder/getProductOrderList',
  getEggExchangeVal:DOMIN+'eggExchangeRecord/getEggExchangeVal/',
  getEggs:DOMIN+'egg/getEggs',
  listGift:DOMIN+'gift/listGift',
  eggExchangeGift:DOMIN+'eggExchangeRecord/eggExchangeGift',
  inventorypage:DOMIN+'inventory/page',
  activateChicken:DOMIN+'inventory/activateChicken/',
  listEggRecord:DOMIN+'egg/listEggRecord/',
  productPage:DOMIN+'product/productPage',
  buy:DOMIN+'productOrder/buy',
  getSignAward:DOMIN+'signInRule/getSignAward/',
  sign:DOMIN+"signInRule/sign",
  getSignRecordList:DOMIN+"signInRule/getSignRecordList",
  eggExchangeRedpacket:DOMIN+'eggExchangeRecord/eggExchangeRedpacket',
  getEggExchangeVal:DOMIN+'eggExchangeRecord/getEggExchangeVal/',
  getMyInventoryFeedInfo: DOMIN+'inventory/getMyInventoryFeedInfo',
  ownerFeed:DOMIN+'chicken/ownerFeed',
  restocking:DOMIN+'chickenDaily/restocking',
  ownerSweep:DOMIN+'/rangelandInfo/ownerSweep',
}
