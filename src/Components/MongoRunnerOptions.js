import React from 'react';
import PropTypes from 'prop-types';
// import ExecutableOptions from "./Options/ExecutableOptions";
import OptionsGrid from "./Options/OptionsGrid";
import { OPTION_TYPES } from './Options/Option';

const MongoRunnerOptions = ({onUpdateOptions}) => {
    return <OptionsGrid
            onUpdateOptions={onUpdateOptions}
            options={[{
                name: "Run ID",
                required: false,
                alias: "run_id",
                // description: "Name of the job title",
                type: OPTION_TYPES.SELECT,
                values: [{
                    label: 'All',
                    value: 'all'
                }, {
                    label: '296',
                    value: '296'
                }, {
                    label: '295',
                    value: '295'
                }],
                default: 'all'
            }, {
                name: "Pipeline ID",
                required: false,
                alias: "pipeline_id",
                // description: "Name of the job title",
                type: OPTION_TYPES.SELECT,
                values: [{
                    label: 'All',
                    value: 'all'
                }, {
                    label: '307',
                    value: '307'
                }, {
                    label: '306',
                    value: '306'
                }],
                default: 'all'
            }, {
                name: "Sample ID",
                required: false,
                alias: "sample_id",
                // description: "Name of the job title",
                type: OPTION_TYPES.CREATABLE_SELECT,
                default: 'all'
            }]}
        />
}

MongoRunnerOptions.propTypes = {
    onUpdateOptions: PropTypes.func.isRequired
};

export default MongoRunnerOptions;