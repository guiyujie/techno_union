import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import { Link, hashHistory} from 'react-router'
import {connect} from 'react-redux'

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
    Dialog
} from 'react-weui'

//引入自定义组件部分
import {CountDown,DatePicker,Picker} from 'Coms/index';
import {vaild,regs} from 'Utils/regs'

import styles from './styles/index.less'

import PageLoading from 'Mods/pageloading';


//引入微信API
import wx_api from  'Utils/wx';
const dd = new Date();

//样式模块化是否是必须
class Worder extends Component {
    //提供给服务器调用的fetch方法

    constructor (props) {
        super(props);
        this.state = {
            location:"",     //定位地址
            empty:{},        //空值
            error:{},       //注意使用Reflect.ownKeys检查是否为空
            type_picker_show:false,
            isNewStore:true,
            type_picker_group:[
                {
                    items: [
                        {
                            label:' 桌标业务',
                            value:0,
                        }
                    ]
                }
            ],
            date_picker_show:false,
            date_picker_group:[
                {
                    items: [
                        {
                            label:'类型一',
                            value:'1',
                        },
                        {
                            label:'类型二',
                            value:'2',
                        },
                        {
                            label:'类型三',
                            value:'3',
                        },
                        {
                            label:'类型四',
                            value:'4',
                        }
                    ]
                }
            ],
            enable:false,
            fields:{
               gid:"",
               gname:"",
               "businessTypeDisplay" : "",
               bussDate:"",
            },
            emsg:{
                gid:"请输入gid",
                gname:"请输入网吧名称",
                "businessTypeDisplay":"请选择业务类型",
                bussDate:"请选择时间"
            },
            showDialog:false,
            srverror:"",
            dialogBtns:[{
                type:"primary",
                label:"我知道了",
                onClick:this.hideDialog.bind(this)
            }]
        };
        if(!this.props.isNewStore){
            this.state.isNewStore=false;
            this.state.fields.bussType="";
        }

    }

    componentWillMount(){
        //wx_api.setConfig();
        //处理返回 使用taskOrder
        let { taskOrder} = this.props;

        //存在编辑未保存
        if(taskOrder && taskOrder.gid){
            var fields = this.parseData(taskOrder);
            this.setState({
                fields:fields,
                enable:true,
            });
        }
    }

    //处理数据
    parseData(data){
        let {isNewStore} = this.props;
        var t=this;
        var fields = {
            gid:data.gid,
            gname:data.barName,
            businessTypeDisplay:data.businessTypeDisplay,
            bussDate:data.enableDate.replace(/(\d+)-(\d+)-(\d+)$/,"$1年 $2月 $3日"),
        };
        if(t.props.params.id){
            fields.id = t.props.params.id;
        }
        if(!isNewStore || data.businessTypeDisplay){
            try{
                fields.bussType = t.state.type_picker_group[0].items.filter((item)=>{return item.value==data.businessType});
                fields.bussType = fields.bussType[0].value;
            }catch(e){

            }
        }
        return fields;
    }

    componentDidMount() {
        let {actions} = this.props;
        var t=this;
        if(this.props.params.id) {
            actions.getSheetDetail({id:this.props.params.id}).then((res)=>{
                  //可以考虑缓存存储
                  var data = res.payload.data.data;
                  if(res.payload.data.status=="success") {
                       var fields = t.parseData(data);
                      //新业务但我
                      this.setState({
                          fields:fields,
                          isNewStore:data.sheetType==0?1:0,
                          enable:true,
                      })
                  }else{
                      actions.showToast({msg:res.payload.data.info});
                  }
            });
        }
        this.getLocation();
        /*
        actions.getLocation().then((res)=>{
            if(res.payload.data.status=="success") {
                this.setState({
                    location:  res.payload.data.data.location
                })
            }else{
                actions.showToast({msg:res.payload.data.info});
            }
        });
        */
    }

    getLocation(){
        wx_api.getCurrentAddress().then((address)=>{
            this.setState({
                locationErr:"",
                location:  address
            })
        }).catch((err)=>{
            if(err=="cancel"){
                this.setState({
                    showDialog:true,
                    srverror:"获取当前定位失败,工单无法继续,请先开启定位服务",
                    locationErr:"请允许获取定位,点此重新获取"
                })
            }else if(err=="fail"){
                this.setState({
                    showDialog:true,
                    srverror:"获取当前定位失败,工单无法继续,请先开启定位服务",
                    locationErr:"获取定位失败,点此重新获取"
                })
            }
        });
    }

