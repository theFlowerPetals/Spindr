var express = require('express');
var http = require('http');
var parser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var db = require('../db/db');
require('../db/models/dataModels')
var videoSocket = require('socket.io');
// require('../fakeData/generateData');
var route = require('../server/router/routes')

var PORT = 3000;

var app = express();

//Socket.io Init
var videoServer = http.createServer(app);
var videoWebsocket = videoSocket(videoServer);

app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api', route)
// app.use(express.static(path.resolve(__dirname, '../client/static')))
// app.get('/*', function (req, res) {
  //   res.sendFile(path.join(__dirname, '../client/static', 'index.html'));
  // })
  
  //Listen to flask server sending rooms 
  app.post('/flask', function(req, res){
    console.log('FLASK DATA: ', res.req.body);
    res.status(200).send('Rooms received');
  })
  
  videoServer.listen(PORT, function(){
    console.log('Listening on port ', PORT);
  })

  var roomList = {};
  
  var socketIdsInRoom = function(name){
    var socketIds = videoWebsocket.nsps['/'].adapter.rooms[name];
    if (socketIds) {
      var collection = [];
      for (var key in socketIds) {
        collection.push(key);
      }
      return collection;
    } else {
      return [];
    }
  }
  
  videoWebsocket.on('connection', function(socket){
    console.log('socket connected');
  
    socket.on('disconnect', () => {
      console.log('disconnected');
      if (socket.room) {
        var room = socket.room;
        videoWebsocket.to(room).emit('leave', socket.id);
        socket.leave(room);
      }
    });
  
    socket.on('join', function(name, callback){
      console.log('join ', name);
      var socketIds = socketIdsInRoom(name);
      callback(socketIds);
      socket.join(name);
      socket.room = name;
    });
  
    socket.on('exchange', function(data){
      console.log('exchange: ', data);
      data.from = socket.id;
      var to = videoWebsocket.sockets.connected[data.to];
      // to.emit('exchange', data);
      socket.to(socket.id).emit(data)
    });
  
  });