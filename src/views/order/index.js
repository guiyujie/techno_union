import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'

//引入自定义组件部分
import {Flex,FlexItem,Button,Toast} from 'react-weui';
//引入自定义组件部分
import {NumPicker} from 'Coms/index';

//引入项目路径部分
import actions from 'Actions/index'
import user_actions from 'Actions/user';

import AddrssInfo from './mod/address_info'
import styles from './styles/index.less'

//样式模块化是否是必须
class Order extends Component {

    constructor (props) {
        super(props);
        this.state = {
            count:1,            //数量
            totalMoney:0,      //消耗积分
            disabled:false     //提交状态
        }
    }

    //优化处,处理nextProps
    componentWillReceiveProps(nextProps){
        const orderInfo = nextProps.detail.data;
        const number = nextProps.detail.number;
        if(orderInfo.pid){
            let totalMoney = (number * this.state.count) ||0;
            this.setState({
                totalMoney:totalMoney,
            });
        }
    };

    componentWillUnmount(){
        let {user_actions} = this.props;
        //清除选中地址
        user_actions.clearSelectAddress();
        user_actions.hideToast();

    }

    //页面实例化完成后  主要用于数据获取
    componentDidMount(prevProps,prevState){
        //注意使用props的actions
        const {selectAddress={}} = this.props;

        //从商城获取商品详情
        const {actions,user_actions} = this.props;
        const orderInfo = this.props.detail.data;

        if(!orderInfo.pid){
            actions.fetchGoodsDetail({id:this.props.params.id});
        }
        //if(!selectAddress.id){
        user_actions.fetchAddress();
        //}

        const number = this.props.detail.number; //扩展的字段
        const totalMoney = (number * this.state.count) || 0;
        this.setState({
            totalMoney:totalMoney,
        });
    }

    //页面存在期后更新
    componentDidUpdate(prevProps,prevState){

    }

    handleChange(v){
        const {userInfo} = this.props;
        const number = this.props.detail.number*100;
        const totalMoney = (number * v)/100 || 0;
        this.setState({
            count:v,
            totalMoney:totalMoney,
            disabled: (totalMoney>userInfo.yiliCoin || totalMoney==0)
        });

    }

    handleSubmit(){
        const {user_actions,userInfo} = this.props;
        const {detail}  = this.props;
        const selectAddress = this.props.selectAddress || this.props.defaultAddress || {};
        const number = this.props.detail.number;

        //从商城获取商品详情
        const orderInfo = this.props.detail.data;
        if(orderInfo.pType==1 && !selectAddress.address){
            user_actions.showToast({msg:"请先添加收货地址!"});
            return;
        }

        let options ={
            pid: orderInfo.pid,
            bId: detail.bId,  //业务线ID
            biId:  detail.biId, //货币ID
            coinAmount: number*this.state.count,
            addressId: orderInfo.pType==1?selectAddress.id:'',
            goodsAmount:this.state.count,
        };

        if(userInfo && userInfo.yiliCoin<options.coinAmount){
            user_actions.showToast({msg:`${detail.bName}不足`});
            return false;
        }else{
            //购买商品,数量
            user_actions.submitOrder(options).then((res) => {
                res = res.payload;
                if(res.data.status !='success'){
                    switch(res.data.code){
                        case "200":
                            user_actions.showToast({msg:"用户过期，请刷新重试"});
                            break;
                        case "402":
                            user_actions.showToast({msg:"抱歉，该商品已经下架"});
                            break;
                        case "401":
                            user_actions.showToast({msg:"抱歉，库存不足无法购买"});
                            break;
                        case "400":
                            user_actions.showToast({msg:`抱歉，${detail.bName}不足`});
                            break;
                        default:
                            user_actions.showToast({msg:"支付异常，请稍候再试"});
                    }
                }else{
                    user_actions.clearSelectAddress();
                    if(res.data.data.url){
                        user_actions.showToast({msg:"正在跳转,请稍后"});
                        //跳转
                        location.href = res.data.data.url;
                    }else{
                        user_actions.hideToast();

                        hashHistory.push("/mall/order/exchangeSuccess");
                    }
                }
            }).catch((err)=>{
                user_actions.showToast({msg:"网络异常，请稍候再试"});
            })
        }
    }

    handleRouter(){
        const selectAddress = this.props.selectAddress || this.props.defaultAddress || {};

        if(selectAddress.id){
            hashHistory.push("/home/address/order/"+this.props.params.id);
        }else{
            hashHistory.push("/home/address/add/order/"+this.props.params.id);
        }
    }

    render() {
        //从商城获取商品详情
        let {detail={}} = this.props;
        let orderInfo = detail.data;

        const number = this.props.detail.showNumber;
        //从地址获取默认地址
        const selectAddress = this.props.selectAddress || this.props.defaultAddress || {};
        //在render前处理数据
        return (
            <div>
                {
                    orderInfo.pType==1?
                        <AddrssInfo
                            address={selectAddress}
                            handleRouter={this.handleRouter.bind(this)}
                        />:''
                }
                <div className={styles.box}>
                    <div className={styles.banner}>
                        <div className={styles.image}>
                            <img src={orderInfo.icon} alt="商品描述" />
                        </div>
                        <div className={styles.info}>
                            <p className={styles.name}>{orderInfo.pName}</p>
                            <p className={styles.price}><span>{number}</span>&nbsp;{detail.bName}</p>
                        </div>
                    </div>
                    <div className={styles.detail}>
                        <div className={styles.amount}>数量：</div>
                        <div className={styles.picker}>
                            <NumPicker enable={orderInfo.id} value={1} min={1} max={orderInfo.stock} onChange={this.handleChange.bind(this)}> 库存({orderInfo.stock})</NumPicker>
                        </div>
                    </div>
                    <div className={styles.total}>
                        <p >合计： <span className={this.state.disabled?styles.warning:""}>{orderInfo.vipType==='2'?"¥":""}{this.state.totalMoney}</span> {orderInfo.vipType==='2'?"":detail.bName}</p>
                        {this.state.disabled?
                            <Button className="weui-btn_disabled">提交订单</Button>
                            :  <Button onClick={this.handleSubmit.bind(this)}>提交订单</Button>
                        }
                    </div>
                </div>
            </div>
        )

    }
}

//
function mapStateToProps(state,ownProps) {
    //请勿在connect函数中，把整个全局state都传入，只传入需要监听的，全部传入会摧毁性能优化，因为这样mall会在任何action之后都进行一次重渲。
    const {detail,user} = state;
    let  defaultAddress = user.defaultAddress;
    let  selectAddress = user.selectAddress;
    //业务逻辑特殊处理    既没有默认地址,也没有选中地址, 使用收货地址第一个
    if(!defaultAddress.id && !selectAddress && user.addressList){
        selectAddress = user.addressList[0] || "";
    }
    return {
        detail,
        userInfo:user.userInfo,
        defaultAddress:defaultAddress,
        selectAddress:selectAddress
    }
}

//消息处理部分
function mapDispatchToProps(dispatch) {
    return {
        user_actions: bindActionCreators(user_actions, dispatch),
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Order)
