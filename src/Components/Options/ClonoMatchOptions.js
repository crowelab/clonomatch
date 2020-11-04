import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from "rc-switch";
import {CSSTransition} from "react-transition-group";
import Option, {OPTION_TYPES} from "./Option";

export const CHAIN_TYPE = {
    BCELL_HEAVY: 'bcell_heavy',
    BCELL_LIGHT_K: 'bcell_light_k',
    BCELL_LIGHT_L: 'bcell_light-l',
    TCELL_ALPHA: 'tcell_alpha',
    TCELL_BETA: 'tcell_beta',
    NONE: 'none'
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
    // {label: 'IGHV1-69D', value: 'IGHV1-69D', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV1-8', value: 'IGHV1-8', type: CHAIN_TYPE.BCELL_HEAVY},
    // {label: 'IGHV1-NL1', value: 'IGHV1-NL1', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV2-10', value: 'IGHV2-10', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV2-26', value: 'IGHV2-26', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV2-5', value: 'IGHV2-5', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV2-70', value: 'IGHV2-70', type: CHAIN_TYPE.BCELL_HEAVY},
    // {label: 'IGHV2-70D', value: 'IGHV2-70D', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-11', value: 'IGHV3-11', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-13', value: 'IGHV3-13', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-15', value: 'IGHV3-15', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-16', value: 'IGHV3-16', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-19', value: 'IGHV3-19', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-20', value: 'IGHV3-20', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-21', value: 'IGHV3-21', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-22', value: 'IGHV3-22', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-23', value: 'IGHV3-23', type: CHAIN_TYPE.BCELL_HEAVY},
    // {label: 'IGHV3-23D', value: 'IGHV3-23D', type: CHAIN_TYPE.BCELL_HEAVY},
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
    // {label: 'IGHV3-43D', value: 'IGHV3-43D', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-47', value: 'IGHV3-47', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-48', value: 'IGHV3-48', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-49', value: 'IGHV3-49', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-52', value: 'IGHV3-52', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-53', value: 'IGHV3-53', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-54', value: 'IGHV3-54', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-62', value: 'IGHV3-62', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-63', value: 'IGHV3-63', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-64', value: 'IGHV3-64', type: CHAIN_TYPE.BCELL_HEAVY},
    // {label: 'IGHV3-64D', value: 'IGHV3-64D', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-66', value: 'IGHV3-66', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-69-1', value: 'IGHV3-69-1', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-7', value: 'IGHV3-7', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-71', value: 'IGHV3-71', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-72', value: 'IGHV3-72', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-73', value: 'IGHV3-73', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-74', value: 'IGHV3-74', type: CHAIN_TYPE.BCELL_HEAVY},
    {label: 'IGHV3-9', value: 'IGHV3-9', type: CHAIN_TYPE.BCELL_HEAVY},
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
    // {label: 'IGKV1D-12', value: 'IGKV1D-12', type: CHAIN_TYPE.BCELL_LIGHT_K},
    // {label: 'IGKV1D-13', value: 'IGKV1D-13', type: CHAIN_TYPE.BCELL_LIGHT_K},
    // {label: 'IGKV1D-16', value: 'IGKV1D-16', type: CHAIN_TYPE.BCELL_LIGHT_K},
    // {label: 'IGKV1D-17', value: 'IGKV1D-17', type: CHAIN_TYPE.BCELL_LIGHT_K},
    // {label: 'IGKV1D-42', value: 'IGKV1D-42', type: CHAIN_TYPE.BCELL_LIGHT_K},
    // {label: 'IGKV1D-43', value: 'IGKV1D-43', type: CHAIN_TYPE.BCELL_LIGHT_K},
    // {label: 'IGKV1D-8', value: 'IGKV1D-8', type: CHAIN_TYPE.BCELL_LIGHT_K},
    {label: 'IGKV2-18', value: 'IGKV2-18', type: CHAIN_TYPE.BCELL_LIGHT_K},
    {label: 'IGKV2-24', value: 'IGKV2-24', type: CHAIN_TYPE.BCELL_LIGHT_K},
    {label: 'IGKV2-28', value: 'IGKV2-28', type: CHAIN_TYPE.BCELL_LIGHT_K},
    {label: 'IGKV2-29', value: 'IGKV2-29', type: CHAIN_TYPE.BCELL_LIGHT_K},
    {label: 'IGKV2-30', value: 'IGKV2-30', type: CHAIN_TYPE.BCELL_LIGHT_K},
    {label: 'IGKV2-4', value: 'IGKV2-4', type: CHAIN_TYPE.BCELL_LIGHT_K},
    {label: 'IGKV2-40', value: 'IGKV2-40', type: CHAIN_TYPE.BCELL_LIGHT_K},
    // {label: 'IGKV2D-18', value: 'IGKV2D-18', type: CHAIN_TYPE.BCELL_LIGHT_K},
    // {label: 'IGKV2D-24', value: 'IGKV2D-24', type: CHAIN_TYPE.BCELL_LIGHT_K},
    // {label: 'IGKV2D-26', value: 'IGKV2D-26', type: CHAIN_TYPE.BCELL_LIGHT_K},
    // {label: 'IGKV2D-29', value: 'IGKV2D-29', type: CHAIN_TYPE.BCELL_LIGHT_K},
    // {label: 'IGKV2D-30', value: 'IGKV2D-30', type: CHAIN_TYPE.BCELL_LIGHT_K},
    {label: 'IGKV3-11', value: 'IGKV3-11', type: CHAIN_TYPE.BCELL_LIGHT_K},
    {label: 'IGKV3-15', value: 'IGKV3-15', type: CHAIN_TYPE.BCELL_LIGHT_K},
    {label: 'IGKV3-20', value: 'IGKV3-20', type: CHAIN_TYPE.BCELL_LIGHT_K},
    {label: 'IGKV3-7', value: 'IGKV3-7', type: CHAIN_TYPE.BCELL_LIGHT_K},
    // {label: 'IGKV3D-11', value: 'IGKV3D-11', type: CHAIN_TYPE.BCELL_LIGHT_K},
    // {label: 'IGKV3D-15', value: 'IGKV3D-15', type: CHAIN_TYPE.BCELL_LIGHT_K},
    // {label: 'IGKV3D-20', value: 'IGKV3D-20', type: CHAIN_TYPE.BCELL_LIGHT_K},
    {label: 'IGKV4-1', value: 'IGKV4-1', type: CHAIN_TYPE.BCELL_LIGHT_K},
    {label: 'IGKV5-2', value: 'IGKV5-2', type: CHAIN_TYPE.BCELL_LIGHT_K},
    {label: 'IGKV6-21', value: 'IGKV6-21', type: CHAIN_TYPE.BCELL_LIGHT_K},
    // {label: 'IGKV6D-21', value: 'IGKV6D-21', type: CHAIN_TYPE.BCELL_LIGHT_K},
    // {label: 'IGKV6D-41', value: 'IGKV6D-41', type: CHAIN_TYPE.BCELL_LIGHT_K},
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
    // {label: 'TRAV14/DV4', value: 'TRAV14/DV4', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV16', value: 'TRAV16', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV17', value: 'TRAV17', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV19', value: 'TRAV19', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV2', value: 'TRAV2', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV20', value: 'TRAV20', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV21', value: 'TRAV21', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV22', value: 'TRAV22', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV24', value: 'TRAV24', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV25', value: 'TRAV25', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV26-1', value: 'TRAV26-1', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV26-2', value: 'TRAV26-2', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV27', value: 'TRAV27', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV3', value: 'TRAV3', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV30', value: 'TRAV30', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV34', value: 'TRAV34', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV35', value: 'TRAV35', type: CHAIN_TYPE.TCELL_ALPHA},
    {label: 'TRAV38-1', value: 'TRAV38-1', type: CHAIN_TYPE.TCELL_ALPHA},
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
    {label: 'TRBV21-1', value: 'TRBV21-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV23-1', value: 'TRBV23-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV24-1', value: 'TRBV24-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV25-1', value: 'TRBV25-1', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV26', value: 'TRBV26', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV27', value: 'TRBV27', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV28', value: 'TRBV28', type: CHAIN_TYPE.TCELL_BETA},
    {label: 'TRBV29-1', value: 'TRBV29-1', type: CHAIN_TYPE.TCELL_BETA},
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
export const SEARCH_TYPE = {
    V3J: 'v3j',
    FILE: 'file'
};

export default class ClonoMatchOptions extends Component {
    constructor() {
        super();

        this.state = {
            chainType: CHAIN_TYPE.NONE,
            searchType: SEARCH_TYPE.V3J
        }
    }

    onUpdateOptions = (alias, option) => {
        let stateChange = {};

        if (['v', 'j'].includes(alias)) {
            if (option == null || Array.isArray(option) || option === '') {
                stateChange[alias] = '';

                console.log("Here!!!")
                if ((alias === 'v' && (this.state.j === '' || this.state.j == null)) ||
                    (alias === 'j' && (this.state.v === '' || this.state.v == null))) {
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

        this.setState(stateChange, () => { this.props.onUpdateOptions(stateChange); });
    };

    render() {
        let v_fam = [];
        let j_fam = [];

        if(this.state.chainType === CHAIN_TYPE.NONE) {
            v_fam = v_families;
            j_fam = j_families;
        } else {
            for(let fam of v_families) {
                if(this.state.chainType === fam.type) v_fam.push(fam);
            }
            for(let fam of j_families) {
                if(this.state.chainType === fam.type) j_fam.push(fam);
            }
        }

        return <div>
            <div className={"flex-row centered-horiz margin-medium"}>
                <span className={"margin-small"}>Single Clonotype Search</span>
                <Switch
                    onChange={() => {
                        if(this.state.searchType === SEARCH_TYPE.V3J) this.onUpdateOptions('searchType', SEARCH_TYPE.FILE);
                        else this.onUpdateOptions('searchType', SEARCH_TYPE.V3J);
                    }}
                    onClick={() => {
                        if(this.state.searchType === SEARCH_TYPE.V3J) this.onUpdateOptions('searchType', SEARCH_TYPE.FILE);
                        else this.onUpdateOptions('searchType', SEARCH_TYPE.V3J);
                    }}
                />
                <span className={"margin-small"}>Search Multiple Clonotypes From File</span>
            </div>

            <div id={"clonomatch-section-options"} className={"margin-huge"}>
                <CSSTransition
                    in={this.state.searchType === SEARCH_TYPE.V3J}
                    classNames={"clonomatch-element"}
                    unmountOnExit
                    timeout={600}>
                    <div className={"flex-row"}>
                        <Option
                            alias={'v'}
                            name={'V Family'}
                            placeholder={"IGHV1-2"}
                            style={{borderRadius: '0px'}}
                            type={OPTION_TYPES.SELECT}
                            disabled={this.props.disabled}
                            required={false}
                            onUpdate={this.onUpdateOptions}
                            values={v_fam}
                        />
                        <Option
                            alias={'j'}
                            name={'J Family'}
                            style={{borderRadius: '0px'}}
                            placeholder={"IGHJ1"}
                            type={OPTION_TYPES.SELECT}
                            disabled={this.props.disabled}
                            required={false}
                            onUpdate={this.onUpdateOptions}
                            values={j_fam}
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
                            disabled={this.props.disabled}
                        />
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={this.state.searchType === SEARCH_TYPE.FILE}
                    classNames={"clonomatch-element"}
                    unmountOnExit
                    timeout={600}>
                    <div className={"margin-huge"}>
                        <label></label>
                        <input id="clonomatch-file-input" type="file" onChange={() => {
                            let fileInput = document.getElementById("clonomatch-file-input");
                            this.onUpdateOptions('inputFile', fileInput.files[0]);
                        }} />
                    </div>
                </CSSTransition>
            </div>

            <div className={"centered-horiz flex-row"}>
                <Option
                    alias={'pid'}
                    name={'Minimum Percent Identity'}
                    type={OPTION_TYPES.REAL}
                    style={similarStyle}
                    min={70}
                    max={100}
                    default={70}
                    required={true}
                    onUpdate={this.props.onUpdateOptions}
                    allCaps={true}
                    disabled={this.props.disabled}
                />
                <Option
                    alias={'coverage'}
                    name={'Minimum Coverage'}
                    type={OPTION_TYPES.REAL}
                    style={similarStyle}
                    min={70}
                    max={100}
                    default={90}
                    required={true}
                    onUpdate={this.props.onUpdateOptions}
                    disabled={this.props.disabled}
                />
            </div>
        </div>
    }
}

ClonoMatchOptions.propTypes = {
    onUpdateOptions: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}