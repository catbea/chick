import Vue from 'vue'
import Router from 'vue-router'

//小鸡首页
const chickIndex = resolve => require.ensure([],()=>resolve(require('@/components/chickIndex/chickIndex')),'chickIndex');

//小鸡家
const chickHouse = resolve => require.ensure([],()=>resolve(require('@/components/chickHouse/chickHouse')),'chickHouse');

const chickBuyRecord = resolve => require.ensure([],()=>resolve(require('@/components/chickBuyRecord/chickBuyRecord')),'chickBuyRecord');
const chickEggDetail = resolve => require.ensure([],()=>resolve(require('@/components/chickEggDetail/chickEggDetail')),'chickEggDetail');
const chickSign = resolve => require.ensure([],()=>resolve(require('@/components/chickSign/chickSign')),'chickSign');
const chickShop = resolve => require.ensure([],()=>resolve(require('@/components/chickShop/chickShop')),'chickShop');
const chickChangeRecord = resolve => require.ensure([],()=>resolve(require('@/components/chickChangeRecord/chickChangeRecord')),'chickChangeRecord');
const chickDepot = resolve => require.ensure([],()=>resolve(require('@/components/chickDepot/chickDepot')),'chickDepot');
const chickChangeRed = resolve => require.ensure([],()=>resolve(require('@/components/chickChangeRed/chickChangeRed')),'chickChangeRed');
const chickFriendHouse = resolve => require.ensure([],()=>resolve(require('@/components/chickFriendHouse/chickFriendHouse')),'chickFriendHouse');
const chickFriend = resolve => require.ensure([],()=>resolve(require('@/components/chickFriend/chickFriend')),'chickFriend');
const chickShopDesc = resolve => require.ensure([],()=>resolve(require('@/components/chickShopDesc/chickShopDesc')),'chickShopDesc');
const chickRedDesc = resolve => require.ensure([],()=>resolve(require('@/components/chickRedDesc/chickRedDesc')),'chickRedDesc');
const chickChangeShop = resolve => require.ensure([],()=>resolve(require('@/components/chickChangeShop/chickChangeShop')),'chickChangeShop');
const chickStrategy = resolve => require.ensure([],()=>resolve(require('@/components/chickStrategy/chickStrategy')),'chickStrategy');
const clearStorage = resolve => require.ensure([],()=>resolve(require('@/components/clearStorage/clearStorage')),'clearStorage');
const chickWarehouse = resolve => require.ensure([],()=>resolve(require('@/components/chickWarehouse/chickWarehouse')),'chickWarehouse');
const chickBlessing = resolve => require.ensure([],()=>resolve(require('@/components/chickBlessing/chickBlessing')),'chickBlessing');

Vue.use(Router)
export default new Router({
  // hashbang: false,
  // mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'chickIndex',
      component: chickIndex,
      meta:{
        title: '小鸡牧场',
        keepAlive: false
      }
    },
    {
      path: '/clearStorage',
      name: 'clearStorage',
      component: clearStorage,
      meta:{
        title: '清理缓存',
        keepAlive: false
      }
    },
    {
      path: '/chickHouse',
      name: 'chickHouse',
      component: chickHouse,
      meta:{
        title: '小鸡鸡窝',
        keepAlive: false
      }
    },
    {
      path: '/chickBuyRecord',
      name: 'chickBuyRecord',
      component: chickBuyRecord,
      meta:{
        title: '购买记录',
        keepAlive: false
      }
    },
    {
      path: '/chickEggDetail',
      name: 'chickEggDetail',
      component: chickEggDetail,
      meta:{
        title: '鸡蛋明细',
        keepAlive: false
      }
    },
    {
      path: '/chickSign',
      name: 'chickSign',
      component: chickSign,
      meta:{
        title: '任务',
        keepAlive: false
      }
    },	
    {
      path: '/chickShop',
      name: 'chickShop',
      component: chickShop,
      meta:{
        title: '商店',
        keepAlive: false
      }
    },
    {
      path: '/chickChangeRecord',
      name: 'chickChangeRecord',
      component: chickChangeRecord,
      meta:{
        title: '兑换记录',
        keepAlive: false
      }
    },
    {
      path: '/chickDepot',
      name: 'chickDepot',
      component: chickDepot,
      meta:{
        title: '仓库',
        keepAlive: false
      }
    },
    {
      path: '/chickChangeRed',
      name: 'chickChangeRed',
      component: chickChangeRed,
      meta:{
        title: '兑换红包',
        keepAlive: false
      }
    },
    {
      path: '/chickFriendHouse',
      name: 'chickFriendHouse',
      component: chickFriendHouse,
      meta:{
        title: '好友鸡舍',
        keepAlive: false
      }
    },
    {
      path: '/chickFriend',
      name: 'chickFriend',
      component: chickFriend,
      meta:{
        title: '好友',
        keepAlive: false
      }
    },
    {
      path: '/chickShopDesc',
      name: 'chickShopDesc',
      component: chickShopDesc,
      meta:{
        title: '商品兑换说明',
        keepAlive: false
      }
    },
		{
      path: '/chickRedDesc',
      name: 'chickRedDesc',
      component: chickRedDesc,
      meta:{
        title: '红包兑换说明',
        keepAlive: false
      }
    },
		{
      path: '/chickChangeShop',
      name: 'chickChangeShop',
      component: chickChangeShop,
      meta:{
        title: '兑换商品',
        keepAlive: false
      }
    },
    {
      path: '/chickStrategy',
      name: 'chickStrategy',
      component: chickStrategy,
      meta:{
        title: '新手攻略',
        keepAlive: false
      }
    },
    {
      path: '/chickWarehouse',
      name: 'chickWarehouse',
      component: chickWarehouse,
      meta:{
        title: '道具',
        keepAlive: false
      }
    },
    {
      path: '/chickBlessing',
      name: 'chickBlessing',
      component: chickBlessing,
      meta:{
        title: '祈福',
        keepAlive: false
      }
    }      
      
  ]
})

// router.beforeEach((to,form,next) =>{
//    /*路由变化修改title*/ 
//    if(to.meta.title){ 
//      document.title=to.meta.title 
//         // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
//       if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
//           const hackIframe = document.createElement('iframe');
//           hackIframe.style.display = 'none';
//           hackIframe.src = '/static/fixIosTitle.html?r=' + Math.random();
//           document.body.appendChild(hackIframe);
//           setTimeout(_ => {
//               document.body.removeChild(hackIframe)
//           }, 300)
//       }
//     } 
//     next(); 
// })
// export default router