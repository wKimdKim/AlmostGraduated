import sqlite3
from datetime import datetime

class db:

	def __init__(self, path):
		self.conn = sqlite3.connect(path)        
		self.cursor = self.conn.cursor()

	def get_user(self, id):
		data = self.cursor.execute("SELECT Name,CourseList FROM User WHERE ID=?",(id,)).fetchall()[0]

	def get_event(self, id):
		pass

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

	def add_event(self,users,study_area):
		try:
			id = self.cursor.execute("SELECT rowid FROM Event ORDER BY rowid DESC").fetchone()[0]+1
		except TypeError:
			id = 0

		self.cursor.execute("INSERT INTO Event VALUES(?,?,?)",(id,users,study_area))
		self.conn.commit()
		



db = db('StudyGroups.db')
data = db.get_all_events()

dates = {}


#print(data[4][3])




for i in new_data:
	print(i)
	print()