import React, {Component} from 'react'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

//引入项目路径部分
import GoodsList from './mod/goods_list'

//引入自定义组件部分
import Slider from 'Coms/slider';

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

//引入业务组件
import Navigation from 'Coms/navigation';
import Coin  from 'Mods/coin';

import CntLoading from 'Mods/pageloading';
//样式模块化是否是必须
class Mall extends Component {

    constructor (props) {
        super(props);
        const {mall} = this.props;
        this.state = {
            isLoading:mall.normalList?false:true
        }
    }

    //页面的切换也需要重新挂载，也会触发，所以里面的ajax也需要做判断
    componentWillMount(){

    }

    //页面的切换也需要重新挂载，也会触发，所以里面的ajax也需要做判断
    componentDidMount(){
        const {mall,actions} = this.props;
        if(!mall.normalList) {
            actions.fetchGoodsList().then((res) => {
                res = res.payload;
                if (res.data.status == 'success') {
                    this.setState({
                        isLoading: false,
                    })
                }
            })
        }
    }

    componentDidUpdate(prevProps,prevState){

    }

    componentWillUnmount(){
        let {user_actions} = this.props;
        user_actions.hideToast();
    }


    handleNavTab(currentNav){
        this.props.actions.switchNavTab(currentNav)
    }

    handleLoading(){
        const {mall,actions} = this.props;
        return new Promise((resolve, reject) => {
            actions.fetchGoodsList({page:+mall.normalListPage.curPage+1}).then(()=>{
                resolve()
            }).catch(()=>{
                reject();
            })
        });
    }

    render() {
        let {mall,user} = this.props;
        let {banner,nav} = mall;


        const normalList = mall.normalList || [];

        const userInfo = user.userInfo||{};
        const yiLiCoin = userInfo.yiliCoin || "-";

        let isLoading = this.state.isLoading;
        return (
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.banner}>
                        <Slider items={banner} direction="">

                        </Slider>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.coins}>
                            <Coin>{yiLiCoin}</Coin>
                            <Link to="/task">
                                <button className={styles.btn}>赚币</button>
                            </Link>
                        </div>
                        <div className={styles.links}>
                            <Link to="/home/integralDetail">易力币明细</Link>
                            <label>|</label>
                            <Link to="/home/transactionDetail">兑换记录</Link>
                        </div>
                    </div>
                </div>
                <Flex className={styles.cont}>
                    <FlexItem>
                        <div className={styles.tab}>
                            {isLoading?
                                <CntLoading>正在加载中</CntLoading>
                                :
                                <GoodsList goodsList={normalList}  handleLoading={this.handleLoading.bind(this)} listPage={mall.normalListPage} />
                            }
                        </div>
                    </FlexItem>
                </Flex>
                <Flex className={styles.fb}>
                    <FlexItem>
                        <Navigation data={nav} />
                    </FlexItem>
                </Flex>
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
        user   //此处新建立了一个user对象，没有直接修改原来的userInfo对象的结构
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
)(Mall)
