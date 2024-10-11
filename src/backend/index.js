// Import dependencies
const { nodeEnv, httpPort } = require('../../config');
const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const albumEndpoint = require('./album/AlbumController');

// Initialize the Express application
const app = express();
app.set('port', httpPort || 3001);

// Configure CORS options
const corsOptions = {
  origin: [
    'https://wu-tang-react-node-template.herokuapp.com',
    'http://localhost:5173',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allows cookies and credentials to be sent
};

// Middleware setup
app.use(cors(corsOptions)); // Enable all CORS requests
app.use('/api/albummanagement', albumEndpoint);

// Serve static assets in production
if (nodeEnv === 'production') {
  setupProductionAssets(app);
}

// Start the server
const server = app.listen(app.get('port'), () => {
  console.log(`[WEB_SERVER] - http://localhost:${app.get('port')}/`);
});

// Graceful shutdown handlers
setupGracefulShutdownHandlers(server);

// Error handling
setupErrorHandlers();

/**
 * Function to set up production assets serving
 * @param {object} app - The Express application instance
 */
function setupProductionAssets(app) {
  app.use(compression()); // Enable compression for faster asset delivery
  app.use(express.static(path.resolve(__dirname, '../frontend/build')));

  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

/**
 * Function to set up graceful shutdown handlers for the server
 * @param {object} server - The server instance to gracefully shut down
 */
function setupGracefulShutdownHandlers(server) {
  const gracefulExit = (signal) => {
    console.info(`${signal} signal received.`);
    server.close(() => {
      console.log(`[WEB_SERVER] - closed through app termination ${signal}.`);
    });
  };

  process.on('SIGINT', () => gracefulExit('SIGINT'));
  process.on('SIGTERM', () => gracefulExit('SIGTERM'));
}

/**
 * Function to set up error and process event handlers
 */
function setupErrorHandlers() {
  process.on('unhandledRejection', (reason, promise) => {
    console.error(`Unhandled Rejection: reason: ${reason}, promise: ${promise}`);
  });

  process.on('uncaughtException', (err) => {
    console.error(`Uncaught Exception: ${JSON.stringify(err)}`);
  });

  process.on('multipleResolves', (type, promise, reason) => {
    console.error(`Multiple Resolves: type: ${type}, promise: ${promise}, reason: ${reason}`);
  });

  process.on('beforeExit', (code) => {
    console.log(`Process beforeExit code: ${code}`);
  });

  process.on('exit', (code) => {
    console.log(`Process exit code: ${code}`);
  });

  process.on('disconnect', () => {
    console.log(`Process disconnect.`);
  });

  process.on('warning', (warning) => {
    console.warn(`Process warning: ${JSON.stringify(warning)}`);
  });
}
