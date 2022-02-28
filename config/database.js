const mongoose = require('mongoose');
require('../models/User');
require('../models/Ad');

const dbName = 'JobAdsExam';
const connectionString = `mongodb://127.0.0.1/${dbName}`;

module.exports = async (app) => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');

    mongoose.connection.on('error', (err) => {
      console.error('Database error');
      console.error(err);
    });
  } catch (err) {
    console.error('Error connecting to database');
    console.error(err);
    process.exit(1);
  }
};
