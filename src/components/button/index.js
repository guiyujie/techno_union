import React, {Component} from 'react'
import PropTypes from 'prop-types';
import style from './styles/index.less'

//目前功能有限，使用例子参考home/BindPhone

//样式模块化是否是必须
class Button extends Component {
	static prevProps = {
		btnText:PropTypes.string
	}

	static defaultProps = {
		btnText:"按钮"
	}

    render() {
        return (
            <div className = {style.btn_box}>
				 {this.props.btnText}
			</div>
        )
    }
}




export default Button
