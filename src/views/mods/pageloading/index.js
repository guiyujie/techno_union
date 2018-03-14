import React from 'react'
import styles from './styles/index.less'

const PageLoading = (props) => {

    return(
        <div className={styles.area}>
            <div className={styles.loader}>
                <div className={styles.loading4}>
                    <i> </i>
                </div>
            </div>
            <div className={styles.tips}>
                <p>{props.children}</p>
            </div>
        </div>
    )
}

export default PageLoading
