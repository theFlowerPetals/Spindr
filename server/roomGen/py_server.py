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
# app.config['DEBUG'] = True

queue = []
rooms = []

@app.route('/', methods = ['GET', 'POST'])
# Should be getting a get request with "ready" users in body
def enqueue():
  # return "hi"
  if request.method == 'POST':
    req_data = request.get_json()
    name = req_data['name']
    sex = req_data['sex']
    # socialScore = json.loads(req_data['socialScore'])
    # interests = req_data['interests']
    # partnerScore = json.loads(req_data['partnerScore'])
    # partnerCumulativeInterest = req_data['partnerCumulativeInterstNum']
    # weighted = req_data['partnerWeightedInterests']

    # user = [sex, socialScore, interests, partnerScore, weighted]

    # queue.append(user)

    return 'added'
  
  if request.method == 'GET':
    return 'mark chen'
    # return ', '.join(queue[len(queue) - 1])

# @app.route('/giveMeRoom')

def create_rooms():
  global rooms
  # print ('waiting')
  while len(queue) >= 4:
    rooms = room_testing.make_room(queue, 4, rooms)
    # print ('room testing')
    # rooms = rooms_stack
    # print ('queue')
    # print (queue)
    # print ('rooms')
    # print (rooms)
    # print ("got here")

def run_schedule():
  while 1:
    schedule.run_pending()
    time.sleep(1)

# @app.after_request
# def home(resp):
#     resp.headers['Access-Control-Allow-Origin'] = '*'
#     resp.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept"
#     return resp
if __name__ == '__main__':
  schedule.every(15).seconds.do(create_rooms)
  t = Thread(target=run_schedule)
  t.start()
  print ('hi')
<<<<<<< refs/remotes/upstream/master


  API_ENDPOINT = "http://localhost:3000/flask"

  rooms = [1, 2, 3, 4]

  data = {'rooms': rooms}
  requests.post(url = API_ENDPOINT, data = data)
  app.run()
=======
  app.run()
>>>>>>> prep for rebase
