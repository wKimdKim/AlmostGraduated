import sqlite3
from datetime import datetime
import json


class db:
    def __init__(self, path):
        self.conn = sqlite3.connect(path)
        self.cursor = self.conn.cursor()

    def get_user(self, userID):
        decoder = json.JSONDecoder()
        userID = decoder.decode(userID)
        users = []
        for i in userID:
            users.append(self.cursor.execute("SELECT Name FROM User WHERE ID=?", (i,)).fetchall()[0][0])
        return users

    def add_user(self, name):
        userID = self.cursor.execute("SELECT ID FROM User WHERE Name=?", (name,)).fetchone()

        if userID is not None:
            return userID[0]
        else:

            try:
                userID = self.cursor.execute("SELECT rowid FROM User ORDER BY rowid DESC").fetchone()[0] + 1
            except TypeError:
                userID = 0

        self.cursor.execute("INSERT INTO User VALUES (?,?)", (userID, name))
        self.conn.commit()
        return userID

    def get_all_events(self):
        data = self.cursor.execute("SELECT * FROM Event").fetchall()
        data.sort(key=lambda tup: datetime.strptime(tup[3], '%d %b'))
        new_data = [[data[0]]]
        data.pop(0)
        for i in data:
            if i[3] == new_data[len(new_data) - 1][0][3]:
                new_data[len(new_data) - 1].append(i)
            else:
                new_data.append([i])

        for i in new_data:
            i.sort()

        return new_data

    def add_event(self, eventname, name, area, eventDateTime, email, description):
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        try:
            id = self.cursor.execute("SELECT rowid FROM Event ORDER BY rowid DESC").fetchone()[0] + 1
        except TypeError:
            id = 0

        if type(area) == list:
            self.add_custom_study_area(name, area)
            area = name

        email = str([self.add_user(name)])

        time = eventDateTime[11:]
        date = eventDateTime[8:10] + ' ' + months[int(eventDateTime[5:7]) - 1]
        area = self.cursor.execute("SELECT ID FROM StudyArea WHERE Name=?", (area,)).fetchone()[0]

        self.cursor.execute("INSERT INTO Event VALUES(?,?,?,?,?,?,?)",
                            (id, eventname, time, date, email, area, description))
        self.conn.commit()

    def add_custom_study_area(self, name, area):
        try:
            id = self.cursor.execute("SELECT rowid FROM StudyArea ORDER BY rowid DESC").fetchone()[0] + 1
        except TypeError:
            id = 0

        self.cursor.execute("INSERT INTO StudyArea VALUES (?,?,?,?)", (id, name, area[0], area[1]))
        self.conn.commit()

    def event_lookup(self, eventID):
        return self.cursor.execute("SELECT Name FROM StudyArea WHERE ID=?", (eventID,)).fetchone()[0]

    def location_query(self, locationID):
        return self.cursor.execute("SELECT Name, Longitude, Latitude FROM StudyArea WHERE ID=?", (locationID,)).fetchone()

    def get_study_areas(self):
        return self.cursor.execute("SELECT Name FROM StudyArea").fetchall()

    def join_event(self, eventID, username, email):
        username = self.add_user(username)
        current_users = self.cursor.execute("SELECT Users FROM Event WHERE ID=?", (eventID,)).fetchall()[0][0]
        decoder = json.JSONDecoder()
        current_users = decoder.decode(current_users)
        current_users.append(username)
        self.cursor.execute('UPDATE Event SET Users=? WHERE _rowid_=?', (str(current_users), eventID))
        self.conn.commit()

    def close(self):
        self.cursor.close()
        self.conn.close()
