import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {AIRR_CELL_PROCESSING_FIELDS, AIRR_NUCLEIC_ACID_FIELDS, AIRR_REPERTOIRE_FIELDS, AIRR_SEQUENCING_FIELDS,
    AIRR_STUDY_FIELDS, AIRR_SUBJECT_FIELDS, AIRR_REARRANGEMENT_FIELDS} from '../../Library/Enums.js';
// from '../../Library'

const MAX_PAGE_SIZE = 15;
const ADDITIONAL_FIELDS = ["match_cdr3", "query_cdr3", "percent_identity", "coverage", "somatic_variants"];

/*
Additional field for the Columns
 */
const additionalFields = {
    "v_call": { show: true },
    "j_call": { show: true },
    "match_cdr3": {
        show: true,
        minWidth: 200,
        Cell: (row) => {
            // console.log("row:",row);

            let spanList = [];
            let queryCdr3 = row.original.query_cdr3;
            let ogCdr3 = row.original.original_cdr3;
            let matchCdr3 = row.original.match_cdr3;

            let cdr3Split = ogCdr3.split(queryCdr3.replace(new RegExp('-', 'g'),''));
            // console.log("cdr3_split:", cdr3Split);

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
        // minWidth: 130
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
    let retval = {};

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
        }

        // retval.push(column);
        retval[field] = column;
    }

    return retval;
}
// let KEYS =

class ResultsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailOpen: false,
            keys: makeKeys(),
            selectedResults: {}
        }
    }

    toggleFieldShow = (field) => {
        this.setState(prevState => ({
            keys: {
                ...prevState.keys,
                field: !prevState.keys[field]
            }
        }))
    };

    render() {
        return <div className={"full-width flex-column"}>
            <div>

            </div>
            <div className={"full-width scrollable"}>
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
