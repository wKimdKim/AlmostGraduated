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
        db = database.db('StudyGroups.db')
        lookup = db.event_lookup
        Events = db.get_all_events()
        Length = len(Events)
        options = db.get_study_areas()
        userslookup = db.get_user
        return render_template('index.html',lenght=Length, Events=Events, lookup=lookup, options=options[0:9], userslookup=userslookup)
    except Exception as e:
        print(str(e))
    finally:
        db.close()

@app.route('/location/query', methods=['POST'])
def get_location_details():
    id = request.json['id']
    db = database.db('StudyGroups.db')
    query_data = db.location_query(id)
    db.close()
    return jsonify(longitude=query_data[1],latitude=query_data[2])


@app.route('/add/event', methods=['POST'])
def add_event():
    EventNames = request.json['EventName']
    area = request.json['Area']
    date = request.json['DateTime']
    email = request.json['Email']
    description = request.json['Description']
    db = database.db('StudyGroups.db')
    db.add_event(EventNames,area,date,email,description)
    db.close()
    return '200'

@app.route('/css/<path:filename>')
def css_static(filename):
    return send_from_directory(app.root_path + '/static/css/', filename)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(app.root_path + '/static','favicon.ico')

@app.route('/js/<path:filename>')
def js_static(filename):
    return send_from_directory(app.root_path + '/static/js/', filename)

if __name__ == '__main__':
    app.run() 