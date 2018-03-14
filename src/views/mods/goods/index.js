import React from 'react'
import styles from './styles/index.less'
import { Link } from 'react-router'

import Coin  from 'Mods/coin';
import {DImg} from 'Coms/index';

const getSTCurrency = function(item){
    return item.price;
}


const Goods = (props) => {

    const {data}=props
    const num =data.price;//此项目中只有一种货币

    return(
        <li className={styles.box}>
            <div className={styles.img}>
                <Link to={"/mall/detail/"+data.pId}>
                    <DImg src={data.image} alt="商品描述" />
                </Link>
            </div>
            <div className={styles.sub}>
                <p className={styles.title}>{data.pName}</p>
                <p className={styles.integral}>
                    <Coin small="1">{num}</Coin>
                </p>
            </div>
        </li>
    )
};

export default Goods
