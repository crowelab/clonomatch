import subprocess
import json
from os import path

print("Loading config file")

BASE_DIR = path.join(path.dirname(path.realpath(__file__)),'..')
config = {}
with open(path.join(BASE_DIR,'conf','clonomatch.json')) as fin:
  config = json.load(fin)

print("Running sass")
subprocess.run(['sass', 'stylesheets/main.scss', 'public/style.css'])

print("Running react-scripts build")
subprocess.run('REACT_APP_URL=' + config['app']['url']['production'] + ' react-scripts build', shell=True)