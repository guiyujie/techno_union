import React, {Component} from 'react'

import { hashHistory } from 'react-router'


import styles from './styles/index.less'
import {Button,Msg} from 'react-weui'

//样式模块化是否是必须
class WorkOrderSuccess extends Component {

    constructor (props) {
        super(props);


    }
    componentWillMount(){

    }

    componentDidMount(){

    }

    componentDidUpdate(){

    }

    handleRouter1(){
        hashHistory.push("/home/order/my");
    }


    render() {
        const title = "提交成功";
        return (
            <div className ={styles.wrap}>
                <Msg
                    type="success"
                    title={title}
                    className={styles.bgcolor}
                    buttons={[{
                        type: 'primary',
                        label: '查看我的工单',
                        onClick: this.handleRouter1.bind(this)
                    }]}
                />
                <p>请耐心等待,我们将在7-10个工作日给予答复</p>
            </div>
        )

    }
}

export default WorkOrderSuccess

