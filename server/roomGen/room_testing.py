# import matplotlib.pyplot as plt
# from matplotlib import style
# style.use('ggplot')
import numpy as np
import random
from sklearn.cluster import KMeans

# userA = ['m', 10, ['a', 'c', 'e', 'g', 't','m'], 5, {'a':0.3, 'b':0.15, 'c':0.05, 'e':0.2, 't':0.1, 'n':0.09, 'p':0.07, 'x':0.04}]
# userC = ['m', 5, ['a', 'b', 'f', 'i', 'j', 'l', 'n', 'p', 't'], 8, {'b':0.1, 'd':0.14, 'f':0.08, 'h':0.15, 'k':0.26, 'n':0.07, 'r':0.2}]
# userE = ['m', 2, ['b', 'g', 's', 'l', 'r', 'u', 'w'], 8.2, {'d':0.08, 'h':0.12, 'k':0.07, 'n':0.04, 'u':0.09, 'w':0.22, 'x':0.18, 'y':0.14, 'z':0.06}]
# userG = ['m', 7, ['l','m', 'o', 's', 't', 'x', 'z'], 10, {'b':0.08, 'c':0.04, 'f':0.08, 'j':0.11, 'l':0.05, 'm':0.04, 'o':0.24, 'p':0.11, 's':0.05, 'u':0.1, 'v':0.1}]
# userI = ['m', 9, ['b', 'd', 'f', 'j', 's', 'y'], 6.1, {'a':0.2, 'c':0.25, 'n':0.07, 'r':0.18, 's':0.15, 'q':0.04, 'w':0.11}]
# userK = ['m', 8, ['c', 'e', 'g', 'h', 'i', 'o', 'u'], 7, {'d':0.1, 'e':0.15, 'g':0.05, 'm':0.2, 'r':0.1, 's':0.29, 't':0.07, 'z':0.04}]
# userM = ['m', 6, ['d', 'f', 'i', 'k', 'l', 'm', 'p', 'q'], 4.5, {'b':0.05, 'f':0.15, 'h':0.1, 'i':0.1, 'k':0.1, 'o':0.26, 'u':0.17, 'v':0.07}]
# userO = ['m', 12, ['a', 'e', 'i', 'j', 's', 'o', 'x'], 4, {'a':0.04, 'f':0.05, 'i':0.22, 'k':0.14, 'o':0.29, 'p':0.17, 'q':0.09}]
# userQ = ['m', 5, ['c', 'h', 'i', 'k', 'l', 'n', 'p', 'v'], 11.3, {'b':0.1, 'c':0.1, 'e':0.1, 'g':0.17, 'h':0.2, 'l':0.1, 'n':0.07, 'q':0.16}]
# userS = ['m', 6, ['a', 'b', 'c', 'e', 'f', 'j', 'k', 'm', 'r', 's'], 6.2, {'a':0.05, 'f':0.12, 'h':0.13, 'i':0.14, 'k':0.1, 'o':0.22, 'u':0.17, 'v':0.07}]
# userT = ['m', 13, ['d', 'f', 'h', 'j', 'n', 'q', 'r', 'u', 'v', 'z'], 14, {'a':0.05, 'd':0.12, 'j':0.13, 'n':0.14, 'q':0.1, 'u':0.12, 'v':0.1, 'x':0.17, 'z':0.07}]
# userU = ['m', 7, ['b', 'c', 'f', 'k', 'l', 'm', 'o', 'r', 's', 'y'], 13, {'b':0.08, 'c':0.09, 'k':0.10, 'p':0.17, 'q':0.16, 'r':0.12, 't':0.1, 'v':0.11, 'y':0.07}]

