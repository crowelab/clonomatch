import React from 'react';
import ClonoMatchSection from "../Pages/Sections/ClonoMatchSection";
import AboutSection from "../Pages/Sections/AboutSection";


const Content = () => {
    return <div id={"content"} className={"flex-column centered flex-1"}>
            <ClonoMatchSection/>
            <AboutSection/>
        </div>
};

export default Content;