import Prefixer from 'utils/prefixer'
import * as config from 'config/action_types_config'

//解析配置，并返回各模块action类型
const types = {}
Object.keys(config).map(key => {
	types[key] = new Prefixer(key, config[key])
})

export default types