import React, {Component} from 'react'
import styles from './styles/index.less'

//component组件
class ScrollList extends Component {
    //设置默认props
    static defaultProps = {
        loadMsg:"加载中...",
        endMsg:"没有更多了",
        endTipsTime:1500,
        totalPage:0,
        curPage:0
    }

    //构造
    constructor(props) {
        super(props);
        //构造函数是唯一能执行this.state来赋值的地方
        this.state = {
            loading:false,
            loadEnd:false
        }
        const {totalPage,curPage,ListLoading} =this.props;


        if(totalPage>curPage){
            this.ListLoading = ListLoading;
            this.ListScroll = this.ListScroll.bind(this);

        }
    }

    //渲染后
    componentDidMount() {
        const {totalPage,curPage} =this.props;
        if(totalPage>curPage) {
            //下拉刷新监听绑定
            window.addEventListener('scroll', this.ListScroll);
        }
    }

    //卸载后
    componentWillUnmount(){
        //移除监听
        const {totalPage,curPage} =this.props;
        if(totalPage>curPage) {
            window.removeEventListener('scroll', this.ListScroll);
        }
        this.timer && window.clearTimeout(this.timer);
    }


    componentWillReceiveProps(nextProps){
        if(nextProps!==this.props){
            //当收到新数据后就还原加载状态
            this.setState({loading:false});
        }
    }
    //判断当前滚动的方向是否往下
    stepToDownFn(num){
       let t=this,a;
       //记录上次滚动位置
       if(!t.lastTop){
           t.lastTop = 0;
       }
       a = t.lastTop<num;
       t.lastTop = num;
      // console.log("lastTop",t.lastTop,a);
       return a;
    }
    //滚动时监听的方法
    ListScroll(e) {
        let t=this;
        if(t.loading) return;
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        let stepToDown = t.stepToDownFn(scrollTop);
        if(stepToDown && t.props.totalPage !== t.props.curPage){
            let offsetHeight = document.body.offsetHeight || document.documentElement.offsetHeight;
            if (scrollTop!==0 && scrollTop > offsetHeight-window.innerHeight  - 30) {
                //执行setState方法会自动立即调用render方法，在这里render方法会在t.ListLoading方法之前执行
                t.setState({loading:true});
                t.loading = true;
                t.ListLoading().then(()=>{
                    t.setState({
                        loading:false
                    },()=>{t.loading=false})
                })

            }
        }else if(stepToDown && !t.state.loadEnd && t.props.totalPage === t.props.curPage){
            let offsetHeight = document.body.offsetHeight || document.documentElement.offsetHeight;
                if (scrollTop!==0 && scrollTop > offsetHeight-window.innerHeight - 30) {
                    t.setState({loadEnd:true,loading:true});
            }
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
                <div className={styles.tips}>{this.state.loading?this.state.loadEnd?this.props.endMsg:this.props.loadMsg:" "}</div>
            </div>
        )
    }
}

export default ScrollList
