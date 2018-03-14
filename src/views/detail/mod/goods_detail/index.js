import React from 'react'
import styles from './styles/index.less'


const GoodsDetail = (props) => {

    const detail = props.data;
    const data = detail.data;

    return(
        <div className={styles.box}>
            <div className={styles.banner}>
                <h4>{data.pName}</h4>
                <div className={styles.sub_info}>
                    <p className={styles.price}>
                        <span>{detail.number}</span>&nbsp;{detail.bName}
                    </p>
                    <p className={styles.sales}>已兑换{data.exchangeNum}件</p>
                </div>
            </div>
            <div className={styles.detail}>
                <h4>商品详情</h4>
                <p dangerouslySetInnerHTML={{__html:data.description}}></p>
            </div>

        </div>
    )
};

export default GoodsDetail;
