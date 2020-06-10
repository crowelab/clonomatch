from pymongo import MongoClient
import json
import argparse
import os
import subprocess
from os import path

print("Loading config file")

BASE_DIR = path.join(path.dirname(path.realpath(__file__)),'..')
config = {}
with open(path.join(BASE_DIR,'conf','clonomatch.json')) as fin:
  config = json.load(fin)

print("config file loaded")
try:
  with MongoClient(config['database']['mongo_url']) as client:
    col = client[config['database']['mongo_database']][config['database']['mongo_collection']]

    print("Step one: generating clonotype files")

    group = {'$group': {'_id': {} } }
    group['$group']['_id']['v'] = '$' + config['database']['schema']['v']
    group['$group']['_id']['j'] = '$' + config['database']['schema']['j']
    group['$group']['_id']['cdr3'] = '$' + config['database']['schema']['cdr3']

    print("Querying database", group)
    rows = col.aggregate([group])
    print("Received results")
    fout = None
    for i,row in enumerate(rows):
      if i%config['app']['clonotypes']['lines_per_file'] == 0:
        if fout:
          fout.close()
        fname = 'clonotypes_' + str(i // config['app']['clonotypes']['lines_per_file']) + '.csv'
        print("Writing to:",fname)
        fout = open(path.join(config['app']['clonotypes']['dir'], fname), 'w')
      fout.write(row['_id']['v'] + ',' + row['_id']['j'] + ',' + row['_id']['cdr3'] + '\n')
    fout.close()

    print("Complete!")
    print("Step two: generating blast databases")

    group = {'$group': {'_id': {}, 'num': {'$sum': 1}} }
    group['$group']['_id']['donor'] = '$' + config['database']['schema']['donor']
    group['$group']['_id']['v'] = '$' + config['database']['schema']['v']
    group['$group']['_id']['d'] = '$' + config['database']['schema']['d']
    group['$group']['_id']['j'] = '$' + config['database']['schema']['j']
    group['$group']['_id']['cdr3'] = '$' + config['database']['schema']['cdr3']

    print("Querying database")
    rows = col.aggregate([group], allowDiskUse=True)
    print("Received results")
    for i,row in enumerate(rows):
      vj = row['_id']['v'].replace('/','') + '_' + row['_id']['j']
      if not path.exists(path.join(config['app']['sibsearch']['db_dir'],vj)):
        os.makedirs(path.join(config['app']['sibsearch']['db_dir'],vj))

      with open(path.join(config['app']['sibsearch']['db_dir'],vj,'cdr3.fasta'), 'a') as fout:
        fout.write('>' + row['_id']['donor'] + '_' + row['_id']['d'] + '_' + str(row['num']) + '_' + str(i) + '\n' + row['_id']['cdr3'] + '\n')

    for vj in os.listdir(config['app']['sibsearch']['db_dir']):
      subprocess.run([config['app']['sibsearch']['makeblastdb'], '-dbtype', 'prot',
    '-in', os.path.join(config['app']['sibsearch']['db_dir'],vj,'cdr3.fasta'),
    '-out', os.path.join(config['app']['sibsearch']['db_dir'],vj,'cdr3')])
except KeyError as e:
  print("KeyError trying to access config attribute -- check your clonomatch.conf")
  print(e)
  sys.exit(0)