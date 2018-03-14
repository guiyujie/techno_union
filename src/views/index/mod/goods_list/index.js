import React from 'react'
import styles from './styles/index.less'

import ScrollList from 'Coms/scroll_list'
import Goods from 'Mods/goods'

import Empty from 'Mods/empty/mall';

const GoodsList = (props) => {

    const {goodsList,listPage,handleLoading}=props;

    //不带滚动监听的列表对象
    const normalList = (()=>{
        if(goodsList && goodsList.length){
            return <ul>
                    {
                        goodsList.map((datas,i)=>{
                            return <Goods key={i} data={datas} />
                        })
                    }
                </ul>
        }else{
            return <Empty>
                        <p>暂无内容</p>
                    </Empty>
        }
    });

    //带有滚动监听的列表对象
    const scrollList = (()=>{
          if(!handleLoading){
            return
          }
        return  <ScrollList ListLoading={handleLoading} totalPage={Math.ceil(listPage.totalRows/12)} curPage={listPage.curPage}>
                    {normalList()}
                </ScrollList>
    });

    //只有当前显示的列表才会监听其滚动，否则会一次触发三次加载
    return(
        <div className={styles.wrap}>
            {handleLoading===""?normalList():scrollList()}
        </div>
    )
}


export default GoodsList

