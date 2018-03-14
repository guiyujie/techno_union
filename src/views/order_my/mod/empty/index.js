import React from 'react'
import styles from './styles/index.less'
import picture from './styles/empty.png'


const EmptyAddress = (props) => {

    return(
        <div className={styles.area}>
            <div className={styles.image}><img src={picture} /></div>
            <div className={styles.tips}>
                <p>暂无工单</p>
            </div>
        </div>
    )
}

export default EmptyAddress
