import sqlite3
from datetime import datetime

class db:

	def __init__(self, path):
		self.conn = sqlite3.connect(path)        
		self.cursor = self.conn.cursor()

	def get_user(self, id):
		data = self.cursor.execute("SELECT Name,CourseList FROM User WHERE ID=?",(id,)).fetchall()[0]

	def get_all_events(self):
		data = self.cursor.execute("SELECT * FROM Event").fetchall()
		data.sort(key=lambda tup: datetime.strptime(tup[3],'%d %b'))
		new_data = [[data[0]]]
		data.pop(0)
		for i in data:
			if i[3] == new_data[len(new_data)-1][0][3]:
				new_data[len(new_data)-1].append(i)
			else:
				new_data.append([i])

		for i in new_data:
			i.sort()

		return new_data

	def add_event(self, name, area, date, Long, Lat):
		try:
			id = self.cursor.execute("SELECT rowid FROM Event ORDER BY rowid DESC").fetchone()[0]+1
		except TypeError:
			id = 0

		location = self.add_StudyArea(name,'No Description Avaliable',Long,Lat)

		self.cursor.execute("INSERT INTO Event VALUES(?,?,?,?,?,?)",(id,name,datetime,datetime,'[0]',location))
		self.conn.commit()

	def add_StudyArea(self, name, description, Long, Lat):
		try:
			id = self.cursor.execute("SELECT rowid FROM StudyArea ORDER BY rowid DESC").fetchone()[0]+1
		except TypeError:
			id = 0

		self.cursor.execute("INSERT INTO StudyArea VALUES(?,?,?,?,?)",(id, name, description, Long, Lat))
		self.conn.commit()
		return id 

	def event_lookup(self, id):
		return self.cursor.execute("SELECT Name FROM StudyArea WHERE ID=?",(id,)).fetchone()[0]
	

	def close(self):
		self.cursor.close()
		self.conn.close() 


# d = db('StudyGroups.db')

# data = d.get_all_events()
# d.close()

# print(data[0][0][3])
# print(data)