const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const { dbUsername, dbPassword, nodeEnv, httpPort } = require('../../config');

if (!dbUsername || !dbPassword) {
  console.log('Missing an environment variable');
  process.exit(1);
}

const app = express();

app.set("port", httpPort || 3001);

if (nodeEnv === "production") {
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