import React, {Component} from 'react'
import style from './styles/index.less'
import Clipboard from 'clipboard'




class TransactionDetailItem extends Component {

    constructor (props) {
        super(props);
        this.state = {
            show:false,
            copy:Clipboard.isSupported()
        }
    }

    /*构建*/
    componentDidMount(prevProps,prevState){
        var t=this;
        if(this.refs.copybtn&&Clipboard.isSupported()){
            var clipboard = new Clipboard(this.refs.copybtn);
            clipboard.on('success', function() {
                t.props.handelShowTips("已复制");
            });

            clipboard.on('error', function(msg) {
                alert(msg);
            });
        }
    }

    noCopy(){
        alert("当前版本不支持复制");
    }


    handerShowMore(){
        if(this.state.show){
            this.setState({"show":false})
        }else{
            this.setState({"show":true})
        }
    }

    detailInfo(isPhysical,data){
        if(isPhysical){
            return  <div className={style.bottom_info_left}>
                <div className={style.express}>
                    快递公司: {express}
                </div>
                <div className={style.number}>
                    快递单号: {number}
                </div>
            </div>
        }else{
            return <div className={style.bottom_info_left}>
                <div className={style.express}>
                    快递公司: {express}
                </div>
                <div className={style.number}>
                    快递单号: {number}
                </div>
            </div>
        }
    }

    physicalInfoRender(data){
        const noAddressInfo = ()=> (
            <div className={style.bottom_info}>
                <div className={style.bottom_info_left}>
                    <div className={style.express}>
                        暂无物流信息
                    </div>
                </div>

            </div>
        )

        const haveAddressInfo =()=> (
            <div className={style.bottom_info}>
                <div className={style.bottom_info_left}>
                    <div className={style.express}>
                        快递公司: {data.express.expressName||"暂无物流信息"}
                    </div>
                    <div className={style.number}>
                        快递单号: {data.express.expressNo||"暂无单号信息"}
                    </div>
                </div>

                {
                    (()=>{
                        if(data.express.expressNo){
                            return (
                                 this.state.copy?
                                    <div ref="copybtn" className={style.bottom_info_right} data-clipboard-text={data.express.expressNo}>
                                        复制
                                    </div>
                                :<div onClick={this.noCopy} className={style.bottom_info_right} >
                                    复制
                                </div>
                            )
                        }
                    })()
                }
            </div>
        )

        return data.express===null?noAddressInfo():haveAddressInfo()
    }

    virtualInfoRender(data){
        let copyText = "";
        if(!data.vCode[0]){
            return;
        }

        return  <div>
            <div className={style.bottom_info}>
                <div className={style.bottom_info_left}>
                    {
                        (()=>{
                            if(data.vCode[0].cardPwd===null|| typeof data.vCode[0].cardPwd === 'undefined'){
                                copyText = "激活码:"+data.vCode[0].cardNo;
                                return <div className={style.express}>
                                    激活码:{data.vCode[0].cardNo}
                                </div>
                            }else{
                                copyText = "序列号:"+data.vCode[0].cardNo+" 激活码:"+data.vCode[0].cardPwd;
                                return <div >
                                    <div className={style.express}>
                                        序列号: {data.vCode[0].cardNo}
                                    </div>
                                    <div className={style.number}>
                                        激活码: {data.vCode[0].cardPwd}
                                    </div>
                                </div>
                            }
                        })()
                    }
                    <div style={{display:this.state.show?"block":"none"}} className={style.more_info}>
                        {data.vCode.map((item,i)=>{
                            if(i===0){
                                return;
                            }
                            if(item.cardPwd===null|| typeof item.cardPwd === 'undefined'){
                                copyText = copyText+"; 激活码:"+item.cardNo;
                                return <div key={i} className={style.express}>
                                    激活码:{item.cardNo}
                                </div>
                            }else{
                                copyText = copyText+"; 序列号:"+item.cardNo+" 激活码:"+item.cardPwd;
                                return <div key={i}>
                                    <div className={style.express}>
                                        序列号: {item.cardNo}
                                    </div>
                                    <div className={style.number}>
                                        激活码: {item.cardPwd}
                                    </div>
                                </div>
                            }
                        })}
                    </div>
                </div>
                {
                    (()=>{
                        if(copyText){
                            return (
                                this.state.copy?
                                <div ref="copybtn" className={style.bottom_info_right} data-clipboard-text={copyText}>复制</div>
                                    :
                                <div onClick={this.noCopy} className={style.bottom_info_right} >复制</div>
                            )
                        }
                    })()
                }

            </div>
            {
                (()=>{
                    if(data.vCode.length>1){
                        return <div className={style.more_btn} onClick={this.handerShowMore.bind(this)}>{this.state.show?"收起更多":"展开更多"}</div>
                    }
                })()
            }
        </div>

    }

    orderStatusRender(data){
        let orderStatusText;
        switch(data.ordStatus){
            case "0":
                orderStatusText = "购买中";
                break;
            case "1":
                orderStatusText = "待发货";
                break;
            case "2":
                orderStatusText = "已发货";
                break;
            case "3":
                orderStatusText = "待付款";
                break;
            case "4":
                orderStatusText = "订单关闭";
                break;
            default:
                orderStatusText = "订单异常";
        }
        return orderStatusText
    }

    render(){
        const {data} = this.props;

        const isPhysical = data.product.pType==="PHYSICAL";
        const orderStatusText = this.orderStatusRender(data);

        return(

            <div className={style.container}>
                <div className={style.main_info}>
                    <div className={style.main_info_left}>
                        <img src={data.product.icon}/>
                        <div className={style.main_info_left_tag}>x{data.exchangeBusinessCount}</div>
                    </div>
                    <div className={style.main_info_right}>
                        <div className={style.main_info_right_info}>
                            <div className={style.name}>
                                {data.product.pName}
                            </div>
                            <div className={style.state}>
                                {orderStatusText}
                            </div>
                        </div>
                        <div className={style.main_info_right_date}>
                            {data.createDate}
                            {(data.exchangeStatuses && data.exchangeStatuses.length)
                            ? <span> {data.exchangeStatuses[0].exchangeBusinessNum}</span>
                                :""
                            }
                        </div>
                    </div>
                </div>

                {isPhysical?this.physicalInfoRender(data):this.virtualInfoRender(data)}



            </div>
        )
    }
}
export default TransactionDetailItem
