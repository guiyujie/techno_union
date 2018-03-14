module.exports = (req, res) => {
	res.json({
        "status": "success",
        "info": "查询成功",
        "data": {
            "provinceList": {//省份列表
                "0": [
                    {
                        "id": 1,//省份id
                        "name": "湖北省",//省份名称
                        "level": 1,//级别，1为省，直辖市，2为地级市，3为县，县级市，区
                        "pid": 0//父id，省份为顶级，故父id为0
                    }
                ]
            },
            "cityList": {
                "1": [
                    {
                        "id": 8,//城市id
                        "name": "武汉市",//城市名称
                        "level": 2,//级别，1为省，直辖市，2为地级市，3为县，县级市，区
                        "pid": 1//父id，即所属省份id
                    }
                ]
            },
            "countyList": {
                "8": [
                    {
                        "id": 18,//县市区id
                        "name": "江岸区",//县市区名称
                        "level": 3,//级别，1为省，直辖市，2为地级市，3为县，县级市，区
                        "pid": 8//父id，即所属城市id
                    }
                ]
            }
        }
    });

}
