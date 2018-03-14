import React, {Component} from 'react'

import OrderList from './list';


//样式模块化是否是必须
class ProcessOrder extends Component {

    constructor (props) {
        super(props);

    }
    render() {

        return (
            <OrderList status={0} sheets="processSheet">

            </OrderList>
        )
    }
}

export default ProcessOrder

