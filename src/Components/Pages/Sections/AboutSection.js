import React, { Component } from 'react';
import MetadataSummaryTable from "../../MetadataSummaryTable";

class AboutSection extends Component {
    render() {
        return <div id={"about-section-container"} className={"page-section-container flex-column centered-horiz"}>
            <div id={"about-section"} className={"page-section flex-column centered full-width"}>
                <h2>About ClonoMatch</h2>
                <p>
                    ClonoMatch is webservice that allows users to input V3J clonotypes to search for similar B cell or
                    T cell receptor sequences derived from adaptive immune repertoire sequencing (AIRR-seq). The user
                    must supply the amino acid sequence belonging to the Complementarity-determining region 3 (CDR3)
                    of a B cell or T cell sequence along with the Variable (V) and Joining (J) germline gene (without
                    the allelic distinction). The CDR3 sequence should contain all the residues between the canonical
                    cysteine and tryptophan (or phenylalanine) residues. ClonoMatch will then use BLAST [PMID: 2231712]
                    to search through collections of CDR3 amino acid sequences grouped by the V and J germline gene of
                    interest. To speed up the searching, only those BLAST databases within 1 amino acid length of the
                    input CDR3 sequence will be searched. Matches between the input CDR3 sequences and the CDR3
                    sequences within the BLAST databases are filtered based on the user-supplied sequence identity and
                    the alignment coverage cutoff. The user can supply just a CDR3 amino acid without the V and J
                    germlines. However, this will require a search through multiple BLAST databases that will result
                    in a longer search times.
                    <br/><br/>
                    ClonoMatch uses a MongoDB database (version 4.2.6) to store processed Adaptive Immune Receptor
                    Repertoire (AIRR-seq) data in a <a href={"https://docs.airr-community.org/en/latest/miairr/introduction_miairr.html"} >MiARR compliant format</a>.
                    FASTA files containing AIRR-seq data from external sources are all processed using PyIR
                    [PMID: 32677886] with default options and then imported into the ClonoMatch database. Once all the
                    data has been imported into ClonoMatch, all V3J clonotypes from productive sequences are exported
                    and grouped according to their V and J germline gene designations (ignoring the allelic
                    distinction). The sequences are then grouped further by their CDR3 length. Grouping using V and J
                    germline gene designations along with CDR3 length speeds up sequence searching by focusing only on
                    those databases that are likely to have similar V3J clonotypes. Once the CDR3 sequences have been
                    grouped, we then use makeblastdb to generate a BLAST [PMID: 2231712] formatted database for each
                    V-J-CDR3 (aa) length combination. These databases are stored locally on the ClonoMatch server and
                    are updated whenever a new AIRR-seq dataset is imported into the MongoDB database.
                    <br/><br/>
                    Currently, the webservice is hosted on a server with an 8c/16t Skylake processor and 256GB of
                    RAM with a 3.5 TB hard drive. After all the user-supplied sequences have been scanned against the
                    BLAST databases, only those matches at or above the user supplied sequence identity and sequence
                    alignment thresholds are returned. ClonoMatch is set up to search for V3J clonotypes based on their
                    amino acid sequences only. A links containing a complete list of the AIRR-seq data sets can be found
                    on the this site as well as <a href={"https://github.com/crowelab/clonomatch"}>GitHub</a>.

                </p>

                <h2>ClonoMatch Data Statistics</h2>
                <MetadataSummaryTable />

                <h3>Links</h3>
                <div>
                    <span><a href={"https://github.com/crowelab/clonomatch"}>ClonoMatch on Github</a></span>
                </div>
            </div>
        </div>;
    }
}

AboutSection.propTypes = {};

export default AboutSection;