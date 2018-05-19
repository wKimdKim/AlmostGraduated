import sqlite3

class db:

	def __init__(self, path):
		self.conn = sqlite3.connect(path)        
		self.cursor = self.conn.cursor()

	def get_user(self, id):
		data = self.cursor.execute("SELECT Name,CourseList FROM User WHERE ID=?",(id,)).fetchall()[0]
		print('Name is ',str(data[0]))
		print('Courses are',str(data[1]))

	def get_event(self, id):
		pass

	def get_all_events(self):
		pass

db = db('StudyGroups.db')

db.get_user(1)
