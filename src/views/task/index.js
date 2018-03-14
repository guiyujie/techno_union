import React, {Component} from 'react'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'



import actions from 'Actions/index'
import user_actions from 'Actions/user'


import styles from './styles/index.less'

import {
    Tab,
    Icon,
    Flex,
    Grids,
    NavBar,
    TabBody,
    FlexItem,
    NavBarItem
}  from 'react-weui';

//引入常用组件
import {Navigation} from 'Coms/index';

//引入项目模块
import TaskIcon from 'Mods/task_icon';
import PanelTitle from 'Mods/panel_title';
import Tbutton from 'Mods/button';
//样式模块化是否是必须
class Task extends Component {

    constructor (props) {
        super(props)

    }

    //页面的切换也需要重新挂载，也会触发，所以里面的ajax也需要做判断
    componentWillMount(){

    }

    //页面的切换也需要重新挂载，也会触发，所以里面的ajax也需要做判断
    componentDidMount(){
        const {actions} = this.props;
        //actions.fetchGoodsList();
    }

    componentDidUpdate(prevProps,prevState){

    }

    componentWillUnmount(){
        let {user_actions} = this.props;
        user_actions.hideToast();
    }


    render() {
        let {mall,userInfo} = this.props;
        let {nav} = mall;

        return (
            <div className={styles.container}>
                <div className={styles.banner}>
                   <img src={require('./styles/banner_20170908.jpg')}/>
                </div>
                <div className={styles.top}>
                    <PanelTitle title="完美身份" desc="有身份奖励"> </PanelTitle>
                    <div className={styles.tbox}>
                        <div className={styles.titem}>
                            <i className={`icon icon-shenfenrenzheng ${userInfo.realName?styles.sfrz:""}`}> </i>
                            <div>
                                <p>身份认证</p>
                                {
                                    userInfo.realName?
                                        <button disabled="disabled">已认证</button>
                                        :
                                        <Link to="/task/identity/"><button>立即认证</button></Link>
                                }

                            </div>
                        </div>
                        <div className={styles.titem}>
                            <i className={`icon icon-weixinrenzheng ${userInfo.realName?styles.wxrz:""}`}> </i>
                            <div>
                                <p>微信认证</p>
                                <button disabled="disabled">已认证</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cont}>
                    <PanelTitle title="技术大咖" desc="做任务得好好的工作" icon="yiwen" link="/task/guide"  linktext="任务攻略"> </PanelTitle>
                    <ul className={styles.tasks}>
                        <li className={styles.task}>
                            <div className={styles.task_icon}>
                                <TaskIcon color="yellow" icon="xindian"> </TaskIcon>
                            </div>
                            <div className={styles.task_desc}>
                                <h5>新店出单</h5>
                                <p>首次安装易乐游客户端</p>
                            </div>
                            <div className={styles.task_btn}>
                                <Tbutton>
                                    {   userInfo.uid>0?
                                        <Link to="/task/new_order/new">提交工单</Link>
                                        :
                                        <Link to="/task/identity/">提交工单</Link>
                                    }
                                </Tbutton>
                            </div>
                        </li>
                        <li className={styles.task}>
                            <div className={styles.task_icon}>
                                <TaskIcon color="green" icon="xinyewu"> </TaskIcon>
                            </div>
                            <div className={styles.task_desc}>
                                <h5>新业务出单</h5>
                                <p>易乐游网吧，添加新业务</p>
                            </div>
                            <div className={styles.task_btn}>
                                <Tbutton>
                                    {   userInfo.uid>0?
                                        <Link to="/task/order">提交工单</Link>
                                        :
                                        <Link to="/task/identity/">提交工单</Link>
                                    }
                                </Tbutton>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={styles.fb}>
                        <Navigation data={nav} active="1" />
                </div>
            </div>
        )

    }
}

//数据处理部分
function mapStateToProps(state,ownProps) {
    //请勿在connect函数中，把整个全局state都传入，只传入需要监听的，全部传入会摧毁性能优化，因为这样mall会在任何action之后都进行一次重渲。
    const {mall,user} = state;
    return {
        mall,
        userInfo:user.userInfo || {}
    }
}

//消息处理部分
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        user_actions:bindActionCreators(user_actions,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Task)

