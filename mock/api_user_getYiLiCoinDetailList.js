
module.exports = (req, res) => {
    const query = req.query;
    res.json({
	    "status": "success",
	    "info": "查询成功",
	    "data": {
	       "totalCount":100,
		   "page":query.page || 1,//当前页码
		   "pageSize":10,
		   "yiLiCoin":100,
		   "datas" : [
		      {
			    "flag" : 0,
			    "amount"  : 20,
			    "description" : "新店出单20170731001",
			    "createTime" : "2017-07-31 12:01:01"
			  },
               {
                   "flag" : 0,
                   "amount"  : 20,
                   "description" : "新店出单20170731001",
                   "createTime" : "2017-07-31 12:01:01"
               },
               {
                   "flag" : 0,
                   "amount"  : 20,
                   "description" : "新店出单20170731001",
                   "createTime" : "2017-07-31 12:01:01"
               },
               {
                   "flag" : 0,
                   "amount"  : 20,
                   "description" : "新店出单20170731001",
                   "createTime" : "2017-07-31 12:01:01"
               },
               {
                   "flag" : 0,
                   "amount"  : 20,
                   "description" : "新店出单20170731001",
                   "createTime" : "2017-07-31 12:01:01"
               },
               {
                   "flag" : 0,
                   "amount"  : 20,
                   "description" : "新店出单20170731001",
                   "createTime" : "2017-07-31 12:01:01"
               },
               {
                   "flag" : 0,
                   "amount"  : 20,
                   "description" : "新店出单20170731001",
                   "createTime" : "2017-07-31 12:01:01"
               },
               {
                   "flag" : 0,
                   "amount"  : 20,
                   "description" : "新店出单20170731001",
                   "createTime" : "2017-07-31 12:01:01"
               },
               {
                   "flag" : 0,
                   "amount"  : 20,
                   "description" : "新店出单20170731001",
                   "createTime" : "2017-07-31 12:01:01"
               },
               {
                   "flag" : 0,
                   "amount"  : 20,
                   "description" : "新店出单20170731001",
                   "createTime" : "2017-07-31 12:01:01"
               },
               {
                   "flag" : 0,
                   "amount"  : 20,
                   "description" : "新店出单20170731001",
                   "createTime" : "2017-07-31 12:01:01"
               },
               {
                   "flag" : 0,
                   "amount"  : 20,
                   "description" : "新店出单20170731001",
                   "createTime" : "2017-07-31 12:01:01"
               }

		   ]
		}
    });
}
