import React from 'react'
import styles from './styles/index.less'

const AddrssList = (props) => {

    const {
        addressList,
        selectAddressId,
        handleSelected,
        handleNavToEditAddress
    }=props

    return(
        <ul>
            {
                addressList.map((address,i)=>{
                    return (
                        <li key={i} className={styles.box}>
                            <div
                                className={`${styles.flag} ${address.id==selectAddressId?styles.selected:''}`}
                                onClick={handleSelected.bind(this,i)}>
                                <span className={`icon icon-address ${styles.isize}`}></span>
                            </div>
                            <div className={styles.info} onClick={handleSelected.bind(this,i)}>
                                <p className={styles.name}>{address.receiver}&nbsp;&nbsp;&nbsp;{address.phoneNum}</p>
                                <div className={styles.address}>
                                    <p><span className={address.isDefault==1?styles.default:''}>【默认】</span>
                                        {`${address.provinceName}${address.cityName}${address.countyName?address.countyName:''}${address.address}`}</p>
                                </div>
                            </div>
                            <div className={styles.link} onClick={handleNavToEditAddress.bind(this,address.id)}>
                                <div className={styles.border}>
                                    <span className={`icon icon-edit ${styles.size}`}></span>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default AddrssList
