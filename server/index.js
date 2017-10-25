const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('../db/db');
require('../db/models/dataModels')
const route = require('../server/router/routes')

const PORT = 3000;

const app = express();

//Socket.io Init
// const server = require('http').Server(app);
// const io = require('socket.io')(server);
// server.listen(3000);

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   // socket.on('new-message', function(msg){
//   //   console.log('message: ', msg);
//   //   io.emit('receive-message', msg);
//   // })

// });

app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api', route)
// app.use(express.static(path.resolve(__dirname, '../client/static')))
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '../client/static', 'index.html'));
// })
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

// server.listen(socketPort, () => {
//   console.log(`Listening on port (socket) ${socketPort}`)
// })