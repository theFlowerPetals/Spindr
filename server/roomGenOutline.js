 // snapshot one
  const queue = [ /*this is where we store all the users who are ready at certain point in time*/ ];
  // create approx. queue/8 of rooms
  roomA = [];
  roomB = [];
  // ... more rooms
  
  /*
  randomly pick approx. queue/8 users one by one

   remove them from the queue

   put each of them in the rooms created

   for one user:
   use the user's graph (graph is generated for each user. Use K-means clustering with k = 4).
   figure out in what cluster his preferred partner lies in
   randomly select a person in that cluster.
   remove this user from the queue, and add to room.

   repeat this process until the room is full.


   graph:
   horizontal axis (social score) - how close other users' answers are to your answers
   vertical axis (interest score) - how much other users' interests match your interests


   how to create a graph per user:
   for every user, 
     data points - go through every user in the queue and get the following data points:
     social similarity score: (max social score - |your score - other user's score|) / max social score (ex. (16 - |7 - 10|) / 16)
     interest similarity score: user's weighted partner interests (ex. [0.2a, 0.3c, 0.15g, 0.1t ...] or maybe {a:0.2, c:0.3, g:0.15, t:0.1 ...}) "divdided" by 
     all the user's interests (ex. [d, f, g, k, t ...])

  */