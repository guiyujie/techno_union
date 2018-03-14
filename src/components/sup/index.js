import React, {Component} from 'react'
import styles from './styles/index.less'


//角标组件
class Sup extends Component {


    render() {
        return (
            <div className={styles.sup}>
				 {this.props.children}
			</div>
        )
    }
}




export default Sup
