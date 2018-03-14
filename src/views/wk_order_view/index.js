import React, {Component} from 'react'
import {hashHistory} from 'react-router';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

//引入项目路径部分
import actions from 'Actions/user'
import {
    Form,
    Label,
    CellHeader,
    FormCell,
    CellBody,
    Button,
    CellFooter,
} from 'react-weui'

import {Gallery,DImg} from 'Coms/index';
import {vaild,regs} from 'Utils/regs'

import styles from './styles/index.less'
import PageLoading from 'Mods/pageloading';
//样式模块化是否是必须
class Worderview extends Component {
    //提供给服务器调用的fetch方法

    constructor (props) {
        super(props);
        this.state = {
            cur:0,
            showGallery:false,
            data:""
        }
    }

    componentWillMount() {
        if(!this.props.params.id){
            hashHistory.replace("/index")
        }
    }
    //页面的切换也需要重新挂载，也会触发，所以里面的ajax也需要做判断

    componentDidMount() {
        let {user_actions}  =this.props;
        user_actions.getSheetDetail({
            id:this.props.params.id
        }).then((res)=>{
            if(res.payload.data.status=='success'){
                this.setState({
                     data:res.payload.data.data
                });
            }else{
                user_actions.showToast({msg:res.payload.data.info});
            }
        })
    }

    componentWillUnmount() {
        let {user_actions} = this.props;
        user_actions.hideToast();
    }


    render() {
        let {data} = this.state;

        if (data) {
            return (
                <div className={styles.wrap}>
                    <div className={styles.header}>
                        <p><i className="icon icon-shouhuodizhi"> </i> {data.barAddress}</p>
                    </div>
                    <Form className={styles.forms}>
                        <FormCell>
                            <CellHeader>
                                <Label className={styles.title}>网吧GID</Label>
                            </CellHeader>
                            <CellBody>
                                <p>{data.gid}</p>
                            </CellBody>
                        </FormCell>
                        <FormCell >
                            <CellHeader>
                                <Label>网吧全称</Label>
                            </CellHeader>
                            <CellBody>
                                <p>{data.barName}</p>
                            </CellBody>
                        </FormCell>
                        {data.sheetType==1?
                            <FormCell>
                                <CellHeader>
                                    <Label className={styles.title}>业务类型</Label>
                                </CellHeader>
                                <CellBody>
                                    <p>{data.businessTypeDisplay}</p>
                                </CellBody>
                            </FormCell>
                            :""
                        }
                        <FormCell >
                            <CellHeader>
                                <Label className={styles.title}>开通日期</Label>
                            </CellHeader>
                            <CellBody>
                                <p>{data.enableDate}</p>
                            </CellBody>
                        </FormCell>
                    </Form>
                    <div className={styles.img_area}>
                        <ul>
                            <li onClick={(e) => this.setState({showGallery: true, cur: 0, title: "门头照"})}>
                                <p><DImg src={data.barPhotoInfo.pic1ThumbnailUrl}/></p>
                                <p>门头照</p>
                            </li>
                            <li onClick={(e) => this.setState({showGallery: true, cur: 1, title: "前台照"})}>
                                <p><DImg src={data.barPhotoInfo.pic2ThumbnailUrl}/></p>
                                <p>前台照</p>
                            </li>
                            <li onClick={(e) => this.setState({showGallery: true, cur: 2, title: "内部照"})}>
                                <p><DImg src={data.barPhotoInfo.pic3ThumbnailUrl}/></p>
                                <p>内部照</p>
                            </li>
                        </ul>
                    </div>
                    {
                        data.approve_word?
                            <div className={styles.desc}>
                                <p>小易回复:</p>
                                <label>{data.approve_word}</label>
                            </div>
                            :""
                    }
                    <Gallery src={[data.barPhotoInfo.pic1Url,data.barPhotoInfo.pic2Url,data.barPhotoInfo.pic3Url]} show={this.state.showGallery}>
                        <p
                            onClick={e => this.setState({showGallery: false})}
                            plain
                        >
                            确认
                        </p>
                    </Gallery>
                </div>
            )
        } else {
          return (
              <PageLoading> 正在加载中</PageLoading>
          )
        }
    }

}
//数据处理部分
function mapStateToProps(state,ownProps) {
    const {user} = state;
    return {

    }
}
//消息处理部分
function mapDispatchToProps(dispatch) {
    return {user_actions: bindActionCreators(actions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Worderview)



