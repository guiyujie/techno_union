module.exports = (req, res) => {
    const query = req.query;
    setTimeout(function(){
        res.json({
            "status": "success",
            "info": "查询成功",
            "data": {
                "detailUrl": "http://ucmall.stnts.com/page/detail.do?pid=",
                "totalCount": 100,
                "pageNum": query.page || 1,//当前页码
                "imagePrefix": "http://ucmall.stnts.com/img/",
                "mallProducts": [
                    {
                        "pAliasName": "键盘",
                        "checkNum": 1717,
                        "eVipHighestLevel": 0,
                        "image": "default/20170116/528ba7e3-a413-499c-b32c-842786352d433.jpg",
                        "biId": "20",
                        "limitNum": 0,
                        "exchangeNum": 137,
                        "pId": 152,
                        "price": 100,
                        "pName": "实物键盘1",
                        "stock": 989,
                        "description": "<p>123</p>",
                        "eVipLowestLevel": 1,
                        "vipType": 1,
                        "createDate": 1484029517000,
                        "pType": 1
                    },
                    {
                        "pAliasName": "键盘",
                        "checkNum": 1717,
                        "eVipHighestLevel": 0,
                        "image": "default/20170116/528ba7e3-a413-499c-b32c-842786352d43.jpg",
                        "biId": "20",
                        "limitNum": 0,
                        "exchangeNum": 137,
                        "pId": 152,
                        "price": 100,
                        "pName": "实物键盘1",
                        "stock": 989,
                        "description": "<p>123</p>",
                        "eVipLowestLevel": 1,
                        "vipType": 1,
                        "createDate": 1484029517000,
                        "pType": 1
                    },
                    {
                        "pAliasName": "键盘",
                        "checkNum": 1717,
                        "eVipHighestLevel": 0,
                        "image": "default/20170116/528ba7e3-a413-499c-b32c-842786352d43.jpg",
                        "biId": "20",
                        "limitNum": 0,
                        "exchangeNum": 137,
                        "pId": 152,
                        "price": 100,
                        "pName": "实物键盘1",
                        "stock": 989,
                        "description": "<p>123</p>",
                        "eVipLowestLevel": 1,
                        "vipType": 1,
                        "createDate": 1484029517000,
                        "pType": 1
                    },
                    {
                        "pAliasName": "键盘",
                        "checkNum": 1717,
                        "eVipHighestLevel": 0,
                        "image": "default/20170116/528ba7e3-a413-499c-b32c-842786352d43.jpg",
                        "biId": "20",
                        "limitNum": 0,
                        "exchangeNum": 137,
                        "pId": 152,
                        "price": 100,
                        "pName": "实物键盘1",
                        "stock": 989,
                        "description": "<p>123</p>",
                        "eVipLowestLevel": 1,
                        "vipType": 1,
                        "createDate": 1484029517000,
                        "pType": 1
                    },
                    {
                        "pAliasName": "键盘",
                        "checkNum": 1717,
                        "eVipHighestLevel": 0,
                        "image": "default/20170116/528ba7e3-a413-499c-b32c-842786352d43.jpg",
                        "biId": "20",
                        "limitNum": 0,
                        "exchangeNum": 137,
                        "pId": 152,
                        "price": 100,
                        "pName": "实物键盘1",
                        "stock": 989,
                        "description": "<p>123</p>",
                        "eVipLowestLevel": 1,
                        "vipType": 1,
                        "createDate": 1484029517000,
                        "pType": 1
                    },
                    {
                        "pAliasName": "键盘",
                        "checkNum": 1717,
                        "eVipHighestLevel": 0,
                        "image": "default/20170116/528ba7e3-a413-499c-b32c-842786352d43.jpg",
                        "biId": "20",
                        "limitNum": 0,
                        "exchangeNum": 137,
                        "pId": 152,
                        "price": 100,
                        "pName": "实物键盘1",
                        "stock": 989,
                        "description": "<p>123</p>",
                        "eVipLowestLevel": 1,
                        "vipType": 1,
                        "createDate": 1484029517000,
                        "pType": 1
                    },
                    {
                        "pAliasName": "键盘",
                        "checkNum": 1717,
                        "eVipHighestLevel": 0,
                        "image": "default/20170116/528ba7e3-a413-499c-b32c-842786352d43.jpg",
                        "biId": "20",
                        "limitNum": 0,
                        "exchangeNum": 137,
                        "pId": 152,
                        "price": 100,
                        "pName": "实物键盘1",
                        "stock": 989,
                        "description": "<p>123</p>",
                        "eVipLowestLevel": 1,
                        "vipType": 1,
                        "createDate": 1484029517000,
                        "pType": 1
                    },
                    {
                        "pAliasName": "键盘",
                        "checkNum": 1717,
                        "eVipHighestLevel": 0,
                        "image": "default/20170116/528ba7e3-a413-499c-b32c-842786352d43.jpg",
                        "biId": "20",
                        "limitNum": 0,
                        "exchangeNum": 137,
                        "pId": 152,
                        "price": 100,
                        "pName": "实物键盘1",
                        "stock": 989,
                        "description": "<p>123</p>",
                        "eVipLowestLevel": 1,
                        "vipType": 1,
                        "createDate": 1484029517000,
                        "pType": 1
                    }
                ]
            },
            "code": "200"
        });
    },1000);
}
