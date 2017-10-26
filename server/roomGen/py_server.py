from flask import Flask, request
import room_testing
import schedule
import time
from threading import Thread
import json
import requests
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import scoped_session,sessionmaker
# from zope.sqlalchemy import ZopeTransactionExtension

# #make a connection to DB

# #create a get call to grab all the ready users

#
# DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))

# z  = DBSession.query(Book).filter_by(author_id=1)

# def job():
#     print("I'm working...")

# schedule.every(10).seconds.do(job)

# while True:
#   schedule.run_pending()
#   time.sleep(1)



app = Flask(__name__)

queue = []
rooms = []

@app.route('/', methods = ['GET', 'POST'])
def enqueue():
  if request.method == 'POST':
    req_data = request.get_json()
    userId = req_data['id']
    sex = req_data['sex'][0]
    socialScore = json.loads(req_data['social_score']) 
    interests = req_data['interests']
    partnerScore = json.loads(req_data['match_social_score']) 
    partnerCumulativeInterest = req_data['match_interests']
    weighted = req_data['match_weighted_interests'] 
    user = [userId, sex, socialScore, interests, partnerScore, weighted]

    queue.append(user)

    return 'added'
  
  if request.method == 'GET':
    return 'got get'

def create_rooms():
  while len(queue) >= 4:
    room_made = room_testing.make_room(queue, 4, [])
    room_formatted = []
    for i in range(len(room_made)):
      temp = []
      temp.append(room_made[i][0])
      temp.append(room_made[i][1])
      room_formatted.append(temp)
    API_ENDPOINT = "http://13.57.52.97:3000/flask"
    data = {'room': json.dumps(room_formatted)}
    requests.post(url = API_ENDPOINT, data = data)

def run_schedule():
  while 1:
    schedule.run_pending()
    time.sleep(1)

if __name__ == '__main__':
  schedule.every(4).seconds.do(create_rooms)
  t = Thread(target=run_schedule)
  t.start()
  app.run(host="0.0.0.0")