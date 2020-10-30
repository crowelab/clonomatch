// let baseURL = ;

export const BASE_URL = process.env.REACT_APP_URL;
console.log("BASEURL:",BASE_URL);

/*
    This is an enormous amount of constants we need to keep track of the potential columns, but they all correspond to
    fields in the MiAIRR Standard found at (https://docs.airr-community.org/en/stable/standards/overview.html) as of
    September 29, 2020. The only non-AIRR fields are in the INITIAL_FIELDS variable that immediately follows this
    comment block, which are used for the BLAST sibling search results and v/d/j "family" fields.

    There are 3 groups of fields. The first group is for the table columns in the rendered table. The second group is
    for keys to objects that

 */
export const AIRR_CELL_PROCESSING_FIELDS = ["tissue_processing","cell_subset","cell_phenotype","cell_species","single_cell",
    "cell_number","cells_per_reaction","cell_storage","cell_quality","cell_isolation","cell_processing_protocol"];
export const AIRR_NUCLEIC_ACID_FIELDS = ["template_class","template_quality","template_amount","library_generation_method",
    "library_generation_protocol","library_generation_kit_version","pcr_target","complete_sequences",
    "physical_linkage"];
export const AIRR_REPERTOIRE_FIELDS = ["repertoire_id","repertoire_name","repertoire_description","study","subject","sample",
    "data_processing"];
export const AIRR_SEQUENCING_FIELDS = ["sequencing_run_id","total_reads_passing_qc_filter","sequencing_platform",
    "sequencing_facility","sequencing_run_date","sequencing_kit","sequencing_files"];
export const AIRR_REARRANGEMENT_FIELDS = ["sequence_id","sequence","sequence_aa","rev_comp","productive","vj_in_frame","stop_codon",
    "complete_vdj","locus","v_call","d_call","d2_call","j_call","c_call","sequence_alignment","sequence_alignment_aa",
    "germline_alignment","germline_alignment_aa","junction","junction_aa","np1","np1_aa","np2","np2_aa","np3","np3_aa",
    "cdr1","cdr1_aa","cdr2","cdr2_aa","cdr3","cdr3_aa","fwr1","fwr1_aa","fwr2","fwr2_aa","fwr3","fwr3_aa","fwr4",
    "fwr4_aa","v_score","v_identity","v_support","v_cigar","d_score","d_identity","d_support","d_cigar","d2_score",
    "d2_identity","d2_support","d2_cigar","j_score","j_identity","j_support","j_cigar","c_score","c_identity",
    "c_support","c_cigar","v_sequence_start","v_sequence_end","v_germline_start","v_germline_end","v_alignment_start",
    "v_alignment_end","d_sequence_start","d_sequence_end","d_germline_start","d_germline_end","d_alignment_start",
    "d_alignment_end","d2_sequence_start","d2_sequence_end","d2_germline_start","d2_germline_end","d2_alignment_start",
    "d2_alignment_end","j_sequence_start","j_sequence_end","j_germline_start","j_germline_end","j_alignment_start",
    "j_alignment_end","cdr1_start","cdr1_end","cdr2_start","cdr2_end","cdr3_start","cdr3_end","fwr1_start","fwr1_end",
    "fwr2_start","fwr2_end","fwr3_start","fwr3_end","fwr4_start","fwr4_end","v_sequence_alignment",
    "v_sequence_alignment_aa","d_sequence_alignment","d_sequence_alignment_aa","d2_sequence_alignment",
    "d2_sequence_alignment_aa","j_sequence_alignment","j_sequence_alignment_aa","c_sequence_alignment",
    "c_sequence_alignment_aa","v_germline_alignment","v_germline_alignment_aa","d_germline_alignment",
    "d_germline_alignment_aa","d2_germline_alignment","d2_germline_alignment_aa","j_germline_alignment",
    "j_germline_alignment_aa","c_germline_alignment","c_germline_alignment_aa","junction_length","junction_aa_length",
    "np1_length","np2_length","np3_length","n1_length","n2_length","n3_length","p3v_length","p5d_length","p3d_length",
    "p5d2_length","p3d2_length","p5j_length","consensus_count","duplicate_count","cell_id","clone_id","repertoire_id",
    "sample_processing_id","data_processing_id","rearrangement_id","rearrangement_set_id","germline_database"];


/*
Sub-object
 */
export const AIRR_STUDY_FIELDS = ["study_id","study_title","study_type","study_description","inclusion_exclusion_criteria","grants",
    "collected_by","lab_name","lab_address","submitted_by","pub_ids","keywords_study"];
export const AIRR_SUBJECT_FIELDS = ["subject_id","synthetic","species","organism","sex","age_min","age_max","age_unit","age_event",
    "age","ancestry_population","ethnicity","race","strain_name","linked_subjects","link_type","diagnosis"];
export const AIRR_RAW_SEQUENCE_DATA_FIELDS = ["file_type","filename","read_direction","read_length","paired_filename",
    "paired_read_direction","paired_read_length"];

/*
Array fields
 */
export const AIRR_SAMPLE_FIELDS = ["sample_id","sample_type","tissue","anatomic_site","disease_state_sample",
    "collection_time_point_relative","collection_time_point_reference","biomaterial_provider"];
export const AIRR_DATA_PROCESSING_FIELDS = ["data_processing_id","primary_annotation","software_versions","paired_reads_assembly",
    "quality_thresholds","primer_match_cutoffs","collapsing_method","data_processing_protocols","data_processing_files",
    "germline_database","analysis_provenance_id"];
export const AIRR_DIAGNOSIS_FIELDS = ["study_group_description","disease_diagnosis","disease_length","disease_stage",
    "prior_therapies","immunogen","intervention","medical_history"];
export const AIRR_PCR_TARGET_FIELDS = ["pcr_target_locus","forward_pcr_primer_target_location",
    "reverse_pcr_primer_target_location"];