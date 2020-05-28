import React from 'react';
import PropTypes from 'prop-types';
import Option from "./Option";
import ReactModalWrapper from '../../Components/Library/ReactModalWrapper';

const OptionsModal = ({options, onUpdateOption, isOpen, toggleModalVisible}) => {
    let optionElements = <div className={"options-grid-new"}>
            {options.map(option => {
                return <Option
                    key={option.alias + '-key'}
                    name={option.name}
                    width={option.width}
                    alias={option.alias}
                    description={option.description}
                    type={option.type}
                    required={option.required}
                    min={option.min}
                    max={option.max}
                    help={option.help}
                    label={(option.label != null ? option.label : '')}
                    values={(option.values != null ? option.values : [])}
                    default={(option.default != null ? option.default : '')}
                    onUpdate={onUpdateOption}/>
            })}
        </div>

    return <ReactModalWrapper
        isOpen={isOpen}
        toggleModalVisible={toggleModalVisible}
        options={optionElements}
        onUpdateOptions={onUpdateOption}
        title={"PyIR Options"}/>
}

OptionsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleModalVisible: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
}

export default OptionsModal;