
module.exports = (req, res) => {
    res.json({
        "status": "success",
        "info": "获取位置信息成功",
        "data": {
            "location" : "湖北省武汉市金融港三路"
        }
    });
};
