'use strict';
const express = require('express');
const http = require('http');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('../db/db');
const app = express();
const fs = require('fs');
const https = require('https');
const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server)
require('../db/models/dataModels')
// require('../fakeData/generateData');
const route = require('../server/router/routes');
const socketio = require('socket.io');
// const chatCtrl = require('./controllers/chatCtrl');

const PORT = 3000;

class RoomGen {
  constructor (srms) {
    this.srms = srms
    this.vidRooms = [];
    this.userIds = [];
  }
  receiveUserId(userId) {
    this.userIds.push(userId);
  }
  isPopulated() {
    return this.userIds.length === this.srms.length
  }
} 

server.listen(PORT, () => {
  console.log(`Listening on server port ${PORT}`)
});

// setting global room variable
let room;

app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api', route)
app.use(express.static(path.resolve(__dirname, '../client/static')))

app.post('/flask', (req, res) => {
  const tempRoom = res.req.body;
  const tempRoomParsed = JSON.parse(tempRoom.room)
  room = new RoomGen(tempRoomParsed);
  io.sockets.emit('roomReady', room)
  res.end();
})

io.on('connection', (socket) => {
  socket.on('inHolding', userId => {
    for (let i = 0; i < room.srms.length; i++) {
      let user = room.srms[i]
      if (user[0] == userId) {
        socket.emit('readyWaiting', room);
        var grid = [];
        for (let k = 0; k < room.srms.length / 2; k++) {
          socket.join(user[0] + '-' + k);
          let roomRow = [];
          for (let j = 0; j < room.srms.length; j += 2) {
            let vidRoomName = room.srms[j][0] + '-' + k;
            roomRow.push(vidRoomName);
          }
          grid.push(roomRow);
        }
      }
    }
    
    const makeUniqueRooms = (matrix) => {
      const unique = [];
      for (let c = 0; c < matrix.length; c++) {
        const tempRow = [];
        for (let r = 0; r < matrix.length; r++) {
          let col = c + r < matrix.length ? c + r : c + r - matrix.length;
          tempRow.push(matrix[r][col]);
        }
        unique.push(tempRow);
      }
      return unique;
    }
    
    let unique = makeUniqueRooms(grid);
    for (let l = 1; l < room.srms.length; l += 2) {
      if (room.srms[l][0] == userId) {
        io.to(socket.id).emit('vidReady', unique[Math.floor(l / 2)])
      }
    }
  });
});
// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`)
// })

// server.listen(socketPort, () => {
//   console.log(`Listening on port (socket) ${socketPort}`)
// })

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
//   });


const clients = {};
const users = {};

let chatId = 1;

websocket.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);
  socket.on('message', (message) => {
    console.log('Msg received:', message.text);
    socket.emit('message', message.text);
  });
});
