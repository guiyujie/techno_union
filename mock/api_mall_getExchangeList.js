//记录列表页
module.exports = (req, res) => {
    const query = req.query;
    setTimeout(function() {
        res.json({
            "status": "success",
            "info": "查询成功",
            "data": {
                "datas": [{
                    "eId": 80182,
                    "eOrderId": "20170809181707AQUIJY",
                    "pId": 187,
                    "passport": "wx_52311140451874",
                    "uid": 30990370,
                    "uType": "STNTS",
                    "eType": "VIRTUAL_EXCHANGE",
                    "returnUrl": null,
                    "notifyUrl": null,
                    "createDate": "2017-08-09 18:17:07",
                    "addressId": null,
                    "exchangeStatuses": [{
                        "eId": 80182,
                        "bId": 34,
                        "biId": 20,
                        "exchangeBusinessStatus": "SEND_SUCCESS",
                        "exchangeMsg": "消费易力币成功",
                        "exchangeBusinessNum": 2,
                        "exchangeBusinessCount": null,
                        "createDate": 1502273827000,
                        "business": {
                            "bId": 34,
                            "bName": "技易联盟",
                            "bCode": "jylm",
                            "bStatus": "NORMAL",
                            "appid": "technounion-api",
                            "signKey": "T%^C&UNION*@#$!)",
                            "notifyUrl": "暂时不可用",
                            "createDate": 1501145319000,
                            "lastModifyTime": 1501840866000,
                            "businessItem": null
                        },
                        "businessItem": {
                            "biId": 20,
                            "bId": 34,
                            "biName": "易力币",
                            "biStatus": "NORMAL",
                            "createDate": 1501145352000,
                            "productExchangeNum": null
                        }
                    }],
                    "product": {
                        "pId": 187,
                        "pName": "充值卡",
                        "pAliasName": "",
                        "pType": "RECHARGECARD",
                        "pStatus": "NORMAL",
                        "vipType": "UN_VIP",
                        "eVipLowestLevel": 0,
                        "eVipHighestLevel": 0,
                        "originalPrice": null,
                        "presentPrice": null,
                        "stock": 1190,
                        "description": "<p>充值卡<br /><\/p>",
                        "createDate": 1502248573000,
                        "lastModify": 1502262908000,
                        "enabledEndDate": null,
                        "checkNum": 50,
                        "exchangeNum": 10,
                        "limitNum": 0,
                        "exchangeArea": "0",
                        "icon": "http://ucmall.stnts.com/img/default/20170809/c387e72e-a5a3-45ac-9f32-075657cbd2fa.png",
                        "limitStartDate": null,
                        "attributes": [{
                            "pid": 187,
                            "attributeKey": "ICON",
                            "attributeDefaultV": "default/20170809/c387e72e-a5a3-45ac-9f32-075657cbd2fa.png",
                            "attributeNumV": 0,
                            "attributeDoubleV": null,
                            "createDate": "2017-08-09 15:15:03"
                        },
                            {
                                "pid": 187,
                                "attributeKey": "EXCHANGE_ITEM",
                                "attributeDefaultV": "20",
                                "attributeNumV": 2,
                                "attributeDoubleV": null,
                                "createDate": "2017-08-09 15:15:03"
                            }]
                    },
                    "orderStatus": "SEND_SUCCESS",
                    "ordStatus": "2",
                    "exchangeBusinessCount": 1,
                    "shoppingMallOrderAddress": null,
                    "vCode": [{
                        "id": 5864,
                        "pid": 187,
                        "cardNo": "aaaaa8400009",
                        "cardPwd": "bbb8111111111",
                        "uid": "30990370",
                        "createTime": "2017-08-09 11:16:39.0",
                        "updateTime": "2017-08-09 11:16:39.0",
                        "orderId": "20170809181707AQUIJY",
                        "type": "1"
                    }],
                    "ip": null,
                    "province": null,
                    "phone": null,
                    "email": null,
                    "isLock": "0",
                    "bCode": null,
                    "express": null,
                    "bSource": null
                },
                    {
                        "eId": 80181,
                        "eOrderId": "20170809181704HRGNKI",
                        "pId": 187,
                        "passport": "wx_52311140451874",
                        "uid": 30990370,
                        "uType": "STNTS",
                        "eType": "VIRTUAL_EXCHANGE",
                        "returnUrl": null,
                        "notifyUrl": null,
                        "createDate": "2017-08-09 18:17:04",
                        "addressId": null,
                        "exchangeStatuses": [{
                            "eId": 80181,
                            "bId": 34,
                            "biId": 20,
                            "exchangeBusinessStatus": "SEND_SUCCESS",
                            "exchangeMsg": "消费易力币成功",
                            "exchangeBusinessNum": 2,
                            "exchangeBusinessCount": null,
                            "createDate": 1502273824000,
                            "business": {
                                "bId": 34,
                                "bName": "技易联盟",
                                "bCode": "jylm",
                                "bStatus": "NORMAL",
                                "appid": "technounion-api",
                                "signKey": "T%^C&UNION*@#$!)",
                                "notifyUrl": "暂时不可用",
                                "createDate": 1501145319000,
                                "lastModifyTime": 1501840866000,
                                "businessItem": null
                            },
                            "businessItem": {
                                "biId": 20,
                                "bId": 34,
                                "biName": "易力币",
                                "biStatus": "NORMAL",
                                "createDate": 1501145352000,
                                "productExchangeNum": null
                            }
                        }],
                        "product": {
                            "pId": 187,
                            "pName": "充值卡",
                            "pAliasName": "",
                            "pType": "RECHARGECARD",
                            "pStatus": "NORMAL",
                            "vipType": "UN_VIP",
                            "eVipLowestLevel": 0,
                            "eVipHighestLevel": 0,
                            "originalPrice": null,
                            "presentPrice": null,
                            "stock": 1190,
                            "description": "<p>充值卡<br /><\/p>",
                            "createDate": 1502248573000,
                            "lastModify": 1502262908000,
                            "enabledEndDate": null,
                            "checkNum": 50,
                            "exchangeNum": 10,
                            "limitNum": 0,
                            "exchangeArea": "0",
                            "icon": "http://ucmall.stnts.com/img/default/20170809/c387e72e-a5a3-45ac-9f32-075657cbd2fa.png",
                            "limitStartDate": null,
                            "attributes": [{
                                "pid": 187,
                                "attributeKey": "ICON",
                                "attributeDefaultV": "default/20170809/c387e72e-a5a3-45ac-9f32-075657cbd2fa.png",
                                "attributeNumV": 0,
                                "attributeDoubleV": null,
                                "createDate": "2017-08-09 15:15:03"
                            },
                                {
                                    "pid": 187,
                                    "attributeKey": "EXCHANGE_ITEM",
                                    "attributeDefaultV": "20",
                                    "attributeNumV": 2,
                                    "attributeDoubleV": null,
                                    "createDate": "2017-08-09 15:15:03"
                                }]
                        },
                        "orderStatus": "SEND_SUCCESS",
                        "ordStatus": "2",
                        "exchangeBusinessCount": 1,
                        "shoppingMallOrderAddress": null,
                        "vCode": [{
                            "id": 5863,
                            "pid": 187,
                            "cardNo": "aaaaa8400008",
                            "cardPwd": "bbb8111111111",
                            "uid": "30990370",
                            "createTime": "2017-08-09 11:16:39.0",
                            "updateTime": "2017-08-09 11:16:39.0",
                            "orderId": "20170809181704HRGNKI",
                            "type": "1"
                        }],
                        "ip": null,
                        "province": null,
                        "phone": null,
                        "email": null,
                        "isLock": "0",
                        "bCode": null,
                        "express": null,
                        "bSource": null
                    },
                    {
                        "eId": 80180,
                        "eOrderId": "20170809181700CSPEXT",
                        "pId": 187,
                        "passport": "wx_52311140451874",
                        "uid": 30990370,
                        "uType": "STNTS",
                        "eType": "VIRTUAL_EXCHANGE",
                        "returnUrl": null,
                        "notifyUrl": null,
                        "createDate": "2017-08-09 18:17:00",
                        "addressId": null,
                        "exchangeStatuses": [{
                            "eId": 80180,
                            "bId": 34,
                            "biId": 20,
                            "exchangeBusinessStatus": "SEND_SUCCESS",
                            "exchangeMsg": "消费易力币成功",
                            "exchangeBusinessNum": 2,
                            "exchangeBusinessCount": null,
                            "createDate": 1502273820000,
                            "business": {
                                "bId": 34,
                                "bName": "技易联盟",
                                "bCode": "jylm",
                                "bStatus": "NORMAL",
                                "appid": "technounion-api",
                                "signKey": "T%^C&UNION*@#$!)",
                                "notifyUrl": "暂时不可用",
                                "createDate": 1501145319000,
                                "lastModifyTime": 1501840866000,
                                "businessItem": null
                            },
                            "businessItem": {
                                "biId": 20,
                                "bId": 34,
                                "biName": "易力币",
                                "biStatus": "NORMAL",
                                "createDate": 1501145352000,
                                "productExchangeNum": null
                            }
                        }],
                        "product": {
                            "pId": 187,
                            "pName": "充值卡",
                            "pAliasName": "",
                            "pType": "RECHARGECARD",
                            "pStatus": "NORMAL",
                            "vipType": "UN_VIP",
                            "eVipLowestLevel": 0,
                            "eVipHighestLevel": 0,
                            "originalPrice": null,
                            "presentPrice": null,
                            "stock": 1190,
                            "description": "<p>充值卡<br /><\/p>",
                            "createDate": 1502248573000,
                            "lastModify": 1502262908000,
                            "enabledEndDate": null,
                            "checkNum": 50,
                            "exchangeNum": 10,
                            "limitNum": 0,
                            "exchangeArea": "0",
                            "icon": "http://ucmall.stnts.com/img/default/20170809/c387e72e-a5a3-45ac-9f32-075657cbd2fa.png",
                            "limitStartDate": null,
                            "attributes": [{
                                "pid": 187,
                                "attributeKey": "ICON",
                                "attributeDefaultV": "default/20170809/c387e72e-a5a3-45ac-9f32-075657cbd2fa.png",
                                "attributeNumV": 0,
                                "attributeDoubleV": null,
                                "createDate": "2017-08-09 15:15:03"
                            },
                                {
                                    "pid": 187,
                                    "attributeKey": "EXCHANGE_ITEM",
                                    "attributeDefaultV": "20",
                                    "attributeNumV": 2,
                                    "attributeDoubleV": null,
                                    "createDate": "2017-08-09 15:15:03"
                                }]
                        },
                        "orderStatus": "SEND_SUCCESS",
                        "ordStatus": "2",
                        "exchangeBusinessCount": 1,
                        "shoppingMallOrderAddress": null,
                        "vCode": [{
                            "id": 5862,
                            "pid": 187,
                            "cardNo": "aaaaa8400007",
                            "cardPwd": "bbb8111111111",
                            "uid": "30990370",
                            "createTime": "2017-08-09 11:16:39.0",
                            "updateTime": "2017-08-09 11:16:39.0",
                            "orderId": "20170809181700CSPEXT",
                            "type": "1"
                        }],
                        "ip": null,
                        "province": null,
                        "phone": null,
                        "email": null,
                        "isLock": "0",
                        "bCode": null,
                        "express": null,
                        "bSource": null
                    },
                    {
                        "eId": 80179,
                        "eOrderId": "20170809181656MHYYMI",
                        "pId": 187,
                        "passport": "wx_52311140451874",
                        "uid": 30990370,
                        "uType": "STNTS",
                        "eType": "VIRTUAL_EXCHANGE",
                        "returnUrl": null,
                        "notifyUrl": null,
                        "createDate": "2017-08-09 18:16:56",
                        "addressId": null,
                        "exchangeStatuses": [{
                            "eId": 80179,
                            "bId": 34,
                            "biId": 20,
                            "exchangeBusinessStatus": "SEND_SUCCESS",
                            "exchangeMsg": "消费易力币成功",
                            "exchangeBusinessNum": 2,
                            "exchangeBusinessCount": null,
                            "createDate": 1502273816000,
                            "business": {
                                "bId": 34,
                                "bName": "技易联盟",
                                "bCode": "jylm",
                                "bStatus": "NORMAL",
                                "appid": "technounion-api",
                                "signKey": "T%^C&UNION*@#$!)",
                                "notifyUrl": "暂时不可用",
                                "createDate": 1501145319000,
                                "lastModifyTime": 1501840866000,
                                "businessItem": null
                            },
                            "businessItem": {
                                "biId": 20,
                                "bId": 34,
                                "biName": "易力币",
                                "biStatus": "NORMAL",
                                "createDate": 1501145352000,
                                "productExchangeNum": null
                            }
                        }],
                        "product": {
                            "pId": 187,
                            "pName": "充值卡",
                            "pAliasName": "",
                            "pType": "RECHARGECARD",
                            "pStatus": "NORMAL",
                            "vipType": "UN_VIP",
                            "eVipLowestLevel": 0,
                            "eVipHighestLevel": 0,
                            "originalPrice": null,
                            "presentPrice": null,
                            "stock": 1190,
                            "description": "<p>充值卡<br /><\/p>",
                            "createDate": 1502248573000,
                            "lastModify": 1502262908000,
                            "enabledEndDate": null,
                            "checkNum": 50,
                            "exchangeNum": 10,
                            "limitNum": 0,
                            "exchangeArea": "0",
                            "icon": "http://ucmall.stnts.com/img/default/20170809/c387e72e-a5a3-45ac-9f32-075657cbd2fa.png",
                            "limitStartDate": null,
                            "attributes": [{
                                "pid": 187,
                                "attributeKey": "ICON",
                                "attributeDefaultV": "default/20170809/c387e72e-a5a3-45ac-9f32-075657cbd2fa.png",
                                "attributeNumV": 0,
                                "attributeDoubleV": null,
                                "createDate": "2017-08-09 15:15:03"
                            },
                                {
                                    "pid": 187,
                                    "attributeKey": "EXCHANGE_ITEM",
                                    "attributeDefaultV": "20",
                                    "attributeNumV": 2,
                                    "attributeDoubleV": null,
                                    "createDate": "2017-08-09 15:15:03"
                                }]
                        },
                        "orderStatus": "SEND_SUCCESS",
                        "ordStatus": "2",
                        "exchangeBusinessCount": 1,
                        "shoppingMallOrderAddress": null,
                        "vCode": [{
                            "id": 5861,
                            "pid": 187,
                            "cardNo": "aaaaa8400006",
                            "cardPwd": "bbb8111111111",
                            "uid": "30990370",
                            "createTime": "2017-08-09 11:16:39.0",
                            "updateTime": "2017-08-09 11:16:39.0",
                            "orderId": "20170809181656MHYYMI",
                            "type": "1"
                        }],
                        "ip": null,
                        "province": null,
                        "phone": null,
                        "email": null,
                        "isLock": "0",
                        "bCode": null,
                        "express": null,
                        "bSource": null
                    }
                    ],
                "pagination": {
                    "totalRows": 7,
                    "curPage": query.page || 1,//当前页码
                    "pageSize": 4,
                    "maxPage": 2,
                    "startRowIdx": 0,
                    "endRowIdx": 3,
                    "list": [],
                    "firstPage": true,
                    "lastPage": false,
                    "displayingPages": [1, 2]
                },
                "totalDisplayRecords": null,
                "totalRecords": null
            }
        })
    },500)
}


