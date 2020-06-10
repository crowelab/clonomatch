import subprocess
import json
import argparse
from os import path

print("Loading config file")
parser = argparse.ArgumentParser()
parser.add_argument('--config', help='Configuration file')
args = parser.parse_args()
print("Loading config file")

config = {}
if args.config and args.config != '':
  with open(args.config) as fin:
    config = json.load(fin)
else:
  BASE_DIR = path.join(path.dirname(path.realpath(__file__)),'..')
  with open(path.join(BASE_DIR,'conf','clonomatch.json')) as fin:
    config = json.load(fin)

print("Running sass")
subprocess.run(['sass', 'stylesheets/main.scss', 'public/style.css'])

print("Running react-scripts build")
subprocess.run('REACT_APP_URL=' + config['app']['url']['production'] + ' react-scripts build', shell=True)