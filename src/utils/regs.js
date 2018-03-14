/*正则脚本*/
const regs = {
    regs:{
        passport:{
            reg:/^[a-zA-z]\w{3,15}$/,
            desc:"4-16字,支持字母、数字（开头为字母）"
        },
        password:{
            reg:/^\w{6,20}$/,
            desc:"6-20字,支持字母、数字、下划线"
        },
        common: {
            reg: /^\w+$/,
            desc: "字母,数字或下划线！"
        },
        fangle: {
            reg: /[\uFF00-\uFFFF]/,
            desc: "全角字符!"
        },
        vcode: {
            reg: /^\d{6}$/,
            desc: "6位验证码！"
        },
        area:{
            reg:/\S/,
            desc:"服务地区!"
        },
        zipcode: {
            reg: /^\d{6}$/,
            desc: "6位数字！"
        },
        email: {
            reg: /^\w[\w\.-]*@[\w-]+(\.[\w-]+)+$/,
            desc: "邮箱格式！"
        },
        idcard: {
            reg: /^(\d{15}|\d{17}[\dx])$/,
            desc: "15或18位身份证号码！"
        },
        chinese: {
            reg: /^[\u4E00-\u9FAF]+$/,
            desc: "中文！"
        },
        truename: {
            reg:/\S/,
            desc: "请输入真实姓名"
        },
        /*
        truename: {
            reg: /^[\u4E00-\u9FAF]{2,4}$/,
            desc: "请输入真实姓名"
        },
        */
        nickname: {
            reg: /^[\u4E00-\u9FAF]{2,8}$/,
            desc: "2-8个中文！"
        },
        english: {
            reg: /^[A-Za-z]+$/,
            desc: "英文！"
        },
        date: {
            reg: /^\d{4}-\d{2}-\d{2}$/i,
            desc: "公历日期(2013-07-06)！"
        },
        url: {
            //reg: /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=#]*)?$/i,
            reg:/^http(s)?:\/\//i,
            desc: "URL！"
        },
        https_url: {
            reg:/^https:\/\//i,
            desc: "请使用https的URL地址！"
        },
        qq: {
            reg: /^[1-9]\d{4,10}$/,
            desc: "5-11位QQ号！"
        },
        phone: {
            reg: /^((((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?)|(\d{11}))$/,
            desc: "电话或手机号码！"
        },
        mobile: {
            reg: /^(000|(13[0-9])|(14[0-9])|(15[^4,\\D])|(17[0-9])|(18[0-9]))\d{8}$/,
            desc: "11位手机号码！"
        },
        symbol: {
            reg: /[`~!@#$%^&*()+=|{}':;',.<>/?~！@#￥%……&*（）——+|{}【】'；：""'。，、？]/,
            desc: "特殊字符！"
        },
        ip: {
            reg: /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/,
            desc: "IP地址"
        },
        gid:{
            reg: /^\d{1,10}$/,
            desc: "正确的gid"
        },
        gname:{
            reg:/\S/,
            desc:"网吧全称"
        },
        bussType:{
            reg:/\S/,
            desc:"业务类型"
        },
        bussDate:{
            reg:/\S/,
            desc:"开通日期"
        },
        companyName:{
            reg:/\S/,
            desc:"公司名称"
        },
        mac: {
            reg: /[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}/i,
            desc: "MAC地址"
        },
        number: {
            reg: /^\d+$/,
            desc: "数字"
        },
        unnumber: {
            reg: /\D/,
            desc: "不为数字"
        },
        integer: {
            reg: /^-?(0|[1-9]\d*)$/,
            desc: "整数！"
        },
        decimal: {
            reg: /^-?[0-9]+\.[0-9]+$/,
            desc: "小数"
        },
        tagsv: {
            reg: /^([a-zA-Z0-9]|[\u4E00-\u9FAF])+$/,
            desc: "中文，英文和数字"
        },
        int: {
            reg: {
                test: function (key, o) {
                    var t = ST.Regs.int;
                    if (!ST.Regs.integer.reg.test(key)) {
                        t.desc = "整数";
                        return false;
                    }
                    var num = parseInt(key, 10), sign = o.attr("sign");
                    if (sign == '+') {
                        t.desc = "正整数";
                        return num > 0;
                    }
                    if (sign == '-') {
                        t.desc = "负整数";
                        return num < 0;
                    }
                    return true;
                }
            },
            desc: "整数"
        },
        dec: {
            reg: {
                test: function (key, o) {
                    var t = ST.Regs.dec;
                    //小数（digits属性为小数位数，例：1-3或2）
                    if (!ST.Regs.decimal.reg.test(key)) {
                        t.desc = '小数';
                        return false;
                    }
                    var digits = o.attr("digits").split("-"),
                        len = digits.length;
                    if (!len) return true;

                    var d = key.length - key.indexOf('.') - 1;
                    if (len > 1) {
                        if (d < digits[0] || d > digits[1]) {
                            t.desc = '保留' + digits[0] + '-' + digits[1] + '位小数';
                            return false;
                        }
                    } else {
                        if (d != digits[0]) {
                            t.desc = '保留' + digits[0] + '位小数';
                            return false;
                        }
                    }
                    var num = parseFloat(key), sign = o.attr("sign");
                    if (sign == '+') {
                        t.desc = '正小数';
                        return num > 0;
                    }
                    if (sign == '-') {
                        t.desc = '负小数';
                        return num < 0;
                    }
                    return true;
                }
            },
            desc: "小数"
        },
        //最小值
        min: {
            reg: {
                test: function (key, o) {
                    var t = ST.Regs.min;
                    if (!(ST.Regs.integer.reg.test(key) || ST.Regs.decimal.reg.test(key))) {
                        t.desc = ST.LRes.FormErrorNumber;
                        return false;
                    }
                    var min = o.attr("min");
                    if (!min) return true;
                    if (parseFloat(key) < parseFloat(min)) {
                        t.desc = '最小值为' + min;
                        return false;
                    }
                    return true;
                }
            },
            desc: "最小值"
        },
        //最大值
        max: {
            reg: {
                test: function (key, o) {
                    var t = ST.Regs.max;
                    if (!(ST.Regs.integer.reg.test(key) || ST.Regs.decimal.reg.test(key))) {
                        t.desc = ST.LRes.FormErrorNumber;
                        return false;
                    }
                    var max = o.attr("max");
                    if (!max) return true;
                    if (parseFloat(key) > parseFloat(max)) {
                        t.desc = '最大值为' + max;
                        return false;
                    }
                    return true;
                }
            },
            desc: "最大值"
        }
    }
};

/*正则验证方法*/
let o = Object.assign({
 /**
  * 验证方法,遍历regs key value 的方式验证,返回 各项验证结果
  * @constructor
  * @param {object} o - 待验证得键值对
  * */
 vaild:function(o,p){
     var e={},et={};
     var r=regs.regs;
     //待完成
     for(var i in o){
         if(o[i]){
             if(r[i] && !r[i].reg.test(o[i])){
                 e[i] = r[i].desc;
             }
         }else if(o[i]===""){
             if(r[i]){
                et[i] = true;
             }
         }
     }
     return {
         error:e,
         empty:et
     };
 }
},regs);

export default o;
