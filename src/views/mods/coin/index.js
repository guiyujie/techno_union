import React, {Component} from 'react'
import styles from './styles/index.less'

class Coin extends Component {

    render(){
        return(
            <span className={styles.coin}>
                <img src={require("./styles/coin.png")} className={styles[this.props.small?"small":""]} /><label>{this.props.children}</label>
            </span>
        )
    }
};

export default Coin
