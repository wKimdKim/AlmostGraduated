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
import database

app = Flask(__name__)

@app.route('/')
def index():
    try:
        return render_template('index.html',Event_Name='EVENT NAME HERE')
    except Exception as e:
        print(str(e))

@app.route('/events')
def events():
    try:
        return render_template('HTMLPage1.html')
    except Exception as e:
        print(str(e))

#@app.route('/event/query', methods=['POST'])


@app.route('/add/event', methods=['POST'])
def addevent():
    name = request.json['Name']
    area = request.json['Area']
    db = database.db('StudyGroups.db')
    db.add_event(name,area)
    return 'Success'

@app.route('/css/<path:filename>')
def css_static(filename):
    return send_from_directory(app.root_path + '/static/css/', filename)

@app.route('/js/<path:filename>')
def js_static(filename):
    return send_from_directory(app.root_path + '/static/js/', filename)


if __name__ == '__main__':
    app.run()