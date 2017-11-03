const express = require('express');
const http = require('http');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('../db/db');
require('../db/models/dataModels');
// require('../fakeData/generateData');
const route = require('../server/router/routes');
const socketio = require('socket.io');

const PORT = 3000;

const app = express();
const server = http.Server(app);
const websocket = socketio(server);

app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api', route)
// app.use(express.static(path.resolve(__dirname, '../client/static')))
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '../client/static', 'index.html'));
// })

//Listen to flask server sending rooms 
app.post('/flask', (req, res) => {
  console.log('FLASK DATA: ', res.req.body);
  res.status(200).send('Rooms received');
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

const rooms = new Set();

websocket.on('connection', (socket) => {
  console.log('A client just joined on:', socket.id);
  socket.on('joinRoom', (id1, id2) => {
    // Get sum of IDs
    let sumOfIDs = id1 + id2;
    // Push sum to rooms
    rooms.add(sumOfIDs);
    console.log('BACKEND ROOMS:', rooms);
    // Before sending client to a room
      // Check if sum is in room
    if(rooms.has(sumOfIDs)) {
      socket.emit('roomExists', true);
    }
    
    socket.join(sumOfIDs);
 
    console.log('JOINED ROOM:', sumOfIDs);
  })
  socket.on('message', (message, room) => {
    console.log('Msg received:', message.text, '... To room:', room);
    socket.to(room).emit('message', [message.text]);
  });
});
