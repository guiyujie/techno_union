import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import { hashHistory } from 'react-router'
import {connect} from 'react-redux'

//引入项目路径部分
import actions from 'Actions/user'
import AddressList from './mod/list'
import EmptyAddress from './mod/empty'
import {Button} from 'react-weui';
import styles from './styles/order.less';

import PageLoading from 'Mods/pageloading';
//样式模块化是否是必须
class UseAddress extends Component {


    constructor (props) {
        super(props)


    }

    //页面的切换也需要重新挂载，也会触发，所以里面的ajax也需要做判断
    componentDidMount(){
        const {actions} = this.props;
        //if(!selectAddress.id){
            actions.fetchAddress();
        //}
    }


    componentWillUnmount() {
        let {actions} = this.props;
        actions.hideToast();
    }


    handleSelected(i){
        if(this.props.params.id){
            //有参数才选择地址
            const {addressList,actions} = this.props;
            const selectAddress=addressList[i];
            actions.selectAddress(selectAddress);
            history.go(-1);
        }
    }

    handleNavToEditAddress(id){
        if(this.props.params.id){
            hashHistory.push("/home/address/edit/"+id+"/order/"+this.props.params.id);
        }else{
            hashHistory.push("/home/address/edit/"+id);
        }
    }

    handleSubmit(){
        const {addressList,actions} = this.props;

        if(addressList.length>=3){
            actions.showToast({msg:"最多只能添加三个地址!"});
            return false;
        }

        if(this.props.params.id){
            hashHistory.push("/home/address/add/order/"+this.props.params.id);
        }else{
            hashHistory.push("/home/address/add");
        }
    }


    render() {
        const {addressList,selectAddress} = this.props;
        const selectAddressId=selectAddress?selectAddress.id:0;

        if(addressList){
            return (
                <div>
                    {
                        addressList.length?(
                            <AddressList
                                addressList={addressList}
                                selectAddressId={selectAddressId}
                                handleSelected={this.handleSelected.bind(this)}
                                handleNavToEditAddress={this.handleNavToEditAddress.bind(this)}
                            />
                        ):(
                            <EmptyAddress />
                        )
                    }
                    <div className={styles.bottom}>
                        <Button className={styles.btn} onClick={this.handleSubmit.bind(this)}>新增收货地址</Button>
                        <p className={styles.tips}>最多可新增3个地址</p>
                    </div>
                </div>
            )
        }else{
            return (
               <PageLoading >正在加载中</PageLoading>
            )
        }

    }
}

//数据处理部分
function mapStateToProps(state,ownProps) {
    //请勿在connect函数中，把整个全局state都传入，只传入需要监听的，全部传入会摧毁性能优化，因为这样mall会在任何action之后都进行一次重渲。
    const {user} = state;

    return {
        addressList:user.addressList,
        selectAddress:user.selectAddress,
    }
}

//消息处理部分
function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UseAddress)

