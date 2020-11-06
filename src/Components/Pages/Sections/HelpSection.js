import React, { Component } from 'react';
import MetadataSummaryTable from "../../MetadataSummaryTable";
// import PropTypes from 'prop-types';

class HelpSection extends Component {
    componentDidMount() {
        let layout = document.getElementById("layout");
        layout.style.filter = 'blur(2px)';
    }

    componentWillUnmount() {
        let layout = document.getElementById("layout");
        layout.style.filter = '';
    }

    render() {
        return <div id={"help-section-container"} className={"page-section-container flex-column centered-horiz"}>
            <div id={"help-section"} className={"page-section flex-column centered full-width centered-horiz"}>
                <h2>Help</h2>
                <h3>Single Clonotype Search</h3>
                <p>
                    This option allows the user to search for a single V3J clonotype. The user can input their V3J
                    clonotype such as in the example screenshot <a href={'/images/help1.png'} >here</a>
                    <br/><br/>
                    The V germline and J germline genes have been set to IGHV1-2 and IGHJ1 respectively.
                    This can be accomplished by toggling through the entries of the drop-down menus (V Family and J
                    Family) or typing in the germline genes and using the auto-completion feature. The sequence
                    identity has been set to 70% and the alignment coverage has been set 90% . The alignment coverage
                    threshold ensures that at least 90% of the query sequence is aligned to CDR3s in the BLAST
                    databases.  Once this information has been entered, the user can hit the Find Similar button to
                    determine if any similar results are found in the database.
                </p>
                <h3>Random Clonotype</h3>
                <p>
                    The Random Clonotype button pulls out a random V3J clonotype from the collection of V3J clonotypes
                    and then searches for other V3J clonotypes with the user-supplied sequence identity and alignment
                    coverage threshold. This feature is meant to demonstrate the functionality of the ClonoMatch system.
                </p>
                <h3>Search Multiple Clonotypes From File</h3>
                <p>
                    The user can also upload a collection of V3J clonotypes using a Comma Separate Value (CSV) file.
                    The CSV should not contain headers and should contain the V germline gene, J germline gene and amino
                    acid sequence for each entry. Allelic information may be included although all alleles will be
                    searched with the best match being returned. An example CSV file can be found:
                    <a href={"/files/example.csv"}>here</a>
                    <br/><br/>
                    Each of these V3J clonotypes will be searched against the ClonoMatch database using the sequence
                    identity and alignment coverage threshold set by the user. The user has the option of searching
                    only against CDR3s (not recommended) but this may take time since we each BLAST database will need
                    to scan.  The amino acid sequence must not contain and special characters like ‘*’ or ‘-‘ and the
                    amino acid residues must be uppercase without any intervening white space.
                </p>
                <h3>Output Table</h3>
                <img src={'/images/help2.png'} style={{height: '295px', width: '640px'}} />
                <p>
                    The results of any matches are provided in a table like the one above. The standard fields being
                    displayed in the table are V Call, J Call, Match CDR3, Query CDR3, Percent identity, Coverage and
                    Somatic Variants. The user also has the option of selecting any additional MiARR standard and
                    metadata fields from the drop-down menu (see Show Fields). A complete description of all the MiARR
                    compliant fields can be found <a href={"https://docs.airr-community.org/en/latest/miairr/introduction_miairr.html"}>here</a>
                    <br/><br/>
                    The user has the option of toggling through the list of matches page-by-page or downloading a CSV
                    file or JSON file. Each field in the table can be resized for optimal viewing. The user can also
                    add additional fields for viewing by selecting the right most drop-down menu in the Select fields
                    box. For example, the user may be interested in determining where the sequencing data comes from.
                    The user may then select the "Submitted By" field from the dropdown and it will appear in the table
                </p>
            </div>
        </div>;
    }
}
//
// const AboutSection = () => {
//
// };

HelpSection.propTypes = {};

export default HelpSection;