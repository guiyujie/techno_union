import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

//引入项目路径部分
import actions from 'Actions/user'
import {
    Icon,
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
    Dialog
} from 'react-weui'

import CitySelect from 'Mods/city_select';
//引入自定义组件部分
import {CountDown} from 'Coms/index';
import {vaild,regs} from 'Utils/regs'

import PageLoading from 'Mods/pageloading';

import styles from './styles/index.less'
//样式模块化是否是必须
class Identity extends Component {
    //提供给服务器调用的fetch方法

    constructor (props) {
        super(props);
        this.state = {
            empty:{},        //空值
            error:{},       //注意使用Reflect.ownKeys检查是否为空
            city_show: false,
            enable:this.props.params.id,
            showEdit:this.props.params.id,
            fields:{
                mobile:'',
                vcode:'',
                truename:'',
                area:'',
                companyName:'',
            },
            //空提示
            emsg:{
                mobile:"请输入手机号码",
                vcode:"请输入验证码",
                truename:"请输入真实姓名",
                area:"请选择服务区域",
                companyName:"请输入公司名称",
            },
            cityId:[],
            showDialog:false,
            srverror:"",
            dialogBtns:[{
                type:"primary",
                label:"我知道了",
                onClick:this.hideDialog.bind(this)
            }]
        };
    }

    //刷新进入
    componentWillReceiveProps(props){
        let {userInfo} = props;
        if(this.props.params.id && userInfo) {
            this.setState({fields:{
                mobile:userInfo.phone,
                truename:userInfo.realName,
                vcode:"",
                area:userInfo.serviceArea,
                companyName:userInfo.companyName,
            }},()=>{

                this.render();
            })
        }
    }

