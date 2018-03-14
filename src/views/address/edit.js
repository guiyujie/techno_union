import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Link, hashHistory} from 'react-router'

//引入项目路径部分
import actions from 'Actions/user'
import {
    Form,
    Input,
    Label,
    CellHeader,
    FormCell,
    CellBody,
    CellFooter,
    Button,
    TextArea,
    Dialog
} from 'react-weui'

import CitySelect from 'Mods/city_select';
import {regs} from 'Utils/regs'

import styles from './styles/add.less'

import PageLoading from 'Mods/pageloading';
//样式模块化是否是必须
class AddAddress extends Component {


    constructor (props) {
        super(props);

        this.state = {
            city_show: false,
            checked:false,
            disabled:false,
            showDialog: false,
            currentAddress:{
                receiver:'',
                phoneNum:'',
                address:'',
                isDefault:0
            },
            style: {
                title: '操作提示?',
                buttons: [
                    {
                        type: 'default',
                        label: '取消',
                        onClick: this.cancelDialog.bind(this)
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


    cancelDialog() {

        this.setState({
            showDialog: false,
        });
    }

    confirmDialog(){
        //删除地址
        this.setState({
            showDialog: false,
        });

        const {actions}=this.props;

        const options={
            id: +this.props.params.id,
        };

        var t=this;
        actions.deleteAddress(options).then((res)=>{
            if(res.payload.data.status=='success'){
                if(t.props.params.oid){
                    //设置选中地址
                    hashHistory.replace("/home/address/order/"+t.props.params.oid);//返回订单页面
                }else{
                    hashHistory.replace("/home/address");//返回订单页面
                }
            }else{
                actions.showToast({msg:"操作失败"});
            }
        }).catch((res)=>{

        });
    }


    _fetchAddress(){
        const {addressList,actions} = this.props;
        if(!addressList.length && sData.uid){
            actions.fetchAddress()
        }
    }


    //页面的切换也需要重新挂载，也会触发，所以里面的ajax也需要做判断
    componentDidMount(){
        this._fetchAddress();
    }

    componentDidUpdate(){
        this._fetchAddress();
    }

    componentWillUnmount() {
        let {actions} = this.props;
        actions.hideToast();
        this.timer && clearTimeout(this.timer);
    }

    _handleVaildForm(){
        let disabled=this.state.disabled;
        let currentAddress=this.state.currentAddress;

        if(!currentAddress.receiver||currentAddress.receiver.length<2){
            if(!disabled){
                this.setState({
                    disabled:true
                })
            }
            return
        }

        if(!currentAddress.phoneNum||currentAddress.phoneNum.length!=11){
            if(!disabled){
                this.setState({
                    disabled:true
                })
            }
            return
        }

        if(!this.state.city){
            this.setState({
                disabled:true
            });
            return
        }

        if(!currentAddress.address){
            if(!disabled){
                this.setState({
                    disabled:true
                })
            }
            return
        }

        if(!currentAddress.address||currentAddress.address.length<3){
            if(!disabled){
                this.setState({
                    disabled:true
                })
            }
            return
        }

        this.setState({
            disabled:false
        })
    }

    handleUser(ev){

        let receiver=ev.target.value;
        this.state.currentAddress.receiver = receiver;

        this.setState({
            currentAddress:this.state.currentAddress
        },()=>{
            this._handleVaildForm()
        })
    }

    handlePhone(ev){
        this.state.currentAddress.phoneNum = ev.target.value;
        if(this.state.currentAddress.phoneNum.length>11) return false;
        this.setState({
            currentAddress:this.state.currentAddress
        },()=>{
            this._handleVaildForm()
        })


    }

    handleAddress(ev){
        this.state.currentAddress.address=ev.target.value;

        this.setState({currentAddress:this.state.currentAddress},()=>{
            this._handleVaildForm()
        })
    }


    handleCityPicker(cityResult){
        /*object*/
        this.setState({cityResult:cityResult,city:cityResult.text, city_show: false},()=>{
            this._handleVaildForm()
        })
    }

    handleChecked(){
        this.setState({
            checked: !this.state.checked
        },()=>{
            this._handleVaildForm()
        })
    }


    handleSubmit(){
        const {actions} = this.props;



        let options={

            ...this.state.cityResult,
            id:this.state.currentAddress.id,
            receiver:this.state.currentAddress.receiver,
            phoneNum:this.state.currentAddress.phoneNum,
            address:this.state.currentAddress.address,
            isDefault:this.state.checked?1:0
        };

        if(options.receiver.length<2||options.receiver.length>8){
            actions.showToast({msg:'请输入2-8个汉字收货人'});
            return
        }

        if(!regs.nickname.reg.test(options.receiver)){
            actions.showToast({msg:'请输入2-8个汉字收货人'});
            return
        }

        if(!regs.mobile.reg.test(options.phoneNum)){
            actions.showToast({msg:'请输入11位手机号'});
            return
        }

        if(!options.provinceId){
            actions.showToast({msg:'请选择所在地区'});
            return
        }
        if(!options.address){
            actions.showToast({msg:'请填写详细地址'});
            return
        }
        if(options.address.length<3){
            actions.showToast({msg:'请填写3-60详细地址'});
            return
        }

        if(this.state.disabled) return;

        actions.editAddress(options).then((res)=>{
            if(res.payload.data.status=='success'){
                actions.showToast({msg:res.payload.data.info});
                var t=this;
                t.timer=setTimeout(()=>{
                    if(t.props.params.oid){
                        //设置选中地址
                        actions.selectAddressById(options.id);
                        hashHistory.replace("/mall/order/"+t.props.params.oid);//返回订单页面
                    }else{
                        history.go(-1)
                    }
                },1500);
            }else{
                actions.showToast({msg:res.payload.data.info});
            }
        })
    }

    handleDelete(){
        this.setState({ showDialog: true})
    }

    render() {
        const id=+this.props.params.id;
        let {addressList} = this.props;
        addressList=addressList||[];
        let currentAddress;

        //查找当前修改的地址
        addressList.map((address,i)=>{
            if(address.id==id){
                currentAddress = address;
            }
        });


        if(currentAddress){
            //默认值设置
            this.state.currentAddress = currentAddress;
            if(!this.state.city){
                this.state.city = `${currentAddress.provinceName} ${currentAddress.cityName} ${currentAddress.countyName?currentAddress.countyName:''}`;
            }
            if(currentAddress.isDefault==1){
                this.state.checked = true;
            }

            return (
                <div className ={styles.box}>
                    <Form className={styles.forms}>
                        <FormCell>
                            <CellHeader>
                                <Label className={styles.title}>收货人</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text"
                                       value={this.state.currentAddress.receiver}
                                       onChange={this.handleUser.bind(this)}
                                       placeholder="请输入2—8个汉字名称"
                                />
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label className={styles.title}>手机号</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel"
                                       value={this.state.currentAddress.phoneNum}
                                       onChange={this.handlePhone.bind(this)}
                                       placeholder="请输入11位手机号"
                                />
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label className={styles.title}>所在地区</Label>
                            </CellHeader>
                            <CellBody className={styles.select_area}>
                                <Input type="text"
                                       value={this.state.city}
                                       onClick={ e=> {
                                           e.preventDefault();
                                           this.setState({city_show: true})
                                       }}
                                       placeholder="请选择"
                                       readOnly={true}
                                />
                                <i className="icon icon-angle-right"></i>
                            </CellBody>
                        </FormCell>
                        <FormCell className={styles.textarea}>
                            <CellHeader>
                                <Label className={styles.title+' '+styles.location}>详细地址</Label>
                            </CellHeader>
                            <CellBody>
                            <TextArea
                                rows="4"
                                minLength="3"
                                maxlength="60"
                                defaultValue={this.state.currentAddress.address}
                                value={this.state.currentAddress.address}
                                placeholder="请输入3—60字地址"
                                onChange={this.handleAddress.bind(this)} >
                            </TextArea>
                            </CellBody>
                        </FormCell>
                    </Form>
                    <div className={`${this.state.currentAddress.isDefault==1?[styles.switch,styles.hide].join(" "):styles.switch}`}>
                        <FormCell >
                            <CellBody className={styles.title}>设为默认地址<p>每次下单时使用该地址</p></CellBody>
                            <CellFooter>
                                <input type="checkbox" id="checkbox" checked={this.state.checked} onChange={this.handleChecked.bind(this)} className={styles.checkbox} />
                                <label htmlFor="checkbox"></label>
                            </CellFooter>
                        </FormCell>
                    </div>
                    <div className={styles.btn_area}>
                        <Button className={`${styles.btn} ${this.state.disabled?styles.disabled:styles.add}`}
                                onClick={this.handleSubmit.bind(this)}>{this.props.params.oid?"保存并使用":"保存"}</Button>
                        <Button className={styles.btn +' '+styles.delete} onClick={this.handleDelete.bind(this)}>删除收货地址</Button>
                    </div>

                    {
                        this.state.city?
                            <CitySelect
                                onCancel={e=>this.setState({city_show: false})}
                                onChange={this.handleCityPicker.bind(this)}
                                text={this.state.city}
                                show={this.state.city_show}
                            />
                            :""
                    }
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
        addressList:user.addressList
    }
}

//消息处理部分
function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddAddress)

