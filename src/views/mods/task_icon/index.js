import React, {Component} from 'react'
import {Button} from 'react-weui';
import styles from './styles/index.less'

class TaskIcon extends Component {

    render(){
        let {color,icon} = this.props;
        let c = styles[color];
        return(
            <div className={`${styles.task} ${c}`}>
                <i className={`icon icon-${icon}`}> </i>
            </div>
        )
    }
};

export default TaskIcon
