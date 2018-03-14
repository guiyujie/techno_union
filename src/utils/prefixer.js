//自动添加前缀
//如： USER.LIST => USER_LIST
class Prefixer {
    //添加prefix 配置,默认为key
	constructor(prefix, values) {
		this.prefix = prefix? `${prefix}_`:'';
		this.values = values || {}
	}

	get(key){

        return this.values && this.values[key]?this.prefix+this.values[key]: null;
        /*
        let v;
        key = (key || '').trim().toUpperCase();
        return this.values && this.values[key]? (this.values[key]===(v=this.values[key].replace(/{(\S+)}/,'$1'))?this.prefix+this.values[key]:v): null
        */
	}
}

export default Prefixer
