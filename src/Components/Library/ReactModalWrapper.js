import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from "react-modal";

let modalStyle = {
    overlay: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        position: 'relative',
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px',
        padding: '0px',
        borderRadius: '8px'
    }
};

ReactModal.setAppElement('#root')

const ReactModalWrapper = ({isOpen, options, title, toggleModalVisible, onUpdateOptions}) => {
    return <ReactModal
        // appElement={'#root'}
        isOpen={isOpen}
        contentLabel={"Options Modal"}
        style={modalStyle}>
        <div className={"flex-column modal-content-container full-height"}>
            <div className={"modal-header"}>
                <h3>{title}</h3>
            </div>

            <div className={"modal-content"}>
                {options}
            </div>

            <div className={"modal-close"}>
                <button className={"submenu"} onClick={() => { toggleModalVisible(false) } }>Close</button>
            </div>
        </div>
    </ReactModal>
};

ReactModalWrapper.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    options: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    toggleModalVisible: PropTypes.func.isRequired,
    onUpdateOptions: PropTypes.func.isRequired
}

export default ReactModalWrapper;