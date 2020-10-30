#!/usr/bin/env python3

import argparse
import os
from os import path
from pymongo import MongoClient
from bson import ObjectId, json_util
import re
import json
import math
import sys
import subprocess
from tempfile import NamedTemporaryFile
from multiprocessing import Pool, cpu_count, freeze_support
from functools import partial

BASE_DIR = path.join(path.dirname(path.realpath(__file__)),'..','..')
config = {}
with open(path.join(BASE_DIR,'conf','clonomatch.json')) as fin:
    config = json.load(fin)

parser = argparse.ArgumentParser(
    description='This program creates a variety of statistics and graphs based on a given database run and sample')
sequence_args = parser.add_argument_group('Sequence Arguments')
sequence_args.add_argument('-v', dest='v')
sequence_args.add_argument('-j', dest='j')
sequence_args.add_argument('--cdr3', required=True)
sequence_args.add_argument('--out', required=True)
sequence_args.add_argument('--pid', required=True, type=float)
sequence_args.add_argument('--coverage', required=True, type=float)
sequence_args.add_argument('--threads', type=int, default=cpu_count()-1)
args = parser.parse_args()

with NamedTemporaryFile(mode='w', delete=False) as fout:
    fout.write('>Sequence\n' + args.cdr3 + '\n')
    queryfile = fout.name

def run_search(args, config, queryfile, vjlength):
    print('Running search on:', vjlength)
    cdr3length = len(args.cdr3)
    blast_args = [config['app']['sibsearch']['blastp'],
                               '-query', queryfile,
                               '-db', path.join(config['app']['sibsearch']['db_dir'],vjlength,'cdr3'),
                               '-word_size', '3',
                               '-gapopen', '7',
                               '-gapextend', '2',
                               '-outfmt', "10 qseqid sseqid pident evalue qseq sseq"]
    process = subprocess.Popen(blast_args, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, universal_newlines=True)

    out = {}
    v3j = {}
    for line in process.stdout:
        qseqid, sseqid, pid, evalue, query, match = line.strip().split(',')
        pid = float(pid)
        coverage = min((len(match.replace('-',''))/float(cdr3length))*100.00, 100.00)
        if pid >= args.pid and coverage >= args.coverage:
            out[sseqid] = {
                'original_j': args.j,
                'original_v': args.v,
                'original_cdr3': args.cdr3,
                'query_cdr3': query,
                'percent_identity': "{:.2f}".format(pid),
                'e_value': evalue,
                'match_cdr3': match,
                'coverage': "{:.2f}".format(coverage)
            }

    v3js = {}
    print('getting rows...')
    with MongoClient(config['database']['mongo_url']) as client, NamedTemporaryFile(mode='w', delete=False) as fout:
        col = client[config['database']['mongo_database']][config['database']['mongo_collection']]
        rows = col.find({'_id': {'$in': [ObjectId(x) for x in out.keys()]} })
        for row in rows:
            if 'v_call' not in row or row['v_call'] == '' or 'j_call' not in row or row['j_call'] == '':
              continue

            v3j = row['v_call'].split('*')[0] + '_' + row['j_call'].split('*')[0] + '_' + row['cdr3_aa']
            if v3j not in v3js:
                v3js[v3j] = []
            v3js[v3j].append(row)

        for v3j in v3js:
            for row in v3js[v3j]:
                row['somatic_variants'] = len(v3js[v3j])
                fout.write(json_util.dumps({**out[str(row['_id'])], **row}) + '\n')

        return fout.name

run_search_partial = partial(run_search, args, config, queryfile)

if __name__ == '__main__':
    freeze_support()

    args_cdr3length = len(args.cdr3)
    lengthdiff = len(args.cdr3) - int(math.floor(len(args.cdr3)*(args.coverage/100.00)))

    multiprocessing_args = []
    vjlength_re = re.compile('([\w|\-]+)_([\w|\-]+)?_(\d+)')
    for vjlength in os.listdir(config['app']['sibsearch']['db_dir']):
        if vjlength == '_':
            continue
        match = vjlength_re.match(vjlength)
        if not match:
            continue

        v, j, cdr3length = match.groups()
        if (not args.v or (args.v.replace('/','') == v)) and (not args.j or (args.j == j)) and \
            (args_cdr3length-lengthdiff <= int(cdr3length) <= args_cdr3length+lengthdiff):
            multiprocessing_args.append(str(vjlength))

    sibsearch_results = {}
    id_list = []
    with Pool(args.threads) as p:
        tmpfiles = p.map(run_search_partial, multiprocessing_args)

    os.remove(queryfile)
    print("Got results!")
    FIRST = True
    with open(args.out, 'w') as fout:
        fout.write('[\n')
        for fname in tmpfiles:
            with open(fname) as fin:
                for line in fin:
                    if FIRST:
                        FIRST = False
                    else:
                        fout.write(',\n')
                    fout.write(line.strip())

            os.remove(fname)

        fout.write('\n]\n')
