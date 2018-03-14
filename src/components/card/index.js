import React, {Component,PropTypes} from 'react'
import lang from 'Lang';


import styles from './styles/index.less'

//样式模块化是否是必须
class Card extends Component {


    constructor (props) {
        super(props);

    }


    render() {
        let {card} = this.props;
        let s = [styles.card];
        if(card.expire>0){
            s.push(styles.card_disabled);
        }
        s = s.join(" ");
        return (
            <div className={s}>
                <div className={styles.card_top}>
                    <div className={styles.card_coin}>
                        <label className={styles.card_coin_num}>{card.count}</label> 游戏币
                    </div>
                    <div className={styles.card_date}>
                        有效期至: {lang.get("expires_tip")||card.expireTime}
                    </div>
                    {card.type > 0 ?
                        <i className={styles.sup_free}> </i>
                    : ''}
                </div>
                <div className={styles.card_info}>
                    <img className={styles.card_qcord} src={card.qr}/>
                    <p>
                        {lang.get("card_tip")}
                    </p>
                </div>

            </div>
        )
    }
}

export default Card;
