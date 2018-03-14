import React, {Component} from 'react'
import {Button} from 'react-weui';
import styles from './styles/index.less'

class FixedBtn extends Component {
    handleSubmit(){
        let {disabled,handleSubmit} = this.props;
        if(disabled){
            return false;
        }
        handleSubmit();
    }

    render(){
        let {disabled,children} = this.props;

        return(
            <div className={styles.btn_bottom}>
                <Button className={disabled?"weui-btn_disabled "+styles.btn:styles.btn} onClick={this.handleSubmit.bind(this)}>{children}</Button>
            </div>
        )
    }
};

export default FixedBtn