    //非直接进入
    componentWillMount(){
        let {userInfo} = this.props;
        if(this.props.params.id && userInfo) {
            this.setState({fields:{
                mobile:userInfo.phone,
                truename:userInfo.realName,
                vcode:"",
                area:userInfo.serviceArea,
                companyName:userInfo.companyName,
            }});

        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        let {user_actions} = this.props;
        user_actions.hideToast();
        //user_actions.fetchUserInfo();
    }

    /*处理输入变更*/
    handleInputChange(field,v){
        let newState =  {...this.state.fields ,[field]:v};
        this.setState({fields:newState},()=>{
            this._valid(newState);
        });

    }
    /*验证*/
    _valid(newState){
        //let error =[];
        let {error,empty} = vaild(newState);
        return new Promise((resolve, reject) => {
            this.setState({
                enable: !Reflect.ownKeys(error).length && !Reflect.ownKeys(empty).length,
                error: error,
                empty: empty
            }, () => {
                resolve();

            });
        });
    }



    handleCityPicker(cityResult){
        /*object*/
        let newState =  {...this.state.fields,area:cityResult.text};
        this.setState({fields:newState, city_show: false},()=>{
            this._valid(newState)
        })
    }


    /*获取验证码*/
    handleVcode(){
        let {user_actions} =this.props;
        let {mobile} = this.state.fields;
        return new Promise((resolve,reject)=>{
            if(!mobile){
                user_actions.showToast({msg:"请输入手机号码!"});
                reject();
            }else if(!regs.mobile.reg.test(mobile)){
                user_actions.showToast({msg:"手机号有误,请重新输入!"});
                reject();
            }else{
                //购买商品,数量
                user_actions.getCode({phone:mobile}).then((res) => {
                    if(res.payload.data.status=='success'){
                        user_actions.showToast({msg:res.payload.data.info});
                        resolve();
                    }else{
                        this.setState({
                            showDialog:true,
                            srverror:res.payload.data.info || "操作失败,请稍后再试."
                        });
                        reject();
                    }
                });
            }
        });
    }

    handleSubmit(){
        let {user_actions} = this.props;
        if(!this.state.enable){
            return false;
           /*
            this._valid(this.state.fields).then((()=>{
                //注意引用的坑
                for(var i in this.state.error){
                    user_actions.showToast({msg:this.state.error[i]});
                    return false;
                }
                for(var i in this.state.empty){
                    user_actions.showToast({msg:this.state.emsg[i]});
                    return false;
                }
            }).bind(this));
            */
        }

        let options={
            phone:this.state.fields.mobile,
            phoneCode:this.state.fields.vcode,
            realName:this.state.fields.truename,
            serviceArea:this.state.fields.area,
            companyName:this.state.fields.companyName,
            method:this.props.params.id?"update":"save"
        };
        user_actions.postId(options).then((res)=>{
            //done
            if(res.payload.data.status=='success'){
                user_actions.showToast({msg:res.payload.data.info});
                //获取用户积分
                user_actions.fetchUserInfo();
                setTimeout(()=>{
                    history.go(-1);
                },1500);
            }else{
                this.setState({
                    showDialog:true,
                    srverror:res.payload.data.info || "操作失败,请稍后再试."
                });
            }
        })

    }
    hideDialog(){
      this.setState({
          showDialog:false,
          srverror:""
      })
    };

    handleShowEdit(){
        this.setState({
            "showEdit":false,
            fields:{...this.state.fields,mobile:"",vcode:""},
            enable:false
        });
    };

    renderCnt(){
        let state = this.state;

        let fields = state.fields;
        return (
            <div className={styles.wrap}>
                <Form className={styles.forms}>

                    <FormCell>
                        <CellHeader>
                            <Label className={styles.title}>手机号</Label>
                        </CellHeader>
                        <CellBody>
                            <Input
                                maxLength="11"
                                type="tel"
                                disabled={state.showEdit}
                                placeholder="请输入手机号"
                                value={fields.mobile}
                                defaultValue={fields.mobile}
                                onChange={(e) => this.handleInputChange('mobile', e.target.value)}
                            />
                        </CellBody>
                        {
                            state.showEdit?
                                <CellFooter>
                                    {
                                        (fields.mobile) ? <i className="icon icon-edit" onClick={this.handleShowEdit.bind(this)}> </i> : ""
                                    }
                                </CellFooter>
                                :
                                <CellFooter>
                                    {
                                        (fields.mobile) ? <Icon value="clear" onClick={(e) => this.handleInputChange('mobile', '')}> </Icon> : ""
                                    }
                                </CellFooter>
                        }
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>验证码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input maxLength="6" type="text" defaultValue={fields.vcode}
                                   placeholder="请输入验证码"
                                   onBlur={(e) => this.handleInputChange('vcode', e.target.value)}/>
                        </CellBody>
                        <CellFooter>
                            <Button type="vcode">
                                <CountDown disabled={(!fields.mobile || state.error["mobile"])?true:false} onCD={this.handleVcode.bind(this)}> </CountDown>
                            </Button>
                        </CellFooter>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label className={styles.title}>真实姓名</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text"
                                   maxLength="12"
                                   defaultValue={fields.truename}
                                   onBlur={(e) => this.handleInputChange('truename', e.target.value)}
                                   placeholder="请输入真实姓名,方便身份验证"
                            />
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label className={styles.title}>服务地域</Label>
                        </CellHeader>
                        <CellBody className={styles.select_area}>
                            <Input type="text"
                                   value={fields.area}
                                   onClick={ e => {
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
                            <Label className={styles.title + ' ' + styles.location}>公司名称</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text"
                                   maxLength="24"
                                   defaultValue={fields.companyName}
                                   onBlur={(e) => this.handleInputChange('companyName', e.target.value)}
                                   placeholder="请输入公司名称"
                            />
                        </CellBody>
                    </FormCell>
                </Form>


                <div className={styles.btn_area}>
                    <Button
                        className={`${styles.btn} ${this.state.enable ? styles.add : styles.disabled}`}
                        onClick={this.handleSubmit.bind(this)}
                    >保存</Button>
                    {this.props.params.id?
                        <p>身份认证修改需要进行手机验证</p>
                        :
                        <p>身份认证将获得{sData.identityAuthedYiLiCoin||"15"}个易力币奖励</p>
                    }
                    <p>身份信息与工单审核相关，请填写准确资料</p>
                </div>

                <CitySelect
                    onCancel={e => this.setState({city_show: false})}
                    onChange={this.handleCityPicker.bind(this)}
                    text={fields.area}
                    show={this.state.city_show}
                />

                <Dialog type="ios"
                        buttons={state.dialogBtns}
                        show={state.showDialog}>
                    {this.state.srverror}
                </Dialog>
            </div>
        )
    }

    render() {
        let {userInfo} =this.props;
        //修改
        if(this.props.params.id){
             if(userInfo && userInfo.uid>0){
                 return this.renderCnt()
             }else{
                 return (
                     <PageLoading>正在加载中</PageLoading>
                 )
             }
        }else{
            return this.renderCnt()
        }

    }
}

//数据处理部分text=>this.setState({city: text, city_show: false})
function mapStateToProps(state,ownProps) {
    //请勿在connect函数中，把整个全局state都传入，只传入需要监听的，全部传入会摧毁性能优化，因为这样mall会在任何action之后都进行一次重渲。
    const {mall,user} = state;

    return {
        mall,
        userInfo:user.userInfo   //此处新建立了一个user对象，没有直接修改原来的userInfo对象的结构
    }
}

//消息处理部分
function mapDispatchToProps(dispatch) {
    return {user_actions: bindActionCreators(actions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Identity)

