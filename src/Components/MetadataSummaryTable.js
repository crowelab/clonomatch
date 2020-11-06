import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Papa from "papaparse";

const MAX_PAGE_SIZE = 15;
const COLUMN_INFO = {
    'clonomatch_stats': [
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

        this.state = {
            summaryTable: 'clonomatch_stats',
            data: []
        }
    }

    render() {
        return <div className={"full-width flex-column centered-horiz"}>
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

            <div className={"spacing-large"}>
                <span>All statistics about the ClonoMatch data set: <a href={'/files/clonomatch_stats.csv'}>ClonoMatch dataset statistics</a>, <a href={"/files/study_stats-curated.ods"}>curated study statistics</a>, <a href={"/files/study_stats-curated.ods"}>study subject statistics</a></span>
            </div>
        </div>
    }
};

export default MetadataSummaryTable;
