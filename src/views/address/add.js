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
    Switch,
    Button,
    TextArea,
    Dialog,
} from 'react-weui'

import CitySelect from 'Mods/city_select';
import {regs} from 'Utils/regs'

import styles from './styles/add.less'
//样式模块化是否是必须
class AddAddress extends Component {
    //提供给服务器调用的fetch方法

    constructor (props) {
        super(props);
        this.state = {
            city_show: false,
            disabled:true,
            receiver:'',
            phoneNum:'',
            city:'',
            address:'',
            checked:false,
            isDisplay:false,
            cityId:[]
        }
    }

    //页面的切换也需要重新挂载，也会触发，所以里面的ajax也需要做判断

    componentDidMount() {

    }

    componentWillUnmount() {
        let {actions} = this.props;
        actions.hideToast();
        this.timer && clearTimeout(this.timer);
    }

    _handleVaildForm(){
        let disabled=this.state.disabled;

        if(!this.state.receiver||this.state.receiver.length<2){
            if(!disabled){
                this.setState({
                    disabled:true
                })
            }
            return
        }

        if(!this.state.phoneNum||this.state.phoneNum.length!=11){
            if(!disabled){
                this.setState({
                    disabled:true
                })
            }
            return
        }

        if(!this.state.city){
            if(!disabled){
                this.setState({
                    disabled:true
                })
            }
            return
        }

        if(!this.state.address||this.state.address.length<3){
            if(!disabled){
                this.setState({
                    disabled:true
                })
            }
            return
        }

        if(disabled){
            this.setState({
                disabled:false
            })
        }
    }



    handleUser(ev){
        let receiver=ev.target.value;

        this.setState({
            receiver:receiver
        },()=>{
            this._handleVaildForm();
        });
    }

    handlePhoneNum(ev){
        if(ev.target.value.length>11)return false;
        this.setState({
            phoneNum:ev.target.value
        },()=>{
            this._handleVaildForm()
        });
    }


    handleCityPicker(cityResult){
        /*object*/
        this.setState({cityResult:cityResult,city:cityResult.text, city_show: false},()=>{
            this._handleVaildForm()
        });
    }

    handleArea(ev){
        this.setState({
            address:ev.target.value
        },()=>{
            this._handleVaildForm()
        });
    }

    handleChecked(){
        this.setState({checked: !this.state.checked});
    }

    handleSubmit(){
        const {actions} = this.props;

        let options={
            ...this.state.cityResult,
            receiver:this.state.receiver,
            phoneNum:this.state.phoneNum,
            address:this.state.address,
            isDefault:this.state.checked?1:0
        };

        if(options.receiver.length<2||options.receiver.length>8){
            actions.showToast({msg:'收货人请输入2—8个汉字名称'});
            return
        }

        if(!regs.nickname.reg.test(options.receiver)){
            actions.showToast({msg:'收货人请输入2—8个汉字名称'});
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
        actions.postAddress(options).then((res)=>{
            if(res.payload.data.status=='success'){
                actions.showToast({msg:res.payload.data.info});
                var t=this;
                this.timer=setTimeout(()=>{
                    if(t.props.params.oid){
                        //设置选中地址
                        actions.selectAddressById(-1);//特殊处理-1为上次使用
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


    render() {

        return (
            <div className ={styles.box}>
                <Form className={styles.forms}>
                    <FormCell>
                        <CellHeader>
                            <Label className={styles.title}>收货人</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text"
                                   value={this.state.receiver}
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
                            <Input
                                type="tel"
                                placeholder="请输入11位手机号"
                                value={this.state.phoneNum}
                                onChange={this.handlePhoneNum.bind(this)}
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
                                placeholder="请输入3—60字地址"
                                rows="4"
                                minLength="3"
                                maxlength="60"
                                value={this.state.address}
                                onChange={this.handleArea.bind(this)}
                            >
                            </TextArea>
                        </CellBody>
                    </FormCell>
                </Form>
                <FormCell className={styles.switch}>
                    <CellBody className={styles.title}>设为默认地址<p>每次下单时使用该地址</p></CellBody>
                    <CellFooter>
                        <input
                            type="checkbox"
                            id="checkbox"
                            checked={this.state.checked}
                            className={styles.checkbox}
                            onChange={this.handleChecked.bind(this)}
                        />
                        <label htmlFor="checkbox"></label>
                    </CellFooter>
                </FormCell>

                <div className={styles.btn_area}>
                    <Button
                        className={`${styles.btn} ${this.state.disabled?styles.disabled:styles.add}`}
                        onClick={this.handleSubmit.bind(this)}
                    >{this.props.params.oid?"保存并使用":"保存"}
                    </Button>
                </div>


                <CitySelect
                    onCancel={e=>this.setState({city_show: false})}
                    onChange={this.handleCityPicker.bind(this)}
                    show={this.state.city_show}
                />
            </div>
        )

    }
}

//数据处理部分text=>this.setState({city: text, city_show: false})
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

