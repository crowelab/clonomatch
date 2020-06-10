import subprocess
import multiprocessing
import json
import os
import signal
import sys
from os import path

def run_node(config):
  print("Running local dev server")
  p = subprocess.Popen(['node', 'bin/www'], env={**os.environ, 'NODE_ENV': 'development'}, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
  for line in p.stdout:
    print("node -- ", line.strip().decode('utf-8'))

    # subprocess.Popen(['node', 'bin/www'])

def run_react(config):
  print("Running react-scripts start")
  p = subprocess.Popen('REACT_APP_URL=' + config['app']['url']['development'] +  ' react-scripts start', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
  for line in p.stdout:
    print("react -- ", line.strip().decode('utf-8'))


if __name__ == "__main__":
  print("Loading config file")

  BASE_DIR = path.join(path.dirname(path.realpath(__file__)),'..')
  config = {}
  with open(path.join(BASE_DIR,'conf','clonomatch.json')) as fin:
    config = json.load(fin)

  print("Setting up multiprocessing")
#   node = multiprocessing.Process(target=run_node, args=(config,))
  node = multiprocessing.Process(target=run_node, args=(config,))
#   react = multiprocessing.Process(target=run_react, args=(config,))
  react = multiprocessing.Process(target=run_react, args=(config,))

  print("Setting up SIGTERM handler")
  def end_processes(sig, frame):
    print("ending node and react processes...")
    node.terminate()
    react.terminate()
    sys.exit(0)

  signal.signal(signal.SIGINT, end_processes)
  signal.signal(signal.SIGTERM, end_processes)

  node.start()
  react.start()

#   signal.pause()