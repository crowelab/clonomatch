import React, { Component } from 'react';
import MetadataSummaryTable from "../../Metadata/MetadataSummaryTable";
// import PropTypes from 'prop-types';

class HelpSection extends Component {
    componentDidMount() {
        let layout = document.getElementById("layout");
        layout.style.filter = 'blur(2px)';
    }

    componentWillUnmount() {
        let layout = document.getElementById("layout");
        layout.style.filter = '';
    }

    render() {
        return <div id={"help-section-container"} className={"page-section-container flex-column centered-horiz"}>
            <div id={"help-section"} className={"page-section flex-column centered full-width"}>
                <h2>Help</h2>
                <p>
                    This sure would be a good place for a youtube video or whatever
                </p>
            </div>
        </div>;
    }
}
//
// const AboutSection = () => {
//
// };

HelpSection.propTypes = {};

export default HelpSection;