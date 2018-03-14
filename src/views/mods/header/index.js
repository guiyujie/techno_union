import React from 'react'
import styles from './styles/index.less'
import { Link } from 'react-router'

import BindPassportBanner from 'Mods/banner';


const Header = (props) => {

	const {login,user}=props;

    return(
    	login&&user?
        <div className={styles.header}>
        	<div className={styles.avator}>
        		<div className={styles.wrap}>
        			<img src={user.logoPath} />
        		</div>
        	</div>
        	<p className={styles.username}>{user.nickName}</p>
        	<p className={styles.tips}>
                <Link to="/home/transactionDetail">查看交易记录</Link>
            </p>
        </div>:
        <BindPassportBanner tips="绑定账号后可进行充值业务" />
    )
};

export default Header
