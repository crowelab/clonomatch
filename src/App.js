import React, { Component } from 'react';
import './App.css';
import Layout from "./Components/Layout/Layout";
import {ToastContainer,Zoom} from "react-toastify";

let Papa = require("papaparse");
Papa.SCRIPT_PATH = "./Library/External/papaparse.js";

class App extends Component {
    constructor(props) {
        super(props);
    }

  render() {
      let appState = this.state;

      return <div className="App">
                <Layout appState={appState}/>
                <ToastContainer
                    pauseOnFocusLoss={false}
                    hideProgressBar={true}
                    transition={Zoom}
                    autoClose={2500}/>
            </div>;
    }
}

export default App;
