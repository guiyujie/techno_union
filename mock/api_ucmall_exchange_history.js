//记录列表页
module.exports = (req, res) => {
    setTimeout(function() {
        res.json({
        "info": "获取成功",
        "status": "success",
        "data": {
            "datas": [
                {
                    "eId": 82460,
                    "eOrderId": "20170504140255PDQLLA",
                    "pId": 108,
                    "passport": "st_96862912803009",
                    "uid": 55598289,
                    "uType": "STNTS",
                    "eType": "VIRTUAL_EXCHANGE",
                    "returnUrl": null,
                    "notifyUrl": null,
                    "createDate": "2017-05-04 14:02:55",
                    "addressId": null,
                    "exchangeStatuses": [
                        {
                            "eId": 82460,
                            "bId": 30,
                            "biId": 17,
                            "exchangeBusinessStatus": "SEND_SUCCESS",
                            "exchangeMsg": "消费积分成功",
                            "exchangeBusinessNum": 188,
                            "exchangeBusinessCount": null,
                            "createDate": 1493877775000,
                            "business": {
                                "bId": 30,
                                "bName": "用户中心",
                                "bCode": "UC",
                                "bStatus": "NORMAL",
                                "appid": "ucmall_api",
                                "signKey": "#user&mall%2016$",
                                "notifyUrl": "暂时不可用",
                                "createDate": 1471919546000,
                                "lastModifyTime": 1471919546000,
                                "businessItem": null
                            },
                            "businessItem": {
                                "biId": 17,
                                "bId": 30,
                                "biName": "盛天积分",
                                "biStatus": "NORMAL",
                                "createDate": 1471919779000,
                                "productExchangeNum": null
                            }
                        }
                    ],
                    "product": {
                        "pId": 108,
                        "pName": "KK竞技豪华礼包",
                        "pAliasName": "",
                        "pType": "VIRTUAL",
                        "pStatus": "NORMAL",
                        "vipType": null,
                        "eVipLowestLevel": 0,
                        "eVipHighestLevel": 0,
                        "originalPrice": null,
                        "presentPrice": null,
                        "stock": 899,
                        "description": "<p>【商品介绍】<br /></p><p> 礼包内容：<br /></p><ul class=\" list-paddingleft-2\" style=\"list-style-type:disc;\"><li><p>100 英雄联盟点卷</p></li><li><p>1 Q币</p></li><li><p>10000 K币</p></li><li><p>5个珍珠</p></li><li><p>大转盘抽奖一次</p></li></ul><p>【使用说明】</p><ol class=\" list-paddingleft-2\" style=\"list-style-type:decimal;\"><li><p>领取礼包卡号后进入KK竞技官网 - 帐号充值 - 礼包兑换中心 http://pay.kkvs.com/Pay/cdk/index.aspx</p></li><li><p>兑换成功后，进入游戏查看背包</p></li><li><p> 如有任何疑问，联系KK竞技官网在线客服 www.kkvs.com</p></li></ol><p><br /></p><p><br /></p>",
                        "createDate": 1471921169000,
                        "lastModify": 1487314055000,
                        "enabledEndDate": null,
                        "checkNum": 8099,
                        "exchangeNum": 601,
                        "limitNum": 0,
                        "exchangeArea": "0",
                        "icon": "https://ucmall-img.stnts.com/img/default/20160823/a351a26b-1f28-4a5a-bdcd-162ad66b22e0.jpg",
                        "limitStartDate": null,
                        "attributes": [
                            {
                                "pid": 108,
                                "attributeKey": "ICON",
                                "attributeDefaultV": "default/20160823/a351a26b-1f28-4a5a-bdcd-162ad66b22e0.jpg",
                                "attributeNumV": 0,
                                "attributeDoubleV": null,
                                "createDate": "2017-02-17 14:47:23"
                            },
                            {
                                "pid": 108,
                                "attributeKey": "EXCHANGE_ITEM",
                                "attributeDefaultV": "17",
                                "attributeNumV": 188,
                                "attributeDoubleV": null,
                                "createDate": "2017-02-17 14:47:23"
                            }
                        ]
                    },
                    "orderStatus": "SEND_SUCCESS",
                    "ordStatus": "2",
                    "exchangeBusinessCount": 1,
                    "shoppingMallOrderAddress": null,
                    "vCode": [
                        {
                            "id": 1122,
                            "pid": 108,
                            "cardNo": "3E66A847",
                            "cardPwd": null,
                            "uid": "55598289",
                            "createTime": "2016-08-26 11:51:53.0",
                            "updateTime": "2016-08-26 11:51:53.0",
                            "orderId": "20170504140255PDQLLA",
                            "type": "2"
                        },
                        {
                            "id": 1121,
                            "pid": 108,
                            "cardNo": "3E66A847",
                            "cardPwd": null,
                            "uid": "55598289",
                            "createTime": "2016-08-26 11:51:53.0",
                            "updateTime": "2016-08-26 11:51:53.0",
                            "orderId": "20170504140255PDQLLA",
                            "type": "2"
                        },
                        {
                            "id": 1123,
                            "pid": 108,
                            "cardNo": "3E66A847",
                            "cardPwd": null,
                            "uid": "55598289",
                            "createTime": "2016-08-26 11:51:53.0",
                            "updateTime": "2016-08-26 11:51:53.0",
                            "orderId": "20170504140255PDQLLA",
                            "type": "2"
                        },
                        {
                            "id": 1124,
                            "pid": 108,
                            "cardNo": "3E66A847",
                            "cardPwd": null,
                            "uid": "55598289",
                            "createTime": "2016-08-26 11:51:53.0",
                            "updateTime": "2016-08-26 11:51:53.0",
                            "orderId": "20170504140255PDQLLA",
                            "type": "2"
                        }
                    ],
                    "ip": "218.60.25.102",
                    "province": "辽宁省沈阳市",
                    "phone": "18627820508",
                    "email": "null",
                    "isLock": "0",
                    "bCode": null,
                    "express": null,
                    "bSource": "wechat"
                },
                {
                    "eId": 82460,
                    "eOrderId": "20170504140255PDQLLA",
                    "pId": 108,
                    "passport": "st_96862912803009",
                    "uid": 55598289,
                    "uType": "STNTS",
                    "eType": "VIRTUAL_EXCHANGE",
                    "returnUrl": null,
                    "notifyUrl": null,
                    "createDate": "2017-05-04 14:02:55",
                    "addressId": null,
                    "exchangeStatuses": [
                        {
                            "eId": 82460,
                            "bId": 30,
                            "biId": 17,
                            "exchangeBusinessStatus": "SEND_SUCCESS",
                            "exchangeMsg": "消费积分成功",
                            "exchangeBusinessNum": 188,
                            "exchangeBusinessCount": null,
                            "createDate": 1493877775000,
                            "business": {
                                "bId": 30,
                                "bName": "用户中心",
                                "bCode": "UC",
                                "bStatus": "NORMAL",
                                "appid": "ucmall_api",
                                "signKey": "#user&mall%2016$",
                                "notifyUrl": "暂时不可用",
                                "createDate": 1471919546000,
                                "lastModifyTime": 1471919546000,
                                "businessItem": null
                            },
                            "businessItem": {
                                "biId": 17,
                                "bId": 30,
                                "biName": "盛天积分",
                                "biStatus": "NORMAL",
                                "createDate": 1471919779000,
                                "productExchangeNum": null
                            }
                        }
                    ],
                    "product": {
                        "pId": 108,
                        "pName": "KK竞技豪华礼包",
                        "pAliasName": "",
                        "pType": "VIRTUAL",
                        "pStatus": "NORMAL",
                        "vipType": null,
                        "eVipLowestLevel": 0,
                        "eVipHighestLevel": 0,
                        "originalPrice": null,
                        "presentPrice": null,
                        "stock": 899,
                        "description": "<p>【商品介绍】<br /></p><p> 礼包内容：<br /></p><ul class=\" list-paddingleft-2\" style=\"list-style-type:disc;\"><li><p>100 英雄联盟点卷</p></li><li><p>1 Q币</p></li><li><p>10000 K币</p></li><li><p>5个珍珠</p></li><li><p>大转盘抽奖一次</p></li></ul><p>【使用说明】</p><ol class=\" list-paddingleft-2\" style=\"list-style-type:decimal;\"><li><p>领取礼包卡号后进入KK竞技官网 - 帐号充值 - 礼包兑换中心 http://pay.kkvs.com/Pay/cdk/index.aspx</p></li><li><p>兑换成功后，进入游戏查看背包</p></li><li><p> 如有任何疑问，联系KK竞技官网在线客服 www.kkvs.com</p></li></ol><p><br /></p><p><br /></p>",
                        "createDate": 1471921169000,
                        "lastModify": 1487314055000,
                        "enabledEndDate": null,
                        "checkNum": 8099,
                        "exchangeNum": 601,
                        "limitNum": 0,
                        "exchangeArea": "0",
                        "icon": "https://ucmall-img.stnts.com/img/default/20160823/a351a26b-1f28-4a5a-bdcd-162ad66b22e0.jpg",
                        "limitStartDate": null,
                        "attributes": [
                            {
                                "pid": 108,
                                "attributeKey": "ICON",
                                "attributeDefaultV": "default/20160823/a351a26b-1f28-4a5a-bdcd-162ad66b22e0.jpg",
                                "attributeNumV": 0,
                                "attributeDoubleV": null,
                                "createDate": "2017-02-17 14:47:23"
                            },
                            {
                                "pid": 108,
                                "attributeKey": "EXCHANGE_ITEM",
                                "attributeDefaultV": "17",
                                "attributeNumV": 188,
                                "attributeDoubleV": null,
                                "createDate": "2017-02-17 14:47:23"
                            }
                        ]
                    },
                    "orderStatus": "SEND_SUCCESS",
                    "ordStatus": "2",
                    "exchangeBusinessCount": 1,
                    "shoppingMallOrderAddress": null,
                    "vCode": [
                        {
                            "id": 1122,
                            "pid": 108,
                            "cardNo": "3E66A847",
                            "cardPwd": null,
                            "uid": "55598289",
                            "createTime": "2016-08-26 11:51:53.0",
                            "updateTime": "2016-08-26 11:51:53.0",
                            "orderId": "20170504140255PDQLLA",
                            "type": "2"
                        },
                        {
                            "id": 1121,
                            "pid": 108,
                            "cardNo": "3E66A847",
                            "cardPwd": null,
                            "uid": "55598289",
                            "createTime": "2016-08-26 11:51:53.0",
                            "updateTime": "2016-08-26 11:51:53.0",
                            "orderId": "20170504140255PDQLLA",
                            "type": "2"
                        },
                        {
                            "id": 1123,
                            "pid": 108,
                            "cardNo": "3E66A847",
                            "cardPwd": null,
                            "uid": "55598289",
                            "createTime": "2016-08-26 11:51:53.0",
                            "updateTime": "2016-08-26 11:51:53.0",
                            "orderId": "20170504140255PDQLLA",
                            "type": "2"
                        },
                        {
                            "id": 1124,
                            "pid": 108,
                            "cardNo": "3E66A847",
                            "cardPwd": null,
                            "uid": "55598289",
                            "createTime": "2016-08-26 11:51:53.0",
                            "updateTime": "2016-08-26 11:51:53.0",
                            "orderId": "20170504140255PDQLLA",
                            "type": "2"
                        }
                    ],
                    "ip": "218.60.25.102",
                    "province": "辽宁省沈阳市",
                    "phone": "18627820508",
                    "email": "null",
                    "isLock": "0",
                    "bCode": null,
                    "express": null,
                    "bSource": "wechat"
                },
                {
                    "eId": 82460,
                    "eOrderId": "20170504140255PDQLLA",
                    "pId": 108,
                    "passport": "st_96862912803009",
                    "uid": 55598289,
                    "uType": "STNTS",
                    "eType": "VIRTUAL_EXCHANGE",
                    "returnUrl": null,
                    "notifyUrl": null,
                    "createDate": "2017-05-04 14:02:55",
                    "addressId": null,
                    "exchangeStatuses": [
                        {
                            "eId": 82460,
                            "bId": 30,
                            "biId": 17,
                            "exchangeBusinessStatus": "SEND_SUCCESS",
                            "exchangeMsg": "消费积分成功",
                            "exchangeBusinessNum": 188,
                            "exchangeBusinessCount": null,
                            "createDate": 1493877775000,
                            "business": {
                                "bId": 30,
                                "bName": "用户中心",
                                "bCode": "UC",
                                "bStatus": "NORMAL",
                                "appid": "ucmall_api",
                                "signKey": "#user&mall%2016$",
                                "notifyUrl": "暂时不可用",
                                "createDate": 1471919546000,
                                "lastModifyTime": 1471919546000,
                                "businessItem": null
                            },
                            "businessItem": {
                                "biId": 17,
                                "bId": 30,
                                "biName": "盛天积分",
                                "biStatus": "NORMAL",
                                "createDate": 1471919779000,
                                "productExchangeNum": null
                            }
                        }
                    ],
                    "product": {
                        "pId": 108,
                        "pName": "KK竞技豪华礼包",
                        "pAliasName": "",
                        "pType": "PHYSICAL",
                        "pStatus": "NORMAL",
                        "vipType": null,
                        "eVipLowestLevel": 0,
                        "eVipHighestLevel": 0,
                        "originalPrice": null,
                        "presentPrice": null,
                        "stock": 899,
                        "description": "<p>【商品介绍】<br /></p><p> 礼包内容：<br /></p><ul class=\" list-paddingleft-2\" style=\"list-style-type:disc;\"><li><p>100 英雄联盟点卷</p></li><li><p>1 Q币</p></li><li><p>10000 K币</p></li><li><p>5个珍珠</p></li><li><p>大转盘抽奖一次</p></li></ul><p>【使用说明】</p><ol class=\" list-paddingleft-2\" style=\"list-style-type:decimal;\"><li><p>领取礼包卡号后进入KK竞技官网 - 帐号充值 - 礼包兑换中心 http://pay.kkvs.com/Pay/cdk/index.aspx</p></li><li><p>兑换成功后，进入游戏查看背包</p></li><li><p> 如有任何疑问，联系KK竞技官网在线客服 www.kkvs.com</p></li></ol><p><br /></p><p><br /></p>",
                        "createDate": 1471921169000,
                        "lastModify": 1487314055000,
                        "enabledEndDate": null,
                        "checkNum": 8099,
                        "exchangeNum": 601,
                        "limitNum": 0,
                        "exchangeArea": "0",
                        "icon": "https://ucmall-img.stnts.com/img/default/20160823/a351a26b-1f28-4a5a-bdcd-162ad66b22e0.jpg",
                        "limitStartDate": null,
                        "attributes": [
                            {
                                "pid": 108,
                                "attributeKey": "ICON",
                                "attributeDefaultV": "default/20160823/a351a26b-1f28-4a5a-bdcd-162ad66b22e0.jpg",
                                "attributeNumV": 0,
                                "attributeDoubleV": null,
                                "createDate": "2017-02-17 14:47:23"
                            },
                            {
                                "pid": 108,
                                "attributeKey": "EXCHANGE_ITEM",
                                "attributeDefaultV": "17",
                                "attributeNumV": 188,
                                "attributeDoubleV": null,
                                "createDate": "2017-02-17 14:47:23"
                            }
                        ]
                    },
                    "orderStatus": "SEND_SUCCESS",
                    "ordStatus": "2",
                    "exchangeBusinessCount": 1,
                    "shoppingMallOrderAddress": null,
                    "vCode": [
                        {
                            "id": 1122,
                            "pid": 108,
                            "cardNo": "3E66A847",
                            "cardPwd": null,
                            "uid": "55598289",
                            "createTime": "2016-08-26 11:51:53.0",
                            "updateTime": "2016-08-26 11:51:53.0",
                            "orderId": "20170504140255PDQLLA",
                            "type": "2"
                        },
                        {
                            "id": 1121,
                            "pid": 108,
                            "cardNo": "3E66A847",
                            "cardPwd": null,
                            "uid": "55598289",
                            "createTime": "2016-08-26 11:51:53.0",
                            "updateTime": "2016-08-26 11:51:53.0",
                            "orderId": "20170504140255PDQLLA",
                            "type": "2"
                        },
                        {
                            "id": 1123,
                            "pid": 108,
                            "cardNo": "3E66A847",
                            "cardPwd": null,
                            "uid": "55598289",
                            "createTime": "2016-08-26 11:51:53.0",
                            "updateTime": "2016-08-26 11:51:53.0",
                            "orderId": "20170504140255PDQLLA",
                            "type": "2"
                        },
                        {
                            "id": 1124,
                            "pid": 108,
                            "cardNo": "3E66A847",
                            "cardPwd": null,
                            "uid": "55598289",
                            "createTime": "2016-08-26 11:51:53.0",
                            "updateTime": "2016-08-26 11:51:53.0",
                            "orderId": "20170504140255PDQLLA",
                            "type": "2"
                        }
                    ],
                    "ip": "218.60.25.102",
                    "province": "辽宁省沈阳市",
                    "phone": "18627820508",
                    "email": "null",
                    "isLock": "0",
                    "bCode": null,
                    "express": null,
                    "bSource": "wechat"
                },
                {
                    "eId": 82460,
                    "eOrderId": "20170504140255PDQLLA",
                    "pId": 108,
                    "passport": "st_96862912803009",
                    "uid": 55598289,
                    "uType": "STNTS",
                    "eType": "VIRTUAL_EXCHANGE",
                    "returnUrl": null,
                    "notifyUrl": null,
                    "createDate": "2017-05-04 14:02:55",
                    "addressId": null,
                    "exchangeStatuses": [
                        {
                            "eId": 82460,
                            "bId": 30,
                            "biId": 17,
                            "exchangeBusinessStatus": "SEND_SUCCESS",
                            "exchangeMsg": "消费积分成功",
                            "exchangeBusinessNum": 188,
                            "exchangeBusinessCount": null,
                            "createDate": 1493877775000,
                            "business": {
                                "bId": 30,
                                "bName": "用户中心",
                                "bCode": "UC",
                                "bStatus": "NORMAL",
                                "appid": "ucmall_api",
                                "signKey": "#user&mall%2016$",
                                "notifyUrl": "暂时不可用",
                                "createDate": 1471919546000,
                                "lastModifyTime": 1471919546000,
                                "businessItem": null
                            },
                            "businessItem": {
                                "biId": 17,
                                "bId": 30,
                                "biName": "盛天积分",
                                "biStatus": "NORMAL",
                                "createDate": 1471919779000,
                                "productExchangeNum": null
                            }
                        }
                    ],
                    "product": {
                        "pId": 108,
                        "pName": "KK竞技豪华礼包",
                        "pAliasName": "",
                        "pType": "PHYSICAL",
                        "pStatus": "NORMAL",
                        "vipType": null,
                        "eVipLowestLevel": 0,
                        "eVipHighestLevel": 0,
                        "originalPrice": null,
                        "presentPrice": null,
                        "stock": 899,
                        "description": "<p>【商品介绍】<br /></p><p> 礼包内容：<br /></p><ul class=\" list-paddingleft-2\" style=\"list-style-type:disc;\"><li><p>100 英雄联盟点卷</p></li><li><p>1 Q币</p></li><li><p>10000 K币</p></li><li><p>5个珍珠</p></li><li><p>大转盘抽奖一次</p></li></ul><p>【使用说明】</p><ol class=\" list-paddingleft-2\" style=\"list-style-type:decimal;\"><li><p>领取礼包卡号后进入KK竞技官网 - 帐号充值 - 礼包兑换中心 http://pay.kkvs.com/Pay/cdk/index.aspx</p></li><li><p>兑换成功后，进入游戏查看背包</p></li><li><p> 如有任何疑问，联系KK竞技官网在线客服 www.kkvs.com</p></li></ol><p><br /></p><p><br /></p>",
                        "createDate": 1471921169000,
                        "lastModify": 1487314055000,
                        "enabledEndDate": null,
                        "checkNum": 8099,
                        "exchangeNum": 601,
                        "limitNum": 0,
                        "exchangeArea": "0",
                        "icon": "https://ucmall-img.stnts.com/img/default/20160823/a351a26b-1f28-4a5a-bdcd-162ad66b22e0.jpg",
                        "limitStartDate": null,
                        "attributes": [
                            {
                                "pid": 108,
                                "attributeKey": "ICON",
                                "attributeDefaultV": "default/20160823/a351a26b-1f28-4a5a-bdcd-162ad66b22e0.jpg",
                                "attributeNumV": 0,
                                "attributeDoubleV": null,
                                "createDate": "2017-02-17 14:47:23"
                            },
                            {
                                "pid": 108,
                                "attributeKey": "EXCHANGE_ITEM",
                                "attributeDefaultV": "17",
                                "attributeNumV": 188,
                                "attributeDoubleV": null,
                                "createDate": "2017-02-17 14:47:23"
                            }
                        ]
                    },
                    "orderStatus": "SEND_SUCCESS",
                    "ordStatus": "2",
                    "exchangeBusinessCount": 1,
                    "shoppingMallOrderAddress": null,
                    "vCode": [
                        {
                            "id": 1122,
                            "pid": 108,
                            "cardNo": "3E66A847",
                            "cardPwd": null,
                            "uid": "55598289",
                            "createTime": "2016-08-26 11:51:53.0",
                            "updateTime": "2016-08-26 11:51:53.0",
                            "orderId": "20170504140255PDQLLA",
                            "type": "2"
                        },
                        {
                            "id": 1121,
                            "pid": 108,
                            "cardNo": "3E66A847",
                            "cardPwd": null,
                            "uid": "55598289",
                            "createTime": "2016-08-26 11:51:53.0",
                            "updateTime": "2016-08-26 11:51:53.0",
                            "orderId": "20170504140255PDQLLA",
                            "type": "2"
                        },
                        {
                            "id": 1123,
                            "pid": 108,
                            "cardNo": "3E66A847",
                            "cardPwd": null,
                            "uid": "55598289",
                            "createTime": "2016-08-26 11:51:53.0",
                            "updateTime": "2016-08-26 11:51:53.0",
                            "orderId": "20170504140255PDQLLA",
                            "type": "2"
                        },
                        {
                            "id": 1124,
                            "pid": 108,
                            "cardNo": "3E66A847",
                            "cardPwd": null,
                            "uid": "55598289",
                            "createTime": "2016-08-26 11:51:53.0",
                            "updateTime": "2016-08-26 11:51:53.0",
                            "orderId": "20170504140255PDQLLA",
                            "type": "2"
                        }
                    ],
                    "ip": "218.60.25.102",
                    "province": "辽宁省沈阳市",
                    "phone": "18627820508",
                    "email": "null",
                    "isLock": "0",
                    "bCode": null,
                    "express": {expressName: "中通快递", expressNo: "1234567"},
                    "bSource": "wechat"
                }
            ],
            "pagination": {
                "totalRows": 1,
                "curPage": 1,
                "pageSize": 12,
                "maxPage": 1,
                "startRowIdx": 0,
                "endRowIdx": 0,
                "list": [],
                "displayingPages": [
                    1
                ],
                "firstPage": true,
                "lastPage": true
            },
            "totalDisplayRecords": null,
            "totalRecords": null
        },
        "code": "200"
    })
    },500)
}


