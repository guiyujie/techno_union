import React, {Component} from 'react'
import styles from './styles/index.less'


class Guide extends Component {

    constructor (props) {
        super(props);
        this.state={
           show:true
        }
    }


    handleClose(){
        localStorage.setItem("st_sempty",1);
        this.setState({
            show:false
        })
    }

    render(){
        let show= this.state.show,se = sData.isFirstVisit;
        if(se=="0"){
            show = false;
        }
        return(
            <div>
                <div className={styles.mask} style={{display:show?"":"none"}}>

                </div>
                <div className={styles.con} style={{display:show?"":"none"}}>
                    <div className={styles.tips}>
                        <div className={styles.img_bg}>

                        </div>
                        <div className={styles.img}>
                            <img src={require('./styles/coin.png')} />
                        </div>
                        <div className={styles.img_bg1}>

                        </div>
                    </div>
                    <div className={styles.txt}>
                        <p>注册成功</p>
                        <p>恭喜您获得<label>{sData.weixinAuthedYiLiCoin||"5"}</label>易力币</p>
                    </div>
                    <div className={styles.arrow}>
                        <div className={styles.btn}  onClick={(e)=>this.handleClose()}>开启精彩之旅</div>
                    </div>
                    <div className={styles.close} onClick={(e)=>this.handleClose()}>
                        <i className="icon icon-guanbi"> </i>
                    </div>
                </div>

            </div>
        )
    }
}

export default Guide
