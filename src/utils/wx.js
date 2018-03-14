'use strict';

import axios from 'axios'



var url =  encodeURIComponent(location.href.split('#')[0]);
//暴露API
var wx_api = {
    _url:url,
    ready:false,
    //启动方法, 检查ready后执行
    run:(name,params)=>{
        if(wx_api.ready){
           wx[name](params);
        }
    },
    //根据定位查询地址
    getCurrentAddress:()=> {
        return new Promise((resolve, reject) => {
            wx.ready(function(){
                wx_api.run("getLocation",{
                    type: 'wgs84',  // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        var speed = res.speed; // 速度，以米/每秒计
                        var accuracy = res.accuracy; // 位置精度
                        var geocoder = new qq.maps.Geocoder({
                            complete: function (result) {   //解析成功的回调函数
                                var address = result.detail.address;  //获取详细地址信息
                                resolve(address);
                            }
                        });
                        geocoder.getAddress(new qq.maps.LatLng(latitude,longitude));
                    },
                    cancel:function(){
                        reject("cancel");
                    },
                    fail:function(){
                        reject("fail");
                    }
                });
            });
        });
    },
    setConfig:()=>{
        //if(wx_api.ready){ return false};
        if(window.wx){
            //页面引入wx.js
            //alert(encodeURIComponent(location.href.split('#')[0]));
            axios.get('/api/weixin/getJSConfigInfo.do',{
                params: {
                    url:encodeURIComponent(location.href.split('#')[0])
                },
                responseType: 'json'
            }).then(function(res){
                if(res.status==200){
                    let data = res.data.data;
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data.appId, // 必填，公众号的唯一标识
                        timestamp: data.timestamp, // 必填，生成签名的时间戳
                        nonceStr:  data.nonceStr, // 必填，生成签名的随机串
                        signature:  data.signature,// 必填，签名，见附录1
                        jsApiList: [
                            "chooseImage",          //选择照片
                            "getLocation",          //获取地理位置
                            "getLocalImgData"       //获取图片数据
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                }

            }).catch(function(err){

            });


            //注册ready方法
            wx.ready(function(){
                wx_api.ready = true;
            });
        }
    }
};


//页面进入调用
wx_api.setConfig();

export default  wx_api;
