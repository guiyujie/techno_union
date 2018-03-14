import React, {Component} from 'react'
import {Button} from 'react-weui';
import styles from './styles/index.less'

class Tbutton extends Component {

    render(){
        return(
            <div className={styles.btn}>
                <button>{this.props.children}</button>
            </div>
        )
    }
};

export default Tbutton
