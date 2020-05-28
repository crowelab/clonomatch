import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import baseURL from "../Library/BaseURL";
import MongoRunnerOptions from "./MongoRunnerOptions";

class MongoRunner extends Component {
    onUpdateOptions = (options) => {
        this.setState({
            options: options
        });
    };

    render() {
        return <div>
            <MongoRunnerOptions onUpdateOptions={this.onUpdateOptions}/>
                {/*<div>*/}
                    {/*<label>RunID:</label>*/}
                    {/*<input onChange={(evt) => { this.setState({ runid: evt.target.value }) } }type={"string"} />*/}
                {/*</div>*/}
                {/*<div>*/}
                    {/*<label>PipelineID:</label>*/}
                    {/*<input onChange={(evt) => { this.setState({ pipelineid: evt.target.value }) } }type={"string"} />*/}
                {/*</div>*/}
                {/*<div>*/}
                    {/*<label>SampleID:</label>*/}
                    {/*<input onChange={(evt) => { this.setState({ sampleid: evt.target.value }) } }type={"string"} />*/}
                {/*</div>*/}

                <button onClick={this.runQuery}>Go</button>
        </div>
    }
}

MongoRunner.propTypes = {

};

export default MongoRunner;