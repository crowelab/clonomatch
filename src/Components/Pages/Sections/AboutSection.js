import React, { Component } from 'react';
import MetadataSummaryTable from "../../Metadata/MetadataSummaryTable";
// import PropTypes from 'prop-types';

class AboutSection extends Component {
    componentDidMount() {
        let layout = document.getElementById("layout");
        layout.style.filter = 'blur(2px)';
    }

    componentWillUnmount() {
        let layout = document.getElementById("layout");
        layout.style.filter = '';
    }

    render() {
        return <div id={"about-section-container"} className={"page-section-container flex-column centered-horiz"}>
            <div id={"about-section"} className={"page-section flex-column centered full-width"}>
                <h2>About ClonoMatch</h2>
                <p>
                    ClonoMatch is a V3J Clonotype Matching WebApp. Basic Clonotype matching is performed on the
                    CDR3 amino acid string, but can be refined to match on V and J gene families as well. Additionally,
                    users can perform a Similar Search on a V3J Clonotype, which uses BLAST databases to find similar
                    sequences within the input coverage and percentage identity. Both type of search results are
                    downloadable, and exact match searches include aligned full-length sequence strings.
                </p>

                <h2>Database Statistics</h2>
                <MetadataSummaryTable />

                <h3>Links</h3>
                <div>
                    <span><a href={"https://github.com/crowelab/clonomatch"}>ClonoMatch on Github</a></span>
                </div>

                <div>
                    <span><a href={"https://github.com/crowelab/PyIR"}>PyIR sequence analyzer</a>, used to process sequences.</span>
                </div>

                <div>
                    <span>Statistics about the data: <a href={"/files/study_stats-curated.ods"}>Study Statistics</a>, <a href={'/files/clonomatch_stats.csv'}>ClonoMatch dataset statistics</a></span>
                </div>

                <div>
                    <span>BCell HIP sequences referenced in <a href={"https://www.nature.com/articles/s41586-019-0934-8"}><i>nature</i></a>.</span>
                </div>
            </div>
        </div>;
    }
}
//
// const AboutSection = () => {
//
// };

AboutSection.propTypes = {};

export default AboutSection;