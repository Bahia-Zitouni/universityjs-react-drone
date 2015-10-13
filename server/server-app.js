const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

import drone from './drone';
// import arDrone from 'ar-drone';
// const client = arDrone.createClient();
// client.config('general:navdata_demo', 'FALSE');

// var pngStream = client.getPngStream();
// console.log('pngStream', pngStream)


server.listen(3005);

app.get('/', (req, res) => {
  res.json({ status: 'listening' });
});

io.on('connection', (socket) => {

  socket.emit('news', { hello: 'world' });

  socket.on('takeoff', () => {
    console.log('takeoff');

    drone.takeoff()
      .then(function() {
        console.log('did take off!');
        socket.emit('didTakeoff');
      });

  });

  socket.on('land', () => {

    drone.land()
      .then(function() {
        console.log('did land!');
      });

  });

  socket.on('move', (direction) => {

    drone.move({ direction })
      .then(function() {
        console.log('done moving', direction);
      });

  });

  socket.on('turn', (direction) => {
    console.log('turn', direction);

    drone.turn({ direction })
      .then(function() {
        console.log('done rotating', direction);
      })

    // if (dir === 'right') {
    //   client.clockwise(0.5);
    // } else {
    //   client.counterClockwise(0.5);
    // }
    //
    // didAction();


  });

  socket.on('up', () => {
    drone.up()
      .then(function() {
        console.log('moved up');
      })
    // client.up(0.5);
    // didAction();
  });

  socket.on('down', () => {
    drone.down()
      .then(function() {
        console.log('moved down');
      })
  });

  socket.on('emergency', () => {
    drone.emergency()
      .then(function() {
        console.log('emergency');
      })
  });


});
