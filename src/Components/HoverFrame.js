import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HoverFrame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        }
    }

    render() {
        let style = {};
        if(this.props.containerRef.current != null) {
            style.height = this.props.containerRef.current.offsetHeight + 'px';
        }

        return <div style={style} className={"hover-frame" + (this.props.visible ? " visible" : "")}>
            <h2 className={"hover-message"}>{this.props.message}</h2>
        </div>
    }
};

HoverFrame.propTypes = {
    containerRef: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired
};

export default HoverFrame;