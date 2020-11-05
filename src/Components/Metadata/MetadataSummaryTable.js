import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Option, {OPTION_TYPES} from "../Options/Option";
import Papa from "papaparse";

const MAX_PAGE_SIZE = 15;
const COLUMN_INFO = {
    'clonomatch_stats': [
        {Header: 'Locus', accessor: 'locus', show: true, minWidth: 55, style: { overflowX: 'scroll', textOverflow: 'clip'}},
        {Header: 'Unique V3J', accessor: 'unique_v3j', show: true, minWidth: 110, style: { overflowX: 'scroll', textOverflow: 'clip'}},
        {Header: 'Unique VDJ', accessor: 'unique_vdj', show: true, minWidth: 110, style: { overflowX: 'scroll', textOverflow: 'clip'}},
        {Header: 'Reads', accessor: 'reads', show: true, minWidth: 110, style: { overflowX: 'scroll', textOverflow: 'clip'}}
    ],
    'study_stats': [
        {Header: 'Study', accessor: 'study', show: true, minWidth: 180, style: { overflowX: 'scroll', textOverflow: 'clip'}},
        {Header: 'Locus', accessor: 'locus', show: true, minWidth: 55, style: { overflowX: 'scroll', textOverflow: 'clip'}},
        {Header: 'Unique V3J', accessor: 'unique_v3j', show: true, minWidth: 110, style: { overflowX: 'scroll', textOverflow: 'clip'}},
        {Header: 'Unique VDJ', accessor: 'unique_vdj', show: true, minWidth: 110, style: { overflowX: 'scroll', textOverflow: 'clip'}},
        {Header: 'Reads', accessor: 'reads', show: true, minWidth: 110, style: { overflowX: 'scroll', textOverflow: 'clip'}},
        {Header: 'URL', accessor: 'url', show: true, minWidth: 300, style: { overflowX: 'scroll', textOverflow: 'clip'}}
    ],
    'subject_stats': [
        {Header: 'Repertoire', accessor: 'repertoire', show: true, minWidth: 300, style: { overflowX: 'scroll', textOverflow: 'clip'}},
        {Header: 'Locus', accessor: 'locus', show: true, minWidth: 55, style: { overflowX: 'scroll', textOverflow: 'clip'}},
        {Header: 'Unique V3J', accessor: 'unique_v3j', show: true, minWidth: 110, style: { overflowX: 'scroll', textOverflow: 'clip'}},
        {Header: 'Unique VDJ', accessor: 'unique_vdj', show: true, minWidth: 110, style: { overflowX: 'scroll', textOverflow: 'clip'}},
        {Header: 'Reads', accessor: 'reads', show: true, minWidth: 110, style: { overflowX: 'scroll', textOverflow: 'clip'}}
    ]
}

/*
Additional field for the Columns
 */

class MetadataSummaryTable extends Component {
    constructor(props) {
        super(props);

        this.clonomatchStats = [];
        this.studyStats = [];
        this.subjectStats = [];

        Papa.parse('/files/clonomatch_stats.csv', {
            download: true,
            complete: (results) => {
                let clonomatchStats = [];
                for(let i = 0; i < results.data.length; i++) {
                    if(i > 0) {
                        clonomatchStats.push({
                            'locus': results.data[i][0],
                            'unique_v3j': results.data[i][1],
                            'unique_vdj': results.data[i][2],
                            'reads': results.data[i][3],
                        })
                    }
                }
                this.clonomatchStats = clonomatchStats;
                if(this.state.summaryTable === 'clonomatch_stats') {
                    this.setState({data: this.clonomatchStats});
                }
            }
        });
        Papa.parse('/files/study_stats.csv', {
            download: true,
            complete: (results) => {
                let studyStats = [];
                for(let i = 0; i < results.data.length; i++) {
                    if(i > 0) {
                        studyStats.push({
                            'study': results.data[i][0],
                            'locus': results.data[i][1],
                            'unique_v3j': results.data[i][2],
                            'unique_vdj': results.data[i][3],
                            'reads': results.data[i][4],
                            'url': results.data[i][5]
                        })
                    }
                }
                this.studyStats = studyStats;
                if(this.state.summaryTable === 'study_stats') {
                    this.setState({data: this.studyStats});
                }
            }
        });
        Papa.parse('/files/subject_stats.csv', {
            download: true,
            complete: (results) => {
                let subjectStats = [];
                for(let i = 0; i < results.data.length; i++) {
                    if(i > 0) {
                        subjectStats.push({
                            'repertoire': results.data[i][0],
                            'locus': results.data[i][1],
                            'unique_v3j': results.data[i][2],
                            'unique_vdj': results.data[i][3],
                            'reads': results.data[i][4],
                        })
                    }
                }
                this.subjectStats = subjectStats;
                if(this.state.summaryTable === 'subject_stats') {
                    this.setState({data: this.subjectStats});
                }
            }
        });


        this.state = {
            summaryTable: 'clonomatch_stats',
            data: []
        }
    }

    toggleFields = (fields) => {
        if(fields.value === 'clonomatch_stats') {
            this.setState({
                summaryTable: 'clonomatch_stats',
                data: this.clonomatchStats
            });
        } else if(fields.value === 'study_stats') {
            this.setState({
                summaryTable: 'study_stats',
                data: this.studyStats
            });
        } else if(fields.value === 'subject_stats') {
            this.setState({
                summaryTable: 'subject_stats',
                data: this.subjectStats
            });
        }
    };

    render() {
        return <div className={"full-width flex-column centered-horiz"}>
            <div className={"full-width flex-row centered-horiz"}>
                <Option
                    onUpdate={(alias, val) => { this.toggleFields(val); }}
                    name={'Show Table'}
                    alias={'show-table'}
                    required={true}
                    clearable={false}
                    placeholder={'ClonoMatch Stats'}
                    // default={}
                    type={OPTION_TYPES.SELECT}
                    values={[
                        {label: 'ClonoMatch Stats', value: 'clonomatch_stats'},
                        {label: 'Study Stats', value: 'study_stats'},
                        {label: 'Subject Stats', value: 'subject_stats'}
                    ]}
                    style={{option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                            return {
                                ...styles,
                                color: '#333'
                            }
                    }}}
                    />
            </div>
            <div className={"flex-column full-width scrollable clonomatch-metadata-table-container centered-horiz"}>
                <ReactTable
                    className={"full-width clonomatch-metadata-table centered-horiz"}
                    data={this.state.data}
                    columns={COLUMN_INFO[this.state.summaryTable]}
                    sortable={true}
                    showPageSizeOptions={false}
                    showPageJump={false}
                    showPagination={(this.state.data.length > MAX_PAGE_SIZE)}
                    defaultPageSize={this.state.data.length < MAX_PAGE_SIZE ? this.state.data.length : MAX_PAGE_SIZE}
                    pageSize={this.state.data.length < MAX_PAGE_SIZE ? this.state.data.length : MAX_PAGE_SIZE}
                />
            </div>
        </div>
    }
};

export default MetadataSummaryTable;
