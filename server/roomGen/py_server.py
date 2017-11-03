from flask import Flask, request
import room_testing
import schedule
import time
from threading import Thread
import json
import requests

app = Flask(__name__)

queue = []
rooms = []

@app.route('/', methods = ['GET', 'POST'])
# Should be getting a get request with "ready" users in body
def enqueue():
  if request.method == 'POST':
    req_data = request.get_json()
    userId = req_data['id']
    sex = req_data['sex'][0]
    # socialScore = json.loads(req_data['social_score']) 
    # interests = req_data['interests']
    # partnerScore = json.loads(req_data['match_social_score']) 
    # partnerCumulativeInterest = req_data['match_interests']
    # weighted = req_data['match_weighted_interests'] 
    # user = [userId, sex, socialScore, interests, partnerScore, weighted]

    user = [userId, sex]
    queue.append(user)

    return 'added'
  
  if request.method == 'GET':
    return 'got get'

def create_rooms():
  # global rooms
  print ('queue', queue)
  while len(queue) >= 4:
    room_made = room_testing.make_room(queue, 4, [])

    API_ENDPOINT = "http://13.57.52.97:3000/flask"
    data = {'room': json.dumps(room_made)}
    requests.post(url = API_ENDPOINT, data = data)

def run_schedule():
  while 1:
    schedule.run_pending()
    time.sleep(1)

if __name__ == '__main__':
  schedule.every(5).seconds.do(create_rooms)
  t = Thread(target=run_schedule)
  t.start()
  app.run(host="0.0.0.0")