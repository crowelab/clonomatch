import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import Creatable from 'react-select/lib/Creatable';
// import { OPTION_TYPES } from './OptionsGrid'

export const OPTION_TYPES = {
    CREATABLE_SELECT: 'creatable_select',
    SELECT: 'select',
	SELECT_MULTI: 'select_multi',
    INTEGER: 'int',
    REAL: 'real',
    STRING: 'string',
    BOOLEAN: 'bool',
    RADIO: 'radio'
};

export const OPTION_FORMATS = {
	INLINE: 'inline',
	ROW: 'row'
}

class Option extends Component {
	constructor(props) {
		super(props);

		this.state = {
            value: this.props.default
		}
	}

    onChange = (evt) => {
    	if(this.props.type === OPTION_TYPES.BOOLEAN) {
    		let value = !this.state.value;
			this.setState({
				value: value
			}, this.props.onUpdate(this.props.alias, value));
    	} else if(this.props.type === OPTION_TYPES.RADIO) {
            let value = evt.target.value;
            this.setState({
                value: value
            }, this.props.onUpdate(this.props.alias, value));
    	} else if(this.props.type === OPTION_TYPES.SELECT) {
            this.setState({
                value: evt
            }, this.props.onUpdate(this.props.alias, evt));
		} else if(this.props.type === OPTION_TYPES.SELECT_MULTI) {
            this.setState({
                value: evt
            }, this.props.onUpdate(this.props.alias, evt));
    	} else if(this.props.type === OPTION_TYPES.CREATABLE_SELECT) {
    	    let evtList = evt;
    	    let value = [];
    	    evtList.map(obj => value.push(obj.value));

            this.setState({
                value: value
            }, this.props.onUpdate(this.props.alias, value));
        } else {
            let value = evt.target.value;

            if(this.props.allCaps) {
            	value = value.toUpperCase();
			}

    		this.setState({
    			value: value
    		}, this.props.onUpdate(this.props.alias, value));
    	}
    }

 	render()  {
		let style;
		if(this.props.style != null) {
		    style = Object.assign({},this.props.style);
        } else {
		    style = {};
        }

		if(this.props.width != null && this.props.width !== '') {
			style.width = this.props.width
		}

 		let inputElement;
 		switch(this.props.type) {
			default:
				inputElement = <large>{this.props.type}</large>;
			break;
			case OPTION_TYPES.REAL:
				inputElement = <input
					style={style}
					className={"flex-none spacing-small"}
					type="number" 
					step="any" 
					name={this.props.alias + "-input"}
					min={this.props.min != null ? this.props.min : ''}
					max={this.props.max != null ? this.props.max : ''}
					defaultValue={this.props.default != null ? this.props.default : ''}
					onChange={this.onChange}
					/>;
			break;
			case OPTION_TYPES.INTEGER:
				inputElement = <input
					style={style}
					className={"flex-none spacing-small"}
					type="number"
					step="1"
					min={this.props.min != null ? this.props.min : ''}
					max={this.props.max != null ? this.props.max : ''}
					defaultValue={this.props.default != null ? this.props.default : ''}
					name={this.props.alias + "-input"}
					onChange={this.onChange}
					/>;
			break;
			case OPTION_TYPES.STRING:
				if(this.props.allCaps) {
					style.textTransform = 'uppercase';
				}

				inputElement = <input
                    style={style}
                    className={"flex-none " + (this.props.disabled ? 'disabled' : '')}
					type="text"
					placeholder={this.props.placeholder}
					defaultValue={this.props.default != null ? this.props.default : ''}
					name={this.props.alias + "-input"}
					disabled={this.props.disabled}
					onChange={this.onChange}
                    pattern={this.props.pattern != null ? this.props.pattern : ''}
					/>;
			break;
            case OPTION_TYPES.BOOLEAN:
                inputElement = <div className={"flex-row flex-none centered spacing-medium justify-start"}>
					<input
                        // style={style}
						className={"spacing-medium"}
						type="checkbox"
						checked={this.state.value ? 'checked' : ''}
						name={this.props.alias + "-input"}
						id={this.props.alias + "-input"}
						onChange={this.onChange}
					/>
                    <label
                        htmlFor={this.props.alias + "-input"}
                        className={"spacing-small clickable"}
                    >{this.props.label}</label>
				</div>
				break;
			case OPTION_TYPES.RADIO:
				inputElement = <div className="flex-row centered flex-none spacing-small justify-start">
					{this.props.values.map(value => {

						return <div key={this.props.alias + '-' + value.value} className="spacing-small">
							<input
								id={this.props.alias + "-" + value.value}
								radioGroup={this.props.alias}
								type="radio"
								name={this.props.alias}
								value={value.value}
								checked={(this.state.value === value.value)}
								onChange={this.onChange}
							/>
							<label
								htmlFor={this.props.alias + "-" + value.value}
								className={"spacing-small clickable"}
							>{value.name}</label>
						</div>
					})}
				</div>
				break;
            case OPTION_TYPES.SELECT:
                inputElement = <div className="flex-row centered spacing-medium justify-start">

					<ReactSelect
                        name={this.props.alias + "-input"}
                        id={this.props.alias + "-input"}
						styles={this.props.style}
						placeholder={this.props.placeholder}
                        className={"full-width"}
						isSearchable={true}
                        isClearable={true}
						isDisabled={this.props.disabled}
                        options={this.props.values}
						value={this.props.default}
                        onChange={this.onChange}
					/>
                </div>
                break;
            case OPTION_TYPES.SELECT_MULTI:
                inputElement = <div className="flex-row centered spacing-medium justify-start">

                    <ReactSelect
                        name={this.props.alias + "-input"}
                        id={this.props.alias + "-input"}
                        styles={this.props.style}
                        className={"full-width"}
                        isSearchable={true}
                        isClearable={true}
						isMulti
                        isDisabled={this.props.disabled}
                        options={this.props.values}
						value={this.state.value}
                        onChange={this.onChange}
					/>
                </div>
                break;
            case OPTION_TYPES.CREATABLE_SELECT:
                inputElement = <div className="flex-row centered spacing-medium justify-start">
                    <Creatable
                        isMulti
                        name={this.props.alias + "-input"}
                        id={this.props.alias + "-input"}
                        className={"full-width"}
                        options={this.props.values}
                        onChange={this.onChange}/>
                </div>
                break;
 		}

 		switch(this.props.format) {
			case OPTION_FORMATS.INLINE:
			default:
                return (<div className="executable-option flex-column spacing-small">
                    <span className={"executable-option-label text-size-small"}>{this.props.name}</span>
                    {inputElement}
                    <small><span>{this.props.help}</span></small>
                </div>);
			case OPTION_FORMATS.ROW:
                return (<div className="flex-row spacing-small centered">
                    <span className={""}>{this.props.name}</span>
                    {inputElement}
                    <small><span>{this.props.help}</span></small>
                </div>);
		}
 	}

}

Option.propTypes = {
    name: PropTypes.string.isRequired,
	alias: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	required: PropTypes.bool.isRequired,
	onUpdate: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
    style: PropTypes.object,
	format: PropTypes.string,
    description: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	default: PropTypes.node,
	values: PropTypes.array,
	min: PropTypes.number,
	max: PropTypes.number,
    isMulti: PropTypes.bool,
	width: PropTypes.string,
	help: PropTypes.string,
	allCaps: PropTypes.bool,
    pattern: PropTypes.string
};

Option.defaultProps = {
	allCaps: false,
	format: OPTION_FORMATS.INLINE
};


export default Option;