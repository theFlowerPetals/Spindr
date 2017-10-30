const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('../db/db');
require('../db/models/dataModels')
// require('../fakeData/generateData');
const route = require('../server/router/routes')

const PORT = 3000;
const serverPort = 3456;

const app = express();

//Socket.io Init
const server = require('http').Server(app);
const io = require('socket.io')(server);


const roomList = {};

server.listen(serverPort, () => {
  console.log(`Listening on server port ${serverPort}`)
});

const socketIdsInRoom = (name) => {
  const socketIds = io.nsps['/'].adapter.rooms[name];
  if (socketIds) {
    let collection = [];
    for (let key in socketIds) {
      collection.push(key);
    }
    return collection;
  } else {
    return [];
  }
}

io.on('connection', (socket) => {
  console.log('socket connected');

  socket.on('disconnect', () => {
    console.log('disconnected');
    if (socket.room) {
      let room = socket.room;
      io.to(room).emit('leave', socket.id);
      socket.leave(room);
    }
  });

  socket.on('join', (name, callback) => {
    console.log('join ', name);
    let socketIds = socketIdsInRoom(name);
    callback(socketIds);
    socket.join(name);
    socket.room = name;
  });


  socket.on('exchange', (data) => {
    console.log('exchange: ', data);
    data.from = socket.id;
    let to = io.sockets.connected[data.to];
    to.emit('exchange', data);
  });

});

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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})