import React, {Component} from 'react'
import PropTypes from 'prop-types';
import styles from './styles/index.less'


//倒计时组件
class CountDown extends Component {

    static prevProps = {
        defalultLabel:PropTypes.string,//string类型
        normalLabel:PropTypes.string,//string类型
        timer:PropTypes.number,//input类型
        onCD:PropTypes.func,//点击验证按钮监听
    };

    static defaultProps = {
        defalultLabel:"获取验证码",
        normalLabel:"重新获取",
        timer:60,
    };

    constructor (props) {
        super(props);
        //state属性
        this.state = {
            defalultLabel:props.defalultLabel,
            normalLabel:props.normalLabel,
            timer:props.timer,   //验证码倒计时状态
            timering:false,     //是否在倒计时
            clicked:false,      //是否点击过
            disabled:this.props.disabled,
            enabled:true      //验证码能否点击
        }
    }

    //倒计时方法
    _codeTimeCountDown () {
        //开始CountDown
        this.setState({
            timering:true,
            enabled:false,
        });
        this.timer = setInterval(()=>{
            if(this.state.timer >= 0){
                this.setState({timer:this.state.timer-1});
            }else{
                clearInterval(this.timer);
                this.setState({timering:false,enabled:true,timer:this.props.timer,clicked:true});
            }
        },1000)
    }


    componentWillUnmount () {
        clearInterval(this.timer)
    }

    //点击行为处理
    handleClick(){
        if(!this.state.enabled) return false;
        //开始倒计时
        //此处为promise对象
        this.props.onCD().then((res) => {
            this._codeTimeCountDown();
        });
    }

    isEnable(){
        return (!this.props.disabled && this.state.enabled)
    }

    render() {
        return (
            <div className={this.isEnable()?"":styles.disabled} onClick={(e)=>{this.handleClick()}}>
                {
                    this.state.timering?
                    this.state.timer+'s'
                        : this.state[this.state.clicked?"normalLabel":"defalultLabel"]
                }
            </div>
        )
    }
}

export default CountDown;
