<template>
<div class="chick-container" v-show="isSHowChickContainer" style="display:none">
    <div class='myView' :class="{'myViewCurImg':statusDay=='DAY'}">
        <!---->
        <div class="lead_box" v-show="isLeadShow">
        	<p class="passLead" v-show="passLeadShow" @click="passLead">跳过</p>
        	<div class='lead_btn' v-show="isLeadShow" @click='leadShowFn'></div>
            <img class='leadImgThisEgg' width="100%" v-show='leadEggThis' src="./beginner_guide_egg@2x.png"/>  
            <img class='leadImgThisHouse' width="100%" v-show='leadHouseThis' src="./beginner_guide_house@2x.png"/>  
            <img class='leadImgThis' width="100%" v-show='leadShopShowThis' src="./beginner_guide_store@2x.png"/>  
            <img class='leadImgThis' width="100%" v-show='leadInventoryShowThis' src="./beginner_guide_warehouse@2x.png"/>  
            <img class='leadImgThis' width="100%" v-show='leadTaskShowThis' src="./beginner_guide_task@2x.png"/>  
            <img class='leadImgThis' width="100%" v-show='leadStrategyShowThis' src="./beginner_guide_raiders@2x.png"/>  
            <img class='leadImgThisClea' width="100%" v-show='leadCleanShowThis' src="./beginner_guide_clean@2x.png"/>  
            <img class='leadImgThisFeed' width="100%" v-show='leadFeedShowThis' src="./beginner_guide_feeding@2x.png"/>  
            <img class='leadImgThisFri' width="100%" v-show='leadFriendShowThis' src="./beginner_guide_fd@2x.png"/>  
        </div>
        
        <div class='container'>
            <div class='my_title' @click='friendsShowFn' v-show="!isHasUserId">
                <img class='my_friends' src="./friends_button@2x.png"/>
                <!--<img class='lead_friends' v-show='leadFriendShow' src="./newbie_guidefriends_icon@2x.png"/>-->
            </div>
            <div class="my_egg_box" @click="model_chickChangeRed" v-show="!isHasUserId">
                <div class="headImg">
                  <img :src="avatarUrl" alt="" v-if="avatarUrl">
                  <img src="./default_avatar_img.png" alt="" v-else>
                </div>
                <img src="./golden_eggs_icon@2x.png" class="golden_egg_img" alt="">     
                <span class="eggs_count">{{totalEggs}}</span>           
            </div>
            <div class='my_info' v-show="!isHasUserId">
                <router-link to='/chickHouse' class="navigator">
                    <img class='my_shop' src="./henhouse_button.png"/>
                    <!--<img class='lead_shop' v-show='leadShopShow' src="./store_icon@2x.png"/>-->
                </router-link>
                <router-link to='/chickShop' class="navigator">
                    <img class='my_shop' src="./prop_button.png"/>
                    <!--<img class='lead_shop' v-show='leadShopShow' src="./store_icon@2x.png"/>-->
                </router-link>
  
                <!-- <router-link to='/chickDepot' class="navigator"> -->
                    <!-- <img class='my_warehouse' src="./warehouse_button.png"/> -->
                    <!--<img class='lead_shop' v-show='leadInventoryShow' src="./newbie_warehouse_icon@2x.png"/>-->
                <!-- </router-link> -->

                <div @click='chickSign' class="navigator">
                    <img class='my_task' src="./task_button.png"/>
                    <!--<img class='lead_shop' v-show='leadTaskShow' src="./newbie_task_icon@2x.png"/>-->
                </div>

                <router-link to='/chickStrategy' class="navigator">
                    <img class='my_strategy' src="./strategy_button@2x.png"/>
                    <!--<img class='lead_shop' v-show='leadStrategyShow' src="./newbie_raiders_icon@2x.png"/>-->
                </router-link>
            </div>   

            <div class='my_bottom'>
              <a @click='feedShowFun' v-show="statusDay=='DAY'"><img  class='my_feed' src="./feed_button.png"/></a>

              <!--<img class='lead_feed' v-show='leadFeedShow' src="./newbie_feed_icon@2x.png"/>-->

              <!--<img class='lead_clean' v-show='leadCleanShow' src="./newbie_clear_icon@2x.png"/>-->

              <a @click='isClearfun'><img class='my_clean' src='./clean_button@2x.png'/></a>

              <div class='my_progress' @click='isClearfun'>
                <div class="progress" :class="{'progress-active':externalCleanness>60}" :style="'width:'+externalCleanness+'%'"></div>
                <div class='cleanText'>{{externalCleanness}}</div>
              </div>
            </div>
            <!-- 小鸡列表 -->
            <div class='my_conents'>    
              <div class='conents_chenken_list'>
                <div class='conents_chenken_list night_info' v-show="statusDay!='DAY'">
                  <span>晚上没有小鸡哟</span> 
                </div>
                <div v-for="(item,index) in chicklist" :key="index" v-if="chicklist&&chicklist.length>0" class='contents_img_about'>
                    <div @click='feedCheckName(item.num)'  :class="item.period+' '+item.position[index]"  style='z-index:2;'>
                        <div class='talk_div'>
                            <div v-if="MaxjoyfulVal == item.joyfulVal" v-show='cleanBool' class='ScleanView'><span>好脏呀，宝宝要不高兴了~</span></div>
                            <div v-if="minHungerId == item.id" v-show='HungerTalkBool' class='SHungerTalkView'><span>宝宝饿了，宝宝想要吃饭~</span></div>
                            <div v-show='NoCleanHungerBool' class='SNoCleanHungerView'><span class="text">宝宝最喜欢小主人来看我了~</span></div>
                            <div class='ShungerView'>
                                <div class='fullVal'>{{item.fullVal}}</div>
                                <div class='fullWord'>饱腹值</div>
                            </div>
                        </div>
                        <div class='chick_img_name'>
                            <img :src="item.gifImags"/>
                            <div class='Schick_item_name'>{{item.name}}</div>
                        </div>
                    </div>                       
                </div>
              </div>
            </div>
            <!-- 鸡舍 -->
            <!-- <div class='my_to_house'>
              <img v-show='havingAgency' src='./checkbtn.gif'/>
            </div>               -->
        </div>

        <!--好友  -->
        <div class='friends_container' v-show='friendsShow' @click='friendsShowFnClose'>

          <div class='friends_content' @click="prevent($event)">
            <img class='friends_title_img' src="./friends_list_icon@2x.png"/>
            <div class='friends_content_friends'>
              <span class="text">好友</span>
            </div>
            <div class='close_feed_box' @click="friendsShowFnClose">
            </div>
            <div class="scroll-view-y" ref="wrapper">
              <div class="wrapper">
              <div class='item_content' @click='gotoFriends($event,item.friendNum,item.nickName)' :key="index" v-for="(item,index) in getFriendList">

                <div class='item_content_icon'>
                  <img v-if="index == 0" src="./friebds_list_icon_gold_medal@2x.png"/>
                  <img v-else-if="index == 1" src="./friends_list_icon_silver_medal@2x.png"/>
                  <img v-else-if="index ==2" src="./friends_list_icon_bronze_medal@2x.png"/>
                  <span class="text" v-else>{{index+1}}</span>
                </div>
                <div class='item_content_title_img'>	
                	<img :src="item.avatarUrl" alt="" v-if="item.avatarUrl">
                  	<img src="./default_avatar_img.png" alt="" v-else>
	                 
                </div>
                <div class='item_content_info'>
                  <span>{{item.nickName}}</span>
                </div>
                <div class='item_conent_egg'>
                  <img src="./friebds_list_icon_gold_egg.png">
                  <span class="text">{{item.eggs}}</span>
                </div>
                <div class='item_content_footer'>
                  <img src='./friebds_list_icon_back@2x.png'/>
                </div>
              </div>
              <div v-if="getFriendList.length==0" class='no_friendlist'>
                <span>没有好友，快去邀请好友吧！</span>
              </div>
            </div>
            </div>
            <div class='friends_footer_btn'>
              <div class='friends_footer_btn_view'>
                <button class='friends_footer_btn_share' @click="share">邀请</button>
              </div>
            </div>
          </div>
        </div>
        <!--  喂养列表-->
        <div class='feed_index_list_container ' v-show='feedShow' >
          <div class='scroll_item_tolist' @click='feedShowFun($event)'>
            <div>
              <div class="feed_item" :class="{'active':item.isCheckUp}" v-show="item.period!='FAIL_ILL'|| item.period!='CURE'" v-for="(item,index) in chickenBaseInfoDTOList" :data-period="item.period" :key="index" :num="item.num"  @click='checkChicken($event,index,item.num)'>
                  <div class='feed_item_name' :class="{'feed_item_name-active':item.isCheckUp}">{{item.name}}</div>
                  <div class="feed_item_info_li">
                      <div v-if="item.period=='MATURE'" class='feed_item_img_L'>
                          <img  src='./feed_bigchicken_img@2x.png'/>
                      </div>
                      <div v-if="item.period=='HALF_GROWTH'" class='feed_item_img_M'>
                        <img src='./feed_chicken_img@2x.png'/>
                      </div>
                      <div v-if="item.period=='GROWTH'" class='feed_item_img_S'>
                          <img src='./feed_chick_img@2x.png'/>
                      </div>                      
                      <div class='feed_item_info'>
                          <div class='fend_happy'>愉悦值:
                              <span>{{item.joyfulVal | addKToPleasureValue}}</span>
                          </div>
                          <div class='feed_item_last'>
                              <div class='feed_item_last_one'>成长值:{{item.growthVal}} 
                              </div>
                              <div class='feed_item_last_two progress'>
                                  <div class="feed_item-progress progress" :style="'width:'+item.growthVal+'%'"></div>
                              </div>
                          </div>
                              <div class='feed_item_last'>
                              <div class='feed_item_last_one'>饥饿值: {{item.fullVal}}</div>
                              <div class='feed_item_last_two progress'>
                                  <div class="feed_item-progress progress" :style="'width:'+item.fullVal+'%'"></div>
                                  <span class='feed_item_last_value' style='color:#02CCD0;'></span>
                              </div>
                              </div>
                      </div>
                  </div>
              </div>              
            </div>
          </div>

          <div class='feed_item_footer'>
                  <div class='feed_item_footer_top'>
                      <span class="text">喂养</span>
                      <img class='icoimage' src='./chicken_feeding_feed_icon@2x.png'/>
                      <div class='close_feed_box' @click='feedShowFun($event)'></div>
                  </div>

                  <div class="scroll-x">
                    <div class='feed_item_footer_item_ul'>
                        <div class='feed_footer_flex' v-if="records.length != 0" v-for="(item,index) in records" :key="index"  @click='upCheckChicken(item.id)'>
                            <div class='feed_name'>{{item.name}}</div>
                            <div class='feed_img'>
                                <img :class="{'active' :item.isChick }" class="feedImg" :src='defulatimg+item.productImg'/>
                            </div>
                            <div class='item_fullval_item'>
                                <span class='feed_footer_title'><span style='font-size:0.12rem'>x{{item.quantity}}</span></span>
                                <div class='feed_val_list'>
                                    <span class="text" v-show='item.fullVal != 0'>饱腹值+{{item.fullVal}}</span>
                                    <span class="text" v-show='item.growthVal != 0'>成长值+{{item.growthVal}}</span>
                                    <span class="text" v-show='item.joyfulVal != 0'>愉悦值+{{item.joyfulVal}}</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="records.length == 0">
                            <div class='no_feed_view'>没有饲料了~</div>
                        </div>
                    </div>
                  </div>
                  <router-link to='/chickShop' class="navigator">
                    <div class='morefeed'>获取更多饲料></div>
                  </router-link>
          </div>          
        </div>

        <!--喂养小鸡  -->
  
        <div class='friends_container' v-show='feedCheckShow'>
          <div class='feed_item_Chicken3' @click='closeChienk'>
          	  
	          	  <div class='changeNameView' :data-num="chickInfo.num"  @click='changeName($event,chickInfo.num)'>
	                  <span class="text">{{chickInfo.name}}</span>
	                  <img v-show="!isHasUserId" src='./edit_icon@2x.png'/>
	              </div>
	          
              <div class='chick_size_type'><!--切图有问题  -->
                  <img v-if="chickInfo.period=='MATURE' ||chickInfo.period=='CURE'" src="./b6.gif"/>
                  <img v-if="chickInfo.period=='GROWTH'" src="./s6.gif"/>
                  <img v-if="chickInfo.period=='HALF_GROWTH'" src="./m6.gif"/>
              </div>
              
              <div class='pleasure'>
                  <img src="./chicken_feeding_pleasure_value_icon@2x.png"/>
                  <span class="text">{{chickInfo.joyfulVal | addKToPleasureValue}}</span>
              </div>
              <div class='satiety'>
                  <img src="./chicken_feeding_satiety_value_icon@2x.png"/>
                  <span class="text">{{chickInfo.fullVal}}</span>
              </div>
              <div class='growth'>
                  <img src="./chicken_feeding_growth_value_icon@2x.png"/>
                  <span class="text">{{chickInfo.growthVal}}</span>
              </div>
              <div class='input_box_small'>
                  <img src="./chicken_feeding_input_box_small.png"/>
              </div>
          </div>

          <div class='feed_item_footer'>
                  <div class='feed_item_footer_top'>
                      <span class="text">喂养</span>
                      <img class='icoimage' src='./chicken_feeding_feed_icon@2x.png'/>
                      <div class='close_feed_box' @click='closeChienk'></div>
                  </div>

                  <div class="scroll-x">
                  <div class='feed_item_footer_item_ul' >  
                        <div class='feed_footer_flex' v-if="records.length != 0"  @click='upCheckChicken(item.id)' v-for="(item,index) in records" :key="index" >
                          <div class='feed_name'>{{item.name}}</div>
                          <div class='feed_img'>
                              <img class="feedImg" :class="{'active':item.isChick}" :src="defulatimg+item.productImg"/>
                          </div>
                          <div class='item_fullval_item'>
                              <span class='feed_footer_title'><span style='font-size:0.12rem'>x{{item.quantity}}</span></span>
                              <div class='feed_val_list'>
                                  <span class="text" :data-fullval="item.fullVal" v-show='item.fullVal != 0'>饱腹值+{{item.fullVal}}</span>
                                  <span class="text" v-show='item.growthVal != 0'>成长值+{{item.growthVal}}</span>
                                  <span class="text" v-show='item.joyfulVal != 0'>愉悦值+{{item.joyfulVal}}</span>
                              </div>
                          </div>
                      </div>
                      <div v-if="records.length == 0">
                          <div class='no_feed_view'>没有饲料了~</div>
                      </div>
                  </div>
                  </div>
                  <router-link to='/chickShop' class="navigator">
                    <div class='morefeed'>获取更多饲料></div>
                  </router-link>
          </div>
      </div>
      <!--打扫  -->
      <div class='Clean' v-show='isClean'>
        <img src="./Clean.gif"/>
      </div>
      <!--垃圾  -->
      <div class='my_conents_garbage'>
        <img v-show="externalCleanness!=100" v-for="(item,index) in garbage" :key="index" :class="'garbage'+item.id" :src='item.img'/>
      </div>
      <!--鱼和风车  -->
      <div class='yu'>
        <img v-if="statusDay=='DAY'" src="./yu.gif"/>
      </div>
      <div class='fengche' v-if="statusDay=='DAY'">
        <img v-if="statusDay=='DAY'" class='fengche1' src="./fengche1@2x.png"/>
        <img v-if="statusDay=='DAY'" class='fengche2' src="./fengche2@2x.png"/>
      </div>
      <!--云  -->
      <div class='yun'>
        <img v-if="statusDay=='DAY'" class='yunone' src="./yun/1@2x.png"/>
        <img v-if="statusDay=='DAY'" class='yuntwo' src="./yun/2@2x.png"/>
        <img v-if="statusDay=='DAY'" class='yunthree' src="./yun/3@2x.png"/>
      </div>
      <!-- 用户第一次来的弹窗 -->
      <div class='bg' v-show='bgShow'>
          <div class='bg_model' v-show='bgShow'>
            <div class='bg_info'>牧场送你{{chickAdoptionCount}}只小鸡，开始饲养吧~</div>
            <div class='bg_btn' @click='bgShowFn'>我知道了</div>
          </div>
      </div>
      <!-- 修改小鸡名 -->
      <div class='Modal_box' v-show='Modal_box'>
          <div class='Modal_meng' @click='hideModal_meng'></div>
          <div class='telModal' v-show="this.changeNameBool">
              <div class='telModalCon'>
                  <div class='titleTel'>设定新名字</div>
                  <div class='inputTel'>
                      <input type='text' maxlength='5' autofocus :focus="focus" ref="chickNameNewInput" placeholder-class='name_color' v-model="chickNameNew" placeholder='请输入小鸡仔昵称'/>
                  </div>
                  <div class='btnTel' @click='changeNamefinish'>确定</div>
              </div>
          </div>
      </div>
      <!-- 首页点击金蛋显示的弹窗 -->
      <IndexEggModal :indexEggModalShow="indexEggModalShow" @notifyIndexEggModalShow="model_chickChangeRed"></IndexEggModal>
      <IndexTaskModal :chickSignShow="chickSignShow" :isSHowFriend ="isShowSignInvite" :isSHowAttent="isSHowSginAttent" @notifyIndexTaskModalShow="model_chickTask"></IndexTaskModal>
      <!-- 邀请好友 -->
      <indexInviteFriend :isShowInvite="isShowInvite" :rewewardConfigForwardDTOS="rewewardConfigForwardDTOS" @notifyIndexInviteFriend="model_chickFriendInvite"></indexInviteFriend> 
      <!-- 关注 -->
      <indexAttention :isSHowAttent="isSHowAttent" :isAttented="isAttented" @notifyIndexAttent="model_chickAttent"></indexAttention>
    </div>
    <!-- 分享提示 -->
    <div class="share-tips" v-show="sharetips" @click="hideSharetips"><img src="./invite_share2_img@2x.png" alt=""></div>
