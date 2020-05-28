import React from 'react';
import PropTypes from 'prop-types';

const DocumentationSection = () => {
    return <div id={"documentation-section-container"} className={"page-section-container flex-column centered-horiz"}>
        <div id={"documentation-section"} className={"page-section flex-column centered full-width"}>
            <h2>Analysis</h2>

            This is where we talk about some of the analysis we have done, such as deduplication on NT-Trimmed and other stuff.
            Also the importance of the clonomatch tool and why it's cool
        </div>
    </div>
};

DocumentationSection.propTypes = {};

export default DocumentationSection;