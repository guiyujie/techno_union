import React from 'react'
import styles from './styles/index.less'
import picture from './styles/empty.png'

const EmptyAddress = (props) => {

    return(
        <div className={styles.area}>
            <div className={styles.image}><img src={picture} /></div>
            <div className={styles.tips}>
                <p>暂无收货地址</p>
                <p>立即新增一条收货地址吧</p>
            </div>
        </div>
    )
}

export default EmptyAddress
