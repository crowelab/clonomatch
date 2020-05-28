import React, {Component} from 'react';
import ReactTable from 'react-table';

import 'react-table/react-table.css';

class ResultsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailOpen: false,
            selectedResults: {}
        }
    }

    render() {
        return <div className={"full-width"}>
            <ReactTable
                className={"full-width clonomatch-results-table"}
                data={this.props.results}
                columns={this.props.keys}
                sortable={false}
                showPageSizeOptions={false}
                showPageJump={false}
                showPagination={(this.props.results.length > 20)}
                defaultPageSize={this.props.results.length < 20 ? this.props.results.length : 20}
                pageSize={this.props.results.length < 20 ? this.props.results.length : 20}
            />
        </div>
    }
};

export default ResultsTable;