# userB = ['f', 14, ['d', 'f', 'g', 'h', 'k', 'l', 'o', 'p', 'r'], 6, {'a':0.1, 'd':0.35, 'e':0.05, 'g':0.12, 'h':0.08, 'k':0.1, 'r':1.2, 'y':0.08}]
# userD = ['f', 7, ['h', 'k','m', 'o', 's', 't', 'v', 'x', 'z'], 10, {'c':0.08, 'd':0.3, 'h':0.14, 'l':0.05, 'n':0.12, 'o':0.05, 's':0.18, 'x':0.08}]
# userF = ['f', 12, ['j', 'l', 'n', 'r', 'y', 'z'], 4, {'a':0.1, 'd':0.35, 'e':0.05, 'g':0.12, 'h':0.08, 'k':0.1, 'r':1.2, 'y':0.08}]
# userH = ['f', 3, ['a', 'c', 'j','m', 'o', 'u', 'v', 'x'], 8, {'b':0.04, 'f':0.05, 'g':0.11, 'm':0.2, 'n':0.1, 'p':0.15, 'q':0.05, 't':0.15, 'v':0.15}]
# userJ = ['f', 13, ['c', 'd', 'j', 'k', 'l','m', 's', 't'], 11, {'b':0.15, 'c':0.3, 'f':0.05, 'h':0.12, 'i':0.08, 'j':0.1, 'o':0.1, 'p':0.1}]
# userL = ['f', 10, ['c', 'f', 'h', 'i', 'j', 'p', 'u', 'w'], 5, {'a':0.1, 'd':0.2, 'h':0.05, 'i':0.12, 'r':0.23, 't':0.13, 'w':0.12, 'z':0.05}]
# userN = ['f', 4, ['b', 'g', 'k', 'm', 'o', 's', 'v'], 5, {'e':0.08, 'i':0.15, 'j':0.05, 'k':0.14, 'l':0.20, 'o':0.16, 's':0.05, 'u':0.12, 'y':0.05}]
# userP = ['f', 6, ['c', 'e', 'g', 'h', 'i', 'o', 'u'], 3, {'a':0.08, 'b':0.10, 'e':0.05, 'k':0.2, 'n':0.12, 'q':0.20, 'r':0.12, 'u':0.08, 'w':0.05}]
# userR = ['f', 8, ['e', 'f', 'h', 'l', 'n', 'p', 'q'], 4.5, {'a':0.1, 'e':0.2, 'f':0.05, 'n':0.12, 's':0.23, 'v':0.13, 'y':0.17}]
# userV = ['f', 10, ['a', 'b', 'f', 'g', 'k', 'l', 'm', 'n', 'p'], 3, {'a':0.1, 'c':0.15, 'f':0.05, 'g':0.12, 'j':0.15, 'k':0.05, 'n':0.08, 'o':0.1, 's':1.2, 't':0.08}]
# userW = ['f', 4, ['b', 'd', 'h', 'k', 'l', 'm', 'n', 'q', 'r'], 14, {'c':0.1, 'd':0.15, 'g':0.05, 'i':0.08, 'k':0.2, 'm':0.04, 'n':0.08, 'p':0.1, 'q':1.2, 'y':0.08}]
# userX = ['f', 5, ['a', 'b', 'c', 'i', 'l', 'o', 'q', 'r', 'w'], 7, {'a':0.1, 'b':0.15, 'e':0.05, 'h':0.12, 'j':0.15, 'l':0.05, 'q':0.08, 'r':0.1, 'w':1.2, 'x':0.08}]


# queue = [userA, userB, userC, userD, userE, userF, userG, userH, userI, userJ, userK, userL, userM, userN, userO, userP, userQ, userR, userS, userT, userU, userV, userW, userX]
# rooms = []

def make_room(queue, room_size, rooms):
  random_queue_idx = random.choice(range(len(queue)))
  room = []   # do we need to persist the room for anything?
  room.append(queue[random_queue_idx])
  del queue[random_queue_idx]

  room_made = (add_person(queue, room, room_size, room[len(room) - 1]))
  print ('room made')
  print (room_made)
  # rooms.append(room_made)

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

      #define num of clusters here later
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

      # print (best_centroid_val, best_centroid_idx)

      # colors = ['g.', 'r.', 'c.', 'b.']

      # print (labels)

      # for centroid in centroids:
      #   #print (centroid)
      # for k in range (len(X)):
      #   plt.plot(X[k][0], X[k][1], colors[labels[k]], markersize = 10)
      # plt.scatter(centroids[:,0], centroids[:,1], marker='x', s=50, linewidths = 5)
      # plt.ylim([0,1])
      # plt.xlim([0,1])
      # plt.show()

      # in the queue, randomly pick a user from users that have the index as their labels
      idx_of_users_in_cluster = []
      for n in range(len(labels)):
        if labels[n] == best_centroid_idx:
          idx_of_users_in_cluster.append(n)

      # print (idx_of_user_in_cluster)
      random_idx = random.choice(idx_of_users_in_cluster)
      next_user_idx = potentials_idx[random_idx]

      # print (queue[next_user_idx])

      # add the user to the room
      room.append(queue[next_user_idx])

      # remove the user from the queue
      del queue[next_user_idx]

      # repeat the process of adding users
      return add_person(queue, room, room_size, room[len(room) - 1])
    
    else:
      print ('no potential match exists')
# print (potentials)
# print (potentials_idx)

# while len(queue) >= 6:
#   make_room(queue, 6)
# print (rooms)