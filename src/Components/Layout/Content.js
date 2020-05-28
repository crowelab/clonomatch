import React from 'react';
import PropTypes from 'prop-types';
import ClonoMatchSection from "../Pages/Sections/ClonoMatchSection";


const Content = ({location, appState}) => {
    return <div id={"content"} className={"flex-column centered flex-1"}>
            <ClonoMatchSection appState={appState}/>
        </div>
}

Content.propTypes = {
    appState: PropTypes.object.isRequired
};

export default Content;