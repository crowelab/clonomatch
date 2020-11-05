import React, { Component } from 'react';
import { BASE_URL } from "../../../Library/Enums";
import { BarLoader } from 'react-spinners';
import {CSSTransition} from "react-transition-group";
import ResultsTable from "../../ResultsTable";
import { toast } from 'react-toastify';
import ClonoMatchOptions, {SEARCH_TYPE} from "../../Options/ClonoMatchOptions";
import Papa from "papaparse";
import SocketIOWrapper from "../../../Library/SocketIOWrapper";

const PROCESS_STATUS = {
    INIT: 'init',
    RUNNING: 'running',
    SUCCESS: 'success'
};

class ClonoMatchSection extends Component {
    constructor(props) {
        super(props);

        this.socket = new SocketIOWrapper();
        this.socket.setCallback('bulk_update', message => {
            this.setState({ progressMessage: message });
        });
        this.socket.setCallback('bulk_finish', (results) => {
            console.log("results:", results);

            if(!results.success) {
                toast("Error searching " + results.in_filename, {
                    type: toast.TYPE.ERROR
                });
            } else if(results.sample.length > 0) {
                toast(results.results_length + " results found for: " + results.in_filename, {
                    type: toast.TYPE.SUCCESS
                });
            } else if(results.sample.length === 0) {
                toast("No results found for " + results.in_filename, {
                    type: toast.TYPE.WARNING
                });
            }

            let newState;
            if(results.sample.length > 0) {
                newState = {
                    results_in_filename: results.in_filename,
                    results_out_filename: results.out_filename,
                    results: results.sample,
                    processStatus: PROCESS_STATUS.SUCCESS,
                    progressMessage: 'Searching...',
                    results_v: '',
                    results_j: '',
                    results_cdr3: '',
                }
            } else {
                newState = {
                    processStatus: PROCESS_STATUS.INIT
                }
            }

            this.setState(newState);
        });

        this.state = {
            v: '',
            j: '',
            cdr3: '',
            inputFile: '',
            processStatus: PROCESS_STATUS.INIT,
            searchType: SEARCH_TYPE.V3J,
            progressMessage: 'Searching...',
            results: [],
            results_v: '',
            results_j: '',
            results_cdr3: '',
            results_in_filename: '',
            pid: 70,
            coverage: 90,
            cancelled: false
        }
    }

    onUpdateOptions = (stateChange) => {
        console.log("changing state:", stateChange);
        this.setState(stateChange, this.props.onUpdateOptions);
    };

    handleSiblingResults = (response) => {
        let v3j = response.v + ' ' + response.j + ' ' + response.cdr3;
        (response.results.length > 0) ? toast(response.results.length + " clones found for " + v3j + '!', {
            type: toast.TYPE.SUCCESS
        }) : toast("No results found for " + v3j, {
            type: toast.TYPE.WARNING
        });

        let newState;
        if(response.results.length > 0) {
            newState = {
                processStatus: PROCESS_STATUS.SUCCESS,
                results: response.results,
                results_v: response.v,
                results_j: response.j,
                results_cdr3: response.cdr3,
                out_filename: response.out_filename,
                results_in_filename: ''
            }
        } else {
            newState = {processStatus: PROCESS_STATUS.INIT}
        }

        this.setState(newState);
    };

    findSiblings = () => {
        if(this.state.searchType === SEARCH_TYPE.V3J) {
            this.setState({
                results: [],
                processStatus: PROCESS_STATUS.RUNNING
            }, () => {
                let data = this.state;

                fetch(BASE_URL + '/api/clonomatch', {
                    method: 'POST',
                    cors: 'no-cors',
                    body: JSON.stringify(data)
                }).then(response => {
                    if(response.status === 200) {
                        response.json().then(this.handleSiblingResults);
                    } else {
                        toast("Error finding results", { type: toast.TYPE.ERROR });
                        console.error(response);
                        this.setState({ processStatus: PROCESS_STATUS.INIT });
                    }

                });
            });
        } else if(this.state.searchType === SEARCH_TYPE.FILE) {
            this.setState({
                results: [],
                processStatus: PROCESS_STATUS.RUNNING
            }, () => {
                Papa.parse(this.state.inputFile, {
                    complete: (results) => {
                        console.log("results:", results);
                        this.socket.emit('bulk_sibsearch', {
                            data: results.data,
                            pid: this.state.pid,
                            coverage: this.state.coverage,
                            filename: this.state.inputFile.name
                        });
                    }
                })
            });
        }
    };

