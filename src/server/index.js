const { dbUsername, dbPassword, dbName, nodeEnv, httpPort } = require('../../config');

if (!dbUsername || !dbPassword || !dbName) {
  console.log('Missing an environment variable');
  process.exit(1);
}

const express = require('express');
const path = require('path');

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

const server = app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

const gracefulExitSIGINT = () => {
  console.info(`SIGINT signal received.`);
  
  server.close(() => {
    console.log('Http server closed.');
  });
};

const gracefulExitSIGTERM = () => {
  console.info(`SIGTERM signal received.`);
  
  server.close(() => {
    console.log('Http server closed.');
  });
};

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExitSIGINT).on('SIGTERM', gracefulExitSIGTERM);

process.on('unhandledRejection', (reason, promise) => {
  console.error(`Process unhandledRejection reason: ${reason}, promise: ${promise}`);
  // Application specific logging, throwing an error, or other logic here
});

process.on('uncaughtException', function(err) {
  //log the error
  console.error(`Process uncaughtException error: ${JSON.stringify(err)}`);
  //let's tell our master we need to be disconnected
  //require('forky').disconnect();
  //in a worker process, this will signal the master that something is wrong
  //the master will immediately spawn a new worker
  //and the master will disconnect our server, allowing all existing traffic to end naturally
  //but not allowing this process to accept any new traffic
});

process.on('multipleResolves', (type, promise, reason) => {
  console.error(`Process multipleResolves type: ${type}, promise: ${promise}, reason: ${reason}`);
});

process.on('beforeExit', (code) => {
  console.log(`Process beforeExit code: ${code}`);
});

process.on('exit', (code) => {
  console.log(`Process exit code: ${code}`);
});

process.on('disconnect', (code) => {
  console.log(`Process disconnect code: ${code}`);
});

process.on('warning', (warning) => {
  console.warn(`Process warning: ${JSON.stringify(warning)}`);
});