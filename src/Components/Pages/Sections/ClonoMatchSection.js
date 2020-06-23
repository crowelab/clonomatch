import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Option, {OPTION_TYPES} from "../../Options/Option";
import BaseURL from '../../../Library/BaseURL';
import { BarLoader } from 'react-spinners';
import {CSSTransition} from "react-transition-group";
import ResultsTable from "../../Results/ResultsTable";
import { toast } from 'react-toastify';
import Switch from "rc-switch";


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
const similarStyle = {
    padding: '8px',
    border: '1px solid #ccc',
    maxWidth: '100px',
    margin: '8px 4px',
};

let v_families = [
        {label: 'IGHV1-18', value: 'IGHV1-18', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1-2', value: 'IGHV1-2', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1-24', value: 'IGHV1-24', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1-3', value: 'IGHV1-3', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1-38-4', value: 'IGHV1-38-4', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1-45', value: 'IGHV1-45', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1-46', value: 'IGHV1-46', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1-58', value: 'IGHV1-58', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1-68', value: 'IGHV1-68', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1-69', value: 'IGHV1-69', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1-69-2', value: 'IGHV1-69-2', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1-69D', value: 'IGHV1-69D', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1-8', value: 'IGHV1-8', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1-NL1', value: 'IGHV1-NL1', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1/OR15-1', value: 'IGHV1/OR15-1', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1/OR15-2', value: 'IGHV1/OR15-2', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1/OR15-3', value: 'IGHV1/OR15-3', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1/OR15-4', value: 'IGHV1/OR15-4', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1/OR15-5', value: 'IGHV1/OR15-5', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1/OR15-9', value: 'IGHV1/OR15-9', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV1/OR21-1', value: 'IGHV1/OR21-1', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV2-10', value: 'IGHV2-10', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV2-26', value: 'IGHV2-26', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV2-5', value: 'IGHV2-5', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV2-70', value: 'IGHV2-70', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV2-70D', value: 'IGHV2-70D', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV2/OR16-5', value: 'IGHV2/OR16-5', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-11', value: 'IGHV3-11', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-13', value: 'IGHV3-13', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-15', value: 'IGHV3-15', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-16', value: 'IGHV3-16', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-19', value: 'IGHV3-19', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-20', value: 'IGHV3-20', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-21', value: 'IGHV3-21', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-22', value: 'IGHV3-22', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-23', value: 'IGHV3-23', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-23D', value: 'IGHV3-23D', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-25', value: 'IGHV3-25', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-29', value: 'IGHV3-29', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-30', value: 'IGHV3-30', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-30-2', value: 'IGHV3-30-2', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-30-3', value: 'IGHV3-30-3', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-30-5', value: 'IGHV3-30-5', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-33', value: 'IGHV3-33', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-33-2', value: 'IGHV3-33-2', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-35', value: 'IGHV3-35', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-38', value: 'IGHV3-38', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-38-3', value: 'IGHV3-38-3', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-41', value: 'IGHV3-41', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-43', value: 'IGHV3-43', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-43D', value: 'IGHV3-43D', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-47', value: 'IGHV3-47', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-48', value: 'IGHV3-48', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-49', value: 'IGHV3-49', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-52', value: 'IGHV3-52', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-53', value: 'IGHV3-53', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-54', value: 'IGHV3-54', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-62', value: 'IGHV3-62', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-63', value: 'IGHV3-63', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-64', value: 'IGHV3-64', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-64D', value: 'IGHV3-64D', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-66', value: 'IGHV3-66', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-69-1', value: 'IGHV3-69-1', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-7', value: 'IGHV3-7', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-71', value: 'IGHV3-71', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-72', value: 'IGHV3-72', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-73', value: 'IGHV3-73', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-74', value: 'IGHV3-74', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-9', value: 'IGHV3-9', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3-NL1', value: 'IGHV3-NL1', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3/OR15-7', value: 'IGHV3/OR15-7', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3/OR16-10', value: 'IGHV3/OR16-10', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3/OR16-12', value: 'IGHV3/OR16-12', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3/OR16-13', value: 'IGHV3/OR16-13', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3/OR16-14', value: 'IGHV3/OR16-14', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3/OR16-15', value: 'IGHV3/OR16-15', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3/OR16-6', value: 'IGHV3/OR16-6', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3/OR16-8', value: 'IGHV3/OR16-8', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV3/OR16-9', value: 'IGHV3/OR16-9', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV4-28', value: 'IGHV4-28', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV4-30-2', value: 'IGHV4-30-2', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV4-30-4', value: 'IGHV4-30-4', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV4-31', value: 'IGHV4-31', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV4-34', value: 'IGHV4-34', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV4-38-2', value: 'IGHV4-38-2', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV4-39', value: 'IGHV4-39', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV4-4', value: 'IGHV4-4', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV4-55', value: 'IGHV4-55', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV4-59', value: 'IGHV4-59', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV4-61', value: 'IGHV4-61', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV4/OR15-8', value: 'IGHV4/OR15-8', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV5-10-1', value: 'IGHV5-10-1', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV5-51', value: 'IGHV5-51', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV5-78', value: 'IGHV5-78', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV6-1', value: 'IGHV6-1', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV7-34-1', value: 'IGHV7-34-1', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV7-4-1', value: 'IGHV7-4-1', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV7-40', value: 'IGHV7-40', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV7-81', value: 'IGHV7-81', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHV8-51-1', value: 'IGHV8-51-1', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGKV1-12', value: 'IGKV1-12', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1-13', value: 'IGKV1-13', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1-16', value: 'IGKV1-16', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1-17', value: 'IGKV1-17', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1-27', value: 'IGKV1-27', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1-33', value: 'IGKV1-33', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1-37', value: 'IGKV1-37', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1-39', value: 'IGKV1-39', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1-5', value: 'IGKV1-5', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1-6', value: 'IGKV1-6', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1-8', value: 'IGKV1-8', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1-9', value: 'IGKV1-9', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1-NL1', value: 'IGKV1-NL1', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1/OR-2', value: 'IGKV1/OR-2', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1/OR-3', value: 'IGKV1/OR-3', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1/OR-4', value: 'IGKV1/OR-4', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1/OR1-1', value: 'IGKV1/OR1-1', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1/OR10-1', value: 'IGKV1/OR10-1', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1/OR2-108', value: 'IGKV1/OR2-108', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1/OR2-11', value: 'IGKV1/OR2-11', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1/OR2-118', value: 'IGKV1/OR2-118', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1/OR2-3', value: 'IGKV1/OR2-3', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1/OR22-5', value: 'IGKV1/OR22-5', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1/OR9-1', value: 'IGKV1/OR9-1', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1/ORY-1', value: 'IGKV1/ORY-1', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1D-12', value: 'IGKV1D-12', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1D-13', value: 'IGKV1D-13', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1D-16', value: 'IGKV1D-16', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1D-17', value: 'IGKV1D-17', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1D-42', value: 'IGKV1D-42', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1D-43', value: 'IGKV1D-43', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV1D-8', value: 'IGKV1D-8', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV2-18', value: 'IGKV2-18', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV2-24', value: 'IGKV2-24', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV2-28', value: 'IGKV2-28', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV2-29', value: 'IGKV2-29', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV2-30', value: 'IGKV2-30', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV2-4', value: 'IGKV2-4', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV2-40', value: 'IGKV2-40', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV2/OR2-7D', value: 'IGKV2/OR2-7D', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV2/OR22-4', value: 'IGKV2/OR22-4', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV2D-18', value: 'IGKV2D-18', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV2D-24', value: 'IGKV2D-24', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV2D-26', value: 'IGKV2D-26', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV2D-29', value: 'IGKV2D-29', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV2D-30', value: 'IGKV2D-30', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV3-11', value: 'IGKV3-11', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV3-15', value: 'IGKV3-15', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV3-20', value: 'IGKV3-20', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV3-7', value: 'IGKV3-7', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV3/OR2-268', value: 'IGKV3/OR2-268', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV3D-11', value: 'IGKV3D-11', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV3D-15', value: 'IGKV3D-15', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV3D-20', value: 'IGKV3D-20', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV4-1', value: 'IGKV4-1', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV5-2', value: 'IGKV5-2', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV6-21', value: 'IGKV6-21', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV6D-21', value: 'IGKV6D-21', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV6D-41', value: 'IGKV6D-41', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKV7-3', value: 'IGKV7-3', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGLV1-36', value: 'IGLV1-36', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV1-40', value: 'IGLV1-40', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV1-41', value: 'IGLV1-41', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV1-44', value: 'IGLV1-44', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV1-47', value: 'IGLV1-47', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV1-50', value: 'IGLV1-50', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV1-51', value: 'IGLV1-51', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV1-62', value: 'IGLV1-62', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV10-54', value: 'IGLV10-54', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV11-55', value: 'IGLV11-55', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV2-11', value: 'IGLV2-11', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV2-14', value: 'IGLV2-14', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV2-18', value: 'IGLV2-18', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV2-23', value: 'IGLV2-23', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV2-33', value: 'IGLV2-33', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV2-34', value: 'IGLV2-34', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV2-5', value: 'IGLV2-5', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV2-8', value: 'IGLV2-8', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV3-1', value: 'IGLV3-1', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV3-10', value: 'IGLV3-10', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV3-12', value: 'IGLV3-12', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV3-13', value: 'IGLV3-13', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV3-16', value: 'IGLV3-16', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV3-19', value: 'IGLV3-19', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV3-21', value: 'IGLV3-21', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV3-22', value: 'IGLV3-22', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV3-25', value: 'IGLV3-25', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV3-27', value: 'IGLV3-27', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV3-31', value: 'IGLV3-31', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV3-32', value: 'IGLV3-32', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV3-9', value: 'IGLV3-9', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV4-3', value: 'IGLV4-3', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV4-60', value: 'IGLV4-60', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV4-69', value: 'IGLV4-69', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV5-37', value: 'IGLV5-37', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV5-39', value: 'IGLV5-39', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV5-45', value: 'IGLV5-45', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV5-48', value: 'IGLV5-48', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV5-52', value: 'IGLV5-52', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV6-57', value: 'IGLV6-57', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV7-43', value: 'IGLV7-43', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV7-46', value: 'IGLV7-46', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV8-61', value: 'IGLV8-61', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLV9-49', value: 'IGLV9-49', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'TRAV1-1', value: 'TRAV1-1', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV1-2', value: 'TRAV1-2', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV10', value: 'TRAV10', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV12-1', value: 'TRAV12-1', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV12-2', value: 'TRAV12-2', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV12-3', value: 'TRAV12-3', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV13-1', value: 'TRAV13-1', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV13-2', value: 'TRAV13-2', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV14/DV4', value: 'TRAV14/DV4', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV16', value: 'TRAV16', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV17', value: 'TRAV17', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV19', value: 'TRAV19', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV2', value: 'TRAV2', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV20', value: 'TRAV20', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV21', value: 'TRAV21', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV22', value: 'TRAV22', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV23/DV6', value: 'TRAV23/DV6', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV24', value: 'TRAV24', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV25', value: 'TRAV25', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV26-1', value: 'TRAV26-1', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV26-2', value: 'TRAV26-2', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV27', value: 'TRAV27', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV29/DV5', value: 'TRAV29/DV5', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV3', value: 'TRAV3', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV30', value: 'TRAV30', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV34', value: 'TRAV34', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV35', value: 'TRAV35', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV36/DV7', value: 'TRAV36/DV7', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV38-1', value: 'TRAV38-1', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV38-2/DV8', value: 'TRAV38-2/DV8', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV39', value: 'TRAV39', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV4', value: 'TRAV4', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV40', value: 'TRAV40', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV41', value: 'TRAV41', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV5', value: 'TRAV5', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV6', value: 'TRAV6', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV8-1', value: 'TRAV8-1', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV8-2', value: 'TRAV8-2', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV8-3', value: 'TRAV8-3', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV8-4', value: 'TRAV8-4', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV8-6', value: 'TRAV8-6', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV8-7', value: 'TRAV8-7', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAV9-2', value: 'TRAV9-2', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRBV1', value: 'TRBV1', type: CHAIN_TYPE.TCELL_BETA},
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
        {label: 'TRBV2', value: 'TRBV2', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBV20-1', value: 'TRBV20-1', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBV20/OR9-2', value: 'TRBV20/OR9-2', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBV21-1', value: 'TRBV21-1', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBV21/OR9-2', value: 'TRBV21/OR9-2', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBV23-1', value: 'TRBV23-1', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBV23/OR9-2', value: 'TRBV23/OR9-2', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBV24-1', value: 'TRBV24-1', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBV25-1', value: 'TRBV25-1', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBV26', value: 'TRBV26', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBV26/OR9-2', value: 'TRBV26/OR9-2', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBV27', value: 'TRBV27', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBV28', value: 'TRBV28', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBV29-1', value: 'TRBV29-1', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBV29/OR9-2', value: 'TRBV29/OR9-2', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBV3-1', value: 'TRBV3-1', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBV3-2', value: 'TRBV3-2', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBV30', value: 'TRBV30', type: CHAIN_TYPE.TCELL_BETA},
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
        {label: 'TRBV9', value: 'TRBV9', type: CHAIN_TYPE.TCELL_BETA}
];
let j_families = [
        {label: 'IGHJ1', value: 'IGHJ1', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHJ2', value: 'IGHJ2', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHJ3', value: 'IGHJ3', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHJ4', value: 'IGHJ4', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHJ5', value: 'IGHJ5', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGHJ6', value: 'IGHJ6', type: CHAIN_TYPE.BCELL_HEAVY},
        {label: 'IGKJ1', value: 'IGKJ1', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKJ2', value: 'IGKJ2', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKJ3', value: 'IGKJ3', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKJ4', value: 'IGKJ4', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGKJ5', value: 'IGKJ5', type: CHAIN_TYPE.BCELL_LIGHT_K},
        {label: 'IGLJ1', value: 'IGLJ1', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLJ2', value: 'IGLJ2', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLJ3', value: 'IGLJ3', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLJ4', value: 'IGLJ4', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLJ5', value: 'IGLJ5', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLJ6', value: 'IGLJ6', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'IGLJ7', value: 'IGLJ7', type: CHAIN_TYPE.BCELL_LIGHT_L},
        {label: 'TRAJ1', value: 'TRAJ1', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ10', value: 'TRAJ10', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ11', value: 'TRAJ11', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ12', value: 'TRAJ12', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ13', value: 'TRAJ13', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ14', value: 'TRAJ14', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ15', value: 'TRAJ15', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ16', value: 'TRAJ16', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ17', value: 'TRAJ17', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ18', value: 'TRAJ18', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ2', value: 'TRAJ2', type: CHAIN_TYPE.TCELL_ALPHA},
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
        {label: 'TRAJ3', value: 'TRAJ3', type: CHAIN_TYPE.TCELL_ALPHA},
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
        {label: 'TRAJ4', value: 'TRAJ4', type: CHAIN_TYPE.TCELL_ALPHA},
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
        {label: 'TRAJ5', value: 'TRAJ5', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ50', value: 'TRAJ50', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ52', value: 'TRAJ52', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ53', value: 'TRAJ53', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ54', value: 'TRAJ54', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ55', value: 'TRAJ55', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ56', value: 'TRAJ56', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ57', value: 'TRAJ57', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ58', value: 'TRAJ58', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ6', value: 'TRAJ6', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ61', value: 'TRAJ61', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ7', value: 'TRAJ7', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ8', value: 'TRAJ8', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRAJ9', value: 'TRAJ9', type: CHAIN_TYPE.TCELL_ALPHA},
        {label: 'TRBJ1-1', value: 'TRBJ1-1', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBJ1-2', value: 'TRBJ1-2', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBJ1-3', value: 'TRBJ1-3', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBJ1-4', value: 'TRBJ1-4', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBJ1-5', value: 'TRBJ1-5', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBJ1-6', value: 'TRBJ1-6', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBJ2-1', value: 'TRBJ2-1', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBJ2-2', value: 'TRBJ2-2', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBJ2-3', value: 'TRBJ2-3', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBJ2-4', value: 'TRBJ2-4', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBJ2-5', value: 'TRBJ2-5', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBJ2-6', value: 'TRBJ2-6', type: CHAIN_TYPE.TCELL_BETA},
        {label: 'TRBJ2-7', value: 'TRBJ2-7', type: CHAIN_TYPE.TCELL_BETA}
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
            cdr3: '',
            chainType: '',
            processStatus: PROCESS_STATUS.INIT,
            searchType: SEARCH_TYPE.MATCH,
            results_match: [],
            results_sib: [],
            results_v: '',
            results_j: '',
            results_cdr3: '',
            results_sib_v: '',
            results_sib_j: '',
            results_sib_cdr3: '',
            results_match_v: '',
            results_match_j: '',
            results_match_cdr3: '',
            pid: 50,
            coverage: 90,
            cancelled: false
        }
    }

    onUpdateOptions = (alias, option) => {
        let stateChange = {};

        if (['v', 'j'].includes(alias)) {
            if (option == null || Array.isArray(option)) {
                stateChange[alias] = '';

                if ((alias === 'v' && this.state.j === '') ||
                    (alias === 'j' && this.state.v === '')) {
                    stateChange['chainType'] = CHAIN_TYPE.NONE;
                }
            } else {
                stateChange[alias] = option.value;

                if (option.value.includes('IGH')) {
                    stateChange['chainType'] = CHAIN_TYPE.BCELL_HEAVY;
                } else if (option.value.includes('IGK')) {
                    stateChange['chainType'] = CHAIN_TYPE.BCELL_LIGHT_K;
                } else if (option.value.includes('IGL')) {
                    stateChange['chainType'] = CHAIN_TYPE.BCELL_LIGHT_L;
                } else if (option.value.includes('TRA')) {
                    stateChange['chainType'] = CHAIN_TYPE.TCELL_ALPHA;
                } else if (option.value.includes('TRB')) {
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
        if (this.state.searchType === SEARCH_TYPE.MATCH) {
            for (let result of response.results) {
                results.push({
                    'donor': result['_id']['donor'],
                    'v': result['_id']['v'],
                    'd': result['_id']['d'],
                    'j': result['_id']['j'],
                    'cdr3': result['_id']['cdr3'],
                    'count': result['count'],
                    'seqs': result['seqs']
                });
            }
        } else if (this.state.searchType === SEARCH_TYPE.SIBLING) {
            for (let result of response.results) {
                results.push({
                    'donor': result['donor'],
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

        let newState;
        if (results.length > 0) {
            newState = {
                processStatus: PROCESS_STATUS.SUCCESS,
            };
        } else {
            newState = { processStatus: PROCESS_STATUS.INIT }
        }

        if(this.state.searchType === SEARCH_TYPE.SIBLING) {
            newState.results_sib = results;
            newState.results_sib_v = response.v;
            newState.results_sib_j = response.j;
            newState.results_sib_cdr3 = response.cdr3;
        } else {
            newState.results_match = results;
            newState.results_match_v = response.v;
            newState.results_match_j = response.j;
            newState.results_match_cdr3 = response.cdr3;
        }

        this.setState(newState);
    };

    findMatches = () => {
        this.setState({
            results_match: [],
            processStatus: PROCESS_STATUS.RUNNING,
            searchType: SEARCH_TYPE.MATCH
        }, () => {
            let data = this.state;

            fetch(BaseURL + '/api/clonomatch/', {
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
            results_sib: [],
            processStatus: PROCESS_STATUS.RUNNING,
            searchType: SEARCH_TYPE.SIBLING
        }, () => {
            let data = this.state;

            fetch(BaseURL + '/api/clonomatch/sibling', {
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
            results_match: [],
            processStatus: PROCESS_STATUS.RUNNING,
            searchType: SEARCH_TYPE.MATCH
        }, () => {
            fetch(BaseURL + '/api/clonomatch/random', {
                method: 'POST'
            }).then(response => {
                if (response.status === 200) {
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
        if (this.state.processStatus !== PROCESS_STATUS.SUCCESS) {
            return;
        }

        let data = {};
        this.state.searchType === SEARCH_TYPE.MATCH ? data.rows = this.state.results_match : data.rows = this.state.results_sib;

        fetch(BaseURL + '/api/clonomatch/csv', {
            method: 'POST',
            cors: 'no-cors',
            body: JSON.stringify(data)
        }).then(response => response.json()).then((response) => {
            window.open(BaseURL + '/api/clonomatch/csv/' + response.filename);
        });
    };

    render() {
        return (
            <div id={"clonomatch-section-container"} className={"page-section-container flex-column centered-horiz"}>
                <div id={"clonomatch-section"} className={"page-section flex-column full-width full-height"}>
                    <h1 id={"clonomatch-section-header"} className={"centered"}>ClonoMatch</h1>

                    <div className={"flex-row centered-horiz margin-medium"}>
                        <span className={"margin-small"}>Find Matches</span>
                        <Switch
                            onChange={() => {
                                if(this.state.searchType === SEARCH_TYPE.MATCH) this.setState({searchType: SEARCH_TYPE.SIBLING});
                                else this.setState({searchType: SEARCH_TYPE.MATCH});
                            }}
                            onClick={() => {
                                if(this.state.searchType === SEARCH_TYPE.MATCH) this.setState({searchType: SEARCH_TYPE.SIBLING});
                                else this.setState({searchType: SEARCH_TYPE.MATCH});
                            }}
                        />
                        <span className={"margin-small"}>Find Similar</span>
                    </div>

                    <div id={"clonomatch-section-options"} className={"margin-huge"}>
                        <Option
                            alias={'v'}
                            name={'V Family'}
                            style={{borderRadius: '0px'}}
                            type={OPTION_TYPES.SELECT}
                            disabled={this.state.processStatus === PROCESS_STATUS.RUNNING}
                            required={false}
                            onUpdate={this.onUpdateOptions}
                            values={v_families}
                        />
                        <Option
                            alias={'j'}
                            name={'J Family'}
                            style={{borderRadius: '0px'}}
                            type={OPTION_TYPES.SELECT}
                            disabled={this.state.processStatus === PROCESS_STATUS.RUNNING}
                            required={false}
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

                    <CSSTransition
                        in={this.state.searchType === SEARCH_TYPE.SIBLING}
                        classNames={"clonomatch-element"}
                        unmountOnExit
                        timeout={600}>
                        <div className={"centered-horiz flex-row"}>
                            <Option
                                alias={'pid'}
                                name={'Minimum Percent Identity'}
                                type={OPTION_TYPES.REAL}
                                style={similarStyle}
                                min={50}
                                max={100}
                                default={50}
                                required={true}
                                onUpdate={this.onUpdateOptions}
                                allCaps={true}
                                disabled={this.state.processStatus === PROCESS_STATUS.RUNNING}
                            />
                            <Option
                                alias={'coverage'}
                                name={'Minimum Coverage'}
                                type={OPTION_TYPES.REAL}
                                style={similarStyle}
                                min={50}
                                max={100}
                                default={90}
                                required={true}
                                onUpdate={this.onUpdateOptions}
                                disabled={this.state.processStatus === PROCESS_STATUS.RUNNING}
                            />
                        </div>
                    </CSSTransition>

                    <CSSTransition
                        in={this.state.searchType === SEARCH_TYPE.MATCH}
                        classNames={"clonomatch-element"}
                        unmountOnExit
                        timeout={600}>
                        <div>
                            <div className={"margin-huge"}>
                                <button
                                    className={"primary margin-medium"}
                                    disabled={this.state.cdr3 === ''
                                    || this.state.processStatus === PROCESS_STATUS.RUNNING}
                                    onClick={this.findMatches}
                                >Find Matches
                                </button>
                                <button
                                    className={"utility margin-medium"}
                                    onClick={this.findRandomMatch}
                                >Random Clonotype
                                </button>
                            </div>
                        </div>
                    </CSSTransition>

                    <CSSTransition
                        in={this.state.searchType === SEARCH_TYPE.SIBLING}
                        classNames={"clonomatch-element"}
                        unmountOnExit
                        timeout={600}>
                        <div>
                            <div className={"margin-huge"}>
                                <button
                                    disabled={this.state.v === ''
                                    || this.state.j === ''
                                    || this.state.cdr3 === ''
                                    || this.state.processStatus === PROCESS_STATUS.RUNNING}
                                    className={"primary margin-medium"}
                                    onClick={this.findSiblings}
                                >Find Similar
                                </button>
                            </div>
                        </div>
                    </CSSTransition>

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
                            in={this.state.processStatus === PROCESS_STATUS.SUCCESS
                                && ((this.state.searchType === SEARCH_TYPE.MATCH && this.state.results_match.length > 0)
                                || (this.state.searchType === SEARCH_TYPE.SIBLING && this.state.results_sib.length > 0))}
                            classNames={"clonomatch-element"}
                            unmountOnExit
                            timeout={600}>
                            <div
                                className={"spacing-gargantuan full-width flex-column centered-horiz centered-vert"}>
                                <span className={"spacing-large"}>{'Results for: '.concat(
                                    this.state.searchType === SEARCH_TYPE.MATCH ? this.state.results_match_v : this.state.results_sib_v,
                                    ' ', this.state.searchType === SEARCH_TYPE.MATCH ? this.state.results_match_j : this.state.results_sib_j,
                                    ' ', this.state.searchType === SEARCH_TYPE.MATCH ? this.state.results_match_cdr3 : this.state.results_sib_cdr3
                                )}
                                </span>
                                <ResultsTable
                                    keys={this.state.searchType === SEARCH_TYPE.MATCH ? MATCH_KEYS : SIBLING_KEYS}
                                    results={this.state.searchType === SEARCH_TYPE.MATCH ? this.state.results_match : this.state.results_sib}
                                />

                                <div id="clonomatch-section-results" className={"flex-row centered margin-huge"}>
                                    <button
                                        className={"utility margin-medium"}
                                        disabled={this.state.searchType === SEARCH_TYPE.MATCH ?
                                            this.state.results_match.length === 0 : this.state.results_sib.length === 0}
                                        onClick={this.createCSV}
                                    >Download CSV
                                    </button>
                                </div>
                            </div>
                        </CSSTransition>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClonoMatchSection;
