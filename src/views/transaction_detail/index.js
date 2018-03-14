import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Link} from 'react-router'

import TransactionDetailItem from './mod/item'
import {ScrollList} from 'Coms/index'

//引入项目路径部分
import user_actions from 'Actions/user'
import styles from './styles/index.less'

import Empty from 'Mods/empty/exchange';
import PageLoading from 'Mods/pageloading';

class TransactionDetail extends Component {

    constructor (props) {
        super(props);
    }

    componentWillMount(){

    }



    componentDidMount(){
        const {user_actions} = this.props;
        document.body.scrollTop=0;
        user_actions.fetchTransactionDetail();
       // user_actions.fetchTransactionDetailTypeCount(user.userInfo.uid);
    }

    componentWillUnmount(){
        let {user_actions} = this.props;
        user_actions.hideToast();
    }

    handleLoading(){
        const {user_actions} = this.props;
        return new Promise((resolve, reject) => {
            user_actions.fetchTransactionDetail({page:+this.props.listPage.curPage+1}).then(()=>{
                resolve()
            }).catch(()=>{
                reject();
            })
        });

    }

    handelShowTips(text){
        const {user_actions} = this.props;
        user_actions.showToast({msg:text});
    }

    renderContent(){
        const list = this.props.list;
        const listPage = this.props.listPage;
        if(listPage.totalRows>0){
            return <ScrollList ListLoading={this.handleLoading.bind(this)} totalPage={listPage.maxPage} curPage={listPage.curPage}>
                        <ul>
                            {
                                list.map((datas,i)=>{
                                    return <TransactionDetailItem key={i} data={datas} handelShowTips={this.handelShowTips.bind(this)}/>
                                })
                            }

                        </ul>
                    </ScrollList>
        }else{
            return (
                 <Empty>
                     <p>空空如也</p>
                     <p>赶紧去商城挑选心仪的商品吧~</p>
                     <Link to="/mall">前往商城首页</Link>
                 </Empty>
            )
        }
    }

    render() {
        const listPage = this.props.listPage;
        if(listPage){
            return (
                <div className = {styles.container}>
                    {this.renderContent()}
                </div>
            )
        }else{
            return (
                <PageLoading>数据加载中</PageLoading>
            )
        }

    }
}

function mapStateToProps(state,ownProps) {
    const {user} = state;
    return {
        list:user.list,            //交易明细列表
        listPage:user.listPage,
        scoreCount:user.scoreCount,
        moneyCount:user.moneyCount,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        user_actions: bindActionCreators(user_actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionDetail)

