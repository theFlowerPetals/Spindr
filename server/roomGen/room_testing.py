import numpy as np
import random
from sklearn.cluster import KMeans

# userA = ['m', 10, ['a', 'c', 'e', 'g', 't','m'], 5, {'a':0.3, 'b':0.15, 'c':0.05, 'e':0.2, 't':0.1, 'n':0.09, 'p':0.07, 'x':0.04}]
# userX = ['f', 5, ['a', 'b', 'c', 'i', 'l', 'o', 'q', 'r', 'w'], 7, {'a':0.1, 'b':0.15, 'e':0.05, 'h':0.12, 'j':0.15, 'l':0.05, 'q':0.08, 'r':0.1, 'w':1.2, 'x':0.08}]
# queue = [userA, userB, userC, userD, userE, userF, userG, userH, userI, userJ, userK, userL, userM, userN, userO, userP, userQ, userR, userS, userT, userU, userV, userW, userX]
# rooms = []

def make_room(queue, room_size, rooms):
  random_queue_idx = random.choice(range(len(queue)))
  room = []
  room.append(queue[random_queue_idx])
  del queue[random_queue_idx]

  room_made = (add_person(queue, room, room_size, room[len(room) - 1]))
  print ('room made')
  print (room_made)

  return room_made

#for one person:
def add_person(queue, room, room_size, user):
  if len(room) == room_size:
    return room
  else:
    sex = user[1]
    potentials = []   #all the potentials in the graph
    potentials_idx = []

    for queue_i in range(len(queue)):
      other_user = queue[queue_i]
      if other_user[1] != sex[0]:
        potentials_idx.append(queue_i)
        potential = []   #individual person
       
        #x coord:
        potential.insert(0, (16 - abs(other_user[4] - user[2])) / 16)
        #y coord:
        interest_score = 0
        for interest in other_user[3]:
          if interest in user[5]:
            interest_score += user[5][interest]
        potential.insert(1, interest_score)

        #put potential into potentials
        potentials.append(potential)
      
    if len(potentials) > 0:
      X = np.array(potentials)

      if len(potentials) >= 4:
        cluster_num = 4
      else:
        cluster_num = len(potentials)

      clf = KMeans(n_clusters=cluster_num)
      clf.fit(X)
      centroids = clf.cluster_centers_
      labels = clf.labels_

      # find the index of the centroid with the highest x*y value
      best_centroid_val = centroids[0][0] * centroids[0][1]
      best_centroid_idx = 0
      for j in range(1, len(centroids)):
        if centroids[j][0] * centroids[j][1] > best_centroid_val:
          best_centroid_val = centroids[j][0] * centroids[j][1]
          best_centroid_idx = j

      # in the queue, randomly pick a user from users that have the index as their labels
      idx_of_users_in_cluster = []
      for n in range(len(labels)):
        if labels[n] == best_centroid_idx:
          idx_of_users_in_cluster.append(n)

      random_idx = random.choice(idx_of_users_in_cluster)
      next_user_idx = potentials_idx[random_idx]

      # add the user to the room
      room.append(queue[next_user_idx])

      # remove the user from the queue
      del queue[next_user_idx]

      # repeat the process of adding users
      return add_person(queue, room, room_size, room[len(room) - 1])
    
    else:
      print ('no potential match exists')