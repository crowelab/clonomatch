import React from 'react';
import PropTypes from 'prop-types';

const LinksSection = () => {
    return <div id={"links-section-container"} className={"page-section-container flex-column centered-horiz"}>
        <div id={"links-section"} className={"page-section flex-column centered full-width"}>
            <h2>Resources</h2>

            <div>
                <a href={"https://github.com/crowelab/PyIR"}>PyIR on GitHub</a>
                <span>- PyIR sequence analyzer, used to process sequences.</span>
            </div>

            <div>
                <a href={"https://www.nature.com/articles/s41586-019-0934-8"}>High frequency of shared clonotypes in human B cell receptor repertoires</a>
                <span> - A paper in <i>nature</i> showing similar results in B Cells</span>
            </div>
        </div>
    </div>;
};

LinksSection.propTypes = {};

export default LinksSection;