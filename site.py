import json
from flask import Flask, render_template, request, make_response, session, redirect, abort
from flask.ext.cache import Cache

###################
## Configuration
###################
app = Flask(__name__)
cache = Cache(app,config={'CACHE_TYPE': 'simple'})

###################
## Catch-all route
## http://flask.pocoo.org/snippets/57/
###################
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')

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
    app.run(host='0.0.0.0', port=5000, debug=True)
