import React, {Component} from 'react'
import styles from './styles/index.less'


//默认图片组件
class DImg extends Component {

    constructor (props) {
        super(props);
        this.state={
            error:false,
        }
    }

    //错误处理
    errorHandle(){
         this.setState({
             error:true
         })
    }

    render() {
        let {error} = this.state;
        if(error){
            return (
                <div className={styles.wrap}>
                    <img className={styles.img} />
                    <div className={styles.flow}>
                            <i className="icon icon-zanwutupian"> </i>
                            <p>暂无图片</p>
                    </div>
                </div>
            )
        }else{
            return (
                <img src={this.props.src} alt={this.props.alt} title={this.props.title} onError={(e)=>this.errorHandle(e)} />
            )
        }
    }
}

export default DImg