</div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:"chickIndex",
    inject:  ['reload'],
    data(){
        return {
            imgUrl: this.$CommFunc.imgUrl,
            defulatimg:this.$CommFunc.defulatimg,
            records: [],
            userInfo: {},
            isSHowChickContainer:false,//是否显示主界面
            chickSignShow:false,
            indexEggModalShow:false,
            showToastInfo: true,
            feedShow: false,
            friendsShow: false,//是否显示好友列表
            feedCheckShow: false,
            isClean: false,
            isCheckName: true,
            bgToast: true,
            chickName: '',
            externalCleanness:50,
            bgShow: false,
            chickAdoptionCount: "2",
            hideToastcheck: false,
            havingAgency: false,
            statusDay: 'DAY',
            pageIndex: 1,//好友列表页数
            changeNameBool: true,
            chickInfo:{},
            chickInfoNum: "",
            chickNameNew: "",
            Modal_box: false,
            cleanBool:false,
            HungerTalkBool: false,
            NoCleanHungerBool: false,
            minHunger:"",
            minHungerId:"",
            MaxHunger:"",
            MaxHungerId:"",
            MaxjoyfulVal:"",
            passLeadShow:false,
            leadEggThis:false,
            leadHouseThis:false,
            leadShopShowThis: false,
            leadInventoryShowThis: false,
            leadTaskShowThis: false,
            leadStrategyShowThis: false,
            leadCleanShowThis: false,
            leadFeedShowThis: false,
            leadFriendShowThis: false,
            focus:true,
            toastIndex: 1,
            isLeadShow: false,
            leadIndex: 1,
            rewewardConfigForwardDTOS:[],//邀请好友显示的道具数据
            isShowSignInvite:false,//是否显示任务列表的邀请好友
            isSHowSginAttent:false,//是否显示任务列表的关注
            isAttented:false,//是否关注了公众号
            isShowInvite:false,//是否显示邀请好友弹窗
            isSHowAttent:false,//是否显示关注弹窗
            sharetips:false,//是否显示分享引导
            totalEggs:"",//用户鸡蛋数
            avatarDefaultUrl:require("./default_avatar_img.png"),//用户头像
            avatarUrl:"",//用户头像
            userId:"" ,// 分享用到的userid
            friendid:"",//从好友列表进入好友的牧场需要携带的好友id
            friendMemberNum:0,
            nickName:"",//从好友列表进入好友的牧场需要携带的好友的昵称
            isHasUserId:false,//首页地址是否含有用户id
            checkChickenid:"",
            code:"",//登录需要的code            
            chicklist:[ ],//小鸡数据列表
            getFriendList:[],//好友列表
            chickenBaseInfoDTOList:[],//喂食列表
            gifList: {
              blist: [
                  require('./muchang/b1.gif'),
                  require('./muchang/b2.gif'),
                  require('./muchang/b3.gif'),
                  require('./muchang/b4.gif'),
                  require('./muchang/b5.gif'),
                  require('./muchang/b6.gif'),
                  require('./muchang/b7.gif')
              ],
              mlist: [
                  require('./muchang/m1.gif'),
                  require('./muchang/m2.gif'),
                  require('./muchang/m3.gif'),
                  require('./muchang/m4.gif'),
                  require('./muchang/m5.gif'),
                  require('./muchang/m6.gif'),
                  require('./muchang/m7.gif'),
                  require('./muchang/m8.gif'),
                  require('./muchang/m9.gif')
              ],
              slist: [
                  require('./muchang/s1.gif'),
                  require('./muchang/s2.gif'),
                  require('./muchang/s3.gif'),
                  require('./muchang/s4.gif'),
                  require('./muchang/s5.gif'),
                  require('./muchang/s6.gif'),
                  require('./muchang/s7.gif'),
                  require('./muchang/s8.gif'),
                  require('./muchang/s9.gif')
              ]
            },
            classList: {
            b: ['j1_1', 'j1_2', 'j1_3', 'j1_4', 'j1_5'],
            s: ['j2_1', 'j2_2', 'j2_3', 'j2_4', 'j2_5'],
            m: ['j3_1', 'j3_2', 'j3_3', 'j3_4', 'j3_5']
            },
            garbage: [
            { id: 1, img: require('./7@2x.png') },
            { id: 2, img: require('./1@2x.png') },
            { id: 3, img: require('./2@2x.png') },
            { id: 4, img: require('./3@2x.png') },
            { id: 5, img: require('./7@2x.png') },
            { id: 6, img: require('./7@2x.png') },
            { id: 7, img: require('./6@2x.png') },
            { id: 8, img: require('./7@2x.png') },
            { id: 9, img: require('./5@2x.png') },
            { id: 10, img: require('./4@2x.png') }
            ],
            infoList: ['小鸡都去生蛋了。。。', '经过你的努力，鸡舍恢复了整洁', '牧场空间有限，容不下更多小鸡了哦~']
        }
    },
    created(){   
      wu.showChickLoding();
      this.$CommFunc.commFunc("小鸡牧场"); 
      this.userId = this.$route.query.userId||"";
      this.friendid = this.$route.query.friendid||"";
      this.nickName = this.$route.query.nickName||"";

      //主人分享
      if(this.userId){
        this.addFriend(this.userId);
      }
      //主人去好友的牧场
      if(this.friendid&&this.nickName){
        this.isHasUserId=true;  //只显示喂养和打扫
        this.friendMemberNum = this.friendid;
         this.$CommFunc.commFunc(this.nickName+"的小鸡牧场"); 
      }
		
      this.isNeedUserLoginRedirect(); 
      console.log(this.$route.query.code);
    },
    mounted(){
        setInterval(()=>{
            this.getMyRangelandInfo();
        },120000);
    },
    watch: {
      '$route' (to, from) {
          if(to.fullPath!=from.fullPath){
              this.reload();
          }
      }
    },
    //离开是隐藏toast
    beforeDestroy(){
      wu.hideToast();
    },
    methods:{
        prevent(event){
          event.preventDefault();
          event.stopPropagation();
        },
        //判断是否需要登录授权
        isNeedUserLoginRedirect(){
          let UserLoginBool = this.userLoginRedirect();
          if(UserLoginBool){
            this.code=this.$route.query.code;//微信返回的code
           
            let userToken = localStorage.getItem("userToken");
            if(userToken==null){
              //偶尔微信没有返回code,就重新加载一次
              if(!this.$route.query.code){
                  localStorage.removeItem("redirect");
                  location.reload();
                  return ;
              }
              this.userLogin(this.code); 
            }else{
              this.avatarUrl = localStorage.getItem("avatarUrl");
              this.getMyRangelandInfo();
             
            }
    
          }
        },
        //登录成功,获取token
        userLogin(code){
          this.$ajax({
            method: 'get',
            url: this.$utils.DOMIN+'userLogin',
            params: {
              code:code
            }
          }).then((response) => {
              var data=response.data;
              if(data.ret == 1000){
                localStorage.setItem("userToken",data.model.token);
                this.$ajax.defaults.headers['authorization'] = data.model.token;
                //console.log("登录成功",this.$ajax.defaults.headers['authorization']);
                //缓存用户id
                localStorage.setItem("userId",data.model.userNum);
                //缓存用户头像
                localStorage.setItem("avatarUrl",data.model.avatarUrl);		  
                this.avatarUrl = data.model.avatarUrl;
                this.getMyRangelandInfo();  
                //是否是新用户登录
                if(data.model.newReg){
                  this.bgShow = true;
                  this.isLeadShow = true;  //是新用户登录就提示引导
                }
              }else{
                localStorage.removeItem("redirect");
              }
			  
          }).catch(err =>{
            localStorage.removeItem("redirect");
            console.log(err);
          })
        },
        // 获取小鸡列表
        getChickenListByMemberNum: function () {            
          let list=[];
          this.$ajax({
            method: 'get',
            url: this.$utils.DOMIN+'chickenDaily/getChickenListByMemberNum',
            params: {
              memberNum:this.friendMemberNum
            }
          }).then((response) => {
              let rps=response.data;
              if (rps.ret == 1000) {
                  rps.model.chickenBaseInfoDTOList.map((_item, _idx) => {
                    if (_item.period == 'FAIL_ILL' || _item.period == 'DIE') {

                    } else {  
                          if (_item.inHouse == false){
                                  if (rps.model.chickenBaseInfoDTOList[0].fullVal < _item.fullVal) {
                                    this.minHunger = rps.model.chickenBaseInfoDTOList[0].fullVal;
                                    this.minHungerId = rps.model.chickenBaseInfoDTOList[0].id;                                     
                                  }
                                  if ( _item.fullVal == 100) {
                                    this.MaxHunger = rps.model.chickenBaseInfoDTOList[0].fullVal;
                                    this.MaxHungerId = rps.model.chickenBaseInfoDTOList[0].id;  
                                  }
                                  if (rps.model.chickenBaseInfoDTOList[0].joyfulVal > _item.joyfulVal){
                                    this.MaxjoyfulVal = rps.model.chickenBaseInfoDTOList[0].fullVal
                                  }
                          }
                      _item.isCheckUp = false;
                      list.push(_item)
                    }
                  }) 
                  this.chickenBaseInfoDTOList = list;

              }
          }).catch(err =>{
            console.log(err);
          })    
        },
        //跳过引导
        passLead:function(){
        	this.isLeadShow =false;
        },
        //新手指引显示
        leadShowFn:function(){
          if (this.isLeadShow){
            if (this.leadIndex == 1) {
              this.leadFriendShowThis = false
              this.leadEggThis = true;
              this.passLeadShow = true;
            }
            if (this.leadIndex == 2) {
              this.leadEggThis = false;
              this.leadHouseThis = true;
            }
            if (this.leadIndex == 3) {
              this.leadHouseThis = false
              this.leadShopShowThis = true;
            }
            if (this.leadIndex == 4) {
              this.leadShopShowThis = false
              this.leadInventoryShowThis = true;
            }
            if (this.leadIndex == 5) {
              this.leadInventoryShowThis = false
              this.leadTaskShowThis = true;
            }
            if (this.leadIndex == 6) {
              this.leadTaskShowThis = false
              this.leadStrategyShowThis = true;
            }
            if (this.leadIndex == 7) {
              this.leadStrategyShowThis = false;
              this.leadCleanShowThis = true;
            }
            if (this.leadIndex == 8) {
              this.leadCleanShowThis = false;
              this.leadFeedShowThis = true;
            }
            if (this.leadIndex == 9) {
              this.leadFeedShowThis = false;
              this.leadFriendShowThis = true;
            }
            
            if(this.leadIndex > 9){
            	this.isLeadShow = false;
            }
            
            
            this.leadIndex++;
          }
        },
        // 获取牧场信息
        getMyRangelandInfo: function () {
          let that = this;
          let chickList = [],garbage = [
            { id: 1, img: require('./7@2x.png') },
            { id: 2, img: require('./1@2x.png') },
            { id: 3, img: require('./2@2x.png') },
            { id: 4, img: require('./3@2x.png') },
            { id: 5, img: require('./7@2x.png') },
            { id: 6, img: require('./7@2x.png') },
            { id: 7, img: require('./6@2x.png') },
            { id: 8, img: require('./7@2x.png') },
            { id: 9, img: require('./5@2x.png') },
            { id: 10, img: require('./4@2x.png') }
          ];
          this.$ajax({
            method: 'get',
            url: this.$utils.DOMIN+'rangelandInfo/getMyRangelandInfo',
            params: {
              friendMemberNum:this.friendMemberNum
            }
          }).then((response) => {
            let rps = response.data;
            if (rps.ret === 1000) {

              rps.model.chickInfo.map(function (_item, _idx) {
                if (_item.inHouse == false) {
                  if (_item.period == 'GROWTH') {
                    _item.gifImags = that.gifList.slist[Math.floor(Math.random() * 9)]
                  } else if (_item.period == 'HALF_GROWTH') {
                    _item.gifImags = that.gifList.mlist[Math.floor(Math.random() * 9)]
                  } else if (_item.period == 'MATURE' || _item.period == 'CURE') {
                    _item.gifImags = that.gifList.blist[Math.floor(Math.random() * 7)]
                  }
                  _item.position = that.classList.b;
                  chickList.push(_item);
                }
              })
              if (chickList.length == 0 && rps.model.type == 'DAY' && this.toastIndex == 1) {
                this.hideToastcheck =true;
                wu.showToast({
                  title: "小鸡去鸡舍了~",
                  duration: 2000
                });
                this.toastIndex++;
              }
              if (rps.model.externalCleanness >= 70 && rps.model.externalCleanness <= 90) {
                garbage.splice(3)
              } else if (rps.model.externalCleanness >= 40 && rps.model.externalCleanness <= 60) {
                garbage.splice(6)
              }
              this.externalCleanness = rps.model.externalCleanness;
              this.statusDay = rps.model.type;
              this.havingAgency = rps.model.havingAgency;
              this.chicklist = chickList;
              this.garbage = garbage;
              this.totalEggs = rps.model.totalEggs;

              wu.hideChickLoding();
              this.isSHowChickContainer = true;
            }
          }).catch(err =>{
            console.log(err);
              wu.hideChickLoding();
              this.isSHowChickContainer = true;
          });
          that.getMyInventoryFeedInfo();
          that.getChickenListByMemberNum();
        },
        // 获取吃的getMyInventoryFeedInfo
        getMyInventoryFeedInfo: function () {
           this.$ajax({
            method: 'get',
            url: this.$utils.DOMIN+'inventory/getMyInventoryFeedInfo',
            params: {
              currentPage: 1,
              pageSize: 20
            }
          }).then((response) => {
            let rps = response.data;
            if (rps.ret === 1000) {
                this.records = rps.model.records;
            }
          }).catch(err =>{
            console.log(err);
          });
        },
        //点击某一个小鸡
        feedCheckName: function (num) {
          this.checkChickenid=num;
          //是好友访问
          if(this.isHasUserId){
            this.friendFeedCheckName(num);
            return ;
          }
          this.getMyRangelandInfo();
          this.$ajax({
            method: 'get',
            url: this.$utils.DOMIN+'chickenDaily/getChickenByChickenNum',
            params: {
              friendNum: this.friendMemberNum,
              chickenNum: this.checkChickenid
            }
          }).then(response => {
            let rps = response.data;
            if (rps.ret == 1000) {              
                this.chickInfo = rps.model;
                this.feedCheckShow = !this.feedCheckShow;
                this.isCheckName = true;
            } else {
              wu.showToast({
                title: rps.msg,
                duration: 2000
              });
            }
            this.getMyInventoryFeedInfo();
            
          }).catch(err =>{
            console.log(err);
          });         
        },
        //刷新调用方法
        getLoadRefreshRangeland:function(){
          let that = this;
          let chickList = [];
          this.$ajax({
            method: 'get',
            url: this.$utils.DOMIN+'rangelandInfo/getMyRangelandInfo',
            params: {
              friendMemberNum: 0
            }
          }).then((response) => {
            let rps = response.data;
            if (rps.ret === 1000) {
              rps.model.chickInfo.map(function (_item, _idx) {
                if (_item.inHouse == false) {
                  if (_item.period == 'GROWTH') {
                    _item.gifImags = that.gifList.slist[Math.floor(Math.random() * 9)]
                  } else if (_item.period == 'HALF_GROWTH') {
                    _item.gifImags = that.gifList.mlist[Math.floor(Math.random() * 9)]
                  } else if (_item.period == 'MATURE' || _item.period == 'CURE') {
                    _item.gifImags = that.gifList.blist[Math.floor(Math.random() * 7)]
                  }
                  _item.position = that.classList.b;
                  chickList.push(_item);
                }
              })
              if (chickList.length == 0 && rps.model.type == 'DAY' && this.toastIndex == 1) {
                this.hideToastcheck = true;
                wu.showToast({
                  title: '小鸡正在鸡舍忙着生蛋呢~',
                  duration: 2000
                });
                this.toastIndex++;
              }
              this.externalCleanness = rps.model.externalCleanness;
              this.statusDay = rps.model.type;
              this.havingAgency = rps.model.havingAgency;
              this.chicklist = chickList;
            }
          }).catch(err =>{
            console.log(err);
          });
        },
        friendsShowFnClose(){
          this.friendsShow = false;  
          this.pageIndex = 1;
          this.getFriendList = [];
        },
        //好友列表
        friendsShowFn:function(){          
          this.friendsShow = true;
          this.$ajax({
            method: 'POST',
            url: this.$utils.DOMIN+'userRelation/getFriendList',
            params: {
              currentPage: this.pageIndex,
              pageSize: 20
            }
          }).then((response) => {
              let rps = response.data;
              if (rps.ret === 1000) {
                  this.getFriendList = this.getFriendList.concat(rps.model.records);
                  this.$nextTick(() => {
                    if (!this.scroll) {
                      this.scroll = new BScroll(this.$refs.wrapper, {click:true})
                      this.scroll.on('scrollEnd', (pos) => {
                        // 上拉动作
                        if(this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                            
                            //判断是否超过加载页面
                            if(this.pageIndex > Math.ceil(rps.model.totalCount/20)){
                                // wu.showToast({
                                //   title: '没有更多好友了~',
                                //   duration: 2000
                                // });
                                return ;
                            }else{
                                this.pageIndex++; 
                                this.friendsShowFn();
                            }                  

                        }
                      })
                    } 
                    else {
                        this.scroll.refresh()
                    }
                });
              }
            }).catch(err =>{
              console.log(err);
            });   
            
        },        
        //列表喂点击
        feedShowFun(event){
          // this.chickInfo = this.chicklist[0];//新增,当点击喂养菜单,默认把第一条小鸡信息保存到chickInfo
          this.getMyInventoryFeedInfo();
          this.chickenBaseInfoDTOList.length == 1 && this.chickenBaseInfoDTOList.map((_d, _index) => {
            if (_index == 0) {
              _d.isCheckUp = true;
            } else {
              _d.isCheckUp = false;
            }

          });
          this.feedShow = !this.feedShow;
          this.chickenBaseInfoDTOList = this.chickenBaseInfoDTOList;
          this.checkChickenid = '';
          // this.checkChicken(event,0,this.chickInfo.num);  //此处需要更改
        },
        // 选中小鸡列表某项
        checkChicken(event,index,num){
          
          event.preventDefault();
          event.stopPropagation();
          let _idx = index ;
          let _id = num;
          // debugger
          if (_idx!=undefined&&_id) {
            this.chickenBaseInfoDTOList.map((_d, _index) => {
              _d.isCheckUp = false;
            });
            this.chickenBaseInfoDTOList[_idx].isCheckUp = true;

          } else {
            this.chickenBaseInfoDTOList.map((_d, _index) => {
              if (_d.isCheckUp == true) {
                _id = _d.num;
                _idx = _index;

              }
            });
          }
          this.checkChickenid = _id;

        },
        // 喂养某个小鸡or列表小鸡
        upCheckChicken(myid){          
          let inventoryId = myid;
          if(this.isHasUserId){
            this.friendUpCheckChicken(inventoryId);
            return ;
          }

          if (this.feedCheckShow) {
            if (this.checkChickenid) {
              this.$ajax({
                method: 'post',
                url: this.$utils.DOMIN+'chicken/ownerFeed',
                params: {
                  num: this.checkChickenid,
                  inventoryId: inventoryId
                }
            }).then(response => {
                let rps = response.data;
                if (rps.ret == 1000) {
                  wu.showToast({
                    title: '成功!',
                    duration: 2000
                  });
                  this.records.map((_i, _idx) => {
                    if (_i.id === inventoryId) {
                      this.chickenBaseInfoDTOList.map((t, i) => {
                        if (this.checkChickenid === t.num) {
                          t.fullVal = rps.model.fullVal;
                          t.growthVal = rps.model.growthVal;
                          t.joyfulVal = rps.model.joyfulVal;
                        }
                      })
                      _i.quantity = _i.quantity == 0 ? 0 : _i.quantity - 1;
                      this.chickInfo.fullVal = rps.model.fullVal;
                      this.chickInfo.growthVal = rps.model.growthVal;
                      this.chickInfo.joyfulVal = rps.model.joyfulVal;
                    }
                  });                 
                
                  setTimeout(() => {
                      this.records = this.records;
                      this.chickInfo = this.chickInfo;
                      this.chickenBaseInfoDTOList = this.chickenBaseInfoDTOList;
                  }, 200)
                } else {
                  wu.showToast({
                    title: rps.msg,
                    duration: 2000
                  });
                }
                this.getMyRangelandInfo();
              }).catch(err =>{
                console.log(err);
              });
            } else {
              wu.showToast({
                title: '请选择要喂养的小鸡！',
                duration: 2000
              });
            }
          } else {
            // debugger
            if (this.checkChickenid) {

              this.$ajax({
                  method: 'post',
                  url: this.$utils.DOMIN+'chicken/ownerFeed',
                  params: {
                    num: this.checkChickenid,
                    inventoryId: inventoryId
                  }
              }).then(response => {
                let rps = response.data;
                if (rps.ret == 1000) {
                  wu.showToast({
                    title: '成功！',
                    duration: 2000
                  });
                  this.records.map((_i, _idx) => {
                    if (_i.id === inventoryId) {
                      this.chickInfo.fullVal = rps.model.fullVal;
                      this.chickInfo.growthVal = rps.model.growthVal;
                      this.chickInfo.joyfulVal = rps.model.joyfulVal;
                      _i.quantity = _i.quantity == 0 ? 0 : _i.quantity - 1;
                    }
                  });
                  setTimeout(() => {
                      this.records = this.records;
                      this.chickInfo = this.chickInfo;
                  }, 200)
                } else {
                  wu.showToast({
                    title: rps.msg,
                    duration: 2000
                  });        
                }
                this.getMyRangelandInfo();
              }).catch(err =>{
                console.log(err);
              });
            }else {
              wu.showToast({
                title: "请选择要喂养的小鸡！",
                duration: 2000
              });     
            }
          }           
              
          
        },
        // 修改名称
        bindInputValue: function () {
          if (this.chickName) {
            this.$ajax({
                method: 'PUT',
                url: this.$utils.DOMIN+'chicken/updateChickenName',
                params: {
                  num: this.chickInfo.num,
                  name: this.chickName
                }
            }).then((response) => {
              let rps = response.data;
              if (rps.ret === 1000) {
                this.chickInfo.name = this.chickName;
                this.chickInfo = this.chickInfo;
                this.chickName = '';
                this.isCheckName = !this.isCheckName; 
                wu.showToast({
                  title: "修改成功！",
                  duration: 2000
                });         
              }
            }).catch(err =>{
              console.log(err);
            });
          } else {
            wu.showToast({
              title: "小鸡昵称不能为空!",
              duration: 2000
            });    
          }
        },
        //关闭单个小鸡 
        closeChienk(){
          this.feedCheckShow = !this.feedCheckShow;
        },
        // 打扫
        isClearfun: function () {
          if(this.isHasUserId){
            this.isFriendClearfun();
            return ;
          }
          let externalCleanness = this.externalCleanness;
          if (externalCleanness==100){
            // wu.showToast({
            //   title: "牧场已经十分整洁，不用打扫啦~",
            //   duration: 2000
            // });    
            return;
          }
          this.isClean = !this.isClean;
          this.externalCleanness = 100;
          // 接口定义这样传，我也很绝望
          this.$ajax({
                method: 'PUT',
                url: this.$utils.DOMIN+'rangelandInfo/ownerSweep?typeEnum=EXTERNAL'
            }).then(response => {
              let rps = response.data;
              if (rps.ret === 1000) {
                setTimeout(() => {
                  wu.showToast({
                    title: "经过你的努力，牧场恢复了整洁",
                    duration: 2000
                  });   
                  this.isClean = !this.isClean;
                  this.bgToast = false;
                }, 2000)
              }
            }).catch(err =>{
              console.log(err);
            });

        },
        //显示修改名称弹窗
        changeName: function (event,num) {  
          event.preventDefault();
          event.stopPropagation(); 
          //禁止好友点击改名  
          if(this.isHasUserId){
            return ;
          }  
          this.Modal_box = true;
          this.changeNameBool=true;
          this.chickInfoNum = num;
          this.focus = true;

        },
        bgShowFn(){
          this.bgShow = false;
        },
        hideModal_meng:function(){
          this.Modal_box = false;
          this.changeNameBool = false;
        },
        // 添加好友
        addFriend: function (userid) {
          let locUserId = localStorage.getItem("userId");
          if (userid&&userid != locUserId) {
            this.$ajax({
              method: 'POST',
              url: this.$utils.DOMIN+'userRelation/addFriend',
              params: {
                friendNum:userid
              }
          }).then(response => {
                let rps = response.data;
                if (rps.ret === 1000) {
                    console.log('加好友成功了') 
                }else{
                  console.log(rps.msg);
                }
          }).catch(err =>{
            console.log(err);
          });            
          }
        },
        //分享邀请好友
        share(event){
          event.preventDefault();
          event.stopPropagation();
          this.sharetips = true;
        },
        //邀请好友弹窗 val 1 点击邀请,2点击关闭
        model_chickFriendInvite(val){
          if(val==1){
            this.sharetips = true;


            let shareUrl = location.origin+location.pathname+"#/?userId="+localStorage.getItem("userId");
            let shareImgUrl = location.origin+location.pathname+"chick.png";
            let shareFriendDesc = "你的好友正在小鸡牧场向你求助！快来帮ta喂养小鸡吧~";
            let shareFriendTitle = '你的好友正在小鸡牧场向你求助！快来帮ta喂养小鸡吧~';
            wx.onMenuShareAppMessage({
                title: shareFriendTitle,
                desc: shareFriendDesc,
                link: shareUrl,
                imgUrl: shareImgUrl,
                success: function (res) {
                    alert("success");
                },
                cancel: function (res) {
                  // alert("cancel");
                },
                fail: function (res) {
                  // alert("fail");
                }
            });

          }else if(val==2){
            this.isShowInvite = !this.isShowInvite;
            this.sharetips = false;
          }
          

          
        },
        //隐藏分享指引
        hideSharetips(){
          this.sharetips = false;
        },
        // 跳转好友
        gotoFriends: function (event,friendNum,nickName) {
          this.$router.push({path:"/",query:{friendid:friendNum,nickName:nickName}});
          event.preventDefault();
          event.stopPropagation();
        },
        //首页金蛋弹窗接受通知
        model_chickChangeRed(){
          this.indexEggModalShow=!this.indexEggModalShow;
        },
        //任务
        chickSign(){      
          let _self =this;    
          this.$ajax({
              method: 'get',
              url: this.$utils.DOMIN+'taskRewards/getTaskList'
          }).then(response => {
                let rps = response.data;
                if (rps.ret === 1000) {
                  // isShowSignInvite:false,//是否显示任务列表的邀请好友
                  // isSHowSginAttent:false,//是否显示任务列表的关注
                   rps.model.taskDTOList.forEach(element => {
                     if(element.taskRewardsTypeEnum == "ATTENTION"&&element.finish){
                        _self.isSHowSginAttent=false; 
                     }else{
                       _self.isSHowSginAttent=true; 
                     }

                     if(element.taskRewardsTypeEnum == "INVITE"&&element.finish){
                       _self.isShowSignInvite =false;
                     }else{
                       _self.isShowSignInvite =true;
                     }
                   });

                   this.chickSignShow =true;                  

                }else{
                  console.log(rps.msg);
                }
          }).catch(err =>{
            console.log(err);
          });            
        },
        //首页任务弹窗接受通知 val 2,显示邀请弹窗,3显示关注弹窗
        model_chickTask(val){
          console.log("val",val);
          if(val==2){
            
            this.$ajax({
                method: 'get',
                url: this.$utils.DOMIN+'taskRewards/getRewardsConfig',
                params:{
                  typeEnum:"INVITE"
                }
            }).then(response => {
                  let rps = response.data;
                  if (rps.ret === 1000) {    
                    this.isShowInvite = true;            
                    this.rewewardConfigForwardDTOS = rps.model.rewewardConfigForwardDTOS;
                  }else{
                    console.log(rps.msg);
                  }
            }).catch(err =>{
              console.log(err);
            });       

          }else if(val==3){
            this.$ajax({
                method: 'get',
                url: this.$utils.DOMIN+'taskRewards/getRewardsConfig',
                params:{
                  typeEnum:"INVITE"
                }
            }).then(response => {
                  let rps = response.data;
                  if (rps.ret === 1000) {    
                    this.isSHowAttent = true;          

                  }else{
                    console.log(rps.msg);
                  }
            }).catch(err =>{
              console.log(err);
            });       

          }else{
            this.chickSignShow=!this.chickSignShow;
          }
        },
        //关闭关注弹窗
        model_chickAttent(){
          this.isSHowAttent = !this.isSHowAttent;
        },
        //修改小鸡名称
        changeNamefinish: function () {
            var that = this;    
            if (this.chickNameNew.trim().length > 0) {
              this.$ajax({
                method: 'PUT',
                url: this.$utils.DOMIN+'chicken/updateChickenName',
                params: {
                  num: that.chickInfoNum, 
                  name: that.chickNameNew 
                }
              }).then((response) => {
                let rps = response.data;
                if (rps.ret === 1000) {
                    this.chickInfo.name = this.chickNameNew;
                    this.chickInfo = this.chickInfo;
                    this.chickNameNew = '';
                    this.Modal_box = false;
                    this.changeNameBool = false;
                    wu.showToast({
                      title: "修改成功!",
                      duration: 2000
                    });  
                }
                that.getChickenListByMemberNum();
                that.getMyRangelandInfo();
              })
            } else {
              this.chickNameNew = '';
              wu.showToast({
                title: "小鸡昵称不能为空!",
                duration: 2000
              });  
            }

        },
        //好友功能部分

        //好友打扫
        isFriendClearfun: function () {
          if (this.externalCleanness >= 100) {
            // wu.showToast({
            //   title: "牧场已经十分整洁，不用打扫啦~!",
            //   duration: 2000
            // });
            return ;  
          }
          this.isClean = !this.isClean;
          // 接口定义这样传，我也很绝望

          this.$ajax({
            method: 'PUT',
            url: this.$utils.DOMIN+'rangelandInfo/friendSweep',
            params: {
              sweepMemberNum: this.friendMemberNum
            }
          }).then(response => {
            let rps = response.data;
            if (rps.ret == 1000) {
              setTimeout(() => {
                this.isClean = !this.isClean,
                this.externalCleanness = this.externalCleanness = 100 ;
                if (rps.model.giveFlag){
                  wu.showToast({
                    title: '打扫成功，获得奖励：' + rps.model.giveFoodsName + "x" + rps.model.giveFoodsCount,
                    duration: 2000
                  });  
                }else{
                  wu.showToast({
                    title: '打扫成功',
                    duration: 2000
                  });  
                }
              }, 2000)
            } else {
              wu.showToast({
                title: rps.msg,
                duration: 2000
              });  
              this. isClean = !this.isClean;
            }
          })
        },
        //根据小鸡编号查询小鸡信息
        friendFeedCheckName: function (num) {
          var that = this;
          that.getMyRangelandInfo();
          this.getMyInventoryFeedInfo();
          // let id = event.currentTarget.dataset.myInfo.num;
          this.$ajax({
            method: 'GET',
            url: this.$utils.DOMIN+'chickenDaily/getChickenByChickenNum',
            params: {
                friendNum:this.friendMemberNum,
                chickenNum:this.checkChickenid
            }
          }).then(response => {
            let rps = response.data;
            if (rps.ret == 1000) {
              this.chickInfo = rps.model,
              this.feedCheckShow = !this.feedCheckShow;
            } else {
              wu.showToast({
                title: rps.msg,
                duration: 2000
              });  
            }
          })
        },
        // 好友喂养喂养某个小鸡
        friendUpCheckChicken: function (myid) {
          let inventoryId = myid;
          if (this.feedCheckShow) {
            if (this.checkChickenid) {
            this.$ajax({
              method: 'POST',
              url: this.$utils.DOMIN+'chicken/friendFeed',
              params: {
                  num:this.checkChickenid,       
                  inventoryId: inventoryId,
                  friendNum:this.friendMemberNum
              }
            }).then(response => {
                let rps = response.data;
                if (rps.ret == 1000) {                  
                  if (rps.model.giveFlag) {
                    wu.showToast({
                      title: '喂食成功，获得奖励：' + rps.model.giveFoodsName + "x" + rps.model.giveFoodsCount,
                      duration: 2000
                    });  
                  } else {
                    wu.showToast({
                      title: '好友:喂食成功',
                      duration: 2000
                    });  
                  }
                  this.records.map((_i, _idx) => {
                    if (_i.id === inventoryId) {
                      this.chickenBaseInfoDTOList.map((t, i) => {
                        if (this.checkChickenid === t.num) {
                          t.fullVal = rps.model.fullVal;
                          t.growthVal = rps.model.growthVal;
                          t.joyfulVal = rps.model.joyfulVal;
                        }
                      })
                      _i.quantity = _i.quantity == 0 ? 0 : _i.quantity - 1;
                    }
                  });
                  setTimeout(() => {
                    this.records = this.records;
                    this.chickenBaseInfoDTOList = this.chickenBaseInfoDTOList;
                  }, 200)
                } else {
                  wu.showToast({
                    title: rps.msg,
                    duration: 2000
                  });  
                }
              })
            } else {
              wu.showToast({
                title: "请选择要喂养的小鸡！",
                duration: 2000
              });  
            }
          } else {
            if (this.checkChickenid) {
              this.$ajax({
              method: 'POST',
              url: this.$utils.DOMIN+'chicken/friendFeed',
              params: {
                  num:this.checkChickenid,       
                  inventoryId: inventoryId,
                  friendNum:this.friendMemberNum
              }
            }).then(response => {
                let rps = response.data;
                if (rps.ret == 1000) {
                  if (rps.model.giveFlag) {
                    wu.showToast({
                      title: '喂食成功，获得奖励：' + rps.model.giveFoodsName + "x" + rps.model.giveFoodsCount,
                      duration: 2000
                    });  
                  } else {
                    wu.showToast({
                      title: '喂食成功',
                      duration: 2000
                    });  
                  }
                  this.records.map((_i, _idx) => {
                    if (_i.id === inventoryId) {
                      this.chickenBaseInfoDTOList.map((t, i) => {
                        if (this.chickInfo.num === t.num) {
                          this.chickInfo.fullVal = rps.model.fullVal;
                          this.chickInfo.growthVal = rps.model.growthVal;
                          this.chickInfo.joyfulVal = rps.model.joyfulVal;
                          _i.quantity = _i.quantity == 0 ? 0 : _i.quantity - 1;
                        }

                      });
                    }
                  });
                  setTimeout(() => {
                    this.records = this.records;
                    this.chickInfo = this.chickInfo;
                    this.chickenBaseInfoDTOList = this.chickenBaseInfoDTOList;
                  }, 200)
                } else {
                  wu.showToast({
                    title: rps.msg,
                    duration: 2000
                  });  
                }
              })
            }
          }
          var that = this;
          that.getMyRangelandInfo();

        },
    },
    components:{
      IndexEggModal:resolve => {require(['../plugin/indexEggModal/indexEggModal.vue'], resolve)},//懒加载
      IndexTaskModal:resolve => {require(['../plugin/indexTaskModal/indexTaskModal.vue'], resolve)},
      indexInviteFriend:resolve => {require(['../plugin/indexInviteFriend/indexInviteFriend.vue'], resolve)},
      indexAttention:resolve => {require(['../plugin/indexAttention/indexAttention.vue'], resolve)}
    }
}
</script>
<style>
.loading {
    padding-left: 14px;
}
.navigator{
  height:auto;
  width:auto;
  position: relative;
  display:block;
  margin-bottom: 0.15rem;
}
.share-tips{
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 20;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.share-tips img{
  width: 100%;
  height: auto;
}
.chick-container{
  width: 100vw;
  height: 100vh;
  overflow: hidden
}
.scroll-x{
  display:block;
  width:100%;
}
.scroll-view-y{
  width: 100vw;
  height:2.92rem;
  overflow-y: scroll; 
} 
.myView {
  width: 100vw;
  height: 100vh;
  background-image:url(./rejection_pasture_bg@2x.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.myViewCurImg{
  background-image:url(./Pasture_bg.png);
}
.container {
  height: 100%;
  display: flex;
  box-sizing: border-box;
  z-index: 1;
}

.container .my_conents {
  position: absolute;
  bottom: 0.15rem;
  height: 2.58rem;
  left: 0;
  right: 0;
}

.night_info {
  opacity: 0.8;
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #fff;
  margin-top: 0.65rem;
  text-align: center;
}

.container .conents_chenken_list {
  position: relative;
  height: 2.55rem;
}

.my_title {
  width: 0.45rem;
  position: absolute;
  bottom: 0.15rem;
  left: 0.175rem;
  z-index: 10;
}

.my_friends {
  width: 0.45rem;
  height: 0.65rem;
}
.my_egg_box{
  min-width: 1rem;
  height: 0.4rem;  
  position: absolute;
  left: 0.175rem;
  top: 0.175rem;
  background:rgba(255, 255, 255, 0.2);
  border-radius: 0.4rem;
  display: -webkit-box;
  -webkit-box-align: center;
  padding-right: 5px;
}
.my_egg_box .headImg{
  width: 0.4rem;
  height: 0.4rem;
  border-radius:0.4rem;
  /* position: absolute;
  left: 0;
  top: 0; */
  border: 2px solid #FFFFFF;
}
.my_egg_box .headImg img{
  width: 100%;
  height: 100%;
  border-radius:50%; 
  
}
.my_egg_box .golden_egg_img{
  /* position: absolute;
  top: 0.08rem;
  left: 0.5rem; */
  width: 0.19rem;
  height: 0.25rem;
  margin-left: 8px;
}
.my_egg_box .eggs_count{
  /* width: 0.62rem; */
  height: 0.21rem;
  /* position: absolute;
  top: 0.095rem;
  left: 0.75rem; */
  display: block;
  -webkit-box-flex: 1;
  line-height: 0.21rem;
  font-size: 0.15rem;
  color: #FFFFFF;
  text-align: center;
  margin: 0 5px;
}
.my_info {
  position: absolute;
  right: 0.175rem;
  top: 0.175rem;
  display: flex;
  flex-direction: column;
  width: 0.4rem;
  z-index: 10;
}

.my_shop, .my_warehouse, .my_task, .my_strategy, .my_restocking{
  width: 0.4rem;
  height: 0.58rem;
  z-index: 9;
}

.my_clean,.my_feed {
  margin-left: 0.17rem; 
  width: 0.45rem; 
  height: 0.65rem;
  max-width: initial;
}

.my_restocking {
   margin-right: 0.17rem; 
}

.my_bottom {
  position: absolute;
  bottom: 0.15rem;
  right: 0.175rem;
  z-index: 10;
}
.my_bottom a{
  display: inline-block;
}
.my_bottom .my_progress {
  position: absolute;
  background: #7D4500;
  width: 0.45rem;
  height: 15px;
  border:2px solid #fff;
  border-radius: 10px;
  right:1px; 
  bottom: 0.15rem;
  z-index: 1
}
.my_bottom .my_progress .progress{
  height: 11px;
  background: #FF5526;
  position: absolute;
  top: 0;
  left: 0;
}
.my_bottom .my_progress .progress-active{
  background: #00ACE1;
}
.my_bottom .my_progress .cleanText {
    display: flex;
    align-content: flex-end;
    font-size: 11px;
    color: #fff;
    text-align: right;
    /* bottom: -0.02rem; */
    position: absolute;
    z-index: 9999;
    /* padding-left: 0.01rem; */
    /* padding-bottom: 0.005rem; */
    right: 4px;
    height: 11px;
    line-height: 11px;
}

/*好友  */

.friends_container {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.feed_index_list_container {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
}
.friends_content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4.09rem;
  background: #fff;
  z-index: 100;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  /* animation: friend 1s; */
}

.friends_title_img {
  width: 0.91rem;
  height: 0.91rem;
  position: absolute;
  top: -0.455rem;
  left: 1.46rem;
  margin: 0 auto;
}

.friends_footer_btn {
  background: #fff;
  width: 100%;
  height: 0.64rem;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  text-align: center;
  box-shadow: 1px 0 4px #f2f2f2;
}

.friends_footer_btn  .friends_footer_btn_share {
  width: 0.7rem;
  height: 0.32rem;
  color: #fff;
  background: #ff575f;
  border-radius: 0.32rem;
  font-size: 0.16rem;
  line-height: 0.332rem;
  border:0;
}

.no_friendlist {
  height: 2.5rem;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  color: #999;
}

.no_friendlist text {
  align-content: center;
  align-items: center;
}

.friends_content_friends {
  font-size: 0.14rem;
  padding-top: 0.265rem;
  color: #444;
  padding-left: 0.205rem;
  padding-bottom: 0.11rem;
  font-weight: bold;
  border-bottom: 0.5px solid #f2f2f2;
}

.item_content {
  display: flex;
  flex-direction: row;
  flex: 1 0 auto;
  height: 0.675rem;
  align-items: center;
  border-bottom: 0.5px solid #f2f2f2;
  justify-content: center;
  line-height:50%;

}

.item_content_info {
  width: 1.745rem;
  font-size: 0.15rem;
  color: #444;
  border: #fff;
  font-weight: bold;
}

.item_conent_egg {
  flex-direction: column;
  display: flex;
  width: 0.28rem;
  margin-right: 0.155rem;
  justify-content: center;
  align-items: center;
}

.item_conent_egg img {
  width: 0.23rem;
  height: 0.27rem;
}

.item_conent_egg .text {
  color: #ff7702;
  font-size: 0.13rem;
  padding-top:4px;

}

.item_content_icon img {
  width: 0.25rem;
  height: 0.25rem;
  margin-left: 0.25rem;
  margin-right: 0.15rem;
}

.item_content_title_img img {
  width: 0.44rem;
  height: 0.44rem;
  margin-right: 0.17rem;
  border-radius: 0.44rem;
}

.item_content_footer img {
  margin-right: 0.125rem;
  width: 0.08rem;
  height: 0.14rem;
}

/*喂养  */

.feed_item {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  width: 3.45rem;
  height: 1.56rem;
  overflow: hidden;
  background: #FFFAEC;
  margin: 0 auto;
  margin-top: 0.15rem;
  border-radius: 0.1rem;
  align-items: center;
  border:4px solid #fecc00;
  box-shadow: 0 2px 4px 0 rgba(150,79,50,0.40);
}
.feed_item_info_li{display:flex;flex-direction: row;justify-content: space-between;align-items: center; width: 100%;margin-top:0.05rem;
}
/* .feed_item:last-child {
  margin-bottom: 0.2rem;
} */

.feed_item_footer {
  height: 2.98rem;
  width: 100vw;
  border-radius: 0.1rem 0.1rem 0 0;
  box-shadow: 0 -2px 4px 0 rgba(17,67,59,0.11);
  position: absolute;
  background: #fff;
  z-index: 15;
  left: 0;
  bottom:0;
}
.morefeed{padding: 0.1rem 0 0.15rem 0;font-size: 0.12rem;color: #444444;width: 100%;text-align: center;display: inline-block}
.feed_item_footer_height {
 
  height: 45vh;
  position: relative;
  background: #fff;
  min-height: 1.86rem;
}

.feed_item_footer_item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
}

.feed_item_footer_close  image {
  width: 0.21rem;
  height: 0.21rem;
  color: #fff;
  position: absolute;
  top: 0.15rem;
  right: 0.15rem;
  text-align: center;
  border-radius: 0.2rem;
  line-height: 0.2rem;
  padding: 0.025rem;
}

.feed_item_img_L img {
  width: 100%;
  height: 100%;
  
}
.feed_item_img_M img {
  width: 100%;
  height: 100%;
 
}
.feed_item_img_S img {
  width: 100%;
  height: 100%;
}

.feed_item_info {
  flex-direction: column;
  width: 1.87rem;
  margin-right: 0.3rem;
  margin-left: 0.085rem
}
.feed_item_img_L{margin-left: 0.09rem}
.feed_item_img_M{margin-left: 0.2rem}
.feed_item_img_S{margin-left: 0.25rem}

.feed_item_name {
  color: #964F32;
  font-size: 0.18rem;
  padding-top: 0.05rem;
  font-weight: bold;
}
.feed_item_name-active{
  color: #964F32;
}

.feed_item_info > div {
 font-size: 0.12rem;
  color:#964F32;
  border-bottom:0.005rem solid #FDE9D0;
  padding-top: 0.045rem; padding-bottom: 0.05rem;
}
.fend_happy{}
.feed_item_info > div:last-child{border-bottom: none}
.feed_item_last {
  display: flex;
  flex-direction: column;
  align-items: left;
  align-content: center;
  position: relative;
  padding-top: 0.045rem; padding-bottom: 0.05rem;
}

.feed_item_last_one {
  margin-right: 0.075rem;
  padding-bottom: 0;
}

.feed_item_last_two {
  padding-bottom: 0;
  width: 1.9rem;
  background:#F7B279;
}
.feed_item_last_two .feed_item-progress{
  background: #FFDD00;
  height: 0.1rem;
}

.feed_item_last_value {
  position: absolute;
  right: 0;
  top: 0;
  width: 0.3rem;
  text-align: center;
}

.progress {
  border-radius: 10px;
  overflow: hidden;
}

/*单独喂养小鸡  */

.feed_check_item {
  border-right: 2xp solid #ddd;
  position: relative;
  width: 1.85rem;
  height: 100%;
}

.feed_check_item:first-child {
  flex-direction: column;
}

.feed_check_item:last-child {
  min-height: 1.86rem;
  border-left: 1px solid #eee;
}

.feed_check_item_img {
  padding-top: 0.07rem;
}

.feed_check_item_img image {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: -0.2rem;
  left: 0.75rem;
}

.feed_check_item_info_item_img {
  border: 1px solid #ddd;
  width: 10.6rem;
  height: 0.6rem;
  line-height: 0.6rem;
  border-radius: 0.05rem;
}

.feed_check_item_info_item_img .kong {
  border: 1px solid #ddd;
  border-radius: 0.05rem;
  color: #eee;
  text-align: center;
}

.feed_nodata_three navigator {
  font-size: 0.14rem;
  padding-top: 0.025rem;
}

.feed_check_item_img text {
  color: #444;
  font-size: 0.16rem;
  padding-left: 0.2rem;
}

.feed_check_item_name {
  font-size: 0.15rem;
  padding-left: 0.2rem;
  padding-top: 0.23rem;
  color: #999;
}

.feed_check_item_name_last {
  padding-left: 0.2rem;
  color: #666;
  font-size: 0.16rem;
  padding-top: 0.11rem;
  height: 0.15rem;
}

.feed_check_item_name_last input {
  border: 1px solid #ddd;
  border-radius: 0.05rem;
  width: 1.38rem;
}

.feed_check_item_btn {
  text-align: center;
  padding-top: 0.24rem;
}

.feed_check_item_btn text {
  color: #fff;
  background: #ff575f;
  border-radius: 0.16rem;
  font-size: 0.16rem;
  padding: 0.04rem 0.175rem;
}

.scroll_records_item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.feed_check_item_info {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.2rem 0 0 0.1rem;
  justify-content: space-between;
  align-items: center;
}

.feed_check_item_info_item {
  width: 0.79rem;
  text-align: center;
  display: flex;
  padding: 0 0.03rem 0.15rem 0.03rem; 
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.feed_check_item_info_item image {
  width: 0.6rem;
  height: 0.6rem;
}

.feed_check_item_info_item .name {
  font-size: 0.15rem;
  color: #444;
  padding-top: 0.1rem;
}

.feed_check_item_info_item .buff {
  font-size: 0.12rem;
  color: #999;
}

.feed_item_Chicken {
  min-height: 4.15rem;
  position: relative;
  align-items: flex-end;
  display: flex;
  justify-content: center;
}

.feed_item_Chicken::before {
  clear: both;
}

.feed_item_Chicken img {
  width: 1.38rem;
  height: 1.66rem;
}

.feed_item_Chicken .pleasure {
  width: 0.62rem;
  height: 0.7rem;
  position: absolute;
  top: 20%;
  left: 20%;
}

.feed_item_Chicken .satiety {
  width: 0.62rem;
  height: 0.7rem;
  position: absolute;
  left: 9.5%;
  top: 70%;
}

.feed_item_Chicken .growth {
  width: 0.62rem;
  height: 0.7rem;
  position: absolute;
  right: 9.9%;
  top: 68%;
}

.feed_item_Chicken .pleasure img, .satiety image, .growth img {
  width: 0.62rem;
  height: 0.7rem;
  position: relative;
}

.feed_item_Chicken .pleasure .text {
  position: absolute;
  top: 0;
  font-weight: bold;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 40%;
  margin: auto;
  text-align: center;
  color: #fff;
  font-size: 0.11rem;
}

.feed_item_Chicken .satiety .text, .feed_item_Chicken .growth .text {
  position: absolute;
  top: 0;
  font-weight: bold;
  left: 0;
  bottom: 0;
  right: 0;
  width: 50%;
  height: 30%;
  text-align: center;
  color: #fff;
  font-size: 0.11rem;
  line-height: 0.175rem;
  margin: auto;
}

.scroll_item_tolist {
    width: 100%;
    height: 55.6vh;
    position: relative;
    z-index: 11;
    overflow-y: scroll;
    padding-bottom: 0.555rem;
}

/*1111  */

.feed_item_Chicken1::before {
  clear: both;
}

.feed_item_Chicken1 {
  height: 55vh;
  position: relative;
  align-items: flex-end;
  display: flex;
  justify-content: center;
}

.feed_item_Chicken1 img {
  width: 1.38rem;
  height: 1.66rem;
}

.feed_item_Chicken1 .pleasure {
  width: 0.62rem;
  height: 0.7rem;
  position: absolute;
  top: 1.81rem;
  left: 0.88rem;
}

.feed_item_Chicken1 .satiety {
  width: 0.62rem;
  height: 0.7rem;
  position: absolute;
  left: 0.37rem;
  top: 3.3rem;
}

.input_box_big, .input_box_small {
  position: absolute;
  top: 1.81rem;
  right: 0.75rem;
}

.feed_item_Chicken1 .growth {
  width: 0.61rem;
  height: 0.7rem;
  position: absolute;
  top: 3.17rem;
  right: 0.37rem;
}

.feed_item_Chicken1 .pleasure image, .satiety image, .growth img {
  width: 0.62rem;
  height: 0.7rem;
  position: relative;
}

.feed_item_Chicken1 .pleasure .text {
  position: absolute;
  top: 0;
  font-weight: bold;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 40%;
  margin: auto;
  text-align: center;
  color: #fff;
  font-size: 0.11rem;
}

.feed_item_Chicken1 .satiety text, .feed_item_Chicken1 .growth .text {
  position: absolute;
  top: 0;
  font-weight: bold;
  left: 0;
  bottom: 0;
  right: 0;
  width: 50%;
  height: 30%;
  text-align: center;
  color: #fff;
  font-size: 0.11rem;
  line-height: 0.175rem;
  margin: auto;
}

/*2222  */

.feed_item_Chicken2::before {
  clear: both;
}

.feed_item_Chicken2 {
  height: 55vh;
  position: relative;
  align-items: flex-end;
  display: flex;
  justify-content: center;
}

.feed_item_Chicken2 img {
  width: 1.38rem;
  height: 1.66rem;
  margin-bottom: 0.635rem;
}

.feed_item_Chicken2 .pleasure {
  width: 0.62rem;
  height: 0.7rem;
  position: absolute;
  top: 0.5rem;
  left: 0.88rem;
}

.feed_item_Chicken2 .satiety {
  width: 0.62rem;
  height: 0.7rem;
  position: absolute;
  left: 0.37rem;
  top: 1.99rem;
}

.feed_item_Chicken2 .input_box_small {
  position: absolute;
  right: 0.76rem;
  top: 0.51rem;
}

.input_box_big, .input_box_small {
  position: absolute;
  top: 1.31rem;
  right: 0.75rem;
}

.feed_item_Chicken2 .growth {
  width: 0.62rem;
  height: 0.7rem;
  position: absolute;
  top: 1.36rem;
  right: 0.37rem;
}

.feed_item_Chicken2 .pleasure image, .satiety image, .growth img {
  width: 0.62rem;
  height: 0.7rem;
  position: relative;
}

.feed_item_Chicken2 .pleasure .text {
  position: absolute;
  top: 0;
  font-weight: bold;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 40%;
  margin: auto;
  text-align: center;
  color: #fff;
  font-size: 0.12rem;
}

.feed_item_Chicken2 .satiety text, .feed_item_Chicken2 .growth .text {
  position: absolute;
  top: 0;
  font-weight: bold;
  left: 0;
  bottom: 0;
  right: 0;
  width: 50%;
  height: 30%;
  text-align: center;
  color: #fff;
  font-size: 0.12rem;
  line-height: 0.175rem;
  margin: auto;
}

/*3333  */

.feed_item_Chicken3::before {
  clear: both;
}

.feed_item_Chicken3 {
  height: 55vh;
  position: relative;
  align-items: flex-end;
  display: flex;
  justify-content: center;
}

.feed_item_Chicken3 img {
  width: 1.38rem;
  height: 1.66rem;
}

.feed_item_Chicken3 .pleasure {
  width: 0.62rem;
  height: 0.7rem;
  position: absolute;
  bottom: 1.74rem;
  left: 0.6rem;
}

.feed_item_Chicken3 .satiety {
  width: 0.62rem;
  height: 0.7rem;
  position: absolute;
  left: 0.25rem;
  bottom: 0.82rem;
}

.feed_item_Chicken3 .input_box_small {
  position: absolute;
  right: 0.75rem;
  top: 1rem;
}

.feed_item_Chicken3 .growth {
  width: 0.62rem;
  height: 0.7rem;
  position: absolute;
  bottom: 0.82rem;
  right: 0.25rem;
}

.feed_item_Chicken3 .pleasure img, .satiety img, .growth img {
  width: 0.62rem;
  height: 0.7rem;
  position: relative;
}

.feed_item_Chicken3 .pleasure .text {
  position: absolute;
  top: 0;
  font-weight: bold;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 40%;
  margin: auto;
  text-align: center;
  color: #fff;
  font-size: 0.11rem;
}

.feed_item_Chicken3 .satiety .text, .feed_item_Chicken3 .growth .text {
  position: absolute;
  top: 0;
  font-weight: bold;
  left: 0;
  bottom: 0;
  right: 0;
  width: 50%;
  height: 30%;
  text-align: center;
  color: #fff;
  font-size: 0.11rem;
  line-height: 0.175rem;
  margin: auto;
}

/*end   */

.input_box_big img {
  width: 0.99rem;
  height: 0.47rem;
}

.input_box_small img {
  width: 0.51rem;
  height: 0.4rem;
}

.feed_nodata {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 1rem;
  position: relative;
}

.feed_nodata_sroll {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: flex-end;
  font-size: 0.14rem;
  color: #c5c5c5;
  padding: 0.025rem;
  color: #444;
}

.feed_nodata_sroll img {
  margin-left: 0.05rem;
}

.feed_nodata_sroll navigator {
  vertical-align: middle;
  margin-bottom: 0.05rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.feed_nodata text:first-child {
  font-size: 0.14rem;
  color: #c5c5c5;
}

.feed_nodata navigator {
  font-size: 0.15rem;
  color: #444;
  position: absolute;
  bottom:-1.25rem;
  right:-3%;

}

/*打扫  */

.Clean {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
}

.Clean img {
  width: 1.34rem;
  height: 1.535rem;
  position: absolute;
  bottom: 1.04rem;
  left: 1.275rem;
}

/*小鸡状态  */

.GROWTH {
   width: 0.8rem;
  position: absolute;
  height: 0.9rem;
  display: flex;
  
  justify-content: center;
  align-items: center
}
.GROWTH img{width: 0.8rem; height: 0.9rem;}
.GROWTH .ScleanView{background: url("./Input_box_prompt@2x.png") center center no-repeat; width:1.32rem; height: 0.49rem; background-size:100% 100%;font-size: 0.11rem;color: #84662A;position: absolute;left: 0.025rem;top: -0.3rem}
.GROWTH .ScleanView text{width: 120px; margin: 0 auto;display: inline-block;margin-left: 0.11rem; margin-top: 0.05rem;}
.GROWTH .ShungerView{ background: url("./bubble_satiety_value@2x.png") center center no-repeat; width: 0.36rem; height: 0.41rem; background-size:100% 100%;display:flex; justify-content: top;align-items: center;flex-direction: column;position: absolute; top:0.125rem;left:-0.15rem; }

.GROWTH .SNoCleanHungerView{background: url("./Input_box_prompt@2x.png") center center no-repeat; width:1.32rem; height: 0.49rem; background-size:100% 100%;font-size: 0.11rem;color: #84662A;position: absolute;left: 0.025rem;top: -0.3rem}
.GROWTH .SNoCleanHungerView .text{width: 1.1rem; margin: 0 auto;display: inline-block;margin-left: 0.11rem; margin-top: 0.05rem;line-height: 0.16rem;}

.GROWTH .SHungerTalkView{background: url("./Input_box_prompt@2x.png") center center no-repeat; width:1.32rem; height: 0.49rem; background-size:100% 100%;font-size: 0.11rem;color: #84662A;position: absolute;left: 0.025rem;top: -0.3rem}
.GROWTH .SHungerTalkView text{width: 120px; margin: 0 auto;display: inline-block;margin-left: 0.11rem; margin-top: 0.05rem;}

.GROWTH .Schick_item_name{ height: 0.13rem; line-height: 0.13rem;text-align: center;font-size: 0.08rem; min-width: 0.25rem;
color: #FFFFFF; background: #9E5A23;border: 0.01rem solid #FFFFFF;border-radius: 0.07rem;margin-top:-0.115rem;padding:0 0.025rem}
.GROWTH .talk_div{ display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  }
.GROWTH .chick_img_name{display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center}
.GROWTH .ShungerView .fullWord{font-size: 0.08rem;color: #9E5A23;font-weight: bold;line-height: 0.8;}
.GROWTH .ShungerView .fullVal{font-size: 0.08rem;color: #9E5A23; margin-top: 0.05rem;height: 0.11rem; line-height: 1.2;font-weight: bold}



.HALF_GROWTH {
  width: 0.8rem;
  position: absolute;
  height: 0.9rem;
}
.HALF_GROWTH img{width: 0.8rem; height: 0.9rem;}
.HALF_GROWTH .ScleanView{background: url("./Input_box_prompt@2x.png") center center no-repeat; width:1.32rem; height: 0.49rem; background-size:100% 100%;font-size: 0.11rem;color: #84662A;position: absolute;left: 0.05rem;top: -0.35rem}
.HALF_GROWTH .ScleanView text{width: 120px; margin: 0 auto;display: inline-block;margin-left: 0.11rem; margin-top: 0.05rem;}
.HALF_GROWTH .ShungerView{ background: url("./bubble_satiety_value@2x.png") center center no-repeat; width: 0.36rem; height: 0.41rem; background-size:100% 100%;display:flex; justify-content: top;align-items: center;flex-direction: column;position: absolute; top:0.075rem;left:-0.175rem; }

.HALF_GROWTH .SNoCleanHungerView{background: url("./Input_box_prompt@2x.png") center center no-repeat; width:1.32rem; height: 0.49rem; background-size:100% 100%;font-size: 0.11rem;color: #84662A;position: absolute;left: 0.05rem;top: -0.35rem}
.HALF_GROWTH .SNoCleanHungerView .text{width: 1.2rem; margin: 0 auto;display: inline-block;margin-left: 0.11rem; margin-top: 0.05rem;}

.HALF_GROWTH .SHungerTalkView{background: url("./Input_box_prompt@2x.png") center center no-repeat; width:1.32rem; height: 0.49rem; background-size:100% 100%;font-size: 0.11rem;color: #84662A;position: absolute;left: 0.05rem;top: -0.35rem}
.HALF_GROWTH .SHungerTalkView text{width: 120px; margin: 0 auto;display: inline-block;margin-left: 0.11rem; margin-top: 0.05rem;}

.HALF_GROWTH .Schick_item_name{ height: 0.13rem; line-height: 0.13rem;text-align: center;font-size: 0.08rem; min-width: 0.25rem;
color: #FFFFFF; background: #9E5A23;border: 0.01rem solid #FFFFFF;border-radius: 0.07rem;padding:0 0.025;margin-top:-0.11rem;
}
.HALF_GROWTH .talk_div{ display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1px;
  }
.HALF_GROWTH .chick_img_name{display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center}
.HALF_GROWTH .ShungerView  .fullWord{font-size: 0.08rem;color: #9E5A23;font-weight: bold;line-height: 0.7;}
.HALF_GROWTH .ShungerView  .fullVal{font-size: 0.08rem;color: #9E5A23; margin-top: 0.05rem;height: 0.11rem; line-height: 1.1;font-weight: bold}



.MATURE {
  width: 0.8rem;
  position: absolute;
  height: 0.9rem;
}
.MATURE img{width: 0.8rem; height: 0.9rem;}
.MATURE .ScleanView {background: url("./Input_box_prompt@2x.png") center center no-repeat; width:1.32rem; height: 0.49rem; background-size:100% 100%;font-size: 0.11rem;color: #84662A;position: absolute;left: 0.05rem;top: -0.325rem}
.MATURE .ScleanView  text{width: 120px; margin: 0 auto;display: inline-block;margin-left: 0.11rem; margin-top: 0.05rem;}
.MATURE .ShungerView { background: url("./bubble_satiety_value@2x.png") center center no-repeat; width: 0.36rem; height: 0.41rem; background-size:100% 100%;display:flex; justify-content: top;align-items: center;flex-direction: column;position: absolute; top:0.075rem;left:-0.275rem; }

.MATURE .SNoCleanHungerView {background: url("./Input_box_prompt@2x.png") center center no-repeat; width:1.32rem; height: 0.49rem;background-size:100% 100%;font-size: 0.11rem;color: #84662A;position: absolute;left: 0.125rem;top: -0.45rem;z-index: 999}
.MATURE .SNoCleanHungerView  .text{width: 1.2rem; margin: 0 auto;display: inline-block;margin-left: 0.11rem; margin-top: 0.05rem;}

.MATURE .SHungerTalkView {background: url("./Input_box_prompt@2x.png") center center no-repeat; width:1.32rem; height: 0.49rem; background-size:100% 100%;font-size: 0.11rem;color: #84662A;position: absolute;left: 0.15rem;top: -0.25rem}
.MATURE .SHungerTalkView  text{width: 120px; margin: 0 auto;display: inline-block;margin-left: 0.11rem; margin-top: 0.05rem;}

.MATURE .Schick_item_name{ height: 0.13rem; line-height: 0.13rem;text-align: center;font-size: 0.08rem; min-width: 0.25rem;
color: #FFFFFF; background: #9E5A23;border: 0.01rem solid #FFFFFF;border-radius: 0.07rem;padding:0 0.025rem; margin-top: -0.05rem}
.MATURE .talk_div{ display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1px;
  }
.MATURE .chick_img_name{display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center}
.MATURE .ShungerView .fullWord{font-size: 0.08rem;color: #9E5A23;font-weight: bold;line-height: 0.7;}
.MATURE .ShungerView .fullVal{font-size: 0.08rem;color: #9E5A23; margin-top: 0.05rem;height: 0.11rem; line-height: 1.1;font-weight: bold}


.FAIL_ILL {
  width: 0.9rem;
  position: absolute;
  height: 1rem;
}

.CURE {
   width: 0.8rem;
  position: absolute;
  height: 0.9rem;
}

.DIE {
  width: 0.8rem;
  position: absolute;
  height: 009rem;
}

/*进入鸡舍  */

.my_to_house {
  width: 1.1rem;
  height: 1rem;
  z-index: 1;
  position: absolute;
  border-radius: 0.75rem;
  top: 34.5vh;
  right: 12.5vw;
}
.my_to_house img{
  width: 100%;
  height: 100%;
}

.active {
  border: 4px solid #964F32;
  box-shadow: 0 2px 4px 0 rgba(150,79,50,0.40);
}

/* 小鸡位置1 */

.j1_1 {
  top: 0;
  left: 0.735rem;
}

.j1_2 {
  top: 0.72rem;
  left: 1.66rem;
}

.j1_3 {
  bottom: 0;
  left: 1.66rem;
}

.j1_4 {
  bottom: 0.595rem;
  left: 0.385rem;
}

.j1_5 {
  top: 0.14rem;
  right: 0.43rem;
}

/* 小鸡位置2 */

.j2_1 {
  bottom: 0.77rem;
  right: 0.14rem;
}

.j2_2 {
  bottom: 0;
  left: 1.65rem;
}

.j2_3 {
  top: 0.525rem;
  right: 0.835rem;
}

.j2_4 {
  top: 0;
  left: 0.8rem;
}

.j2_5 {
  bottom: 0.725rem;
  left: 0.225rem;
}

/* 小鸡位置3 */

.j3_1 {
  top: 0.525rem;
  right: 0.925rem;
}

.j3_2 {
  bottom: 0.79rem;
  left: 0.695rem;
}

.j3_3 {
  top: 0.15rem;
  left: 1.05rem;
}

.j3_4 {
  bottom: 0.65rem;
  right: 0.225rem;
}

.j3_5 {
  top: 0.235rem;
  left: 1.655rem;
}

@keyframes friend {
  from {
    height: 0.64rem;
  }

  to {
    height: 4.09rem;
  }
}

@keyframes Feedinglist {
  from {
    height: 0;
  }

  to {
    height: 1.57rem;
  }
}

.Feedinglist {
  animation: Feedinglist 2s;
}

.item_content_icon {
  line-height: 50%;
}

.item_content_icon .text {
  width: 0.25rem;
  height: 0.25rem;
  margin-left: 0.25rem;
  margin-right: 0.15rem;
   margin-top: 0.15rem;
  display: inline-block;
  text-align: center;
  font-size: 13px;
  color: #444;
}

/*laji  */

/* .my_conents_garbage  .garbage1{
  width: 50rpx;
  height: 10rpx; 
  position: absolute;
} */

.garbage1 {
  position: absolute;
  width: 0.31rem;
  height:0.12rem;
  bottom: 2.04rem;
  left: 0.585rem;
}

.garbage2 {
  position: absolute;
  width: 0.45rem;
  bottom: 1.625rem;
  left: 0.69rem;
  height: 0.675rem;
}

.garbage3 {
  position: absolute;
  width: 0.72rem;
  height: 0.445rem;
  bottom: 2.12rem;
  left: 1.vh;
}

.garbage4 {
  position: absolute;
  width: 0.995rem;
  height: 0.15rem;
  bottom: 1.975rem;
  right: 0.46rem;
}

.garbage5 {
  position: absolute;
  width: 0.31rem;
  height: 0.12rem;
  bottom: 1.72rem;
  right: 0.35rem;
}

.garbage6 {
  position: absolute;
  width: 0.31rem;
  height: 0.12rem;
  left: 0.88rem;
  bottom: 1.125rem;
}

.garbage7 {
  position: absolute;
  width: 0.855rem;
  height: 0.65rem;
  bottom: 0.785rem;
  left: 0.94rem;
}

.garbage8 {
  position: absolute;
  width: 0.31rem;
  height: 0.12rem;
  right: 1.395rem;
  bottom: 1.415rem;
}

.garbage9 {
  position: absolute;
  width: 0.78rem;
  height: 0.245rem;
  bottom: 0.625rem;
  right: 1.35rem;
}

.garbage10 {
  position: absolute;
  width: 0.52rem;
  height: 0.45rem;
  bottom: 1.035rem;
  right: 0.635rem;
}

/*更多史料  */

.feed_nodata_three .feed_check_item_info_item_img {
  border: 0;
}

.feed_nodata_three {
  font-size: 0.15rem;
  color: #444;
  text-align: center;
}

.feed_nodata_two {
  font-size: 0.15rem;
  color: #444;
  text-align: right;
  width: 100%;
  align-items: flex-end;
}

.records_no {
  display: flex;
  width: 100%;
  height: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.records_no text:first-child {
  font-size: 0.14rem;
  color: #c5c5c5;
}

.records_no div {
  font-size: 0.15rem;
  color: #444;
  display: inline-block;
  position: absolute;
  bottom: 0.15rem;
  right: 0.05rem;
  vertical-align: middle;
}

.records_no_data {
  width: 100%;
  text-align: right;
  font-size: 0.15rem;
  color: #444;
  height: 0.4rem;
}

.records_no_data navigator {
  padding-top: 0.1rem;
}

.feed_item_footer_height {
  border-top-left-radius: 0.1rem;
  border-top-right-radius: 0.1rem;
}

.yu img {
  width: 0.61rem;
  height: 0.39rem;
  position: absolute;
  left: 0.125rem;
  bottom: 2.72rem;
}

.fengche .fengche1 {
  height: 0.68rem;
  width: 0.41rem;
  position: absolute;
  left: 0.92rem;
  top: 35.6vh;
  z-index: 2;
}

.fengche .fengche2 {
  height: 0.985rem;
  width: 0.835rem;
  left: 0.7rem;
  top: 29vh;
  position: absolute;
  z-index: 1;
  animation: zhuan 3s infinite linear;
}

@keyframes zhuan {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/*yun  */

.yunone {
  position: absolute;
  width: 0.915rem;
  height: 0.13rem;
  right: 2.385rem;
  top: 0.47rem;
  animation: yunone 10s 2s infinite linear;
}

.yuntwo {
  position: absolute;
  top: 0.05rem;
  right: 0.685rem;
  width: 1.065rem;
  height: 0.15rem;
  animation: yuntwo 10s 1s infinite linear;
}

.yunthree {
  position: absolute;
  height: 0.365rem;
  top: 0.595rem;
  right: 0.575rem;
  width: 1.07rem;
  animation: yunthree 10s infinite linear;
}

.getUserInfo {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

@keyframes yunone {
  0% {
    right: 2.385rem;
  }

  50% {
    right: 2.885rem;
  }

  100% {
    right: 2.385rem;
  }
}

@keyframes yuntwo {
  0% {
    right: 1.065rem;
  }

  50% {
    right: 1.565rem;
  }

  100% {
    right: 1.065rem;
  }
}

@keyframes yunthree {
  0% {
    right: 0.575rem;
  }

  50% {
    right: 1.075rem;
  }

  100% {
    right: 0.575rem;
  }
}

/* .getUserInfo  div{
  height: 100vh;
  width: 100%;
  z-index: 999;
  display: flex;
  align-content: center;
  align-items: center;
  background: #fff;
  position: relative;
}
.getUserInfo_item{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.getUserInfo_item button{
  font-size: 50rpx;
  color: red;
  background: yellow;
} */

/*toast 提示  */

.bg {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.bg_model {
  background: #fff;
  border-radius: 10px;
  width: 2.95rem;
  height: 1.59rem;
}

.bg_info {
  line-height: 1.09rem;
  height: 1.09rem;
  width: 100%;
  font-size: 17px;
  color: #444;
  margin: 0 auto;
  text-align: center;
  display: inline-block;
}

.bg_btn {
  height: 0.5rem;
  width: 100%;
  text-align: center;
  line-height: 0.5rem;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background-image: linear-gradient(90deg, #fecc00 0%, #ffec00 98%);
  font-size: 16px;
  color: #ff6f2d;
  font-weight: bold;
}

.bg_toast {
  max-width: 295px;
  min-height: 0.75rem;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  font-size: 0.17rem;
  justify-content: center;
  color: #444;
  padding: 0.1rem 0.25rem;
}

.getUserInfo {
  height: 100vh;
  width: 100%;
  z-index: 999;
  display: flex;
  align-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
}

.getUserInfo_item {
  display: flex;
  height: 1.25rem;
  width: 60%;
  margin: 0 auto;
  border-radius: 0.15rem;
  position: relative;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.getUserInfo_item text {
  color: #000;
  margin-bottom: 0.1rem;
  font-size: 0.14rem;
  position: absolute;
  top: 0.35rem;
}

.getUserInfo_item button {
  position: absolute;
  bottom: 0;
  font-size: 0.13rem;
  color: red;
  width: 100%;
  height: 0.4rem;
  border: none;
  border-bottom-left-radius: 0.15rem;
  border-bottom-right-radius: 0.15rem;
  line-height: 0.4rem;
  background: linear-gradient(90deg, #ffec00 0%, #fecc00 98%);
  margin-top: 0.15rem;
}

noactive {
  border: 4px solid #fafafa;
  box-shadow: 0px 0px 20px #999;
}
.feed_item_footer_top{ 
width:100%;
position:relative;
text-align:center;
height: 0.56rem;
border-bottom: 1px solid #f2f2f2;
box-shadow: 0 -3px 3px rgba(0,0,0,0.2)
}
.feed_item_footer_top .icoimage{width: 0.91rem; height: 0.91rem; margin: 0 auto;
position:relative;top:-0.455rem;
}
.close_feed_box {
  width:0.42rem;
  height:0.42rem;
  position:absolute;
  right:0.075rem;
  top:0.075rem;
  background:url(./friends_list_icon_close@2x.png) center no-repeat;
  background-size:0.21rem 0.21rem;
}

.feed_item_footer_top .close_img_feed{width: 0.21rem;height: 0.21rem; position:absolute; right: 0.15rem;top: 0.15rem;}
.feed_item_footer_top .text{font-size: 0.14rem;color: #444444; position:absolute; left: 0.2rem;top: 0.28rem;font-weight: bold }
.feed_item_footer_item_ul{white-space: nowrap; margin-left: 0.2rem;overflow-x: scroll;}
.feed_footer_flex{ width: 1.05rem; height: 1.69rem;margin-top: 0.2rem; margin-right: 0.1rem; position: relative;display: inline-block;background:url("./insect_feed_bg@2x.png") top center no-repeat; background-size:100% 100%;}

.feed_footer_flex img {
  width: 0.6rem;
  height: 0.6rem;
  
  border-radius: 50%;
}
.feed_img{background:rgba(245, 245, 245, 0.5);width: 0.6rem;height: 0.6rem;border-radius: 50%; text-align:center;margin: 0 auto; margin-top: 0.1rem}

.item_fullval_item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  text-align: center;
  
}
.feed_val_list .text {
  display: flex;
  flex-direction: column;  
  color: #fff;
  font-size: 0.11rem;
  width:0.525rem; 
  margin: 0 auto;
  text-align: left;
}
.feed_name{font-size: 0.12rem;color: #fff; width: 100%; text-align: center}

.feed_footer_flex .feed_footer_title {
  color: #fff;
  font-size: 0.15rem;
  padding-top: 0.025rem;
}
.chick_size_type{width: 100%;text-align: center;display: flex;justify-content: center;align-items: center;margin-bottom: 0.8rem;}
.changeNameView {position:absolute;top:0.2rem;left:35vw;margin:0px auto;background: #FFFAEC;border: 0.02rem solid #FFDA17;border-radius: 0.08rem; text-align: center; width: 1.11rem;height: 0.31rem; line-height: 0.31rem;display: flex;justify-content: center;align-items: center;}
.changeNameView  .text{ font-size: 0.13rem; color: #964F32;width: 100%; margin: 0 auto;text-align: center}
.changeNameView  img{width: 0.18rem;height: 0.18rem;position: absolute;right: 0.06rem;top: 0.06rem}

.Modal_box{display: flex;width:100%;height:100vh;justify-content: center;align-items: center;z-index: 25;position: absolute;top: 0;}
.Modal_meng{background: rgba(0,0,0,0.50);display: flex; justify-content: center;align-items: center;z-index: 25;position: absolute; height: 100vh;width:100vw;left: 0;}

.telModal{position: absolute;left:1vw;top:35vh;z-index: 26;width:100vw;display: flex;justify-content: center;align-items: center;}
.telModalCon{background: #fff;border-radius: 0.1rem; width: 3rem; margin: 0 auto; display: flex;flex-direction:column;justify-content: center;align-items: center;}
.titleTel{font-size: 0.17rem;color: #444444;letter-spacing: 0.13px; width: 100%; text-align: center; padding: 0.25rem 0 0.15rem 0;}
.inputTel{display: flex; justify-content: center;align-items: center; margin-bottom: 0.2rem}
.inputTel text{font-size: 0.15rem;color: #999999;letter-spacing: 0.13px;}
.inputTel input{width: 1.82rem; height: 0.32rem; line-height: 0.32rem;font-size: 0.12rem;color: #666666;border: 1px solid #E7E7E7;
border-radius: 0.03rem; text-align: center }  
.tipTel{font-size: 0.12rem;color: #C5C5C5;letter-spacing: 0.9px; padding: 0.21rem 0 0.22rem 0;}
.btnTel{height: 0.5rem; line-height: 0.5rem;font-size: 0.16rem;color: #FF6F2D;letter-spacing: 0.12px; background:linear-gradient(90deg, #FFEC00 0%, #FECC00 98%);width: 100% ; text-align: center;border-radius: 0 0 0.1rem 0.1rem}
.name_color{ color:#C5C5C5}
.no_feed_view{font-size: 0.14rem;color: #C5C5C5; width: 100%; text-align: center; height:1.64rem; line-height: 1.64rem}


/**
  新手引导
**/

.lead_btn {
  width: 100%;
  height: 100%;
  z-index: 20;
  position: absolute;
}

.lead_friends {
  width: 2.16rem;
  height: 0.52rem;
  position:absolute;
  top:0.175rem;
  left:0.35rem;
  z-index:10;
  max-width: initial;
}

.lead_shop {
  width: 2.16rem;
  height: 0.52rem;
  position:absolute;
  top:0.175rem;
  right:0.35rem;
  max-width: initial;
}

.lead_clean{
  width: 2.16rem;
  height: 0.52rem;
  position:absolute;
  top:-0.425rem;
  right:0.25rem;
  z-index:10;
  max-width: initial;
}


.lead_feed{
  width: 2.16rem;
  height: 0.52rem;
  position:absolute;
  top:-0.425rem;
  right:0.82rem;
  z-index:10;
   max-width: initial;
}

button[class="friends_footer_btn_share"]::after {
  border: 0;
}
.lead_box{position: relative;z-index: 19; width: 100%; height: 100%;}
.leadImgThis{ position: absolute;z-index: 18; top: 0rem;}

.leadImgThisEgg{position: absolute;z-index: 18; top: 0rem;}
.leadImgThisHouse{position: absolute;z-index: 18; top: 0rem;}
.leadImgThisClea{ position: absolute;z-index: 18; bottom:0;}
.leadImgThisFeed{ position: absolute;z-index: 18; bottom:0;}
.leadImgThisFri{ position: absolute;z-index: 18; bottom:0;}

.passLead{position: absolute;z-index: 21; right: 0.26rem;top: 0.4rem;color: #fff;}
@media screen  and (max-height:540px){
  .fengche .fengche1 {
    top: 33.2vh;
  }

  .fengche .fengche2 {
    top: 25.4vh;
  }
}
</style>
