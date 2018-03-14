import React, {Component} from 'react'
import { Link, hashHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

//引入项目路径部分
import actions from 'Actions/user'
import {
    Form, Cell, CellBody,
    Uploader,
    Dialog
} from 'react-weui'

//引入自定义组件部分
import {DatePicker} from 'Coms/index';

import FixedBtn from 'Mods/fixedbtn';

import styles from './styles/index.less'

//引入微信API
import wx_api from  'Utils/wx';
//样式模块化是否是必须
class WorderSubmit extends Component {
    //提供给服务器调用的fetch方法

    constructor (props) {
        super(props);
        this.state = {
            empty:{},        //空值
            error:{},       //注意使用Reflect.ownKeys检查是否为空
            enable:false,
            files:[
                {
                    url:require('./styles/1.png')
                },
                {
                    url:require('./styles/2.png')
                },
                {
                    url:require('./styles/3.png')
                }
            ],
            fields:{
                pic1Url:"",
                pic1ThumbnailUrl:"",
                pic2Url:"",
                pic2ThumbnailUrl:"",
                pic3Url:"",
                pic3ThumbnailUrl:"",
            },
            showDialog:false,
            srverror:"",
            dialogBtns:[{
                type:"primary",
                label:"确认",
                onClick:this.hideDialog.bind(this)
            }]
        }
    }

    componentWillMount(){
        let {taskOrder} = this.props;
        if(!taskOrder){
            history.go(-1);
            return false;
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        let {actions} = this.props;
        actions.hideToast();
       this.timer  && clearTimeout(this.timer);
    }

    /*验证*/
    _valid(){
        let {fields} =  this.state;
        if(fields.pic1Url && fields.pic2Url && fields.pic3Url){
            this.setState({
                enable:true
            })
        }
    }

    handleSubmit(){
        let {actions,taskOrder} = this.props;
        if(!this.state.enable){
            for(var i in this.state.error){
                actions.showToast({msg:this.state.error[i]});
            }
            return false;
        }
        let options = Object.assign({...taskOrder},this.state.fields);
        //let options ={};
        actions.showToast({msg:"正在提交工单",model:true});
        actions.postTaskSubmit(options).then((res)=>{
            actions.hideToast();
            //done
            if(res.payload.data.status=='success'){
                //actions.showToast({msg:res.payload.data.info});
                actions.clearTaskOrder();
                hashHistory.replace("/task/order/success");
            }else{
                this.setState({
                    showDialog:true,
                    srverror:res.payload.data.info || "操作失败,请稍后再试."
                });
            }
        }).catch((e)=>{
            actions.hideToast();
            this.setState({
                showDialog:true,
                srverror:"网络错误"
            });
        })
    }
    hideDialog(){
        this.setState({
            showDialog:false,
            srverror:""
        })
    };
    fileHandle(file,idx){
        let {actions} = this.props;
        actions.showToast({msg:"正在上传",model:true});
        actions.uploadFile({base64Data:file.data}).then((res)=>{
            actions.hideToast();
            if(res.payload.data.status=='success') {
                let f =  {...this.state.fields};

                f[`pic${idx}Url`] = res.payload.data.data.largePicUrl;
                f[`pic${idx}ThumbnailUrl`] =  res.payload.data.data.smallPicUrl;
                this.setState({fields:f},()=>{this._valid()});
            }else{
                this.setState({
                    showDialog:true,
                    srverror:res.payload.data.info || "操作失败,请稍后再试."
                });
            }
        })
    }

    //微信选取照片
    handleChooseImg(e,idx){
        var t=this;
        e.preventDefault();
        wx_api.run("chooseImage",{
            count:1,
            success: function(res) {
                var localIds = res.localIds; // 可以用在img src熟悉上的值
                localIds.map(localId => {
                    wx_api.run("getLocalImgData",{
                        localId: localId, // 图片的localID
                        success: function (res) {
                            //针对安卓设备没有base64前缀的问题
                            if(res.localData && res.localData.slice(0,6).indexOf("data:")==-1){
                                res.localData ="data:image/jpeg;base64," + res.localData;
                            }
                            //上传图片
                            t.fileHandle({data:res.localData},idx);
                        },
                        fail: function(res){
                            if(res.errMsg.indexOf('function not exist') > -1){
                                alert('版本过低请升级')
                            }
                        }
                    });
                });
            }
        })
    }
    render() {
        let state=this.state;
        let fields = state.fields;
        return (
            <div className={styles.wrap}>
                <div className={styles.header}>
                    <p>上传任务照 <label>有理有据,提高审核效率</label></p>
                </div>
                <div className={styles.forms}>
                    <div className={styles.upload}>
                      <div className={styles.mask}></div>
                      <p>网吧门头照</p>
                        {fields.pic1Url?
                            <img src={fields.pic1Url} />
                            :
                            <Uploader
                                title="上传照片"
                                maxCount={2}
                                onError={msg => alert(msg)}
                                files={this.state.files.slice(0,1)}
                                onClick={(e)=>{this.handleChooseImg(e,1)}}
                                onChange={(file,e)=>this.fileHandle(file,1)}
                            />
                        }
                  </div>

                    <div className={styles.upload}>
                        <div className={styles.mask}></div>
                        <p>网吧前台照</p>
                        {fields.pic2Url?
                            <img src={fields.pic2Url} />
                            :
                            <Uploader
                                title="上传照片"
                                maxCount={2}
                                onError={msg => alert(msg)}
                                files={this.state.files.slice(1,2)}
                                onClick={(e)=>{this.handleChooseImg(e,2)}}
                                onChange={(file,e)=>this.fileHandle(file,2)}
                            />
                        }
                    </div>

                <div className={styles.upload}>
                    <div className={styles.mask}></div>
                    <p>网吧内部照/业务生效照</p>
                    {fields.pic3Url?
                        <img src={fields.pic3Url} />
                        :
                        <Uploader
                            title="上传照片"
                            maxCount={2}
                            onError={msg => alert(msg)}
                            files={this.state.files.slice(2,3)}
                            onClick={(e)=>{this.handleChooseImg(e,3)}}
                            onChange={(file,e)=>this.fileHandle(file,3)}
                        />
                    }
                </div>
                </div>
                <FixedBtn disabled={!state.enable} handleSubmit={this.handleSubmit.bind(this)}>
                    提交工单
                </FixedBtn>


                <Dialog type="ios"
                        buttons={state.dialogBtns}
                        show={state.showDialog}>
                    {state.srverror}
                </Dialog>
            </div>
        )

    }
}

//数据处理部分text=>this.setState({city: text, city_show: false})
function mapStateToProps(state,ownProps) {
    //请勿在connect函数中，把整个全局state都传入，只传入需要监听的，全部传入会摧毁性能优化，因为这样mall会在任何action之后都进行一次重渲。
    const {user} = state;

    return {
        taskOrder:user.taskOrder,
    }
}

//消息处理部分
function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WorderSubmit)



