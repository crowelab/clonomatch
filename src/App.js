import React from 'react';
import './App.css';
import Layout from "./Components/Layout/Layout";
import {ToastContainer,Zoom} from "react-toastify";

let Papa = require("papaparse");
Papa.SCRIPT_PATH = "./Library/External/papaparse.js";

const App = () => {
    return <div className="App">
        <Layout/>
        <ToastContainer
            pauseOnFocusLoss={false}
            hideProgressBar={true}
            transition={Zoom}
            autoClose={2500}/>
    </div>;
}

export default App;
