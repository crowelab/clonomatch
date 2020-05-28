#!/usr/bin/env python3

import argparse
import os
from os import path
import json
import sys
import subprocess
from pymongo import MongoClient

# from SibSearch.mongo import MongoWrapper
#from SibSearch.runners import BlastRunner
QUERY_DIR = '../generated_data'
DB_DIR = 'lib/sibsearch/dbs'

db = None
collection = None

parser = argparse.ArgumentParser(
    description='This program creates a variety of statistics and graphs based on a given database run and sample')
sequence_args = parser.add_argument_group('Sequence Arguments')
sequence_args.add_argument('-v', dest='v', required=True)
sequence_args.add_argument('-j', dest='j', required=True)
sequence_args.add_argument('--cdr3', required=True)
sequence_args.add_argument('--dir', required=True)
args = parser.parse_args()

db_col = None
try:
    client = MongoClient(port=37200)
    db_col = client['sequences']['hip']
except Exception as e:
    print('Error setting up Mongo',e)
    sys.exit()

if not db_col:
    print('Could not establish connection')
    sys.exit()

vj = args.v.replace('/','') + '_' + args.j
queryfile = path.join(args.dir, 'query.fasta')
resultsfile = path.join(args.dir, 'results.csv')
outfile = path.join(args.dir, 'filtered.json')
print("Running!!", vj, queryfile, resultsfile, outfile);
# print("Writing")
with open(queryfile, 'w') as fout:
    fout.write('>Sequence\n' + args.cdr3 + '\n')

subprocess.call(['blastp',
                         '-query', queryfile,
                         '-db', path.join(DB_DIR,vj,'cdr3'),
                         '-word_size', '3',
                         '-gapopen', '7',
                         '-gapextend', '2',
                         '-out', resultsfile,
                         '-outfmt',
                         "10 qseqid sseqid pident length mismatch gapopen qstart qend sstart send evalue bitscore nident qseq sseq qcovs qcovhsp"])

SSEQID_INDEX, THRESHOLD_INDEX, EVALUE_INDEX, QUERY_INDEX, MATCH_INDEX, COVERAGE_INDEX = 1, 2, 10, 13, 14, 16
out = []
with open(resultsfile, 'r') as fin:
    for line in fin:
        ls = line.strip().split(',')
        if (float(ls[THRESHOLD_INDEX]) + float(ls[COVERAGE_INDEX])) >= 170.00:
            hip, d, count, _ = ls[1].split('_')
            out.append({
                'hip': hip,
                'd': d,
                'count': count,
                'og_cdr3': ls[QUERY_INDEX],
                'match_cdr3': ls[MATCH_INDEX],
                'pid': "{:.2f}".format(float(ls[THRESHOLD_INDEX])) + "%",
                'coverage': "{:.2f}".format(float(ls[COVERAGE_INDEX])) + "%"
            })

with open(outfile, 'w') as fout:
    json.dump(out,fout)