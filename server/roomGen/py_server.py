from flask import Flask
from flask import request
from . import room_testing
import schedule
import time
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
app.config['DEBUG'] = True

queue = []

@app.route('/', methods = ['GET', 'POST'])
# Should be getting a get request with "ready" users in body
def enqueue():
  # return "hi"
  if request.method == 'POST':
    req_data = request.get_json()
    name = req_data['name']
    email = req_data['email']
    socialScore = req_data['socialScore']
    interests = req_data['interests']
    partnerScore = req_data['partnerScore']
    partnerCumulativeInterest = req_data['partnerCumulativeInterstNum']
    weighted = req_data['partnerWeightedInterests']

    user = [name, email, socialScore, interests, partnerScore, partnerCumulativeInterest, weighted]

    queue.append(user)

    return 'added'
  
  # if request.method == 'GET':
  #   return ', '.join(queue[1])



@app.route('/giveMeRoom')


if __name__ == '__main__':
    app.run()

print (queue)

if len(queue) >= 6:
  