/**
 * Created by dongqiang on 2016/3/25/025.
 */
//(function () {
var showMessage = new ShowMessage();
var wraper,timer=null;

function ShowMessage() {
    this.showInfo = function (options) {
        clearTimeout(timer);
        var defaultOptions = {
            period:options.period||"",
            message: options.message||"success",
            time: options.time||1000
        };
    
        if(wraper){
            wraper.remove();            
        }
        wraper = document.createElement("div");
        var chickDialoImg = '<img src="static/images/chicken_house_dialogue_small_img@2x.png" alt="" class="chick-img">';
        if(options.period =="GROWTH"){
            chickDialoImg = '<img src="static/images/chicken_house_dialogue_small_img@2x.png" alt="" class="chick-img">';    
        }
        else if(options.period =="HALF_GROWTH"){
            chickDialoImg = '<img src="static/images/chicken_house_dialogue_in_img@2x.png" alt="" class="chick-img">';    
        }
        else if(options.period =="MATURE"){
            chickDialoImg = '<img src="static/images/chicken_house_dialogue_big_img.png" alt="" class="chick-img">';    
        }
        var createDiv = `<div class="chick-talk">
                ${chickDialoImg}                
                <span class="talk-content" v-show="isSHowTalkContent">${options.message}</span>
            </div> `;
            
        wraper.innerHTML = createDiv;    
        document.body.appendChild(wraper);
        timer = setTimeout(()=> {
           
            wraper.remove();
        }, options.time);
    }
}
//})();
//购买公用js代码
