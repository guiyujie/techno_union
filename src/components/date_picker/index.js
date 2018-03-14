import React from 'react';
import PropTypes from 'prop-types';
import Picker from '../picker';

let d= new Date();

class DatePicker extends React.Component {

    static propTypes = {
        /**
         * keys for data provide, `id` to indicate property name for label, `items` to indicate property name for subitems
         *
         */
        dataMap: PropTypes.object,
        /**
         * currently selected item
         *
         */
        selected: PropTypes.array,
        /**
         * display the component
         *
         */
        show: PropTypes.bool,
        start: PropTypes.number,
        end:PropTypes.number,
        lang: PropTypes.object
    };

    static defaultProps = {
        start:d.getFullYear()-3,
        end:d.getFullYear()+3,
        dataMap: { id: 'label', items: 'children' },
            selected: [3,0,0],
            show: false,
            lang:{
                "leftBtn":"取消",
                "rightBtn":"确定"
        }
    };
    genDate(){
        let {start,end} = this.props;
        let n =[];
        for(var i = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], a = start; a <= end; a++) {
            var r = [];
            a % 4 == 0 && a % 100 != 0 || a % 400 == 0 ? i[1] = 29 : i[1] = 28;
            for (var u = 0; u < 12; u++) {
                for (var d = [], f = 1; f < i[u] + 1; f++) {
                    var s = {
                        label: f + "日",
                        value: f
                    };
                    d.push(s)
                }
                r.push({
                    label: u + 1 + "月",
                    value: u + 1,
                    children: d
                })
            }
            let c = {
                label: a + "年",
                value: a,
                children: r
            };
            n.push(c)
        }
        return n;
    }
    constructor(props){
        super(props);
        const {selected, dataMap} = this.props;
        let date = this.genDate();
        const { groups, newselected } = this.parseData(date, dataMap.items, selected);

        this.state = {
            groups,
            selected: newselected,
            picker_show: false,
            text: ''
        };
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
        return this.parseData(item[subKey], subKey, selected, group, newselected);
      } else {
        return { groups: group, newselected };
      }
    }


    updateGroup(item, i, groupIndex, selected, picker){
        const {dataMap } = this.props;
        //validate if item exists
        let date = this.genDate();
        const { groups, newselected } = this.parseData(date, dataMap.items, selected);

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

    handleChange(opt){
        let state = this.state;
        if(!opt.text){
            //解决选择第一个列表获取不到值的bug
            state.text = state.groups[0].items[state.selected[0]].label+' '+ state.groups[1].items[state.selected[1]].label+' '+ state.groups[2].items[state.selected[2]].label
        }

        if (this.props.onChange) this.props.onChange(state);
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

export default DatePicker;