    findRandomMatch = () => {
        this.setState({
            results_match: [],
            processStatus: PROCESS_STATUS.RUNNING
        }, () => {
            let data = this.state;

            fetch(BASE_URL + '/api/clonomatch/random', {
                method: 'POST',
                cors: 'no-cors',
                body: JSON.stringify(data)
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(this.handleSiblingResults);
                } else {
                    toast("Error finding results", {
                        type: toast.TYPE.ERROR
                    });
                    this.setState({
                        processStatus: PROCESS_STATUS.INIT
                    });
                }
            });
        });
    };

    render() {
        let resultsString = '';
        if(this.state.processStatus === PROCESS_STATUS.SUCCESS) {
            if(this.state.searchType === SEARCH_TYPE.FILE && this.state.results_in_filename !== '') {
                resultsString = 'Results for: ' + this.state.results_in_filename;
            } else if(this.state.searchType === SEARCH_TYPE.V3J && this.state.results_cdr3 !== '') {
                resultsString = 'Results for: ' + this.state.results_v +  ' ' + this.state.results_j + ' ' + this.state.results_cdr3;
            }
        }

        return (
            <div id={"clonomatch-section-container"} className={"page-section-container flex-column centered-horiz"}>
                <div id={"clonomatch-section"} className={"page-section flex-column full-width full-height"}>
                    <h1 id={"clonomatch-section-header"} className={"centered"}>ClonoMatch</h1>

                    <ClonoMatchOptions disabled={this.state.processStatus === PROCESS_STATUS.RUNNING} onUpdateOptions={this.onUpdateOptions} />

                    <div>
                        <div className={"margin-huge"}>
                            <button
                                disabled={(this.state.searchType === SEARCH_TYPE.V3J && this.state.cdr3 === '')
                                    || (this.state.searchType === SEARCH_TYPE.FILE && this.state.inputFile === '')
                                || this.state.processStatus === PROCESS_STATUS.RUNNING}
                                className={"primary margin-medium"}
                                onClick={this.findSiblings}
                            >Find Similar
                            </button>
                            <button
                                hidden={this.state.searchType === SEARCH_TYPE.FILE}
                                className={"utility margin-medium"}
                                onClick={this.findRandomMatch}
                            >Random Clonotype
                            </button>
                        </div>
                    </div>

                    <div id={"clonomatch-results-container"}>
                        <CSSTransition
                            in={this.state.processStatus === PROCESS_STATUS.RUNNING}
                            classNames={"clonomatch-element"}
                            unmountOnExit
                            timeout={600}>
                            <div
                                className={"margin-huge flex-column centered-horiz centered-vert spacing-medium"}
                            >
                                <span>{this.state.progressMessage}</span>

                                <BarLoader
                                    loading={this.state.processStatus === PROCESS_STATUS.RUNNING}
                                    color={'rgb(47,237,136)'}
                                    width={400}
                                    height={20}
                                />
                            </div>
                        </CSSTransition>

                        <CSSTransition
                            in={this.state.processStatus === PROCESS_STATUS.SUCCESS && this.state.results.length > 0
                            && ((this.state.searchType === SEARCH_TYPE.V3J && this.state.results_cdr3 !== '')
                                || (this.state.searchType === SEARCH_TYPE.FILE && this.state.results_in_filename !== ''))}
                            classNames={"clonomatch-element"}
                            unmountOnExit
                            timeout={600}>
                            <div
                                className={"full-width flex-column centered-horiz centered-vert"}>
                                <span className={"spacing-large"}>{resultsString}
                                </span>
                                <ResultsTable results={this.state.results} />

                                <div id="clonomatch-section-results" className={"flex-row centered margin-huge"}>
                                    <button
                                        className={"utility margin-medium"}
                                        disabled={this.state.results.length === 0}
                                        onClick={() => {
                                            window.open(BASE_URL + '/api/clonomatch/csv/' + this.state.out_filename);
                                        }}
                                    >Download CSV
                                    </button>
                                    <button
                                        className={"utility margin-medium"}
                                        disabled={this.state.results.length === 0}
                                        onClick={() => {
                                            window.open(BASE_URL + '/api/clonomatch/json/' + this.state.out_filename);
                                        }}
                                    >Download JSON
                                    </button>
                                </div>
                            </div>
                        </CSSTransition>
                    </div>
                </div>

                {/*<div className={"main-links-section"}>*/}
                {/*    <span>Statistics about the data: <a href={"/files/study_stats-curated.ods"}>Study Statistics</a>, <a href={'/files/clonomatch_stats.csv'}>ClonoMatch dataset statistics</a></span>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default ClonoMatchSection;