    componentWillUnmount() {
        let {actions} = this.props;
        actions.hideToast();

        this.timer && clearTimeout(this.timer);
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


    handleTypePicker(opt){
        let selected= this.state.type_picker_group[0].items[opt[0]];
        this.setState({fields:{...this.state.fields,bussType: selected.value,businessTypeDisplay:selected.label}, type_picker_show: false},()=>{
            this._valid(this.state.fields);
        });
    }

    handleDatePicker(opt){
        this.setState({fields:{...this.state.fields,bussDate: opt.text}, date_picker_show: false},()=>{
            this._valid(this.state.fields);
        });
    }

    handleSubmit(){
        let {actions,isNewStore} = this.props;
        if(!this.state.enable){
            /*
                this._valid(this.state.fields).then((()=>{
                    //注意引用的坑
                    for(var i in this.state.error){
                        actions.showToast({msg:this.state.error[i]});
                        return false;
                    }
                    for(var i in this.state.empty){
                        actions.showToast({msg:this.state.emsg[i]});
                        return false;
                    }
                }).bind(this));
            */
            return false;
        }
        if(!this.state.location){
            this.setState({
                showDialog:true,
                srverror:"获取当前定位失败,工单无法继续,请先开启定位服务"
            });
            return false;
        }
        let options = this.state.fields;
        let params = {
            id:options.id,
            location:this.state.location,
            gid:options.gid,
            barName:options.gname,
            businessType:options.bussType,
            businessTypeDisplay:options.businessTypeDisplay,
            enableDate:options.bussDate.replace("年 ","-").replace("月 ","-").replace("日","")
        };
        //新店添加额外参数 sheetType
        if(isNewStore || this.state.isNewStore){
            params.sheetType = 0;
        }else{
            params.sheetType = 1;
        }

        /*
            actions.postTaskOrder(params);
            hashHistory.push(`/task/order/submit/${this.props.params.id||""}`);
        */

        actions.postTaskOrder(params).then((res)=>{
            //是否设置默认地址
            //done
            if(res.payload.data.status=='success'){
                //actions.showToast({msg:res.payload.data.info});
                hashHistory.push(`/task/order/submit/${this.props.params.id||""}`);
            }else{
                this.setState({
                    showDialog:true,
                    srverror:res.payload.data.info || "操作失败,请稍后再试."
                });
            }
        });

    }
    hideDialog(){
        this.setState({
            showDialog:false,
            srverror:""
        })
    };

    render() {
        let {fields} =this.state;
        //修改
        if(this.props.params.id){
            if(fields && fields.gid>0){
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

    renderCnt() {
        let {isNewStore} = this.props;
        let state=this.state;
        let fields = state.fields;

        return (
            <div className={styles.wrap}>
                <div className={styles.header}>
                    {state.locationErr?
                        <p onClick={this.getLocation.bind(this)}><i className="icon icon-shouhuodizhi"> </i> {state.locationErr}</p>
                        :
                        <p><i className="icon icon-shouhuodizhi"> </i> {state.location||"获取定位中"}</p>
                    }
                </div>
                <Form className={styles.forms}>
                    <FormCell>
                        <CellHeader>
                            <Label className={styles.title}>网吧GID</Label>
                        </CellHeader>
                        <CellBody>
                            <Input
                                maxLength="10"
                                type="tel"
                                placeholder="安装易乐游后的唯一标识"
                                defaultValue={fields.gid}
                                onBlur={(e)=>this.handleInputChange('gid',e.target.value)}
                            />
                        </CellBody>
                    </FormCell>
                    <FormCell  >
                        <CellHeader>
                            <Label>网吧全称</Label>
                        </CellHeader>
                        <CellBody>
                            <Input maxLength="18" type="text" defaultValue={fields.gname} placeholder="请输入网吧全称" onBlur={(e)=>this.handleInputChange('gname',e.target.value)}  />
                        </CellBody>
                    </FormCell>
                    {
                        (isNewStore || state.isNewStore)?""
                            :
                            <FormCell >
                                <CellHeader>
                                    <Label className={styles.title}>业务类型</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input
                                        type="text"
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            this.setState({type_picker_show: true})
                                        }}
                                        placeholder="请选择业务类型"
                                        value={fields.businessTypeDisplay}
                                        defaultValue={fields.businessTypeDisplay}
                                        readOnly={true}
                                    />
                                </CellBody>
                            </FormCell>
                    }

                    <FormCell >
                        <CellHeader>
                            <Label className={styles.title}>开通日期</Label>
                        </CellHeader>
                        <CellBody>
                            <Input
                                type="text"
                                onClick={e=>{
                                    e.preventDefault();
                                    this.setState({date_picker_show: true})
                                }}
                                placeholder="请选择开通日期"
                                value={fields.bussDate}
                                readOnly={true}
                            />
                        </CellBody>
                    </FormCell>
                </Form>


                <div className={styles.btn_area}>
                    <Button
                        className={`${styles.btn} ${this.state.enable?styles.add:styles.disabled}`}
                        onClick={this.handleSubmit.bind(this)}
                    >下一步</Button>
                    <p>网吧信息用于后续的工单审核，信息越准确，通过率越高</p>
                </div>

                <Picker
                    groups={this.state.type_picker_group}
                    show={this.state.type_picker_show}
                    lang={{leftBtn:"取消",rightBtn:"确认"}}
                    onChange={this.handleTypePicker.bind(this)}
                    onCancel={e=>this.setState({type_picker_show: false})}
                />
                <DatePicker
                    onCancel={e=>this.setState({date_picker_show: false})}
                    onChange={this.handleDatePicker.bind(this)}
                    start={dd.getFullYear()}
                    end={dd.getFullYear()}
                    selected={[0,dd.getMonth(),dd.getDate()-1]}
                    show={this.state.date_picker_show}
                />
                <Dialog type="ios"
                        buttons={state.dialogBtns}
                        show={state.showDialog}>

                    {this.state.srverror}
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
        taskOrder:user.taskOrder || {},
        isNewStore: ownProps.params.type =="new"     //是否新店铺
    }
}

//消息处理部分
function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Worder)



