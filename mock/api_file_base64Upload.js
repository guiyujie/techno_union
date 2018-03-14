
module.exports = (req, res) => {
    res.json({
        "status": "success",
        "info": "上传成功",
        "data": {
            "largePicUrl" : "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2113249736,1531559905&fm=173&s=E0A327F3D63103921C21A4E603003053&w=218&h=146&img.JPEG",   //大图url
            "smallPicUrl" : "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2113249736,1531559905&fm=173&s=E0A327F3D63103921C21A4E603003053&w=218&h=146&img.JPEG"    //小图url
        }
    });
};
