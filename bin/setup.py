#!/usr/bin/env python3

from pymongo import MongoClient
import json
import argparse
import os
import subprocess
import sys
from os import path

parser = argparse.ArgumentParser()
parser.add_argument('--config', help='Configuration file', default="../conf/clonomatch.json")
args = parser.parse_args()
print("Loading config file")

try:
  if args.config and args.config != '':
    with open(args.config) as fin:
      config = json.load(fin)
except:
  print("The config file was not found")
  sys.exit(-1)

if not path.exists(config['app']['sibsearch']['db_dir']):
  os.makedirs(config['app']['sibsearch']['db_dir'])

print("config file loaded")

try:
  with MongoClient(config['database']['mongo_url']) as client:
    col = client[config['database']['mongo_database']][config['database']['mongo_collection']]

    print("Complete!")
    print("Step two: generating blast databases")

    print("Querying database")
    rows = col.find()
    print("Received results")
    for row in rows:
      if row['v_call'] == '' or row['j_call'] == '':
        continue

      vjlength = row['v_call'].split('*')[0].replace('/','') + '_' + row['j_call'].split('*')[0] + '_' + str(len(row['cdr3_aa']))
      if not path.exists(path.join(config['app']['sibsearch']['db_dir'],vjlength)):
        os.makedirs(path.join(config['app']['sibsearch']['db_dir'],vjlength))

      with open(path.join(config['app']['sibsearch']['db_dir'],vjlength,'cdr3.fasta'), 'a') as fout:
        fout.write('>' + str(row['_id']) + '\n' + row['cdr3_aa'] + '\n')

    for vjlength in os.listdir(config['app']['sibsearch']['db_dir']):
      subprocess.run([config['app']['sibsearch']['makeblastdb'], '-dbtype', 'prot',
    '-in', os.path.join(config['app']['sibsearch']['db_dir'],vjlength,'cdr3.fasta'),
    '-out', os.path.join(config['app']['sibsearch']['db_dir'],vjlength,'cdr3')])
except KeyError as e:
  print("KeyError trying to access config attribute -- check your clonomatch.conf")
  print(e)
  sys.exit(0)
