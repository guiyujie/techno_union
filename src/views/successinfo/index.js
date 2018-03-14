import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { hashHistory } from 'react-router'

import actions from 'Actions/user'

import styles from './styles/index.less'
import {Msg} from 'react-weui';

//样式模块化是否是必须
class ExchangeSuccess extends Component {

    constructor (props) {
        super(props);


    }
    componentWillMount(){
        const {user_actions} = this.props;
        //获取用户积分
        user_actions.fetchUserInfo();
    }

    //页面的切换也需要重新挂载，也会触发，所以里面的ajax也需要做判断
    componentDidMount(){

    }

    componentDidUpdate(prevProps,prevState){

    }

    handleRouter1(path){
        hashHistory.push("/home/transactionDetail");
    }

    handleRouter2(){
        hashHistory.push("");
    }

    render() {
        const title = "兑换成功";
        return (
            <div className = "grid">
                <Msg
                    type="success"
                    title={title}
                    className={styles.bgcolor}
                    buttons={[{
                        type: 'primary',
                        label: '查看兑换记录',
                        onClick: this.handleRouter1.bind(this)
                    }, {
                        type: 'default',
                        label: '返回商城首页',
                        onClick: this.handleRouter2.bind(this)
                    }]}
                />

            </div>
        )

    }
}

//数据处理部分
function mapStateToProps(state,ownProps) {
    //请勿在connect函数中，把整个全局state都传入，只传入需要监听的，全部传入会摧毁性能优化，因为这样mall会在任何action之后都进行一次重渲。
    const {mall,user} = state;

    return {

    }
}

//消息处理部分
function mapDispatchToProps(dispatch) {
    return {user_actions: bindActionCreators(actions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExchangeSuccess)

