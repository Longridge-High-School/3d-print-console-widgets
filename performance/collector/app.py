  GNU nano 8.4                                                                                         app.py                                                                                                    #
# Collector for 3D Print Console Performance Widget
#

from flask import Flask
from flask_cors import CORS
import psutil
import json

app = Flask (__name__)
CORS (app)

@app.route ("/cpu")
def cpu ():

  return json.dumps (psutil.cpu_percent (interval = 1, percpu = True))

@app.route ("/memory")
def memory ():

  return json.dumps (psutil.virtual_memory ())

@app.route ("/disk")
def disk ():

  return json.dumps (psutil.disk_usage ("/"))