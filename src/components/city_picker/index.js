import React from 'react';
import PropTypes from 'prop-types';
import Picker from '../picker';
import {cityList,cityData} from './data/data';


/**
 *  An city pick component build on top of picker
 *
 */
class CityPicker extends React.Component {

    static propTypes = {
        /**
         * Array of item trees, consists property for label and subitems
         *
         */
        data: PropTypes.array,
        /**
         * keys for data provide, `id` to indicate property name for label, `items` to indicate property name for subitems
         *
         */
        dataMap: PropTypes.object,

        /**
         * display the component
         *
         */
        show: PropTypes.bool,


        lang: PropTypes.object
    }

    static defaultProps = {
        data: cityList,
        dataMap: { id: 'name', items: 'sub' },
        show: false,
        lang:{
            "leftBtn":"取消",
            "rightBtn":"确定"
        }
    };

    _getSelectedBytext(txt){
        const {data,dataMap} = this.props;
        //处理txt未做 空格 分离的情况
        if(txt.indexOf(" ")==-1){
            txt = txt.replace(/([省市区县])/ig,"$1 ").replace(/\s$/,"");
        }

        let arr = txt.split(" "),selected=[],dl;

        let fn = function(a,b,c){
            let d;
            a.every((item,idx)=>{
                if(item[dataMap.id]==b){
                    selected[c] = idx;
                    d = item;
                    //跳出循环
                    return false;
                }
                return true;
            });
            return d;
        };
        //省
        if(arr[0]){
           dl = fn(data,arr[0],0);
        }
        //市
        if(arr[1] && dl){
            dl = fn(dl[dataMap.items],arr[1],1);
        }
        //县
        if(arr[2] && dl){
            dl = fn(dl[dataMap.items],arr[2],2);
        }

        return selected;
    };

    constructor(props){
        super(props);
        let{ data, dataMap ,text} = this.props;
        let selected;
        //根据text查询selected
        if(text) {
            selected = this._getSelectedBytext(text);
        }
        const { groups, newselected } = this.parseData(data, dataMap.items, selected);
        this.state = {
            groups,
            selected: newselected,
            picker_show: false,
            text: ''
        };
        //console.log(this.state.groups)
        this.updateGroup = this.updateGroup.bind(this);
        this.parseData = this.parseData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //@return array of group with options
    parseData(data, subKey, selected = [], group = [], newselected = []){
      let _selected = 0;

      if ( Array.isArray(selected) && selected.length > 0){
        let _selectedClone = selected.slice(0);
        _selected = _selectedClone.shift();
        selected = _selectedClone;
      }

      if (typeof data[_selected] === 'undefined'){
          _selected = 0;
      }

      newselected.push(_selected);

      let item = data[_selected];

      var _group = JSON.parse(JSON.stringify(data));
      _group.forEach(g=>delete g[subKey]);
      group.push({ items: _group, mapKeys: { 'label': this.props.dataMap.id } });

      if (typeof item[subKey] !== 'undefined' && Array.isArray(item[subKey]) && item[subKey].length>0){
        return this.parseData(item[subKey]||[], subKey, selected, group, newselected);
      } else {
        return { groups: group, newselected };
      }
    }


    updateGroup(item, i, groupIndex, selected, picker){
        const { data, dataMap } = this.props;
        //validate if item exists

        const { groups, newselected } = this.parseData(data, dataMap.items, selected);


        let text = '';
        try {
            groups.forEach( (group, _i) => {
                text += `${group['items'][selected[_i]][this.props.dataMap.id]} `;
            });
        } catch (err){
            //wait
            text = this.state.text;
        }


        //console.log(groups)
        this.setState({
            groups,
            text,
            selected: newselected
        });

        //update picker
        picker.setState({
            selected: newselected
        });
    }

    componentDidMount(){
        let{ text} = this.props;
        //默认选中
        if(text){
            this.props.onChange(this.state);
        }
    };
    handleChange(){
        if (this.props.onChange) this.props.onChange(this.state);
    }

    render(){
        return (
        	<div style = {{fontSize:'16px'}}>
	            <Picker
	             	show={this.props.show}
	                onGroupChange={this.updateGroup}
	                onChange={this.handleChange}
	                defaultSelect={this.state.selected}
	                groups={this.state.groups}
	                onCancel={this.props.onCancel}
	                lang = {this.props.lang}/>
            </div>
        );
    }
}

export default CityPicker;
