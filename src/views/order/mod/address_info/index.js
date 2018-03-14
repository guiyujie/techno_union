import React from 'react'
import styles from './styles/index.less'

const AddrssInfo = (props) => {

    const {address,handleRouter} = props;

    return(
        <div className={styles.box} onClick={handleRouter}>
            <div className={styles.info}>
                {
                    address.receiver?(
                        <div>
                            <p className={styles.name}>{address.receiver}&nbsp;&nbsp;&nbsp;<span>{address.phoneNum}</span></p>
                            <div className={styles.address}>
                                <p><i className="icon icon-map-marker"></i>{`${address.provinceName}${address.cityName}${address.countyName?address.countyName:''}${address.address}`}</p>
                            </div>
                        </div>

                    ):(
                        <span className={styles.tips}>暂无收货地址，请添加收货地址</span>
                    )
                }
            </div>
            <div className={styles.link}>
                <i className="icon icon-angle-right"></i>
            </div>
        </div>
    )
}

export default AddrssInfo
