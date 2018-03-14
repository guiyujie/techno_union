import React, {Component,PropTypes} from 'react'

import styles from './styles/index.less'

//样式模块化是否是必须
class Dialog extends Component {

    handleClose(){
        if(this.props.onClose){
            this.props.onClose()
        }
    }

    render() {
        let state = this.props;

        return (
            <div className={styles.wrap} style={{display:state.show?"":"none"}}>
               <div className={styles.bg} >

               </div>
                <div className={styles.con+' '+(state.show?"weui-animate-zoom-in":"weui-animate-zoom-out")} >
                    {this.props.children}
                    <div className={styles.close} onClick={(e)=>this.handleClose()}>
                        <i className="iconfont icon-guanbi"></i>
                    </div>
                </div>
            </div>
        )
    }
}




export default Dialog;
