/*常用文本配置*/
const Langs = {
    /*通用文案*/
    normal:{
       use_tip1:"游戏币有效期为30天,请尽早使用",
       use_tip2:"当某个游戏币已用完,请尝试其他游戏币或付费购买",
       card_tip:"如果该码已使用完,请更换其他或购买",
       free_card_tip:"赠币10分钟之内只能使用2枚",
       card_expires_tip:"30天有效期,请尽早使用",
       expires_tip:"",
       cz_btn_text:"购买游戏币",
    },
    /*CJ期间文案*/
    cj:{
       use_tip1:"游戏币ChinaJoy期间当日有效,请尽早使用",
       use_tip2:"当某个游戏币已用完,请尝试其他游戏币或参与活动",
       card_tip:"如果该码已使用完,请更换其他或参与活动",
       free_card_tip:"ChinaJoy期间当日有效",
       card_expires_tip:"ChinaJoy期间当日有效",
       expires_tip:"2017ChinaJoy活动当天",
       cz_btn_text:"获取游戏币"
    }
};

let cur = "normal";

/*对外的方法*/
let fn ={
    setLang:(lang)=>{
        if(Langs[lang]){
            cur = lang;
        }
    },
    getCurLang:()=>{
        return cur;
    },
    get:function(key,lang){
        return Langs[lang||cur||'normal'][key];
    }
};

export default fn;

