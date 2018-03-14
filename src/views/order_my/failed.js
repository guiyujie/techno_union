import React, {Component} from 'react'

import OrderList from './list';


//样式模块化是否是必须
class FailedOrder extends Component {

    constructor (props) {
        super(props);

    }
    render() {

        return (
            <OrderList status={2} sheets="failedSheet">

            </OrderList>
        )
    }
}

export default FailedOrder

