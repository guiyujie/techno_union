import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

//引入项目路径部分
import actions from 'Actions/user'

import style from './styles/index.less'


//样式模块化是否是必须
class IntegralDetailItem extends Component {

    static prevProps = {
        //input自带属性
        name:PropTypes.string,//名称
        date:PropTypes.string,//日期
        num:PropTypes.string,//数量
    }

    static defaultProps = {
        name:"",
        date:"",
        num:""
    }


    //页面的切换也需要重新挂载，也会触发，所以里面的ajax也需要做判断
    componentDidMount(prevProps,prevState){

    }

    componentDidUpdate(prevProps,prevState){


    }


    render() {
        return (
            <div className = {style.container}>
                <div className={style.left_box}>
                    <div className={style.item_name}>
                        {this.props.name}
                    </div>
                    <div className={style.item_date}>
                        {this.props.date}
                    </div>
                </div>
                <div className={style.right_box}>
                    <span className={this.props.num>0?style.orange:style.green}>{this.props.num}</span>
                </div>
            </div>
        )

    }
}

//数据处理部分
function mapStateToProps(state,ownProps) {
    //请勿在connect函数中，把整个全局state都传入，只传入需要监听的，全部传入会摧毁性能优化，因为这样mall会在任何action之后都进行一次重渲。
    const {index,user} = state;

    return {
        index,
        user   //此处新建立了一个user对象，没有直接修改原来的userInfo对象的结构
    }
}

//消息处理部分
function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IntegralDetailItem)
