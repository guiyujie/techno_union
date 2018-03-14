module.exports = (req, res) => {
    res.json({
    "status": "success",
    "info": "查询成功",
    "data": {
	   "userInfo" : {
	      "tuid" : 1001,
		  "uid"  : 3245345,
		  "passport" : "st_wsfdsf",
          "avatarUrl":"",
		  "phone" : "13545327654",
	      "realName" : "张杰",
		  "serviceArea" : "湖北省武汉市",
		  "companyName" : "盛天网络",
		  "yiliCoin" : "20",
          "successSheetNum":10
       }
	}
    });

}
