import React from 'react';
import ClonoMatchSection from "../Pages/Sections/ClonoMatchSection";
import AboutSection from "../Pages/Sections/AboutSection";
import HelpButton from "../HelpButton";

const Content = () => {
    return <div id={"content"} className={"flex-column centered flex-1"}>
            <HelpButton/>
            <ClonoMatchSection/>
            <AboutSection/>
        </div>
};

export default Content;