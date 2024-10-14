// Import dependencies
const { nodeEnv, httpPort } = require('../../config');
const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const albumEndpoint = require('./album/AlbumController');

// Validate environment variables
validateEnvironmentVariables();

// Initialize the Express application
const app = initializeExpressApp();

// Register API routes
registerApiRoutes(app);

// Serve static assets in production
if (nodeEnv === 'production') {
  serveStaticAssets(app);
}

// Start the web server
const server = startWebServer(app);

// Handle graceful shutdown
setupGracefulShutdownHandlers(server);

// Error and process event handling
setupErrorHandlers();

/**
 * Function to validate required environment variables
 */
function validateEnvironmentVariables() {
  if (!httpPort) {
    console.log('[ENV_VARIABLE] - Missing httpPort configuration');
    process.exit(1);
  }
}

/**
 * Function to initialize the Express application
 * @returns {object} app - The Express application instance
 */
function initializeExpressApp() {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.set('port', httpPort || 3001);

  const corsOptions = {
    origin: [
      'https://wu-tang-react-node-template.herokuapp.com',
      'http://localhost:5173',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  
  app.use(cors(corsOptions)); // Enable CORS requests
  return app;
}

/**
 * Function to register API routes with the Express application
 * @param {object} app - The Express application instance
 */
function registerApiRoutes(app) {
  app.use('/api/albummanagement', albumEndpoint);
}

/**
 * Function to serve static assets in production
 * @param {object} app - The Express application instance
 */
function serveStaticAssets(app) {
  app.use(compression()); // Enable compression for faster asset delivery
  app.use(express.static(path.resolve(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

/**
 * Function to start the web server
 * @param {object} app - The Express application instance
 * @returns {object} server - The server instance
 */
function startWebServer(app) {
  const port = app.get('port');
  return app.listen(port, () => {
    console.log(`[WEB_SERVER] - http://localhost:${port}/`);
  });
}

/**
 * Function to setup graceful shutdown handlers for the server
 * @param {object} server - The server instance
 */
function setupGracefulShutdownHandlers(server) {
  const gracefulExit = (signal) => {
    console.info(`${signal} signal received. Closing server...`);
    server.close(() => {
      console.log(`[WEB_SERVER] - Server closed due to ${signal}.`);
    });
  };

  process.on('SIGINT', () => gracefulExit('SIGINT'));
  process.on('SIGTERM', () => gracefulExit('SIGTERM'));
}

/**
 * Function to setup error and process event handlers
 */
function setupErrorHandlers() {
  process.on('unhandledRejection', (reason, promise) => {
    console.error(`Unhandled Rejection: reason: ${reason}, promise: ${promise}`);
  });

  process.on('uncaughtException', (err) => {
    console.error(`Uncaught Exception: ${JSON.stringify(err)}`);
  });

  process.on('multipleResolves', async (type, promise, reason) => {
    try {
      const result = await promise;
      console.error(`Multiple resolves: ${type}, promise resolved with: ${result}`);
    } catch (err) {
      console.error(`Multiple resolves: ${type}, promise rejected with: ${err.message || err}`);
    }
  });

  process.on('beforeExit', (code) => {
    console.log(`Process beforeExit code: ${code}`);
  });

  process.on('exit', (code) => {
    console.log(`Process exit code: ${code}`);
  });

  process.on('disconnect', () => {
    console.log('Process disconnect.');
  });

  process.on('warning', (warning) => {
    console.warn(`Process warning: ${warning}`);
  });
}
