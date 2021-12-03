/**
 * Basic Includes
 */
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

/**
 * Start Node Server
 */
const publicPath = path.join(__dirname, '/../../public');
const port = process.env.PORT || 3434;
let app = express();
let server = http.createServer(app);
let io = socketIO(server, {
  cors: {
    origins: ["http://localhost:8080"],
    methods: ["GET", "POST"]
  }
});
app.use(express.static(publicPath));

/**
 * Server started
 */
server.listen(port, ()=> {
  console.log(`Server is up on port ${port}.`)
});

/**
 * WebSocket Listener
 */
io.on('connection', (socket) => {
  socket.on('error', function () {});

  console.log('A user just connected.');
  socket.on('disconnect', () => {
    console.log('A user has disconnected.');
  });

  /**
   * Send Chat Message to Group Chat
   */
  socket.on('startFingerPrint', () => {
    console.log('start fingerprint sensor');

    //socket.emit('fingerPrintError', {message: 'Sensor not found'});

    setTimeout(() => {
      socket.emit('fingerPrintSuccess', {fingerId: '3aa1b01149abf0a7ad0d7803eaba65c22ba084009700c3c7f5f4ecc38f0208'});
    }, 5000);
  });
});