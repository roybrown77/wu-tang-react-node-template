const amqp = require('amqp-connection-manager');
const moment = require('moment-timezone');
const mongoose = require('mongoose');
const { dbUsername, dbPassword, queueUrl } = require('./config');

if (!queueUrl || !dbUsername || !dbPassword) {
  console.log('Missing an environment variable');
  process.exit(1);
}

const WORKER_QUEUE = 'worker-queue';

// Create a new connection manager from AMQP
console.log('[AMQP] - Connecting....');
const connection = amqp.connect([queueUrl]);

connection.on('connect', function() {
  return console.log('[AMQP] - Connected!');
});

connection.on('disconnect', function(params) {
  return console.error('[AMQP] - Disconnected.', params.err.stack);
});

// ---------- To receive the execution task messages
let channelWrapper = connection.createChannel({
  json: true,
  setup: function(channel) {
    return Promise.all([
      channel.assertQueue(WORKER_QUEUE, { autoDelete: false, durable: true }),
      channel.prefetch(1),
      channel.consume(WORKER_QUEUE, onMessage)
    ]);
  }
});

channelWrapper.waitForConnect()
.then(function() {
  console.log('[AMQP] - Listening for messages on queue => '+WORKER_QUEUE);
})
.catch(function(err) {
  console.error('[AMQP] - Error! ', err);
}); 

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true, // use new connection string parser
  autoIndex: false, // Don't build indexes
  reconnectTries: 100, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  bufferMaxEntries: 0 // If not connected, return errors immediately rather than waiting for reconnect
};

mongoose.connection.on("connected", function(ref) {
  console.log("Connected to DB!", ref);
});

// If the connection throws an error
mongoose.connection.on("error", function(err) {
  console.error('Failed to connect to DB on startup: ', err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection to DB disconnected.');
});

const gracefulExitSIGINT = () => {
  console.info(`SIGINT signal received.`);

  connection.close(function () {
    console.log('AMQP is disconnected through app termination.');
  });

  mongoose.connection.close(function () {
    console.log('Mongoose default connection with DB is disconnected through app termination.');
  });
};

const gracefulExitSIGTERM = () => {
  console.info(`SIGTERM signal received.`);
  
  connection.close(function () {
    console.log('AMQP is disconnected through app termination.');
  });

  mongoose.connection.close(function () {
    console.log('Mongoose default connection with DB is disconnected through app termination.');
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
  console.error(`Process uncaughtException error: ${JSON.stringify(warning)}`);
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

try {
  console.log('[MONGODB] - Connecting...');
  mongoose.connect(`mongodb://${dbUsername}:${dbPassword}@ds129183.mlab.com:29183/wu-tang`,options);
} catch (err) {
  console.log("Server initialization failed: " , err.message);
}

// Process message from AMQP
function onMessage(data) {
  let message;
  try {
    message = JSON.parse(data.content.toString());
  } catch(e) {
    console.error('[AMQP] - Error parsing message... ', data);
  }

  console.log('[AMQP] - Message incoming... ', message);
  channelWrapper.ack(data);
  if (!message) {
    return;
  }

  switch (message.taskName) {
    case 'getAlbumCovers': 
      break;
    default:
      console.error('No task was found with name => '+message.taskName)
  }
}