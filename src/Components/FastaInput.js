import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HoverFrame from "./HoverFrame";
import { toast } from 'react-toastify';

export const SUBMIT_TYPE = {
    FILE: 'file',
    TEXT: 'text'
};

const MAX_FILE_SIZE = 30*1024*1024; //30MB

let dragCounter = 0;
let requiredStyle = {
    color: "#ff0000",
    fontSize: '.75em'
};
let required = <sup style={requiredStyle}>*</sup>;

class FastaInput extends Component {
    constructor(props) {
        super(props);

        this.fileUploadRef = React.createRef();
        this.containerRef = React.createRef();

        this.state = {
            fastaText: '',
            submitType: SUBMIT_TYPE.FILE,
            fastaFile: '',
            isFileDropVisible: false
        }
    }

    updateFastaText = (val) => {
        if(this.props.willReset && !window.confirm("This will clear the results of the last PyIR run. Is that ok?")) {
            return false;
        }

        let state = {
            fastaText: val
        };

        if(this.state.submitType === SUBMIT_TYPE.FILE) {
            state.submitType = SUBMIT_TYPE.TEXT;
        }

        this.setState(state, this.onChangeSubmit);
    };

    handleFileBrowse = (evt) => {
        let file = this.fileUploadRef.current.files[0];

        if(file.size > MAX_FILE_SIZE) {
            toast("File is too large! Maximum file size is 30MB", {
                type: toast.TYPE.WARNING
            });
            this.fileUploadRef.current.value = '';
        } else {
            this.setState({
                submitType: SUBMIT_TYPE.FILE,
                fastaFile: file,
            }, this.onChangeSubmit)
        }
    }

    handleFileDrop = (evt) => {
        this.fileUploadRef.current.files = evt.dataTransfer.files;
        evt.stopPropagation();
        evt.preventDefault();

        dragCounter = 0;
        this.setState({
            submitType: SUBMIT_TYPE.FILE,
            isFileDropVisible: false
        }, this.onChangeSubmit);
    };

    handleDragOver = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
    };

    handleDragEnter = (evt) => {
        dragCounter++;

        if(dragCounter > 0) {
            this.setState({
                isFileDropVisible: true
            });
        }
    }

    handleDragLeave = (evt) => {
        dragCounter--;

        if(dragCounter < 1) {
            this.setState({
                isFileDropVisible: false
            });
        }
    };

    changeSubmitType = (evt) => {
        this.setState({
            submitType: evt.target.value
        }, this.onChangeSubmit);
    };

    onChangeSubmit = () => {
        if(this.state.submitType === SUBMIT_TYPE.FILE) {
            this.props.onChangeSubmit(this.state.submitType, this.fileUploadRef.current.files[0]);
        } else {
            this.props.onChangeSubmit(this.state.submitType, this.state.fastaText);
        }
    }

    render() {
        let hoverFrame;
        let fileSubmit;
        let textSubmit;
        let orLabel;

        if(this.props.submitTypes.includes(SUBMIT_TYPE.FILE)) {
            hoverFrame = <HoverFrame message={"Drop Files Here"} visible={this.state.isFileDropVisible} containerRef={this.containerRef}/>;
            fileSubmit = <div className={"flex-column flex-1 centered container full-height" + (this.state.submitType === SUBMIT_TYPE.FILE ? " highlighted" : "")}>
                <div className={"flex-none clickable"}>
                    <input id={"submitType-" + SUBMIT_TYPE.FILE} name="submitType" value={SUBMIT_TYPE.FILE} checked={(this.state.submitType === SUBMIT_TYPE.FILE)} type={"radio"} onChange={this.changeSubmitType} />
                    <label htmlFor={"submitType-" + SUBMIT_TYPE.FILE} className={"spacing-medium clickable"}>Upload file in <a href="https://en.wikipedia.org/wiki/FASTA_format">FASTA format</a></label>
                    {(this.state.submitType === SUBMIT_TYPE.FILE) ? required : ''}
                </div>

                <div className={"flex-column centered flex-1"}>
                    <input className={"margin-medium"} type={"file"} name={'fasta'} ref={this.fileUploadRef} onChange={this.handleFileBrowse}/>
                    <label className={"spacing-small"}><small>Max File Size: 30MB</small></label>
                </div>
            </div>;
        }

        if(this.props.submitTypes.includes(SUBMIT_TYPE.TEXT)) {
            textSubmit = <div className={"flex-column flex-1 centered container full-height" + (this.state.submitType === SUBMIT_TYPE.TEXT ? " highlighted" : "")}>
                <div className={"flex-none clickable"}>
                    <input id={"submitType-" + SUBMIT_TYPE.TEXT} name="submitType" value={SUBMIT_TYPE.TEXT} checked={(this.state.submitType === SUBMIT_TYPE.TEXT)} type={"radio"} onChange={this.changeSubmitType} />
                    <label htmlFor={"submitType-" + SUBMIT_TYPE.TEXT} className={"spacing-medium clickable"}>Manually enter sequence</label>
                    {(this.state.submitType === SUBMIT_TYPE.TEXT) ? required : ''}
                </div>

                <textarea className={"flex-1 margin-huge full-width"} rows={8} placeholder="Enter FASTA" value={this.state.fastaText} onChange={(evt) => { this.updateFastaText(evt.target.value); } } />
            </div>
        }

        if(this.props.submitTypes.length > 1) {
            orLabel = <span>-- or --</span>
        }

        return <div ref={this.containerRef} className={"flex-row centered full-width fasta-input"} onDragEnter={this.handleDragEnter} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleFileDrop}>
            {hoverFrame}

            {fileSubmit}

            {orLabel}

            {textSubmit}
        </div>
    }
}

FastaInput.propTypes = {
    onChangeSubmit: PropTypes.func.isRequired,
    willReset: PropTypes.bool.isRequired,
    submitTypes: PropTypes.array
};

FastaInput.defaultProps = {
    willReset: false,
    submitTypes: [SUBMIT_TYPE.FILE, SUBMIT_TYPE.TEXT]
}

export default FastaInput;