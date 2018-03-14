import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import CityPicker from 'Coms/city_picker'

import actions from 'Actions/index'

class CitySelect extends Component {

    constructor (props) {
        super(props);

        this.state = {
            provinceId:'',
            cityId:'',
            countyId:'',
            text:''
        }

    }
    //页面的切换也需要重新挂载，也会触发，所以里面的ajax也需要做判断
    componentDidMount(){
        let {actions,cityList}= this.props;
        /* 使用本地数据
        if(!cityList){
             actions.getProvinceCityList();
        }
        */
    }

    componentDidUpdate(){

    }
    onChange(opt){
        this.state.provinceId = ( opt.groups[0] &&opt.groups[0].items && opt.groups[0].items.length &&  opt.groups[0].items[opt.selected[0]].code) || '';
        this.state.cityId = (opt.groups[1] && opt.groups[1].items && opt.groups[1].items.length && opt.groups[1].items[opt.selected[1]].code) || '';
        this.state.countyId = (opt.groups[2] && opt.groups[2].items && opt.groups[2].items.length &&  opt.groups[2].items[opt.selected[2]].code) || '';


        if(!opt.text){
            //解决选择第一个列表获取不到值的bug
            opt.text = opt.groups[0].items[opt.selected[0]].name;
            if(opt.groups[1]){
                opt.text += ' '+opt.groups[1].items[opt.selected[1]].name;
            }
            if(opt.groups[2]){
                opt.text += ' '+opt.groups[2].items[opt.selected[2]].name;
            }
        }
        this.state.text=opt.text || '';
        if (this.props.onChange) this.props.onChange({...this.state});
    }

    render(){
        let {cityList,show,onCancel,text} =this.props;
        if(cityList) {
            return (
                <CityPicker
                    data={cityList}
                    text={text}
                    onCancel={onCancel}
                    onChange={(opt)=>{this.onChange(opt)}}
                    show={show}
                />
            )
        }else{
            return (
                <CityPicker
                    onCancel={onCancel}
                    text={text}
                    onChange={(opt)=>{this.onChange(opt)}}
                    show={show}
                />
            )
        }
    }
};

//数据处理部分
function mapStateToProps(state,ownProps) {
    //请勿在connect函数中，把整个全局state都传入，只传入需要监听的，全部传入会摧毁性能优化，因为这样mall会在任何action之后都进行一次重渲。
    const {mall} = state;
    return {
        cityList:mall.cityList
    }
}

//消息处理部分
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CitySelect)
