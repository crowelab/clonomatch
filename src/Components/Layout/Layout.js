import React from 'react';
import PropTypes from 'prop-types';
// import Header from './Header';

import Content from "./Content";

// const ContentWithLocation = withRouter(Content);

const Layout = ({appState}) => {
    return (<div id={"layout"} className={"flex-column"}>
        <Content appState={appState} />
    </div>
    );
}

Layout.propTypes = {
    appState: PropTypes.object.isRequired,
    // googleApi: PropTypes.object.isRequired
}

export default Layout;