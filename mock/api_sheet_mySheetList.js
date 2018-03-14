
module.exports = (req, res) => {
    const query = req.query;
    if(query.status==0){
        res.json({
            "status": "success",
            "info": "查询成功",
            "data": {
                "totalCount":100,//总记录数
                "page":query.page || 1,//当前页码
                "pageSize":5,//每页显示记录数
                "datas" : (function(k){
                      var arr=[];
                      for(var i=0;i<k;i++){
                          arr.push(  {
                              "id" : i+1,                              // 工单id
                              "sheetNum"  : "20170728001",           // 工单单号
                              "barName" : "盛天网咖盛天网咖盛天网咖盛天网咖",                // 网吧名称
                              "thumbnailPicUrl" : "",                // 网吧缩略图url
                              "sheetTypeDisplay" : "新店出单",       // 工单类型
                              "createTime" : "2017-07-28 09:24:55",  // 提单时间
                              "status" :  [0,1,2,3,4,5,6][Math.random(6)*6|0],                        // 工单状态，0表示待接单，1表示已接单，2表示已驳回，3表示驳回重提待接单，4表示审核通过，5表示审核未通过，6表示已删除
                              "statusDisplay" : "待接单",            // 工单状态对应的描述
                              "approveWord" : "网吧规模不符",       // 审批寄语
                              "yiLiCoin" : "20"                      // 该工单审批通过发放的易力币
                          })
                      }
                      return arr;
                })(5)
            }
        });
    }else if(query.status==1){
        res.json({
            "status": "success",
            "info": "查询成功",
            "data": {
                "totalCount":1,//总记录数
                "page":1,//当前页码
                "pageSize":5,//每页显示记录数
                "datas" : (function(k){
                    var arr=[];
                    for(var i=0;i<k;i++){
                        arr.push(  {
                            "id" : i+1,                              // 工单id
                            "sheetNum"  : "20170728001",           // 工单单号
                            "barName" : "盛天网咖",                // 网吧名称
                            "thumbnailPicUrl" : "",                // 网吧缩略图url
                            "sheetTypeDisplay" : "新店出单",       // 工单类型
                            "createTime" : "2017-07-28 09:24:55",  // 提单时间
                            "status" : [0,1,2,3,4,5,6][Math.random(6)*6|0],                        // 工单状态，0表示待接单，1表示已接单，2表示已驳回，3表示驳回重提待接单，4表示审核通过，5表示审核未通过，6表示已删除
                            "statusDisplay" : "待接单",            // 工单状态对应的描述
                            "approveWord" : "网吧规模不符",       // 审批寄语
                            "yiLiCoin" : "20"                      // 该工单审批通过发放的易力币
                        })
                    }
                    return arr;
                })(1)
            }
        });
    }
    res.json({
        "status": "success",
        "info": "查询成功",
        "data": {
            "totalCount":0,//总记录数
            "page":1,//当前页码
            "pageSize":5,//每页显示记录数
            "datas" : []
        }
    });
};
