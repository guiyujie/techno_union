import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

//引入项目路径部分
import actions from 'Actions/user'

import styles from './styles/index.less'

import {ScrollList} from 'Coms/index';

import OrderItem from './mod/item';
import Empty from './mod/empty';

//样式模块化是否是必须
class OrderList extends Component {

    constructor (props) {
        super(props);
        this.state = {

        }
    }


    componentDidMount(){
        let {actions,status}  =this.props;
        actions.getSheetList({
            status:status
        });
    }

    componentDidUpdate(prevProps,prevState){


    }
    //处理加载
    handleLoading() {
        let {actions, status, sheets}  = this.props;

        return new Promise((resolve, reject) => {
            actions.getSheetList({
                status: status,
                page: +sheets.page + 1
            }).then(() => {
                resolve();
            });
        });

    }


    render() {
        let {status,sheets} = this.props;
        let datas = sheets.datas;
        if(sheets){
            if(sheets.totalCount>0) {
                return (
                    <div className={styles.box}>
                        <ScrollList ListLoading={this.handleLoading.bind(this)} totalPage={sheets.maxPage} curPage={sheets.page}>
                            {datas.map((item) => {
                                return (
                                    <OrderItem status={status} data={item} actions={this.props.actions}/>
                                )
                            })}
                        </ScrollList>
                    </div>
                )
            }else{
                return (
                    <div className = {styles.box}>
                        <Empty />
                    </div>
                )
            }
        }else{
            return (
                <div className = {styles.box}>
                    <p className={styles.loadtip}>数据获取中...</p>
                </div>
            )
        }
    }
}



//数据处理部分
function mapStateToProps(state,ownProps) {
    //请勿在connect函数中，把整个全局state都传入，只传入需要监听的，全部传入会摧毁性能优化，因为这样mall会在任何action之后都进行一次重渲。
    const {user} = state;
    return {
        sheets:user[ownProps.sheets]
    }
}

//消息处理部分
function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderList)

