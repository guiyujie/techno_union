/**
 * 开发环境入口文件
 */
import DevTools from './devtools';

import React from 'react';
import style from './styles/index.less'

//引入全局toast
import CommonTip from './mod/tip';
//引入用户模块
import CommonUser from './mod/user';
import Guide  from 'Mods/guide';

export default class Root extends React.Component {
  render () {
    return (
      <div className={style.root}>
        {this.props.children}
       <CommonTip/>
       <CommonUser/>
         <DevTools/>
         <Guide/>
      </div>
    )
  }
}
