module.exports = (req, res) => {
    res.json({
        "info": "成功",
        "status": "success",
        "data": {
            "datas":[
                {
                    "id":1,
                    "provinceId":1,
                    "provinceName":"湖北省",
                    "cityId":8,
                    "cityName":"武汉市",
                    "countyId":18,
                    "countyName":"江岸区",
                    "address":"地址一",
                    "receiver":"张杰",
                    "phoneNum":"15815865658",
                    "isDefault":1//是否是默认地址，0表示不是，1表示是
                },
                {
                    "id":2,
                    "provinceId":1,
                    "provinceName":"湖北省",
                    "cityId":8,
                    "cityName":"武汉市",
                    "countyId":18,
                    "countyName":"江岸区",
                    "address":"地址二",
                    "receiver":"张杰",
                    "phoneNum":"15815865658",
                    "isDefault":0//是否是默认地址，0表示不是，1表示是
                }
            ]
        }
    });
};
