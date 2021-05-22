/*
  Get environment variables
*/

const { nodeEnv, httpPort } = require('../../config');

/*
  Setup web server
*/

const express = require('express');
const app = express();

app.set("port", httpPort || 3001);

const path = require('path');

if (nodeEnv === "production") {
    app.use(express.static(path.resolve(__dirname, '../client/build')));
}

/*
  Setup api end points
*/

app.use('/api/albummanagement', require('./album/AlbumController'));

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const server = app.listen(app.get("port"), () => {
    console.log(`[WEB_SERVER] - http://localhost:${app.get("port")}/`);
});

/*
  Handle web server events gracefully
*/

const gracefulExitSIGINT = () => {
  console.info(`SIGINT signal received.`);
  
  server.close(() => {
    console.log('[WEB_SERVER] - closed through app termination SIGINT.');
  });
};

const gracefulExitSIGTERM = () => {
  console.info(`SIGTERM signal received.`);
  
  server.close(() => {
    console.log('[WEB_SERVER] - closed through app termination SIGTERM.');
  });
};

process.on('SIGINT', gracefulExitSIGINT).on('SIGTERM', gracefulExitSIGTERM);

process.on('unhandledRejection', (reason, promise) => {
  console.error(`Process unhandledRejection reason: ${reason}, promise: ${promise}`);
});

process.on('uncaughtException', function(err) {
  console.error(`Process uncaughtException error: ${JSON.stringify(err)}`);
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