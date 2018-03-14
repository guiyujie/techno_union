import React, {Component} from 'react'
import {hashHistory} from 'react-router'
import PropTypes from 'prop-types'
import styles from './styles/index.less'


import {DImg} from 'Coms/index';
import Coin  from 'Mods/coin';
import {
    Dialog
} from 'react-weui'

//样式模块化是否是必须
class OrderItem extends Component {

    static prevProps = {
        //input自带属性
        name:PropTypes.string,//名称
        date:PropTypes.string,//日期
        num:PropTypes.string,//数量
    };

    static defaultProps = {
        name:"",
        date:"",
        num:"",

    };
    constructor (props) {
        super(props);
        this.state = {
            showDialog: false,
            style: {
                title: '操作提示',
                buttons: [
                    {
                        type: 'default',
                        label: '取消',
                        onClick: this.cancelDialog.bind(this)
                    },
                    {
                        type: 'primary',
                        label: '删除',
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

    //页面的切换也需要重新挂载，也会触发，所以里面的ajax也需要做判断
    componentDidMount(prevProps,prevState){

    }

    componentDidUpdate(prevProps,prevState){


    }
    //对话框确认
    confirmDialog(){

        //删除地址
        this.setState({
            showDialog: false,
        });

        const {actions}=this.props;

        const options={
            id:this.state.id,
        };

        actions.deleteWorder(options).then((res)=>{
            if(res.payload.data.status=='success'){
                //actions.showToast({msg:res.payload.data.info});
                actions.getSheetList({
                    status:this.props.status
                });
            }else{
                actions.showToast({msg:"操作失败"});
            }
        }).catch((res)=>{

        });
    }

    optHandle(opt,id){
        let d = this.props.data;
        switch(opt){
            case "edit":
                hashHistory.push(`/task/order/edit/`+d.id);
                break;
            case "view":
                hashHistory.push(`/task/order/view/`+d.id);
                break;
            case "del":
                this.setState({
                    id:id,
                    showDialog: true,
                });
                break;
        }
    }
    render() {
        let s = this.props.status;
        let d = this.props.data;
        //s 0表示待审核，1表示审核通过，2表示审核不通过
        //d.staus 0表示待接单，1表示已接单，2表示已驳回，3表示驳回重提待接单，4表示审核通过，5表示审核未通过，6表示已删除
        return (
            <div className = {styles.box}>
                <div className={styles.cnt}>
                    <div className={styles.img}>
                        <DImg src={d.thumbnailPicUrl} />
                    </div>
                    <div className={styles.info}>
                        <h5><span>{d.barName}</span> <label>{d.statusDisplay}</label></h5>
                        <p>
                            {d.sheetTypeDisplay}
                        </p>
                           <p>{d.createTime.split(" ")[0]} <Coin small="1">{d.yiLiCoin}</Coin></p>
                    </div>
                </div>
                {
                    (d.approveWord)?
                        <div className={styles.desc}>
                            小易回复: <label>{d.approveWord}</label>
                        </div>
                    :""
                }
                <div className={styles.btns}>
                    {(s==0 && d.status==2)?
                        <span onClick={(e)=>{this.optHandle('edit',d.id)}}><i className="icon icon-edit"> </i>编辑</span>
                        :""
                    }
                    {(s==0 && d.status==2)?
                        <span onClick={(e)=>{this.optHandle('del',d.id)}}><i className="icon icon-delete"> </i>删除</span>
                        :""
                    }
                    {d.status!=2?
                        <span onClick={(e)=>{this.optHandle('view',d.id)}}><i className="icon icon-icon"> </i>查看</span>
                        :""
                    }
                </div>
                <Dialog type="ios" title={this.state.style.title} buttons={this.state.style.buttons} show={this.state.showDialog}>
                    工单删除后将无法恢复，确认删除吗？
                </Dialog>
            </div>
        )

    }
}

export default OrderItem
