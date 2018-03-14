import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'


import Clipboard from 'clipboard'
import user_actions from 'Actions/user'
import styles from './styles/index.less'

//样式模块化是否是必须
class TaskGuide extends Component {

    constructor (props) {
        super(props);


    }
    componentWillMount(){

    }

    componentDidMount(){
        var t=this;
        let {user_actions}= this.props;
        if(this.refs.copybtn&&Clipboard.isSupported()){
            this.refs.copybtn.style.display="block";
            var clipboard = new Clipboard(this.refs.copybtn);
            clipboard.on('success', function() {
                user_actions.showToast({msg:"已复制"});
            });

            clipboard.on('error', function() {

            });
        }
    }

    componentDidUpdate(prevProps,prevState){

    }



    render() {

        return (
            <div className ={styles.wrap}>
                <div>
                    <img src={require("./styles/1.png")} />
                    <p>
                        下载地址: <label>http://www.yileyoo.com/download?id=30</label><br/>
                        <button ref="copybtn" data-clipboard-text="http://www.yileyoo.com/download?id=30">点此复制</button>
                    </p>
                </div>
                <div>
                    <img src={require("./styles/2.png")} />
                </div>
                <div>
                    <img src={require("./styles/3.png")} />
                </div>

            </div>
        )

    }
}


//数据处理部分
function mapStateToProps(state,ownProps) {
    //请勿在connect函数中，把整个全局state都传入，只传入需要监听的，全部传入会摧毁性能优化，因为这样mall会在任何action之后都进行一次重渲。
    const {user} = state;
    return {

    }
}

//消息处理部分
function mapDispatchToProps(dispatch) {
    return {
        user_actions:bindActionCreators(user_actions,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskGuide)


