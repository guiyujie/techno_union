import React from 'react'
import styles from './styles/index.less'
import { hashHistory } from 'react-router'

const toIndex = ()=>{
	hashHistory.replace("/");
}

const  NoutFoundPage = (props) => {


    return(
    	<div className={styles.container}>
    	    <img src="Public/static/images/500.png"/>
    	    <div>Sorry!您访问的页面出错了!</div>
    	    <div className={styles.botton} onClick={toIndex}>返回首页</div>
    	</div>
    )
}

export default NoutFoundPage
