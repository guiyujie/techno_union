import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'Utils/classnames';
import { Footer, FooterLinks, FooterLink,Button, ButtonArea,Icon} from 'react-weui';

/**
 *   A full notification page to indicate results
 */
class Msg extends Component {
    static propTypes = {
        /**
         * Icon type
         *
         */
        type: PropTypes.string,
        /**
         * Object array of Buttons, require at least `label` property
         *
         */
        buttons: PropTypes.array,
        /**
         * Page Title
         *
         */
        title: PropTypes.string,
        /**
         * Page Description
         *
         */
        description: PropTypes.string,
        /**
         * deprecated property from 0.4.x
         *
         */
        extraHref: PropTypes.string,
        /**
         * deprecated property from 0.4.x
         *
         */
        extraText: PropTypes.string,
        /**
         * Footer Element of Page
         *
         */
        footer: PropTypes.any
    };

    static defaultProps = {
        type: 'success',
        buttons: []
    };

    _renderButtons() {

        return this.props.buttons.map((button, idx) => {
            const {type, label, ...others} = button;
            return (
                <Button key={idx} {...others} type={type}>{label}</Button>
            );
        });
    }

    render() {
        const { children, className, type, title, description, extraHref, extraText, footer, buttons} = this.props;
        const cls = classNames('weui-msg', {
            [className]: className
        });

        let elFooter = footer ? footer : ()=>false;

        if (!elFooter() && (extraHref || extraText) ){
            elFooter = () => (
                <Footer>
                    <FooterLinks>
                        <FooterLink href={extraHref}>{extraText}</FooterLink>
                    </FooterLinks>
                </Footer>
            );
        }

        return (
            <div className={cls}>
                <div className="weui-msg__icon-area">
                    <Icon value={type} size='large' />
                    {/*<i className={`weui-icon-${type} weui-icon_msg`}></i>*/}
                </div>
                <div className="weui-msg__text-area">
                    { title ? <h2 className="weui-msg__title">{title}</h2> : false }
                    { description ? <p className="weui-msg__desc">{description}</p> : false }
                    { children }
                </div>
                <div className="weui-msg__opr-area">
                    <ButtonArea>
                        {this._renderButtons()}
                    </ButtonArea>
                </div>
                <div className="weui-msg__extra-area">
                    {elFooter()}
                </div>
            </div>
        );
    }
}

export default Msg;
