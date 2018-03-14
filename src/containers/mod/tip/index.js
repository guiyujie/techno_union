/**
 * 开发环境入口文件
 */
import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

//引入全局toast
import {Toast} from 'Coms/index';
//引入公共actions
import * as commonAction from 'Actions/common_action'

class CommonTip extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timer:3000
        };
    }


    componentDidMount() {

    }

    componentDidUpdate(){
        const {common,actions} = this.props;
        if(common.show && !common.model){
            this.toastTimer && clearTimeout( this.toastTimer);
            this.toastTimer = setTimeout(()=> {
                actions.hideToast()
            }, this.state.timer);
        }
    }
    componentWillUnmount(){
        this.toastTimer && clearTimeout( this.toastTimer)
    }

    render () {
        const {common} = this.props;

        return (
            <Toast show={common.show} className={common.show?"weui-animate-zoom-in":"weui-animate-zoom-out"}>{common.msg}</Toast>
        )
    }
}

/*连接数据部分到props*/
function mapStateToProps(state,ownProps) {
    //请勿在connect函数中，把整个全局state都传入，只传入需要监听的，全部传入会摧毁性能优化，因为这样mall会在任何action之后都进行一次重渲。
    return {
        common :state.common
    }
}

//链接消息部分到props
function mapDispatchToProps(dispatch,ownProps) {
    return {
        actions: bindActionCreators(commonAction, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommonTip)
