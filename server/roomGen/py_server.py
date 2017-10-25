from flask import Flask
from flask import request
from . import room_testing
import schedule
import time
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session,sessionmaker
from zope.sqlalchemy import ZopeTransactionExtension

#make a connection to DB

#create a get call to grab all the ready users

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

@app.route('/', methods = ['GET', 'POST'])
# Should be getting a get request with "ready" users in body
def roomGen():
  return "hi"
  # if request.method == 'POST':
    # req_data = request.get_json()
    # name = req_data['name']
    # socialScore = req_data['socialScore']
    # interests = req_data['interests']
    # weighted = req_data['partnerWeightedInterests']

    # return weighted

    # job()

if __name__ == '__main__':
    app.run()