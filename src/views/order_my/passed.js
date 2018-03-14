import React, {Component} from 'react'

import OrderList from './list';


//样式模块化是否是必须
class PassedOrder extends Component {

    constructor (props) {
        super(props);

    }
    render() {

        return (
            <OrderList status={1} sheets="passedSheet">

            </OrderList>
        )
    }
}

export default PassedOrder

