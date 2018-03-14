//＊＊＊微信获取用户信息接口＊＊＊

//此接口不带参数
module.exports = (req, res) => {
    res.json({
        "info": "获取用户信息成功",
        "status": "success",
        "data": {
            "uid": 30990128,
            "passport": "wx_41029440552511",
            "password": "",
            "phone": "",
            "phoneBind": "",
            "wxOpenId": "od5iysxg3OABghDyjSpwH6QHwHxU",
            "wxUnionId": "oKF_asq4TkQyEzcyn0yGdSy5qQD0",
            "wxNickName": "QWxleA==",
            "logoStatus": 1,
            "logoPath": "https://register.stnts.com/storage/Security/309/128/30990128_92x92.jpg?1489131020770",
            "nickName": "Alex",
            "integration": 400,
            "degree": 1,
            "email": ""
        },
        "code": "200"
    })
};
