
module.exports = (req, res) => {
    res.json({
        "status": "success",
        "info": "查询成功",
            "data": {
                "id" : 1,                              // 工单id
                "sheetNum"  : "20170728001",           // 工单单号
                "gid"  : 123,                          // 网吧gid
                "barName" : "盛天网咖",                // 网吧名称
                "businessType" : 0,                    // 业务类型，0表示桌标业务
                "sheetType":0,
                "businessTypeDisplay" : "桌标业务",    // 业务类型描述
                "enableDate" : "2017-07-25",           // 开通日期
                "barPhotoInfo" : {
                    "pic1Url" : "",                   // 网吧第一张照片url
                    "pic1ThumbnailUrl" : "",          // 网吧第一张照片小图url
                    "pic1Address"	: "",            // 网吧第一张照片拍摄地点
                    "pic1Time"		: "",	         // 网吧第一张照片拍摄时间
                    "pic2Url" : "",                   // 网吧第二张照片url
                    "pic2ThumbnailUrl" : "",          // 网吧第二张照片小图url
                    "pic2Address"	: "",            // 网吧第二张照片拍摄地点
                    "pic2Time"		: "",	         // 网吧第二张照片拍摄时间
                    "pic3Url" : "",                   // 网吧第三张照片url
                    "pic3ThumbnailUrl" : "",          // 网吧第三张照片小图url
                    "pic3Address"	: "",            // 网吧第三张照片拍摄地点
                    "pic3Time"		: "",	         // 网吧第三张照片拍摄时间
                },
                "createTime" : "2017-07-28 09:24:55",  // 提单时间
                "status" :   0,                        // 工单状态，0表示待接单，1表示已接单，2表示已驳回，3表示驳回重提待接单，4表示审核通过，5表示审核未通过，6表示已删除
                "statusDisplay" : "待接单",            // 工单状态对应的描述
             "approve_word" : "网吧规模不符"        // 审批寄语
        }
    });
};
