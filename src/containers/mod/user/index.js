/**
 * 开发环境入口文件
 */
import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

//引入公共actions
import user_actions from 'Actions/user';

import wx_api from 'Utils/wx.js';
class CommonUser extends React.Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        let {actions} =this.props;
        actions.fetchUserInfo()
    }


    render () {

        return (
            <div>

            </div>
        )
    }
}

/*连接数据部分到props*/
function mapStateToProps(state,ownProps) {
    //请勿在connect函数中，把整个全局state都传入，只传入需要监听的，全部传入会摧毁性能优化，因为这样mall会在任何action之后都进行一次重渲。
    const {user} = state;

    return {

    }
}

//链接消息部分到props
function mapDispatchToProps(dispatch,ownProps) {
    return {
        actions: bindActionCreators(user_actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommonUser)
