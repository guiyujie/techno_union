import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'Utils/classnames';
import {Mask,Icon} from 'react-weui';

/**
 *  pop out indicator to inform users
 *
 */
class Toast extends Component {
    static propTypes = {
        /**
         * Icon Value
         *
         */
        icon: PropTypes.string,
        /**
         * Icon Size
         *
         */
        iconSize: PropTypes.string,
        /**
         * display toast
         *
         */
        show: PropTypes.bool
    };

    static defaultProps = {
        icon: 'toast',
        show: false,
    };

    render() {
        const {className, icon, show, children, iconSize} = this.props;
        const cls = classNames('weui-toast', {
            [className]: className
        });
        return (
            <div style={{display: show ? 'block' : 'none'}}>
                <Mask transparent={true}/>
                <div className={cls} >

                    <p className="weui-toast_content">{children}</p>
                </div>
            </div>
        );
    }
}

export default Toast;
