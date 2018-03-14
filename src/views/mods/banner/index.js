import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import style from './styles/index.less'


//样式模块化是否是必须
class BindPassportBanner extends Component {
	static prevProps = {
		tips:PropTypes.string,
		linkText:PropTypes.string
	}

	static defaultProps = {
		linkText:"点击绑定盛天账号",
		tips:""
	}

    //页面的切换也需要重新挂载，也会触发，所以里面的ajax也需要做判断
    componentDidMount(prevProps,prevState){

    }

    componentDidUpdate(prevProps,prevState){


    }

    render() {
        return (
            <div className = {style.bind_passport_banner}>
				<div className = {style.bind_passport_info}>
					<div className = {style.bind_logo_line}>
						<div className= {style.bind_logo}>
							<span className="icon-link"></span>
						</div>
					</div>
					<div className = {style.bind_link_line}>
						<Link to="/account">
							<span className= {style.bind_link_text}>{this.props.linkText}</span>
						</Link>
					</div>
					<div className = {style.bind_tips}>{this.props.tips}</div>
				</div>
			</div>
        )
    }
}




export default BindPassportBanner
