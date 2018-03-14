//＊＊＊获取商品列表接口＊＊＊
// uid:
// passport:
// pid
// bild
// eBusinessNum
// bId
// addressId
// stock
// source      ucmall
// bSource     wechat

module.exports = (req, res) => {
    setTimeout(function() {
        res.json({
            "info": "获取成功",
            "status": "success",
            "data": {
                "url": "",   //分数
                "card": [],
                "product": {}
            }
        })
    },1500);
}
