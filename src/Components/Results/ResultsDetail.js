import React from 'react';
import PropTypes from 'prop-types';

function formatAlignment(alignments) {
    let str = '';
    alignments.forEach((align, index) => {
        index === 1 ? str += (align + '\n') : str += (align.trim() + '\n');
    });

    return str;
}

const ResultsDetail = ({detail}) => {
    return <div className={'results-detail-container'}>
        <h4 className={'results-detail-header'}>Entry Details</h4>

        <table className={'results-detail'}>
            <tbody>
            {Object.keys(detail).map((key, index) => {
                let val;
                if(key === 'BLAST Alignments') {
                    val = <td><div className={"monospace scrollable results-alignment-view"}>{formatAlignment(detail[key]['strings'])}</div></td>
                } else if(key === 'Full AA' || key.includes('AA')) {
                    val = <td><div className={"scrollable"}>{detail[key]}</div></td>
                } else {
                    val = <td>{detail[key]}</td>
                }

                return <tr
                    key={index + '-results-row'}>
                    <td className={"bold-text"}>{key}</td>
                    {val}
                </tr>
            })}
            </tbody>
        </table>
    </div>;
};

ResultsDetail.propTypes = {
    detail: PropTypes.object.isRequired,
};

export default ResultsDetail;