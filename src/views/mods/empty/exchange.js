import React from 'react'
import styles from './styles/index.less'
import picture from './styles/empty.png'

const Empty = (props) => {

    return(
        <div className={styles.area}>
            <div className={styles.image}><img src={picture} /></div>
            <div className={styles.tips}>
                {props.children}
            </div>
        </div>
    )
}

export default Empty
