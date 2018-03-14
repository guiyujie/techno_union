import React, {Component} from 'react'
import {Link} from 'react-router'
//引入react-weui
import {TabBar,TabBody,TabBarItem,TabBarIcon,TabBarLabel} from 'react-weui';
import styles from './styles/index.less'

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab:this.props.active || 0 //默认选中0
        };
    }

    render() {
        let {data}  = this.props;
        return (
            <div className={styles["navbar"]}>
                <TabBar>
                        { data.map((item,idx)=>
                            <TabBarItem active={this.state.tab == idx} onClick={e=>this.setState({tab:idx})}  key={item.id}  >
                                <Link to={item.href}>
                                    <TabBarIcon>
                                        <span className={this.state.tab == idx?item.icon_active:item.icon} >

                                        </span>
                                    </TabBarIcon>
                                    <TabBarLabel>
                                            {item.name}
                                    </TabBarLabel>
                                </Link>
                            </TabBarItem>
                        )}

                </TabBar>
            </div>
        );
    }
}

export default Navigation;
