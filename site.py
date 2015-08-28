import json

from flask import Flask, render_template, request, make_response, session, redirect, abort
from flask.ext.assets import Environment, Bundle
from htmlmin.minify import html_minify
from flask.ext.cache import Cache
from flask.ext.triangle import Triangle

###################
## Configuration
###################
app = Flask(__name__)
assets = Environment(app)
app.config.from_pyfile('config.py')
Environment.auto_build = False
cache = Cache(app,config={'CACHE_TYPE': 'simple'})
Triangle(app)

###################
## Routes
###################
@app.route('/')
def index():
    html = render_template('index.html')
    return html_minify(unicode(html).encode('utf-8'))

###################
## Endpoints
###################
@app.route('/get-videos', methods=['GET'])
@cache.cached(timeout=1800)
def get_videos():
    """
    Return top reddit videos
    Cache result for 30 mins
    """
    from reddit import get_videos
    return json.dumps(get_videos())

if __name__ == '__main__':
    Environment.auto_build = True
    app.run(host='0.0.0.0', port=5000, debug=True)
