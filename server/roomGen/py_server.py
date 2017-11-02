from flask import Flask, request
import room_testing
import schedule
import time
from threading import Thread
import json
import requests



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
    # print ('req_data', req_data)
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

# @app.route('/giveMeRoom')

def create_rooms():
  # global rooms
  print ('queue', queue)
  while len(queue) >= 4:
    room_made = room_testing.make_room(queue, 4, [])
    # print ('queue', queue)
    # print ('room made here %s' %room_made)
    API_ENDPOINT = "http://13.57.52.97:3000/flask"

    # rooms = [1, 2, 3, 4]
    data = {'room': json.dumps(room_made)}
    print ('json data', data)
    requests.post(url = API_ENDPOINT, data = data)
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

if __name__ == '__main__':
  schedule.every(5).seconds.do(create_rooms)
  t = Thread(target=run_schedule)
  t.start()
  print ('hi')

  
  app.run()