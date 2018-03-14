import React from 'react'
import styles from './styles/index.less'
import { hashHistory } from 'react-router'


const toIndex = ()=>{
    hashHistory.replace("/index");
};



const  NoutFoundPage = (props) => {

    return(
        <div className={styles.container}>
            <img src={require('./styles/404.png')} />
            <div>哎呀，您请求的页面丢到外太空了</div>
            <div className={styles.botton} onClick={toIndex}>返回首页</div>
        </div>
    )
}

export default NoutFoundPage
