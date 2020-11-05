import React, { Component } from 'react';
import MetadataSummaryTable from "../../MetadataSummaryTable";

class AboutSection extends Component {
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

                <h2>ClonoMatch Data Statistics</h2>
                <MetadataSummaryTable />

                <h3>Links</h3>
                <div>
                    <span><a href={"https://github.com/crowelab/clonomatch"}>ClonoMatch on Github</a></span>
                </div>

                {/*<div>*/}
                {/*    <span><a href={"https://github.com/crowelab/PyIR"}>PyIR sequence analyzer</a>, used to process sequences.</span>*/}
                {/*</div>*/}
            </div>
        </div>;
    }
}

AboutSection.propTypes = {};

export default AboutSection;