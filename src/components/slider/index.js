import React, { Component } from 'react';
import Swiper from "../swiper";
import styles from './styles/index.less'
/**
 * Full screen photo display
 *
 */
class Slider extends Component {

    constructor(props){
        super(props);

    }

    render(){
        let imgs =  this.props.items;
        return (
            <div className={styles.wrap}>
                <Swiper
                    indicators={true}
                >

                    {
                        imgs.map((img, i) => {
                            const imgStyle = {
                                backgroundImage: `url(${img.src})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center'
                            };
                            return (
                                <div key={i} style={imgStyle}></div>
                            );
                        })
                    }
                </Swiper>
            </div>
        );
    }
}

export default Slider;
