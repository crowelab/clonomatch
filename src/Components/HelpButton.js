import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import HelpSection from "./Pages/Sections/HelpSection";

const HelpButton = () => {
    return <Popup
        trigger={<button id={"help-button"}>?</button>}
        modal
        nested
    >
        <HelpSection />
    </Popup>
};

export default HelpButton;