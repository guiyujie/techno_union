import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { hashHistory } from 'react-router'
//引入自定义组件部分
import {Flex,FlexItem,Button} from 'react-weui';


//引入项目路径部分
import actions from 'Actions/index'
import user_actions from 'Actions/user';
import {Slider,DImg} from 'Coms/index';


import GoodsDetail from './mod/goods_detail'
import FixedBtn from 'Mods/fixedbtn';
import styles from './styles/index.less'

import PageLoading from 'Mods/pageloading';
//样式模块化是否是必须
class Detail extends Component {

    constructor (props) {
        super(props);
        this.state = {
            isLoading:true,
            isDisplay:false
        }
    }

    componentWillMount(){

    }

    //页面的切换也需要重新挂载，也会触发，所以里面的ajax也需要做判断
    componentDidMount(){
        //改变高度
        document.body.scrollTop=0;
        this.props.actions.fetchGoodsDetail({id:this.props.params.id}).then((res)=>{
            res = res.payload;
            if(res.data.status =='success'){
                this.setState({
                    isLoading:false,
                })
            }
        })
    }

    componentDidUpdate(prevProps,prevState){

    }

    componentWillUnmount(){
        const {actions,user_actions} =  this.props;
        //actions.clearGoodsDetail();
        user_actions.hideToast();
        clearTimeout(this.timer);
    }


    handleSubmit(){
        let {detail,userInfo,user_actions} = this.props;
        const data = detail.data;


        //判断积分
        if(data.vipType==='1'&&userInfo.yiliCoin<detail.number){
            user_actions.showToast({msg:`抱歉，您的${detail.bName}不足`});
        }else if(data.vipType==="2"&&userInfo.degree<data.eVipLowestLevel){
            user_actions.showToast({msg:"抱歉，您的等级不足"});
        }else{
            hashHistory.push("/mall/order/"+this.props.params.id)
        }
    }


    render() {
        let {detail={}} = this.props;
        let isLoading = this.state.isLoading;
        const item =  detail.data;
        if(isLoading){
            return (
                <PageLoading >正在加载中</PageLoading>
            )
        }else{
            return (
                <div>
                    <div className = {styles.banner_box}>
                        <DImg  src={item.icon}/>
                    </div>
                    <GoodsDetail data={detail}/>
                    <FixedBtn disabled={item.stock===0} handleSubmit={this.handleSubmit.bind(this)}>
                        {item.stock===0? "商品库存不足":`立即兑换`}
                    </FixedBtn>
                </div>
            )
        }
    }
}

//数据处理部分
function mapStateToProps(state,ownProps) {
    //请勿在connect函数中，把整个全局state都传入，只传入需要监听的，全部传入会摧毁性能优化，因为这样mall会在任何action之后都进行一次重渲。
    const {detail,user} = state;

    return {
        userInfo:user.userInfo,
        detail:detail
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
)(Detail)
