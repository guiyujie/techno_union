import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import { hashHistory } from 'react-router'
import {connect} from 'react-redux'


//引入项目路径部分
import actions from 'Actions/user'
import EmptyAddress from './mod/empty'
import {Button,Dialog} from 'react-weui';
import styles from './styles/index.less';


import PageLoading from 'Mods/pageloading';
//样式模块化是否是必须
class MyAddress extends Component {


    constructor (props) {
        super(props);

        this.state = {
            showDialog: false,
            style: {
                title: '操作提示?',
                buttons: [
                    {
                        type: 'default',
                        label: '取消',
                        onClick: ()=>this.setState({  showDialog: false})
                    },
                    {
                        type: 'primary',
                        label: '确定',
                        onClick: this.confirmDialog.bind(this)
                    }
                ]
            }
        }


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

    handleDel(id){
        this.setState({showDialog: true,id:id})
    }

    confirmDialog(){
        //删除地址
        this.setState({
            showDialog: false,
        });

        const {actions}=this.props;

        const options={
            id: +this.state.id,
        };
        actions.showToast({msg:"正在操作"});
        actions.deleteAddress(options).then((res)=>{
            if(res.payload.data.status=='success'){
                actions.showToast({msg:res.payload.data.info});
            }else{
                actions.showToast({msg:"操作失败"});
            }
        }).catch((res)=>{

        });
    }


    handleNavToEditAddress(id){
        hashHistory.push("/home/address/edit/"+id).then((res)=>{
            if(res.payload.data.status=='success'){
                actions.showToast({msg:res.payload.data.info});
            }else{
                actions.showToast({msg:"操作失败"});
            }
        }).catch((res)=>{

        });
    }

    handleSelect(id){
        const {actions} = this.props;
        actions.setDefaultAddress({id:id})
    }

    handleSubmit(){
        const {addressList,actions} = this.props;

        if(addressList.length>=3){
            actions.showToast({msg:"最多只能添加三个地址!"});
            return false;
        }

        hashHistory.push("/home/address/add");
    }


    render() {
        const {addressList,defaultAddress} = this.props;

        if(addressList){
            return (
                <div className = "grids">
                    {
                        addressList.length?
                            addressList.map((address,idx)=> {
                                return  (
                                    <div className={styles.container}>
                                        <div className={styles.user_info_line}>
                                            <div className={styles.user_name}>
                                                {address.receiver}
                                            </div>
                                            <div className={styles.user_phone}>
                                                {address.phoneNum}
                                            </div>
                                        </div>
                                        <div className={styles.address}>
                                            {`${address.provinceName}${address.cityName}${address.countyName?address.countyName:''}${address.address}`}
                                        </div>
                                        <div className={styles.btn_line}>
                                            <span className={`${address.id==defaultAddress.id?styles["active"]:''}`} onClick={this.handleSelect.bind(this,address.id)}>
                                                  <i className="icon icon-ok-sign"></i>{`${address.id==defaultAddress.id?'默认地址':'设为默认'}`}
                                            </span>
                                            <div className={styles.btn_right}>
                                                <span onClick={this.handleNavToEditAddress.bind(this,address.id)}>
                                                    <i className="icon icon-edit"></i>编辑
                                                </span>
                                                <span onClick={this.handleDel.bind(this,address.id)}>
                                                    <i className="icon icon-delete"></i>删除
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        :
                        <EmptyAddress />
                    }
                    <div className={styles.bottom}>
                        <Button className={styles.btn} onClick={this.handleSubmit.bind(this)}>新增收货地址</Button>
                        <p className={styles.tips}>最多可新增3个地址</p>
                    </div>
                    <Dialog type="ios" title={this.state.style.title} buttons={this.state.style.buttons} show={this.state.showDialog}>
                        地址删除后将无法恢复，确认删除吗？
                    </Dialog>
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
        defaultAddress:user.defaultAddress || {}
    }
}

//消息处理部分
function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyAddress)

