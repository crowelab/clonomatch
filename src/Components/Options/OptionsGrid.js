import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import Collapsible from 'react-collapsible';
import Option from './Option';

class OptionsGrid extends Component {
    // constructor(props) {
    //     super(props);
    // }

    onUpdateOption = (key, value) => {
        let state = {};
        state[key] = value;

        this.setState(state, () => {
            this.props.onUpdateOptions(this.state);
        });
    };

    render() {
        return <div className={"options-grid-2"}>
            {this.props.options.map(option => {
                return <Option
                    key={option.alias + '-key'}
                    name={option.name}
                    alias={option.alias}
                    description={option.description}
                    type={option.type}
                    required={option.required}
                    min={option.min}
                    max={option.max}
                    label={(option.label != null ? option.label : '')}
                    values={(option.values != null ? option.values : [])}
                    default={(option.default != null ? option.default : '')}
                    onUpdate={this.onUpdateOption}/>
            })}
        </div>
    }
}

OptionsGrid.propTypes = {
    onUpdateOptions: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    advancedOptions: PropTypes.array
};

export default OptionsGrid;