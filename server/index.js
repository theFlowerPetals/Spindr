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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

// server.listen(socketPort, () => {
//   console.log(`Listening on port (socket) ${socketPort}`)
// })
webSocket.on('connection', (socket) => {
  console.log('Connected:', socket.id)
})
