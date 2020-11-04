import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import AboutSection from "./Pages/Sections/AboutSection";

const HelpButton = () => {
    return <Popup
        trigger={<button id={"help-button"}>?</button>}
        modal
        nested
    >
        <AboutSection />
    </Popup>
};

export default HelpButton;