import Prefixer from 'utils/prefixer'
import * as config from 'config/api_config'

//解析配置，并返回各模块api
const api = {}
Object.keys(config).map(key => {
	api[key] = new Prefixer('', config[key])
})

export default api