import React, {Component,PropTypes} from 'react'

import styles from './styles/index.less'

//样式模块化是否是必须
class NumPicker extends Component {


    static prevProps = {
        min:PropTypes.number,//input类型
        max:PropTypes.number,//input类型
        value:PropTypes.number,//input类型
        onChoose:PropTypes.func, //function类型
        onChange:PropTypes.func
    };

    static defaultProps = {
        min:1,//input类型
        max:99,//input类型
        value:0,//input类型
    };

    constructor (props) {
        super(props);
        let enable=true,v;
        if(props.max<=props.min) {
            enable=false;
        }
        if(props.value<=props.min){
            v = props.min;
        }
        if(props.value>=props.max){
            v = props.max;
        }
        //state属性
        this.state = {
            min:props.min, //input类型
            max:props.max, //input类型
            enable:props.enable || enable, //是否可用
            value:v//值
        }
    }

    handleDown(){
        let {value,min,enable} = this.state;
        if(!enable) return false;
        value--;
        if(value<min) {
            return false;
        }
        this.setState({
            value:value
        });
        this.props.onChange(value);
    }

    handleUp(){
        let {value,max,enable} = this.state;
        if(!enable) return false;
        value++;
        if(value>max) {
            return false;
        }
        this.setState({
            value:value
        });
        this.props.onChange(value);
    }

    changeHandle(v){
        let {min,max} =this.state;

        // if(v.length===0){
        //     v = 1;
        // }

        //存在 0x不会更新得情况
        const r = /^\+?[1-9][0-9]*$/;
        const flag = r.test(v);

        if(flag){
            if(v<=min){
                v = min;
            }
            if(v>=max){
                v = max;
            }
            this.setState({value:v});
            this.props.onChange(v);
        }else if(v.length === 0){
            this.setState({value:v});
            this.props.onChange(v);
        }
    }

    blurHandle(e){
        if(e.target.value<=0){
            this.setState({value:1});
            this.props.onChange(1);
        }
    }

    render() {
        let state = this.state;

        return (
            <div>
                <span className={styles.down+(state.value<=state.min?" "+styles.disabled:"")} onClick={(e)=>this.handleDown()}><i className="icon icon-jian"/></span>
                <input className={styles.ipt} type="number" value={state.value} onChange={(e)=>this.changeHandle(e.target.value)} onBlur={this.blurHandle.bind(this)} />
                <span className={styles.up+(state.value>=state.max?" "+styles.disabled:"")} onClick={(e)=>this.handleUp()}><i className="icon icon-jiahao1"/></span>
                {this.props.children}
            </div>
        )
    }
}




export default NumPicker;
