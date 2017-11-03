'use strict';
const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('../db/db');
const route = require('../server/router/routes')
const app = express();
const fs = require('fs');
const https = require('https');
const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server)
require('../db/models/dataModels')

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

//Listen to flask server sending rooms 
app.post('/flask', (req, res) => {
  const tempRoom = res.req.body;
  const tempRoomParsed = JSON.parse(tempRoom.room)

  // put room instantiation in if (tempRoom.length === #)
  room = new RoomGen(tempRoomParsed);
  io.sockets.emit('roomReady', room)
  console.log ('server room', room)
  // io.sockets.emit('ready', { room, id });
  res.end();
})

io.on('connection', (socket) => {
  console.log('socket connected');
  //if we have a room
    //emit roomMade

  // hope there's no scoping issues
  // const { roomId } = socket.handshake.query || 'default';
  // socket.join(roomId);

  socket.on('inHolding', userId => {
    for (let i = 0; i < room.srms.length; i++) {
      let user = room.srms[i]
      if (user[0] == userId) {
        socket.emit('readyWaiting', room);
        if (user[1] === 'm') {
          let tempRoom = [];
          for (let j = 0; j < room.srms.length / 2; j++) {
            let vidRoomName = user[0] + '-' + j;
            socket.join(vidRoomName);
            console.log('roommade for male user', vidRoomName)
            tempRoom.push(vidRoomName);
          }
          room.vidRooms.push(tempRoom);
        }
      }
    }
    console.log('vidRooms', room.vidRooms)
      // for each female
        // emit a row of vidRooms
  });
});

// eventually ..
  // Put socket events in if (!processing && room)
