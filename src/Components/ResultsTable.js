import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {AIRR_CELL_PROCESSING_FIELDS, AIRR_NUCLEIC_ACID_FIELDS, AIRR_REPERTOIRE_FIELDS, AIRR_SEQUENCING_FIELDS,
    AIRR_STUDY_FIELDS, AIRR_SUBJECT_FIELDS, AIRR_REARRANGEMENT_FIELDS} from '../Library/Enums.js';
import Option, {OPTION_TYPES} from "./Options/Option";

const MAX_PAGE_SIZE = 15;
const ADDITIONAL_FIELDS = ["match_cdr3", "query_cdr3", "percent_identity", "coverage", "somatic_variants"];

/*
Additional field for the Columns
 */
const additionalFields = {
    "submitted_by": {show: true},
    "v_call": { show: true },
    "j_call": { show: true },
    "match_cdr3": {
        show: true,
        minWidth: 200,
        Cell: (row) => {
            let spanList = [];
            let queryCdr3 = row.original.query_cdr3;
            let ogCdr3 = row.original.original_cdr3;
            let matchCdr3 = row.original.match_cdr3;

            let cdr3Split = ogCdr3.split(queryCdr3.replace(new RegExp('-', 'g'),''));

            for(let i = 0; i < cdr3Split[0].length; i++) {
                spanList.push(<span style={{color: '#ddd', fontWeight: 'bold'}}>{"-"}</span>)
            }

            for(let i = 0; i < queryCdr3.length; i++) {
                if(queryCdr3[i] === '-') {
                    spanList.push(<span style={{color: '#00dd00', fontWeight: 'bold'}}>{matchCdr3[i]}</span>)
                } else if(matchCdr3[i] === '-') {
                    spanList.push(<span style={{color: '#bbb', fontWeight: 'bold'}}>{"-"}</span>)
                } else if(matchCdr3[i] !== queryCdr3[i]) {
                    spanList.push(<span style={{color: '#f00', fontWeight: 'bold'}}>{matchCdr3[i]}</span>)
                } else {
                    spanList.push(<span>{matchCdr3[i]}</span>)
                }
            }

            if(cdr3Split.length > 1) {
                for(let i = 0; i < cdr3Split[1].length; i++) {
                    spanList.push(<span style={{color: '#ddd', fontWeight: 'bold'}}>{"-"}</span>)
                }
            }

            return <div>{spanList.map(span => {
                return span;
            })}</div>
        }
    },
    "query_cdr3": {
        minWidth: 200,
        show: true
    },
    "percent_identity": {
        show: true,
        minWidth: 180
    },
    "coverage": {
        show: true,
    },
    "somatic_variants": {
        show: true,
        minWidth: 170
    }
}

const makeCapital = (str) => {
    let retval = '';
    let split = str.split('_')
    for(let word of split) {
        retval += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
    }

    return retval.trim();
};
const makeKeys = () => {
    let keys = {};
    // let options = [];
    let options = {};
    let def = [];

    let template = {
        minWidth: 130,
        style: {
            overflowX: 'scroll',
            textOverflow: 'clip'
        },
        show: false
    };

    for(let field of [].concat(AIRR_CELL_PROCESSING_FIELDS, AIRR_NUCLEIC_ACID_FIELDS, AIRR_REPERTOIRE_FIELDS, AIRR_SEQUENCING_FIELDS,
        AIRR_STUDY_FIELDS, AIRR_SUBJECT_FIELDS, AIRR_REARRANGEMENT_FIELDS, ADDITIONAL_FIELDS)) {
        let column = Object.assign({
            Header: makeCapital(field),
            accessor: field
        }, template);

        if(field in additionalFields) {
            column = Object.assign(column, additionalFields[field]);
            def.push({label: makeCapital(field), value: field})
            options[field] = {label: makeCapital(field), value: field};
        } else {
            options[field] = {label: makeCapital(field), value: field};
        }

        keys[field] = column;
    }

    return [keys, def, options];
}

class ResultsTable extends Component {
    constructor(props) {
        super(props);

        let options = makeKeys();

        let keys = options[0];
        this.defaultKeys = options[1];
        this.options = options[2];

        this.state = {
            detailOpen: false,
            keys: keys,
            selectedResults: {}
        }
    }

    toggleFields = (fields) => {
        let newKeys = Object.assign({}, this.state.keys);
        let newKeysShown = [];
        for(let field of fields) {
            newKeysShown.push(field.value);
        }

        for(let key in newKeys) {
            if(!newKeysShown.includes(key)) {
                newKeys[key].show = false
            } else {
                newKeys[key].show = true
            }
        }

        this.setState({
            keys: newKeys
        });

    };

    render() {
        let options = [];
        if(this.props.results == null || this.props.results.length === 0) {
            options = this.defaultKeys;
        } else {
            let seenOptions = [];
            for(let result of this.props.results) {
                for(let key of Object.keys(result).sort((a,b) => {
                    console.log("a,b",a,b)
                    if(a === 'submitted_by') {
                        return -1;
                    } else if(a === 'repertoire_id') {
                        if(b === 'submitted_by') {
                            return 1;
                        } else {
                            return -1;
                        }
                    } else if(b === 'submitted_by' || b === 'repertoire_id') {
                        return 1;
                    }

                    let nameA = a.toUpperCase(); // ignore upper and lowercase
                    let nameB = b.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                })) {
                    if(!seenOptions.includes(key)) {
                        options.push({label: makeCapital(key), value: key});
                        seenOptions.push(key);
                    }
                }
            }
        }

        return <div className={"full-width flex-column centered-horiz"}>
            <div className={"full-width flex-row centered-horiz"}>
                <Option
                    onUpdate={(alias, val) => { this.toggleFields(val); }}
                    name={'Show Fields'}
                    required={false}
                    type={OPTION_TYPES.SELECT_MULTI}
                    default={this.defaultKeys}
                    values={options}
                    style={{option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                            return {
                                ...styles,
                                color: '#333'
                            }
                    }}}
                    />
            </div>
            <div className={"full-width scrollable clonomatch-results-table-container"}>
                <ReactTable
                    className={"full-width clonomatch-results-table"}
                    data={this.props.results}
                    columns={Object.values(this.state.keys)}
                    sortable={true}
                    showPageSizeOptions={false}
                    showPageJump={false}
                    showPagination={(this.props.results.length > MAX_PAGE_SIZE)}
                    defaultPageSize={this.props.results.length < MAX_PAGE_SIZE ? this.props.results.length : MAX_PAGE_SIZE}
                    pageSize={this.props.results.length < MAX_PAGE_SIZE ? this.props.results.length : MAX_PAGE_SIZE}
                />
            </div>
        </div>
    }
};

export default ResultsTable;
