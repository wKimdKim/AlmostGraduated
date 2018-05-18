#!/usr/bin/python
import sys
import logging

logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/www/FlaskApp/")

from FlaskApp import app as application
application.secret_key = 'd51fh651d6fs56dv'
