import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import AboutSection from "./Pages/Sections/AboutSection";

class HelpButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Popup
            trigger={<button id={"help-button"}>?</button>}
            modal
            nested
        >
            <AboutSection />
        </Popup>
    }
};

HelpButton.propTypes = {
    // containerRef: PropTypes.object.isRequired,
    // visible: PropTypes.bool.isRequired,
    // message: PropTypes.string.isRequired
};

export default HelpButton;