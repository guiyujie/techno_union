import React, {Component} from 'react'
import {Link} from 'react-router';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import actions from 'Actions/index'

import styles from './styles/index.less'

import {
    Form,
    Input,
    Label,
    CellHeader,
    CellBody,
    FormCell,
    Flex,
    FlexItem,
}  from 'react-weui';

//引入业务组件
import Navigation from 'Coms/navigation';

//引入项目模块
import TaskIcon from 'Mods/task_icon';
import PanelTitle from 'Mods/panel_title';
import Tbutton from 'Mods/button';
import Coin  from 'Mods/coin';
//样式模块化是否是必须
class Home extends Component {


    componentWillMount(){

    }

    //页面的切换也需要重新挂载，也会触发，所以里面的ajax也需要做判断
    componentDidMount(){

    }

    componentDidUpdate(prevProps,prevState){

    }

    componentWillUnmount(){

    }

    renderCnt(){
        let {userInfo} =this.props;
        if(userInfo && userInfo.uid>0 && userInfo.phone){
            return (
                <div className={styles.forms}>
                    <PanelTitle title="盛天身份认证"  icon="edit" link={`/task/identity/${userInfo?userInfo.uid:''}`} linktext="修改"> </PanelTitle>
                    <Form >
                        <FormCell >
                            <CellHeader>
                                <Label>手机号</Label>
                            </CellHeader>
                            <CellBody>
                                <p>{userInfo.phone}</p>
                            </CellBody>
                        </FormCell>
                        <FormCell >
                            <CellHeader>
                                <Label>真实姓名</Label>
                            </CellHeader>
                            <CellBody>
                                <p>{userInfo.realName}</p>
                            </CellBody>
                        </FormCell>
                        <FormCell >
                            <CellHeader>
                                <Label>服务区域</Label>
                            </CellHeader>
                            <CellBody>
                                <p>{userInfo.serviceArea}</p>
                            </CellBody>
                        </FormCell>
                        <FormCell >
                            <CellHeader>
                                <Label>公司名称</Label>
                            </CellHeader>
                            <CellBody>
                                <p>{userInfo.companyName}</p>
                            </CellBody>
                        </FormCell>
                    </Form>
                    </div>
            )
        }else{
            return (
                <div className={styles.forms}>
                   <PanelTitle title="盛天身份认证" > </PanelTitle>
                   <div className={styles.empty}>
                         <div className={styles.img}>
                             <img src={require('./styles/empty.jpg')} />
                             <p>暂无认证信息</p>
                         </div>
                         <p>身份认证=<Coin>{sData.identityAuthedYiLiCoin||"15"}</Coin></p>
                         <p>
                             <Link to="/task/identity/">
                                <Tbutton>立即认证</Tbutton>
                             </Link>
                         </p>
                   </div>
                </div>
            )
        }
    }

    render() {
        let {nav,userInfo} = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.info}>
                        <div className={styles.avt}>
                            <img src={(userInfo && userInfo.avatarUrl)?userInfo.avatarUrl:require('./styles/head.png')} />
                        </div>
                        <div  className={styles.detail}>
                            <div className={styles.coins}>
                                <p>易力币余额</p>
                                <p className={styles.num}>{userInfo && userInfo.yiliCoin}</p>
                            </div>
                            <div className={styles.tasks}>
                                <p>任务完成量</p>
                                <p className={styles.num}>{userInfo && userInfo.successSheetNum}</p>
                            </div>
                        </div>
                    </div>
                    <ul className={styles.navs}>
                        <li >
                            <Link to="/home/order/my">
                            <TaskIcon color="blue" icon="wodegongdan"> </TaskIcon>
                            <p>我的工单</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/home/transactionDetail">
                                <TaskIcon color="yellow" icon="wodeduihuan"> </TaskIcon>
                                <p>我的兑换</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/home/integralDetail">
                                <TaskIcon color="green" icon="wodeyibi"> </TaskIcon>
                                <p>我的易币</p>
                            </Link>
                        </li>
                        <li>
                            <Link to={userInfo.uid>0?"/home/address":"/task/identity/"}>
                                <TaskIcon color="purple" icon="shouhuodizhi"> </TaskIcon>
                                <p>收货地址</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.cnt}>
                    {this.renderCnt()}
                </div>
                <div className={styles.bottom}>
                    <Form className={styles.forms}>
                        <FormCell >
                            <CellHeader>
                                <Label>专属客服QQ</Label>
                            </CellHeader>
                            <CellBody>
                                <p>2355628916</p>
                            </CellBody>
                        </FormCell>
                    </Form>
                </div>
                <div className={styles.fb}>
                    <Flex >
                        <FlexItem>
                            <Navigation data={nav} active="2" />
                        </FlexItem>
                    </Flex>
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
        nav:mall.nav,
        userInfo:user.userInfo || {}
    }
}

//消息处理部分
function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

