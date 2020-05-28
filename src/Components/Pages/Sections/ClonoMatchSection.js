import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Option, {OPTION_TYPES} from "../../Options/Option";
import BaseURL from '../../../Library/BaseURL';
import { BarLoader } from 'react-spinners';
import {CSSTransition} from "react-transition-group";
import ResultsTable from "../../Results/ResultsTable";
import { toast } from 'react-toastify';

const CHAIN_TYPE = {
    BCELL_HEAVY: 'bcell_heavy',
    BCELL_LIGHT_K: 'bcell_light_k',
    BCELL_LIGHT_L: 'bcell_light-l',
    TCELL_ALPHA: 'tcell_alpha',
    TCELL_BETA: 'tcell_beta',
    NONE: 'none'
};
const PROCESS_STATUS = {
    INIT: 'init',
    RUNNING: 'running',
    SUCCESS: 'success'
};
const SEARCH_TYPE = {
    MATCH: 'match',
    SIBLING: 'sibling'
};
const cdr3Style = {
    padding: '8px',
    border: '1px solid #ccc',
    textTransform: 'uppercase',
    margin: '8px 4px'
};


let v_families = [
    {label: 'TRAV1-1', value: 'TRAV1-1', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV1-2', value: 'TRAV1-2', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV2', value: 'TRAV2', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV3', value: 'TRAV3', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV4', value: 'TRAV4', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV5', value: 'TRAV5', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV6', value: 'TRAV6', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV8-1', value: 'TRAV8-1', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV8-2', value: 'TRAV8-2', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV8-3', value: 'TRAV8-3', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV8-4', value: 'TRAV8-4', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV8-6', value: 'TRAV8-6', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV9-1', value: 'TRAV9-1', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV9-2', value: 'TRAV9-2', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV10', value: 'TRAV10', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV12-1', value: 'TRAV12-1', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV12-2', value: 'TRAV12-2', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV12-3', value: 'TRAV12-3', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV13-1', value: 'TRAV13-1', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV13-2', value: 'TRAV13-2', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV17', value: 'TRAV17', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV19', value: 'TRAV19', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV20', value: 'TRAV20', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV21', value: 'TRAV21', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV22', value: 'TRAV22', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV23/DV6', value: 'TRAV23/DV6', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV24', value: 'TRAV24', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV25', value: 'TRAV25', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV26-1', value: 'TRAV26-1', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV26-2', value: 'TRAV26-2', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV27', value: 'TRAV27', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV30', value: 'TRAV30', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV34', value: 'TRAV34', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV35', value: 'TRAV35', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV36/DV7', value: 'TRAV36/DV7', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV38-1', value: 'TRAV38-1', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV38-2/DV8', value: 'TRAV38-2/DV8', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV39', value: 'TRAV39', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV40', value: 'TRAV40', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV41', value: 'TRAV41', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV29/DV5', value: 'TRAV29/DV5', type: CHAIN_TYPE.TCELLs_ALPHA},
    {label: 'TRBV1', value: 'TRBV1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV2', value: 'TRBV2', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV3-1', value: 'TRBV3-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV3-2', value: 'TRBV3-2', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV4-1', value: 'TRBV4-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV4-2', value: 'TRBV4-2', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV4-3', value: 'TRBV4-3', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV5-1', value: 'TRBV5-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV5-3', value: 'TRBV5-3', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV5-4', value: 'TRBV5-4', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV5-5', value: 'TRBV5-5', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV5-6', value: 'TRBV5-6', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV5-7', value: 'TRBV5-7', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV5-8', value: 'TRBV5-8', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV6-1', value: 'TRBV6-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV6-2', value: 'TRBV6-2', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV6-4', value: 'TRBV6-4', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV6-5', value: 'TRBV6-5', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV6-6', value: 'TRBV6-6', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV6-7', value: 'TRBV6-7', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV6-8', value: 'TRBV6-8', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV6-9', value: 'TRBV6-9', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV7-1', value: 'TRBV7-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV7-2', value: 'TRBV7-2', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV7-3', value: 'TRBV7-3', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV7-4', value: 'TRBV7-4', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV7-6', value: 'TRBV7-6', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV7-7', value: 'TRBV7-7', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV7-8', value: 'TRBV7-8', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV7-9', value: 'TRBV7-9', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV9', value: 'TRBV9', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV10-1', value: 'TRBV10-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV10-2', value: 'TRBV10-2', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV10-3', value: 'TRBV10-3', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV11-1', value: 'TRBV11-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV11-2', value: 'TRBV11-2', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV11-3', value: 'TRBV11-3', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV12-1', value: 'TRBV12-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV12-2', value: 'TRBV12-2', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV12-3', value: 'TRBV12-3', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV12-4', value: 'TRBV12-4', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV12-5', value: 'TRBV12-5', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV13', value: 'TRBV13', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV14', value: 'TRBV14', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV15', value: 'TRBV15', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV16', value: 'TRBV16', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV17', value: 'TRBV17', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV18', value: 'TRBV18', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV19', value: 'TRBV19', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV20-1', value: 'TRBV20-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV20/OR9-2', value: 'TRBV20/OR9-2', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV21-1', value: 'TRBV21-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV21/OR9-2', value: 'TRBV21/OR9-2', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV23-1', value: 'TRBV23-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV24-1', value: 'TRBV24-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV24/OR9-2', value: 'TRBV24/OR9-2', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV25-1', value: 'TRBV25-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV26', value: 'TRBV26', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV26/OR9-2', value: 'TRBV26/OR9-2', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV27', value: 'TRBV27', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV28', value: 'TRBV28', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV29-1', value: 'TRBV29-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV30', value: 'TRBV30', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV29/OR9-2', value: 'TRBV29/OR9-2', type: CHAIN_TYPE.TCELL_BETA},
];
let j_families = [
    {label: 'TRBJ1-1', value: 'TRBJ1-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBJ1-2', value: 'TRBJ1-2', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBJ1-3', value: 'TRBJ1-3', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBJ1-4', value: 'TRBJ1-4', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBJ1-5', value: 'TRBJ1-5', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBJ1-6', value: 'TRBJ1-6', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBJ2-1', value: 'TRBJ2-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBJ2-2', value: 'TRBJ2-2', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBJ2-2P', value: 'TRBJ2-2P', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBJ2-3', value: 'TRBJ2-3', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBJ2-4', value: 'TRBJ2-4', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBJ2-5', value: 'TRBJ2-5', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBJ2-6', value: 'TRBJ2-6', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBJ2-7', value: 'TRBJ2-7', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRAJ1', value: 'TRAJ1', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ2', value: 'TRAJ2', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ3', value: 'TRAJ3', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ4', value: 'TRAJ4', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ5', value: 'TRAJ5', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ6', value: 'TRAJ6', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ7', value: 'TRAJ7', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ8', value: 'TRAJ8', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ9', value: 'TRAJ9', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ10', value: 'TRAJ10', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ11', value: 'TRAJ11', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ12', value: 'TRAJ12', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ13', value: 'TRAJ13', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ14', value: 'TRAJ14', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ15', value: 'TRAJ15', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ16', value: 'TRAJ16', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ17', value: 'TRAJ17', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ18', value: 'TRAJ18', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ19', value: 'TRAJ19', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ20', value: 'TRAJ20', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ21', value: 'TRAJ21', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ22', value: 'TRAJ22', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ23', value: 'TRAJ23', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ24', value: 'TRAJ24', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ25', value: 'TRAJ25', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ26', value: 'TRAJ26', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ27', value: 'TRAJ27', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ28', value: 'TRAJ28', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ29', value: 'TRAJ29', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ30', value: 'TRAJ30', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ31', value: 'TRAJ31', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ32', value: 'TRAJ32', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ33', value: 'TRAJ33', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ34', value: 'TRAJ34', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ35', value: 'TRAJ35', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ36', value: 'TRAJ36', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ37', value: 'TRAJ37', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ38', value: 'TRAJ38', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ39', value: 'TRAJ39', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ40', value: 'TRAJ40', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ41', value: 'TRAJ41', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ42', value: 'TRAJ42', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ43', value: 'TRAJ43', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ44', value: 'TRAJ44', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ45', value: 'TRAJ45', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ46', value: 'TRAJ46', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ47', value: 'TRAJ47', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ48', value: 'TRAJ48', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ49', value: 'TRAJ49', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ50', value: 'TRAJ50', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ51', value: 'TRAJ51', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ52', value: 'TRAJ52', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ53', value: 'TRAJ53', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ54', value: 'TRAJ54', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ55', value: 'TRAJ55', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ56', value: 'TRAJ56', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ57', value: 'TRAJ57', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ58', value: 'TRAJ58', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ59', value: 'TRAJ59', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ60', value: 'TRAJ60', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAJ61', value: 'TRAJ61', type: CHAIN_TYPE.TCELL_ALPHA},
];
const MATCH_KEYS = [
    {
        Header: 'Donor',
        accessor: 'donor',
        minWidth: 50,
    }, {
        Header: 'V Family',
        accessor: 'v',
        minWidth: 50,
    }, {
        Header: 'D Family',
        accessor: 'd',
        minWidth: 50,
    }, {
        Header: 'J Family',
        accessor: 'j',
        minWidth: 50,
    }, {
        Header: 'CDR3',
        accessor: 'cdr3',
        minWidth: 50,
    }, {
        Header: 'Count',
        accessor: 'count',
        minWidth: 50
    }
];
const SIBLING_KEYS = [{
        Header: 'Donor',
        accessor: 'donor',
        minWidth: 50,
    }, {
        Header: 'V Family',
        accessor: 'v',
        minWidth: 50,
    }, {
        Header: 'D Family',
        accessor: 'd',
        minWidth: 50,
    }, {
        Header: 'J Family',
        accessor: 'j',
        minWidth: 50,
    }, {
    Header: 'Match CDR3',
    accessor: 'match_cdr3',
    maxWidth: 500,
    Cell: (row) => {
        let spanList = [];
        let cdr3 = row.original.cdr3;
        let ogCdr3 = row.original.og_cdr3;
        let matchCdr3 = row.original.match_cdr3;

        let cdr3Split = cdr3.split(ogCdr3.replace(new RegExp('-', 'g'),''));

        for(let i = 0; i < cdr3Split[0].length; i++) {
            spanList.push(<span style={{color: '#ddd', fontWeight: 'bold'}}>{"-"}</span>)
        }

        for(let i = 0; i < ogCdr3.length; i++) {
            if(ogCdr3[i] === '-') {
                spanList.push(<span style={{color: '#00dd00', fontWeight: 'bold'}}>{matchCdr3[i]}</span>)
            } else if(matchCdr3[i] === '-') {
                spanList.push(<span style={{color: '#ddd', fontWeight: 'bold'}}>{"-"}</span>)
            } else if(matchCdr3[i] !== ogCdr3[i]) {
                spanList.push(<span style={{color: '#f00', fontWeight: 'bold'}}>{matchCdr3[i]}</span>)
            } else {
                spanList.push(<span>{matchCdr3[i]}</span>)
            }
        }

        for(let i = 0; i < cdr3Split[1].length; i++) {
            spanList.push(<span style={{color: '#ddd', fontWeight: 'bold'}}>{"-"}</span>)
        }

        return <div>{spanList.map(span => {
            return span;
        })}</div>
    }
}, {
    Header: "Percent Identity",
    accessor: 'pid',
    minWidth: 50
}, {
    Header: "Coverage",
    accessor: 'coverage',
    minWidth: 50
}, {
    Header: 'Count',
    accessor: 'count',
    minWidth: 50
}];

class ClonoMatchSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            v: '',
            j: '',
            cdr3_aa: '',
            chainType: '',
            processStatus: PROCESS_STATUS.INIT,
            searchType: SEARCH_TYPE.MATCH,
            results: '',
            results_v: '',
            results_j: '',
            results_cdr3: '',
            cancelled: false
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onUpdateOptions = (alias, option) => {
        let stateChange = {};

        if(['v', 'j'].includes(alias)) {
            if(option == null || Array.isArray(option)) {
                stateChange[alias] = '';

                if((alias === 'v' && this.state.j === '') ||
                    (alias === 'j' && this.state.v === '')) {
                    stateChange['chainType'] = CHAIN_TYPE.NONE;
                }
            } else {
                stateChange[alias] = option.value;

                if(option.value.includes('IGH')) {
                    stateChange['chainType'] = CHAIN_TYPE.BCELL_HEAVY;
                } else if(option.value.includes('IGK')) {
                    stateChange['chainType'] = CHAIN_TYPE.BCELL_LIGHT_K;
                } else if(option.value.includes('IGL')) {
                    stateChange['chainType'] = CHAIN_TYPE.BCELL_LIGHT_L;
                } else if(option.value.includes('TRA')) {
                    stateChange['chainType'] = CHAIN_TYPE.TCELL_ALPHA;
                } else if(option.value.includes('TRB')) {
                    stateChange['chainType'] = CHAIN_TYPE.TCELL_BETA;
                }
            }
        } else {
            stateChange[alias] = option;
        }

        this.setState(stateChange);
    };

    handleResults = (response) => {
        let results = [];
        if(this.state.searchType === SEARCH_TYPE.MATCH) {
            for(let result of response.results) {
                results.push({
                    'donor': result['_id']['hip'],
                    'v': result['_id']['v'],
                    'd': result['_id']['d'],
                    'j': result['_id']['j'],
                    'cdr3': result['_id']['cdr3'],
                    'count': result['count']
                });
            }
        } else if(this.state.searchType === SEARCH_TYPE.SIBLING) {
            for(let result of response.results) {
                results.push({
                    'donor': result['hip'],
                    'v': response['v'],
                    'd': result['d'],
                    'j': response['j'],
                    'cdr3': response['cdr3'],
                    'og_cdr3': result['og_cdr3'],
                    'match_cdr3': result['match_cdr3'],
                    'pid': result['pid'],
                    'count': result['count'],
                    'coverage': result['coverage']
                });
            }
        }

        let v3j = response.v + ' ' + response.j + ' ' + response.cdr3;
        (results.length > 0) ? toast(results.length + " clones found for " + v3j + '!', {
            type: toast.TYPE.SUCCESS
        }) : toast("No results found for " + v3j, {
            type: toast.TYPE.WARNING
        });

        if(results.length > 0) {
            this.setState({
                processStatus: PROCESS_STATUS.SUCCESS,
                results: results,
                results_v: response.v,
                results_j: response.j,
                results_cdr3: response.cdr3,
            });
        } else {
            this.setState({
                processStatus: PROCESS_STATUS.INIT,
                results: [],
            });
        }
    };

    findMatches = () => {
        this.setState({
            results: [],
            processStatus: PROCESS_STATUS.RUNNING,
            searchType: SEARCH_TYPE.MATCH
        }, () => {
            let data = this.state;

            fetch(BaseURL + 'api/clonomatch/', {
                method: 'POST',
                cors: 'no-cors',
                body: JSON.stringify(data)
            }).then(response => {
                console.log("Response:", response);
                response.json().then(this.handleResults);
            });
        });
    };

    findSiblings = () => {
        this.setState({
            results: [],
            processStatus: PROCESS_STATUS.RUNNING,
            searchType: SEARCH_TYPE.SIBLING
        }, () => {
            let data = this.state;

            fetch(BaseURL + 'api/clonomatch/sibling', {
                method: 'POST',
                cors: 'no-cors',
                body: JSON.stringify(data)
            }).then(response => {
                console.log("Response:", response);
                response.json().then(this.handleResults);
            });
        });
    };

    findRandomMatch = () => {
        this.setState({
            results: [],
            processStatus: PROCESS_STATUS.RUNNING,
            searchType: SEARCH_TYPE.MATCH
        }, () => {
            fetch(BaseURL + 'api/clonomatch/random', {
                method: 'POST'
            }).then(response => {
                if(response.status === 200) {
                    response.json().then(this.handleResults);
                } else {
                    toast("Error finding results", {
                        type: toast.TYPE.ERROR
                    });
                    this.setState({
                        processStatus: PROCESS_STATUS.INIT
                    });
                }
            });
        });
    };

    createCSV = () => {
        if(this.state.processStatus !== PROCESS_STATUS.SUCCESS) {
            return;
        }

        let data = {};
        data.rows = this.state.results;

        fetch(BaseURL + 'api/clonomatch/csv', {
            method: 'POST',
            cors: 'no-cors',
            body: JSON.stringify(data)
        }).then(response=>response.json()).then((response) => {
            window.open(BaseURL + 'api/clonomatch/csv/' + response.filename);
        });
    };

    render() {
        return (
            <div id={"clonomatch-section-container"} className={"page-section-container flex-column centered-horiz"}>
                <div id={"clonomatch-section"} className={"page-section flex-column full-width full-height"}>
                    <h1 id={"clonomatch-section-header"} className={"centered"}>ClonoMatch</h1>

                    <div id={"clonomatch-section-options"} className={"margin-huge"}>
                        <Option
                            alias={'v'}
                            name={'V Family'}
                            style={{borderRadius: '0px'}}
                            type={OPTION_TYPES.SELECT}
                            disabled={this.state.processStatus === PROCESS_STATUS.RUNNING}
                            required={true}
                            onUpdate={this.onUpdateOptions}
                            values={v_families}
                        />
                        <Option
                            alias={'j'}
                            name={'J Family'}
                            style={{borderRadius: '0px'}}
                            type={OPTION_TYPES.SELECT}
                            disabled={this.state.processStatus === PROCESS_STATUS.RUNNING}
                            required={true}
                            onUpdate={this.onUpdateOptions}
                            values={j_families}
                        />
                        <Option
                            alias={'cdr3'}
                            name={'CDR3 Amino Acid'}
                            type={OPTION_TYPES.STRING}
                            style={cdr3Style}
                            pattern={'[ACDEFGHIKLMNPQRSTVWXY]+'}
                            required={true}
                            onUpdate={this.onUpdateOptions}
                            allCaps={true}
                            disabled={this.state.processStatus === PROCESS_STATUS.RUNNING}
                        />
                    </div>

                    <div className={"margin-huge"}>
                        <button
                            className={"primary margin-medium"}
                            disabled={this.state.v === ''
                            || this.state.j === ''
                            || this.state.cdr3 === ''
                            || this.state.processStatus === PROCESS_STATUS.RUNNING}
                            onClick={this.findMatches}
                        >Find Matches</button>
                        <button
                            disabled={this.state.v === ''
                            || this.state.j === ''
                            || this.state.cdr3 === ''
                            || this.state.processStatus === PROCESS_STATUS.RUNNING}
                            className={"secondary margin-medium"}
                            onClick={this.findSiblings}
                        >Find Similar</button>
                        <button
                            className={"utility margin-medium"}
                            onClick={this.findRandomMatch}
                        >Random Clonotype</button>
                    </div>


                    <div id={"clonomatch-results-container"}>
                        <CSSTransition
                            in={this.state.processStatus === PROCESS_STATUS.RUNNING}
                            classNames={"clonomatch-element"}
                            unmountOnExit
                            timeout={600}>
                            <div
                                className={"margin-huge flex-column centered-horiz centered-vert spacing-medium"}
                            >
                                <span>Searching...</span>

                                <BarLoader
                                    loading={this.state.processStatus === PROCESS_STATUS.RUNNING}
                                    color={'rgb(0,204,69)'}
                                    width={400}
                                    height={20}
                                />
                            </div>
                        </CSSTransition>

                        <CSSTransition
                            in={this.state.processStatus === PROCESS_STATUS.SUCCESS}
                            classNames={"clonomatch-element"}
                            unmountOnExit
                            timeout={600}>
                            <div
                                className={"spacing-gargantuan full-width flex-column centered-horiz centered-vert"}>
                                <span className={"spacing-large"}>{'Matches for: ' + this.state.results_v + ' ' + this.state.results_j + ' ' + this.state.results_cdr3}</span>
                                <ResultsTable
                                    keys={this.state.searchType === SEARCH_TYPE.MATCH ? MATCH_KEYS : SIBLING_KEYS}
                                    results={this.state.results}
                                />

                                <div id="clonomatch-section-results" className={"flex-row centered margin-huge"}>
                                    <button
                                        className={"utility margin-medium"}
                                        disabled={this.state.results.length === 0}
                                        onClick={this.createCSV}
                                    >Download CSV</button>
                                </div>
                            </div>
                        </CSSTransition>
                    </div>
                </div>
            </div>
        );
    }
}

ClonoMatchSection.propTypes = {
    appState: PropTypes.object.isRequired
};

export default ClonoMatchSection;
