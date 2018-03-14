import React, {Component} from 'react'
import {Link} from 'react-router'
import {Button} from 'react-weui';
import styles from './styles/index.less'

class PanelTitle extends Component {

    render(){
        let {title,desc,icon,link,linktext,linktarget} = this.props;
        return(
            <div className={styles.title}>
                <h5>{title} <label>{desc}</label> <span>{icon?<i className={`icon icon-${icon}`}> </i>:""} {link?<Link to={link} target={linktarget||""}>{linktext}</Link>:""}</span></h5>
            </div>
        )
    }
};

export default PanelTitle
