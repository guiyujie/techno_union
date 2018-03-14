import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

//引入项目路径部分
import actions from 'Actions/user'

import style from './styles/index.less'

import IntegralDetailItem from './mod/item'

import Empty from 'Mods/empty';
import PageLoading from 'Mods/pageloading';
import {ScrollList} from 'Coms/index'
//样式模块化是否是必须
class IntegralDetail extends Component {


    //页面的切换也需要重新挂载，也会触发，所以里面的ajax也需要做判断
    componentDidMount(prevProps,prevState){
		const {fetchYiLiCoinDetailList} = this.props.actions;
		fetchYiLiCoinDetailList();
    }

    componentDidUpdate(prevProps,prevState){


    }

    handleLoading(){
        const {yiLiCoinDetailData,actions} = this.props;
        return new Promise((resolve, reject) => {
            actions.fetchYiLiCoinDetailList({page:+yiLiCoinDetailData.page+1}).then(()=>{
                resolve()
            }).catch(()=>{
                reject();
            })
        });
    }

    renderCnt(){
         const {yiLiCoinDetailData} = this.props;
         const {datas} = yiLiCoinDetailData;
         if(yiLiCoinDetailData.totalCount>0){
             return <ScrollList ListLoading={this.handleLoading.bind(this)} totalPage={Math.ceil(yiLiCoinDetailData.totalCount/yiLiCoinDetailData.pageSize)} curPage={yiLiCoinDetailData.page}>
                 <ul>
                     {
                         datas.map(function(item){
                             return <IntegralDetailItem name={item.description} date={item.createTime} num={(item.flag==0?"+":"-")+item.amount}/>
                         })
                     }

                 </ul>
             </ScrollList>
         }else{
             return (
                 <Empty>暂无记录</Empty>
             )
         }
     }

    render() {
    	const t = this;
    	const {yiLiCoinDetailData} = t.props;
    	if(yiLiCoinDetailData){
    	    return (
                <div className = {style.container}>
                    <div className = {style.info_banner}>
                        <div className = {style.user_info}>
                            <div className = {style.user_integral}>
                                易力币余额
                            </div>
                            <div className = {style.user_info_line}>
                                <span className = {style.user_integral_number}>{yiLiCoinDetailData.yiLiCoin}</span>
                            </div>
                        </div>
                    </div>
                    {this.renderCnt()}
                </div>
            )
        }else{
            return (
                <PageLoading>数据加载中</PageLoading>
            )
        }

    }
}

//数据处理部分
function mapStateToProps(state,ownProps) {
    //请勿在connect函数中，把整个全局state都传入，只传入需要监听的，全部传入会摧毁性能优化，因为这样mall会在任何action之后都进行一次重渲。
    const {index,user} = state;

    return {
        index,
        yiLiCoinDetailData:user.yiLiCoinDetailData
    }
}

//消息处理部分
function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IntegralDetail)

