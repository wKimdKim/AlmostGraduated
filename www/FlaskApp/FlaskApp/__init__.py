from flask import (
    Flask,
    request,
    render_template,
    send_from_directory,
    url_for,
    jsonify,
    flash,
    render_template_string
)
import sqlite3 

app = Flask(__name__)

@app.route('/')
def index():
    try:
        return render_template('index.html')
    except Exception as e:
        print(str(e))

@app.route('/dbquery/events', methods=['POST'])

#@app.route('')

@app.route('/css/<path:filename>')
def css_static(filename):
    return send_from_directory(app.root_path + '/static/css/', filename)

@app.route('/js/<path:filename>')
def js_static(filename):
    return send_from_directory(app.root_path + '/static/js/', filename)


if __name__ == '__main__':
    app.run()