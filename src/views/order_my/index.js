import React, {Component} from 'react'
import {hashHistory} from 'react-router';


import style from './styles/index.less'

import {
    Tab,
    TabBody,
    NavBar,
    NavBarItem
}  from 'react-weui';


//样式模块化是否是必须
class MyOrder extends Component {

    constructor (props) {
        super(props);
        this.state={
            tabs:[
                {id:1,text:"待审核",link:"/home/order/my/process"},
                {id:2,text:"审核通过",link:"/home/order/my/passed"},
                {id:3,text:"审核失败",link:"/home/order/my/failed"}
            ]
        };

    }
    _getCurrentTab(){
         //处理url进入
         var idx = this.state.tabs.findIndex((n)=>location.hash.indexOf(n.link)!=-1);
         return  idx>-1?idx:0;
    }
    //页面的切换也需要重新挂载，也会触发，所以里面的ajax也需要做判断
    componentDidMount(){

    }

    componentDidUpdate(){

    }

    handleTabClick(link){
        hashHistory.replace(link);
    }

    render() {
        let {tabs} = this.state;
        let tab  = this._getCurrentTab();
        return (
            <div className = {style.container}>
                <div className = {style.info_banner}>
                    <Tab>
                        <NavBar>
                            { tabs.map((item,idx)=>
                                <NavBarItem active={tab == idx} onClick={(e)=>{this.handleTabClick(item.link)}}  key={item.id}>{item.text}</NavBarItem>
                            )}
                        </NavBar>
                    </Tab>
                </div>
                <div className={style.list_area}>
                    {this.props.children}
                </div>

            </div>
        )

    }
}


export default MyOrder

