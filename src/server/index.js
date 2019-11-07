const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const app = express();

app.set("port", process.env.PORT || 3001);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, '../client/build')));
}

const AlbumController = require('./album/AlbumController');
app.use('/api/albummanagement', AlbumController);

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at: ', promise, 'reason: ', reason);
  // Application specific logging, throwing an error, or other logic here
});