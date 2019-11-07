const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	nodeEnv: process.env.NODE_ENV,
  	httpPort: process.env.PORT,
  	dbUsername: process.env.DB_USERNAME,
  	dbPassword: process.env.DB_PASSWORD,
  	queueUrl: process.env.CLOUDAMQP_URL || 'amqp://localhost'
};